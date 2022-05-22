import React from 'react'
import { Navigate } from 'react-router-dom'

const Protected = ({ token, children }) => {
  if (token !== null) {
      return children
  }

  return <Navigate to="/" />
}

export default Protected