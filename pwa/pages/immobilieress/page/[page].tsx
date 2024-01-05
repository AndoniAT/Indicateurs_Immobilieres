import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import Navbar from "../../../components/immobilieres/Navbar";

import {
  PageList,
  getImmobilieress,
  getImmobilieressPath,
} from "../../../components/immobilieres/PageList";
import { PagedCollection } from "../../../types/collection";
import { Immobilieres } from "../../../types/Immobilieres";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getImmobilieressPath(page),
    getImmobilieress(page)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Immobilieres>>("/immobilieress");
  const paths = await getCollectionPaths(
    response,
    "immobilieress",
    "/immobilieress/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

const ImmobilieressPage = ({ immobilieress }) => {
  return (
    <>
      <Navbar /> 
      <PageList immobilieress={immobilieress} />
    </>
  );
};

export default ImmobilieressPage;
