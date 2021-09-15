
import React from 'react'

const ProgressBar = ({ bgcolor, progress }) => {
  const Parentdiv = {
    height: 9,
    width: '100%',
    backgroundColor: '#3B3B3B',
    borderRadius: 40,
    marginTop: 12,
    marginBottom: 12
  }

  const Childdiv = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: 'right'
  }

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
      </div>
    </div>
  )
}

export default ProgressBar;