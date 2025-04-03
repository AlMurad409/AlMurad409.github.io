import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import os
import re

PROFILE_ID = "1071849"
DATA_FILE = os.path.join(os.path.dirname(__file__), "../../data/beecrowd-stats.json")
USER_AGENT = "Mozilla/5.0 (GitHub Action; Beecrowd-Stats-Scraper/1.0; +https://github.com/AlMurad409/portfolio)"

def clean_text(text):
    """Clean and normalize scraped text"""
    if not text:
        return "--"
    text = re.sub(r'\s+', ' ', text).strip()
    return text.split(':')[-1].strip() if ':' in text else text

def scrape_beecrowd():
    url = f"https://www.beecrowd.com.br/judge/en/profile/{PROFILE_ID}"
    stats = {
        "rank": "--",
        "solved": "--",
        "points": "--",
        "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "status": "success"
    }

    try:
        # Load existing data first as fallback
        try:
            with open(DATA_FILE, 'r') as f:
                existing = json.load(f)
                stats.update(existing)
        except (FileNotFoundError, json.JSONDecodeError):
            pass

        # Fetch and parse the page
        response = requests.get(
            url,
            headers={"User-Agent": USER_AGENT},
            timeout=15
        )
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Try multiple selector patterns for robustness
        info_sections = soup.select('ul.information') or soup.select('div.pb-information ul')
        
        if info_sections:
            items = info_sections[0].select('li')
            if len(items) >= 3:
                stats.update({
                    "rank": clean_text(items[0].get_text()),
                    "solved": clean_text(items[1].get_text()),
                    "points": clean_text(items[2].get_text())
                })

        # Save the results
        with open(DATA_FILE, 'w') as f:
            json.dump(stats, f, indent=2)

    except requests.RequestException as e:
        stats["status"] = f"Request failed: {str(e)}"
        print(stats["status"])
    except Exception as e:
        stats["status"] = f"Error: {str(e)}"
        print(stats["status"])
    finally:
        # Always save the latest status
        with open(DATA_FILE, 'w') as f:
            json.dump(stats, f, indent=2)
        return stats

if __name__ == "__main__":
    result = scrape_beecrowd()
    print("Scraping completed with status:", result["status"])
