import { useEffect, useState } from 'react';
import Head from '../components/Head';
const CreateorgPage = () => {   
    //global variables are called hooks, useState for good things.
    const [hook, setHook] = useState([]); 



    //code goes here for on-run things
    useEffect(() => {
        const button = document.getElementById("submitButton")
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("password")
        const orgname = document.getElementById("email")
        button.addEventListener('click', (event) => {
            let errors = "";
            const wholeShebang = {
                email: email,
                password: password,
                orgname: orgname.value
            }
            const jsonData = JSON.stringify(wholeShebang)
            const options = {
                method: 'POST', // Specify the request method (PUT for updating data)
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            };
            fetch('/createOrg', options)
            .then(res => {
                if (!res.ok) {
                    console.log("NO")
                    return res.json().then(errorData => {
                    emailError.textContent = errorData.message;
                    });
                } else {
                    console.log("YES", email.value.toLowerCase())
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
                    <label for="email" id="emailLabel">Event Name:</label>
                    <input type="email" id="email" name="email" placeholder="Org Name" required/>
                </div>

                <div className="form-items">
                    <label for="email" id="emailLabel">Event Description:</label>
                    <input type="email" id="email" name="email" placeholder="Org Name" required/>
                </div>

                <div className="form-items">
                    <label for="email" id="emailLabel">Event Latitude:</label>
                    <input type="email" id="email" name="email" placeholder="Org Name" required/>
                </div>

                <div className="form-items">
                    <label for="email" id="emailLabel">Event Longitude:</label>
                    <input type="email" id="email" name="email" placeholder="Org Name" required/>
                </div>

                <div className="form-items">
                    <label for="email" id="emailLabel">Event Address:</label>
                    <input type="email" id="email" name="email" placeholder="Org Name" required/>
                </div>
                <label id="emailError"></label>
                <button type="submit" className = "submit-button" name="submitButton" id="submitButton" value="Submit">Create Organization</button>
            </div>
        </div>
    );
}
export default CreateorgPage