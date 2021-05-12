import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExists(username) {
    const result = await firebase.firestore().collection("users").where("username", "==", username).get();
    return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }))
    return user;
}


export async function getUserByUsername(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

    return result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
}



export async function getSuggestedUsers(userId) {
    const result = await firebase.firestore().collection("users").where('userId', '!=', userId).get();
    const profiles = result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }));
    return profiles;
}


export function newSuggestedUsers(userId) {
    const result = firebase.firestore().collection("users").where('userId', '!=', userId).onSnapshot(snapshot => {
        let changes = snapshot.docs.docChanges();
        console.log(changes)
    });
    return profiles;
}



export function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id 
    profileId, // the user who has been requested to follow
    isFollowingProfile // true/false (is loggedIn user currently following this user?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}


export function updateFollowedUserFollowers(followedUserDocId, followedByUserId, isFollowed) {
    return firebase.firestore().collection('users').doc(followedUserDocId).update({
        followers: isFollowed ? FieldValue.arrayRemove(followedByUserId) : FieldValue.arrayUnion(followedByUserId)
    })
}


export async function getTimelinePostsbyUserId(followedUserId) {
    const result = await firebase.firestore().collection('photos').where('userId', '==', followedUserId).get();
    const timelinePosts = result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }));

    const postsWithUserDetails = await Promise.all(
        timelinePosts.map(async (post) => {
            let isLiked = false;
            let isSaved = false;
            if (post.likes.includes(followedUserId)) {
                isLiked = true;
            }
            if (post.saved.includes(followedUserId)) {
                isSaved = true;
            }
            const user = await getUserByUserId(followedUserId);
            const { username } = user[0];
            return { username, ...post, isLiked, isSaved }
        })
    )
    return postsWithUserDetails;
}



export async function getTimelinePosts(userId, following) {
    const result = await firebase.firestore().collection('photos').where('userId', 'in', following).get();
    const timelinePosts = result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }));

    const postsWithUserDetails = await Promise.all(
        timelinePosts.map(async (post) => {
            let isLiked = false;
            let isSaved = false;
            if (post.likes.includes(userId)) {
                isLiked = true;
            }
            if (post.saved.includes(userId)) {
                isSaved = true;
            }
            const user = await getUserByUserId(post.userId);
            const { username } = user[0];
            return { username, ...post, isLiked, isSaved }
        })
    )
    return postsWithUserDetails;
}



export async function updateTimelinePosts(userId, following, timelinePosts, setTimelinePosts) {
    console.log(0)
    firebase.firestore().collection('photos').where('userId', 'in', following).onSnapshot(async (snapshot) => {
        const data = snapshot.docChanges().map(change => ({
            ...change.doc.data(),
            docId: change.doc.id,
        }))

        const postsWithUserDetails = await Promise.all(
            data.map(async (post) => {
                let isLiked = false;
                let isSaved = false;
                if (post.likes.includes(userId)) {
                    isLiked = true;
                }
                if (post.saved.includes(userId)) {
                    isSaved = true;
                }
                const user = await getUserByUserId(post.userId);
                const { username } = user[0];
                return { username, ...post, isLiked, isSaved }
            })
        )
        console.log([...timelinePosts, ...postsWithUserDetails]);
        setTimelinePosts([...timelinePosts, ...postsWithUserDetails]);
    });
}




export function updateLikes(postId, userId, isLiked) {
    return firebase
        .firestore()
        .collection('photos')
        .doc(postId)
        .update({
            likes: isLiked
                ? FieldValue.arrayRemove(userId)
                : FieldValue.arrayUnion(userId)
        });
}

export async function getSavedPosts(userId) {
    const result = await firebase.firestore().collection('photos').where('saved', 'array-contains', userId).get();
    const savedPosts = result.docs.map(item => ({
        ...item.data(),
        docId: item.id,
    }));
    return savedPosts;
}

export function updateSavedPosts(postId, userId, isSaved) {
    return firebase
        .firestore()
        .collection('photos')
        .doc(postId)
        .update({
            saved: isSaved
                ? FieldValue.arrayRemove(userId)
                : FieldValue.arrayUnion(userId)
        });
}

export function getPhotoUrl(file) {
    file.getDownloadURL()
        .then((url) => {
            console.log(typeof url)
            return url;
        })
        .catch((error) => {
            console.log(error.message)
        });
}

export async function deletePost(docId) {
    firebase.firestore().collection("photos").doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}