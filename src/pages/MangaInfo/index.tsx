import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MangaInfo {
  id: string;
  title: string;
  description?: string;
  coverUrl?: string;
  tags: string[];
}

interface Chapter {
  id: string;
  title?: string;
  chapter?: string;
}

export default function MangaInfoPage() {
  const { id } = useParams<{ id: string }>(); // id: string | undefined
  const [manga, setManga] = useState<MangaInfo | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const mangaId: string = id;

    let mounted = true;
    async function fetchData() {
      try {
        const mangaResponse = await axios.get(
          `https://api.mangadex.org/manga/${mangaId}`,
          {
            params: {
              "contentRating[]": ["safe"],
              includes: ["cover_art"],
            },
          },
        );

        const mangaData = mangaResponse.data.data;
        const attrs = mangaData.attributes || {};

        const title =
          (attrs.title &&
            (attrs.title["en"] || Object.values(attrs.title)[0])) ||
          "Título não disponível";

        // descrição (similar)
        const description =
          (attrs.description &&
            (attrs.description["en"] ||
              attrs.description["pt-br"] ||
              Object.values(attrs.description)[0])) ||
          "Sem descrição disponível.";

        // tags
        const tags =
          (attrs.tags &&
            attrs.tags.map(
              (t: any) =>
                t.attributes?.name?.en ||
                Object.values(t.attributes?.name || {})[0] ||
                "tag",
            )) ||
          [];

        const coverRel = (mangaData.relationships || []).find(
          (r: any) => r.type === "cover_art",
        );
        const coverFileName = coverRel?.attributes?.fileName;
        const coverUrl = coverFileName
          ? `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`
          : undefined;

        if (!mounted) return;
        setManga({
          id: mangaId,
          title,
          description,
          coverUrl,
          tags,
        });

        // Busca capítulos
        const chaptersResponse = await axios.get(
          `https://api.mangadex.org/manga/${mangaId}/feed`,
          {
            params: {
              limit: 200,
              translatedLanguage: ["pt-br", "en"],
              "order[chapter]": "asc",
            },
          },
        );

        const mappedChapters = (chaptersResponse.data.data || []).map(
          (ch: any) => ({
            id: ch.id,
            title: ch.attributes?.title,
            chapter: ch.attributes?.chapter,
          }),
        );

        if (!mounted) return;
        setChapters(mappedChapters);
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
    <div className="flex min-h-screen bg-blue-900 text-white">
      <aside className="w-1/4 border-r border-blue-700 p-6">
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

      <main className="flex-1 p-6">
        <h2 className="mb-4 text-xl font-semibold">Capítulos</h2>
        {chapters.length === 0 ? (
          <p className="text-gray-400">Nenhum capítulo disponível.</p>
        ) : (
          <ul className="space-y-2">
            {chapters.map((ch) => (
              <li
                key={ch.id}
                className="cursor-pointer rounded-lg bg-blue-800 p-3 hover:bg-blue-700"
              >
                Capítulo {ch.chapter ?? "?"} {ch.title ? `- ${ch.title}` : ""}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
