import Header from "../../../../src/pages/Components/Header";
import NewCard from "../../../../src/pages/Components/NewCard";
import SectionList from "../../Lists/SectionList";
export default function Section() {
  return (
    <div className="Section">
      <Header name="Subject" />
      <SectionList />
      <NewCard name="upload" />
    </div>
  );
}
