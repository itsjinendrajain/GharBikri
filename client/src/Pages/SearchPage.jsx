import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import PropertyCard from "../components/Card/propertyCard";
import MiniNav from "../components/MiniNav/MiniNav";
import HeroCard from "../components/Card/heroCard";
import PropertyCard2 from "../components/Card/propertyCard2";
import { buildUrlWithParams } from "../utils/otherFunction";
import { useLocation } from 'react-router-dom';

export default function SearchPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const minPrice = searchParams.get('minPrice') || "";
    const maxPrice = searchParams.get('maxPrice') || "";
    const city = searchParams.get('location') || "";
    const type = searchParams.get('propertyType') || "";

    // Use the retrieved query parameters as needed
    useEffect(() => {
        console.log('Price:', minPrice , " ", maxPrice);
        console.log('City:', city);
        console.log('Type:', type);
    }, [maxPrice, city, type, minPrice]);

    useEffect(() => {
        document.title = "Rental Listings | GharBikri";
    }, []);

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


    const [Properties, setProperties] = useState([]);

    const getProperties = async () => {
        try {
            // send user parameter to backend to exclude properties posted by current logged in user if any user is logged in
            let user_id = user.user_id;
            const params = { user_id, minPrice ,maxPrice, city, type };
            const apiUrl = `${SERVER_URL}/api/properties/home/search`
            console.log(apiUrl);

            const res = await axios.get(apiUrl, {params: params});
            console.log({"res.data":res.data});
            setProperties(res.data.property);
        } catch (error) {
            console.log(error);
        }
    }

    const shouldFetch = useRef(true); // to prevent infinite loop
    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        getProperties();
    }, []);

    return (
        <>
            <div className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                {/* Search form */}
                <h1 className="text-3xl  font-semibold text-center lg:text-left my-8 lg:text-5xl" style={{textAlign:"center"}}>Search  </h1>
                <HeroCard minPrice={minPrice} maxPrice={maxPrice} location={city} propertyType={type} />
                <main className="w-full flex lg:mt-10">
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full p-6 max-w-full space-y-8 bg-white text-gray-600 sm:p-0">
                            {Properties ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:mx-0 mx-8">
                                    {
                                        Properties.map((property) => (
                                            <PropertyCard2 key={property.p_id} property={property} />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="text-center text-2xl font-bold text-gray-400 mb-10">No properties found</div>)
                            }
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
