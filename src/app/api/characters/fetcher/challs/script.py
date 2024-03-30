import argparse
import requests
from bs4 import BeautifulSoup
import asyncio
import json

async def scrapping(url):
    headers = { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, features="html.parser")

    success_categories = {}
    categories = soup.find_all('div', class_='ak-points-label')
    for category in categories:
        category_name = category.a.text.strip()
        percent = category.find_next_sibling('div').span.text.strip()
        success_categories[category_name] = percent
        
    succes_progress = None
    for div in soup.find_all('div', class_='ak-progress-bar-text'):
        succes_progress = div.text.strip()

    succes_points = None
    for span in soup.find_all('span', class_='ak-score-text'):
        succes_points = span.text.strip()
    
    result = {
        "success_points": succes_points,
        "success_progress": succes_progress,
        "success_categories": success_categories
    }

    return result

def main():
    parser = argparse.ArgumentParser(description='Scrap success data from a Dofus webpage')
    parser.add_argument('url', type=str, help='URL of the Dofus webpage to scrap')
    args = parser.parse_args()

    result = asyncio.run(scrapping(args.url))
    print(json.dumps(result, indent=4))

if __name__ == "__main__":
    main()