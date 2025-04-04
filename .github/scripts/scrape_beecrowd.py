import os
import json
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from pathlib import Path

# Configure paths
SCRIPT_DIR = Path(__file__).parent
REPO_ROOT = SCRIPT_DIR.parent.parent
DATA_FILE = REPO_ROOT / "data" / "beecrowd-stats.json"
PROFILE_ID = "1071849"
USER_AGENT = "Mozilla/5.0 (GitHub Action; Beecrowd-Stats-Scraper/1.0)"

def ensure_data_file():
    """Ensure data directory and file exist"""
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

def clean_text(text):
    """Clean and normalize scraped text"""
    if not text:
        return "--"
    text = ' '.join(text.split()).strip()
    return text.split(':')[-1].strip() if ':' in text else text

def scrape_beecrowd():
    ensure_data_file()
    
    stats = {
        "rank": "--",
        "solved": "--",
        "points": "--",
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "success"
    }

    try:
        url = f"https://www.beecrowd.com.br/judge/en/profile/1071849"
        response = requests.get(
            url,
            headers={"User-Agent": USER_AGENT},
            timeout=15
        )
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        info_sections = soup.select('ul.information') or soup.select('div.pb-information ul')
        
        if info_sections:
            items = info_sections[0].select('li')
            if len(items) >= 3:
                stats.update({
                    "rank": clean_text(items[0].get_text()),
                    "solved": clean_text(items[1].get_text()),
                    "points": clean_text(items[2].get_text())
                })

    except requests.RequestException as e:
        stats["status"] = f"Request failed: {str(e)}"
        print(stats["status"])
    except Exception as e:
        stats["status"] = f"Error: {str(e)}"
        print(stats["status"])
    finally:
        with open(DATA_FILE, 'w') as f:
            json.dump(stats, f, indent=2)
        return stats

if __name__ == "__main__":
    result = scrape_beecrowd()
    print(f"Scraping completed: {result['status']}")
    print("Current stats:", json.dumps(result, indent=2))
