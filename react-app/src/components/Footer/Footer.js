import React from "react";
import "./Footer.css";
import SignupFormModal from "../../components/SignupFormModal";
import OpenModalButton from "../../components/OpenModalButton";

import ContactModal from "./ContactModal";
import StackModal from "./StackModal";
import AboutKelpModal from "./AboutKelpModal";

function Footer() {
  return (
    <div id="footer-div">
      <div id="footer-top">
        {
          <OpenModalButton
            buttonText="About Kelp"
            styleClass="join-us-btn"
            modalComponent={<AboutKelpModal />}
          />
        }

        {
          <OpenModalButton
            buttonText="Join Kelp"
            styleClass="join-us-btn"
            modalComponent={<SignupFormModal />}
          />
        }

        {
          <OpenModalButton
            buttonText="Contact Us"
            styleClass="join-us-btn"
            modalComponent={<ContactModal />}
          />
        }

        {
          <OpenModalButton
            buttonText="Stack"
            styleClass="join-us-btn"
            modalComponent={<StackModal />}
          />
        }

        <p className="trademark">Kelp © 2023</p>
      </div>
    </div>
  );
}

export default Footer;
