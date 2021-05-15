import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
import "../styles/styles.css";
import * as ROUTES from "../constants/routes";
import { Link, useHistory } from "react-router-dom";
import { doesUsernameExists } from "../services/firebase";

export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const toggleVisibility = (e) => {
        if (!passwordVisibility) {
            setPasswordVisibility(true);
            e.target.textContent = "Hide";
            e.target.previousElementSibling.setAttribute("type", "text");
        } else {
            setPasswordVisibility(false);
            e.target.textContent = "Show";
            e.target.previousElementSibling.setAttribute("type", "password");
        }
    };

    const [error, setError] = useState("");

    let isInvalid =
        emailAddress === "" ||
        fullName === "" ||
        username === "" ||
        password === "";

    useEffect(() => (document.title = "Sign Up • Instagram"), []);

    const handleSignUp = async (e) => {
        e.preventDefault();

        const usernameExists = await doesUsernameExists(username);

        if (!usernameExists) {
            try {
                const userCredential = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);
                await userCredential.user.updateProfile({
                    displayName: username,
                });

                await firebase
                    .firestore()
                    .collection("users")
                    .add({
                        userId: userCredential.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: ["2"],
                        followers: [],
                        dateCreated: Date.now(),
                    });

                history.push(ROUTES.DASHBOARD);
            } catch (error) {
                setEmailAddress("");
                setUsername("");
                setPassword("");
                setFullName("");
                setError(error.message);
            }
        } else {
            setUsername("");
            setError("That username is already taken, please try another.");
        }
    };
    return (
        <div className="flex flex-col justify-center items-center font-roboto bg-gray py-8">
            <div className="width-350 p-10 flex flex-col m-auto sm:border-1 border-gray-300">
                <div
                    className={`flex justify-center items-center ${!error ? "mb-4" : ""}`}
                >
                    <img src="images/logo (1).png" alt="logo" className="w-44" />
                </div>
                <h4 className="text-lg font-semibold text-gray-500 text-center mb-4">
                    Sign up to see photos and videos from your friends.
        </h4>
                <form method="POST" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        placeholder="Email"
                        className="input-box"
                        onChange={(e) => setEmailAddress(e.target.value)}
                        value={emailAddress}
                    />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="input-box"
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        className="input-box"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <div className="flex justify-between input-box">
                        <input
                            type="password"
                            name=""
                            id=""
                            placeholder="Password"
                            className="outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <span
                            className={` ${password.length > 0 ? "visible" : "invisible"
                                } font-extrabold text-sm cursor-pointer`}
                            onClick={toggleVisibility}
                        >
                            Show
            </span>
                    </div>
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`w-full h-10 mt-2 text-sm text-white font-bold rounded-sm bg-blue ${isInvalid ? "opacity-50" : "opacity-100"
                            }`}
                    >
                        Sign Up
          </button>
                    {error ? (
                        <p className="mt-6 text-xs text-red-500 text-center">{error}</p>
                    ) : (
                        ""
                    )}
                </form>
            </div>
            <div className="width-350 mt-2 border-gray-300 border-solid sm:border-1 px-16 text-center py-5">
                <p className="text-black text-sm font-light">
                    Have an account?{" "}
                    <Link
                        to={ROUTES.LOGIN}
                        className="font-semibold text-blue opacity-90"
                    >
                        Log in
          </Link>
                </p>
            </div>
        </div>
    );
}
