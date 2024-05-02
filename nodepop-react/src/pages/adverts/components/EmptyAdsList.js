import { useNavigate } from "react-router-dom";
import Button from "../../../components/shared/Button";

const EmptyAdsList = () => {
  const navigate = useNavigate();
  const navigateToCreateNewAd = () => {
    navigate("/v1/adverts/new");
  };

  return (
    <section>
      <p>Nothing to see here... Be the first one and publish your advert!</p>
      <Button onClick={navigateToCreateNewAd} $variant="primary">
        Create advert
      </Button>
    </section>
  );
};

export default EmptyAdsList;