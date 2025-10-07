import axios from "axios";
import type { Manga } from "../interfaces/Manga";
import type { MangaTag } from "../interfaces/MangaTag";
import { mapperToCard } from "../mappers/MangaMapper";

const mangaUrl: string = "https://api.mangadex.org/manga";
const coverUrl: string = "https://api.mangadex.org/cover/";

//mapeia o json
async function mapMangas(mangas: Manga[]) {
  const mapped: Manga[] = await Promise.all(
    mangas.map((manga: any) => mapperToCard(manga)),
  );

  return mapped;
}

//Nao ta sendo usado
/*export async function SearchMangas(title: string) {
  const response = await axios.get(`${baseUrl}manga`);
  console.log("${baseUrl}manga");

  return response.data;
}*/

export async function getMangaList() {
  try {
    const response = await axios.get(`${mangaUrl}`, {
      params: {
        limit: 15,
        "order[updatedAt]": "desc",
        "contentRating[]": ["safe"],
      },
    });

    const mapped: Manga[] = await mapMangas(response.data.data);

    return mapped;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMangaListByTitle(title: string): Promise<Manga[]> {
  try {
    const response = await axios.get(`${mangaUrl}`, {
      params: {
        limit: 15,
        title: title,
        "contentRating[]": ["safe"],
      },
    });
    const mapped: Manga[] = await mapMangas(response.data.data);

    return mapped;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCoverListData(id: string) {
  try {
    const response = await axios.get(`${coverUrl}${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMangaListByTags(
  includedTagsNames: string[] = [],
  excludedTagsNames: string[] = [],
) {
  const apiTags = await axios(`${mangaUrl}/tag`);

  const includedTagIDs = apiTags.data.data
    .filter((tag: MangaTag) =>
      includedTagsNames.includes(tag.attributes.name.en),
    )
    .map((tag: MangaTag) => tag.id);

  const excludedTagIDs = apiTags.data.data
    .filter((tag: MangaTag) =>
      excludedTagsNames.includes(tag.attributes.name.en),
    )
    .map((tag: MangaTag) => tag.id);

  const response = axios.get(`${mangaUrl}`, {
    params: {
      limit: 15,
      includedTags: includedTagIDs,
      excludedTags: excludedTagIDs,
      "contentRating[]": ["safe"],
    },
  });

  const mapped = mapMangas((await response).data.data);
  return mapped;
}

export async function getMangaInfo(mangaId: string) {
  try {
    const response = await axios.get(
      `https://api.mangadex.org/manga/${mangaId}`,
      {
        params: {
          "contentRating[]": ["safe"],
          includes: ["cover_art"],
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
