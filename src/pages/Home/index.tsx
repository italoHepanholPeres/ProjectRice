import { useEffect, useState } from "react";
import { getMangas } from "../../api/MangaService";
import Divider from "../../components/divider/Divider";
import HorizontalList from "../../components/horizontalList/HorizontalList";
import NavBar from "../../components/navBar/NavBar";
import Mapper from "../../mappers/MangaMapper";

function Home() {
  const [mangas, setMangas] = useState<any[]>([]);

  //console.log(mangas[0]);
  //const teste = Mapper(mangas[0]);
  //console.log(teste);

  useEffect(() => {
    async function fetchData() {
      const data = await getMangas();
      const mappedMangas = await Promise.all(
        data.map((manga: any) => Mapper(manga)),
      );
      setMangas(mappedMangas);
    }
    fetchData();
  }, []);
  if (mangas.length === 0) {
    return (
      <div className="flex h-screen w-full flex-col bg-blue-900 bg-gradient-to-b from-blue-900 to-blue-800">
        <NavBar />
        <Divider text="Lançamentos recentes" />
        <p>carregando</p>
        <Divider text="Continuar lendo" />
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full flex-col bg-blue-900 bg-gradient-to-b from-blue-900 to-blue-800">
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
