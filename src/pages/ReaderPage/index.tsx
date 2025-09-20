import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Reader({ chapterId }: { chapterId: string }) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (!chapterId) return;
    let cancelled = false;
    setLoading(true);

    async function fetchChapter() {
      try {
        const res = await axios.get(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );

        const baseUrl = res.data.baseUrl;
        const hash = res.data.chapter.hash;
        const data = res.data.chapter.data;

        const pages = data.map(
          (file: string) => `${baseUrl}/data/${hash}/${file}`
        );

        if (!cancelled) {
          setImages(pages);
          setTimeout(() => window.scrollTo(0, 0), 30);
        }
      } catch (err) {
        console.error("Erro ao buscar capítulo:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchChapter();
    return () => {
      cancelled = true;
    };
  }, [chapterId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white bg-black">
        Carregando capítulo...
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white bg-black">
        Nenhuma página disponível.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-black text-white p-4 w-full min-h-screen overflow-y-auto">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Página ${index + 1}`}
          className="mb-4 w-full max-w-3xl object-contain rounded-lg"
        />
      ))}
    </div>
  );
}

export default function ReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>();

  if (!chapterId) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white bg-black">
        Capítulo inválido.
      </div>
    );
  }

  return <Reader chapterId={chapterId} key={chapterId} />;
}
