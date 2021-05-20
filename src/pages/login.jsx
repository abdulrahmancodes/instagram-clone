import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
import "../styles/styles.css";
import * as ROUTES from "../constants/routes";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false)

  const [emailAddress, setEmailAddress] = useState("");
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
  const isInvalid = password.length < 6 || emailAddress === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
      setIsLoading(false)
    } catch (error) {
      setEmailAddress("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "Login • Instagram";
  }, []);

  return (
    <div className="flex justify-center bg-fa">
      <div className="hidden md:block auto-wh relative bg-bg-phones bg-no-repeat  ">
        <img
          src="images/img-crl-1.jpg"
          alt="img1"
          className="position animate delay1"
        />
        <img
          src="images/img-crl-2.jpg"
          alt="img2"
          className="position animate delay2"
        />
        <img
          src="images/img-crl-3.jpg"
          alt="img3"
          className="position animate delay3"
        />
        <img
          src="images/img-crl-4.jpg"
          alt="img4"
          className="position animate delay4"
        />
        <img
          src="images/img-crl-5.jpg"
          alt="img5"
          className="position animate delay5"
        />
      </div>
      <div className="width-350 h-screen flex flex-col sm:justify-center">
        <div className="mb-2 flex flex-col sm:border-1 border-gray-300 border-solid p-10 top-8 sm:bg-white ">
          <div
            className={`flex justify-center items-center ${!error ? "mb-10" : ""
              }`}
          >
            <img src="images/logo (1).png" alt="logo" className="w-44" />
          </div>
          {error ? (
            <p className="text-red-500 font-light text-sm text-center my-6">
              {error}
            </p>
          ) : (
            ""
          )}
          <form method="POST" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email address"
              className="input-box"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
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
              className={`w-full h-7 text-sm text-white rounded-sm bg-blue ${(isInvalid || isLoading) ? "opacity-50" : "opacity-100"
                }`}
            >
              { isLoading ? <Loader scale={.5} position="relative" /> : 'Log In' }
            </button>
          </form>
        </div>
        <div className="border-gray-300 border-solid sm:border-1 px-16 text-center py-5">
          <p className="text-black text-sm font-light">
            Don't have an account?{" "}
            <Link
              to={ROUTES.SIGN_UP}
              className="font-semibold text-blue opacity-90"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
