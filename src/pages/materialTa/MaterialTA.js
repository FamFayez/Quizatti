import React from "react";
import ImageBackground from "../Components/ImageBackground";
import "../../style/Container.css";
import Material from "../../assets/img/Material.png";
import { MatTA } from "../../core/data/MatTA";
import Card from "../Components/Card";

const MaterialTA = () => {
  return (
    <div className="container">
      <Card items={MatTA} />
      <ImageBackground imageSrc={Material} altText="Material" />
    </div>
  );
};

export default MaterialTA;
