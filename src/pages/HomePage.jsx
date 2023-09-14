import Sidebar from "../components/sidebar/Sidebar";
import TaskDetail from "../components/taskDetail/TaskDetail";
import Tasks from "../components/tasks/Tasks";

const HomePage = () => {
  return (
    <div className="container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="tasks-container">
        <Tasks />
      </div>
      <div className="task_detail-container">
        <TaskDetail />
      </div>
    </div>
  );
};

export default HomePage;
