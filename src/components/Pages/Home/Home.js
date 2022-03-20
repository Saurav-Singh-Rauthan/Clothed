import React from "react";
import { Link } from "react-router-dom";

import Carousel from "../../Carousel/Carousel";
import Styles from "./Home.module.css";

import img1 from "../../../assests/arturo-rey-5yP83RhaFGA-unsplash.jpg";
import img2 from "../../../assests/shanna-camilleri-ljNQxfyN7AM-unsplash.jpg";
import img3 from "../../../assests/taylor-smith-aDZ5YIuedQg-unsplash.jpg";

const Home = (props) => {
  const images = [img1, img2, img3];
  return (
    <div>
      <Carousel img={images} />

      <div className={Styles.subsection}>
        <div className={Styles.sectionType}>
          <p className={Styles.heading}>Shorts</p>
          <Link to="/shorts">More {">"}</Link>
        </div>
        <div className={Styles.cardCont}>
          <div className={Styles.card}>
            <div>
              <img
                src="https://media.istockphoto.com/photos/blue-short-pants-with-clipping-path-picture-id1310810791?b=1&k=20&m=1310810791&s=170667a&w=0&h=uZtonJCwHJJyZuI2MVx3ZuwWp4Vq0YEcWkflH5SZZ8U="
                alt="img"
                className={Styles.cardImg}
              />
            </div>
            <div className={Styles.descCont}>
              <p>Shorts 1</p>
              <div className={Styles.desc}>
                <div className={Styles.price}>$20</div>
                <div className={Styles.view}>
                  <Link to='/shorts/1'>View</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.card}>
            <div>
              <img
                src="https://media.istockphoto.com/photos/blue-short-pants-with-clipping-path-picture-id1310810791?b=1&k=20&m=1310810791&s=170667a&w=0&h=uZtonJCwHJJyZuI2MVx3ZuwWp4Vq0YEcWkflH5SZZ8U="
                alt="img"
                className={Styles.cardImg}
              />
            </div>
            <div className={Styles.descCont}>
              <p>Shorts 1</p>
              <div className={Styles.desc}>
                <div className={Styles.price}>$20</div>
                <div className={Styles.view}>
                  <Link to='/shorts/1'>View</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.card}>
            <div>
              <img
                src="https://media.istockphoto.com/photos/blue-short-pants-with-clipping-path-picture-id1310810791?b=1&k=20&m=1310810791&s=170667a&w=0&h=uZtonJCwHJJyZuI2MVx3ZuwWp4Vq0YEcWkflH5SZZ8U="
                alt="img"
                className={Styles.cardImg}
              />
            </div>
            <div className={Styles.descCont}>
              <p>Shorts 1</p>
              <div className={Styles.desc}>
                <div className={Styles.price}>$20</div>
                <div className={Styles.view}>
                  <Link to='/shorts/1'>View</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={Styles.card}>
            <div>
              <img
                src="https://media.istockphoto.com/photos/blue-short-pants-with-clipping-path-picture-id1310810791?b=1&k=20&m=1310810791&s=170667a&w=0&h=uZtonJCwHJJyZuI2MVx3ZuwWp4Vq0YEcWkflH5SZZ8U="
                alt="img"
                className={Styles.cardImg}
              />
            </div>
            <div className={Styles.descCont}>
              <p>Shorts 1</p>
              <div className={Styles.desc}>
                <div className={Styles.price}>$20</div>
                <div className={Styles.view}>
                  <Link to='/shorts/1'>View</Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
