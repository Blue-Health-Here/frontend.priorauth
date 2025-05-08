import React, { useState } from "react";

interface FileUploadProps {
  title: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ title }) => {
  const [logoPreview, setLogoPreview] = useState<string>("");
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="w-44 h-44 rounded-md relative overflow-hidden bg-secondary-background">
      {logoPreview ? (
        <>
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="w-full h-full relative"
          />
          <span className="absolute top-0 right-0 mt-2 mr-2 rounded-full bg-primary-white w-8 h-8 md:w-10 md:h-10">
          <img
            src="/camera.svg"
            alt="camera"
            className="w-4 h-4 md:w-5 md:h-5 absolute top-2 right-2 md:top-2.5 md:right-2.5"
          />
          </span>
        </>
      ) : (
        <label
          htmlFor="logo-upload"
          className="cursor-pointer p-5 flex flex-col items-center justify-center text-center gap-2 w-full h-full"
        >
          <img src="/upload.svg" alt="Upload Icon" className="w-10 h-10" />
          <div className="leading-[110%]">
            <p className="text-sm md:text-base leading-[120%] font-medium text-primary-black">
              {title}
            </p>
            <p className="text-xs sm:text-sm  text-secondary-black">
              Max image size allowed 10mb
            </p>
          </div>
        </label>
      )}
      <input
        id="logo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoUpload}
      />
    </div>
  );
};

export default FileUpload;
