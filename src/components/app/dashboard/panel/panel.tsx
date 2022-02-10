import { FC } from "react";
import CrumbsList from "./bread-crumbs/crumbs-list";
import ProductList from "./products/product-list";
import "./panel.scss";

const Panel: FC = () => {

  return (
    <section id="panel">
      <CrumbsList />
      <ProductList />
    </section>
  );
};

export default Panel;
