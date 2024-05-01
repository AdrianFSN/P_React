import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAdvert } from "./service";
import Layout from "../../components/layout/Layout";
import Advert from "./components/Advert";

export function AdvertPage() {
  const params = useParams();
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    async function getAdvertsFromService() {
      const advert = await getAdvert(params.advertId);
      setAdvert(advert);
    }
    getAdvertsFromService();
  }, [params.advertId]);

  return (
    <Layout title="Advert info">
      {advert && (
        <Advert
          id={advert.id}
          name={advert.name}
          price={advert.price}
          tags={advert.tags}
          photo={advert.photo}
        />
      )}
    </Layout>
  );
}
