import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  // TODO: Deploy on all test nets after deploying on sepolia

  await deploy("WalletFactory", {
    from: deployer,
    args: [],
    log: true,
  });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployContract;

// e.g. yarn deploy --tags YourContract
deployContract.tags = ["WalletFactory"];
