import React, { useState, useContext, useRef } from "react";
import FirebaseContext from "../../../context/firebase";
import UserContext from "../../../context/user";

export default function AddComment({
    commentsAdded,
    setCommentsAdded,
    docId,
    loggedInUser,
}) {
    const [commentText, setCommentText] = useState();
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const inputComment = useRef();

    const commentObj = {
        comment: commentText,
        displayName: loggedInUser.displayName,
    };

    function postComment(e) {
        e.preventDefault();
        document.getElementById("input").blur();
        firebase
            .firestore()
            .collection("photos")
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion(commentObj),
            });
        commentsAdded
            ? setCommentsAdded([...commentsAdded, commentObj])
            : setCommentsAdded([commentObj]);
        setCommentText("");
    }

    return (
        <>
            <form
                method="POST"
                onSubmit={postComment}
                className="flex p-4 items-center border-t-1 border-gray-200"
            >
                <svg
                    aria-label="Emoji"
                    className="_8-yf5 "
                    fill="#262626"
                    height="24"
                    viewBox="0 0 48 48"
                    width="24"
                >
                    <path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path>
                    <path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path>
                </svg>
                <input
                    type="text"
                    id="input"
                    placeholder="Add a comment..."
                    className="w-11/12 outline-none caret-black text-sm placeholder-gray-300-gray-300 ml-4"
                    onChange={(e) => setCommentText(e.target.value)}
                    value={commentText}
                />
                <button
                    disabled={commentText ? false : true}
                    type="submit"
                    className={`font-semibold text-sm text-blue ${commentText ? "opacity-100" : "opacity-50"
                        } ml-4`}
                >
                    Post
        </button>
            </form>
        </>
    );
}
