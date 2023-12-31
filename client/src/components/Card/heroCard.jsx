import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { MdOutlineLocationOn, MdOutlineAttachMoney } from "react-icons/md";
import { TbHomeSearch } from "react-icons/tb";
import axios from "axios";
import { SERVER_URL } from "../../Config";
import { buildUrlWithParams } from "../../utils/otherFunction";

const HeroCard = (parms) => {

    const [data, setData] = useState({
        location: parms.location || "",
        propertyType: parms.propertyType || "House",
        // listingType: par"Rent",
        minPrice: parms.minPrice ||"",
        maxPrice: parms.maxPrice ||"",

    });
    useEffect(() => {
        console.log({HeroCards:data});
    }, [data]);

    const [searchData, setSearchData] = useState([]);

    const searchProperty = async () => {
        try {
            const url = buildUrlWithParams(`/search`, data);
            console.log({url,data});

            // redirect to search page
            window.location.replace(url);


            // const response = await axios.get(`/search}`,
            //     { params: data }
            // );
            // setSearchData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(searchData);

    // console.log(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="">
            <div className="w-full flex h-auto flex-col justify-center items-center">
                <div className="w-[90%] xl:max-w-[1000px] xl:w-[90%] relative md:max-w-[900px]">

                    <div className="bg-white p-10 md:p-10 lg:p-10 shadow-lg rounded-3xl">
                        <div className="grid content-center md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5 ">
                            <div>
                                <div className="flex gap-3 items-center">
                                    <MdOutlineLocationOn className="text-3xl text-yellow-500" />
                                    <label className="text-black text-xl font-bold">
                                        {" "}
                                        Location
                                    </label>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Preferred Location"
                                        className="w-full border-none text-gray-500 bg-white rounded-lg p-2  placeholder:text-gray-400 text-lg font-medium py focus:outline-none"
                                        onChange={handleChange}
                                        id="location"
                                        name="location"
                                        value={data.location}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <TbHomeSearch className="text-3xl text-blue-600" />
                                    <label className="text-black text-xl font-bold">
                                        {" "}
                                        Property Type
                                    </label>
                                </div>
                                <select
                                    id="hs-select-label"
                                    onChange={handleChange}
                                    value={data.propertyType }
                                    className="w-full border-none text-gray-500 bg-white rounded-lg p-1  placeholder:text-gray-400 text-xl font-medium py focus:outline-none"
                                    name="propertyType"
                                >
                                    <option value={`House`}>House</option>
                                    <option value={`Apartment`}>Apartment</option>
                                    <option value={`Office`}>Office</option>
                                    <option value={`Land`}>Land</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <span className="text-3xl text-green-500" >₹</span>
                                    <label className="text-black text-xl font-bold">Min Price</label>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter Min Price"
                                        className="w-full border-none text-gray-500 bg-white rounded-lg p-2  placeholder:text-gray-400 text-lg font-medium py focus:outline-none"
                                        onChange={handleChange}
                                        id="minPrice"
                                        value={data.minPrice}
                                        name="minPrice"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <span className="text-3xl text-green-500" >₹</span>
                                    <label className="text-black text-xl font-bold">Max Price</label>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Enter max Price"
                                        className="w-full border-none text-gray-500 bg-white rounded-lg p-2  placeholder:text-gray-400 text-lg font-medium py focus:outline-none"
                                        onChange={handleChange}
                                        id="maxPrice"
                                        name="maxPrice"
                                        value={data.maxPrice}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="md:absolute md:right-[5%] flex items-center justify-center -translate-y-1/2">
                        <Link
                            // to={`/search?location=${data.location}&propertyType=${data.propertyType}`}
                            state={data}
                            onClick={searchProperty}
                        >
                            <button className="bg-cyan-600 px-10 py-4 text-white text-xl font-bold rounded-lg hover:bg-cyan-700">
                                Search
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default HeroCard;