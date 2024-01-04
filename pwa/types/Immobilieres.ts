import { Item } from "./item";

export class Immobilieres implements Item {
  public "@id"?: string;

  constructor(
    _id?: string,
    public dateMutations?: Date,
    public price?: number,
    public codeDepartment?: string,
    public region?: string,
    public squareMeters?: number,
    public code_type_local?: string,
    public codeTypeLocal?: string
  ) {
    this["@id"] = _id;
  }
}
