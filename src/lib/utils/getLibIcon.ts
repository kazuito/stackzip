import axios from "axios";

export default async function getLibIcon(homepageUrl: string | undefined) {
  if (!homepageUrl) return "https://www.google.com/favicon.ico";

  const faviconUrl = homepageUrl + "/favicon.ico";

  // wether this is a valid url or not, we want to make a request to it
  const res = await axios
    .get(faviconUrl)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(res);

  return "https://www.google.com/favicon.ico";
}
