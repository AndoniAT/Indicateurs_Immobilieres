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

import { Form } from "../../../components/immobiliere/Form";
import { PagedCollection } from "../../../types/collection";
import { Immobiliere } from "../../../types/Immobiliere";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getImmobiliere = async (id: string | string[] | undefined) =>
  id
    ? await fetch<Immobiliere>(`/immobilieres/${id}`)
    : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: immobiliere } = {} } = useQuery<
    FetchResponse<Immobiliere> | undefined
  >(["immobiliere", id], () => getImmobiliere(id));

  if (!immobiliere) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>
            {immobiliere && `Edit Immobiliere ${immobiliere["@id"]}`}
          </title>
        </Head>
      </div>
      <Form immobiliere={immobiliere} />
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
    "/immobilieres/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
