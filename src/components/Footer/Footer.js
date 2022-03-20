import React from "react";

import Styles from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={Styles.footer}>
      <div className={Styles.links}>
        <div>
          <div className={Styles.sectionType}>About</div>
          <p>Contact Us</p>
          <p>About Us</p>
          <p>Careers</p>
          <p>Find a store</p>
        </div>
        <div>
          <div className={Styles.sectionType}>Help</div>
          <p>Shipping</p>
          <p>Terms of Service</p>
          <p>Returns</p>
        </div>
        <div>
          <div className={Styles.sectionType}>Socials</div>
          <p>Instagram</p>
          <p>Youtube</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
        <div>
          <div className={Styles.sectionType}>Policy</div>
          <p>Terms of Use</p>
          <p>Return Policy</p>
          <p>Privacy</p>
          <p>Sitemap</p>
        </div>
      </div>
      <div className={Styles.footTabs}>
        <div>Terms of Sale</div>
        <div>Terms of Use</div>
        <div>Privacy Policy</div>
        <div>Guides</div>
      </div>
    </div>
  );
};

export default Footer;
