import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { url } from "../App";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/CartReducer";
import { useDispatch } from "react-redux";

function OrderedItems() {
  //to get the email from session storage
  let email = sessionStorage.getItem("email");

  let [item, setItem] = useState([]);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  //to clear the cart
  const handleClearCart = () => {
    dispatch(clearCart(0));
    navigate("/products");
  };

  //to get the ordered product details
  const getOrderedItem = async () => {
    try {
      let res = await axios.post(`${url}/order/getOrder`, { email });

      if (res.status === 200) {
        setItem(res.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderedItem();
  }, []);

  return (
    <div className="container-fluid your-orders">
      <div
        className="text-white your-orders-title"
        style={{ height: "3em", backgroundColor: "black" }}
      >
        <h4>Your Orders</h4>
        <Button
          variant="danger"
          className="h-1"
          onClick={() => handleClearCart()}
        >
          Go to Menu
        </Button>
      </div>

      <div>
        <Table bordered className="mt-2 text-center">
          <thead className="text-danger">
            <tr>
              <th>S.No</th>
              <th>Products</th>
              <th>Rent/hr</th>
              <th>Quantity</th>
              <th>Rent From</th>
              <th>Rent To</th>
              <th>Rent Hours</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Ordered on</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {item.map((e, i) => {
              if (e !== []) {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.products}</td>
                    <td>{e.price}</td>
                    <td>{e.qty}</td>
                    <td>{e.from}</td>
                    <td>{e.to}</td>
                    <td>{e.hours}</td>
                    <td>{e.subTotal}/-</td>
                    <td>{e.status}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString("en-UK")}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default OrderedItems;
