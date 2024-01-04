import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Immobilieres } from "../../types/Immobilieres";

interface Props {
  immobilieres?: Immobilieres;
}

interface SaveParams {
  values: Immobilieres;
}

interface DeleteParams {
  id: string;
}

const saveImmobilieres = async ({ values }: SaveParams) =>
  await fetch<Immobilieres>(!values["@id"] ? "/immobilieress" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteImmobilieres = async (id: string) =>
  await fetch<Immobilieres>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ immobilieres }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Immobilieres> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveImmobilieres(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Immobilieres> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteImmobilieres(id), {
    onSuccess: () => {
      router.push("/immobilieress");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!immobilieres || !immobilieres["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: immobilieres["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/immobilieress"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {immobilieres
          ? `Edit Immobilieres ${immobilieres["@id"]}`
          : `Create Immobilieres`}
      </h1>
      <Formik
        initialValues={
          immobilieres
            ? {
                ...immobilieres,
              }
            : new Immobilieres()
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
                router.push("/immobilieress");
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
                htmlFor="immobilieres_dateMutations"
              >
                dateMutations
              </label>
              <input
                name="dateMutations"
                id="immobilieres_dateMutations"
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
                htmlFor="immobilieres_price"
              >
                price
              </label>
              <input
                name="price"
                id="immobilieres_price"
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
                htmlFor="immobilieres_codeDepartment"
              >
                codeDepartment
              </label>
              <input
                name="codeDepartment"
                id="immobilieres_codeDepartment"
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
                htmlFor="immobilieres_region"
              >
                region
              </label>
              <input
                name="region"
                id="immobilieres_region"
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
                htmlFor="immobilieres_squareMeters"
              >
                squareMeters
              </label>
              <input
                name="squareMeters"
                id="immobilieres_squareMeters"
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
                htmlFor="immobilieres_code_type_local"
              >
                code_type_local
              </label>
              <input
                name="code_type_local"
                id="immobilieres_code_type_local"
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
                htmlFor="immobilieres_codeTypeLocal"
              >
                codeTypeLocal
              </label>
              <input
                name="codeTypeLocal"
                id="immobilieres_codeTypeLocal"
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
        {immobilieres && (
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
