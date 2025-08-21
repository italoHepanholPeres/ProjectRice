import "./style.css";
import NavBar from "../../components/navBar/NavBar";
import Menu from "../../components/menu/Menu";

function Home() {
  return (
    <div>
      <NavBar />
      <div>
        Lidos recentemente:
        <hr />
      </div>
    </div>
  );
}

export default Home;
