# WiFi QR Code Scanner – SSID & Password Extractor

## 🚀 Project Overview
This project is a **web-based QR code scanner** that reads and extracts **WiFi SSID and Password** from a QR code using your device's camera. Built using **HTML, CSS, and JavaScript**, it allows users to easily decode WiFi credentials by simply scanning a WiFi QR code.

Try it here 👉 [WiFi Password Extractor Live Demo](https://vanshbadjate07.github.io/wifi-pass-extractor/)

---

## 🔧 What the Project Does
- Opens your device camera and scans WiFi QR codes.
- Extracts the **SSID (WiFi Name)** and **Password** from the QR code.
- Displays the extracted credentials on the screen.
- Includes option to stop scanning at any time.

---

## ⚙️ How It Works
1. Uses the [`html5-qrcode`](https://github.com/mebjas/html5-qrcode) library to access the device camera and scan QR codes.
2. Detects WiFi format QR codes (`WIFI:T:WPA;S:SSID;P:PASSWORD;;`).
3. Parses and displays the SSID and password on the webpage.
4. Responsive design ensures it works seamlessly on both mobile and desktop browsers.

---

## 🧪 Features
- 📸 Live camera-based QR scanning
- 📶 Automatic extraction of WiFi name and password
- ✅ Clean and responsive user interface
- 🛑 Stop button to close the camera after scan
- 🔐 Regex validation to ensure the QR code follows WiFi format

---

## 🖥️ Technologies Used
- HTML5
- CSS3
- JavaScript
- [html5-qrcode](https://unpkg.com/html5-qrcode)

---

## 💡 Future Improvements
- Add "Copy to Clipboard" buttons for SSID and password.
- Show QR code type (WPA/WEP).
- Save scan history locally (optional).
- Add Progressive Web App (PWA) support to make it installable on mobile devices.

---

## 👨‍💻 Developed By
- **Vansh Badjate**  
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?logo=linkedin&style=flat-square)](https://www.linkedin.com/in/vansh-badjate1008/)  
  [![GitHub](https://img.shields.io/badge/GitHub-black?logo=github&style=flat-square)](https://github.com/vanshbadjate07)

---

## ✅ Conclusion
This project is a lightweight, privacy-focused solution to quickly extract WiFi credentials from QR codes. Perfect for tech demos, productivity tools, or personal use when you don’t want to type long passwords manually!

