import Header from '@components/Header'
import Messages from '@components/Messages'
import TextArea from '@components/TextArea'
import { GlobalContext } from '@context/GlobalContext'
import useEthersFunctions from '@hooks/useEthersFunctions'
import React, { useContext, useEffect } from 'react'
import './App.scss'

export default function App() {
  const { route, account, setAccount, setNetwork } = useContext(GlobalContext)
  const { getNetwork, checkWallet, connectWallet } = useEthersFunctions()

  const connect = async () => {
    const account = await connectWallet()
    setAccount(account)
  }

  useEffect(() => {
    ;(async () => {
      const account = await checkWallet()
      account && setAccount(account)

      const actualNetwork = await getNetwork()
      actualNetwork && setNetwork(actualNetwork)
    })()
  }, [])

  return (
    <>
      <Header connect={connect} account={account} />
      {route === 'dashboard' ? (
        <>
          <div className='mainContainer'>
            <TextArea />
          </div>
          <Messages />
        </>
      ) : (
        <Messages />
      )}
    </>
  )
}
