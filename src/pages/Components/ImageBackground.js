import "./../../style/imageBackground.css";

const ImageBackground = ({ imageSrc, altText = "Background" }) => {
  return (
    <div className="RightSection">
      <img src={imageSrc} alt={altText} />
    </div>
  );
};

export default ImageBackground;
