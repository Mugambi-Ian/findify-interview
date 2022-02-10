import { FC } from "react";
import "./product-skeleton.scss"

const ProductSkeleton: FC<{ key: number }> = (p) => {
    return (
        <li id="product-item" key={p.key}>
            <div
                style={{
                    flex: 1,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    className="skeleton"
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        overflow: "hidden",
                    }}
                />
            </div>
            <div
                style={{
                    background: "#fff",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "120px",
                }}
            >
                <h1 className="skeleton"> </h1>
                <h4 className="skeleton"> </h4>
            </div>
        </li>
    );
};

export default ProductSkeleton;