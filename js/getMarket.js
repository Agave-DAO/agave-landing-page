
function createRowFromTokenInfo(tokenInfo) {
  var tableRow = document.createElement("tr")
  tableRow.className = "token-row"

  var symbolCell = document.createElement("td")
  symbolCell.className = "asset-cell token-text"

  var leftAssetCell = document.createElement("div")
  leftAssetCell.className = "asset"

  var tokenIcon = document.createElement("img")
  tokenIcon.className = "token-icon"
  tokenIcon.src =`images/${tokenInfo.symbol}.svg`

  leftAssetCell.appendChild(tokenIcon)

  var rightAssetCell = document.createElement("div")
  rightAssetCell.className = "asset token-text"
  rightAssetCell.innerHTML += tokenInfo.symbol

  symbolCell.appendChild(leftAssetCell)
  symbolCell.appendChild(rightAssetCell)


  var priceCell = document.createElement("td")
  priceCell.className = "token-cell token-text"
  price = parseInt(tokenInfo.price.priceInEth, 10) / Math.pow(10, 8)
  priceCell.innerText = "$ " + price .toFixed(2)

  var supplyCell = document.createElement("td")
  supplyCell.className = "token-cell token-text"
  tokenSupply = parseInt(tokenInfo.totalATokenSupply, 10) / Math.pow(10, tokenInfo.decimals)
  supplyCell.innerText = tokenSupply.toFixed(2) + " " + tokenInfo.symbol

  var utilizationRateCell = document.createElement("td")
  utilizationRateCell.className = "token-cell token-text"
  stableBorrowRate = parseFloat(tokenInfo.utilizationRate) * 100
  utilizationRateCell.innerText = stableBorrowRate.toFixed(2) + " %"

  var liquidityRateCell = document.createElement("td")
  liquidityRateCell.className = "token-cell token-text"
  liquidityRate = parseInt(tokenInfo.liquidityRate, 10) / Math.pow(10, 25)
  liquidityRateCell.innerText = liquidityRate.toFixed(3) + " %"

  var variableBorrowCell = document.createElement("td")
  variableBorrowCell.className = "token-cell token-text"
  variableBorrowRate = parseInt(tokenInfo.variableBorrowRate, 10) / Math.pow(10, 25)
  variableBorrowCell.innerText = variableBorrowRate.toFixed(2) + " %"

  tableRow.appendChild(symbolCell)
  tableRow.appendChild(priceCell)
  tableRow.appendChild(supplyCell)
  tableRow.appendChild(utilizationRateCell)
  tableRow.appendChild(liquidityRateCell)
  tableRow.appendChild(variableBorrowCell)


  return tableRow
}

(
  async function () {
    const data = JSON.stringify({
      query: `{
        reserves(first: 8, orderBy:utilizationRate) {
          underlyingAsset
          aToken {
            id
              }
          symbol
          decimals
          usageAsCollateralEnabled
          stableBorrowRateEnabled
          isActive
          utilizationRate
          totalDeposits
          totalLiquidity
          totalATokenSupply
          variableBorrowRate
          stableBorrowRate
          liquidityRate
          price {
            priceInEth
          }
        }
      }`,
    });

  $.ajax({
    type: "POST",
    url: 'https://api.thegraph.com/subgraphs/name/agave-dao/agave-xdai',
    data: data,
    success: function(data) {
      data.data.reserves.forEach(token => {
        document.getElementById("markets-table").appendChild(createRowFromTokenInfo(token))
      })
    }
  });

})();