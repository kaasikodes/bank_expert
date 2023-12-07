import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployReceiver: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const routerSMumbai = "0x70499c328e1E2a3c41108bd3730F6670a44595D1";

  await deploy("Receiver", {
    from: deployer,
    args: [routerSMumbai],
    log: true,
  });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deployReceiver;

// e.g. yarn deploy --tags YourContract
deployReceiver.tags = ["Receiver"];
