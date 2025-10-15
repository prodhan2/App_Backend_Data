import requests
import json
import time

def fetch_countries():
    url = "http://fi1.api.radio-browser.info/json/countries"
    try:
        response = requests.get(url)
        response.raise_for_status()
        countries_data = response.json()
        # countries_data একটি list of dict, dict এর মধ্যে 'name' field আছে
        countries = [c['name'] for c in countries_data]
        return countries
    except requests.exceptions.RequestException as e:
        print(f"Error fetching countries: {e}")
        return []

def fetch_stations_by_country(country_name):
    url = f"http://fi1.api.radio-browser.info/json/stations/bycountry/{country_name}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        stations = response.json()
        return stations
    except requests.exceptions.RequestException as e:
        print(f"Error fetching stations for {country_name}: {e}")
        return []

def save_json(data, filename):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def main():
    countries = fetch_countries()
    print(f"{len(countries)} countries found.")
    
    for country in countries:
        print(f"Fetching stations for: {country}")
        stations = fetch_stations_by_country(country)
        if stations:
            filename = f"{country.replace(' ', '_')}_stations.json"
            save_json(stations, filename)
            print(f"Saved {len(stations)} stations to {filename}")
        else:
            print(f"No stations found for {country}")
        time.sleep(1)  # একসাথে অনেক request না পাঠাতে 1 সেকেন্ড wait

if __name__ == "__main__":
    main()
