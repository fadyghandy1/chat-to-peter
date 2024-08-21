import React from 'react'
import Logo from '../../../assets/images/Dubai_logo-1-1-1_ab6ffcbb-fc57-438d-ae7b-4bfd451275a1_mini.webp'

function LoadingDotsIcon({ className }) {
  return (
    <div className={className}>
      <img className="icon" src={Logo} alt="" />
      <span className="label">Loading</span>
    </div>
  )
}

export default LoadingDotsIcon
