import React, { useState, useEffect, useRef, Fragment } from "react";
import axios from "axios";
import { SERVER_URL } from "../Config";
import MiniNav from "../components/MiniNav/MiniNav";
import { PencilIcon, CheckCircleIcon, XCircleIcon, CalendarDaysIcon } from '@heroicons/react/20/solid'
import { MdDeleteForever, MdOutlineBed } from "react-icons/md";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../assets/css/propertydetails.css"
import { formatCurrency } from "../utils/otherFunction";
import { BiArea, BiBath } from "react-icons/bi";

export default function PropertyDetails2() {

    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('heighlights');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const [properties, setProperties] = useState({
        p_name: "",
        p_address_street_num: "",
        p_address_street_name: "",
        p_address_city: "",
        p_address_state: "",
        p_description: "",
        p_type: "",
        p_bed: "",
        p_bath: "",
        user_id: "",
        p_area_sq_ft: "",
        p_repair_quality: "",
        p_year: "",
        p_price: "",
        p_listingType: "",
        p_availability_status: "",
        p_frontal_image: "",
        created_at: "",
        updated_at: "",
        p_views: "",
        owner_first_name: "",
        owner_last_name: "",
        owner_email: "",
        owner_phone_number: ""
    });

    const fetchProperty = async () => {
        const result = await axios.get(`${SERVER_URL}/api/dashboard/property/${id}`, {
            headers: { token: localStorage.token }
        });
        setProperties(result.data);
        setOwner_id(result.data.user_id);
        // console.log(result.data);
    };


    const shouldFetch = useRef(true); // to prevent infinite loop
    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        fetchProperty();
    }, []);

    // destructuring properties
    let {
        p_name,
        p_address_street_num,
        p_address_street_name,
        p_address_city,
        p_address_state,
        p_description,
        p_type,
        p_bed,
        p_bath,
        p_area_sq_ft,
        p_repair_quality,
        p_year,
        p_price,
        p_listingType,
        p_availability_status,
        p_frontal_image,
        created_at,
        updated_at,
        p_views,

        owner_first_name,
        owner_last_name,
        owner_email,
        owner_phone_number
    } = properties;

    const [owner_id, setOwner_id] = useState("")
    const [activeState, setActiveState] = useState(0);

    created_at = new Date(created_at).toLocaleDateString();
    updated_at = new Date(updated_at).toLocaleDateString();

    useEffect(() => {
        if (!shouldFetch.current) {
            shouldFetch.current = false; // set it to true first time component renders
        }
        document.title = `${p_name} Details`;
        console.log({ properties });
    }, [properties]);

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
        console.log(result.data);
        console.log({ owner_id });
        setUser(result.data);
    };

    const deleteProperty = async () => {
        try {
            await axios.delete(`${SERVER_URL}/api/dashboard/property/${properties.p_id}`, {
                headers: { token: localStorage.token }
            });
            // refresh page
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="max-w-[1280px] mx-auto lg:p-6 w-[90%]">
                <MiniNav />
                {/* <h1 className="text-3xl font-semibold text-center lg:text-left my-8 lg:text-5xl">{p_name}</h1> */}
                <p className="text-center lg:text-left text-gray-500 text-sm mb-8">Last updated on {updated_at}</p>
                {/* <div className="min-w-screen min-h-screen bg-yellow-300 flex items-center p-5 lg:p-10 overflow-hidden relative"> */}
                <div className="w-full max-w-6xl rounded bg-white shadow-xl p-5 lg:p-10 mx-auto text-gray-800 relative md:text-left">
                    <div className="md:flex items-center -mx-10">
                        <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                            <div className="relative">
                                <img src={`/src/assets/uploads/${p_frontal_image}`} className="w-full relative z-10" alt="" />
                                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-10">
                            <div className="mb-10">
                                <h1 className="font-bold uppercase text-2xl mb-5">{p_name} <br />

                                    <span className="text-sm font-normal italic leading-none align-baseline">in {p_address_city}, {p_address_state}</span>

                                </h1>
                                {/* All Featured box */}
                                <ul className="flex flex-wrap flex-row  text-2xl">

                                    <li className="w-1/2 mb-4 flex flex-wrap flex-row gap-2 align-middle items-center">
                                        <strong>{p_bed}</strong>
                                        <span className="text-cyan-700 flex"><MdOutlineBed /></span>
                                        {/* <span>Bedrooms</span> */}



                                    </li>




                                    <li className="w-full md:w-1/2 mb-4 flex flex-wrap flex-row gap-2 align-middle">
                                        <strong>{p_area_sq_ft} sq.ft</strong>
                                        <span className="text-cyan-700"><BiArea /></span>
                                    </li>
                                    <li className="w-1/2 mb-4 flex flex-wrap flex-row gap-2 items-center align-middle">
                                        <strong>{p_bath}</strong>
                                        <div className="text-cyan-700"><BiBath /></div>
                                    </li>

                                    <li className=" w-full md:w-1/2 mb-4 flex flex-wrap flex-row gap-2 align-middle">
                                        <strong>{p_year} </strong>
                                        <span className="text-cyan-700"><CalendarDaysIcon className="w-8 h-8" /></span>
                                    </li>

                                </ul>



                                <p className="text-sm">{p_description}</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <div className="inline-block align-bottom mr-5 mb-8">
                                    {/* <span className="text-2xl leading-none align-baseline">Rs</span> */}
                                    <span className="font-bold text-2xl lg:text-5xl  leading-none align-baseline">{formatCurrency(Number(p_price))}</span>
                                    {/* <span className="text-2xl leading-none align-baseline">.99</span> */}
                                </div>
                                <div className=" ">
                                    <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"> Contact Dealer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}

                <div className="w-full max-w-6xl rounded bg-white shadow-xl p-5 lg:p-10 mx-auto text-gray-800 relative md:text-left">

                    <section className="product-all-info">
                        <ul className="product-info-menu">
                            <li className={`p-info-list ${activeState === 0 ? 'active' : ''}`}
                                onClick={() => setActiveState(0)}>About Property</li>

                            <li className={`p-info-list ${activeState === 1 ? 'active' : ''}`}
                                onClick={() => setActiveState(1)}>Dealer Details</li>
                            {/* <li className={`p-info-list ${activeTab === 'materials' ? 'active' : ''}`}
                            onClick={() => handleTabChange('materials')}>Explore Locality</li>
                        <li className={`p-info-list ${activeTab === 'howuse' ? 'active' : ''}`}
                            onClick={() => handleTabChange('howuse')}>Dealer Details</li>
                        <li className={`p-info-list ${activeTab === 'protips' ? 'active' : ''}`}
                            onClick={() => handleTabChange('protips')}>Recommendations</li> */}
                        </ul>
                    </section>
                    <Fragment>
                        <div className=" mb-20 ">
                            {/*  Property details. Section */}
                            {
                                activeState === 0 && <Fragment>


                                    <ul className=" stretchAnimation text-left space-y-4 text-gray-500 dark:text-gray-400">
                                        {/* <div className="px-4 sm:px-0">
                                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
                                    </div> */}
                                        <div className="mt-6 border-t border-gray-100">
                                            <dl className="divide-y divide-gray-100">

                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_address_street_num} {p_address_street_name} • {p_address_city} • {p_address_state}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_description}</dd>
                                                </div>

                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Posted Date</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{created_at}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Views</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_views}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Repair Quality</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_repair_quality}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Build Year</dt>
                                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{p_year}</dd>
                                                </div>
                                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                    <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                                    {p_availability_status ? (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row items-center"><CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" color="green" />Available</dd>) : (
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-row items-center"><XCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" color="red" />Not Available</dd>)}

                                                </div>
                                            </dl>
                                        </div>
                                    </ul>

                                </Fragment>
                            }
                            {/* Ingredients Section  */}
                            {
                                activeState === 1 && <Fragment>

                                    <div className='stretchAnimation'>
                                        <div className={`flex flex-row m-4 flex-wrap `}>

                                            <Fragment>
                                                <div className={`info-container howuse ${activeState === 1 ? 'block' : "hidden"}`}>
                                                    <div className="dealer flex flex-col md:flex-row">
                                                        <div className="dealer-details">
                                                            <h3>Dealer Details</h3>
                                                            <div className="card">
                                                                <img src="https://avatars.githubusercontent.com/u/74364530?v=4" alt="John" className="w-full" />
                                                                <div></div>

                                                                <h1 className="font-bold mt-1 mb-2">{owner_first_name} {owner_last_name}</h1>
                                                                <h6>( Individual Dealer )</h6>



                                                            </div>
                                                        </div>

                                                        <div className="query">
                                                            <h3>Send enquery to Dealer</h3>

                                                            <div className="container w-full">
                                                                <form onSubmit={() => {
                                                                    alert('Your Message has been sent to the dealer')
                                                                }}>
                                                                    <label htmlFor="fname"> Name</label>
                                                                    <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                                                                    <label htmlFor="lname">Email</label>
                                                                    <input type="text" id="email" name="lname" placeholder="Your email.." />

                                                                    <label htmlFor="number">Number</label>
                                                                    <input type="text" id="number" name="number" placeholder="Your Phone No." />

                                                                    <label htmlFor="subject">Subject</label>
                                                                    <textarea id="subject" name="subject" placeholder="Write something.." className="w-full"></textarea>

                                                                    <input type="submit" id="submit" value="Send Email & SMS" />
                                                                </form>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </Fragment>



                                        </div>




                                    </div>
                                </Fragment>
                            }




                        </div>



                    </Fragment>

                    <div className="mt-6 flex flex-col sm:flex-row sm:gap-5">
                        {/* edit button if user is the owner */}
                        {
                            user.user_id === owner_id && (
                                <div className="mt-6 flex flex-col sm:flex-row sm:gap-5">
                                    {/* edit user button  */}
                                    <div className="py-3 bg-gray-50 text-left">
                                        <Link
                                            to={`/dashboard/editproperty/${id}`}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition duration-150 ease-in-out"
                                        >
                                            <PencilIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            Edit Property
                                        </Link>
                                    </div>
                                    <div className="py-3 bg-gray-50 text-left">
                                        <button
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-700 transition duration-150 ease-in-out"
                                            id="deleteButton"
                                            data-modal-toggle="deleteModal"
                                            type="button"
                                            onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this property?")) {
                                                    deleteProperty();
                                                }
                                            }}
                                        >
                                            <MdDeleteForever className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            Delete Property
                                        </button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>


        </>
    );
}