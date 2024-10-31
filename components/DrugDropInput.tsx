import React, { useState, useRef, useEffect } from 'react';
import DownloadSvg from '../public/static/file-download.svg';
import Image from 'next/image';
import { useUploadPosterMutation } from '@/api/moviesAPI';

interface DragDropProps {
  setFileURL: (fileURL: string) => void;
  initialPosterUrl?: string;
}

export const DragDrop: React.FC<DragDropProps> = ({
  setFileURL,
  initialPosterUrl,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadPoster, { data, isLoading, error }] = useUploadPosterMutation();

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      await uploadPoster(imageFiles[0]);
    }
  };

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      await uploadPoster(imageFiles[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    if (data) {
      setFileURL(data.s3Url);
    }
  }, [data, setFileURL]);

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={preventDefaults}
      onDragEnter={preventDefaults}
      className="w-[470px] h-[500px] bg-input border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center flex-col p-4 cursor-pointer"
    >
      {!initialPosterUrl ? (
        <>
          <Image src={DownloadSvg} alt="Download" />
          <p className="text-text">Drop an image here</p>

          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
        </>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
          <div className="w-[270px] h-[300px]">
            <Image
              src={initialPosterUrl}
              alt={`preview-poster`}
              className="object-cover w-full h-full rounded-md"
              width={470}
              height={500}
            />
          </div>
          {isLoading && <p>Uploading...</p>}
          {error && <p className="text-error">Upload failed</p>}
        </div>
      )}
    </div>
  );
};
