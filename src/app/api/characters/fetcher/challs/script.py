import argparse
import requests
from bs4 import BeautifulSoup
import asyncio
import json, re

async def scrapping(url):
    headers = { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.83 Safari/537.36 (Chromium GOST)'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, features="html.parser")
    #
    success_categories = {}
    categories = soup.find_all('div', class_='ak-points-label')
    for category in categories:
        category_name = category.a.text.strip()
        percent = category.find_next_sibling('div').span.text.strip()
        success_categories[category_name] = percent
    #
    succes_progress = None
    for div in soup.find_all('div', class_='ak-progress-bar-text'):
        succes_progress = div.text.strip()
    #
    succes_points = None
    for span in soup.find_all('span', class_='ak-score-text'):
        succes_points = span.text.strip()
    #
    entitylook_div = soup.find('div', class_='ak-entitylook')
    image_perso_url = None
    if entitylook_div:
        style_attribute = entitylook_div.get('style')
        match = re.search(r"url\((.*?)\)", style_attribute)
        if match:
            image_perso_url = match.group(1)
    #
    title_div = soup.find('span', class_='ak-directories-grade')
    title = 'pas de titre'
    if title_div:
        title = title_div.text.strip()
    #
    last_success_div = soup.find('div', class_='ak-last-achievement')
    success_name = 'pas de succès'
    if last_success_div:
        last_success_span = last_success_div.find('span', class_='ak-character-name')
        if last_success_span:
            success_name = last_success_div.text.split()[15].strip().replace('.', '')
    
    
    result = {
        "success_points": succes_points,
        "success_progress": succes_progress,
        "success_categories": success_categories,
        "last_succes": success_name,
        "image": image_perso_url,
        "titre": title
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