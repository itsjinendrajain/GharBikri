import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineBed } from "react-icons/md";
import { BiBath, BiArea } from "react-icons/bi";
import { formatCurrency } from "../../utils/otherFunction";
// import { AiOutlineHeart } from "react-icons/ai";
import "../../assets/css/party2.css"
const PropertyCard2 = ({ property,type }) => {
    const formattedAmount = formatCurrency(Number(property.p_price));


    return (
        <div className="property-card">

            <figure className="card-banner">

                <Link to={`/property/${property.p_id}`}>
                    <img src={`/src/assets/uploads/${property.p_frontal_image}`} alt={property.p_name} className="w-100" />
                </Link>

                <div className="card-badge orange">For { property.p_listingtype}</div>

                <div className="banner-actions">

                    <button className="banner-actions-btn">
                        <ion-icon name="location"></ion-icon>

                        <address>{property.p_address_city} , {property.p_address_state}</address>
                    </button>

                    {/* <button className="banner-actions-btn">
                        <ion-icon name="camera"></ion-icon>

                        <span>4</span>
                    </button>

                    <button className="banner-actions-btn">
                        <ion-icon name="film"></ion-icon>

                        <span>2</span>
                    </button> */}

                </div>

            </figure>

            <div className="card-content">

                <div className="card-price">
                    <strong>{formattedAmount}</strong>{property.p_listingtype === "Rent" ? "/month" : null}
                </div>

                <h3 className="h3 card-title">
                    <Link to={`/property/${property.p_id}`}>{property.p_name} </Link>
                </h3>

                <p className="card-text">
                    {String(property.p_description).substring(0, 100)}
                </p>

                <ul className="card-list">

                    <li className="card-item flex flex-wrap flex-row gap-2 align-middle">
                        <strong>{property.p_bed}</strong>
                        <span className="text-cyan-700"><MdOutlineBed /></span>
                        <ion-icon name="bed-outline"></ion-icon>

                        {/* <span>Bedrooms</span> */}
                    </li>

                    <li className="card-item flex flex-wrap flex-row gap-2 items-center align-middle">
                        <strong>{property.p_bath}</strong>
                        <div className="text-cyan-700"><BiBath /></div>
                        

                        {/* <span>Bathrooms</span> */}
                    </li>

                    <li className="card-item flex flex-wrap flex-row gap-2 align-middle">
                        <strong>{property.p_area_sq_ft} sq.ft</strong>
                        <span className="text-cyan-700"><BiArea /></span>
                        <ion-icon name="square-outline"></ion-icon>

                        {/* <span>Square Ft</span> */}
                    </li>

                </ul>

            </div>

            

        </div>
    )
}

export default PropertyCard2;
