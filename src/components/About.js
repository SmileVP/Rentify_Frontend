import React from "react";


function About() {
  return (
    <div id="about" className="pt-5">
      <div className="d-flex justify-content-center " id="aboutUs">
        <div className="caption-header">
          <h3 className="about-hd">About Us</h3>
          <h4>
            <span className="about-name">Rentify</span> is a brand-new venture,
            born with the goal to provide more
            <span className="about-name">friendly rental options</span> to
            enthusiasts who love to explore new gadgets. Rentify has satisfied
            customers for over three decades with its smooth and dependable
            rental services.
          </h4>
          <br />

          <h3 className="about-hd">Our Motto</h3>
          <h4>
            Rentify's primary objective is to deliver{" "}
            <span className="about-motto">top-quality customer support</span>.
            We believe that the only way to success is through dedication and
            commitment towards collective growth of the company.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default About;
