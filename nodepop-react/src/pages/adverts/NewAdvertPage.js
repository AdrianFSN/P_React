import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { createNewAd } from "./service";
import { useNavigate } from "react-router-dom";
import FormField from "../../components/shared/FormField";
import CheckBox from "../../components/shared/CheckBox";
import Button from "../../components/shared/Button";
import SelectMenu from "../../components/shared/SelectMenu";

function NewAdvertForm() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });
  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };
  console.log("Esto es tags ahora ", formValues.tags);

  const [checkBoxStatus, setCheckBoxStatus] = useState(true);

  const handleCheckboxChange = () => {
    setCheckBoxStatus((prevStatus) => !prevStatus);
  };

  const [selectedTags, setSelectedTags] = useState([]);

  const handleSelectMenuChange = (event) => {
    event.preventDefault();
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTags(selectedOptions);
  };

  const { name, sale, price, tags } = formValues;
  const buttonDisabled =
    !name || !sale || price <= 0 || isNaN(price) || tags.length === 0;

  useEffect(() => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      tags: selectedTags,
    }));
  }, [selectedTags]);

  console.log("Esto es selectedTags ", selectedTags);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Esto es ahora formValues", formValues);
    await createNewAd(formValues);
    navigate("/v1/adverts");
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
      {/*       <FormField
        type="text"
        name="tags"
        value={tags}
        onChange={handleChange}
        placeholder="Enter category(s) separated by commas"
      /> */}
      <SelectMenu
        type="text"
        name="tags"
        optionsArray={["Lifestyle", "Motor", "Mobile", "Work"]}
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

function NewAdvertPage({ ...props }) {
  return (
    <Layout title="Create your advert" {...props}>
      <NewAdvertForm />
    </Layout>
  );
}
export default NewAdvertPage;