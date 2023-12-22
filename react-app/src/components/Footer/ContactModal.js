import React, { useState } from "react";

function ContactModal() {
  const handleToAlexGithub = (e) => {
    e.preventDefault();
    window.open("https://github.com/Alexkthoo");
  };

  const handleToAlexLinkedin = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/alexkthoo/");
  };

  const handleToRaeGithub = (e) => {
    e.preventDefault();
    window.open("https://github.com/raeanntsui");
  };

  const handleToRaeLinkedin = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/raeanntsui/");
  };

  const handleToKhoungGithub = (e) => {
    e.preventDefault();
    window.open("https://github.com/KhuongNguyen129");
  };

  const handleToKhoungLinkedin = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/khuong-c-nguyen/");
  };

  const handleToMinGithub = (e) => {
    e.preventDefault();
    window.open("https://github.com/min-kim1109");
  };

  const handleToMinLinkedin = (e) => {
    e.preventDefault();
    window.open("https://www.linkedin.com/in/huynh-lam/");
  };

  return (
    <div id="contact-us-div">
      <h1>Created By</h1>

      {/* <h4>Developers</h4> */}
      <div id="developer-github">
        <p className="developer-portfolio"> Alex Thoo </p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToAlexGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToAlexLinkedin}></i>
        </div>
      </div>
      <div id="developer-github">
        <p className="developer-portfolio"> Raeann Tsui</p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToRaeGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToRaeLinkedin}></i>
        </div>
      </div>
      <div id="developer-github">
        <p className="developer-portfolio"> Khoung Nguyen </p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToKhoungGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToKhoungLinkedin}></i>
        </div>
      </div>
      <div id="developer-github">
        <p className="developer-portfolio"> Min Kim</p>
        <div className="developer-icons">
          <i class="fa-brands fa-github" onClick={handleToMinGithub}></i>
          <i class="fa-brands fa-linkedin" onClick={handleToMinLinkedin}></i>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
