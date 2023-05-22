import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { url } from "../App";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AllProducts() {
  let [product, setProduct] = useState([]);

  //to get the token from session storage
  let token = sessionStorage.getItem("token");

  let navigate = useNavigate();

  //to get all the product details
  const getProduct = async () => {
    try {
      let res = await axios.get(`${url}/getProducts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setProduct(res.data.values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //to delete a particular product
  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${url}/deleteProduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        getProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="text-white all-products pt-5">
      <div className="text-center text-danger">
        <h4>All Products</h4>
      </div>
      <div className="p-2">
        <Table bordered className="mt-2 text-center p-3">
          <thead className="text-danger">
            <tr>
              <th>S.No</th>
              <th>Category</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Rent/hr</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {product.map((e, i) => {
              if (e !== []) {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e.category}</td>
                    <td>{e.name}</td>
                    <td>{e.description}</td>
                    <td>{e.price}</td>
                    <td className="d-flex">
                      <Button
                        className="me-2"
                        variant="warning"
                        onClick={() =>
                          navigate(`/adminHome/edit-products/${e._id}`)
                        }
                      >
                        <CiEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(e._id)}
                      >
                        <RiDeleteBin5Line />
                      </Button>
                    </td>
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

export default AllProducts;
