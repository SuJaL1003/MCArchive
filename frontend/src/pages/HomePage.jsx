import React from 'react'
import Layout from '../components/Layout/Layout'
import {useAuth} from "../context/auth";
const HomePage = () => {
    const [auth] = useAuth();
    console.log("AUTH CONTEXT:", auth); 
    return (
        <Layout>
            <h1>HOME PAGE</h1>
        </Layout>
    )
}

export default HomePage