import Card from "../Components/Card";
import ImageBackground from "../Components/ImageBackground";
import "../../style/Container.css";
import Material from "../../assets/img/Material.png";
import { Cont } from "../../core/data/Cont";

const MaterialsDR = () => {
  return (
    <main className="container">
      <Card items={Cont} />
      <ImageBackground imageSrc={Material} altText="Material" />
    </main>
  );
};

export default MaterialsDR;
