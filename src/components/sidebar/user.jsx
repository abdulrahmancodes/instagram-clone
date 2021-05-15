import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function User({ username, fullName }) {
    return !username || !fullName ? (
        <Skeleton height={56} />
    ) : (
        <div className="flex items-center">
            <div>
                <Link to={`/${username}`}>
                    <img
                        src="images/def-avatar.jpg"
                        alt="profile picture"
                        className="rounded-full w-16 h-16"
                    />
                </Link>
            </div>
            <div className="flex flex-col ml-5">
                <Link to={`/${username}`}>
                    <h5 className="text-sm font-semibold">{username}</h5>
                </Link>
                <span className="text-sm text-gray-500 font-normal">{fullName}</span>
            </div>
        </div>
    );
}
