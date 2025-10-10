import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { MangaInfo } from "../../interfaces/MangaInfo";
import type { Chapter } from "../../interfaces/Chapter";
import { getMangaInfo } from "../../api/MangaService";
import { getChapters } from "../../api/ChapterService";
import NavBar from "../../components/navBar/NavBar";

export default function MangaInfoPage() {
  const { id } = useParams<{ id: string }>(); // id: string | undefined
  const [manga, setManga] = useState<MangaInfo | null | undefined>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


    useEffect(() => {
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    const mangaId: string = id;

    let mounted = true;
    async function fetchData() {
      try {
        const mangaInfo = await getMangaInfo(mangaId);

        if (!mounted) return;
        setManga(mangaInfo);

        const mangaChapters: Chapter[] = await getChapters(mangaId);

        if (!mounted) return;
        setChapters(mangaChapters);
      } catch (error) {
        console.error("Erro ao buscar mangá:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
    
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-blue-900 text-white">
        <p>Carregando informações...</p>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-blue-900 text-white">
        <p>Mangá não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-blue-900 text-white">
      <NavBar/>
      <div className="flex flex-1 min-h-0">
        <aside className="w-1/4 border-r border-blue-700 p-6 overflow-y-auto">
        {manga.coverUrl && (
          <img
            src={manga.coverUrl}
            alt={manga.title}
            className="mb-4 w-full rounded-lg shadow-lg"
          />
        )}
        <h1 className="mb-2 text-2xl font-bold">{manga.title}</h1>
        <p className="mb-4 text-sm text-gray-300">{manga.description}</p>
        <div className="flex flex-wrap gap-2">
          {manga.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-700 px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-6">
        <h2 className="mb-4 text-xl font-semibold">Capítulos</h2>
        {chapters.length === 0 ? (
          <p className="text-gray-400">Nenhum capítulo disponível.</p>
        ) : (
          <ul className="space-y-2">
            {chapters.map((ch) => (
              <li
                key={ch.id}
                className="cursor-pointer rounded-lg bg-blue-800 p-3 hover:bg-blue-700"
                onClick={() => navigate(`/chapter/${ch.id}`)}
              >
                Capítulo {ch.chapter ?? "?"} {ch.title ? `- ${ch.title}` : ""}
              </li>
            ))}
          </ul>
        )}
      </main>
      </div>
    </div>
  );
}
