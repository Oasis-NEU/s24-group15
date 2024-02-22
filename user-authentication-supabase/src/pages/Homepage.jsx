import React from 'react'

const Homepage = ({token}) => {
  return (
    <div>Welcome back, {token.user.user_metadata.full_name}</div>
  )
}

export default Homepage