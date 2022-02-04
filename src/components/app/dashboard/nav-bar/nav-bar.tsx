import { FC } from "react";
import Facet, { FacetType, FacetValue } from "../../../../assets/models/facet";
import { FacetUi } from "../../../../assets/widgets/types/types";
import Slider from "../../../../assets/widgets/slider/slider";
import { Color } from "../../../../assets/models/colors";
import Dictionary from "../../../../assets/utils/dictionary";
import checkSvg from "../../../../assets/img/bg-check.svg";
import boxSvg from "../../../../assets/img/bg-box.svg";
import "./nav-bar.scss";

const NavBar: FC<{
  facets: Facet[];
  facet_ui: FacetUi[];
  updateFacetUi: (facet_ui: FacetUi[]) => void;
  colorSchema: Dictionary<Color>;
}> = (props) => {
  const facetValues = (
    values: { value: string; count: number }[],
    type: FacetType,
    facetIndex: number
  ): JSX.Element[] => {
    return values.map((v, i) => {
      return (
        <li key={i} id="value-item">
          {facetTypeWidget(v, type, i, facetIndex)}
        </li>
      );
    });
  };

  const facetTypeWidget = (
    v: FacetValue,
    type: FacetType,
    valueIndex: number,
    facetIndex: number
  ): JSX.Element => {
    switch (type) {
      case FacetType.Text:
        return (
          <>
            <button
              id="select"
              onClick={() =>
                setTimeout(() => {
                  facet_ui[facetIndex].selected[valueIndex].activated =
                    !facet_ui[facetIndex].selected[valueIndex].activated;
                  updateFacetUi(facet_ui);
                }, 200)
              }
            >
              <img src={boxSvg} alt="icon" id="box" />
              {facet_ui[facetIndex].selected[valueIndex].activated ? (
                <img src={checkSvg} alt="check-mark" id="check" />
              ) : (
                ""
              )}
            </button>
            <h6>{v.value}</h6>
            <p>({v.count})</p>{" "}
          </>
        );
      case FacetType.Color:
        const color = props.colorSchema.get(v.value);
        return (
          <>
            <button
              onClick={() =>
                setTimeout(() => {
                  facet_ui[facetIndex].selected[valueIndex].activated =
                    !facet_ui[facetIndex].selected[valueIndex].activated;
                  updateFacetUi(facet_ui);
                }, 200)
              }
              className="color"
              id="select"
              style={
                color?.isHex
                  ? { backgroundColor: color.code }
                  : {
                      backgroundImage: `url(${color?.code})`,
                    }
              }
            >
              {facet_ui[facetIndex].selected[valueIndex].activated ? (
                <img src={checkSvg} alt="check-mark" id="check" />
              ) : (
                ""
              )}
            </button>
            <h6>{v.value}</h6>
            <p>({v.count})</p>{" "}
          </>
        );
      case FacetType.Range:
        const min_value = parseInt(v.value.split("_")[0]);
        const max_value = parseInt(v.value.split("_")[1]);
        return (
          <>
            <Slider
              currency={true}
              maxValue={max_value}
              minValue={min_value}
              value={{
                max: facet_ui[facetIndex].selected[0].max_range,
                min: facet_ui[facetIndex].selected[0].min_range,
              }}
              onChange={(min, max) =>
                setTimeout(() => {
                  facet_ui[facetIndex].selected[0].activated =
                    min !== min_value || max !== max_value;
                  if (min) {
                    facet_ui[facetIndex].selected[0].min_range = min;
                    updateFacetUi(facet_ui);
                  }
                  if (max) {
                    facet_ui[facetIndex].selected[0].max_range = max;
                    updateFacetUi(facet_ui);
                  }
                }, 200)
              }
            />
          </>
        );
      default:
        return <div />;
    }
  };

  const { facet_ui, updateFacetUi, facets } = props;
  return (
    <nav>
      <header id="title">
        <h1>Search Results</h1>
        <img
          onClick={() =>
            window.open("https://github.com/Mugambi-Ian", "_blank")
          }
          src={require("../.../../../../../assets/img/ic-github.png")}
          alt="findify"
        />
      </header>
      <header id="filter-title">
        <h2>Filters</h2>
        <img
          src={require("../../../../assets/img/ic-filter.png")}
          alt="filter"
        />
      </header>
      <ul id="facet-list">
        {facets.map((facet, i) => {
          return (
            <li id="facet-item">
              <header>
                <h3>{facet.name}</h3>
                <button
                  onClick={() =>
                    setTimeout(() => {
                      facet_ui[i].display_more = facet_ui[i].activated
                        ? false
                        : facet_ui[i].display_more;
                      facet_ui[i].activated = !facet_ui[i].activated;
                      updateFacetUi(facet_ui);
                    }, 200)
                  }
                >
                  <span>{facet_ui[i].activated ? "➖" : "➕"}</span>
                </button>
              </header>
              <div
                id={facet_ui[i].activated ? "on" : ""}
                className="facet-content"
              >
                <ul
                  id="values-list"
                  style={!facet_ui[i].activated ? { display: "none" } : {}}
                >
                  {facetValues(
                    !facet_ui[i].display_more
                      ? facet.values.slice(0, 6)
                      : facet.values,
                    facet.type,
                    i
                  )}
                </ul>
                {facet.values.length > 6 && facet_ui[i].activated ? (
                  <button
                    id="more-values"
                    onClick={() =>
                      setTimeout(() => {
                        facet_ui[i].display_more = !facet_ui[i].display_more;
                        updateFacetUi(facet_ui);
                      }, 200)
                    }
                  >
                    <span>
                      {facet_ui[i].display_more ? "Less ➖" : "More ➕"}
                    </span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
