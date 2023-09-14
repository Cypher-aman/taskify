import Task from "../task/Task";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../../reducer/reducer";
import ArrowDown from "../../assets/arrow-down.svg";
import { useEffect, useState } from "react";

const Tasks = () => {
  const activeTask = useSelector((state) => state.task.activeTask);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);

  const [tasksCollection, setTasksCollection] = useState([...tasks]);

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");
  const [showSort, setShowSort] = useState(false);

  useEffect(() => {
    if (filter === "all") {
      setTasksCollection([...tasks]);
    } else if (filter === "pending") {
      setTasksCollection((prevTasks) =>
        [...tasks].filter((task) => task.status === "pending")
      );
    } else if (filter === "completed") {
      setTasksCollection((prevTasks) =>
        [...tasks].filter((task) => task.status === "completed")
      );
    }

    if (sort === "date") {
      setTasksCollection((prevTasks) =>
        [...prevTasks].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } else if (sort === "alpha") {
      setTasksCollection((prevTasks) =>
        [...prevTasks].sort((a, b) =>
          a.title.localeCompare(b.title, "fr", { ignorePunctuation: true })
        )
      );
    }
  }, [filter, sort]);

  useEffect(() => {
    setTasksCollection([...tasks]);
    setFilter("all");
    setSort("date");
  }, [tasks]);

  const handleSort = (sort) => {
    setShowSort(!showSort);
    setSort(sort);
  };
  return (
    <div
      className={`tasks-box ${tasks.length === 0 ? "no-task-container" : ""}`}
    >
      <div className="filter-menu">
        <div className="filter">
          <p
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active-filter" : ""}
          >
            All
          </p>
          <p
            onClick={() => setFilter("pending")}
            className={filter === "pending" ? "active-filter" : ""}
          >
            Pending
          </p>
          <p
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active-filter" : ""}
          >
            Completed
          </p>
        </div>
        <div className="sort">
          <p>{sort === "date" ? "By Date" : "A-Z"}</p>
          <img
            onClick={() => setShowSort(!showSort)}
            src={ArrowDown}
            alt="arrow-down"
          />
          {showSort && (
            <div className="sort-dropdown">
              <p onClick={() => handleSort("date")}>By Date</p>
              <p onClick={() => handleSort("alpha")}>Alpha A-Z</p>
            </div>
          )}
        </div>
      </div>
      {tasks.length === 0 && <p className="no-task">Add some tasks</p>}
      {tasks.length > 0 &&
        tasksCollection.map((task) => (
          <Task key={task.id} task={task} active={activeTask?.id === task.id} />
        ))}
    </div>
  );
};

export default Tasks;
