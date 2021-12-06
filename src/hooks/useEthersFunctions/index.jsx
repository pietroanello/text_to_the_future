import { ethers } from 'ethers'

const useEthersFunctions = () => {
  const checkWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Make sure you have metamask!')
        return false
      } else {
        console.log('We have the ethereum object', ethereum)
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        console.log('Found an authorized account', accounts[0])
        return accounts[0]
      } else {
        console.log('No authorized account found')
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected', accounts[0])
      return accounts[0]
    } catch (error) {
      console.log(error)
    }
  }

  const getNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const network = provider.getNetwork()
    return network
  }

  return { getNetwork, connectWallet, checkWallet }
}

export default useEthersFunctions
