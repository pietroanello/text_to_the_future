const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const messageContractFactory = await hre.ethers.getContractFactory('MessagePortal')
  const messageContract = await messageContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  })
  await messageContract.deployed()
  console.log('Contract deployed to:', messageContract.address)

  /*
   * Get Contract balance
   */
  let contractBalance = await hre.ethers.provider.getBalance(messageContract.address)
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance))

  /*
   * Send Message 1
   */
  let messageTxn = await messageContract.connect(randomPerson).send('Hey man 1!', 'public')
  await messageTxn.wait()

  /*
   * Send Message 2
   */
  messageTxn = await messageContract.connect(randomPerson).send('Hey man 2!', 'public')
  await messageTxn.wait()

  /*
   * Get Contract balance after sending!
   */
  contractBalance = await hre.ethers.provider.getBalance(messageContract.address)
  console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance))

  let messageCount = await messageContract.getMessages()
  console.log(messageCount)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
