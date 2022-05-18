import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='w-25 border border-dark rounded text-center m-auto mt-5 px-4 py-3'>
        <h1>Sign up</h1>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>
                    Enter your email
                </Form.Label>
                <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>
                    Enter your password
                </Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">
                Login
            </Button>
        </Form>
        <p>Already have an account ? <Link to="/login">Log in</Link></p>
    </div>   
  )
}

export default Signup