import axios from "axios";

export async function getNpmRegistryData(name: string) {
  const registryData: LibData = await axios
    .get(`https://registry.npmjs.org/${name}`, {
      responseType: "json",
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });

  return registryData ?? null;
}
