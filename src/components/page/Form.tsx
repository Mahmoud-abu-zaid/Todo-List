import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}
interface TaskForm {
  title: string;
  description: string;
}
interface TaskFormProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Form({ tasks, setTasks }: TaskFormProps) {
  const [formInputs, setFormInputs] = useState<TaskForm>({ title: "", description: "" });

  function addTask() {
    const newTasks = [...tasks, { id: uuidv4(), ...formInputs, isCompleted: false, dateAndTime: new Date().toLocaleString() }];

    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setFormInputs({ title: "", description: "" });

    toast.success("Task Added Success");
  }

  return (
    <>
      <div className="w-[80%] m-auto" id="app-root">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <div>
            <label className=" block pt-8 pb-2 text-3xl" htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              autoFocus
              id="taskTitle"
              value={formInputs.title}
              onChange={(e) => {
                setFormInputs({ ...formInputs, title: e.target.value });
              }}
              className="w-[100%] p-3 text-[20px] border-neutral-500 border-2 rounded-md"
            />
          </div>
          <div>
            <label className=" block text-3xl pt-4 pb-2" htmlFor="taskDescription">Task Description</label>
            <textarea
              name=""
              id="taskDescription"
              className="w-[100%] h-[200px] p-3 text-[20px] border-neutral-500 border-2 rounded-md resize-none"
              value={formInputs.description}
              onChange={(e) => {
                setFormInputs({ ...formInputs, description: e.target.value });
              }}
            ></textarea>
          </div>
          <input
            type="submit"
            disabled={formInputs.title.length === 0}
            value={"Add Task"}
            className={`w-[100%] mt-2 text-[20px] ${formInputs.title.length === 0 ? "bg-gray-400 cursor-no-drop text-white block w-full p-3 rounded" : "bg-cyan-900 p-3 rounded-md text-white"}`}
          />
        </form>
      </div>
    </>
  );
}
