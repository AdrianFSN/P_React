import { useEffect, useState } from "react";
import { createNewAd, getTags } from "../service";
import { useNavigate } from "react-router-dom";
import FormField from "../../../components/shared/FormField";
import CheckBox from "../../../components/shared/CheckBox";
import Button from "../../../components/shared/Button";
import SelectMenu from "../../../components/shared/SelectMenu";
import FileUploadInput from "../../../components/shared/FileInput";

function NewAdvertForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });

  const [checkBoxStatus, setCheckBoxStatus] = useState(true);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const getTagsFromApi = async () => {
      try {
        const response = await getTags();
        setAvailableTags(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTagsFromApi();
  }, []);

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = () => {
    setCheckBoxStatus((prevStatus) => !prevStatus);
  };

  const handleSelectMenuChange = (event) => {
    event.preventDefault();
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setSelectedTags(selectedOptions);
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
  };

  const { name, sale, price, tags } = formValues;
  const buttonDisabled =
    !name || !sale || price <= 0 || isNaN(price) || tags.length === 0;

  useEffect(() => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tags: selectedTags,
      photo: uploadedFile,
    }));
  }, [selectedTags, uploadedFile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const createdAd = await createNewAd(formValues);
      navigate(`/v1/adverts/${createdAd.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate("/auth/login");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="What's your offer about?"
      />
      <FormField
        type="text"
        name="price"
        value={price}
        onChange={handleChange}
        placeholder="Enter a price in €"
      />
      <SelectMenu
        type="text"
        name="tags"
        //optionsArray={["amor", "pasión", "toros"]}
        optionsArray={availableTags}
        value={selectedTags}
        multiple
        onChange={handleSelectMenuChange}
      />
      <CheckBox
        label="Check if you want to sell, uncheck if you want to buy"
        name="sale"
        checked={checkBoxStatus}
        onChange={handleCheckboxChange}
      />

      <FileUploadInput onChange={handleFileUpload} />

      <Button
        className="loginForm-submit"
        type="submit"
        $variant="primary"
        disabled={buttonDisabled}
      >
        Submit Advert
      </Button>
    </form>
  );
}
export default NewAdvertForm;
