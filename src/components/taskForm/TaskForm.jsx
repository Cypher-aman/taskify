import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../reducer/reducer";
const TaskForm = ({ type = "create", closeModal, setStatus }) => {
  const dispatch = useDispatch();
  const activeTask = useSelector((state) => state.task.activeTask);

  const initData =
    type === "create"
      ? {
          id: String(Math.floor(Math.random() * Date.now())),
          title: "",
          description: "",
          status: "pending",
          dateAdded: null,
        }
      : { ...activeTask };

  const [task, setTask] = useState(initData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim().length < 5)
      return toast.error("Title must be at least 5 characters long.");

    setStatus(true);
    if (type === "create")
      dispatch(addTask({ ...task, dateAdded: Date.now() }));

    if (type === "update")
      dispatch(updateTask({ ...task, dateAdded: Date.now() }));

    closeModal(false);
  };

  return (
    <div className="task-form">
      <Toaster />
      <div onClick={() => closeModal(false)} className="background-blur"></div>
      <div className="form-container">
        <p className="form-title">
          {type === "create" ? "Create Task" : "Update Task"}
        </p>
        <form onSubmit={(e) => handleSubmit(e)} className="input-form">
          <label htmlFor="input-title">Title</label>
          <input
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            type="text"
            className="input-title"
            required
          />
          <label htmlFor="input-description">Description</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="input-description"
            rows={10}
          ></textarea>
          <select
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            value={task.status}
            className="select-option"
          >
            <option value="pending" className="option">
              Pending
            </option>
            <option value="completed" className="option">
              Completed
            </option>
          </select>
          <button type="submit" className="submit-button">
            {type === "create" ? "Create Task" : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
