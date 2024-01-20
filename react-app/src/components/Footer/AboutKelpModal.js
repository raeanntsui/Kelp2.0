import React, { useState } from "react";

function AboutKelpModal() {
  return (
    <div id="about-kelp-div">
      <h1
      // style={{ border: "2px solid green", margin: "10px", padding: "0px" }}
      >
        About Kelp
      </h1>
      <div
      // style={{ border: "2px solid green", margin: "10px", padding: "0px" }}
      >
        <p>
          Hello! Welcome to Kelp. This is a cloned version of Yelp with
          Spongebob Squarepants theme.{" "}
        </p>
        <br />
        <p>
          Kelp is a web application that allows users to search for businesses
          by location and category. Users can also leave reviews and ratings for
          businesses.
        </p>
        <br />
        <p>We hope you enjoy your visit!</p>
        <br />
        <p>Thank you! </p>
        <p>Alex, Raeann, Khuong, and Min</p>
      </div>
    </div>
  );
}

export default AboutKelpModal;
