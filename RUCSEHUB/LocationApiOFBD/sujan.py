import requests
import json
import time

BASE_URL = "https://sohojapi.vercel.app/api"

# 1️⃣ Divisions
divisions = []
try:
    div_resp = requests.get(f"{BASE_URL}/divisions")
    div_resp.raise_for_status()
    divisions = div_resp.json()
except Exception as e:
    print(f"❌ Error fetching divisions: {e}")

with open("divisions.json", "w", encoding="utf-8") as f:
    json.dump(divisions, f, ensure_ascii=False, indent=2)
print("✅ divisions.json saved!")

# 2️⃣ Districts
districts = []
for div in divisions:
    div_id = div.get("id")
    try:
        dist_resp = requests.get(f"{BASE_URL}/districts/{div_id}")
        dist_resp.raise_for_status()
        dist_list = dist_resp.json()
        for d in dist_list:
            d["division_id"] = div_id
        districts.extend(dist_list)
    except Exception as e:
        print(f"❌ Error fetching districts for division {div_id}: {e}")
    time.sleep(0.2)

with open("districts.json", "w", encoding="utf-8") as f:
    json.dump(districts, f, ensure_ascii=False, indent=2)
print("✅ districts.json saved!")

# 3️⃣ Upazilas
upazilas = []
for dist in districts:
    dist_id = dist.get("id")
    try:
        upa_resp = requests.get(f"{BASE_URL}/upzilas/{dist_id}")
        upa_resp.raise_for_status()
        upa_list = upa_resp.json()
        for u in upa_list:
            u["district_id"] = dist_id
        upazilas.extend(upa_list)
    except Exception as e:
        print(f"❌ Error fetching upazilas for district {dist_id}: {e}")
    time.sleep(0.2)

with open("upazilas.json", "w", encoding="utf-8") as f:
    json.dump(upazilas, f, ensure_ascii=False, indent=2)
print("✅ upazilas.json saved!")

# 4️⃣ Unions
unions = []
for upa in upazilas:
    upa_id = upa.get("id")
    try:
        union_resp = requests.get(f"{BASE_URL}/unions/{upa_id}")
        if union_resp.status_code == 200:
            union_list = union_resp.json()
            for un in union_list:
                un["upazila_id"] = upa_id
            unions.extend(union_list)
        else:
            print(f"⚠️ No unions for upazila {upa_id}")
    except Exception as e:
        print(f"❌ Error fetching unions for upazila {upa_id}: {e}")
    time.sleep(0.2)

with open("unions.json", "w", encoding="utf-8") as f:
    json.dump(unions, f, ensure_ascii=False, indent=2)
print("✅ unions.json saved!")
