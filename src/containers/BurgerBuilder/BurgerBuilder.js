import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.8
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    showModal: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const finalPrice = this.state.totalPrice + INGREDIENT_PRICE[type];
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    this.setState({
      totalPrice: finalPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const finalPrice = this.state.totalPrice - INGREDIENT_PRICE[type];
    if (finalPrice < 4) return;
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    this.setState({ totalPrice: finalPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  orderClickHandler = () => {
    this.setState({ showModal: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ showModal: false });
  };

  purchaseContinueHandler = () => {
    alert("Continue");
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <>
        <Modal
          show={this.state.showModal}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler}
            purchaseCancel={this.purchaseCancelHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          clicked={this.orderClickHandler}
          purchasable={this.state.purchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
