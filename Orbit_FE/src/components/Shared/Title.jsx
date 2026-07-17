import { Helmet } from "react-helmet-async";

const Title = ({
  title = "Orbit",
  description = "This is the chat app called Orbit",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
