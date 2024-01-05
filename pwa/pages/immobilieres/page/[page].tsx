import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Navbar from "../../../components/immobiliere/Navbar";

import {
  PageList,
  getImmobilieres,
  getImmobilieresPath,
} from "../../../components/immobiliere/PageList";
import { PagedCollection } from "../../../types/collection";
import { Immobiliere } from "../../../types/Immobiliere";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getImmobilieresPath(page),
    getImmobilieres(page)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Immobiliere>>("/immobilieres");
  const paths = await getCollectionPaths(
    response,
    "immobilieres",
    "/immobilieres/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

const ImmobilieresPage = ({ immobilieres }) => {
  return (
    <>
      <Navbar /> 
      <PageList immobilieres={immobilieres} />
    </>
  );
};

export default ImmobilieresPage;
