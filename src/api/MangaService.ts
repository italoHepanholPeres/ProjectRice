import axios from "axios";

const baseUrl: string = "https://api.mangadex.org/";
const coverUrl: string = "https://api.mangadex.org/cover/";

export async function SearchMangas(title: string) {
  const response = await axios.get(`${baseUrl}manga`);
  console.log("${baseUrl}manga");

  return response.data;
}

export async function getMangas() {
  try {
    const response = await axios.get(`${baseUrl}manga`, {
      params: {
        limit: 15,
        "order[updatedAt]": "desc",
        "contentRating[]": ["safe"],
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMangaByTitle(title: string) {
  try {
    const response = await axios.get(`${baseUrl}/manga`, {
      params: {
        limit: 15,
        title: title,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCoverData(id: string) {
  try {
    const response = await axios.get(`${coverUrl}${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
