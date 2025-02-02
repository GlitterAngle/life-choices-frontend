import * as authService from '../services/authService.js'

import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './SignupForm.css'

//add props in once auth is working 
const SignupForm = (props) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        passwordConf: ''
    })

    const handleChange = e =>{
      props.updateMessage('')
      setFormData({...formData,[e.target.name]: e.target.value,})
      console.log(formData, 'formdatat')
    }

    const handleSubmit = async e =>{
      e.preventDefault()
      try {
        await authService.singup(formData)
        //add in handle login/signup 
        navigate('/login')
      } catch (error) {
        console.error("Error during signup:", error)
        const errorMessage = error.message ||
        props.updateMessage(errorMessage)
      }
    }

    //destructure formData
    const {name,username, email,password, passwordConf} = formData
    
    const isFormValid = () =>{
      return !(name && username && email && password && password === passwordConf)
    }
    return (
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <input type='text' autoComplete='off' id='name' value={name} name='name' onChange={handleChange} placeholder='Name'/>          
        </div>
        <div>
          <input type='text' autoComplete='off' id='username' value={username} name='username' onChange={handleChange} placeholder='Username'/>          
        </div>
        <div>
          <input type='text' autoComplete='off' id='email' value={email} name='email' onChange={handleChange} placeholder='Email'/>          
        </div>
        <div>
          <input type='password' autoComplete='off' id='password' value={password} name='password' onChange={handleChange} placeholder='Password'/>          
        </div>
        <div>
          <input type='password' autoComplete='off' id='confirm' value={passwordConf} name='passwordConf' onChange={handleChange} placeholder='Confirm Password'/>          
        </div>
        <div>
          <button disabled={isFormValid()} >
            Sign Up
          </button>
          <Link to='/'>
            <button>Nevermind</button>
          </Link>
        </div>
      </form>
  )
}

export default SignupForm