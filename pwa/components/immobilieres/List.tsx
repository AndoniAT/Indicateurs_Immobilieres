import { FunctionComponent } from "react";
import Link from "next/link";

import ReferenceLinks from "../common/ReferenceLinks";
import { getItemPath } from "../../utils/dataAccess";
import { Immobilieres } from "../../types/Immobilieres";

interface Props {
  immobilieress: Immobilieres[];
}

export const List: FunctionComponent<Props> = ({ immobilieress }) => (
  <div className="p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl mb-2">Immobilieres List</h1>
      <Link
        href="/immobilieress/graphiques"
        className="bg-cyan-500 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4 rounded"
      >
        Graphiques
      </Link>
      <Link
        href="/immobilieress/diagramme_a_barre"
        className="bg-cyan-500 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4 rounded mr-2"
      >
        Diagramme à barre
      </Link>
      <Link
        href="/immobilieress/create"
        className="bg-cyan-500 hover:bg-cyan-700 text-white text-sm font-bold py-2 px-4 rounded"
      >
        Create
      </Link>
    </div>
    <table
      cellPadding={10}
      className="shadow-md table border-collapse min-w-full leading-normal table-auto text-left my-3"
    >
      <thead className="w-full text-xs uppercase font-light text-gray-700 bg-gray-200 py-2 px-4">
        <tr>
          <th>id</th>
          <th>dateMutations</th>
          <th>price</th>
          <th>codeDepartment</th>
          <th>region</th>
          <th>squareMeters</th>
          <th>code_type_local</th>
          <th>codeTypeLocal</th>
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-200">
        {immobilieress &&
          immobilieress.length !== 0 &&
          immobilieress.map(
            (immobilieres) =>
              immobilieres["@id"] && (
                <tr className="py-2" key={immobilieres["@id"]}>
                  <th scope="row">
                    <ReferenceLinks
                      items={{
                        href: getItemPath(
                          immobilieres["@id"],
                          "/immobilieress/[id]"
                        ),
                        name: immobilieres["@id"],
                      }}
                    />
                  </th>
                  <td>{immobilieres["dateMutations"]?.toLocaleString()}</td>
                  <td>{immobilieres["price"]}</td>
                  <td>{immobilieres["codeDepartment"]}</td>
                  <td>{immobilieres["region"]}</td>
                  <td>{immobilieres["squareMeters"]}</td>
                  <td>{immobilieres["code_type_local"]}</td>
                  <td>{immobilieres["codeTypeLocal"]}</td>
                  <td className="w-8">
                    <Link
                      href={getItemPath(
                        immobilieres["@id"],
                        "/immobilieress/[id]"
                      )}
                      className="text-cyan-500"
                    >
                      Show
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </td>
                  <td className="w-8">
                    <Link
                      href={getItemPath(
                        immobilieres["@id"],
                        "/immobilieress/[id]/edit"
                      )}
                      className="text-cyan-500"
                    >
                      Edit
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              )
          )}
      </tbody>
    </table>
  </div>
);
