import axios from "axios";

export async function getNpmRegistryData(name: string) {
  const registryData = await axios
    .get(`https://registry.npmjs.org/${name}`, {
      responseType: "json",
    })
    .then((res) => res.data);

  return registryData;
}
