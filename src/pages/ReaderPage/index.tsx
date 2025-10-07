import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getChapterPages } from "../../api/ChapterService";

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
        const pages = await getChapterPages(chapterId);

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
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Carregando capítulo...
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Nenhuma página disponível.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-y-auto bg-black p-4 text-white">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Página ${index + 1}`}
          className="mb-4 w-full max-w-3xl rounded-lg object-contain"
        />
      ))}
    </div>
  );
}

export default function ReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>();

  if (!chapterId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Capítulo inválido.
      </div>
    );
  }

  return <Reader chapterId={chapterId} key={chapterId} />;
}
