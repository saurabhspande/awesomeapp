import React, { useState } from 'react';
import { NavLink, useHistory} from 'react-router-dom';


const Signup = () => {
    const history = useHistory();
    const [user,setUser] = useState({
        name:"",email:"",phone:"",password:"",cpassword:""
    })
    let name,value;


    const handleInputs = (e) =>{
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user,[name]:value});
    }
   
    const PostData = async(e) =>{
        e.preventDefault();      //its just for preventing default behaviour of form
        const { name,email,phone,password,cpassword}=user;
        const res = await fetch("/register",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                
                name,email,phone,password,cpassword
                
            }) 
        });

        const data = await res.json();

        if (data.status === 422 || !data){
            window.alert("Invalid registration")
            console.log("Invalid registration")
        }
        else{
           
            window.alert("Rrgistration Successful")
            console.log("Registration Successful")

            history.push("/login");
        }

    }    
        
    
    
    
    
    return (
        <>
            <div className='mycard'>
                <div className='auth_card'>
                    <h2>Registration</h2>
                    <form method = "POST">
                    <input type="text" name='name' placeholder='enter your name'
                        value={user.name} 
                        onChange={handleInputs} />
                   
                    <input type="email" name='email' placeholder='email'
                        value={user.email}
                        onChange={handleInputs}
                    />
                     <input type="number" name='phone' placeholder='enter your phone'
                        value={user.phone}
                        onChange={handleInputs} />

                    

                    <input type="text" name='password' placeholder='password'
                        value={user.password}
                        onChange={handleInputs}
                    />
                    

                    <input type="text" name='cpassword' placeholder='enter your cpassword'
                        value={user.cpassword}
                        onChange={handleInputs} />


                    <br />
                    <button type="button" onClick={PostData} className="btn btn-primary" >Signup</button>
                    <h5>
                        <NavLink to='/login'>Already have an account ?</NavLink>
                    </h5>
                    </form>
                </div>

            </div>
        </>
    )
}
export default Signup