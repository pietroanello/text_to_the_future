import { GlobalContext } from '@context/GlobalContext'
import React, { useContext } from 'react'
import './index.scss'

const Header = props => {
  const { setRoute } = useContext(GlobalContext)
  const { connect, account } = props

  return (
    <div className='basicHeader'>
      <p className='logo' onClick={() => setRoute('dashboard')}>
        <span className='square'></span>
        TTTF
      </p>
      <div className='menu'>
        {account ? (
          <>
            <button onClick={() => setRoute('dashboard')}>Public Dashboard</button>
            <button onClick={() => setRoute('private')}>Your Reminders</button>
          </>
        ) : (
          <button onClick={connect}>Connect Metamask</button>
        )}
      </div>
    </div>
  )
}

export default Header
