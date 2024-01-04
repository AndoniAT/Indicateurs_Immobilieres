import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import { fetch, getItemPath } from "../../utils/dataAccess";
import { Immobilieres } from "../../types/Immobilieres";

interface Props {
  immobilieres: Immobilieres;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ immobilieres, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!immobilieres["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(immobilieres["@id"], { method: "DELETE" });
      router.push("/immobilieress");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Head>
        <title>{`Show Immobilieres ${immobilieres["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <Link
        href="/immobilieress"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {"< Back to list"}
      </Link>
      <h1 className="text-3xl mb-2">{`Show Immobilieres ${immobilieres["@id"]}`}</h1>
      <table
        cellPadding={10}
        className="shadow-md table border-collapse min-w-full leading-normal table-auto text-left my-3"
      >
        <thead className="w-full text-xs uppercase font-light text-gray-700 bg-gray-200 py-2 px-4">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          <tr>
            <th scope="row">dateMutations</th>
            <td>{immobilieres["dateMutations"]?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">price</th>
            <td>{immobilieres["price"]}</td>
          </tr>
          <tr>
            <th scope="row">codeDepartment</th>
            <td>{immobilieres["codeDepartment"]}</td>
          </tr>
          <tr>
            <th scope="row">region</th>
            <td>{immobilieres["region"]}</td>
          </tr>
          <tr>
            <th scope="row">squareMeters</th>
            <td>{immobilieres["squareMeters"]}</td>
          </tr>
          <tr>
            <th scope="row">code_type_local</th>
            <td>{immobilieres["code_type_local"]}</td>
          </tr>
          <tr>
            <th scope="row">codeTypeLocal</th>
            <td>{immobilieres["codeTypeLocal"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div
          className="border px-4 py-3 my-4 rounded text-red-700 border-red-400 bg-red-100"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="flex space-x-2 mt-4 items-center justify-end">
        <Link
          href={getItemPath(immobilieres["@id"], "/immobilieress/[id]/edit")}
          className="inline-block mt-2 border-2 border-cyan-500 bg-cyan-500 hover:border-cyan-700 hover:bg-cyan-700 text-xs text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
        <button
          className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-xs text-red-400 font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
