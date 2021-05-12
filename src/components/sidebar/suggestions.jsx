import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getSuggestedUsers } from '../../services/firebase';
import UserContext from '../../context/user';
import { useHistory } from 'react-router';
import SuggestedUser from './suggested-user';
import Skeleton from 'react-loading-skeleton';


export default function Suggetions() {
    const { user: loggedInUser } = useContext(UserContext);
    const [profiles, setProfiles] = useState();
    const isHome = window.location.path == '/';
    useEffect(() => {
        getSuggestedUsers(loggedInUser.uid).then((data) => setProfiles(data));
        console.log(profiles);
    }, [])


    return (
        <div className="mt-5" >
            <div className="flex justify-between items-center mb-4">
                <h5 className="text-gray-400 text-sm font-semibold" >Suggetions For You</h5>
                <Link to={`${loggedInUser.displayName}/suggestions`} ><button className="text-xs font-semibold">See All</button></Link>
            </div>
            <div>
                {profiles ? profiles.filter(user => !user.followers.includes(loggedInUser.uid)).slice(0, 6).map(u => <SuggestedUser user={ u } key={u.userId} />) : <Skeleton height={276} />}
            </div>
        </div>
    )
}
