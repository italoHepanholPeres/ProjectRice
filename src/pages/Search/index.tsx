import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMangaListByTitle } from "../../api/MangaService";
import VerticalList from "../../components/verticalList/VerticalList";
import type { Manga } from "../../interfaces/Manga";
import NavBar from "../../components/navBar/NavBar";

export default function Search() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "";
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMangas() {
      setLoading(true);
      if (title) {
        const data = await getMangaListByTitle(title);
        setMangas(data);
      }
      setLoading(false);
    }
    fetchMangas();
  }, [title]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
        <div className="fixed top-0 left-0 w-full z-50">
          <NavBar />
        </div>
        <h1 className="mt-20">Pesquisando por "{title}"...</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavBar />
      </div>

      <div className="pt-20">
        <VerticalList
          mangas={mangas}
          title={`Resultados para: "${title}"`}
          onMangaClick={(id) => console.log(`Você clicou no mangá ${id}`)}
        />
      </div>
    </div>
  );
}
