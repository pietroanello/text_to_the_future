import React, { useState } from 'react'

const GlobalContext = React.createContext()

const GlobalContextProvider = props => {
  const [route, setRoute] = useState('dashboard')
  const [account, setAccount] = useState()
  const [messages, setMessages] = useState()
  const [network, setNetwork] = useState()

  return (
    <GlobalContext.Provider
      value={{
        route,
        setRoute,
        account,
        setAccount,
        messages,
        setMessages,
        network,
        setNetwork,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export { GlobalContextProvider, GlobalContext }
