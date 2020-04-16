const csv = require('csv-parser')
const fs = require('fs')

let GEO_FLUXUS_DATA = {
  links: [
    { source: 18, target: 4, value: 12.14 },
    { source: 0, target: 4, value: 2110 },
    { source: 4, target: 7, value: 4130 },
    { source: 16, target: 4, value: 140 },
    { source: 4, target: 6, value: 9270 },
    { source: 6, target: 1, value: 6560 },
    { source: 12, target: 4, value: 1050 },
    { source: 20, target: 4, value: 135.56 },
    { source: 6, target: 4, value: 5140 },
    { source: 14, target: 4, value: 11.419999999999998 },
    { source: 21, target: 4, value: 157.94 },
    { source: 10, target: 6, value: 110 },
    { source: 2, target: 6, value: 180 },
    { source: 2, target: 7, value: 2350 },
    { source: 7, target: 4, value: 1060 },
    { source: 6, target: 5, value: 250 },
    { source: 20, target: 4, value: 20 },
    { source: 14, target: 4, value: 32.54 },
    { source: 4, target: 1, value: 10 },
    { source: 13, target: 4, value: 860 },
    { source: 0, target: 6, value: 3920 },
    { source: 4, target: 14, value: 80 },
    { source: 5, target: 6, value: 1800 },
    { source: 18, target: 5, value: 140 },
    { source: 2, target: 4, value: 18.63 },
    { source: 14, target: 4, value: 70 },
    { source: 4, target: 12, value: 1050 },
    { source: 6, target: 4, value: 10.58 },
    { source: 2, target: 4, value: 3730 },
    { source: 10, target: 4, value: 860 },
    { source: 7, target: 4, value: 420 },
    { source: 20, target: 4, value: 1417.1399999999999 },
    { source: 1, target: 4, value: 10 },
    { source: 14, target: 4, value: 60 },
    { source: 8, target: 4, value: 14.930000000000001 },
    { source: 5, target: 4, value: 15.1 },
    { source: 5, target: 10, value: 18.53 },
    { source: 0, target: 6, value: 34.44 },
    { source: 9, target: 5, value: 40 },
    { source: 11, target: 5, value: 100 },
    { source: 10, target: 4, value: 2170 },
    { source: 6, target: 10, value: 10 },
    { source: 6, target: 4, value: 51.11 },
    { source: 5, target: 4, value: 8280 },
    { source: 2, target: 6, value: 5210 },
    { source: 3, target: 4, value: 180 },
    { source: 7, target: 4, value: 2350 },
    { source: 14, target: 5, value: 190 },
    { source: 10, target: 4, value: 4660 },
    { source: 15, target: 5, value: 190 },
    { source: 16, target: 4, value: 30 },
    { source: 5, target: 4, value: 100 },
    { source: 7, target: 4, value: 170 },
    { source: 6, target: 4, value: 340 },
    { source: 4, target: 10, value: 5260 },
    { source: 7, target: 4, value: 6550 },
    { source: 5, target: 4, value: 14.89 },
    { source: 13, target: 5, value: 20 },
    { source: 6, target: 4, value: 13.33 },
    { source: 8, target: 4, value: 60 },
    { source: 13, target: 4, value: 60 },
    { source: 3, target: 4, value: 20 },
    { source: 2, target: 4, value: 6740 },
    { source: 16, target: 4, value: 4960 },
    { source: 18, target: 14, value: 20 },
    { source: 17, target: 5, value: 70 },
    { source: 1, target: 4, value: 750 },
    { source: 8, target: 7, value: 1060 },
    { source: 2, target: 4, value: 2180 },
    { source: 1, target: 4, value: 580 },
    { source: 2, target: 4, value: 240 },
    { source: 11, target: 8, value: 10 },
    { source: 2, target: 6, value: 3950 },
    { source: 9, target: 4, value: 1260 },
    { source: 8, target: 4, value: 2590 },
    { source: 10, target: 5, value: 150 },
    { source: 11, target: 4, value: 1050 },
    { source: 1, target: 6, value: 4400 },
    { source: 10, target: 4, value: 390 },
    { source: 13, target: 4, value: 1740 },
    { source: 8, target: 5, value: 1010 },
    { source: 20, target: 4, value: 13.360000000000001 },
    { source: 14, target: 4, value: 4260 },
    { source: 15, target: 4, value: 230 },
    { source: 13, target: 4, value: 10.3 },
    { source: 10, target: 2, value: 230 },
    { source: 17, target: 13, value: 1060 },
    { source: 8, target: 6, value: 3100 },
    { source: 6, target: 7, value: 14.34 },
    { source: 7, target: 6, value: 14.34 },
    { source: 4, target: 6, value: 360 },
    { source: 0, target: 4, value: 120 },
    { source: 18, target: 4, value: 370 },
    { source: 20, target: 19, value: 5280 },
    { source: 4, target: 7, value: 10.36 },
    { source: 2, target: 6, value: 770 },
    { source: 4, target: 3, value: 660 },
    { source: 4, target: 2, value: 90 },
    { source: 10, target: 2, value: 110 }
  ]
}

let newData = GEO_FLUXUS_DATA
let newLinks = []

const nodeStringsToIndexes = () => {
  console.log('-----', newData.links[4].value)
  newData.links.forEach(link => {
    link.value = link.value

    return link
  })
  console.log('-----', newData.links)
}
nodeStringsToIndexes()

const getUniqueNodeNames = () => {
  let allNodes = []
  let uniqueArray
  GEO_FLUXUS_DATA.links.filter(link => {
    allNodes.push(link.target)
    allNodes.push(link.source)
    uniqueArray = [...new Set(allNodes)]
    uniqueArray.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  })
  let nodesObject = uniqueArray.map(each => ({ ['name']: each }))
  console.log(nodesObject)
}

const getEuralCodeDescriptions = () => {
  let allOrigins = []
  let allDestinations = []
  fs.createReadStream('sankey.csv')
    .pipe(csv())
    .on('data', row => {
      let { origin, destination, amount } = row
      allOrigins.push(origin)
      allDestinations.push(destination)
    })
    .on('end', () => {
      console.log(new Set(allDestinations))
      console.log(new Set(allOrigins))
      //   saveFile('EWCcodeDescriptions', JSON.stringify([allCodes]))
    })
}
// getEuralCodeDescriptions()
