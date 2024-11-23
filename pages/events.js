import { useEffect, useState } from 'react';
import Head from '../components/Head';
const events = () => {   
    //global variables are called hooks, useState for good things.
    const [hook, setHook] = useState([]); 

    //how to make a function. async allows functions that normally
    //run asynchronously to be waited for, using await.
    const func = (async (param) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'whee': param})
        }
        await fetch('/endpoint', options)
        print(yaya)
    })

    //code goes here for on-run things
    useEffect(() => {
        console.log("This is print in usefeccted")
    }, []);

    //html goes here
    return(
        <div>
            <Head title={'about'}/>
            This is text
        </div>
    );
}
export default events