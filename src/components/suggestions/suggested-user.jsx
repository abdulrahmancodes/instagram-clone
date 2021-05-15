import React, {useState, useContext} from 'react';
import useUser from '../../hooks/use-user';
import UserContext from '../../context/user';
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/firebase';

export default function SuggestedUser({ user: { username, fullName, userId, docId }, followingCount, setFollowingCount }) {
    const { user: loggedInUser } = useContext(UserContext);
    const { user} = useUser(loggedInUser.uid);
    const [isfollowing, setIsFollowing] = useState(false);

    function handleFollowUser() {
        updateLoggedInUserFollowing(user?.docId, userId, isfollowing);
        updateFollowedUserFollowers(docId, user?.userId, isfollowing);
        setIsFollowing(!isfollowing);
        isfollowing ? setFollowingCount(followingCount - 1) : setFollowingCount(followingCount + 1);
        console.log(followingCount)
    }

    return (
        <div className="flex items-center mb-3 " >
            <div className="w-11 h-11" >
                <Link to={`/${username}`} ><img src="/images/def-avatar.jpg" alt="profile picture" className="rounded-full" /></Link>
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="flex flex-col ml-5" >
                    <Link to={`/${username}`} ><h5 className="text-sm font-semibold" >{username}</h5></Link>
                    <span className="text-sm text-gray-500 font-light" >{fullName}</span>
                </div>
                <button className={`${isfollowing ? 'text-black bg-white border-1 border-black' : 'text-white bg-blue'} h-7 md:h-8 px-2 md:px-4 text-sm rounded-sm font-semibold cursor-pointer`} onClick={handleFollowUser} >{!isfollowing ? 'Follow' : 'Following'}</button>
            </div>
        </div>
    )
}
