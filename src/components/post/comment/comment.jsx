import React from 'react'

export default function Comment( {comment} ) {
    return (
        <div className="flex mb-1"> 
            <h5 className="text-sm ml-4 font-semibold mr-1" >{comment?.displayName}</h5>
            <p className="text-sm">{comment?.comment}</p>
        </div>
    )
}
