import { GlobalContext } from '@context/GlobalContext'
import contractArtifact from '@utils/MessagePortal.json'
import { ethers } from 'ethers'
import React, { useContext, useEffect } from 'react'
import './index.scss'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const contractABI = contractArtifact.abi

const startLink = 'https://rinkeby.etherscan.io/address/'
const colors = ['pink', 'yellow', 'blue', 'purple']

const Messages = props => {
  const { route, account, messages, setMessages, network } = useContext(GlobalContext)

  const getMessages = async () => {
    try {
      const { ethereum } = window

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const messagePortalContract = new ethers.Contract(contractAddress, contractABI, provider)

        let messages = await messagePortalContract.getMessages()
        setMessages(messages)
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getMessages()
    })()
  }, [network])

  return (
    <>
      {route === 'dashboard' && (
        <div className='titleContainer'>
          <h3>Public messages...</h3>
        </div>
      )}
      {route === 'private' && messages.length === 0 && (
        <div className='titleContainer'>
          <h3>No messages yet...</h3>
        </div>
      )}
      <div className='messagesContainer'>
        {messages &&
          messages.map((message, index) => {
            const { sender, messageType, timestamp } = message
            const color = colors[Math.floor(Math.random() * (colors.length - 1 - 0 + 1) + 0)]

            if (route === 'dashboard' && messageType === 'public') {
              return (
                <div key={`message_${index}`} className={`singleMessage ${color}`}>
                  <p className='message'>{message.message}</p>
                  <p className='address'>
                    Sent by:{' '}
                    <a href={startLink + sender} target='_blank'>
                      {sender}
                    </a>
                    <br />
                    on: {new Date(timestamp * 1000).toString()}
                  </p>
                </div>
              )
            } else if (route === 'private' && account === sender.toLowerCase()) {
              return (
                <div key={`message_${index}`} className={`singleMessage ${color}`}>
                  <p className='message'>{message.message}</p>
                  <p className='address'>
                    Sent by:{' '}
                    <a href={startLink + sender} target='_blank'>
                      {sender}
                    </a>
                    <br />
                    on: {new Date(timestamp * 1000).toString()}
                  </p>
                </div>
              )
            }
          })}
      </div>
    </>
  )
}

export default Messages
