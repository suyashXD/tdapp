require("@nomiclabs/hardhat-ethers");

module.exports = {
    solidity: "0.8.0",
    networks: {
        goerli: {
            url: "https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID",
            accounts: ["YOUR_METAMASK_PRIVATE_KEY"],
        },
    },
};
