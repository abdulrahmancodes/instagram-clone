import React, { useEffect, useState } from 'react';
import { getTimelinePosts } from '../services/firebase';


export default function usePosts(user) {
    const [timelinePosts, setTimelinePosts] = useState();

    async function getPosts() {
        if (user?.following?.length > 0) {
            const posts = await getTimelinePosts(user?.userId, user?.following);
            posts.sort((a, b) => b.dateCreated - a.dateCreated);
            setTimelinePosts(posts);
            console.log(user.following ,posts)
        }
    }

    useEffect(() => {
        getPosts();
    }, [user?.userId, user?.following])

    return timelinePosts;
}
