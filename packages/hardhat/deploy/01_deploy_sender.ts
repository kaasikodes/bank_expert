import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deploySender: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const routerSepolia = "0xD0daae2231E9CB96b94C8512223533293C3693Bf";
  const feeLink = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

  await deploy("Sender", {
    from: deployer,
    args: [routerSepolia, feeLink],
    log: true,
  });

  // Get the deployed contract
  // const yourContract = await hre.ethers.getContract("YourContract", deployer);
};

export default deploySender;

// e.g. yarn deploy --tags YourContract
deploySender.tags = ["Sender"];
