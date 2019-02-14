import React from "react";
import Button from "../UI/Button/Button";

const orderSummary = props => {
  const IngredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>Confirm your Ingredients</p>
      <ul>{IngredientSummary}</ul>
      <p>
        Total Price : ₹​<strong>{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout ?</p>
      <Button btnType="Danger" clicked={props.purchaseCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        CONTINUE
      </Button>
    </>
  );
};

export default orderSummary;
