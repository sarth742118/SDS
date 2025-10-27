// DOM Elements
const urlInput = document.getElementById('urlInput');
const scanButton = document.getElementById('scanButton');
const errorMessage = document.getElementById('errorMessage');
const reportSection = document.getElementById('reportSection');
const scannedUrl = document.getElementById('scannedUrl');
const scoreCircle = document.getElementById('scoreCircle');
const scoreValue = document.getElementById('scoreValue');
const threatLevel = document.getElementById('threatLevel');
const threatDescription = document.getElementById('threatDescription');
const scanAgainButton = document.getElementById('scanAgainButton');
const exportButton = document.getElementById('exportButton');

// Category elements
const malwareStatus = document.getElementById('malwareStatus');
const malwareDetails = document.getElementById('malwareDetails');
const malwareCard = document.getElementById('malwareCard');

const phishingStatus = document.getElementById('phishingStatus');
const phishingDetails = document.getElementById('phishingDetails');
const phishingCard = document.getElementById('phishingCard');

const reputationStatus = document.getElementById('reputationStatus');
const reputationDetails = document.getElementById('reputationDetails');
const reputationCard = document.getElementById('reputationCard');

const sslStatus = document.getElementById('sslStatus');
const sslDetails = document.getElementById('sslDetails');
const sslCard = document.getElementById('sslCard');

// Technical details elements
const domainAge = document.getElementById('domainAge');
const ipAddress = document.getElementById('ipAddress');
const country = document.getElementById('country');
const lastScanned = document.getElementById('lastScanned');

// Validation function
function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// Generate random threat score and data
function generateThreatReport(url) {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // Generate semi-realistic threat scores (most sites should be safe)
    const baseScore = Math.random();
    let threatScore;
    
    if (baseScore < 0.7) {
        // 70% chance of being safe
        threatScore = Math.floor(Math.random() * 30) + 70; // 70-99
    } else if (baseScore < 0.9) {
        // 20% chance of medium risk
        threatScore = Math.floor(Math.random() * 30) + 40; // 40-69
    } else {
        // 10% chance of high risk
        threatScore = Math.floor(Math.random() * 40); // 0-39
    }
    
    // Generate categories
    const malware = generateCategoryResult('malware', threatScore);
    const phishing = generateCategoryResult('phishing', threatScore);
    const reputation = generateCategoryResult('reputation', threatScore);
    const ssl = urlObj.protocol === 'https:' ? 
        { status: 'Clean', details: 'Valid SSL/TLS certificate detected', severity: 'safe' } :
        { status: 'Warning', details: 'No SSL/TLS encryption detected', severity: 'warning' };
    
    // Generate technical details
    const countries = ['United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'Canada', 'Netherlands', 'Singapore'];
    const ages = ['2 years', '5 years', '10 years', '1 year', '15 years', '3 months', '8 years'];
    
    return {
        url: url,
        domain: domain,
        score: threatScore,
        malware: malware,
        phishing: phishing,
        reputation: reputation,
        ssl: ssl,
        technicalDetails: {
            domainAge: ages[Math.floor(Math.random() * ages.length)],
            ipAddress: generateRandomIP(),
            country: countries[Math.floor(Math.random() * countries.length)],
            lastScanned: new Date().toLocaleString()
        }
    };
}

function generateCategoryResult(category, overallScore) {
    const random = Math.random();
    
    if (overallScore >= 70) {
        return {
            status: 'Clean',
            details: `No ${category} threats detected. This URL appears safe.`,
            severity: 'safe'
        };
    } else if (overallScore >= 40) {
        if (random < 0.5) {
            return {
                status: 'Suspicious',
                details: `Potential ${category} indicators detected. Exercise caution.`,
                severity: 'warning'
            };
        } else {
            return {
                status: 'Clean',
                details: `No ${category} threats detected.`,
                severity: 'safe'
            };
        }
    } else {
        return {
            status: 'Threat Detected',
            details: `High risk ${category} activity detected. Avoid this URL.`,
            severity: 'danger'
        };
    }
}

function generateRandomIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

// Get threat level description
function getThreatLevel(score) {
    if (score >= 80) {
        return {
            level: 'Safe',
            description: 'This URL appears to be safe with no significant threats detected.',
            class: 'safe'
        };
    } else if (score >= 60) {
        return {
            level: 'Low Risk',
            description: 'This URL has minimal risk factors. Generally safe to visit.',
            class: 'low'
        };
    } else if (score >= 40) {
        return {
            level: 'Medium Risk',
            description: 'This URL shows some concerning indicators. Proceed with caution.',
            class: 'medium'
        };
    } else if (score >= 20) {
        return {
            level: 'High Risk',
            description: 'This URL has multiple risk factors. Not recommended to visit.',
            class: 'high'
        };
    } else {
        return {
            level: 'Critical Risk',
            description: 'This URL is highly dangerous. Do not visit this site.',
            class: 'critical'
        };
    }
}

// Simulate scanning with progress
async function simulateScan(url) {
    const report = generateThreatReport(url);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return report;
}

// Display report
function displayReport(report) {
    // Set scanned URL
    scannedUrl.textContent = report.url;
    
    // Animate score
    animateScore(report.score);
    
    // Set threat level
    const level = getThreatLevel(report.score);
    scoreCircle.className = 'score-circle ' + level.class;
    threatLevel.textContent = level.level;
    threatDescription.textContent = level.description;
    
    // Set categories
    updateCategory(malwareCard, malwareStatus, malwareDetails, report.malware);
    updateCategory(phishingCard, phishingStatus, phishingDetails, report.phishing);
    updateCategory(reputationCard, reputationStatus, reputationDetails, report.reputation);
    updateCategory(sslCard, sslStatus, sslDetails, report.ssl);
    
    // Set technical details
    domainAge.textContent = report.technicalDetails.domainAge;
    ipAddress.textContent = report.technicalDetails.ipAddress;
    country.textContent = report.technicalDetails.country;
    lastScanned.textContent = report.technicalDetails.lastScanned;
    
    // Show report
    reportSection.style.display = 'block';
    reportSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function animateScore(finalScore) {
    let currentScore = 0;
    const increment = finalScore / 30;
    const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(interval);
        }
        scoreValue.textContent = Math.floor(currentScore);
    }, 30);
}

function updateCategory(card, statusEl, detailsEl, data) {
    card.className = 'category-card ' + data.severity;
    statusEl.textContent = data.status;
    statusEl.className = 'category-status ' + data.severity;
    detailsEl.textContent = data.details;
}

// Event handlers
scanButton.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    
    // Validate URL
    if (!url) {
        errorMessage.textContent = 'Please enter a URL to scan.';
        return;
    }
    
    if (!isValidURL(url)) {
        errorMessage.textContent = 'Please enter a valid URL (e.g., https://example.com)';
        return;
    }
    
    // Clear error
    errorMessage.textContent = '';
    
    // Hide previous report
    reportSection.style.display = 'none';
    
    // Disable button and show spinner
    scanButton.disabled = true;
    document.querySelector('.btn-text').textContent = 'Scanning...';
    document.querySelector('.spinner').style.display = 'inline-block';
    
    try {
        // Simulate scanning
        const report = await simulateScan(url);
        
        // Display results
        displayReport(report);
    } catch (error) {
        errorMessage.textContent = 'An error occurred during scanning. Please try again.';
    } finally {
        // Re-enable button and hide spinner
        scanButton.disabled = false;
        document.querySelector('.btn-text').textContent = 'Scan URL';
        document.querySelector('.spinner').style.display = 'none';
    }
});

// Allow Enter key to trigger scan
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        scanButton.click();
    }
});

// Scan again button
scanAgainButton.addEventListener('click', () => {
    urlInput.value = '';
    reportSection.style.display = 'none';
    errorMessage.textContent = '';
    urlInput.focus();
});

// Export report button
exportButton.addEventListener('click', () => {
    const reportData = {
        url: scannedUrl.textContent,
        threatScore: scoreValue.textContent,
        threatLevel: threatLevel.textContent,
        categories: {
            malware: malwareStatus.textContent,
            phishing: phishingStatus.textContent,
            reputation: reputationStatus.textContent,
            ssl: sslStatus.textContent
        },
        technicalDetails: {
            domainAge: domainAge.textContent,
            ipAddress: ipAddress.textContent,
            country: country.textContent,
            lastScanned: lastScanned.textContent
        }
    };
    
    // Create and download JSON file
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `threat-report-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});
