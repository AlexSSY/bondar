var sockets = {}
var callbacks = {}

export function subscribe(symbol, callback) {
  const normalizedSymbol = symbol.toLowerCase()

  // Initialize WebSocket if not already subscribed
  if (!sockets[normalizedSymbol]) {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${normalizedSymbol}@ticker`)

    ws.onopen = () => {
      console.log(`Subscribed to ${symbol}`)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (callbacks[normalizedSymbol]) {
        // Execute all registered callbacks for this symbol
        callbacks[normalizedSymbol].forEach((cb) => cb(data))
      }
    }

    ws.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error)
    }

    ws.onclose = () => {
      console.log(`Unsubscribed from ${symbol}`)
    }

    sockets[normalizedSymbol] = ws
    callbacks[normalizedSymbol] = []
  }

  // Register the callback
  callbacks[normalizedSymbol].push(callback)
  console.log(`Callback added for ${symbol}`)
}

export function unsubscribe(symbol, callback = null) {
  const normalizedSymbol = symbol.toLowerCase()

  // Remove a specific callback or close the WebSocket
  if (callback && callbacks[normalizedSymbol]) {
    callbacks[normalizedSymbol] = callbacks[normalizedSymbol].filter(
      (cb) => cb !== callback,
    )
    console.log(`Callback removed for ${symbol}`)

    // Close WebSocket if no callbacks remain
    if (callbacks[normalizedSymbol].length === 0) {
      sockets[normalizedSymbol].close()
      delete sockets[normalizedSymbol]
      delete callbacks[normalizedSymbol]
    }
  } else if (sockets[normalizedSymbol]) {
    // Close WebSocket if no specific callback is given
    sockets[normalizedSymbol].close()
    delete sockets[normalizedSymbol]
    delete callbacks[normalizedSymbol]
  } else {
    console.warn(`No subscription found for ${symbol}`)
  }
}
