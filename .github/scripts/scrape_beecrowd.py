import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

PROFILE_ID = "1071849"
DATA_FILE = "data/beecrowd-stats.json"

def scrape_beecrowd():
    url = f"https://www.beecrowd.com.br/judge/en/profile/{PROFILE_ID}"
    headers = {
        "User-Agent": "Mozilla/5.0 (GitHub Action; +https://github.com/AlMurad409/portfolio)"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # These selectors might need adjustment if Beecrowd changes their HTML
        stats = {
            "rank": soup.select_one("li:nth-child(1) span").get_text(strip=True),
            "solved": soup.select_one("li:nth-child(2) span").get_text(strip=True),
            "points": soup.select_one("li:nth-child(3) span").get_text(strip=True),
            "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        with open(DATA_FILE, 'w') as f:
            json.dump(stats, f, indent=2)
            
        print("Successfully updated Beecrowd stats:", stats)
        
    except Exception as e:
        print(f"Error scraping Beecrowd: {str(e)}")
        # Keep existing data if scrape fails
        with open(DATA_FILE, 'r') as f:
            existing = json.load(f)
        existing["last_updated"] = f"Failed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        with open(DATA_FILE, 'w') as f:
            json.dump(existing, f, indent=2)

if __name__ == "__main__":
    scrape_beecrowd()
