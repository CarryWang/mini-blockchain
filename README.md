# use node.js implement a mini blockchain

## usage

### run server

```
node index
```

## operate blockchian


### add new transaction

```
post http://localhost:3000/transactions/new
```
<img width="1392" alt=":transactions:new" src="https://github.com/CarryWang/mini-blockchain/assets/12207994/9238dcd4-d263-4b06-b506-566410a4b697">

### mine

```
get http://localhost:3000/mine
```
<img width="1392" alt="mine" src="https://github.com/CarryWang/mini-blockchain/assets/12207994/152a8da3-afed-40fc-ab29-6fe23d4ced2c">

### get blcokchain

```
get http://localhost:3000/chain
```
<img width="1392" alt="chain" src="https://github.com/CarryWang/mini-blockchain/assets/12207994/88b1239d-4645-432c-bfee-0c8aa7600ee8">



