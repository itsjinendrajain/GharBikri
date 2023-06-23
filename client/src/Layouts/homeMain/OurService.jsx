import React, { Fragment } from 'react'
import "../../assets/css/party2.css"
import home from "../../assets/Images/service-1.png";
import rent from "../../assets/Images/service-2.png";
import sell from "../../assets/Images/service-3.png";
import { Link } from 'react-router-dom';
const OurService = () => {
  return (
    <Fragment>
          {/* <!--
          - #SERVICE
      --> */}

          <section className="service" id="service">
              <div className="container">

                  <p className="section-subtitle">Our Services</p>

                  <h2 className="h2 section-title">Our Main Focus</h2>

                  <ul className="service-list">

                      <li>
                          <div className="service-card">

                              <div className="card-icon">
                            
                                  <img src={home} alt="Service icon" />
                              </div>

                              <h3 className="h3 card-title">
                                  <a href="#">Buy a home</a>
                              </h3>

                              <p className="card-text">
                                  over 1 million+ homes for sale available on the website, we can match you with a house you will want
                                  to call home.
                              </p>

                              <Link to="/buy" className="card-link">
                                  <span>Find A Home</span>

                                  <ion-icon name="arrow-forward-outline"></ion-icon>
                              </Link>

                          </div>
                      </li>

                      <li>
                          <div className="service-card">

                              <div className="card-icon">
                                  <img src={rent} alt="Service icon" />
                              </div>

                              <h3 className="h3 card-title">
                                  <a href="#">Rent a home</a>
                              </h3>

                              <p className="card-text">
                                  over 1 million+ homes for sale available on the website, we can match you with a house you will want
                                  to call home.
                              </p>

                              <Link to="/rent" className="card-link">
                                  <span>Find A Home</span>

                                  <ion-icon name="arrow-forward-outline"></ion-icon>
                              </Link>

                          </div>
                      </li>

                      <li>
                          <div className="service-card">

                              <div className="card-icon">
                                  <img src={sell} alt="Service icon" />
                              </div>

                              <h3 className="h3 card-title">
                                  <a href="#">Sell a home</a>
                              </h3>

                              <p className="card-text">
                                  over 1 million+ homes for sale available on the website, we can match you with a house you will want
                                  to call home.
                              </p>

                              <Link to="/sell" className="card-link">
                                  <span>Sell A Home</span>

                                  <ion-icon name="arrow-forward-outline"></ion-icon>
                              </Link>

                          </div>
                      </li>

                  </ul>

              </div>
          </section>

    </Fragment>
  )
}

export default OurService