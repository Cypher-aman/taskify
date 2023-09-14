import AddIcon from "../../assets/plus-circle.svg";
import TaskForm from "../taskForm/TaskForm";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Sidebar = ({ setShowSidebar = null }) => {
  const [showForm, setShowFrom] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  useEffect(() => {
    if (taskAdded) toast.success("Task Added Successfully");
    setTaskAdded(false);
  }, [taskAdded]);

  return (
    <aside className="sidebar nav-sidebar">
      <Toaster />
      <p className="my-tasks">My Tasks</p>
      <div onClick={() => setShowFrom(true)} className="add-form">
        <img src={AddIcon} alt="add" />
        <p>Create New Task</p>
      </div>
      {showForm && (
        <TaskForm
          setShowSidebar={setShowSidebar}
          closeModal={setShowFrom}
          setStatus={setTaskAdded}
        />
      )}
    </aside>
  );
};

export default Sidebar;
