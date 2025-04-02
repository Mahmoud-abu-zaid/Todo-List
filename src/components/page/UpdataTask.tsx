import { useContext, useState } from "react";
import { TasksContext } from "../context/tasksContext";
import { toast } from "react-toastify";

interface TaskForm {
  title: string;
  description: string;
}
export default function UpdataTask({ task, setIsOpen }: { task: { id: string; title: string; description: string }; setIsOpen: (isOpen: boolean) => void }) {
  const { tasks, setTasks } = useContext(TasksContext);
  const [formInputs, setFormInputs] = useState<TaskForm>({ title: task.title, description: task.description });
  function hendleUpdateTask(id: string) {
   const updatedTasks = tasks.filter((task: { id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string  }) => {
      if (task.id === id) {
        task.title = formInputs.title;
        task.description = formInputs.description;
        task.dateAndTime = new Date().toLocaleString();
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("tasks",JSON.stringify(updatedTasks))
    toast.success("Task Updated Success")
    setIsOpen(false)
  }
  return<>
    <div className="w-[80%] m-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            hendleUpdateTask(task.id);
          }}
        >
          <div>
            <label className=" block pt-8 pb-2 text-3xl">Task Title</label>
            <input
              type="text"
              value={formInputs.title}
              onChange={(e) => {
                setFormInputs({ ...formInputs, title: e.target.value });
              }}
              className="w-[100%] p-3 text-[20px] border-neutral-500 border-2 rounded-md"
            />
          </div>
          <div>
            <label className=" block text-3xl pt-4 pb-2">Task Description</label>
            <textarea
              name=""
              id=""
              className="w-[100%] h-[200px] p-3 text-[20px] border-neutral-500 border-2 rounded-md resize-none"
              value={formInputs.description}
              onChange={(e) => setFormInputs({ ...formInputs, description: e.target.value })}
            ></textarea>
          </div>
          <input
            type="submit"
            disabled={formInputs.title.length === 0}
            value="Add Task"
            className={`w-[100%] mt-2 text-[20px] ${formInputs.title.length === 0 ? "bg-gray-400 cursor-no-drop  text-white block w-full p-3 rounded" : "bg-cyan-700 p-3 rounded-md text-white cursor-pointer"}`}
          />
        </form>
      </div>
  </>
}
