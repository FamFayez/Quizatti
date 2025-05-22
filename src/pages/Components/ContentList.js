import { ContData } from "../../core/data/Content";

import NewCard from "../Components/NewCard";

export default function ContentList() {
  const ContentData = ContData;
  return (
    <>
      <div>
        {ContentData.map((item) => {
          return <NewCard key={item.id} name={item.ContName} />;
        })}
      </div>
    </>
  );
}
