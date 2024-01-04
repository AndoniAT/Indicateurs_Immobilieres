import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Immobilieres } from "../../types/Immobilieres";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getImmobilieressPath = (page?: string | string[] | undefined) =>
  `/immobilieress${typeof page === "string" ? `?page=${page}` : ""}`;
export const getImmobilieress =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Immobilieres>>(getImmobilieressPath(page));
const getPagePath = (path: string) =>
  `/immobilieress/page/${parsePage("immobilieress", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: immobilieress, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Immobilieres>> | undefined
  >(getImmobilieressPath(page), getImmobilieress(page));
  const collection = useMercure(immobilieress, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Immobilieres List</title>
        </Head>
      </div>
      <List immobilieress={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
