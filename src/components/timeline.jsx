import React, { useEffect, useContext, useState, useRef } from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import useUser from '../hooks/use-user';
import UserContext from '../context/user';
import DashboardContext from '../context/dashboardContext';
import Post from './post/index';
import PostSkeleton from './post/post-skeleton';
import useAllPosts from '../hooks/use-allPosts';
import getDeviceType from '../helpers/get-device-type';
import { firebase } from '../lib/firebase';



const NoPost = () => (
    <div className="flex flex-col items-center justify-center mx-auto col-span-3 mt-32">
        <div className="w-16 h-16 mb-5 rounded-full border-black border-2 flex justify-center items-center" >
            <img src="images/cam.png" alt="" className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-normal mb-28" >No Posts Yet</h3>
    </div>
)

export default function Timeline() {
    const { user: loggedInUser, setFile } = useContext(UserContext);
    const { setIsOpen, setIsLoading } = useContext(DashboardContext);
    const { user } = useUser(loggedInUser?.uid);
    let timelinePosts = useAllPosts(user);
    const fileInput = useRef(); 
    const isMobile = getDeviceType() == 'mobile'
    let content;


    const handleUpload = async (e) => {
        setIsLoading(true);
        const file = fileInput.current.files[0];
        console.log(file)
        const storageRef = firebase.storage().ref('photos/' + file.name);
        await storageRef.put(file);
        setFile(storageRef)
        !isMobile && setIsOpen(true);
        setIsLoading(false);
        isMobile && history.push(ROUTES.CREATE_POST);
    }



    if (timelinePosts === undefined) {
        content = <PostSkeleton />
    } else if (timelinePosts && timelinePosts.length === 0) {
        content = (<NoPost />)
    } else {
        content = timelinePosts.map(post => <Post key={post?.docId} data={post} />)
    }

    return (
        <div className="col-span-2 flex flex-col bg-transparent" >
            {
                !isMobile &&
                <>
                    <label htmlFor="image-upload" className="bg-blue justify-center hidden sm:flex font-semibold text-white items-center py-2 w-full rounded-sm cursor-pointer mb-4">
                        <AddAPhotoIcon className="mb-1 mr-2" />
                        Create a new post
                    </label>
                    <input accept="image/jpeg" ref={fileInput} onChange={handleUpload} type="file" name="" id="image-upload" className="hidden" />
                </>
            }
            {content}
        </div>
    )
}