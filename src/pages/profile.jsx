import React, { useEffect, useState, useContext } from 'react';
import UserDetails from '../components/profile/user-details';
import { Route, Switch, Link, useRouteMatch, useParams, useHistory } from 'react-router-dom';
import Header from '../components/header';
import { getUserByUsername } from '../services/firebase'
import UserPosts from '../components/profile/userPosts';
import SavedPosts from '../components/profile/savedPosts';
import UserContext from '../context/user';
import useUser from '../hooks/use-user';
import getDeviceType from '../helpers/get-device-type';
import Navbar from '../components/navbar';
import Loader from 'react-loader';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import * as ROUTES from '../constants/routes';
import { firebase } from '../lib/firebase';
import Skeleton from 'react-loading-skeleton';


const UserSkeleton = () => {
    const isMobile = getDeviceType() == 'mobile';

    return (
        <div className="flex relative pt-4 lg:pt-20 pb-36 lg:pb-12 lg:w-935 mx-auto pl-4 lg:pl-16" >
            { isMobile ? <Skeleton circle={true} width={80} height={80} className="mr-8" />
                : <Skeleton circle={true} width={175} height={175} className="mr-16" />}
            <div className="flex flex-col">
                <div className="flex mb-5 mt-1" >
                    {isMobile ? <Skeleton width={150} height={18}  /> : <Skeleton width={200} height={24} /> }
                </div>
                <div className="flex items-center justify-between px-4 md:px-0 absolute left-0 bottom-0 w-screen md:w-auto h-16 border-t-1 border-b-1 md:border-none border-gray-300 md:static md:mb-5 text-base">
                    <Skeleton width={`${isMobile ? 70 : 100 }`} height={18} />
                    <Skeleton width={`${isMobile ? 70 : 100 }`} height={18} />
                    <Skeleton width={`${isMobile ? 70 : 100 }`} height={18} />
                </div>
                <Skeleton width={100} height={`${isMobile ? 18 : 22}`} className={`${isMobile && "absolute top-16"}`} />
            </div>
        </div>
    )
}


export default function Profile() {
    const { user: loggedInUser } = useContext(UserContext);
    const { username } = useParams();
    const [userObj, setUserObj] = useState();
    const { user } = useUser(loggedInUser.uid);
    const [isPostsClicked, setIsPostsClicked] = useState(true);
    const [isSavedClicked, setIsSavedClicked] = useState(false);
    let { path, url } = useRouteMatch();
    const history = useHistory();
    let isMobile = (getDeviceType() == 'mobile');

    function handlePostsClick() {
        setIsPostsClicked(true);
        setIsSavedClicked(false);
    }

    function handleSavedClick() {
        setIsPostsClicked(false);
        setIsSavedClicked(true);
    }


    useEffect(() => {
        async function getUserObjByUsername(username) {
            const [user] = await getUserByUsername(username);
            setUserObj(user);
        }
        getUserObjByUsername(username);

    }, [username])


    return (
        <div className="bg-fa font-roboto" >
            {isMobile &&
                <div className="border-b-1 border-gray-300 px-4 py-2 flex w-full justify-between items-center">
                    <ExitToAppIcon className='w-5 cursor-pointer' onClick={() => {
                        firebase.auth().signOut();
                        history.push(ROUTES.LOGIN)
                    }} />
                    {username ? <h6 className="font-semibold" >{username}</h6> : <Skeleton width={100} height={18} /> }
                    <Link to={ROUTES.SUGGESTIONS} ><svg aria-label="Discover People" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M32 25.5c5.2 0 9.5-4.3 9.5-9.5S37.2 6.5 32 6.5s-9.5 4.3-9.5 9.5 4.3 9.5 9.5 9.5zm0-16c3.6 0 6.5 2.9 6.5 6.5s-2.9 6.5-6.5 6.5-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5zm5.5 19h-11c-5.5 0-10 4.5-10 10V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-3.9 3.1-7 7-7h11c3.9 0 7 3.1 7 7V40c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-1.5c0-5.5-4.5-10-10-10zm-20-4.5c0-.8-.7-1.5-1.5-1.5h-5.5V17c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v5.5H2c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5.5V31c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5.5H16c.8 0 1.5-.7 1.5-1.5z"></path></svg></Link>
                </div>
            }
            <Navbar />
            { (getDeviceType() == "desktop") && <Header />}
            { (userObj && user) ? <UserDetails username={username} loggedInUser={loggedInUser} userObj={userObj} user={user} /> : <UserSkeleton />}
            <div className="lg:w-935 mx-auto flex flex-col border-t-1 border-gray-300">
                <div className="flex justify-center">
                    <div className="flex justify-evenly w-screen" >
                        <Link to={url} >
                            <span onClick={handlePostsClick} className={`flex ${isPostsClicked && "md:border-t-1"} border-black items-center p-4 mr-4`} >
                                <svg aria-label="Posts" fill={`${isPostsClicked ? (isMobile ? "#0095f6" : "black") : "#8e8e8e"}`} height={`${isMobile ? "24" : "12"}`} viewBox="0 0 48 48" width={`${isMobile ? "24" : "12"}`} ><path clipRule="evenodd" d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z" fillRule="evenodd"></path></svg>
                                <span className={`ml-2 ${isPostsClicked ? "text-black" : "text-gray-400"} hidden md:block text-sm font-normal`} >POSTS</span>
                            </span>
                        </Link>
                        {(userObj && loggedInUser.uid == userObj.userId) &&
                            (<Link to={`${url}/saved`} >
                                <span onClick={handleSavedClick} className={`flex ${isSavedClicked && "md:border-t-1"} border-black items-center p-4 ml-4`} >
                                    <svg aria-label="Saved" fill={`${isSavedClicked ? (isMobile ? "#0095f6" : "black") : ("#8e8e8e")}`} height={`${isMobile ? "24" : "12"}`} viewBox="0 0 48 48" width={`${isMobile ? "24" : "12"}`} ><path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z"></path></svg>
                                    <span className={`ml-2 ${isSavedClicked ? "text-black" : "text-gray-400"} hidden md:block text-sm font-normal`} >SAVED</span>
                                </span>
                            </Link>)}
                    </div>
                </div>
                <Switch>
                    <Route exact path={path} >
                        <UserPosts userId={userObj?.userId} />
                    </Route>
                    <Route path={`${path}/saved`} >
                        <SavedPosts userId={loggedInUser.uid} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}
