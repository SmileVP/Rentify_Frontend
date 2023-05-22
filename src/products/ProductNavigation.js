import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";


function Navigation() {
  let navigate = useNavigate();

  //function for customer-logOut
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/dashboard");
  };

  //to get the customer name from session storage
  let name = sessionStorage.getItem("name");

  return (
    //  <--Navigation details-->
    <div className="navigation container-fluid">
      <Navbar bg="#0E1630" expand="lg">
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate("/products")}
            style={{ color: "white", fontSize: "2em" }}
          >
            <span className="color-green">R</span>entify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: "10em", gap: "3em", color: "red" }}
              navbarScroll
            >
              <Nav>
                <Dropdown>
                  <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    <CgProfile /> {name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/orders")}>
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogOut()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
