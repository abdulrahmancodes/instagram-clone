import React from "react";
import Header from "../components/header";
import AllSuggestedUsers from "../components/suggestions/all-suggested-user";

export default function SuggestionsPage() {
    const isHome = window.location.pathname === "/";

    return (
        <div className="flex flex-col bg-fa relative">
            {isHome ? (
                <Header />
            ) : (
                <div className="w-full flex p-4 items-center justify-center border-b-1 border-gray-300 ">
                    <svg
                        aria-label="Back"
                        className="absolute left-2 transform -rotate-90"
                        fill="#262626"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                    </svg>
                    <strong className="font-semibold text-sm">Discover People</strong>
                </div>
            )}
            <AllSuggestedUsers />
        </div>
    );
}
