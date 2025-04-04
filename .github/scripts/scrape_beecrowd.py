import json
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from pathlib import Path

# Configuration
PROFILE_ID = "1071849"
USER_AGENT = "Mozilla/5.0 (GitHub Action; Beecrowd-Stats-Scraper/1.0)"
DATA_FILE = Path(__file__).parent.parent.parent / "data" / "beecrowd-stats.json"

def ensure_data_file():
    """Ensure data directory and file exist with valid structure"""
    DATA_FILE.parent.mkdir(exist_ok=True)
    if not DATA_FILE.exists():
        with open(DATA_FILE, 'w') as f:
            json.dump({
                "rank": "--",
                "solved": "--",
                "points": "--",
                "last_updated": "",
                "status": "Initialized"
            }, f, indent=2)

def clean_stat(text):
    """Clean and normalize statistic values"""
    if not text:
        return "--"
    return ''.join(c for c in text if c.isdigit() or c in {'.', ','})

def scrape_profile():
    """Scrape Beecrowd profile and return stats"""
    url = f"https://www.beecrowd.com.br/judge/en/profile/{PROFILE_ID}"
    try:
        response = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        stats_container = soup.find('ul', class_='information') or soup.find('div', class_='pb-information')
        
        if stats_container:
            items = stats_container.find_all('li')
            if len(items) >= 3:
                return {
                    "rank": clean_stat(items[0].get_text()),
                    "solved": clean_stat(items[1].get_text()),
                    "points": clean_stat(items[2].get_text())
                }
        return {}
    except Exception as e:
        print(f"Scraping error: {str(e)}")
        return {}

def update_stats():
    """Update statistics file"""
    ensure_data_file()
    
    # Load existing data first
    with open(DATA_FILE, 'r') as f:
        data = json.load(f)
    
    # Merge with new stats
    new_stats = scrape_profile()
    if new_stats:
        data.update(new_stats)
        data['last_updated'] = datetime.now().isoformat()
        data['status'] = "Success"
    else:
        data['status'] = "Failed to scrape new data"
    
    # Save updated data
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    return data

if __name__ == "__main__":
    result = update_stats()
    print(json.dumps(result, indent=2))
