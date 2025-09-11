import { useEffect, useState } from "react";
import { getMangaList, getMangaListByTags } from "../../api/MangaService";
import Divider from "../../components/divider/Divider";
import HorizontalList from "../../components/horizontalList/HorizontalList";
import NavBar from "../../components/navBar/NavBar";
import { Tags } from "../../constants/Tags";

function Home() {
  const [lastUpdateMangas, setlastUpdateMangas] = useState<any[]>([]);
  const [isekaiMangas, setIsekaiMangas] = useState<any[]>([]);
  const [romanceMangas, setRomanceMangas] = useState<any[]>([]);

  //console.log(mangas[0]);
  //const teste = Mapper(mangas[0]);
  //console.log(teste);

  useEffect(() => {
    async function fetchData() {
      //chama e define a lista Atualizados recentemente
      const lastUpdateData = await getMangaList();
      setlastUpdateMangas(lastUpdateData);

      const isekaiData = await getMangaListByTags([Tags.Isekai]);
      setIsekaiMangas(isekaiData);

      const romanceData = await getMangaListByTags([Tags.Romance]);
      setRomanceMangas(romanceData);
    }
    fetchData();
  }, []);
  if (lastUpdateMangas.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col bg-blue-900 bg-gradient-to-b from-blue-900 to-blue-800">
        <NavBar />
        <Divider text="Atualizados recentemente" />
        <p>carregando</p>
        <Divider text="Continuar lendo" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col bg-blue-900 bg-gradient-to-b from-blue-900 to-blue-800">
      <NavBar />
      <Divider text="Atualizados recentemente" />
      <HorizontalList mangas={lastUpdateMangas} />
      <Divider text="Isekai" />
      <HorizontalList mangas={isekaiMangas} />
      <Divider text="Romance" />
      <HorizontalList mangas={romanceMangas} />
    </div>
  );
}

export default Home;
