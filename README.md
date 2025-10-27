# URL Threat Scanner

A modern, client-side web application for analyzing URLs and generating detailed threat reports. This tool provides a comprehensive security assessment including malware detection, phishing analysis, domain reputation checks, and SSL/TLS verification.

## Features

- **URL Validation**: Real-time URL validation with user-friendly error messages
- **Threat Score**: Visual threat score display with color-coded severity levels
- **Multi-Category Analysis**:
  - 🦠 Malware Detection
  - 🎣 Phishing Analysis
  - ⭐ Domain Reputation
  - 🔐 SSL/TLS Security
- **Technical Details**: Display of domain age, IP address, country, and scan timestamp
- **Report Export**: Download threat reports as JSON files
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Smooth Animations**: Modern UI with smooth transitions and loading states

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: Pure JavaScript with no dependencies
- **Client-Side Processing**: All scanning is simulated client-side (no backend required)

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or backend required - runs entirely in the browser

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd url-threat-scanner
   ```

2. Open `index.html` in your web browser:
   - Double-click the `index.html` file, or
   - Use a local development server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (if you have http-server installed)
     npx http-server
     ```

3. Navigate to `http://localhost:8000` in your browser

## Usage

1. **Enter a URL**: Type or paste any URL into the input field (e.g., `https://example.com`)
2. **Click Scan**: Press the "Scan URL" button or hit Enter
3. **View Report**: Wait for the scanning animation to complete
4. **Review Results**: Examine the threat score and detailed category breakdowns
5. **Export (Optional)**: Click "Export Report" to download the results as a JSON file
6. **Scan Another**: Click "Scan Another URL" to analyze a different website

## Project Structure

```
url-threat-scanner/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js              # Application logic and threat simulation
└── README.md           # Project documentation
```

## How It Works

This is a **demonstration/educational tool** that simulates threat scanning:

- The threat scores and results are **randomly generated** for demonstration purposes
- No actual network requests are made to analyze URLs
- SSL/TLS detection is based on the URL protocol (https vs http)
- In a production environment, this would connect to real threat intelligence APIs

## Customization

### Modify Threat Score Distribution

Edit the `generateThreatReport()` function in `app.js`:

```javascript
if (baseScore < 0.7) {
    // Adjust probability percentages here
    threatScore = Math.floor(Math.random() * 30) + 70;
}
```

### Change Color Scheme

Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Add More Threat Categories

1. Add HTML elements in `index.html`
2. Create corresponding DOM references in `app.js`
3. Generate results in the `generateThreatReport()` function
4. Update the display logic in `displayReport()`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Integration with real threat intelligence APIs (VirusTotal, URLScan.io, etc.)
- Historical scan data storage using LocalStorage
- Batch URL scanning
- PDF report generation
- Dark mode toggle
- Multi-language support

## Educational Purpose

This project is designed for educational purposes to demonstrate:
- Modern web development practices
- DOM manipulation and event handling
- Asynchronous JavaScript
- Responsive design principles
- User experience considerations

**Note**: This tool does not perform real security scans. For actual URL security analysis, use professional services like VirusTotal, Google Safe Browsing, or similar threat intelligence platforms.

## License

This project is open source and available for educational purposes.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## Author

Created as a demonstration of modern web development techniques.

---

**Disclaimer**: This is a simulated tool for educational purposes only. Do not rely on this tool for actual security decisions.
