import { FunctionComponent } from "react";
import { Immobiliere } from "../../types/Immobiliere";
import React from "react";

interface Props {
  immobilieres: Immobiliere[];
}

export const DiagrammeABarre: FunctionComponent<Props> = ({
  immobilieres,
}) => {
  return (
    <div className="p-4">
        <h1 className="text-3xl text-center mb-4">Diagramme à barre</h1>
    </div>
  );
};
