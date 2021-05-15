import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
import {
    updateLoggedInUserFollowing,
    updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedUser({
    user: { username, fullName, userId, docId },
}) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user, setActiveUser } = useUser(loggedInUser.uid);
    const [isfollowing, setIsFollowing] = useState(false);

    function handleFollowUser() {
        updateLoggedInUserFollowing(user?.docId, userId, isfollowing);
        updateFollowedUserFollowers(docId, user?.userId, isfollowing);
        setIsFollowing(!isfollowing);
    }

    return (
        <div className="flex items-center mb-3 ">
            <div>
                <Link to={`/${username}`}>
                    <img
                        src="/images/def-avatar.jpg"
                        alt="profile picture"
                        className="rounded-full w-10 h-9"
                    />
                </Link>
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col ml-5">
                    <Link to={`/${username}`}>
                        <h5 className="text-sm font-semibold">{username}</h5>
                    </Link>
                    <span className="text-xs text-gray-500 font-normal">{fullName}</span>
                </div>
                <button
                    className={`${isfollowing ? "text-black" : "text-blue"
                        } text-xs font-semibold cursor-pointer`}
                    onClick={handleFollowUser}
                >
                    {!isfollowing ? "Follow" : "Following"}
                </button>
            </div>
        </div>
    );
}
