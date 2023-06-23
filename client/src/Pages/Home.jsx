import React, { useEffect } from "react";

import Header from "../Layouts/homeMain/Header";
import Stats from '../Layouts/homeMain/Stats'
import Newsletter from '../Layouts/homeMain/Newsletter'
import Testimonials from '../Layouts/homeMain/Testimonials'
import FeaturedProperty from "../Layouts/homeMain/FeaturedProperty";
import OurService from "../Layouts/homeMain/OurService";

function Home() {
    useEffect(() => {
        document.title = "GharBikri | Home";
    }, []);

    return (
        <>
            <Header />
            <Stats />
            <OurService />
            <FeaturedProperty />
            <Testimonials />
            <Newsletter />
        </>
    );
}

export default Home;