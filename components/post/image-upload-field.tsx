"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

interface ImageUploadFieldProps {
  onChange: (file: File | null) => void;
  error?: string;
}

export function ImageUploadField({ onChange, error }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const handleDelete = () => {
    setPreview(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-white">Photo</label>

      <div
        className={`flex flex-col items-center gap-1 rounded-xl border border-dashed bg-gray-950 p-4 md:p-4 ${
          error ? "border-error-700" : "border-gray-900"
        }`}
      >
        {!preview && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-900">
              <UploadCloud className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <button
                onClick={() => inputRef.current?.click()}
                className="text-sm font-bold text-brand-500"
              >
                Click to upload{" "}
                <span className="font-medium text-gray-600">
                  or drag and drop
                </span>
              </button>
              <p className="text-sm font-semibold text-gray-600">
                PNG or JPG (max. 5mb)
              </p>
            </div>
          </div>
        )}

        {preview && (
          <div className="flex w-full flex-col items-center gap-3">
            <div className="relative aspect-square w-full max-w-[313px] overflow-hidden md:max-w-[395px]">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="text-sm font-bold text-white"
              >
                Change Image
              </button>
              <button
                onClick={handleDelete}
                className="text-sm font-bold text-error-700"
              >
                Delete Image
              </button>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {error && (
        <p className="text-sm font-medium tracking-tight text-error-700">
          {error}
        </p>
      )}
    </div>
  );
}
