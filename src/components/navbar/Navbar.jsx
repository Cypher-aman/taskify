import { useEffect, useState } from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import SunIcon from "../../assets/sun.svg";
import MoonIcon from "../../assets/moon.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reducer/reducer";
import PlusIcon from "../../assets/plus-circle.svg";
import "./navbar.css";
import MenuIcon from "../../assets/menu.svg";
import CrossIcon from "../../assets/x.svg";
import Sidebar from "../sidebar/Sidebar";

const Navbar = () => {
  const curTheme = useSelector((state) => state.task.theme);
  const [theme, setTheme] = useState(curTheme);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleTheme(theme));
  }, [theme]);

  return (
    <>
      <nav className="navbar">
        <h1 className="title full-title">Taskify.</h1>
        <h1 className="title short-title">T.</h1>

        <div className="nav-items mob-menu">
          <img src={MoonIcon} alt="moon" />
          <label>
            <Toggle
              defaultChecked={theme === "light"}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              icons={false}
            />
          </label>
          <img src={SunIcon} alt="sun" />
          <div className="menu-icon">
            {!showSidebar && (
              <img
                onClick={() => setShowSidebar(true)}
                src={MenuIcon}
                alt="menu"
              />
            )}
            {showSidebar && (
              <img
                onClick={() => setShowSidebar(false)}
                src={CrossIcon}
                alt="menu"
              />
            )}
          </div>
        </div>
      </nav>
      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
    </>
  );
};

export default Navbar;
