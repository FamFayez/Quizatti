import TaskItem from "./TaskItem";

const TaskList = ({ tasks, userRole, onDelete, onUpdate }) => (
  <>
    {tasks.map((task, index) => (
      <TaskItem
        key={index}
        task={task}
        index={index}
        userRole={userRole}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ))}
  </>
);

export default TaskList;
