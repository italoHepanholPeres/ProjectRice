import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMangaByTitle } from "../../api/MangaService";
import VerticalList from "../../components/verticalList/VerticalList";
import Mapper from "../../mappers/MangaMapper";
import HorizontalList from "../../components/horizontalList/HorizontalList";

interface Manga {
  id: string;
  title: string;
  coverUrl: string;
  additionalInfo?: string;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title") || "";
  const [mangas, setMangas] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMangas() {
      setLoading(true);
      if (title) {
        const data = await getMangaByTitle(title); 
        const mapped = await Promise.all(data.map((manga: any) => Mapper(manga)));
        setMangas(mapped);
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
