import { Data } from "../core/data/Subjects";
import Subject from "../Components/Subject";

export default function SubjectList() {
  const subjectData = Data;
  return (
    <>
      <div className="subjectList">
        {subjectData.map((item) => {
          return <Subject key={item.id} id={item.id} name={item.name} />;
        })}
      </div>
    </>
  );
}
