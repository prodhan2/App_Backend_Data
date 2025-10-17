
---

### Final JSON Structures

#### ১️⃣ divisions.json

```json
[
  {
    "id": "1",
    "name": "Chattagram",
    "bn_name": "চট্টগ্রাম"
  }
]
```

#### ২️⃣ districts.json

```json
[
  {
    "id": "1",
    "division_id": "1",
    "name": "Comilla",
    "bn_name": "কুমিল্লা",
    "lat": "23.4682747",
    "lon": "91.1788135",
    "url": "www.comilla.gov.bd"
  }
]
```

#### ৩️⃣ upazilas.json

```json
[
  {
    "id": "7",
    "district_id": "1",
    "name": "Homna",
    "bn_name": "হোমনা",
    "url": "homna.comilla.gov.bd"
  }
]
```

#### ৪️⃣ unions.json

```json
[
  {
    "id": "1",
    "upazila_id": "7",
    "name": "Subil",
    "bn_name": "সুবিল",
    "url": "subilup.comilla.gov.bd"
  }
]
```

---

✅ সংক্ষেপে:

* **Division** → `id`, `name`, `bn_name`
* **District** → `id`, `division_id`, `name`, `bn_name`, `lat`, `lon`, `url`
* **Upazila** → `id`, `district_id`, `name`, `bn_name`, `url`
* **Union** → `id`, `upazila_id`, `name`, `bn_name`, `url`

---

ফাইলগুলো হবে:

https://github.com/prodhan2/App_Backend_Data/tree/main/RUCSEHUB/LocationApiOFBD/
│
├─ divisions.json
├─ districts.json
├─ upazilas.json
└─ unions.json


এবং structure হবে যেভাবে তুমি আগে দেখিয়েছো:

divisions.json → id, name, bn_name

districts.json → id, division_id, name, bn_name, lat, lon, url

upazilas.json → id, district_id, name, bn_name, url

unions.json → id, upazila_id, name, bn_name, url
