import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productReducer";
import { Button } from "react-bootstrap";
import ProductNavigation from "./ProductNavigation";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/CartReducer";
import Filter from "../components/Filter";
import axios from "axios";
import { url } from "../App";
import { addItems } from "../redux/productReducer";

function Products() {
  let navigate = useNavigate();

  let dispatch = useDispatch();

  //to get all the product details
  const getProducts = async () => {
    try {
      let response = await axios.get(`${url}/product/product-details`);
      dispatch(addItems(response.data.products));
    } catch (error) {
      console.log(error);
    }
  };

  //state depicts the initial state in the store
  let values = useSelector((state) => state.product);

  //to pre-populate the product details
  useEffect(() => {
    getProducts();
  }, []);

  // (e) to get the selected product details
  const handleRent = ({ e }) => {
    dispatch(addToCart({ e }));
    navigate("/cart");
  };

  return (
    <>
      <div className="fixed-top">
        {" "}
        <ProductNavigation />
      </div>

      <div className="menu-body">
        <div className="container-fluid px-4 px-lg-5 mt-5">
          <Filter />
          <div className="card-header">
            {values.products.map((e, i) => {
              return (
                <div className="col mb-5 pt-5">
                  <div
                    className="card"
                    style={{ height: "40em", width: "18em" }}
                  >
                    <div
                      className="badge bg-dark text-white position-absolute"
                      style={{ top: "0.5rem", right: "0.5rem" }}
                      key={i}
                    >
                      {e.category}
                    </div>
                    <img
                      className="card-img-top"
                      height={250}
                      src={e.imgurl}
                      alt="..."
                    />
                    <div className="card-body p-2">
                      <div className="text-center">
                        <h5 className="fw-bolder">{e.name}</h5>
                      </div>
                      <hr />
                      <div className="text-center" style={{ height: "7em" }}>
                        {e.description}
                      </div>
                      <hr />

                      <div className="text-center">
                        Rs.<b> {e.price}/-</b> Rent per hour
                      </div>

                      <hr />
                    </div>
                    <div className=" pb-2 bg-transparent">
                      <div className="text-center">
                        <Button
                          variant="outline-success"
                          onClick={() => handleRent({ e })}
                        >
                          Rent
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
