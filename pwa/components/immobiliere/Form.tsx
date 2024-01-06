import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Immobiliere } from "../../types/Immobiliere";

interface Props {
  immobiliere?: Immobiliere;
}

interface SaveParams {
  values: Immobiliere;
}

interface DeleteParams {
  id: string;
}

const saveImmobiliere = async ({ values }: SaveParams) =>
  await fetch<Immobiliere>(!values["@id"] ? "/immobilieres" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteImmobiliere = async (id: string) =>
  await fetch<Immobiliere>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ immobiliere }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Immobiliere> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveImmobiliere(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Immobiliere> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteImmobiliere(id), {
    onSuccess: () => {
      router.push("/immobilieres");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!immobiliere || !immobiliere["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: immobiliere["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/immobilieres"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {immobiliere
          ? `Edit Immobiliere ${immobiliere["@id"]}`
          : `Create Immobiliere`}
      </h1>
      <Formik
        initialValues={
          immobiliere
            ? {
                ...immobiliere,
              }
            : new Immobiliere()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/immobilieres");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="shadow-md p-4" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_dateMutations"
              >
                dateMutations
              </label>
              <input
                name="dateMutations"
                id="immobiliere_dateMutations"
                value={values.dateMutations?.toLocaleString() ?? ""}
                type="dateTime"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.dateMutations && touched.dateMutations
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.dateMutations && touched.dateMutations
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="dateMutations"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_price"
              >
                price
              </label>
              <input
                name="price"
                id="immobiliere_price"
                value={values.price ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.price && touched.price ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.price && touched.price ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="price"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_codeDepartment"
              >
                codeDepartment
              </label>
              <input
                name="codeDepartment"
                id="immobiliere_codeDepartment"
                value={values.codeDepartment ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.codeDepartment && touched.codeDepartment
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.codeDepartment && touched.codeDepartment
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="codeDepartment"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_region"
              >
                region
              </label>
              <input
                name="region"
                id="immobiliere_region"
                value={values.region ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.region && touched.region ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.region && touched.region ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="region"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_squareMeters"
              >
                squareMeters
              </label>
              <input
                name="squareMeters"
                id="immobiliere_squareMeters"
                value={values.squareMeters ?? ""}
                type="number"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.squareMeters && touched.squareMeters
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.squareMeters && touched.squareMeters
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="squareMeters"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_code_type_local"
              >
                code_type_local
              </label>
              <input
                name="code_type_local"
                id="immobiliere_code_type_local"
                value={values.code_type_local ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.code_type_local && touched.code_type_local
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.code_type_local && touched.code_type_local
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="code_type_local"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="immobiliere_codeTypeLocal"
              >
                codeTypeLocal
              </label>
              <input
                name="codeTypeLocal"
                id="immobiliere_codeTypeLocal"
                value={values.codeTypeLocal ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.codeTypeLocal && touched.codeTypeLocal
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.codeTypeLocal && touched.codeTypeLocal
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="codeTypeLocal"
              />
            </div>
            {status && status.msg && (
              <div
                className={`border px-4 py-3 my-4 rounded ${
                  status.isValid
                    ? "text-cyan-700 border-cyan-500 bg-cyan-200/50"
                    : "text-red-700 border-red-400 bg-red-100"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="inline-block mt-2 bg-cyan-500 hover:bg-cyan-700 text-sm text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {immobiliere && (
          <button
            className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-sm text-red-400 font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
