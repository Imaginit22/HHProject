
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const Szhead = ({ title }) => {
    const [links, setLinks] = useState([]);
    const [email, setEmail] = useState([]);
    useEffect(() => {
        setEmail(localStorage.getItem('username'))
        const newLinks = [
            { href: "/", text: "Home" },
            { href: "/events", text: "Events" },
            { href: "/organizations", text: "Organizations" }
        ];
        /*if (localStorage.getItem('email') != null) {
            setLinks([
                ...newLinks,
                { href: "/invite", text: "Invites/Games" }
            ]);
        } else {
            setLinks(newLinks);
        }*/
        setLinks(newLinks);
    }, []);

    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>{title}</title>
                <link rel="stylesheet" href="../css/styles.css"/>
            </Head>
            <nav className='nav-top'>
                <div>
                    {links.map(link => (
                        <a key={link.href} href={link.href} style={{paddingLeft:'10px'}}>{link.text}</a>
                    ))}
                </div>
                {email 
                ? 
                <div className="right">
                    <a href='/account'>
                        {email}
                    </a>
                </div>
                :
                <div className="right">
                    <a id="signUp" href={email ? "/account" : "/signup"}>
                        {email ? email : "Sign up"}
                    </a>
                    <a id="signUp" href={email ? "/account" : "/login"}>
                        {email ? email : "Log in"}
                    </a>
                </div>}
                
            </nav>
        </>
    );
};

export default Szhead;
