import React from 'react';
import { deletePost } from '../services/firebase';

export default function DeletePostModal({ clickedPost, setDeletePostModalIsOpen }) {

    const handleDelete = async () => {
        console.log(clickedPost)
        await deletePost(clickedPost);
        setDeletePostModalIsOpen(false);
        location.reload();
    }

    return (
            <div className="flex flex-col fixed top-1/2 left-1/2 md:-mt-28 -mt-36 -ml-32 md:-ml-44 z-30 text-center font-roboto" >
                <h4 className="rounded-t-lg bg-white relative font-semibold text-sm px-20 py-2" >Delete Post?</h4>
                <p className="bg-white text-xs text-gray-500 px-4 py-4 border-gray-300 border-b-1" >Are you sure you want to delete the post?</p>
                <ul className="bg-white flex flex-col border-white rounded-b-lg" >
                    <li className="text-red-500 font-medium cursor-pointer border-gray-300 border-b-1 py-3" onClick={handleDelete} >Delete</li>
                    <li onClick={() => setDeletePostModalIsOpen(false)} className="cursor-pointer py-4"  >Cancel</li>
                </ul>
            </div>
    )
}
