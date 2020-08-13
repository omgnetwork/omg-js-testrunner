# omg-js-testrunner

Simple Dockerfile file to run omg integration tests

## Run with docker
1. First specify the omg-js git sha that you would like to use in file [OMG_JS_SHA](./OMG_JS_SHA)
1. To build the test runner image, run: `docker build -t testrunner .`
1. You can now run with docker: `docker run -it testrunner`

## Environment Variables
```
ETH_NODE=                           <entry point to an ethereum node>
WATCHER_URL=                        <url of an informational watcher (watcher-info)>
WATCHER_SECURITY_URL=               <*optional* url of an security watcher (watcher-security or watcher)>
WATCHER_PROXY_URL=                  <*optional* proxy server to catch all watcher requests>
CHILDCHAIN_URL=                     <childchain url>
PLASMAFRAMEWORK_CONTRACT_ADDRESS=   <address of the plasma_framework contract>
ERC20_CONTRACT_ADDRESS=             <*optional* address of the erc20 contract that Alice will deposit and transfer to Bob>
FUND_ACCOUNT=                       <address of the funding account>
FUND_ACCOUNT_PRIVATEKEY=            <private key of the funding account>
MILLIS_TO_WAIT_FOR_NEXT_BLOCK=      <interval when checking for block confirmation>
BLOCKS_TO_WAIT_FOR_TXN=             <amount of blocks to wait for confirmation>
MIN_AMOUNT_ETH_PER_TEST=            <minimum amount of eth per test>
MIN_AMOUNT_ERC20_PER_TEST=          <minimum amount of erc20 per test>
TOPUP_MULTIPLIER=                   <topup multiplier>
FAUCET_SALT=                        <random salt for the faucet>
```
