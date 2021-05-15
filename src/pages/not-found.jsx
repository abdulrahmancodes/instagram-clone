import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/styles.css";
import Header from "../components/header";

export default function NotFound() {
    useEffect(() => (document.title = "Not Found"), []);

    const [value, setValue] = useState("");

    return (
        <div className="bg-fa h-screen">
            <Header />
            <div className="flex flex-col justify-center text-center mt-28 font-roboto px-12">
                <h3 className="text-2xl font-bold mb-6">
                    Sorry, this page isn't available.
        </h3>
                <p>
                    The link you followed may be broken, or the page may have been
          removed.{" "}
                    <Link to="/login" className="text-blue">
                        Go back to Instagram.
          </Link>
                </p>
            </div>
        </div>
    );
}
