import { GlobalContext } from '@context/GlobalContext'
import contractArtifact from '@utils/MessagePortal.json'
import { ethers } from 'ethers'
import React, { useContext, useState } from 'react'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const contractABI = contractArtifact.abi

const { ethereum } = window

const TextArea = () => {
  const { setMessages, network, setNetwork } = useContext(GlobalContext)
  const [options, setOptions] = useState({
    select: 'private',
    message: '',
  })
  const [disabled, setDisabled] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setOptions(prev => ({ ...prev, [name]: value }))
  }

  const wave = async () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const messagePortalContract = new ethers.Contract(contractAddress, contractABI, signer)

        if (options.message === '') {
          console.log('Scrivi qualcosa')
          return
        } else {
          let sendMessage = await messagePortalContract.send(options.message, options.select, {
            gasLimit: 300000,
          })

          setDisabled(true)
          console.log('Mining...', sendMessage.hash)
          await sendMessage.wait()
          console.log('Mined -- ', sendMessage.hash)
          setDisabled(false)

          let messages = await messagePortalContract.getMessages()
          setMessages(messages)
        }
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const changeNetwork = async () => {
    const newNetwork = await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
    })
    if (!newNetwork) {
      setNetwork({ name: 'rinkeby' })
    }
  }

  return (
    <div className='dataContainer'>
      <div className='pageTitle'>Just a little reminder ✍ for the future</div>

      <textarea
        className='bio'
        name='message'
        placeholder="Try to be nice, there's a 5% chance to win ETH :)"
        value={options.message}
        onChange={handleChange}
      />

      <div className='selectContainer'>
        <label>
          <input
            type='radio'
            value='private'
            name='select'
            checked={options.select === 'private'}
            onChange={handleChange}
          />{' '}
          <span>For me</span>
        </label>
        <label>
          <input
            type='radio'
            value='public'
            name='select'
            checked={options.select === 'public'}
            onChange={handleChange}
          />{' '}
          <span>For everyone</span>
        </label>
      </div>

      {network?.name === 'rinkeby' ? (
        <button className='waveButton' onClick={wave} disabled={disabled}>
          {disabled ? 'Transaction running...' : 'Send reminder'}
        </button>
      ) : (
        <button className='waveButton' onClick={changeNetwork}>
          Switch to Rinkeby test network
        </button>
      )}
    </div>
  )
}

export default TextArea
