import TaskItem from "./TaskItem";

const TaskList = ({ tasks, userRole, onDelete, onUpdate, onSubmit }) => (
  <>
    {tasks.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        index={index}
        userRole={userRole}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onSubmit={onSubmit}
      />
    ))}
  </>
);

export default TaskList;
