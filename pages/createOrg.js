import { useEffect, useState } from 'react';
import Head from '../components/Head';
const CreateorgPage = () => {   
    //global variables are called hooks, useState for good things.
    const [hook, setHook] = useState([]); 



    //code goes here for on-run things
    useEffect(() => {
        const button = document.getElementById("submitButton")
        console.log("This is print in usefeccted")
        button.addEventListener('click', (event) => {
            const wholeShebang = {
                email: email.value,
            }
            email.innerText = 'dfsaksdjs'
            let errors = "";
            console.log("beeooop")
            const jsonData = JSON.stringify(wholeShebang)
            const options = {
                method: 'POST', // Specify the request method (PUT for updating data)
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            };
            fetch('/userLogin', options)
            .then(res => {
                if (!res.ok) {
                    console.log("NO")
                    return res.json().then(errorData => {
                    //email.value = "";
                    emailError.textContent = errorData.message;
                    });
                } else {
                    console.log("YES", email.value.toLowerCase())
                    window.localStorage.setItem('email', email.value.toLowerCase());
                    window.localStorage.setItem('password', password.value);
                    window.location.href = '/';
                }
            })
            .catch(error => {
                console.error("Network error or unexpected error:", error);
            });            
        });
    }, []);

    //html goes here
    return(
        <div>
            <Head title={'about'}/>
            <div class="form-overall">
                <div className="form-items">
                    <label for="email" id="emailLabel">Organization Name:</label>
                    <input type="email" id="email" name="email" placeholder="Org Name" required/>
                </div>
                <label id="emailError"></label>
                <button type="submit" className = "submit-button" name="submitButton" id="submitButton" value="Submit">Create Organization</button>
            </div>
        </div>
    );
}
export default CreateorgPage