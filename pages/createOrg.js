import { useEffect, useState } from 'react';
import Head from '../components/Head';
const CreateorgPage = () => {   
    //global variables are called hooks, useState for good things.
    const [hook, setHook] = useState([]); 

    //how to make a function. async allows functions that normally
    //run asynchronously to be waited for, using await.
    const func = (async (body, endpoint) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'whee': param})
        }
        await fetch(`/${endpoint}`, options)
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
            <div class="form-overall">
                <div className="form-items">
                    <label for="email" id="emailLabel">Organization Name:</label>
                    <input type="email" id="email" name="email" placeholder="Username or Email" required/>
                </div>
                <label id="emailError"></label>
                <button type="submit" className = "submit-button" name="submitButton" id="submitButton" value="Submit">Log in</button>
            </div>
        </div>
    );
}
export default CreateorgPage