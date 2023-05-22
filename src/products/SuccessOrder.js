import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { url } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function SuccessOrder() {

  //to get the order details
  let orders = useSelector((state) => state.cart);

  let navigate = useNavigate();
  
  //to get the product name
  let orderValues = orders.cartItems.map((value) => {
    return value.e.name;
  });

  //to get the product rent
  let orderPrice = orders.cartItems.map((value) => {
    return value.e.price;
  });

  //to get the customer name,email and token from session storage
  let name = sessionStorage.getItem("name");
  let email = sessionStorage.getItem("email");
 

  //to get the order details
  let productName = orderValues.toString(); //get string value
  let productPrice = orderPrice.toString(); //get string value
  let totalAmount = orders.cartTotalAmount;
  let totalHours = orders.cartTotalHours;
  let orderQty = orders.cartTotalQuantity;
  let fromDate = orders.cartDateFrom;
  let toDate = orders.cartDateTo;

  //to save the order details in db
  let saveOrder = async () => {
    try {
      let res = await axios.post( `${url}/order/saveOrder`,
        {
          products: productName,
          name: name,
          email: email,
          price: productPrice,
          qty: orderQty,
          from: fromDate,
          to: toDate,
          hours: totalHours,
          subTotal: totalAmount,
        },
      
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveOrder();
  }, []);

  return (
    <div className="container-fluid order-success ">
      <div>
        <h2>Order placed successfully</h2>
        <Button variant="success" onClick={() => navigate("/orders")}>
          Go to Orders
        </Button>
      </div>
    </div>
  );
}

export default SuccessOrder;
