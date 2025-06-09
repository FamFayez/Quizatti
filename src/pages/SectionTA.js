import upload from "../assets/img/upload.png";
import ImageBackground from "../Components/ImageBackground";
import "../style/Container.css";
import { UploadTA } from "../core/data/UploadTA";
import Button from "../Components/Button";
import "../style/Button.css";

const SectionTA = () => {
  return (
    <div className="container">
      <div className="section-content">
        <Button items={UploadTA} />
      </div>
      <ImageBackground imageSrc={upload} altText="Upload Section" />
    </div>
  );
};

export default SectionTA;
