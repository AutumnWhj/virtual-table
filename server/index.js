const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const http = require('http')
const server = http.createServer()

server.on('request', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.status = 200
    res.end()
  }
  if(req.url === '/api/virtualTable') {
    const csvPath = path.resolve(__dirname, './acho_export_virtual_scroll.csv')
    const data = await parserCSV(csvPath)
    res.end(JSON.stringify({
      code: 0,
      message: 'success',
      data
    }))
  }
})
server.listen('4000', () => {
  console.log('server: http://localhost:4000/')
})

// parser acho_export_virtual_scroll
function parserCSV(csvPath) {
  const results = [];
  const maxLine = 50
  const columnConfig = []
  return new Promise(resolve => {
    fs.createReadStream(csvPath)
    .pipe(csv({
      mapHeaders: ({ header }) => {
        columnConfig.push(header)
        return header
      }
    }))
    .on('data', (data) => {
      if(results.length < maxLine) {
        results.push(data)
      }
    })
    .on('end', () => {
      resolve({
        columnConfig ,
        tableData: results
      })
    })
  })
}
