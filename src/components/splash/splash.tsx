import React from "react";
import "./splash.scss";

export default class Splash extends React.Component<
  {
    closeSplash: () => void;
  },
  {
    animIn: boolean;
  }
> {
  state = {
    animIn: true,
  };

  async componentDidMount() {
    await setTimeout(async () => {
      this.setState({ animIn: false });
      await setTimeout(() => {
        this.props.closeSplash();
      }, 900);
    }, 2500);
  }

  render() {
    const { animIn } = this.state;
    return (
      <section className={`splash-body ${animIn ? "start" : "end"}`}>
        <img alt="" src={require("../../assets/img/logo.png")} />
      </section>
    );
  }
}
