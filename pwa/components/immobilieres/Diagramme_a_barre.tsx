import { FunctionComponent } from "react";
import { Immobilieres } from "../../types/Immobilieres";
import React from "react";

interface Props {
  immobilieress: Immobilieres[];
}

export const DiagrammeABarre: FunctionComponent<Props> = ({
  immobilieress,
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl mb-2">Diagramme à barre</h1>
      </div>
    </div>
  );
};
