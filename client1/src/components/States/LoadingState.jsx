import React from 'react'
import './LoadingState.css'
import { ClipLoader } from 'react-spinners'
const LoadingState = ({text}) => {
  return (
    <div className='parent-Loading'>
     <div className="invites-loading">
              <div className="loading-spinner">
                <ClipLoader size={50} color="#667eea" />
              </div>
              <p className="loading-text">{text}</p>
            </div>
            </div>
  )
}

export default LoadingState
