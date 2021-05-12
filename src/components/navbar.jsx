import React, { useContext } from 'react';
import UserContext from '../context/user';
import DashboardContext from '../context/dashboardContext';
import useUser from '../hooks/use-user';
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';
import { firebase } from '../lib/firebase';
import { useHistory } from "react-router-dom";


export default function Navbar() {
    const { user: loggedInUser, setFile } = useContext(UserContext);
    const { setIsLoading } = (window.location.pathname == '/') ? useContext(DashboardContext) : { setIsLoading: null };
    const { user } = useUser(loggedInUser?.uid);
    const isHome = (window.location.pathname === ROUTES.DASHBOARD) ? true : false;
    const history = useHistory();
    let isSearch;


    const handleUpload = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref('photos/' + file.name);
        await storageRef.put(file);
        setFile(storageRef)
        setIsLoading(false);
        history.push(ROUTES.CREATE_POST);
    }

    return (
        <nav className="fixed w-screen bg-white bottom-0 z-20" >
            <ul className="flex sm:hidden justify-between h-12 px-8 py-2 border-t-1 border-gray-300 " >
                <li> {isHome ? (<svg aria-label="Home" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path></svg>)
                    : (<Link to="/" ><svg aria-label="Home" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path></svg></Link>)}</li>
                <li>
                    {isSearch ? (<svg aria-label="Search &amp; Explore" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.6 44L35.8 32.2C38.4 28.9 40 24.6 40 20 40 9 31 0 20 0S0 9 0 20s9 20 20 20c4.6 0 8.9-1.6 12.2-4.2L44 47.6c.6.6 1.5.6 2.1 0l1.4-1.4c.6-.6.6-1.6.1-2.2zM20 35c-8.3 0-15-6.7-15-15S11.7 5 20 5s15 6.7 15 15-6.7 15-15 15z"></path></svg>)
                        : (<svg aria-label="Search &amp; Explore" fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M20 40C9 40 0 31 0 20S9 0 20 0s20 9 20 20-9 20-20 20zm0-37C10.6 3 3 10.6 3 20s7.6 17 17 17 17-7.6 17-17S29.4 3 20 3z"></path><path d="M46.6 48.1c-.4 0-.8-.1-1.1-.4L32 34.2c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l13.5 13.5c.6.6.6 1.5 0 2.1-.2.3-.6.4-1 .4z"></path></svg>)}
                </li>
                <li>
                    <label htmlFor="image-upload" className="block w-6 h-6 bg-plus bg-center bg-250" >
                        <input accept="image/jpeg" onChange={handleUpload} type="file" name="" id="image-upload" className="hidden" />
                    </label>
                </li>
                <Link to={`/${user?.username}`} ><li> <img src="/images/def-avatar.jpg" alt="" className="w-6 h-6 rounded-full" /> </li></Link>
            </ul>
        </nav>
    )
}
