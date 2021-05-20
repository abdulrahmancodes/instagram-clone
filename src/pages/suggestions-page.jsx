import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import AllSuggestedUsers from "../components/suggestions/all-suggested-user";
import UserContext from "../context/user";
import getDeviceType from "../helpers/get-device-type";


export default function SuggestionsPage() {
    const isHome = window.location.pathname === "/";
    console.log(isHome)
    const isMobile = getDeviceType() == 'mobile';
    const { user: loggedInUser } = useContext(UserContext);
    return (
        <div className="flex flex-col bg-fa relative">
            { (isHome && !isMobile) && <Header />}
            <div className="w-full flex p-4 items-center justify-center border-b-1 border-gray-300 ">
                <Link to={`/${loggedInUser.displayName}`} ><svg
                    aria-label="Back"
                    className="absolute top-3 left-2 transform -rotate-90"
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                >
                    <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                </svg></Link>
                <strong className="font-semibold text-sm">Discover People</strong>
            </div>

            <AllSuggestedUsers />
        </div>
    );
}
