import { useState } from "react";
import "./loginForm.css"
import Button from "../../elements/button/button";

function LoginForm(){
    const [formData, setFormData] = useState({username: '', password: ''})

    function handleFormSubmit(e){
        e.preventDefault()
        console.log(formData)
    }

    // Update the form data when the user changes
    // the input data
    function handleInputChange(e){
        const inputChanged = e.target.getAttribute('name')
        setFormData(formData => ({...formData, [inputChanged]: e.target.value }))
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

                <Button text='login' action={handleFormSubmit} />
            </form>
        </div>
    )
}

export default LoginForm;