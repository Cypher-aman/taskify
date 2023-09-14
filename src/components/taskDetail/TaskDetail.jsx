import { useDispatch, useSelector } from "react-redux";
import EditIcon from "../../assets/edit.svg";
import DeleteIcon from "../../assets/trash-2 (1).svg";
import { useEffect, useState } from "react";
import TaskForm from "../taskForm/TaskForm";
import toast, { Toaster } from "react-hot-toast";
import DeleteTask from "../deleteTask/DeleteTask";
import CrossIcon from "../../assets/x.svg";
import { setActive } from "../../reducer/reducer";

const TaskDetail = () => {
  const dispatch = useDispatch();
  const activeTask = useSelector((state) => state.task.activeTask);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (taskUpdated) toast.success("Task Updated Successfully");
    setTaskUpdated(false);
  }, [taskUpdated]);

  const handleClose = () => {
    dispatch(setActive(null));
  };
  // Define month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date(activeTask?.dateAdded);

  // Extract day, month, and year
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  if (!activeTask) {
    return (
      <div className="active-null mob-hidden">
        <p>Nothing To Show Here! 😅</p>
      </div>
    );
  }
  return (
    <div
      className={`task-detail ${
        activeTask === null ? `mob-hidden` : "mob-active"
      }`}
    >
      <Toaster />
      <div className="detail-top">
        <h2>{activeTask.title}</h2>
        <div className="task-actions">
          <img
            onClick={() => setShowTaskForm(!showTaskForm)}
            src={EditIcon}
            alt="edit icon"
          />
          <img
            onClick={() => setShowDeleteModal(!showDeleteModal)}
            src={DeleteIcon}
            alt="delete icon"
          />
          <img
            onClick={handleClose}
            className="cross"
            src={CrossIcon}
            alt="cross icon"
          />
        </div>
      </div>
      <div className="detail-mid">
        <p className="task-date">{formattedDate}</p>
        <p
          className={`task-status ${
            activeTask.status === "completed" ? "completed" : "pending"
          }`}
        >
          {activeTask.status === "pending" ? "Pending" : "Completed"}
        </p>
      </div>
      <div className="detail-bottom">
        <p className="description">{activeTask.description}</p>
      </div>
      {showTaskForm && (
        <TaskForm
          type="update"
          closeModal={setShowTaskForm}
          setStatus={setTaskUpdated}
        />
      )}
      {showDeleteModal && <DeleteTask closeModal={setShowDeleteModal} />}
    </div>
  );
};

export default TaskDetail;
