import React, { useCallback, useEffect, useReducer, useState } from "react";
import DashboardSkeleton from "./skeleton/skeleton";
import Dashboard from "./dashboard/dashboard";
import Facet from "../../assets/models/facet";
import Product from "../../assets/models/product";
import { Color } from "../../assets/models/colors";
import Dictionary from "../../assets/utils/dictionary";
import {
  fetchColorMappingSchema,
  fetchProducts,
} from "../../assets/utils/sync";
import "./app.css";

const App: React.FC = () => {
  const [loading, updateLoadingStatus] = useState<{
    products: boolean;
    color: boolean;
  }>({
    color: true,
    products: true,
  });

  const [products, updateProducts] = useState<Product[]>([]);
  const [facets, updateFacets] = useState<Facet[]>([]);
  const [colorSchema, updateColorSchema] = useState<Dictionary<Color>>(
    new Dictionary()
  );
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const syncProducts = useCallback(async () => {
    const json = await fetchProducts();
    const _products = json.items.map((x: any) => {
      return new Product(x);
    });
    const _facets = json.facets.map((x: any) => {
      return new Facet(x);
    });
    loading.products = false;
    updateFacets(_facets);
    updateProducts(_products);
    updateLoadingStatus(loading);
    forceUpdate();
  }, [loading]);

  const syncColors = useCallback(async () => {
    const colors = await fetchColorMappingSchema();
    const _colors = new Dictionary<Color>();
    colors.forEach((c: any) => {
      const _c = new Color(c);
      _colors.set(_c.name, _c);
    });
    loading.color = false;
    updateColorSchema(_colors);
    updateLoadingStatus(loading);
  }, [loading]);

  useEffect(() => {
    try {
      if (loading.products) syncProducts();
      if (loading.color) syncColors();
    } catch (error) {
      console.log(error);
    }
  }, [syncColors, syncProducts, loading]);

  return !(loading.color || loading.products) ? (
    <Dashboard
      colorSchema={colorSchema}
      facets={facets}
      products={products}
      loaded={!(loading.color || loading.products)}
    />
  ) : (
    <DashboardSkeleton />
  );
};

export default App;
