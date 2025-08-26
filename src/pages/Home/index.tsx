import Divider from "../../components/divider/Divider";
import NavBar from "../../components/navBar/NavBar";
import Card from "../../components/card/Card";
import { getMangas } from "../../api/MangaService";
import { useEffect } from "react";
import { FetchableDevEnvironment } from "vite";

function Home() {
  useEffect(() => {
    async function fetchData() {
      const data = await getMangas();
      console.log(data);
    }
    fetchData();
  }, []);
  return (
    <div className="flex h-screen w-full flex-col bg-purple-400 bg-gradient-to-b from-purple-700 to-purple-500">
      <NavBar />
      <Divider text="Lançamentos recentes" />

      <Card />
      <Divider text="Continuar lendo" />
    </div>
  );
}

export default Home;
