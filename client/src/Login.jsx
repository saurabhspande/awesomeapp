import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email, password
            })


        });

        const data = await res.json();
        // console.log(data)
        // console.log(token)
        // console.log(user)

        if (res.status === 400 || !data) {
            window.alert("invalid credentials")

        }
        else {
            // localStorage.setItem("jwt", data.token)
            // localStorage.setItem("user", JSON.stringify(data.user))
            window.alert("login Successful")


            history.push("/");

        }

    }
    return (
        <>
            <div className='mycard'>
                <div method="POST" className='auth_card'>
                    <h2>Login</h2>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                    <br />
                    <button type="button" onClick={loginUser} className="btn btn-primary">Login</button>
                    <h5>
                        <NavLink to='/signup'>Dont have an account ?</NavLink>
                    </h5>
                </div>

            </div>

        </>
    )
}
export default Login