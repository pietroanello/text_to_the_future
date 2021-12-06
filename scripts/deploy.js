const main = async () => {
  const [deployer] = await hre.ethers.getSigners()
  const accountBalance = await deployer.getBalance()

  console.log('Deplying contracts with account: ', deployer.address)
  console.log('Account balance: ', accountBalance.toString())

  const Token = await hre.ethers.getContractFactory('MessagePortal')
  const portal = await Token.deploy({
    value: hre.ethers.utils.parseEther('0.001'),
  })
  await portal.deployed()

  console.log('Waveportal address: ', portal.address)
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
