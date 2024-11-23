import { useEffect, useState } from 'react';
import Head from '../components/Head';
const events = () => {   
    //global variables are called hooks, useState for good things.
    const [hook, setHook] = useState([]); 

    //how to make a function. async allows functions that normally
    //run asynchronously to be waited for, using await.

    //code goes here for on-run things
    
    //html goes here
    return(
        <div>
            <Head title={'about'}/>
            <div align="center"><iframe src ="../thomas.html" width="1000" height="750"></iframe></div>
        </div>
    );
}
export default events