import React from "react";
import upload from "../../assets/img/upload.png";
import ImageBackground from "../Components/ImageBackground";
import "../../style/Container.css";
import { UploadTA } from "../../core/data/UploadTA";
import Button from "../Components/Button";
import "../../style/section.css";

const SectionTA = () => {
  return (
    <div className="container">
      <div className="section-content">
        {/* Pass UploadTA as items to the Button component */}
        <Button items={UploadTA} />
      </div>
      <ImageBackground imageSrc={upload} altText="Upload Section" />
    </div>
  );
};

export default SectionTA;
