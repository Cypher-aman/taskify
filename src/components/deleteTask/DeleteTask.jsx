import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../reducer/reducer";

const DeleteTask = ({ closeModal }) => {
  const activeTask = useSelector((state) => state.task.activeTask);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(activeTask.id));
    closeModal(false);
  };

  return (
    <div className="delete-task">
      <div onClick={() => closeModal(false)} className="background-blur"></div>
      <div className="delete-modal">
        <p>
          Are you sure you want to delete this <span>{activeTask.title}</span>
          &nbsp; task? This action cannot be undone.
        </p>
        <div className="delete-actions">
          <button onClick={() => closeModal(false)} className="cancel">
            Cancel
          </button>
          <button onClick={handleDelete} className="delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
