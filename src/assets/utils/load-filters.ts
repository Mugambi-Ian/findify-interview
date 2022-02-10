import Facet, { FacetType } from "../models/facet";

export function loadFacetUI(facets: Facet[]) {
  const facet_ui = facets.map((p) => {
    const selected =
      p.type === FacetType.Color || p.type === FacetType.Text
        ? p.values.map((x, i) => {
            return {
              value: x,
              activated: false,
              min_range: -1,
              max_range: -1,
              index: i,
            };
          })
        : [
            {
              value: p.values[0],
              activated: false,
              min_range: -1,
              max_range: -1,
              index: 0,
            },
          ];
    return {
      activated: false,
      display_more: false,
      selected,
      value: p,
    };
  });
  return facet_ui;
}
