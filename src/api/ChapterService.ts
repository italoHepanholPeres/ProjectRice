import axios from "axios";
import type { Chapter } from "../interfaces/Chapter";

export async function getChapters(mangaId: string): Promise<Chapter[]> {
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

  const mappedChapters = (chaptersResponse.data.data || []).map((ch: any) => ({
    id: ch.id,
    title: ch.attributes?.title,
    chapter: ch.attributes?.chapter,
  }));

  return mappedChapters;
}

export async function getChapterPages(chapterId: string): Promise<string[]> {
  const res = await axios.get(
    `https://api.mangadex.org/at-home/server/${chapterId}`,
  );

  const baseUrl = res.data.baseUrl;
  const hash = res.data.chapter.hash;
  const data = res.data.chapter.data;

  const pages = data.map((file: string) => `${baseUrl}/data/${hash}/${file}`);
  return pages;
}
