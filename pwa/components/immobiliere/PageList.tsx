import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Immobiliere } from "../../types/Immobiliere";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getImmobilieresPath = (page?: string | string[] | undefined) =>
  `/immobilieres${typeof page === "string" ? `?page=${page}` : ""}`;
export const getImmobilieres =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Immobiliere>>(getImmobilieresPath(page));
const getPagePath = (path: string) =>
  `/immobilieres/page/${parsePage("immobilieres", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: immobilieres, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Immobiliere>> | undefined
  >(getImmobilieresPath(page), getImmobilieres(page));
  const collection = useMercure(immobilieres, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Immobilieres List</title>
        </Head>
      </div>
      <List immobilieres={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
