import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getGreetings,
  getGreetingsPath,
} from "../../../components/greeting/PageList";
import { PagedCollection } from "../../../types/collection";
import { Greeting } from "../../../types/Greeting";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getGreetingsPath(page), getGreetings(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Greeting>>("/greetings");
  const paths = await getCollectionPaths(
    response,
    "greetings",
    "/greetings/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
