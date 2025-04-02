import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const toastMode = () => {
    toast.success("Added To Mode");
  };
  useEffect(() => {
    const mode = document.documentElement;
    if (darkMode) {
      mode?.classList.add("darkMode");
    } else {
      mode?.classList.remove("darkMode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <>
      <div className="flex justify-between items-center px-7 py-3 bg-cyan-900">
        <div className="flex items-center">
          <img src="/img/12210414471551953697-512.png" alt="" className="  w-[45px] mr-2 mb " />
          <h2 className="text-white text-[25px]">
            <b>Todo List</b>
          </h2>
        </div>
        <div>
          <button
            onClick={() => {
              setDarkMode((e) => !e);
              toastMode();
            }}
          >
            <img src="img/white-moonlight-icon-pack-removebg-preview.png" alt="" className="w-[70px] cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
}
