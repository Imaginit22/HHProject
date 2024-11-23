import { useEffect } from 'react';
import Head from '../components/Head';
const AccountPage = () => {
    useEffect(() => {
        const logOut = document.getElementById("logOut");
        logOut.addEventListener('click', () => {
            localStorage.removeItem('email');
            window.location.reload();
            window.location.href = '/';
        })
    }, [])
    return(
        <div>
            <Head title={'account'}/>
            <button id = "logOut">Log Out</button>
        </div>
    );
}
export default AccountPage