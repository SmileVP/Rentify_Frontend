import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { filterItems } from "../redux/productReducer";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

function Filter() {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("all");


  //function for filter
  const filterProducts = (searchKey, category) => async () => {
    let filteredProducts;
    let filteredCategory;
    try {
      const res = await axios.get(`${url}/product/product-details`);
     
      if (category === "All") {
        dispatch(filterItems(res.data.products));
      }

      if (searchKey !== "" && category === "All") {
        filteredProducts = res.data.products.filter((e) =>
          e.name.toLowerCase().includes(searchKey)
        );
        dispatch(filterItems(filteredProducts));
      }else if (searchKey === "" && category !== "All") {
        filteredCategory = res.data.products.filter(
          (e) => e.category === category
        );
        dispatch(filterItems(filteredCategory));
      } else if (searchKey !== "" && category !== "All") {
        filteredProducts = res.data.products.filter((e) =>
          e.name.toLowerCase().includes(searchKey)
        );
        dispatch(filterItems(filteredProducts));
      }
    } catch (error) {
      console.log(error);
      toast.error("Product doesn't exist")
    }
  };

  return (
    <div className="p-4 mt-6 ">
      <Form>
        <Row>
          <Col>
            <Form.Control
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="search products"
            />
          </Col>
          <Col>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
            <option className="text-muted">Category</option>
              <option>All</option>
              <option>Tablet</option>
              <option>Mobile Phone</option>
              <option>Laptop</option>
              <option>Smart Watch</option>
            </Form.Select>
          </Col>
          <Col>
            <Button
              onClick={() => {
                dispatch(filterProducts(searchKey, category));
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Filter;
