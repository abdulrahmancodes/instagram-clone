import React, { useState, useContext } from "react";
import UserContext from "../context/user";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { firebase } from "../lib/firebase";

export default function CreatePost() {
    const [captionText, setCaptionText] = useState();
    const [imgSrc, setImgSrc] = useState();
    const [isUploaded, setIsUploaded] = useState(true);
    const { user: loggedInUser, file } = useContext(UserContext);
    const history = useHistory();

    if (file) {
        file
            .getDownloadURL()
            .then((url) => {
                setImgSrc(url);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    const handleShare = async (e) => {
        e.preventDefault();

        if (file && imgSrc) {
            setIsUploaded(false);
            await firebase
                .firestore()
                .collection("photos")
                .add({
                    caption: captionText || null,
                    comments: [],
                    dateCreated: Date.now(),
                    imageSrc: imgSrc,
                    userId: loggedInUser.uid,
                    likes: [],
                    saved: [],
                    followers: [],
                });
            setIsUploaded(true);
            history.push(ROUTES.DASHBOARD);
        }
    };

    return (
        <div className="bg-fa flex flex-col font-roboto h-screen ">
            {!isUploaded && (
                <div className="fixed h-3px top-0 z-50 w-full grad-bar animate-LoadingBarEnter animate-LoadingBarProgress "></div>
            )}
            <div
                className={`flex justify-between ${!isUploaded && "justify-center"
                    } p-4 w-full bg-white`}
            >
                <Link to={ROUTES.DASHBOARD}>
                    <svg
                        aria-label="Back"
                        fill="#262626"
                        height="24"
                        className="transform -rotate-90"
                        viewBox="0 0 48 48"
                        width="24"
                    >
                        <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
                    </svg>
                </Link>
                <h6 className="text-sm font-semibold">
                    {!isUploaded ? "Sharing..." : "New Post"}
                </h6>
                <button
                    className={`${!isUploaded && "hidden"
                        } bg-white text-blue text-sm font-semibold`}
                    onClick={handleShare}
                >
                    Share
        </button>
            </div>
            <div
                className={` ${!isUploaded && "filter brightness-50"
                    } flex border-bt bg-white border-gray-400 p-4`}
            >
                <img
                    src="/images/def-avatar.jpg"
                    alt=""
                    className="w-8 h-8 rounded-full mr-2"
                />
                <form method="POST" onSubmit={handleShare} className="w-4/5">
                    <textarea
                        placeholder="Write a caption..."
                        className="resize-none w-full h-full pb-6 outline-none t-0"
                        onChange={(e) => setCaptionText(e.target.value)}
                    >
                        {" "}
                    </textarea>
                </form>
                <img src={imgSrc} alt="" className="w-12 h-12" />
            </div>
            <div
                className={` ${!isUploaded && "filter brightness-50"
                    } bg-fa h-full w-full`}
            ></div>
        </div>
    );
}
