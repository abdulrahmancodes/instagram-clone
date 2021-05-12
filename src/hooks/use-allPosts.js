import React, { useState, useEffect } from 'react';
import { getTimelinePosts, getTimelinePostsbyUserId, updateTimelinePosts } from '../services/firebase';


export default function useAllPosts(user) {
    const [timelinePosts, setTimelinePosts] = useState();

    async function getPosts() {
        if (user?.following?.length > 0) {
            const posts = await getTimelinePosts(user?.userId, user?.following);
            const userPosts = await getTimelinePostsbyUserId(user?.userId);
            let allPosts = [...posts, ...userPosts].sort((a, b) => b.dateCreated - a.dateCreated);
            setTimelinePosts(allPosts);
            await updateTimelinePosts(user?.userId, user?.following, timelinePosts, setTimelinePosts)
        }
    }

    useEffect(() => {
        getPosts();
    }, [user?.userId, user?.following])

    return timelinePosts;
}

