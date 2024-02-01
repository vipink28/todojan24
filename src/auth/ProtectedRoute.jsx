import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    console.log(isLoggedIn);

    const getUser = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const userData = await response.json();
            if (userData.length > 0) {
                debugger
                setIsLoggedIn(true);
            } else {
                debugger
                setIsLoggedIn(false);
                localStorage.removeItem('todouser');
            }
        } else {
            console.log('something went wrong');
        }
    }

    useEffect(() => {
        const localData = localStorage.getItem('todouser');
        if (localData) {
            let localUser = JSON.parse(localData);
            getUser(localUser.email);
        }
    }, [])

    return (
        isLoggedIn ? { children } : <p>Not logged in</p>
    );
}

export default ProtectedRoute;