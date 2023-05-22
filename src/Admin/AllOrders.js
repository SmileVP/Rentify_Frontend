import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../App";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

function AllOrders() {
  let [item, setItem] = useState([]);

  //to get the token from session storage
  let token = sessionStorage.getItem("token");

  const getProduct = async () => {
    let res = await axios.get(`${url}/getOrder`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setItem(res.data.products);
    } else {
      toast.error("admin only");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="text-white pt-5">
      <div className="text-center text-danger">
        <h4>All Orders</h4>
      </div>
      <div className="all-orders p-2">
        <Table bordered className="mt-2 text-center">
          <thead className="text-danger">
            <tr>
              <th>S.No</th>
              <th>Order Id</th>
              <th>Customer Name</th>
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
                    <td>{e._id}</td>
                    <td>{e.name}</td>
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

export default AllOrders;
