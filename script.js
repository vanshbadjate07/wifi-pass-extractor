document.addEventListener("DOMContentLoaded", function () {
  const scanBtn = document.getElementById("scanBtn");
  const stopBtn = document.getElementById("stopBtn");
  const saveBtn = document.getElementById("saveBtn");
  const resultDiv = document.getElementById("result");
  const ssidSpan = document.getElementById("ssid");
  const passwordSpan = document.getElementById("password");
  const scannedNetworksDiv = document.getElementById("scannedNetworks");
  const noNetworksMsg = document.getElementById("noNetworks");

  let currentScanResult = null;
  let html5QrCode = null;

  // Load saved networks
  displaySavedNetworks();

  scanBtn.addEventListener("click", startScan);
  stopBtn.addEventListener("click", stopScan);
  saveBtn.addEventListener("click", saveNetwork);

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
        () => {} // Verbose callback
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
      const encryptionType = matches[1];
      const ssid = matches[2];
      const password = matches[3];

      currentScanResult = { ssid, password, encryptionType };

      ssidSpan.textContent = ssid;
      passwordSpan.textContent = password;
      resultDiv.classList.remove("hidden");
    } else {
      alert("This doesn't appear to be a valid WiFi QR code.");
    }
  }

  function saveNetwork() {
    if (!currentScanResult) return;

    // Get existing networks from localStorage
    let savedNetworks = JSON.parse(localStorage.getItem("wifiNetworks") || []);

    // Check if this network is already saved
    const exists = savedNetworks.some(
      (network) => network.ssid === currentScanResult.ssid
    );

    if (!exists) {
      savedNetworks.push(currentScanResult);
      localStorage.setItem("wifiNetworks", JSON.stringify(savedNetworks));
      displaySavedNetworks();
      alert(`"${currentScanResult.ssid}" saved to your networks!`);
    } else {
      alert(`"${currentScanResult.ssid}" is already in your saved networks.`);
    }
  }

  function displaySavedNetworks() {
    const savedNetworks = JSON.parse(
      localStorage.getItem("wifiNetworks") || "[]"
    );

    if (savedNetworks.length === 0) {
      noNetworksMsg.style.display = "block";
      return;
    }

    noNetworksMsg.style.display = "none";

    // Clear existing networks display
    while (scannedNetworksDiv.firstChild) {
      if (scannedNetworksDiv.firstChild.id !== "noNetworks") {
        scannedNetworksDiv.removeChild(scannedNetworksDiv.firstChild);
      } else {
        break;
      }
    }

    // Add each network to the display
    savedNetworks.forEach((network, index) => {
      const networkDiv = document.createElement("div");
      networkDiv.className = "network-item";

      const credentialsDiv = document.createElement("div");
      credentialsDiv.className = "credentials";
      credentialsDiv.innerHTML = `
                        <span class="ssid">${network.ssid}</span>
                        <br>
                        <span class="password">${network.password}</span>
                    `;

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => deleteNetwork(index);

      networkDiv.appendChild(credentialsDiv);
      networkDiv.appendChild(deleteBtn);
      scannedNetworksDiv.appendChild(networkDiv);
    });
  }

  function deleteNetwork(index) {
    let savedNetworks = JSON.parse(localStorage.getItem("wifiNetworks") || []);

    if (index >= 0 && index < savedNetworks.length) {
      const deletedNetwork = savedNetworks.splice(index, 1)[0];
      localStorage.setItem("wifiNetworks", JSON.stringify(savedNetworks));
      displaySavedNetworks();
      alert(
        `"${deletedNetwork.ssid}" has been removed from your saved networks.`
      );
    }
  }
});
