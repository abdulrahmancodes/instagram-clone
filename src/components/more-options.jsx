import React, { useEffect, useState } from 'react';
import { getUserByUsername, updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../services/firebase'

export default function MoreOptions({ setMoreOptionsIsOpen, loggedInUser, clickedPostUser, clickedPost, setDeletePostModalIsOpen }) {
    const [users, setUsers] = useState();

    const getUsers = async () => {
        const [clickedPostUserDetails] = await getUserByUsername(clickedPostUser);
        const [loggedInUserDetails] = await getUserByUsername(loggedInUser.displayName);
        setUsers( [ clickedPostUserDetails, loggedInUserDetails ] )
        console.log(users)
    }

    useEffect(() => {
        getUsers();
    }, [clickedPostUser, loggedInUser])

    const handleClick = () => {
        if (loggedInUser.displayName == clickedPostUser) {
            setMoreOptionsIsOpen(false);
            setDeletePostModalIsOpen(true);
        } else if (users?.length > 0) {
            setMoreOptionsIsOpen(false);
            updateLoggedInUserFollowing(users[1].docId, users[0].userId, true)
            updateFollowedUserFollowers(users[0].docId, users[1].userId, true);
            console.log('done')
        }
    }

    return (
        <ul className="flex flex-col text-center bg-transparent z-30 fixed top-1/3 left-1/3 font-roboto bg-white rounded-lg" >
            <li className="cursor-pointer px-20 md:px-52 py-4 text-sm w-full border-b-1 rounded-t-lg border-gray-300  font-semibold text-red-600" onClick={handleClick} > {(loggedInUser.displayName == clickedPostUser) ? 'Delete' : 'Unfollow'} </li>
            <li className="cursor-pointer px-20 md:px-52 w-full py-4 border-b-1 border-gray-300" >Go to post</li>
            <li className="cursor-pointer px-20 md:px-52 w-full py-4" onClick={() => setMoreOptionsIsOpen(false)} >Cancel</li>
        </ul>
    )
}
