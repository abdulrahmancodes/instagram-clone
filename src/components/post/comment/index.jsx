import React, { useContext, useState, useRef } from 'react';
import { formatDistance } from 'date-fns';
import Comment from './comment';
import AddComment from './add-comment';
import useUser from '../../../hooks/use-user';
import UserContext from '../../../context/user';
import usePosts from '../../../hooks/use-posts';


export default function Comments({ comments, dateCreated, docId }) {
    const [commentsAdded, setCommentsAdded] = useState();
    const { user: loggedInUser } = useContext(UserContext);

    return (
        <>
            { comments.length > 2 ? <p className="text-gray-400 text-sm pl-4" >View all {comments.length + (commentsAdded ? commentsAdded.length : 0) } comments</p> : null}
            <div className="flex flex-col" >
                {comments && comments.slice(0, 2).map(comment => <Comment comment={comment} key={comment.displayName} />)}
                {commentsAdded && commentsAdded.map(obj => <Comment comment={obj} key={obj.displayName} />)}
            </div>
            <span className="text-xs text-gray-400 ml-4 my-1">{formatDistance(dateCreated, new Date())} ago</span>
            <AddComment commentsAdded={commentsAdded} setCommentsAdded={setCommentsAdded} docId={docId} loggedInUser={loggedInUser} />
        </>
    )
}
