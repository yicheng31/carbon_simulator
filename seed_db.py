import sqlite3
import os

DB_FILE = "carbon_simulator.db"

questions = [
    {
        "id": 1,
        "category": "交通",
        "icon": "🚗",
        "source_key": "transport",
        "title": "早晨通勤：你的主要交通工具？",
        "description": "交通排放佔台灣溫室氣體約 13%。同樣通勤 10 公里，不同工具的碳排差距可達 40 倍以上。",
        "options": [
            {"label": "步行 / 腳踏車", "icon": "🚲", "kg": 0.00, "badge": "l", "note": "0.00 kg CO₂e", "src": "零化石燃料消耗", "alt_label": None},
            {"label": "捷運 / 公車", "icon": "🚇", "kg": 0.40, "badge": "l", "note": "0.40 kg CO₂e", "src": "捷運 0.04/人公里 × 10km", "alt_label": None},
            {"label": "機車（燃油）", "icon": "🛵", "kg": 0.68, "badge": "m", "note": "0.68 kg CO₂e", "src": "機車 0.068/km × 10km", "alt_label": "改搭捷運/公車"},
            {"label": "獨自開車", "icon": "🚗", "kg": 1.73, "badge": "h", "note": "1.73 kg CO₂e", "src": "汽車 0.173/人公里 × 10km", "alt_label": "改搭捷運/公車"}
        ]
    },
    {
        "id": 2,
        "category": "早餐",
        "icon": "🍳",
        "source_key": "food",
        "title": "早餐選擇？",
        "description": "食物生產佔全球溫室氣體排放約 26%。一份早餐看似小，但食材來源決定了截然不同的碳代價。",
        "options": [
            {"label": "自製燕麥 / 水果", "icon": "🥣", "kg": 0.10, "badge": "l", "note": "0.10 kg CO₂e", "src": "穀物係數約 0.5/kg × 200g", "alt_label": None},
            {"label": "在地早餐店（蛋餅）", "icon": "🥚", "kg": 0.35, "badge": "l", "note": "0.35 kg CO₂e", "src": "雞蛋係數 3.0/kg × 約 50g", "alt_label": None},
            {"label": "連鎖速食漢堡", "icon": "🍔", "kg": 1.10, "badge": "m", "note": "1.10 kg CO₂e", "src": "速食漢堡實測參考值", "alt_label": "改吃在地早餐"},
            {"label": "外送培根歐姆蛋", "icon": "🥓", "kg": 1.10, "badge": "m", "note": "1.10 kg CO₂e", "src": "豬肉係數 5.9/kg + 外送", "alt_label": "改吃在地早餐"}
        ]
    },
    {
        "id": 3,
        "category": "辦公",
        "icon": "💻",
        "source_key": "energy",
        "title": "工作模式？",
        "description": "用電碳排 = 用電度數 × 0.494 kgCO₂/度（112 年經濟部公告）。辦公室冷氣 8 小時約消耗 5.6 kgCO₂e/台。",
        "options": [
            {"label": "在家遠端工作", "icon": "🏠", "kg": 0.30, "badge": "l", "note": "0.30 kg CO₂e", "src": "電腦+照明 × 0.494", "alt_label": None},
            {"label": "共享辦公空間", "icon": "🏢", "kg": 0.55, "badge": "l", "note": "0.55 kg CO₂e", "src": "人均分攤冷氣 × 0.494", "alt_label": None},
            {"label": "辦公室（冷氣全天）", "icon": "❄️", "kg": 0.90, "badge": "m", "note": "0.90 kg CO₂e", "src": "冷氣 1.4/hr × 8hr × 0.494", "alt_label": "改為居家遠端"},
            {"label": "長途出差（飛機）", "icon": "✈️", "kg": 4.50, "badge": "h", "note": "4.50 kg CO₂e", "src": "航空係數管理表 6.0.4 版", "alt_label": "改用視訊會議"}
        ]
    },
    {
        "id": 4,
        "category": "午餐",
        "icon": "🍱",
        "source_key": "food",
        "title": "午餐怎麼吃？",
        "description": "蔬食便當約 1.0 kgCO₂e；葷食便當平均約 3.25 kgCO₂e——相差 3 倍以上（桃園市低碳活動指引官方數值）。",
        "options": [
            {"label": "素食便當 / 蔬食", "icon": "🥗", "kg": 1.00, "badge": "l", "note": "1.00 kg CO₂e", "src": "蔬食便當官方係數 1.0/個", "alt_label": None},
            {"label": "雞肉或豬肉料理", "icon": "🍗", "kg": 2.00, "badge": "m", "note": "2.00 kg CO₂e", "src": "葷食便當禽豬取低側", "alt_label": "改吃素食便當"},
            {"label": "牛肉麵 / 牛肉漢堡", "icon": "🍜", "kg": 3.25, "badge": "h", "note": "3.25 kg CO₂e", "src": "葷食便當官方均值 3.25/個", "alt_label": "改吃雞肉料理"},
            {"label": "進口牛排（含運輸）", "icon": "🥩", "kg": 5.00, "badge": "h", "note": "5.00 kg CO₂e", "src": "牛肉係數高 + 空運加成", "alt_label": "改吃素食便當"}
        ]
    },
    {
        "id": 5,
        "category": "消費",
        "icon": "🛍️",
        "source_key": "product",
        "title": "今天你購物了嗎？",
        "description": "聚酯纖維碳排係數 4.45 kgCO₂e/kg（CFP_P_02）；一支新手機生產約 70 kg CO₂e。",
        "options": [
            {"label": "沒有購物", "icon": "🙅", "kg": 0.00, "badge": "l", "note": "0.00 kg CO₂e", "src": "零消費排放", "alt_label": None},
            {"label": "購買二手衣物", "icon": "♻️", "kg": 0.10, "badge": "l", "note": "0.10 kg CO₂e", "src": "二手無新生產排放", "alt_label": None},
            {"label": "網購一件衣服（快時尚）", "icon": "👕", "kg": 1.60, "badge": "m", "note": "1.60 kg CO₂e", "src": "聚酯材質 4.45/kg × 250g + 包材", "alt_label": "改買二手或租借"},
            {"label": "購買新手機（均攤當日）", "icon": "📱", "kg": 8.00, "badge": "h", "note": "8.00 kg CO₂e", "src": "智慧型手機生產 ~70kg，均攤 2 年", "alt_label": "延長舊手機使用壽命"}
        ]
    },
    {
        "id": 6,
        "category": "空調",
        "icon": "🌡️",
        "source_key": "energy",
        "title": "夏季空調使用習慣？",
        "description": "每台冷氣設定 22°C 運行 4 小時 = 5.6 kgCO₂e。溫度每調高 1°C 省電 6%，電力係數 0.494 kgCO₂/度。",
        "options": [
            {"label": "不開冷氣，電風扇", "icon": "🍃", "kg": 0.06, "badge": "l", "note": "0.06 kg CO₂e", "src": "電風扇 60W × 4hr × 0.494", "alt_label": None},
            {"label": "26°C，搭配電扇", "icon": "🌀", "kg": 0.42, "badge": "l", "note": "0.42 kg CO₂e", "src": "設定 26°C 省電 24%", "alt_label": None},
            {"label": "22°C，全日運轉", "icon": "💨", "kg": 2.77, "badge": "m", "note": "2.77 kg CO₂e", "src": "22°C 4hr = 5.6 kgCO₂e（2人共用）", "alt_label": "調高至 26°C＋電扇"},
            {"label": "18°C，強力全開", "icon": "🥶", "kg": 4.20, "badge": "h", "note": "4.20 kg CO₂e", "src": "18°C vs 26°C 額外耗電 +48%", "alt_label": "改用電風扇"}
        ]
    },
    {
        "id": 7,
        "category": "飲水",
        "icon": "🧃",
        "source_key": "food",
        "title": "日常飲水與飲料？",
        "description": "一瓶 600ml 寶特瓶裝水碳排 0.15 kgCO₂e（環境部 CFP_P_02 收錄產品實測值）。",
        "options": [
            {"label": "自帶水壺（自來水）", "icon": "𫁲", "kg": 0.01, "badge": "l", "note": "0.01 kg CO₂e", "src": "自來水處理用電極低", "alt_label": None},
            {"label": "台灣茶 / 在地咖啡", "icon": "🍵", "kg": 0.15, "badge": "l", "note": "0.15 kg CO₂e", "src": "在地農產 + 紙杯", "alt_label": None},
            {"label": "瓶裝水 + 手搖飲", "icon": "🧋", "kg": 0.60, "badge": "m", "note": "0.60 kg CO₂e", "src": "瓶裝水 0.15/瓶 × 2 + 飲料杯", "alt_label": "改帶自己的水壺"},
            {"label": "進口氣泡水 + 連鎖咖啡", "icon": "☕", "kg": 1.00, "badge": "h", "note": "1.00 kg CO₂e", "src": "進口包材高碳排 + 空運咖啡豆", "alt_label": "改帶自己的水壺"}
        ]
    },
    {
        "id": 8,
        "category": "娛樂",
        "icon": "📺",
        "source_key": "energy",
        "title": "晚上的娛樂方式？",
        "description": "照明用電係數 0.494 kgCO₂/度；PC 遊戲主機約 300W。串流追劇比想像中低碳許多。",
        "options": [
            {"label": "閱讀、散步、下棋", "icon": "📖", "kg": 0.02, "badge": "l", "note": "0.02 kg CO₂e", "src": "閱讀燈 41W × 1hr × 0.494", "alt_label": None},
            {"label": "串流追劇（2 小時）", "icon": "📺", "kg": 0.10, "badge": "l", "note": "0.10 kg CO₂e", "src": "電視 100W + 路由器 × 2hr", "alt_label": None},
            {"label": "電玩遊戲（PC）", "icon": "🎮", "kg": 0.44, "badge": "m", "note": "0.44 kg CO₂e", "src": "PC 300W × 3hr × 0.494", "alt_label": "改選串流或閱讀"},
            {"label": "戶外大型演唱會", "icon": "🎸", "kg": 1.20, "badge": "h", "note": "1.20 kg CO₂e", "src": "場館電力 + 交通分攤 + 冷氣", "alt_label": "改選戶外小型活動"}
        ]
    },
    {
        "id": 9,
        "category": "晚餐",
        "icon": "🍽️",
        "source_key": "food",
        "title": "晚餐選擇？",
        "description": "官方數據：蔬食便當 1.0 kgCO₂e、葷食均值 3.25 kgCO₂e；一週一日蔬食，一年可減碳 101.4 kg。",
        "options": [
            {"label": "自煮蔬食料理", "icon": "🥦", "kg": 0.80, "badge": "l", "note": "0.80 kg CO₂e", "src": "蔬菜穀物係數低 + 自煮省包材", "alt_label": None},
            {"label": "家常雞魚料理", "icon": "🐟", "kg": 1.50, "badge": "l", "note": "1.50 kg CO₂e", "src": "禽魚碳排中等", "alt_label": None},
            {"label": "外食熱炒豬肉", "icon": "🍛", "kg": 3.25, "badge": "h", "note": "3.25 kg CO₂e", "src": "葷食便當官方均值 3.25/個", "alt_label": "改吃家常雞魚"},
            {"label": "燒烤 / 火鍋大餐", "icon": "🔥", "kg": 4.50, "badge": "h", "note": "4.50 kg CO₂e", "src": "葷食多樣 + 食材浪費加乘", "alt_label": "改吃自煮蔬食"}
        ]
    }
]

def seed():
    print(f"Creating/connecting to SQLite database: {DB_FILE}...")
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    
    # Read schema
    print("Running schema.sql...")
    with open("schema.sql", "r", encoding="utf-8") as f:
        schema_sql = f.read()
    
    cursor.executescript(schema_sql)
    conn.commit()
    
    print("Seeding questions and options...")
    for q in questions:
        cursor.execute(
            "INSERT INTO questions (id, category, icon, source_key, title, description) VALUES (?, ?, ?, ?, ?, ?)",
            (q["id"], q["category"], q["icon"], q["source_key"], q["title"], q["description"])
        )
        for opt in q["options"]:
            cursor.execute(
                "INSERT INTO options (question_id, label, icon, kg, badge, note, src, alt_label) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (q["id"], opt["label"], opt["icon"], opt["kg"], opt["badge"], opt["note"], opt["src"], opt["alt_label"])
            )
            
    conn.commit()
    cursor.close()
    conn.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed()
