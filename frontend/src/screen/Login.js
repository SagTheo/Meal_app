import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [loginError, setLoginError] = useState('')
  const emailRegex = new RegExp(/\w+@\w+.\w{2,3}/)
  const navigate = useNavigate()

  const checkEmail = (email) => {
    if (email === '') {
        setEmailErr('You must enter an email')
        return false
    } else if (!emailRegex.test(email)) {
        setEmailErr('You must enter a valid email')
        return false
    } else {
        setEmailErr('')
        return true
    }
}

const checkPassword = (password) => {
    if (password === '') {
        setPasswordErr('You must enter a password')
        return false
    } else if (password.length < 8) {
        setPasswordErr('Password must be at least 8 characters long')
        return false
    } else {
        setPasswordErr('')
        return true
    }
}

const handleSubmit = (e) => {
    if (!checkEmail(email) || !checkPassword(password)) {
       e.preventDefault() 
       return
    } else {
       fetch('http://localhost:3001/login', { //Needs work
           method: 'POST',
           headers: { 'Content-Type' : 'application/json' },
           body: JSON.stringify({
               email: email,
               password: password
           })
           .then(res => res.json()) 
           .then(data => data.ok ? navigate('/dashboard') : setLoginError('Failed to log in'))
       }) 
    }
  }

  return (
    <div className='w-25 border border-dark rounded text-center m-auto mt-5 px-4 py-3'>
        <h1>Log in</h1>
        <p>{loginError}</p>
        <form>
            <div className="mb-3">
                <label>
                    Enter your email
                </label>
                <input type="email" 
                       className='w-75 p-1'
                       value={email}
                       onChange={(e) => setEmail(e.target.value)} 
                />
                <p className='text-danger'>{ emailErr ? emailErr : '' }</p>
            </div>
            <div className="mb-3">
                <label>
                    Enter your password
                </label>
                <input type="password" 
                       className='w-75 p-1'
                       value={password}
                       onChange={(e) => setPassword(e.target.value)} 
                />
                <p className='text-danger'>{ passwordErr ? passwordErr : '' }</p>
            </div>
            <Button variant="primary" 
                    type="submit" 
                    className='mb-3'
                    onClick={(e) => handleSubmit(e)}        
            >
                Login
            </Button>
        </form>
        <p>No account ? <Link to="/signup">Sign up</Link></p>
    </div>
  )
}

export default Login