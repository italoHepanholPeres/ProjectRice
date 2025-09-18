import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReaderPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Força scroll para o topo ao montar a página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterId]);

  useEffect(() => {
    if (!chapterId) return;

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

        setImages(pages);
      } catch (err) {
        console.error("Erro ao buscar capítulo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChapter();
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
    <div className="flex flex-col items-center bg-black text-white p-4 w-full">
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
