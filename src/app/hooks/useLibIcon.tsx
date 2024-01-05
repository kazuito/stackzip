import axios from "axios";
import { useEffect, useState } from "react";

const defaultIconUrl = "/npm.png";

const useLibIcon = (homepageUrl?: string) => {
  const [iconUrl, setIconUrl] = useState<string>(defaultIconUrl);

  useEffect(() => {
    if (!homepageUrl) return;

    const faviconUrl = new URL(homepageUrl).origin + "/favicon.ico";

    (async () => {
      await axios
        .get(faviconUrl)
        .then((res) => {
          if (res.status === 200) {
            setIconUrl(faviconUrl);
          } else {
            setIconUrl(defaultIconUrl);
          }
        })
        .catch((err) => {
          setIconUrl(defaultIconUrl);
        });
    })();
  }, [homepageUrl]);

  return iconUrl;
};

export default useLibIcon;
