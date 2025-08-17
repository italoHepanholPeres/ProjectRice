import { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const [manga, setManga] = useState("");

  //const searchManga = (mangaName: string) => {};

  return (
    <nav className="NavBar">
      <h1>Project Rice</h1>
      <div className="Search">
        <input
          type="text"
          className="InputText"
          onChange={(e) => setManga(e.target.value)}
        />
        <button className="Submit" onClick={() => console.log(manga)}>
          Pesquisar
        </button>
      </div>
    </nav>
  );
}
