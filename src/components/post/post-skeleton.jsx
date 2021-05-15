import React from "react";
import Skeleton from "react-loading-skeleton";
import getDeviceType from "../../helpers/get-device-type";
import Navbar from "../navbar";

export default function PostSkeleton() {
    const isMobile = getDeviceType() == "mobile";
    const mobileWidth = isMobile && window.innerWidth;

    return (
        <div className="flex flex-col bg-white mb-8 border-1 rounded-sm border-gray-300 leading-none">
            <div className="flex items-center border-b-1 border-gray-200 px-4 py-1 leading-normal">
                <Skeleton circle={true} height={36} width={36} className="mr-4" />
                {isMobile ? (
                    <div className="flex flex-col justify-center pt-2">
                        <Skeleton width={mobileWidth / 3} height={12} />
                        <Skeleton width={mobileWidth / 4} height={12} />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center pt-2">
                        <Skeleton width={300} height={12} />
                        <Skeleton width={200} height={12} />
                    </div>
                )}
            </div>
            {isMobile ? (
                <Skeleton width={mobileWidth - 5} height={400} />
            ) : (
                <Skeleton width={611} height={600} />
            )}

            <div className="flex items-center border-b-1 border-gray-200 px-2 py-1 leading-normal">
                <Skeleton circle={true} height={32} width={32} className="mr-4" />
                {isMobile ? (
                    <div className="flex flex-col justify-center pt-2">
                        <Skeleton width={mobileWidth / 3} height={12} />
                        <Skeleton width={mobileWidth / 4} height={12} />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center pt-2">
                        <Skeleton width={300} height={14} />
                        <Skeleton width={200} height={14} />
                    </div>
                )}
            </div>
            {isMobile ? (
                <Skeleton width={mobileWidth - 5} height={400} />
            ) : (
                <Skeleton width={611} height={600} />
            )}
            <div className="flex items-center border-b-1 border-gray-200 px-2 py-1 leading-normal">
                <Skeleton circle={true} height={32} width={32} className="mr-4" />
                {isMobile ? (
                    <div className="flex flex-col justify-center pt-2">
                        <Skeleton width={mobileWidth / 3} height={12} />
                        <Skeleton width={mobileWidth / 4} height={12} />
                    </div>
                ) : (
                    <div className="flex flex-col justify-center pt-2">
                        <Skeleton width={300} height={14} />
                        <Skeleton width={200} height={14} />
                    </div>
                )}
            </div>
            {isMobile ? (
                <Skeleton width={mobileWidth - 5} height={400} />
            ) : (
                <Skeleton width={611} height={600} />
            )}
            <Navbar />
        </div>
    );
}
