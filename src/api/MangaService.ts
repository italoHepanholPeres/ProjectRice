import axios from "axios";

const baseUrl: string = "https://api.mangadex.org/";

export async function SearchMangas(title: string) {
  const response = await axios.get(`${baseUrl}manga`);
  console.log("${baseUrl}manga");

  return response.data;
}

export async function getMangas() {
  try {
    const response = await axios.get(`${baseUrl}manga`);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}
