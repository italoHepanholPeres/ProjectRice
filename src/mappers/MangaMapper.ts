interface Manga {
  id: string;
  title: string;
  cover: string;
  additionalInfo?: string;
}

export default function (manga: any): Manga {
  const id = manga.id;

  const title =
    manga.attributes?.title?.["pt-br"] ||
    manga.attributes?.title?.["en"] ||
    "sem título";

  return {
    id,
    title,
  };
}
