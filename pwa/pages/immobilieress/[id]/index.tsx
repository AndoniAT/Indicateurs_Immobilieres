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

import { Show } from "../../../components/immobilieres/Show";
import { PagedCollection } from "../../../types/collection";
import { Immobilieres } from "../../../types/Immobilieres";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getImmobilieres = async (id: string | string[] | undefined) =>
  id
    ? await fetch<Immobilieres>(`/immobilieress/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: immobilieres, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<Immobilieres> | undefined>(
    ["immobilieres", id],
    () => getImmobilieres(id)
  );
  const immobilieresData = useMercure(immobilieres, hubURL);

  if (!immobilieresData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Immobilieres ${immobilieresData["@id"]}`}</title>
        </Head>
      </div>
      <Show immobilieres={immobilieresData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["immobilieres", id], () =>
    getImmobilieres(id)
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
  const paths = await getItemPaths(
    response,
    "immobilieress",
    "/immobilieress/[id]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
