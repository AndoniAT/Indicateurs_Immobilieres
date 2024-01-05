import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Navbar from "../../components/immobilieres/Navbar";

import {
  PageList,
  getImmobilieress,
  getImmobilieressPath,
} from "../../components/immobilieres/PageList";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getImmobilieressPath(), getImmobilieress());

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
        <Navbar /> {/* Ajoutez le composant Navbar ici */}
        <PageList />
      </>
    );
  };
  
  export default PageWithNavbar;
