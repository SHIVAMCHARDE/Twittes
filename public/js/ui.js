// UI update module
export function showLoading() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="loading">
            <p>Fetching trending topics...</p>
            <div class="spinner"></div>
        </div>
    `;
}

export function showError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <div class="error">
            <p>Error: ${message}</p>
            <button onclick="runScraper()">Try Again</button>
        </div>
    `;
}

export function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    const date = new Date(data.timestamp).toLocaleString();
    
    const trendsList = data.trends.map(trend => `<li>${trend}</li>`).join('');
    
    resultsDiv.innerHTML = `
        <div class="results-container">
            <h2>Trending Topics as of ${date}</h2>
            <ul class="trends-list">
                ${trendsList}
            </ul>
            <p class="ip-info">Query IP: ${data.ipAddress}</p>
            <div class="json-container">
                <h3>Database Record:</h3>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
            <button onclick="runScraper()" class="refresh-btn">Refresh Trends</button>
        </div>
    `;
}