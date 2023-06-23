const db = require('../db');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { parse } = require('path');

// get user with matching id if authorized, if exists in database
exports.getUser = async (req, res) => {
    try {
        const user = await db.query(`SELECT 
        user_id, 
        first_name, 
        last_name, 
        user_email, 
        created_at, 
        updated_at, 
        phone_number, 
        address_city, 
        address_state,
        property_count
        FROM users WHERE user_id = $1`,
            [req.user]);
        res.json(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error.message)
    }
}

// edit user with matching id if authorized
exports.editUser = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            user_email,
            phone_number,
            address_city,
            address_state
        } = req.body;

        // check if user email is already in use
        const email = await db.query("SELECT * FROM users WHERE user_email = $1", [user_email]);
        if (email.rows[0] && email.rows[0].user_id !== req.user) {
            return res.status(401).json({
                success: false,
                message: "Email already in use",
            })
        }

        const user = await db.query(`
        UPDATE users 
        SET 
        first_name = $1,
        last_name = $2,
        user_email = $3,
        updated_at = CURRENT_TIMESTAMP,
        phone_number = $4,
        address_city = $5,
        address_state = $6
        WHERE user_id = $7 RETURNING *`,
            [
                first_name,
                last_name,
                user_email,
                phone_number,
                address_city,
                address_state,
                req.user
            ]
        );
        res.send(user.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error.message)
    }
}

// delete user with matching id if authorized
exports.deleteUser = async (req, res) => {
    try {
        console.log(req.user)
        let properties = await db.query("SELECT p_id FROM property WHERE user_id = $1", [req.user]);
        // console.log(property.rows)
        properties = properties.rows;

        // delete all properties and images of property associated with user
        properties.forEach(async (property) => {
            // remove images from file system
            // const images = await db.query("SELECT p_frontal_image FROM property WHERE p_id = $1", [property.p_id]);
            // images.rows.forEach((image) => {
            //     fs.unlinkSync(image.p_frontal_image);
            // });
            await db.query("DELETE FROM property WHERE p_id = $1", [property.p_id]);
        })

        // delete user
        await db.query("DELETE FROM users WHERE user_id = $1", [req.user]);

        // return response status 200 if user is deleted
        res.status(200).json({
            success: true,
            message: "User deleted",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error.message)
    }
}

// change password if authorized and if the old password is correct
// old password should not be the same as the new password
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await db.query("SELECT * FROM users WHERE user_id = $1", [req.user]);
        const validPassword = await bcrypt.compare(oldPassword, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            })
        }
        const saltRound = 10;
        const salt = await bcrypt.genSaltSync(saltRound);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);
        const updatedUser = await db.query(`
        UPDATE users 
        SET password = $1,
        updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $2 
        RETURNING *`,
            [bcryptPassword, req.user]);
        res.json(updatedUser.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// get all properties of user with matching id from params if authorized
// This is for the dashboard to show property cards
exports.getUserProperties = async (req, res) => {
    try {
        const properties = await db.query(`SELECT
        p_id,
        p_name,
        p_address_street_num,
        p_address_street_name,
        p_address_city,
        p_address_state,
        p_bed,
        p_bath,
        p_area_sq_ft,
        p_price,
        p_listingType,
        p_frontal_image
        FROM property
        JOIN users
        ON property.user_id = users.user_id
        WHERE property.user_id = $1`,
            [req.user]
        );
        res.json(properties.rows);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error.message);
    }
}

// get property with matching id
// This is for the property expanded view
exports.getProperty = async (req, res) => {
    try {
        const property = await db.query(`
        SELECT
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
        property.user_id,
        p_price,
        p_listingType,
        p_frontal_image,
        p_availability_status,
        property.created_at,
        property.updated_at,
        p_views
        FROM property 
        JOIN users 
        ON property.user_id = users.user_id
        WHERE property.p_id = $1`,
            [req.params.id]
        );

        const result = property.rows[0];

        // get the user details of the property
        const user = await db.query(`
        SELECT 
        user_id as owner_id,
        first_name as owner_first_name,
        last_name as owner_last_name,
        user_email as owner_email,
        phone_number as owner_phone_number
        FROM users 
        WHERE user_id = $1`,
            [result.user_id]);

        result.owner_id = user.rows[0].owner_id;
        result.owner_first_name = user.rows[0].owner_first_name;
        result.owner_last_name = user.rows[0].owner_last_name;
        result.owner_email = user.rows[0].owner_email;
        result.owner_phone_number = user.rows[0].owner_phone_number;

        result.owner_id = parseInt(result.owner_id);
        result.p_views = parseInt(result.p_views);
        req.user = parseInt(req.user);

        if (result.owner_id !== req.user) {
            let p_views = result.p_views + 1;
            await db.query(`UPDATE property SET p_views = $1 WHERE p_id = $2`, [p_views, req.params.id]);
        }
        // console.log(result)
        res.json(result);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error.message)
    }
}

// edit property with matching id if authorized
exports.editProperty = async (req, res) => {
    try {
        const {
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
            p_frontal_image
        } = req.body;

        const property = await db.query(`
        UPDATE property SET 
        p_name = $1, 
        p_address_street_num = $2, 
        p_address_street_name = $3, 
        p_address_city = $4, 
        p_address_state = $5, 
        p_description = $6, 
        p_type = $7, 
        p_bed = $8, 
        p_bath = $9, 
        p_area_sq_ft = $10, 
        p_repair_quality = $11, 
        p_year = $12, 
        p_price = $13, 
        p_listingType = $14, 
        p_availability_status = $15, 
        p_frontal_image = $16, 
        updated_at = CURRENT_TIMESTAMP
        WHERE p_id = $17 AND user_id = $18
        RETURNING *`,
            [
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
                req.params.id,
                req.user
            ]
        );
        res.json(property.rows[0]);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// delete property with matching id if authorized
exports.deleteProperty = async (req, res) => {
    try {
        const property = await db.query("SELECT p_frontal_image FROM property WHERE p_id = $1 AND user_id = $2", [req.params.id, req.user]);

        // delete frontal image from the file system
        // fs.unlinkSync(`../../../client/src/assets/uploads/${property.rows[0].p_frontal_image}`);


        const deleteProperty = await db.query("DELETE FROM property WHERE p_id = $1 AND user_id = $2 RETURNING *", [req.params.id, req.user]);

        res.json(deleteProperty.rows[0]);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        console.log(error);
    }
}