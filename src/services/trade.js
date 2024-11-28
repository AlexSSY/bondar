var symbol = null
var kLinesSubscribes = []
var last24hChangeSubscribes = []
var wsBinance = null

export async function initTrade(_symbol) {
  symbol = _symbol.toUpperCase()
  await flushHistory()
  subscribeToBinanceKLines()
}

export function subscribeKLines(callback) {
  kLinesSubscribes.push(callback)
}

export function subscribeLast24hChanges(callback) {
  last24hChangeSubscribes.push(callback)
}

async function flushHistory() {
  var uri = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1d&limit=1000`
  var response = await fetch(uri)
  var jsonResponse = await response.json()
  if (response.ok) {
      var history = jsonResponse.map((d) => {
        return {
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }
      })
      flushKLines(history, true)
      flush24hChanges({
        volume1: parseFloat(jsonResponse[7]),
        volume2: parseFloat(jsonResponse[10]),
        percent: ((parseFloat(jsonResponse[4]) - parseFloat(jsonResponse[1])) / parseFloat(jsonResponse[1])) * 100,
      })
    } else {
      console.error('Failed to load history for ' + symbol)
    }
}

function flushKLines(kLines, rewrite) {
  kLinesSubscribes.forEach((callback) => callback(kLines, rewrite))
}

function flush24hChanges(last24hChange) {
  last24hChangeSubscribes.forEach((callback) => callback(last24hChange))
}

function subscribeToBinanceKLines() {
  var uri = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1d`
  wsBinance = new WebSocket(uri)
  wsBinance.onclose = () => {
    // console.log(`Binance ws closed. Attempt to reconnect`)
    // setTimeout(async () => {
    //   flushHistory()
    //   subscribeToBinanceKLines()
    // }, 5000)
  }

  wsBinance.onmessage = (onmessage) => {
    const msg = JSON.parse(onmessage.data)
    const pairInfo = msg.k
    const kLines = {
      time: pairInfo.t / 1000,
      open: parseFloat(pairInfo.o),
      high: parseFloat(pairInfo.h),
      low: parseFloat(pairInfo.l),
      close: parseFloat(pairInfo.c),
    }
    const last24hChange = {
      volume1: parseFloat(pairInfo.v),
      volume2: parseFloat(pairInfo.q),
      percent: ((parseFloat(pairInfo.c) - parseFloat(pairInfo.o)) / parseFloat(pairInfo.o)) * 100,
    }

    flushKLines([kLines], false)
    flush24hChanges(last24hChange)
  }
}
