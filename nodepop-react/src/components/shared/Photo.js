import { useEffect, useState } from "react";
import ImageNotAvailable from "../../assets/ImageNotAvailable.jpg";

function Photo({ photo, alt }) {
  const [photoUrl, setPhotoUrl] = useState(ImageNotAvailable);

  useEffect(() => {
    if (photo) {
      setPhotoUrl(photo);
    }
  }, [photo]);

  return <img src={photoUrl} alt={alt}></img>;
}

export default Photo;
