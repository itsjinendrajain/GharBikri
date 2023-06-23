const db = require('../db');

// get any 3 random properties which have status of rent which is not posted by current logged in user
const getPropertyHome = async (req, res) => {
    try {
        const { user_id, listingtype } = req.query;
        let properties;
        if (user_id) {
            properties = await db.query(`
                SELECT 
                p_id, 
                p_name, 
                p_address_street_num, 
                p_address_street_name, 
                p_address_city, 
                p_address_state, 
                user_id,
                p_description,

                p_bed, 
                p_bath, 
                p_area_sq_ft, 
                p_price, 
                p_listingtype, 
                p_frontal_image 
                FROM property
                WHERE p_listingtype = $1
                AND user_id != $2
                ORDER BY RANDOM()
                LIMIT 6`
                , [listingtype, user_id]
            );
            res.status(200).json({
                property: properties.rows
            });
        } else {
            properties = await db.query(`
                SELECT 
                p_id, 
                p_name, 
                p_address_street_num, 
                p_address_street_name, 
                p_address_city, 
                p_address_state, 
                user_id, 
                p_bed,
                p_description, 
                p_bath, 
                p_area_sq_ft, 
                p_price, 
                p_listingtype, 
                p_frontal_image 
                FROM property
                WHERE p_listingtype = $1
                ORDER BY RANDOM()
                LIMIT 6`
                , [listingtype]
            );
            res.status(200).json({
                property: properties.rows
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
        console.log(error);
    }
}
// // Used For Search Filter
// const getBuyRentFilter = async (req, res) => {
//     try {
//         const { price, city, type } = req.query;
//         const properties = await db.query(`SELECT p_id, p_name, p_address_street_num, p_address_street_name, 
//         p_address_city, p_address_state,user_id, p_description, p_type, p_bed, p_bath, p_area_sq_ft, 
//         p_repair_quality,p_year, p_price, p_listingtype, p_availability_status FROM property 
//         WHERE  p_price BETWEEN $1 AND $2 AND p_address_city = $3 AND p_type = $4`, [price[0], price[1], city, type]);
//         res.status(200).json({ property: properties.rows });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

const getBuyRentFilter = async (req, res) => {
    try {
        let { minPrice, maxPrice, city, type } = req.query;
        console.log(req.query);
        let query = `SELECT p_id, p_name, p_address_street_num, p_address_street_name, p_address_city, 
                 p_address_state, user_id, p_description, p_type, p_bed, p_bath, p_area_sq_ft, 
                 p_repair_quality, p_year, p_price, p_listingtype, p_availability_status,p_frontal_image FROM property`;

        const values = [];

        // Set default price range if not provided
        if (!minPrice || isNaN(Number(minPrice))) {
            minPrice = 0;
        } else {
            minPrice = Number(minPrice);
        }
        if (!maxPrice || isNaN(Number(maxPrice))) {
            maxPrice = 9999999999;
        } else {
            maxPrice = Number(maxPrice);
        }

        query += ` WHERE p_price BETWEEN $${values.length + 1} AND $${values.length + 2}`;
        values.push(minPrice);
        values.push(maxPrice);

        if (city) {
            query += ` AND p_address_city = $${values.length + 1}`;
            values.push(city);
        }

        if (type) {
            query += ` AND p_type = $${values.length + 1}`;
            values.push(type);
        }
        console.log({ query, values });
        const properties = await db.query(query, values);
        res.status(200).json({ property: properties.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getPropertyHome,
    getBuyRentFilter
}