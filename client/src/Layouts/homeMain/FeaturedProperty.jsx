import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/Card/propertyCard";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../Config";
import "../../assets/css/party2.css"
import PropertyCard2 from "../../components/Card/propertyCard2";
export default function FeaturedProperty() {

    const [user, setUser] = useState({
        user_id: "",
    });

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`${SERVER_URL}/api/dashboard/`, {
            headers: { token: localStorage.token }
        });
        setUser(result.data);
    };


    const [rentProperties, setRentProperties] = useState([]);

    const [buyProperties, setBuyProperties] = useState([]);

    const getRentProperties = async () => {
        try {
            // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
            let user_id = user.user_id;
            const res = await axios.get(`${SERVER_URL}/api/properties/home?user_id=${user_id}&listingtype=Rent`);
            setRentProperties(res.data.property);
        } catch (error) {
            console.log(error);
        }
    }

    const getBuyProperties = async () => {
        try {
            // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
            let user_id = user.user_id;
            const res = await axios.get(`${SERVER_URL}/api/properties/home?user_id=${user_id}&listingtype=Buy`);
            setBuyProperties(res.data.property);
        } catch (error) {
            console.log(error);
        }
    }

    const shouldFetch = useRef(true); // to prevent infinite loop
    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        getRentProperties();
        getBuyProperties();
    }, [user]);

    return (
        <>
            {/* <div className="max-w-[1440px] mx-auto lg:p-20">
                <div className="lg:p-20 lg:rounded-3xl bg-gray-100 py-16">
                    <h2 className="mb-3 font-semibold lg:text-[48px] text-3xl text-center lg:text-left">Featured Property</h2>
                    <p className="text-center lg:text-left text-gray-400 sm:mb-12 mb-10">Let&apos;s find you a comfortable place</p>

                    <h3 className="text-center lg:text-left text-3xl font-semibold mb-8">Rent</h3>
                    {rentProperties ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:mx-0 mx-8">
                                {
                                    rentProperties.map((property) => (
                                        <PropertyCard key={property.p_id} property={property} />
                                    ))
                                }
                            </div>

                            <div className="my-12 text-center outline-none block text-sm text-gray-600">
                                <Link className="h-10 rounded-3xl text-sm shadow-md bg-none p-4 hover:bg-black hover:text-white transition-all" to="/rent">
                                    View all
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-2xl font-bold text-gray-400 mb-10">No properties found</div>)
                    }

                    <h3 className="text-center lg:text-left text-3xl font-semibold mb-8">Buy</h3>
                    {buyProperties ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:mx-0 mx-8">
                                {
                                    buyProperties.map((property) => (
                                        <PropertyCard key={property.p_id} property={property} />
                                    ))
                                }
                            </div>

                            <div className="my-12 text-center outline-none block text-sm text-gray-600">
                                <Link className="h-10 rounded-3xl text-sm shadow-md bg-none p-4 hover:bg-black hover:text-white transition-all" to="/buy">
                                    View all
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-2xl font-bold text-gray-400">No properties found</div>)
                    }

                </div>
            </div> */}
            <section className="property" id="property">
                <div className="container">

                    <p className="section-subtitle">Properties</p>

                    <h2 className="h2 section-title">Featured Listings</h2>

                    <ul className="property-list has-scrollbar my-4">
                        {rentProperties && rentProperties.map((property,index) => {
                            return <Fragment>
                                <li className="property-item md:flex-col">
                                    <PropertyCard2 key={index} property={property} type={`Rent`} />
                                </li>

                            </Fragment>
                        })}
                    </ul>

                    <div className="flex items-center justify-center">

                        <button type="button" className="justify-center text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                            <Link to={`/rent`} >
                                View All Rent Properties
                            </Link>
                        </button>

                    </div>



                    <ul className="property-list has-scrollbar mt-20 mb-4 ">
                        {buyProperties && buyProperties.map((property,index) => {
                            return <Fragment>
                                <li className="property-item ">
                                    <PropertyCard2 key={index} property={property} type={`Buy`} />
                                </li>

                            </Fragment>
                        })}
                    </ul>
                    {/* <Link to={`/rent`} className=" flex align-middle m-auto"> */}

                    <div className="flex items-center justify-center">

                        <button type="button" className="justify-center text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2">
                            <Link to={`/buy`} >
                                View All Buy Properties
                            </Link>
                        </button>

                    </div>
                    {/* <div className="my-12 text-center outline-none block text-sm text-gray-600">
                        <Link className="h-10 rounded-3xl text-sm shadow-md bg-none p-4 hover:bg-black hover:text-white transition-all" to="/rent">
                            View all
                        </Link>
                    </div> */}

                </div>
            </section>
        </>
    )
}
