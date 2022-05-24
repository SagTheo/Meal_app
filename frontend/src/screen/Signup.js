import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [passwordConfErr, setPasswordConfErr] = useState('')
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

  const checkPasswordConf = (passwordConf, password) => {
      if (passwordConf === '') {
          setPasswordConfErr('You must re-enter your password')
          return false
      } else if (passwordConf !== password) {
          setPasswordConfErr('Passwords don\'t match')
          return false
      } else {
          setPasswordConfErr('')
          return true
      }
  }



  const handleSubmit = (e) => {
    if (!checkEmail(email) || !checkPassword(password) || !checkPasswordConf(passwordConf, password)) {
       e.preventDefault() 
       return
    } else {
        e.preventDefault()
        fetch('http://localhost:3001/signup', {
           method: "POST",
           headers: { 'Content-Type' : 'application/json' },
           body: JSON.stringify({
               email: email,
               password: password
           })
        })
        .then(res => res.json())
        .then(data => {
           localStorage.setItem('userToken', JSON.stringify(data.token))
           navigate('/home')  
        })
        .catch(err => console.log(err)) 
    }
  }
  
  return (
    <div className='w-25 border border-dark rounded text-center m-auto mt-5 px-4 py-3'>
        <h1>Sign up</h1>
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
            <div className="mb-3">
                <label>
                    Confirm your password
                </label>
                <input type="password" 
                       className='w-75 p-1'
                       value={passwordConf}
                       onChange={(e) => setPasswordConf(e.target.value)}
                />
                <p className='text-danger'>{ passwordConfErr ? passwordConfErr : '' }</p>
            </div>
            <Button variant="primary" 
                    type="submit" 
                    className="mb-3"
                    onClick={(e) => handleSubmit(e)}
            >
                Login
            </Button>
        </form>
        <p>Already have an account ? <Link to="/login">Log in</Link></p>
    </div>   
  )
}

export default Signup