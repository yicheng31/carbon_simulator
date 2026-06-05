# carbon_simulator

## Project structure

- `frontend/`: static HTML, CSS, JavaScript, and local Vue asset
- `backend/`: FastAPI application and Python requirements
- `database/`: SQLite database, schema, and seed script

## Run locally

```powershell
py -m uvicorn backend.app:app --reload
```

Then open `http://127.0.0.1:8000`.

## Reset database

```powershell
py database/seed_db.py
```
