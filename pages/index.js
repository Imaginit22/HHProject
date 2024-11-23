import { useEffect } from 'react';
import Head from '../components/Head'; 



const HomePage = () => {
    useEffect(() => {
        const imgLink = document.getElementById("imgLink");
        /*if (!(localStorage.getItem('email') == undefined)) {
            imgLink.href = "/invite";
        } else {
            imgLink.href = "/login";
        }*/
    }, []);

    return (
        <div>
            <Head title="Home" />
            <header>
                <div className="top">
                    <h1 className="centerText">NDM WHEEE</h1>   
                </div>
            </header>

            <body style="background-color: powderblue;">
        
                <h1> Name Doesn't Matter😁</h1>
                <h2> The first interactive map of all events in the Hamilton Region.</h2>
                <p> Create an account to share your events, or scroll down to explore available events.</p>
                
                <p align="center"><iframe src ="thomas.html" width="1000" height="750"></iframe></p>
       
    </body>
        </div>
        
    );
};

export default HomePage;
