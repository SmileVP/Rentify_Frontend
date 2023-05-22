import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function Home() {
 
let navigate = useNavigate();
  
  return (
    // <--Home page details-->
    <div className="d-flex justify-content-center " id="home">
      <div className="caption-header">
        <div className="home-hd">Welcome to Rentify!</div>
        <h2>
          Rent a <span className="name-hd">Product</span><br/> which suits your purpose
        </h2>
        <h4 className="stack-hd">Browse our exclusive fleet Range</h4>
        <Button className="d-flex justify-content-center " variant="danger" onClick={()=>navigate("/customer-login")}>Rent Now</Button>
     
      </div>
    </div>
  );
}

export default Home;
