import { useState } from "react";
import "./NavBarStyle.css";

export default function NavBar() {
  const [mangaTitle, setMangaTitle] = useState("");

  //const searchManga = (mangaName: string) => {};

  return (
    <nav className="NavBar">
      <h1 className="Title">Project Rice</h1>
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
