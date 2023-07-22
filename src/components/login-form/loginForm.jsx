import { useState } from "react";
import "./loginForm.css"
import Button from "../../elements/button/button";
import apiHost from "../../utilities/api";
import { login } from "../../redux/user";
import { goToNextStage } from "../../redux/request";
import { useDispatch, useSelector } from "react-redux";

function LoginForm(){
    const [formData, setFormData] = useState({username: '', password: ''})
    const dispatch = useDispatch()

    async function handleFormSubmit(e){
        e.preventDefault()

        // Go to the next login stage. In this case move from
        // "idle"/user filling in details to "processing" user details
        dispatch(goToNextStage('login'))


        // The zipcode is used for password here
        const endpoint = `users?username=${formData.username}&zipcode=${formData.password}`

        const res = await fetch(`${apiHost}/${endpoint}`)
        if(res.ok){
            // This will return more details about the user who has just logged in
            // the data will be an array with one object corresponding to the user inside it
            const user = await res.json().then(data => data)

            // If there exists user with the username and password submitted
            if(!!user.length){
                console.log(user[0])
                if(user[0].address.zipcode === formData.password){
                    // Go to the next stage of the request. In this case
                    // Move from "processing" to "completed"
                    dispatch(goToNextStage('login'))
    
                    // Also save the details of the user who has logged in
                    dispatch(login(user[0]))
                }
            }
        }else {
            res.json().then(error => console.warn(error))
        }
    }

    // Update the form data when the user changes
    // the input data
    function handleInputChange(e){
        const inputChanged = e.target.getAttribute('name')
        setFormData(formData => ({...formData, [inputChanged]: e.target.value }))
    }

    function getButtonText(){
        const loginStage = useSelector(state => state.request.login)

        if(loginStage === 0){
            // Idle stage. User still filling in their credentials
            return 'Login'
        }else{
            // Processing stage. The person clicked the login button.
            // Now we process the information submitted
            // The text on the button now changes to the following
            return "loggin you in..."
        }
    }

    return (
        <div className="component login-component">
            <form className="login-form" onSubmit={handleFormSubmit}>
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="username" value={formData.username} onChange={handleInputChange}/>
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleInputChange}/>
                </div>

                <Button text={getButtonText()} action={handleFormSubmit} />
            </form>
        </div>
    )
}

export default LoginForm;