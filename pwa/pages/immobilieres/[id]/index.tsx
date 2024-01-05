import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/immobiliere/Show";
import { PagedCollection } from "../../../types/collection";
import { Immobiliere } from "../../../types/Immobiliere";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getImmobiliere = async (id: string | string[] | undefined) =>
  id
    ? await fetch<Immobiliere>(`/immobilieres/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: immobiliere, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<Immobiliere> | undefined>(
    ["immobiliere", id],
    () => getImmobiliere(id)
  );
  const immobiliereData = useMercure(immobiliere, hubURL);

  if (!immobiliereData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Immobiliere ${immobiliereData["@id"]}`}</title>
        </Head>
      </div>
      <Show immobiliere={immobiliereData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["immobiliere", id], () =>
    getImmobiliere(id)
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
  const paths = await getItemPaths(
    response,
    "immobilieres",
    "/immobilieres/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
