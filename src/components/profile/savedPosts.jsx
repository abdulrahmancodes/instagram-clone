import React, { useEffect, useState } from "react";
import { getSavedPosts } from "../../services/firebase";
import Loader from "react-loader";

export default function SavedPosts({ userId }) {
    const [savedPosts, setSavedPosts] = useState();
    const [height, setHeight] = useState();
    // let height = document.getElementsByClassName('image')[0] ?  : 0;

    async function getPosts() {
        if (userId) {
            const posts = await getSavedPosts(userId);
            posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setSavedPosts(posts);
        }
    }

    useEffect(() => {
        getPosts();
        console.log(savedPosts);
    }, [userId]);

    return (
        <div className="grid grid-cols-3 md:gap-8 gap-1 auto-rows-fr mb-10">
            {savedPosts ? (
                savedPosts.map((post) => (
                    <img
                        src={post.imageSrc}
                        alt={post.caption}
                        key={post.imageSrc}
                        className="w-full h-full"
                    />
                ))
            ) : (
                <Loader top="65%" />
            )}
            {savedPosts && savedPosts.length === 0 && (
                <div className="flex flex-col items-center justify-center mx-auto col-span-3 mt-16">
                    <div className="w-16 h-16 mb-5 rounded-full border-black border-2 flex justify-center items-center">
                        <img src="/images/cam.png" alt="" className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-normal">No Posts Yet</h3>
                </div>
            )}
        </div>
    );
}
