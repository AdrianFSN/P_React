import { useParams } from "react-router-dom";
export function AdvertPage() {
  const params = useParams();
  console.log(params);

  return <div>Detalle del advert</div>;
}