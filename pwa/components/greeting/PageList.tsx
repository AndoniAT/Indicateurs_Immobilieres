import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Greeting } from "../../types/Greeting";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getGreetingsPath = (page?: string | string[] | undefined) =>
  `/greetings${typeof page === "string" ? `?page=${page}` : ""}`;
export const getGreetings =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Greeting>>(getGreetingsPath(page));
const getPagePath = (path: string) =>
  `/greetings/page/${parsePage("greetings", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: greetings, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Greeting>> | undefined
  >(getGreetingsPath(page), getGreetings(page));
  const collection = useMercure(greetings, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Greeting List</title>
        </Head>
      </div>
      <List greetings={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
