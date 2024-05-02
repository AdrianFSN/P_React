import Layout from "../../components/layout/Layout";
import NewAdvertForm from "./NewAdvertForm";

function NewAdvertPage({ ...props }) {
  return (
    <Layout title="Create your advert" {...props}>
      <NewAdvertForm />
    </Layout>
  );
}
export default NewAdvertPage;
