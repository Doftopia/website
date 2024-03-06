import requests
from bs4 import BeautifulSoup
import asyncio

async def scrapping(url):
    headers = { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, features="html.parser")

    index = 0 
    for div in soup.find_all('div', class_='ak-entitylook'):
        style_attribute = div['style']
        background_url= style_attribute.split("url(")[-1].split(")")[0]
        if index == 0:
            full_body = background_url 
            index += 1
        else:
            face = background_url

    for div in soup.find_all('div', class_='ak-progress-bar-text'):
        succes_progress = div.text

    for span in soup.find_all('span', class_='ak-score-text'):
        succes_points = span.text

    for div in soup.find_all('div', class_='ak-lists-paginable'):
        jobs = div.text
        jobs = " ".join(jobs.split())

    for h1 in soup.find_all('h1', class_='ak-return-link'):
        pseudo = h1.text.strip()

    for span in soup.find_all('span', class_='ak-directories-breed'):
        breed = span.text.strip()
    
    return [pseudo, breed, succes_points, succes_progress, full_body, face, jobs]

if __name__ == "__main__":
    url = "https://www.dofus.com/fr/mmorpg/communaute/annuaires/pages-persos/1205535500293-douad-felyne"
    print(asyncio.run(scrapping(url)))
