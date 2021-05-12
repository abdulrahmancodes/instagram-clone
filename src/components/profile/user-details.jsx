import React, { useState } from 'react';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';


export default function UserDetails({ username, loggedInUser, userObj, user }) {
    const [isfollowing, setIsFollowing] = useState(user?.following.includes(userObj.userId));
    const [followersCount, setFollowersCount] = useState(userObj.followers.length);

    function handleFollowUser() {
        updateLoggedInUserFollowing(user?.docId, userObj.userId, isfollowing);
        updateFollowedUserFollowers(userObj.docId, user?.userId, isfollowing);
        isfollowing ? setFollowersCount(followersCount - 1) : setFollowersCount(followersCount + 1);
        setIsFollowing(!isfollowing);
    }

    return (
        <div className="flex relative pt-4 sm:pt-20 pb-36 md:pb-12 lg:w-935 mx-auto pl-4 md:pl-16" >
            <div className="w-20 h-20 md:w-36 md:h-36 rounded-full md:mr-24 bg-fa" >
                <img src="images/def-avatar.jpg" alt="" className="rounded-full" />
            </div>
            <div className="flex flex-col">
                <div className="flex mb-5 mt-1" >
                    <h3 className="text-2xl ml-6 md:ml-0 font-light mr-6" >{username}</h3>
                    {(loggedInUser.displayName != username && user) && (<button onClick={handleFollowUser} className="w-20 md:w-24 text-sm h-8 bg-blue absolute left-30 md:static top-16 rounded-sm text-white font-semibold" >{(isfollowing === null) ? ((user && user.following.includes(userObj?.userId)) ? "Unfollow" : "Follow") : (isfollowing ? "Unfollow" : "Follow")}</button>)}
                </div>
                <div className="flex items-center justify-between px-10 md:px-0 absolute left-0 bottom-0 w-screen md:w-auto h-16 border-t-1 border-b-1 md:border-none border-gray-300 md:static md:mb-5 text-base">
                    <p className="text-center text-gray-400 md:mr-10" ><strong className="font-semibold text-black" >0</strong> <br className="lg:hidden" /> posts</p>
                    <p className="text-center text-gray-400 md:mr-10" ><strong className="font-semibold text-black" >{followersCount}</strong><br className="lg:hidden" /> followers</p>
                    <p className="text-center text-gray-400 md:mr-10" ><strong className="font-semibold text-black" >{userObj.following.length}</strong><br className="lg:hidden" /> following</p>
                </div>
                <h3 className="font-semibold absolute left-4 sm:left-28 top-32 sm:top-44 md:static" >{userObj.fullName}</h3>
            </div>
        </div>
    )
}
