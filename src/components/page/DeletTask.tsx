import { useContext } from "react";
import { TasksContext } from "../context/tasksContext";
import { toast } from "react-toastify";

export default function DeletTask({taskId,setIsDeleteOpen}:{taskId:string; setIsDeleteOpen:(isDeleteOpen:boolean)=>void}) {
  const { tasks, setTasks } = useContext(TasksContext);
  function handelDeleteTask(taskId: string) {
    const deleteTasks = tasks.filter((task: {id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string }) => task.id !== taskId);
  setTasks(deleteTasks);
  localStorage.setItem("tasks",JSON.stringify(deleteTasks))
  toast.success("Task Delete Success")
  }
  return<>
      <div className=" w-full  opacity- flex flex-col justify-center items-center">
      <p className="text-[20px]">Are you Sure to Delete This Task </p>

      <div className="flex gap-2 mt-3">
        <button className="cursor-pointer p-1 rounded bg-red-500 text-white" onClick={() => handelDeleteTask(taskId)}>
          Delete
        </button>
        <button className="cursor-pointer p-1 rounded bg-green-500 text-white px-3" onClick={() => setIsDeleteOpen(false)}>
          Exit
        </button>
      </div>
    </div>
  </>
}
