import React, { FC, useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Splash from "./components/splash/splash";
import App from "./components/app/app";
import "./index.scss";

const FindifyInterView: FC = () => {
  const [activeSplash, setSplashStatus] = useState(true);
  return (
    <>
      {activeSplash ? (
        <Splash
          closeSplash={() => {
            setSplashStatus(false);
          }}
        />
      ) : (
        <App />
      )}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <FindifyInterView />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
