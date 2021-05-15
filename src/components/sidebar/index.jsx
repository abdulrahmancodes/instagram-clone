import React, { useContext, useState } from "react";
import LoggedInUserContext from "../../context/logged-in-user";
import Suggetions from "./suggestions";
import User from "./user";
import useUser from "../../hooks/use-user";
import UserContext from "../../context/user";

export default function Sidebar() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser?.uid);
    return (
        <div className="relative">
            <aside className="lg:flex hidden fixed w-80 pt-4 flex-col">
                <User username={user?.username} fullName={user?.fullName} />
                <Suggetions />
            </aside>
        </div>
    );
}
