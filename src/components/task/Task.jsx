import { useDispatch } from "react-redux";
import { setActive } from "../../reducer/reducer";

const Task = ({ task, active = false }) => {
  const dispatch = useDispatch();

  const setActiveTask = () => {
    dispatch(setActive(task));
  };

  return (
    <div
      onClick={setActiveTask}
      className={`task-container ${active ? "active" : ""}`}
    >
      <div className="task-title">
        <p>{task.title}</p>
        <span
          className={`task-status ${
            task.status === "completed" ? "completed" : "pending"
          }`}
        >
          {task.status === "pending" ? "Pending" : "Completed"}
        </span>
      </div>
      <p className="task-desc">{task.description}</p>
    </div>
  );
};

export default Task;
