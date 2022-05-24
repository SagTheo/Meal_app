import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ token, children }) => {
  if (token === null) {
      return <Navigate to="/" />
  }

  return children
}

export default Protected