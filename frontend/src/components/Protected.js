import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ token, children }) => {
  if (token) {
      return children
  }

  return <Navigate to="/" />
}

export default Protected