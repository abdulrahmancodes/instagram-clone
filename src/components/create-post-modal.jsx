import React, { useState, useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import UserContext from '../context/user';
import { firebase } from '../lib/firebase';
import Skeleton from 'react-loading-skeleton';

export default function CreatePostModal({ setIsOpen, setIsLoading }) {
    const [captionText, setCaptionText] = useState();
    const [imgSrc, setImgSrc] = useState();
    const { user: loggedInUser, file } = useContext(UserContext);


    if (file) {
        file.getDownloadURL()
            .then((url) => {
                setImgSrc(url)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    const handleShare = async (e) => {

        if (file && imgSrc) {
            setIsLoading(true);
            await firebase.firestore().collection('photos').add({
                caption: captionText || null,
                comments: [],
                dateCreated: Date.now(),
                imageSrc: imgSrc,
                userId: loggedInUser.uid,
                likes: [],
                saved: [],
                followers: []
            });
            setIsOpen(false);
            setIsLoading(false);
            location.reload();
        }
    }


    const handleClose = () => {
        setIsOpen(false);
        console.log('done');
        if (file) {
            file.delete().then(() => {
                console.log('deleted')
            }).catch(error => console.log(error))
        }
    }

    return (
        <div className="absolute left-1/2">
            <div className="flex md:max-w-614 flex-col relative top-20 rounded-md -left-1/2 z-30 bg-white font-roboto" >
                <div className="flex w-full relative py-2 justify-center border-b-1 border-gray-300 ">
                    <h3 className="font-semibold">New Post</h3>
                    <span className="absolute right-4 top-2 hover:bg-gray-300 rounded-full cursor-pointer" onClick={handleClose} >
                        <CloseIcon />
                    </span>
                </div>
                <div className="flex px-4 py-2">
                    <img src="/images/def-avatar.jpg" alt="" className="rounded-full w-10 h-10 mr-4" />
                    <h5 className="font-semibold text-sm mt-1" >{loggedInUser.displayName}</h5>
                </div>
                <textarea className="resize-none px-4 mt-1 outline-none mb-4" placeholder="Write a caption..." onChange={(e) => setCaptionText(e.target.value)} ></textarea>
                <div className="w-full h-60 rounded px-4 overflow-y-scroll mb-4">
                    {imgSrc ? <img src={imgSrc} alt="" className="w-full" /> : <Skeleton />}
                </div>
                <button className="bg-blue px-4 py-2 rounded-b-md text-white font-semibold" onClick={handleShare} >Post</button>
            </div>
        </div>
    )
}
