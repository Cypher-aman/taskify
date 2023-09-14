import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const bool = localStorage.getItem("tasks");
if (!bool) {
  localStorage.setItem("tasks", JSON.stringify(data));
}

const initTasks = JSON.parse(localStorage.getItem("tasks"));
const initialState = {
  tasks: [...initTasks],
  activeTask: null,
  theme: localStorage.getItem("theme") || "light",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.activeTask = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);

      localStorage.setItem("tasks", JSON.stringify([...state.tasks]));
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem("tasks", JSON.stringify([...state.tasks]));
      state.activeTask = action.payload;
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify([...state.tasks]));
      state.activeTask = null;
    },
    toggleTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setActive, addTask, updateTask, deleteTask, toggleTheme } =
  taskSlice.actions;

export default taskSlice.reducer;
