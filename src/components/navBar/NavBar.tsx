import { useRef, useState } from "react";
import Sidebar from "../sideBar/SideBar";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const inputSearch = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function onSearchClick(value: string) {
    navigate(`/search?title=${value}`);
  }

  //const searchManga = (mangaName: string) => {};

  return (
    <nav className="flex w-full flex-row items-center justify-between bg-blue-950 px-6 py-3 text-white shadow-md">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 transition hover:bg-blue-700"
      >
        ...
      </button>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <h1 className="text-6xl font-bold text-black cursor-pointer"
          onClick={() => navigate('/')}
      >Project Rice</h1>

      <div className="flex justify-between gap-4">
        <input
          ref={inputSearch}
          type="text"
          className="rounded-lg bg-gray-800 text-2xl text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = inputSearch.current?.value.trim();
              if (value) {
                onSearchClick(value);
              }
            }
          }}
        />
        <button
          className="w-40 rounded-lg bg-black text-2xl hover:bg-blue-950"
          onClick={() => {
            const value = inputSearch.current?.value.trim();
            if (value) {
              //alert(`Você pesquisou por: ${value} `);
              //const foundedManga = getMangaByTitle(value);
              //console.log(foundedManga);
              onSearchClick(value);
            }
          }}
        >
          Pesquisar
        </button>
      </div>
    </nav>
  );
}
