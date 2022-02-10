/* eslint-disable no-empty-pattern */
import { createContext } from "react";
import { Color } from "../../models/colors";
import Facet, { FacetValue } from "../../models/facet";
import Product from "../../models/product";
import Dictionary from "../../utils/dictionary";

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
  color: BreadCrumbColor[];
}

export interface ApplicationContextInterface {
  loaded: boolean;
  colorSchema: Dictionary<Color>;
  products: Product[];
  facets: Facet[];
}

export interface FilterContextInterface {
  facet_ui: FacetUi[];
  updateFacetUi: (facet_ui: FacetUi[]) => void;
  crumbs: BreadCrumb;
}

export const ApplicationContext = createContext<ApplicationContextInterface>({
  loaded: false,
  colorSchema: new Dictionary(),
  products: [],
  facets: [],
});

export const FilterContext = createContext<FilterContextInterface>({
  facet_ui: [],
  updateFacetUi: ([]) => {},
  crumbs: { color: [], range: [], text: [] },
});
