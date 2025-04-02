import { useState } from "react";
import { toast } from "react-toastify";
import Form from "./components/page/Form";
import Header from "./components/layout/Header";
import { TasksContext } from "./components/context/tasksContext";
import Task from "./components/page/Task";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));

  const [filter, setFilter] = useState("");

  const completedTasks = tasks.filter((task: { isCompleted: boolean }) => task.isCompleted);

  const nonCompletedTasks = tasks.filter((task: { isCompleted: boolean }) => !task.isCompleted);

  let tasksRenderd = tasks;

  function showToast(message: string) {
    return toast.success(`Get ${message} Tasks Success`);
  }

  switch (filter) {
    case "completed":
      tasksRenderd = completedTasks;
      showToast(filter);
      break;
    case "non-completed":
      tasksRenderd = nonCompletedTasks;
      showToast(filter);
      break;
    default:
      tasksRenderd = tasks;
      showToast(filter);
  }

  return (
    <>
      <Header />
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <Form tasks={tasks} setTasks={setTasks} />

        <div  className="flex justify-center items-center gap-9 m-5 p-3 flex-wrap">
          <button onClick={() => setFilter("all")} className=" cursor-pointer w-[200px] bg-cyan-900 text-white text-[18px] rounded p-2">
            All
          </button>

          <button onClick={() => setFilter("completed")} className=" cursor-pointer w-[200px] bg-cyan-900 text-white text-[18px] rounded p-2">
            Completed
          </button>

          <button onClick={() => setFilter("non-completed")} className=" cursor-pointer w-[200px] bg-cyan-900 text-white text-[18px] rounded p-2">
            Not Completed
          </button>
        </div>
        <div className="p-5 container m-auto">
          {tasksRenderd?.map((task: { id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string }) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>
      </TasksContext.Provider>
    </>
  );
}
export default App;
