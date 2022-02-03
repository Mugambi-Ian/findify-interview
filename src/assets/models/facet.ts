export enum FacetType {
  null = "",
  Text = "text",
  Color = "color",
  Range = "range",
}

export function getFacetType(x: string) {
  switch (x.toLowerCase()) {
    case FacetType.Color:
      return FacetType.Color;
    case FacetType.Range:
      return FacetType.Range;
    case FacetType.Text:
      return FacetType.Text;
    default:
      return FacetType.null;
  }
}
export class FacetValue {
  value: string = "";
  count: number = 0;
}
export default class Facet {
  name: string = "";
  type: FacetType = FacetType.null;
  values: FacetValue[] = [];

  constructor(facet: any) {
    if (facet) {
      const { name, type, values } = facet;
      this.name = name;
      this.type = getFacetType(type);
      this.values = values;
    }
  }
}
