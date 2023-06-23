import React, { useState, useEffect } from "react";
import axios from "axios";
import Avatar from 'react-avatar';
import { SERVER_URL } from "../../Config";

function Profile({ size, textSizeRatio, classname }) {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
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

    const initials = `${user.first_name} ${user.last_name}`.toUpperCase();

    return (
        <Avatar
            name={initials}
            size={size}
            textSizeRatio={textSizeRatio}
            className={classname}
        />
    );
}

export default Profile;
