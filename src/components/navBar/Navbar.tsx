import { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  const [manga, setManga] = useState("");

  return (
    <nav className="NavBar">
      <h1>Project Rice</h1>
      <h1>po</h1>
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
