# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.responses import FileResponse
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
import sqlite3
from pathlib import Path
from typing import List

app = FastAPI()

BASE_DIR = Path(__file__).resolve().parent
PROJECT_DIR = BASE_DIR.parent
FRONTEND_DIR = PROJECT_DIR / "frontend"
DB_FILE = PROJECT_DIR / "database" / "carbon_simulator.db"

# Pydantic models for request bodies
class AnswerItem(BaseModel):
    question_id: int
    option_id: int

class CalculateRequest(BaseModel):
    answers: List[AnswerItem]

# Helper function to run DB queries
def query_db(query, args=(), one=False):
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    cur.close()
    conn.close()
    return (rv[0] if rv else None) if one else rv

@app.get("/api/questions")
def get_questions():
    try:
        # Query all questions
        q_rows = query_db("SELECT * FROM questions ORDER BY id")
        # Query all options
        opt_rows = query_db("SELECT * FROM options ORDER BY id")
        
        # Group options by question_id
        options_by_q = {}
        for opt in opt_rows:
            q_id = opt["question_id"]
            if q_id not in options_by_q:
                options_by_q[q_id] = []
            options_by_q[q_id].append({
                "id": opt["id"],
                "label": opt["label"],
                "icon": opt["icon"],
                "kg": float(opt["kg"]),
                "badge": opt["badge"],
                "note": opt["note"],
                "src": opt["src"],
                "altLabel": opt["alt_label"]  # Convert database style to frontend CamelCase
            })
            
        # Format list of questions
        result = []
        for q in q_rows:
            q_id = q["id"]
            result.append({
                "id": q_id,
                "category": q["category"],
                "icon": q["icon"],
                "sourceKey": q["source_key"],
                "title": q["title"],
                "desc": q["description"],
                "options": options_by_q.get(q_id, [])
            })
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/calculate")
def calculate(req: CalculateRequest):
    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        total_co2 = 0.0
        chosen_details = []
        
        for ans in req.answers:
            # Query option detail to make sure IDs are valid and get the carbon value
            cursor.execute(
                "SELECT o.label, o.kg FROM options o JOIN questions q ON o.question_id = q.id WHERE q.id = ? AND o.id = ?",
                (ans.question_id, ans.option_id)
            )
            res = cursor.fetchone()
            if not res:
                cursor.close()
                conn.close()
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid combination: question_id={ans.question_id}, option_id={ans.option_id}"
                )
            
            label, kg = res
            total_co2 += float(kg)
            chosen_details.append({
                "question_id": ans.question_id,
                "chosen_option_label": label,
                "chosen_option_kg": float(kg)
            })
            
        # Determine verdict and description
        if total_co2 < 4:
            verdict = "🍀 低碳楷模"
            description = "你的生活方式已接近《巴黎協定》1.5°C 目標。你的每個選擇都在為更好的未來投票。"
        elif total_co2 < 9:
            verdict = "🌿 低於平均"
            description = "不錯。你的碳足跡低於台灣平均值，有幾個關鍵選項若調整，可以進一步降低排放。"
        elif total_co2 < 14:
            verdict = "🌍 接近台灣平均"
            description = "你的碳足跡與台灣人均相近。飲食與交通是最大的改善空間。"
        elif total_co2 < 20:
            verdict = "🌋 超出警戒線"
            description = "你的生活方式對地球造成明顯壓力。最高排放的選項需要優先改變。"
        else:
            verdict = "🔥 極高碳排放"
            description = "警報。你的碳足跡是台灣平均值的數倍。立即從最高碳選項開始改變。"
            
        # Save run simulation summary in database
        cursor.execute(
            "INSERT INTO simulations (total_co2, verdict, description) VALUES (?, ?, ?)",
            (total_co2, verdict, description)
        )
        simulation_id = cursor.lastrowid
        
        # Save individual simulation choices
        for detail in chosen_details:
            cursor.execute(
                "INSERT INTO simulation_answers (simulation_id, question_id, chosen_option_label, chosen_option_kg) VALUES (?, ?, ?, ?)",
                (simulation_id, detail["question_id"], detail["chosen_option_label"], detail["chosen_option_kg"])
            )
            
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            "simulation_id": simulation_id,
            "total_co2": round(total_co2, 2),
            "verdict": verdict,
            "description": description
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Route to serve the frontend client pages
@app.get("/")
def read_root():
    return FileResponse(FRONTEND_DIR / "index.html")

@app.get("/style.css")
def read_style():
    return FileResponse(FRONTEND_DIR / "style.css")

@app.get("/script.js")
def read_script():
    return FileResponse(FRONTEND_DIR / "script.js")

@app.get("/vue.global.js")
def read_vue():
    return FileResponse(FRONTEND_DIR / "vue.global.js")

