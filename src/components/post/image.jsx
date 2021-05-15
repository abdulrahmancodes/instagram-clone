import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import getDeviceType from "../../helpers/get-device-type";

export default function Image({ imageSrc, caption }) {
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = getDeviceType() == "mobile";

    return (
        <div id="image" className="leading-none">
            {isLoading && (
                <Skeleton
                    width={`${isMobile ? window.innerWidth : 611}`}
                    height={600}
                />
            )}
            <img src={imageSrc} alt={caption} onLoad={() => setIsLoading(false)} />
        </div>
    );
}
