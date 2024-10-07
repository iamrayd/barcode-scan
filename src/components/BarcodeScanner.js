import React, { useState } from 'react';
import Quagga from 'quagga'; 

const BarcodeScanner = () => {
  const [result, setResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = () => {
    setIsScanning(true);

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#video"),
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "upc_reader",
            "upc_e_reader",
            "codabar_reader",
            "i2of5_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      setResult(`Detected code: ${code}`);

      fetch('/barcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code })
      });

      Quagga.stop();
      setIsScanning(false);
    });

  };


  return (
    <div className="container">
      <h1>Barcode Scanner</h1>
      <button 
        onClick={startScanner} 
        disabled={isScanning}
      >
        {isScanning ? 'Scanning...' : 'Scan Barcode'}
      </button>
      <div id="interactive" className="viewport">
        <video id="video" style={{ display: 'none' }}></video>
      </div>
      <div id="result">{result}</div>
      <div id="productDescription"></div>
    </div>
  );
};

export default BarcodeScanner;
