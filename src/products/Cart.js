import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRupeeSign } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../App";
import { useState } from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { cartTotalAmount } from "../redux/CartReducer";
const { RangePicker } = DatePicker;

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //to get the initial state from cart reducer in the store
  const cartProducts = useSelector((state) => state.cart);

  //to get the selected product rent per hour
  let singlePrice = cartProducts.cartItems.map((cartPrice) => {
    return cartPrice.e.price;
  });

  //useSate functionality
  let [quantity, setQuantity] = useState(1);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  //data denotes the amount,currency and etc
  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_LTxcoAPHA7vCEk",
      amount: data.amount,
      currency: data.currency,
      name: "Rentify",
      description: "XYZ",
      order_id: data.id,

      //response here denotes razor-pay payment id,order id,signature
      handler: async function (response) {
        try {
          let res = await axios.post(`${url}/payment/verify`, { response });
          if (res.status === 200) {
            navigate("/success");
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  //function for payment
  const handlePayment = async () => {
    let amount = totalAmount;
    let hours = totalHours;
    dispatch(cartTotalAmount({ amount, hours, quantity, from, to }));
    let res = await axios.post(`${url}/payment/order`, { amount });
    handleOpenRazorpay(res.data.order);
  };

  //to get the rental date and hours
  function selectTimeSlot(values) {
    moment(values[0]).format("MM DD YYYY HH:mm");
    moment(values[1]).format("MM DD YYYY HH:mm");
    setTotalHours(values[1].diff(values[0], "hours"));
    setFrom(values[0].$d);
    setTo(values[1].$d);
  }

  //to pre-populate the total amount
  useEffect(() => {
    setTotalAmount(totalHours * singlePrice * quantity);
  });

  return (
    <div className="container-fluid cart-header ">
      <div className="cart-title">Welcome to Cart</div>

      <div className="container-fluid cart-info ">
        <div className="cart-total text-center p-4 mt-3 ">
          <h4>Cart Amount</h4>
          <p>
            Total Amount:
            <br />
            <b>
              <FaRupeeSign />
              {totalAmount}
            </b>
          </p>
          <Button variant="success" onClick={() => handlePayment()}>
            Pay Now
          </Button>
        </div>
      </div>

      <div className="cart-item">
        {cartProducts.cartItems.map((cart, i) => {
          return (
            <div className="d-flex justify-content-center mt-3 ">
              <div className="card mb-3 " style={{ width: "700px" }}>
                <div className="row no-gutters ">
                  <div className="col-md-4 ">
                    <img
                      src={cart.e.imgurl}
                      alt="..."
                      width={250}
                      height={300}
                    />
                  </div>
                  <div className="col-md-8 text-center ">
                    <div className="card-body">
                      <h5 className="card-title pt-2">{cart.e.name}</h5>
                      <p className="card-text pt-3">{cart.e.description}</p>
                      <div className="d-flex justify-content-around">
                        <RangePicker
                          showTime={{ format: "HH:mm" }}
                          format="MMM DD YYYY HH:mm"
                          onChange={selectTimeSlot}
                        ></RangePicker>
                      </div>

                      <div>
                        <p>
                          Total Hours : <b>{totalHours}</b>
                        </p>

                        <div className="d-flex justify-content-around">
                          <div>
                            Qty -
                            <select
                              onChange={(e) => setQuantity(e.target.value)}
                              style={{
                                backgroundColor: "rgb(232, 61, 61)",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                              }}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                        </div>
                        <p>
                          Total Quantity : <b>{quantity}</b>
                        </p>
                        <p>
                          Rent Per Hour : <b>{cart.e.price}</b>
                        </p>
                        <h3>
                          Total Amount : {totalHours * cart.e.price * quantity}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
