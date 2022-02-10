import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "./dashboard/dashboard";
import Facet from "../../assets/models/facet";
import Product from "../../assets/models/product";
import { Color } from "../../assets/models/colors";
import Dictionary from "../../assets/utils/dictionary";
import {
  fetchColorMappingSchema,
  fetchProducts,
} from "../../assets/utils/sync";
import "./app.scss";
import { ApplicationContext } from "../../assets/widgets/types/types";

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

  const syncProducts = useCallback(async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, [loading]);

  const syncColors = useCallback(async () => {
    try {
      const colors = await fetchColorMappingSchema();
      const _colors = new Dictionary<Color>();
      colors.forEach((c: any) => {
        const _c = new Color(c);
        _colors.set(_c.name, _c);
      });
      loading.color = false;
      updateColorSchema(_colors);
      updateLoadingStatus(loading);
    } catch (e) {
      console.log(e);
    }
  }, [loading]);

  useEffect(() => {
    if (loading.products) syncProducts();
    if (loading.color) syncColors();
    return () => {
      updateLoadingStatus({ products: true, color: true });
    };
  }, [syncColors, syncProducts, loading]);

  return (
    <ApplicationContext.Provider
      value={{
        loaded: !(loading.color || loading.products),
        colorSchema,
        facets,
        products
      }}
    >
      <Dashboard
        colorSchema={colorSchema}
        facets={facets}
      />
    </ApplicationContext.Provider>
  );
};

export default App;
