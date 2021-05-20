import React from "react";
import Header from "./header";
import Image from "./image";
import Actions from "./actions";
import Caption from "./caption";
import Comments from "./comment/index";
import Skeleton from "react-loading-skeleton";

export default function Post({
    data: {
        imageSrc,
        likes,
        isLiked,
        isSaved,
        userId,
        caption,
        comments,
        dateCreated,
        username,
        docId,
    },
}) {
    return (
        <div className="flex flex-col bg-white md:mb-8 md:border-1 rounded-sm border-gray-300 ">
            <Header username={username} postId={docId} />
            {imageSrc ? (
                <Image imageSrc={imageSrc} caption={caption} />
            ) : (
                <Skeleton width={611} height={600} />
            )}
            <Actions
                likes={likes}
                isLiked={isLiked}
                postId={docId}
                isSaved={isSaved}
            />
            {caption && <Caption username={username} caption={caption} />}
            <Comments comments={comments} dateCreated={dateCreated} docId={docId} />
        </div>
    );
}
