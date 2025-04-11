import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const PageNotFound = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
                <h1 className="text-7xl font-extrabold text-purple-700 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Oops! Page Not Found</h2>
                <Link
                    to="/"
                    className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
                >
                    Go Back to Home
                </Link>
            </div>
        </Layout>
    );
};

export default PageNotFound;
