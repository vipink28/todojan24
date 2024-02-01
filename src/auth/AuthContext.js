import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    //register user
    const registerUser = async (formData) => {
        const obj = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        //fetch() - api request using fetch()
        // check for existing email
        const checkUser = await fetch(`http://localhost:5000/users?email=${formData.email}`, { method: "GET" });
        if (checkUser.ok) {
            const user = await checkUser.json();
            if (user.length > 0) {
                setMessage("user already exist");
            } else {
                const response = await fetch('http://localhost:5000/users', obj);
                if (response.status === 201) {
                    const user = await response.json();
                    localStorage.setItem('todouser', JSON.stringify(user));
                    setUser(user);
                    setMessage("User created successfully ...redirecting");
                    setTimeout(() => {
                        navigate('/task-list');
                    }, 3000);
                } else {
                    setMessage("Something went wrong");
                }
            }
        }
    }


    //login User
    const loginUser = async (formData) => {
        const response = await fetch(`http://localhost:5000/users?email=${formData.email}&password=${formData.password}`, { method: 'GET' });
        if (response.ok) {
            const user = await response.json();
            if (user.length > 0) {
                // create token with the help of jwt library and save it to local storage in real world projects

                localStorage.setItem('todouser', JSON.stringify(user[0]));
                setUser(user[0]);
                setMessage("logged in successfully .... redirecting");
                setTimeout(() => {
                    navigate('/task-list');
                }, 3000);


            } else {
                setMessage("email/password incorrect");
            }
        } else {
            setMessage("something went wrong");
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('todouser');
        navigate('/');
    }



    //check if user is already logged in

    const getUser = async (email) => {
        const response = await fetch(`http://localhost:5000/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const userData = await response.json();
            if (userData.length > 0) {
                setUser(userData[0]);
            } else {
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
        <AuthContext.Provider value={{
            registerUser,
            loginUser,
            message,
            user,
            setMessage,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;