import React from "react";

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
      <p>Continue to checkout ?</p>
    </>
  );
};

export default orderSummary;
