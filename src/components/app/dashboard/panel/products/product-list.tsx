import { FC } from "react";
import { ApplicationContext } from "../../../../../assets/widgets/types/types";
import ProductSkeleton from "./product-skeleton/product-skeleton";
import ProductCard from "./product-card/product-card";
import "./product-list.scss";

const ProductList: FC<{
}> = (props) => {
    return (
        <ApplicationContext.Consumer>
            {({ loaded, products }) => {
                return (
                    <ul id="product-list">
                        {loaded
                            ? products.map((product, i) => {
                                return <ProductCard key={i} product={product} />;
                            })
                            : [1, 2, 3, 4, 5, 6].map((v) => {
                                return <ProductSkeleton key={v} />;
                            })}
                        <div style={{ minWidth: "100%", minHeight: "50px" }} />
                    </ul>
                );
            }}
        </ApplicationContext.Consumer>
    );
};

export default ProductList;
