import Divider from "../../components/divider/Divider";
import NavBar from "../../components/navBar/NavBar";
import Card from "../../components/card/Card";
import { getMangas } from "../../api/MangaService";
import { useEffect, useState } from "react";
import HorizontalList from "../../components/horizontalList/HorizontalList";

function Home() {
  const [mangas, setMangas] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getMangas();
      setMangas(data);
    }
    fetchData();
  }, []);
  return (
    <div className="flex h-screen w-full flex-col bg-purple-400 bg-gradient-to-b from-purple-700 to-purple-500">
      <NavBar />
      <Divider text="Lançamentos recentes" />
      <HorizontalList
        mangas={mangas}
        onMangaClick={() => {
          console.log("você acessou o manga");
        }}
      />
      <Divider text="Continuar lendo" />
    </div>
  );
}

export default Home;
