# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts

# to deploy on evmos
# ucomment evmos network in hardhat.config.ts and run:
npx hardhat run --network evmos scripts/deploy.ts
# print owners
contract="0xcontract_address" npx hardhat run --network evmos scripts/getOwners.ts
```
