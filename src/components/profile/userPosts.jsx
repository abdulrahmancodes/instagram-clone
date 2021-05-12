import React, { useState, useEffect } from 'react';
import Loader from 'react-loader';
import { getTimelinePostsbyUserId } from '../../services/firebase';


export default function UserPosts({ userId }) {
    const [userPosts, setUserPosts] = useState();

    async function getPosts() {
        if (userId) {
            const posts = await getTimelinePostsbyUserId(userId);
            posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setUserPosts(posts);
        }
    }

    useEffect(() => {
        getPosts();
    }, [userId])

    return (
        <div className="grid grid-cols-3 md:gap-8 gap-1 mb-10" >
            { userPosts ? (userPosts.map(post => <div><img src={post.imageSrc} alt={post.caption} key={post.imageSrc} /></div>)) : <Loader top="65%" />}
            { (userPosts && userPosts.length === 0) &&
                (
                    <div className="flex flex-col items-center justify-center mx-auto col-span-3 mt-16">
                        <div className="w-16 h-16 mb-5 rounded-full border-black border-2 flex justify-center items-center" >
                            <img src="images/cam.png" alt="" className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-normal mb-28" >No Posts Yet</h3>
                    </div>
                )}
        </div>
    )
}
