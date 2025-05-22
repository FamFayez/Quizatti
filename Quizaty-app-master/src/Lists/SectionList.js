import { SecData } from "../core/data/Sections";

import NewCard from "../../../src/pages/Components/NewCard";

export default function SectionList() {
  const SectionData = SecData;
  return (
    <>
      <div>
        {SectionData.map((item) => {
          return <NewCard key={item.id} name={item.SecName} />;
        })}
      </div>
    </>
  );
}
