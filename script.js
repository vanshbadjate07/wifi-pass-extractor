document.addEventListener("DOMContentLoaded", function () {
  const scanBtn = document.getElementById("scanBtn");
  const stopBtn = document.getElementById("stopBtn");
  const resultDiv = document.getElementById("result");
  const ssidSpan = document.getElementById("ssid");
  const passwordSpan = document.getElementById("password");

  let html5QrCode = null;

  scanBtn.addEventListener("click", startScan);
  stopBtn.addEventListener("click", stopScan);

  function startScan() {
    // Initialize the scanner
    html5QrCode = new Html5Qrcode("reader");

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      if (decodedText.startsWith("WIFI:")) {
        stopScan();
        processWifiQR(decodedText);
      }
    };

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    html5QrCode
      .start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        () => { } // Verbose callback
      )
      .catch((err) => {
        console.error("Error starting scanner:", err);
        alert(
          "Error accessing camera. Please ensure you've granted camera permissions."
        );
      });

    scanBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
  }

  function stopScan() {
    if (html5QrCode) {
      html5QrCode
        .stop()
        .then(() => {
          html5QrCode.clear();
          html5QrCode = null;
          scanBtn.classList.remove("hidden");
          stopBtn.classList.add("hidden");
        })
        .catch((err) => {
          console.error("Error stopping scanner:", err);
        });
    }
  }

  function processWifiQR(qrData) {
    // Parse the WiFi QR code format: WIFI:T:WPA;S:YourNetwork;P:YourPassword;;
    const regex = /^WIFI:T:(.*?);S:(.*?);P:(.*?);/;
    const matches = qrData.match(regex);

    if (matches && matches.length >= 4) {
      const ssid = matches[2];
      const password = matches[3];

      ssidSpan.textContent = ssid;
      passwordSpan.textContent = password;
      resultDiv.classList.remove("hidden");
    } else {
      alert("This doesn't appear to be a valid WiFi QR code.");
    }
  }
});
