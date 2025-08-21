import { useRef, useState } from "react";
import Sidebar from "../sideBar/SideBar";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const inputSearch = useRef<HTMLInputElement>(null);

  //const searchManga = (mangaName: string) => {};

  return (
    <nav className="flex w-full flex-row items-center justify-between bg-blue-900 px-6 py-3 text-white shadow-md">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 transition hover:bg-blue-700"
      >
        ...
      </button>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <h1 className="text-5xl font-bold text-amber-100">Project Rice</h1>
      <div className="flex justify-between gap-4">
        <input
          ref={inputSearch}
          type="text"
          className="rounded-lg bg-white text-2xl text-black"
        />
        <button
          className="w-40 rounded-lg bg-black text-2xl"
          onClick={() => console.log(inputSearch.current?.value)}
        >
          Pesquisar
        </button>
      </div>
    </nav>
  );
}
