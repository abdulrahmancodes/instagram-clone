import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import DashboardContext from "../../context/dashboardContext";

export default function Header({ username, postId }) {
    const { setClickedPostUser, setClickedPost, setMoreOptionsIsOpen } =
        useContext(DashboardContext);

    function handleClick(e) {
        setMoreOptionsIsOpen(true);
        setClickedPostUser(username);
        setClickedPost(postId);
    }

    return username ? (
        <div className="flex items-center justify-between border-b-1 border-gray-200 px-4 py-3 ">
            <div className="flex items-center ">
                <Link to={`/${username}`}>
                    <div>
                        <img
                            src="images/def-avatar.jpg"
                            alt="avatar"
                            className="rounded-full w-8 h-8"
                        />
                    </div>
                </Link>
                <Link to={`/${username}`}>
                    <h5 className="text-sm text-black ml-4 font-semibold">{username}</h5>
                </Link>
            </div>
            <svg
                aria-label="More options"
                fill="#262626"
                height="16"
                viewBox="0 0 48 48"
                width="16"
                className="cursor-pointer"
                onClick={handleClick}
            >
                <circle
                    clip-rule="evenodd"
                    cx="8"
                    cy="24"
                    fill-rule="evenodd"
                    r="4.5"
                ></circle>
                <circle
                    clip-rule="evenodd"
                    cx="24"
                    cy="24"
                    fill-rule="evenodd"
                    r="4.5"
                ></circle>
                <circle
                    clip-rule="evenodd"
                    cx="40"
                    cy="24"
                    fill-rule="evenodd"
                    r="4.5"
                ></circle>
            </svg>
        </div>
    ) : (
        <Skeleton />
    );
}
