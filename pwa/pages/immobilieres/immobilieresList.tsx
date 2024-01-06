import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Navbar from "../../components/immobiliere/Navbar";

import {
  PageList,
  getImmobilieres,
  getImmobilieresPath,
} from "../../components/immobiliere/PageList";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getImmobilieresPath(), getImmobilieres());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};
const PageWithNavbar = () => {
    return (
      <>
        <Navbar />
        <PageList />
      </>
    );
  };
  
  export default PageWithNavbar;
