
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(null)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const signIn = () => {
        setUser({ id: 0, userName: 'user' })
        // document.getElementById("signInDiv").hidden = true;
    }
    const signOut = () => {
        setUser(null)
        // document.getElementById("signInDiv").hidden = false;
    }



    const handleCallBackResponse = (response) => {
        console.log("Encoded JWT ID token from Google: " + response.credential);

        // // Send the Google token to your server
        fetch('http://localhost:5000/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: response.credential }), // Use the actual Google token
        })
            .then(response => response.json())
            .then(data => {
                // Here, 'data' would contain the JWT token sent back from your server
                // Store the JWT token in localStorage
                localStorage.setItem('sessionToken', data.sessionToken);
                console.log(data)

                setUser(data.user);

                // document.getElementById("signInDiv").hidden = true;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // const userObject = jwtDecode(response.credential)
        // console.log(userObject)
        // setUser(userObject)
        // document.getElementById("signInDiv").hidden = true;
    }



    useEffect(() => {
        // Function to load the Google API script
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.onload = () => initializeGoogleSignIn();
            document.body.appendChild(script);
        };
        if (!user) {
            document.getElementById("signInDiv").hidden = false;
        }

        // Function to initialize Google Sign-In
        const initializeGoogleSignIn = () => {
            /* global google */
            google.accounts.id.initialize({
                client_id: "673394003196-7ho1qp3td63frna9a2oa1r28ajiivmhd.apps.googleusercontent.com",
                callback: handleCallBackResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById("signInDiv"),
                { theme: "outline", size: "large" },
            );
            google.accounts.id.prompt();
        };

        // Load the Google API script
        loadGoogleScript();

        return () => {
            const googleScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (googleScript) {
                googleScript.remove();
            }
        };
    }, []);



    const addUser = (user) => {
        const newUser = {
            "firstName": user.firstName,
            "lastName": user.lastName,
        };

        fetch('http://localhost:5000/users', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => {
            alert("user created");
        })

    }
    const valueToProvider = { user, signIn, signOut, addUser, setUser }
    return (
        <AuthContext.Provider value={valueToProvider}>
            {children}
        </AuthContext.Provider>
    );


}