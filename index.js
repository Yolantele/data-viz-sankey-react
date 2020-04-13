const csv = require('csv-parser')
const fs = require('fs')
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

getEuralCodeDescriptions()
