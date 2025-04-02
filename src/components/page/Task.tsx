import { useContext, useState } from "react";
import { TasksContext } from "../context/tasksContext";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import UpdataTask from "./UpdataTask";
import DeletTask from "./DeletTask";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}
export default function Task({ task }: { task: Task }) {
  const { tasks, setTasks } = useContext(TasksContext);

  function handelCheckCompleteTask(id: string) {
    const updatedTasks = tasks.map((task: { id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string }) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    if (task.isCompleted) {
      toast.success("Task Complete");
    } else {
      toast.warn("Task Uncomplete");
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <section className={`${task.isCompleted ? "bg-cyan-900" : "bg-green-800"} text-white rounded p-5 m-4`}>
        <div className="flex justify-between items-center ">
          <div className=" gap-7">
            <h3>
              <b className="text-[20px] p-2 py-6">{task.title}</b>
            </h3>
            <p className="text-[17px] px-2">{task.description}</p>
            <p className="text-[14px] pl-2">{task.dateAndTime}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => handelCheckCompleteTask(task.id)} className="bg-green-500 cursor-pointer hover:bg-green-700 rounded-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <FaCheck />
            </button>

            <button onClick={() => setIsOpen((status) => !status)} className="bg-green-500 cursor-pointer hover:bg-green-700 rounded-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <FaPencil />
            </button>

            <button onClick={() => setIsDeleteOpen(true)} className="bg-red-500 cursor-pointer hover:bg-red-800 rounded-[15px] w-[30px] h-[30px] flex items-center justify-center">
              <FaTrashCan />
            </button>
          </div>
        </div>
        {isOpen && <UpdataTask task={task} setIsOpen={setIsOpen} />}
        {isDeleteOpen && <DeletTask taskId={task.id} setIsDeleteOpen={setIsDeleteOpen} />}
      </section>
    </>
  );
}
