import { useEffect, useRef, useState } from "react";
import apiClient from "../services/apiClient.js";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function AvatarUploader() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const inputRef = useRef(null);

  // Validate before setting the file or making a network request.
  function handleFile(selectedFile) {
    if (!selectedFile) return;

    setError("");
    setUploadedUrl("");
    setProgress(0);

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setFile(null);
      setError("Please choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setFile(null);
      setError("File is too large. The maximum size is 5MB.");
      return;
    }

    setFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  }

  function handleInputChange(e) {
    const selectedFile = e.target.files?.[0];
    handleFile(selectedFile);
    // Allow selecting the same file again.
    e.target.value = "";
  }

  // Create a local preview URL and revoke it whenever it changes or unmounts.
  useEffect(() => {
    if (!file) {
      setPreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  async function upload() {
    if (!file || isUploading) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setError("");
    setUploadedUrl("");
    setProgress(0);
    setIsUploading(true);

    try {
      // Do not set Content-Type manually; the browser must include the multipart boundary.
      const response = await apiClient.post("/api/upload", formData, {
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      });

      setProgress(100);
      setUploadedUrl(response.data?.url || "");
    } catch (uploadError) {
      setError(
        uploadError.response?.data?.error ||
          uploadError.message ||
          "Upload failed. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  }

  const fullUploadedUrl = uploadedUrl
    ? new URL(uploadedUrl, apiClient.defaults.baseURL || window.location.origin).href
    : "";

  return (
    <div>
      <div
        className={isDragging ? "drop-zone dragging" : "drop-zone"}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Choose an avatar image or drag one here"
      >
        <p>Drag an image here, or click to choose</p>
        <input
          ref={inputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          hidden
          onChange={handleInputChange}
        />
      </div>

      {file && <p>{file.name}</p>}
      {error && <p className="error" role="alert">{error}</p>}

      {preview && (
        <img className="preview" src={preview} alt="Selected avatar preview" />
      )}

      {(isUploading || progress > 0) && (
        <>
          <div
            className="bar"
            role="progressbar"
            aria-label="Upload progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="fill" style={{ width: `${progress}%` }} />
          </div>
          <p>{progress}%</p>
        </>
      )}

      <button onClick={upload} disabled={!file || isUploading}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {fullUploadedUrl && (
        <p>
          Upload complete:{" "}
          <a href={fullUploadedUrl} target="_blank" rel="noreferrer">
            View uploaded image
          </a>
        </p>
      )}
    </div>
  );
}
