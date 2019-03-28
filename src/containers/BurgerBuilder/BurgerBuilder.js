import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    showModal: false,
    loading: false
  };

  componentDidMount() {
    //console.log(this.props);
    // axios
    //   .get("https://react-my-burger-f5c6a.firebaseio.com/ingredients.json")
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => {});
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  orderClickHandler = () => {
    this.setState({ showModal: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ showModal: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let modalContent = null;
    let burger = <Spinner />;

    if (this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            clicked={this.orderClickHandler}
            purchasable={this.updatePurchaseState(this.props.ings)}
          />
        </>
      );
      modalContent = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCancel={this.purchaseCancelHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      modalContent = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.showModal}
          modalClosed={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
        {burger}
      </>
    );
  }
}

//Reducer work
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
      }),
    onIngredientRemoved: ingredientName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
