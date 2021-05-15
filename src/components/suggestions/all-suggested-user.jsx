import React, { useState, useEffect, useContext } from "react";
import { getSuggestedUsers, newSuggestedUsers } from "../../services/firebase";
import SuggestedUser from "./suggested-user";
import UserContext from "../../context/user";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import * as ROUTES from "../../constants/routes";
import getDeviceType from "../../helpers/get-device-type";

export default function AllSuggestedUsers() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser.uid);
    const [followingCount, setFollowingCount] = useState(0);
    const [profiles, setProfiles] = useState();
    const isMobile = getDeviceType() == "mobile";

    const isHome = window.location.pathname === "/";

    useEffect(() => {
        getSuggestedUsers(loggedInUser.uid).then((data) => setProfiles(data));
    }, []);

    return (
        <div className="sm:pt-20 min-h-screen sm:w-600 md:mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-black font-semibold">Suggetions For You</h5>
            </div>
            <div className="md:bg-white md:border-1 w-full md:border-gray-300 md:p-4 md:rounded-sm">
                {profiles ? (
                    profiles
                        .filter((user) => !user.followers.includes(loggedInUser.uid))
                        .slice(0, 6)
                        .map((u) => (
                            <SuggestedUser
                                user={u}
                                key={u.userId}
                                followingCount={followingCount}
                                setFollowingCount={setFollowingCount}
                            />
                        ))
                ) : (
                    <Skeleton width={`${!isMobile ? 560 : 300}`} height={70} />
                )}
                {isHome && followingCount > 0 && (
                    <button
                        onClick={() => location.reload()}
                        className="bg-blue font-semibold text-white text-sm w-full h-8 mt-4 rounded-sm"
                    >
                        Get Started
                    </button>
                )}
            </div>
        </div>
    );
}
