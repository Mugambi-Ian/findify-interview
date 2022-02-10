import { Color } from "../models/colors";
import { FacetType } from "../models/facet";
import {
  BreadCrumbColor,
  BreadCrumbRange,
  BreadCrumbText,
  FacetUi,
} from "../widgets/types/types";
import Dictionary from "./dictionary";

export const resetCrumbs = (
  facet_ui: FacetUi[],
  colorSchema: Dictionary<Color>,
  callback: (x: {
    color: BreadCrumbColor[];
    range: BreadCrumbRange[];
    text: BreadCrumbText[];
  }) => void
) => {
  const range: BreadCrumbRange[] = [];
  const color: BreadCrumbColor[] = [];
  const text: BreadCrumbText[] = [];

  facet_ui.forEach((f, i) => {
    switch (f.value.type) {
      case FacetType.Range:
        if (f.selected[0].activated) {
          const { min_range, max_range } = f.selected[0];
          range.push({
            min_range,
            max_range,
            facet_name: f.value.name,
            facet_index: i,
            default_range: f.selected[0].value.value,
          });
        }
        break;
      case FacetType.Color:
        let r = f.selected.filter((x, i) => {
          return x.activated;
        });
        const values = r.map((x) => {
          return {
            color: colorSchema.get(x.value.value),
            index: x.index,
          };
        });
        if (values.length !== 0)
          color.push({
            facet_name: f.value.name,
            values,
            facet_index: i,
          });
        break;
      case FacetType.Text:
        let t = f.selected.filter((x) => {
          return x.activated;
        });
        const _t = t.map((x) => {
          const { value, index } = x;
          return { value, index };
        });
        if (_t.length !== 0)
          text.push({
            facet_name: f.value.name,
            values: _t,
            facet_index: i,
          });
        break;
      default:
        break;
    }
  });

  callback({
    color,
    range,
    text,
  });
};
