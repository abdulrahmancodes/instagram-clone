import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "../styles/styles.css";
import UserContext from "../context/user";
import { firebase } from "../lib/firebase";
import useUser from "../hooks/use-user";
import * as ROUTES from "../constants/routes";

const GuestContent = () => (
    <div className="hidden sm:flex">
        <Link to="/login">
            <button className="bg-blue text-white text-sm font-semibold px-4 py-1 rounded-md">
                Log In
      </button>
        </Link>
        <Link to="/signup">
            <button className="text-blue font-semibold text-sm ml-4">Sign Up</button>
        </Link>
    </div>
);

const UserContent = ({ user, history, isHome }) => (
    <div className="hidden sm:flex items-center">
        {isHome ? (
            <svg
                aria-label="Home"
                fill="#262626"
                height="22"
                viewBox="0 0 48 48"
                width="22"
            >
                <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
            </svg>
        ) : (
            <Link to="/">
                <svg
                    aria-label="Home"
                    className="_8-yf5 "
                    fill="#262626"
                    height="22"
                    viewBox="0 0 48 48"
                    width="22"
                >
                    <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
                </svg>
            </Link>
        )}
        <svg
            aria-label="Direct"
            className="ml-5 "
            fill="#262626"
            height="22"
            viewBox="0 0 48 48"
            width="22"
        >
            <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
        </svg>
        <ExitToAppIcon
            className="w-5 ml-5 mr-5 cursor-pointer"
            onClick={() => {
                firebase.auth().signOut();
                history.push(ROUTES.LOGIN);
            }}
        />
        <Link to={`/${user?.username}`}>
            <img src="/images/user.png" alt="" className="w-5" />
        </Link>
    </div>
);

export default function Header() {
    const [value, setValue] = useState("");
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    const history = useHistory();
    const isDashboard =
        window.location.pathname === ROUTES.DASHBOARD ? true : false;

    return (
        <header className="fixed z-20 top-0 w-full lg:px-52 flex bg-white justify-center items-center sm:justify-between px-4 py-2 border-b-1 border-gray-300">
            <Link to={ROUTES.DASHBOARD}>
                <div>
                    <img src="/images/logo (1).png" alt="logo" className="wh-logo" />
                </div>
            </Link>
            <div className="hidden md:flex px-2 py-1 items-center bg-fa border-1 border-gray-300 rounded-sm">
                <SearchIcon color="disabled" fontSize="small" />
                <input
                    type="text"
                    placeholder="Search"
                    className="h-4 ml-2 bg-fa w-36 text-sm border-0 outline-none"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <CancelIcon
                    color="disabled"
                    fontSize="small"
                    onClick={() => setValue("")}
                />
            </div>
            {loggedInUser ? (
                <UserContent user={user} history={history} isHome={isDashboard} />
            ) : (
                <GuestContent />
            )}
        </header>
    );
}
