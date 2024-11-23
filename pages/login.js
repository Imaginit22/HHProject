import { useEffect } from 'react';
import Head from '../components/Head';

const signup = () => {
    useEffect(() => {
        const emailError = document.getElementById("emailError")
        const emailLabel = document.getElementById("emailLabel")
        const button = document.getElementById("submitButton")
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        console.log(email.value.toLowerCase())
        
        button.addEventListener('click', (event) => {
            const wholeShebang = {
                email: email.value,
                password: password.value
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
    }, [])



    return(
        <div>
            <Head title={'about'}/>
            <h1 className='centered'>Login</h1>
            <div class="form-overall">
                <div className="form-items">
                    <label for="email" id="emailLabel">Username/Email:</label>
                    <input type="email" id="email" name="email" placeholder="Username or Email" required/>
                </div>
                <div className="form-items">
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" required/>
                </div>
                <label id="emailError"></label>
                <button type="submit" className = "submit-button" name="submitButton" id="submitButton" value="Submit">Log in</button>
            </div>
        </div>
    );
}
export default signup