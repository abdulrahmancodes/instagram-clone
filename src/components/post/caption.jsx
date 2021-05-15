import React from "react";

export default function Caption({ username, caption }) {
    return (
        <p className="text-sm mb-1">
            <strong className="text-sm ml-4 font-semibold">{username}</strong>{" "}
            {caption}
        </p>
    );
}
