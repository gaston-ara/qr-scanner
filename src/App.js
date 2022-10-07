import React, { useState } from 'react'
import './App.css';
import QrScanner from 'qr-scanner'

let stopScan = false;
let resultadoScan = ''

const App = () => {
  const [btnScan, setBtnScan] = useState(true)

  const getScan = async (isScan) => {
    setBtnScan(isScan)
    stopScan = isScan
    if (btnScan === false) return
    await new Promise((r) => setTimeout(r, 100))
    const videoElement = document.getElementById('scanView');
    const scanner = new QrScanner(
      videoElement,
      result => {
          console.log(result)
          resultadoScan = result.data
          setBtnScan(true)
          stopScan = true
      },{
        onDecodeError: err => {
          console.error(err)
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        returnDetailedScanResult: true
      }
    )
    await scanner.start()
      while (!stopScan) {
          await new Promise((r) => setTimeout(r, 100))
      }
      scanner.stop()
      scanner.destroy()
  }

  return (
    <React.Fragment>
      <div>Qr Code Scanner</div>
      <div className="container">
        {btnScan === false && <video id='scanView' style={{ width: '100%', maxWidth: "400px", height: '100%', maxHeight: '400px', borderStyle: 'dotted ' }}></video>}
        {btnScan && <div>resultado Scan: {resultadoScan}</div>}
        <button style={btnScan ? { color: "white", backgroundColor: "green" } : { color: "white", backgroundColor: "red" }} onClick={() => getScan(!btnScan)}>{btnScan ? "Scan" : "Stop"}</button>
      </div>
    </React.Fragment>
  )
}

export default App
