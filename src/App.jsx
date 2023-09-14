import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.task.theme);
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
