import { createContext } from "react";
import { Color } from "../../models/colors";
import Facet, { FacetValue } from "../../models/facet";

export interface FacetUiItem {
  value: FacetValue;
  activated: boolean;
  min_range: number;
  max_range: number;
  index: number;
}

export interface FacetUi {
  activated: boolean;
  display_more: boolean;
  selected: FacetUiItem[];
  value: Facet;
}

export interface BreadCrumbRange {
  min_range: number;
  max_range: number;
  facet_name: string;
  facet_index: number;
  default_range: string;
}

export interface BreadCrumbText {
  facet_name: string;
  values: { value: FacetValue; index: number }[];
  facet_index: number;
}

export interface BreadCrumbColor {
  facet_name: string;
  values: { color: Color | null; index: number }[];
  facet_index: number;
}

export interface BreadCrumb {
  range: BreadCrumbRange[];
  text: BreadCrumbText[];
  colors: BreadCrumbColor[];
}

export interface ApplicationContext {
  loaded: boolean;
}

export const Context = createContext<ApplicationContext>({
  loaded: false,
});
