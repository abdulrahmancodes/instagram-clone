import React from 'react';
import { deletePost } from '../services/firebase';

export default function DeletePostModal( {clickedPost, setDeletePostModalIsOpen} ) {

    const handleDelete = () => {
        deletePost(clickedPost);
        setDeletePostModalIsOpen(false);
        location.reload();
    }
 
    return (
        <div className="flex flex-col absolute z-30 text-center font-roboto" >
            <h4 className= "rounded-t-lg bg-white relative -left-1/2 font-semibold text-sm px-20 py-2" >Delete Post?</h4>
            <p className="bg-white relative -left-1/2 text-xs text-gray-300 px-20 py-4 " >Are you sure you want to delete the post?</p>
            <ul className="bg-white relative -left-1/2 flex flex-col border-white rounded-b-lg" >
                <li className="text-red-500 font-medium cursor-pointer" onClick={handleDelete} >Delete</li>
                <li onClick={() => setDeletePostModalIsOpen(false) } className="cursor-pointer relative px-20 py-4"  >Cancel</li>
            </ul>
        </div>
    )
}
