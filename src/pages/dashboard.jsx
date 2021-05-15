import React, { useState, useEffect, useContext } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar/index";
import CreatePostModal from "../components/create-post-modal";
import UserContext from "../context/user";
import DashboardContext from "../context/dashboardContext";
import useUser from "../hooks/use-user";
import AllSuggestedUsers from "../components/suggestions/all-suggested-user";
import MoreOptions from "../components/more-options";
import DeletePostModal from "../components/delete-post-modal";
import Loader from "react-loader";
import Navbar from "../components/navbar";

const Main = () => (
    <div className="relative min-h-screen lg:w-935 z-10 lg:grid 640:w-614 mx-auto gap-8 lg:grid-cols-3 pt-12 sm:pt-24">
        <Timeline />
        <Sidebar />
    </div>
);

export default function Dashboard() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser.uid);
    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [moreOptionsIsOpen, setMoreOptionsIsOpen] = useState(false);
    const [clickedPostUser, setClickedPostUser] = useState();
    const [clickedPost, setClickedPost] = useState();
    const [deletePostModalIsOpen, setDeletePostModalIsOpen] = useState(false);
    let content;

    if (modalIsOpen || moreOptionsIsOpen || deletePostModalIsOpen) {
        document.body.style.overflowY = "hidden";
    } else {
        document.body.style.overflowY = "scroll";
    }

    if (user === undefined) {
        content = <Loader />;
    } else if (user && user.following.length === 0) {
        content = <AllSuggestedUsers />;
    } else {
        content = <Main />;
    }

    useEffect(() => {
        document.title = "Instagram";
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                setIsLoading,
                setIsOpen,
                setClickedPostUser,
                setClickedPost,
                setMoreOptionsIsOpen,
            }}
        >
            {modalIsOpen && (
                <CreatePostModal
                    setIsOpen={setIsOpen}
                    setIsLoading={setIsLoading}
                    modalIsOpen={modalIsOpen}
                />
            )}
            {moreOptionsIsOpen && (
                <MoreOptions
                    setMoreOptionsIsOpen={setMoreOptionsIsOpen}
                    loggedInUser={loggedInUser}
                    clickedPostUser={clickedPostUser}
                    clickedPost={clickedPost}
                    setDeletePostModalIsOpen={setDeletePostModalIsOpen}
                />
            )}
            {deletePostModalIsOpen && (
                <DeletePostModal
                    clickedPost={clickedPost}
                    setDeletePostModalIsOpen={setDeletePostModalIsOpen}
                />
            )}
            <div
                className={`bg-fa font-roboto ${(modalIsOpen || moreOptionsIsOpen || deletePostModalIsOpen) &&
                    "filter brightness-50"
                    } `}
            >
                {isLoading && (
                    <div className="fixed h-3px top-0 z-50 w-full grad-bar animate-LoadingBarEnter animate-LoadingBarProgress "></div>
                )}
                <Header />
                {content}
                <Navbar />
            </div>
        </DashboardContext.Provider>
    );
}
