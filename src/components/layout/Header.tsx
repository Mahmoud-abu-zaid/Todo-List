export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center px-7 py-3 bg-cyan-900">
        <div className="flex items-center">
          <img src="/img/12210414471551953697-512.png" alt="" className="  w-[45px] mr-2 mb" />
          <h2 className="text-white text-[25px]">
            <b>Todo List</b>
          </h2>
        </div>
        <div>
          <img src="img/white-moonlight-icon-pack-removebg-preview.png" alt="" className="w-[70px] " />
        </div>
      </div>
    </>
  );
}
