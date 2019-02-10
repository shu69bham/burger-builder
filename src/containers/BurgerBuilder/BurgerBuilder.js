import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    },
    totalPrice: 4
  };
  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <div>Build controls</div>
      </>
    );
  }
}

export default BurgerBuilder;
