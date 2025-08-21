import { useState } from "react";
import "./NavBarStyle.css";
import Menu from "../menu/Menu";

export default function NavBar() {
  const [mangaTitle, setMangaTitle] = useState("");

  //const searchManga = (mangaName: string) => {};

  return (
    <nav className="">
      <Menu />
      <h1 className="">Project Rice</h1>
      <div className="SearchFields">
        <input
          type="text"
          className="SearchBar"
          onChange={(e) => setMangaTitle(e.target.value)}
        />
        <button className="Submit" onClick={() => console.log(mangaTitle)}>
          Pesquisar
        </button>
      </div>
    </nav>
  );
}
