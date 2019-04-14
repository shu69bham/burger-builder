import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import WithErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  orderHandler = event => {
    //console.log(this.props);
    event.preventDefault();
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: {
        name: "Shubham",
        country: "India"
      }
    };
    this.props.onPurchaseBurgerStart(order);
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Your street" />
        <input type="text" name="postal" placeholder="Your pincode" />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details.</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurgerStart: orderData => {
      dispatch(actions.purchaseBurgerStart(orderData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
