import React, { useEffect } from "react";
import "./slider.scss";
import { updateSlider } from "./update";

const Slider: React.FC<{
  minValue: number;
  maxValue: number;
  value: { min: number; max: number };
  onChange: (min?: number, max?: number) => void;
  currency?: boolean;
}> = (props) => {
  
  useEffect(() => {
    const leftSlider = document.getElementById("slider-left");
    if (leftSlider) {
      leftSlider.style.left = `${Number(props.value.min / 4)}px`;
    }
    const rightSlider = document.getElementById("slider-right");
    if (rightSlider) {
      rightSlider.style.right = `${Number(props.value.max / 4)}px`;
    }
  });

  return (
    <div className="slider">
      <div id="left">
        <input
          type="range"
          min={props.minValue}
          max={(props.maxValue + props.minValue) / 2}
          value={props.value.min !== -1 ? props.value.min : props.minValue}
          onChange={({ target: { value: radius } }) => {
            props.onChange(parseInt(radius));
          }}
        />
        <div id="slider-left" className="value">
          <h6>
            {props.currency ? "$" : ""}{" "}
            {props.value.min !== -1 ? props.value.min : props.minValue}
          </h6>
          <span />
        </div>
      </div>
      <div id="right">
        <input
          type="range"
          min={(props.maxValue + props.minValue) / 2}
          max={props.maxValue}
          value={props.value.max !== -1 ? props.value.max : props.maxValue}
          onChange={({ target: { value: radius } }) => {
            props.onChange(undefined, parseInt(radius));
          }}
        />
        <div id="slider-right" className="value">
          <span />
          <h6>
            {props.currency ? "$" : ""}{" "}
            {props.value.max !== -1 ? props.value.max : props.maxValue}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Slider;
