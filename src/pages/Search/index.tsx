import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMangaListByTitle } from "../../api/MangaService";
import VerticalList from "../../components/verticalList/VerticalList";
import type { Manga } from "../../entities/Manga";

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

        //nao precisa pq ja ta no getMangaByTitle
        //const mapped = await Promise.all(
        //  data.map((manga: any) => Mapper(manga)),
        //);
        setMangas(data);
      }
      setLoading(false);
    }
    fetchMangas();
  }, [title]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
        <h1>Pesquisando por "{title}"...</h1>
      </div>
    );
  }

  return (
    <VerticalList
      mangas={mangas}
      title={`Resultados para: "${title}"`}
      onMangaClick={(id) => console.log(`Você clicou no mangá ${id}`)}
    />
  );
}
