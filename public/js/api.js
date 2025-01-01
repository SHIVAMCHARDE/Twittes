// API interaction module
export async function fetchTrendingTopics() {
    const response = await fetch('/api/scrape');
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch trending topics');
    }
    return response.json();
}