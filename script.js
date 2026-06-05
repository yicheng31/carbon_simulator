<<<<<<< Updated upstream

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const questions = [
  { id:1, category:"交通", icon:"🚗", sourceKey:"transport",
    title:"早晨通勤：你的主要交通工具？",
    desc:"交通排放佔台灣溫室氣體約 13%。同樣通勤 10 公里，不同工具的碳排差距可達 40 倍以上。",
    options:[
      {label:"步行 / 腳踏車", icon:"🚲", kg:0.00, badge:"l", note:"0.00 kg CO₂e", src:"零化石燃料消耗"},
      {label:"捷運 / 公車",  icon:"🚇", kg:0.40, badge:"l", note:"0.40 kg CO₂e", src:"捷運 0.04/人公里 × 10km"},
      {label:"機車（燃油）",  icon:"🛵", kg:0.68, badge:"m", note:"0.68 kg CO₂e", src:"機車 0.068/km × 10km", altLabel:"改搭捷運/公車"},
      {label:"獨自開車",     icon:"🚗", kg:1.73, badge:"h", note:"1.73 kg CO₂e", src:"汽車 0.173/人公里 × 10km", altLabel:"改搭捷運/公車"},
    ]},
  { id:2, category:"早餐", icon:"🍳", sourceKey:"food",
    title:"早餐選擇？",
    desc:"食物生產佔全球溫室氣體排放約 26%。一份早餐看似小，但食材來源決定了截然不同的碳代價。",
    options:[
      {label:"自製燕麥 / 水果",   icon:"🥣", kg:0.10, badge:"l", note:"0.10 kg CO₂e", src:"穀物係數約 0.5/kg × 200g"},
      {label:"在地早餐店（蛋餅）", icon:"🥚", kg:0.35, badge:"l", note:"0.35 kg CO₂e", src:"雞蛋係數 3.0/kg × 約 50g"},
      {label:"連鎖速食漢堡",       icon:"🍔", kg:1.10, badge:"m", note:"1.10 kg CO₂e", src:"速食漢堡實測參考值", altLabel:"改吃在地早餐"},
      {label:"外送培根歐姆蛋",     icon:"🥓", kg:1.10, badge:"m", note:"1.10 kg CO₂e", src:"豬肉係數 5.9/kg + 外送", altLabel:"改吃在地早餐"},
    ]},
  { id:3, category:"辦公", icon:"💻", sourceKey:"energy",
    title:"工作模式？",
    desc:"用電碳排 = 用電度數 × 0.494 kgCO₂/度（112 年經濟部公告）。辦公室冷氣 8 小時約消耗 5.6 kgCO₂e/台。",
    options:[
      {label:"在家遠端工作",     icon:"🏠", kg:0.30, badge:"l", note:"0.30 kg CO₂e", src:"電腦+照明 × 0.494"},
      {label:"共享辦公空間",     icon:"🏢", kg:0.55, badge:"l", note:"0.55 kg CO₂e", src:"人均分攤冷氣 × 0.494"},
      {label:"辦公室（冷氣全天）",icon:"❄️", kg:0.90, badge:"m", note:"0.90 kg CO₂e", src:"冷氣 1.4/hr × 8hr × 0.494", altLabel:"改為居家遠端"},
      {label:"長途出差（飛機）",  icon:"✈️", kg:4.50, badge:"h", note:"4.50 kg CO₂e", src:"航空係數管理表 6.0.4 版", altLabel:"改用視訊會議"},
    ]},
  { id:4, category:"午餐", icon:"🍱", sourceKey:"food",
    title:"午餐怎麼吃？",
    desc:"蔬食便當約 1.0 kgCO₂e；葷食便當平均約 3.25 kgCO₂e——相差 3 倍以上（桃園市低碳活動指引官方數值）。",
    options:[
      {label:"素食便當 / 蔬食",   icon:"🥗", kg:1.00, badge:"l", note:"1.00 kg CO₂e", src:"蔬食便當官方係數 1.0/個"},
      {label:"雞肉或豬肉料理",    icon:"🍗", kg:2.00, badge:"m", note:"2.00 kg CO₂e", src:"葷食便當禽豬取低側", altLabel:"改吃素食便當"},
      {label:"牛肉麵 / 牛肉漢堡", icon:"🍜", kg:3.25, badge:"h", note:"3.25 kg CO₂e", src:"葷食便當官方均值 3.25/個", altLabel:"改吃雞肉料理"},
      {label:"進口牛排（含運輸）", icon:"🥩", kg:5.00, badge:"h", note:"5.00 kg CO₂e", src:"牛肉係數高 + 空運加成", altLabel:"改吃素食便當"},
    ]},
  { id:5, category:"消費", icon:"🛍️", sourceKey:"product",
    title:"今天你購物了嗎？",
    desc:"聚酯纖維碳排係數 4.45 kgCO₂e/kg（CFP_P_02）；一支新手機生產約 70 kg CO₂e。",
    options:[
      {label:"沒有購物",            icon:"🙅", kg:0.00, badge:"l", note:"0.00 kg CO₂e", src:"零消費排放"},
      {label:"購買二手衣物",         icon:"♻️", kg:0.10, badge:"l", note:"0.10 kg CO₂e", src:"二手無新生產排放"},
      {label:"網購一件衣服（快時尚）",icon:"👕", kg:1.60, badge:"m", note:"1.60 kg CO₂e", src:"聚酯材質 4.45/kg × 250g + 包材", altLabel:"改買二手或租借"},
      {label:"購買新手機（均攤當日）",icon:"📱", kg:8.00, badge:"h", note:"8.00 kg CO₂e", src:"智慧型手機生產 ~70kg，均攤 2 年", altLabel:"延長舊手機使用壽命"},
    ]},
  { id:6, category:"空調", icon:"🌡️", sourceKey:"energy",
    title:"夏季空調使用習慣？",
    desc:"每台冷氣設定 22°C 運行 4 小時 = 5.6 kgCO₂e。溫度每調高 1°C 省電 6%，電力係數 0.494 kgCO₂/度。",
    options:[
      {label:"不開冷氣，電風扇", icon:"🍃", kg:0.06, badge:"l", note:"0.06 kg CO₂e", src:"電風扇 60W × 4hr × 0.494"},
      {label:"26°C，搭配電扇",  icon:"🌀", kg:0.42, badge:"l", note:"0.42 kg CO₂e", src:"設定 26°C 省電 24%"},
      {label:"22°C，全日運轉",  icon:"💨", kg:2.77, badge:"m", note:"2.77 kg CO₂e", src:"22°C 4hr = 5.6 kgCO₂e（2人共用）", altLabel:"調高至 26°C＋電扇"},
      {label:"18°C，強力全開",  icon:"🥶", kg:4.20, badge:"h", note:"4.20 kg CO₂e", src:"18°C vs 26°C 額外耗電 +48%", altLabel:"改用電風扇"},
    ]},
  { id:7, category:"飲水", icon:"🧃", sourceKey:"food",
    title:"日常飲水與飲料？",
    desc:"一瓶 600ml 寶特瓶裝水碳排 0.15 kgCO₂e（環境部 CFP_P_02 收錄產品實測值）。",
    options:[
      {label:"自帶水壺（自來水）",    icon:"🫙", kg:0.01, badge:"l", note:"0.01 kg CO₂e", src:"自來水處理用電極低"},
      {label:"台灣茶 / 在地咖啡",    icon:"🍵", kg:0.15, badge:"l", note:"0.15 kg CO₂e", src:"在地農產 + 紙杯"},
      {label:"瓶裝水 + 手搖飲",     icon:"🧋", kg:0.60, badge:"m", note:"0.60 kg CO₂e", src:"瓶裝水 0.15/瓶 × 2 + 飲料杯", altLabel:"改帶自己的水壺"},
      {label:"進口氣泡水 + 連鎖咖啡",icon:"☕", kg:1.00, badge:"h", note:"1.00 kg CO₂e", src:"進口包材高碳排 + 空運咖啡豆", altLabel:"改帶自己的水壺"},
    ]},
  { id:8, category:"娛樂", icon:"📺", sourceKey:"energy",
    title:"晚上的娛樂方式？",
    desc:"照明用電係數 0.494 kgCO₂/度；PC 遊戲主機約 300W。串流追劇比想像中低碳許多。",
    options:[
      {label:"閱讀、散步、下棋",  icon:"📖", kg:0.02, badge:"l", note:"0.02 kg CO₂e", src:"閱讀燈 41W × 1hr × 0.494"},
      {label:"串流追劇（2 小時）",icon:"📺", kg:0.10, badge:"l", note:"0.10 kg CO₂e", src:"電視 100W + 路由器 × 2hr"},
      {label:"電玩遊戲（PC）",    icon:"🎮", kg:0.44, badge:"m", note:"0.44 kg CO₂e", src:"PC 300W × 3hr × 0.494", altLabel:"改選串流或閱讀"},
      {label:"戶外大型演唱會",    icon:"🎸", kg:1.20, badge:"h", note:"1.20 kg CO₂e", src:"場館電力 + 交通分攤 + 冷氣", altLabel:"改選戶外小型活動"},
    ]},
  { id:9, category:"晚餐", icon:"🍽️", sourceKey:"food",
    title:"晚餐選擇？",
    desc:"官方數據：蔬食便當 1.0 kgCO₂e、葷食均值 3.25 kgCO₂e；一週一日蔬食，一年可減碳 101.4 kg。",
    options:[
      {label:"自煮蔬食料理", icon:"🥦", kg:0.80, badge:"l", note:"0.80 kg CO₂e", src:"蔬菜穀物係數低 + 自煮省包材"},
      {label:"家常雞魚料理", icon:"🐟", kg:1.50, badge:"l", note:"1.50 kg CO₂e", src:"禽魚碳排中等"},
      {label:"外食熱炒豬肉", icon:"🍛", kg:3.25, badge:"h", note:"3.25 kg CO₂e", src:"葷食便當官方均值 3.25/個", altLabel:"改吃家常雞魚"},
      {label:"燒烤 / 火鍋大餐",icon:"🔥",kg:4.50, badge:"h", note:"4.50 kg CO₂e", src:"葷食多樣 + 食材浪費加乘", altLabel:"改吃自煮蔬食"},
    ]},
];

/* Dynamic story pairs per category */
=======
const { createApp, ref, computed, watch } = Vue;

// Constants for stories
>>>>>>> Stashed changes
const STORIES = {
  "交通": {
    change: {
      headline: "大眾運輸使用率創歷史新高，台北空氣品質連續 90 天優良",
      subhead: "市民：「不開車反而更輕鬆，每個月還省了一萬塊」",
      body: "台北（本報記者 林佳穎）—— 最新調查顯示，選擇大眾運輸通勤的市民比例已達 78%，台北盆地 PM2.5 濃度降至近三十年最低值。多名受訪市民表示，省下的油錢和停車費已足夠每年出國旅遊一次。",
      stats: [{l:"夏季均溫", v:"+1.4°C"},{l:"珊瑚礁覆蓋率", v:"42%（恢復中）"},{l:"月均電費", v:"NT$920"}]
    },
    continue: {
      headline: "台北塞車費每月逾萬元，上班族嘆「只剩下工作和繳費」",
      subhead: "政府：不漲費不足以達成減碳目標，環保團體仍批為德不卒",
      body: "台北（本報記者 陳怡如）—— 政府於本月正式實施都市碳排通行費，獨自開車通勤月費已突破 NT$10,800。多名上班族坦言正考慮搬離台北，每逢上下班時段捷運依舊人滿為患。",
      stats: [{l:"夏季均溫", v:"+3.0°C"},{l:"珊瑚礁覆蓋率", v:"3%（全滅邊緣）"},{l:"月均電費", v:"NT$2,600"}]
    }
  },
  "早餐": {
    change: {
      headline: "在地早餐店復興，年輕世代以「慢食早晨」對抗外送文化",
      subhead: "食物碳足跡標示制度上路，消費者開始用新眼光看菜單",
      body: "台北（本報記者 黃思穎）—— 全台在地早餐店數量三年成長 23%，年輕族群開始重視食物碳足跡，在地食材、低包材的選擇正成為新世代的早晨儀式。碳足跡標示讓每個人的選擇都更有意識。",
      stats: [{l:"夏季均溫", v:"+1.3°C"},{l:"食物廢棄物", v:"-31%"},{l:"月均電費", v:"NT$900"}]
    },
    continue: {
      headline: "外送碳稅上路，每份外送早餐加收 NT$45，App 評分跌至歷史低點",
      subhead: "「買早餐還要繳罰款？」民眾怒火延燒，業者緊急召開緊急記者會",
      body: "台北（本報記者 吳明哲）—— 政府為抑制外送碳排放，宣布自本月起對每筆外送訂單加收 NT$45 碳稅。外送平台股價應聲重挫，多名外送員上街抗議，稱此舉是「搶奪底層勞工的飯碗」。",
      stats: [{l:"夏季均溫", v:"+2.7°C"},{l:"外送碳稅", v:"NT$45/筆"},{l:"月均電費", v:"NT$2,200"}]
    }
  },
  "辦公": {
    change: {
      headline: "遠端辦公永久化，台灣企業碳排量五年減少 31%",
      subhead: "員工滿意度創歷史新高：「通勤時間歸零，還給我了人生」",
      body: "台北（本報記者 張馨云）—— 台灣主要企業宣布混合辦公制度永久化，通勤碳排較 2025 年下降 31%。員工滿意度調查顯示，九成上班族認為生活品質有顯著改善，台北道路壅塞情況也大幅緩解。",
      stats: [{l:"夏季均溫", v:"+1.4°C"},{l:"企業碳排", v:"-31%"},{l:"月均電費", v:"NT$880"}]
    },
    continue: {
      headline: "航空碳稅每公里 NT$2.5，商務人士出差成本暴增三倍",
      subhead: "企業呼籲寬限期，環保團體強力反對：「讓碳排付出代價是基本道理」",
      body: "台北（本報記者 劉承翰）—— 交通部宣布航空碳稅正式上路，一趟台北東京商務來回增加 NT$12,000 碳稅成本。多家跨國企業宣布縮減亞太區出差預算，部分公司已考慮將亞太總部遷往碳稅較低的城市。",
      stats: [{l:"夏季均溫", v:"+3.1°C"},{l:"航空碳稅", v:"NT$2.5/km"},{l:"月均電費", v:"NT$3,200"}]
    }
  },
  "午餐": {
    change: {
      headline: "台灣蔬食革命：植物性午餐市占率首破五成",
      subhead: "農委會：在地蔬食供應鏈成熟，碳排量三年減少 18%",
      body: "台北（本報記者 許雅婷）—— 台灣午餐蔬食市占率今年首度突破 50%。農委會表示在地蔬食供應鏈已穩定成熟，消費者選擇低碳飲食的意識大幅提升，帶動農業轉型，也成為其他亞洲國家的仿效對象。",
      stats: [{l:"夏季均溫", v:"+1.3°C"},{l:"蔬食市占", v:"51%"},{l:"月均電費", v:"NT$920"}]
    },
    continue: {
      headline: "牛肉每公斤突破 NT$2,000，台灣宣布限購令，傳統餐廳業者群起抗議",
      subhead: "畜牧業甲烷被列「氣候炸彈」：科學家說這是無法再逃避的事實",
      body: "台北（本報記者 林建宏）—— 政府將於下月實施牛肉限購令，每戶每週不得超過 500 克。一名牛肉麵店業者老淚縱橫表示：「我父親傳給我的店，就要這樣結束了嗎？」環保署長表示此為「氣候緊急措施，別無選擇」。",
      stats: [{l:"夏季均溫", v:"+2.9°C"},{l:"牛肉均價", v:"NT$2,000/kg"},{l:"月均電費", v:"NT$2,600"}]
    }
  },
  "消費": {
    change: {
      headline: "循環經濟盛行，二手市場規模首度超越全新商品市場",
      subhead: "「修而不換」成為新世代的生活哲學，也成為年輕人的身份認同",
      body: "台北（本報記者 陳雅芳）—— 台灣二手商品市場今年規模突破 NT$3,000 億，首度超越新品市場。年輕世代將租借和修理視為生活方式，二手市集在台北已成為週末最受歡迎的社交場所。",
      stats: [{l:"夏季均溫", v:"+1.2°C"},{l:"電子廢棄物", v:"-44%"},{l:"月均電費", v:"NT$850"}]
    },
    continue: {
      headline: "電子廢棄物堆積如山，台灣垃圾場面積超越台北市，居民怒告政府",
      subhead: "每年 85 萬噸電子廢棄物：「我們把毒留給了自己的孩子」",
<<<<<<< Updated upstream
      body: "台北（本報記者 方俊明）—— 環保署最新數據顯示，台灣每年產生 85 萬噸電子廢棄物，其中僅 23% 妥善回收。新北市里長帶居民集體至環保署門口抗議，要求政府正視電子廢棄物對水源和土壤的污染問題。",
=======
      body: "台北（本報記者 方俊明）—— 環保署最新數據顯示，台灣每年產生 85 萬噸電子廢棄物，其中僅 23% 妥善回收。新北市里長帶居民集體至環保署門口抗議，要求政府正視電子廢棄物對水源 and 土壤的污染問題。",
>>>>>>> Stashed changes
      stats: [{l:"夏季均溫", v:"+2.7°C"},{l:"電子廢棄物", v:"85萬噸/年"},{l:"月均電費", v:"NT$2,200"}]
    }
  },
  "空調": {
    change: {
      headline: "智慧電網普及，台灣家庭電費五年降低 28%，尖峰用電創新低",
      subhead: "政府節能補貼奏效：「一個好的政策，可以改變一整個社會的習慣」",
      body: "台北（本報記者 謝宛真）—— 經濟部宣布台灣夏季尖峰用電需求較 2025 年下降 18%，智慧溫控系統補貼政策帶動全民節能風潮。一名台南家庭主婦表示：「現在不開到 22 度，其實也活得很好。」",
      stats: [{l:"夏季均溫", v:"+1.3°C"},{l:"電費降幅", v:"-28%"},{l:"月均電費", v:"NT$820"}]
    },
    continue: {
      headline: "夏季每週輪流停電 4 小時，製造業損失慘重，電費調漲 180%",
      subhead: "50 萬戶申請電費補貼：「繳不起電費了，這是在過什麼日子？」",
      body: "台北（本報記者 江志偉）—— 台電宣布今夏全台分區輪流停電，尖峰缺電達 350 萬瓩。電費調漲 180% 引爆民怨，台北市長緊急宣布開放政府機關供市民避暑，有民眾帶著行李箱住進區公所大廳。",
      stats: [{l:"夏季均溫", v:"+3.0°C"},{l:"電費漲幅", v:"+180%"},{l:"月均電費", v:"NT$3,100"}]
    }
  },
  "飲水": {
    change: {
      headline: "自備容器文化扎根，台灣一次性塑膠垃圾量減少 44%",
      subhead: "國際媒體：台灣是「自備容器革命」的全球先行者",
      body: "台北（本報記者 蔡欣穎）—— 推行自備容器獎勵制度五年後，台灣一次性塑膠廢棄物較 2025 年減少 44%，國際環保組織給予最高評價。一名咖啡廳老闆說：「自備杯的客人現在超過八成，我們幾乎不用再買拋棄式杯子了。」",
      stats: [{l:"夏季均溫", v:"+1.2°C"},{l:"塑膠廢棄物", v:"-44%"},{l:"月均電費", v:"NT$900"}]
    },
    continue: {
      headline: "塑膠微粒已進入台灣飲用水，衛福部發佈健康警示",
      subhead: "研究：每週吃進一張信用卡份量的塑膠 —— 這已是現在式",
      body: "台北（本報記者 趙偉倫）—— 衛福部最新調查顯示，台灣 78% 自來水樣本中檢測到微塑膠。醫學研究指出長期暴露微塑膠與心血管疾病、免疫異常有關，政府建議全台家庭安裝過濾器，但補貼預算仍未到位。",
      stats: [{l:"夏季均溫", v:"+2.5°C"},{l:"飲水微塑膠", v:"78%水樣陽性"},{l:"月均電費", v:"NT$2,000"}]
    }
  },
  "娛樂": {
    change: {
      headline: "戶外低碳娛樂風潮，台北城市森林計畫讓市區降溫 1.8°C",
      subhead: "公共空間活化讓人與人更靠近：「以前都宅在家，現在才發現社區有多美」",
      body: "台北（本報記者 羅欣怡）—— 台北市推動城市森林計畫成效顯著，市區均溫較 2025 年下降 1.8°C。低碳休閒活動大幅推廣後，市民心理健康指數同步上升，急診室因熱衰竭就診人數大幅減少。",
      stats: [{l:"夏季均溫", v:"+1.3°C"},{l:"市區降溫", v:"-1.8°C"},{l:"月均電費", v:"NT$880"}]
    },
    continue: {
      headline: "電玩直播業被列「高耗能產業」，數據中心用電已占全台 12%",
      subhead: "政府祭重稅，電競公司喊著要出走：「台灣要成為數位孤島嗎？」",
      body: "台北（本報記者 蔡明哲）—— 數位娛樂產業正式列入高耗能管制清單，電競中心每年須繳交高額碳費。多家電競公司考慮遷往海外，業界人士指出：「政府一邊說要發展數位經濟，一邊用碳稅把我們趕走。」",
      stats: [{l:"夏季均溫", v:"+2.7°C"},{l:"數據中心用電", v:"占全台12%"},{l:"月均電費", v:"NT$2,500"}]
    }
  },
  "晚餐": {
    change: {
      headline: "台灣「週一蔬食」運動：全國每年減少碳排 120 萬噸",
      subhead: "學校蔬食日帶動的飲食革命，正在靜悄悄地改變一個世代",
      body: "台北（本報記者 吳美玲）—— 農委會統計，全台「每週一蔬食」參與人數已達 600 萬，每年減少碳排放 120 萬噸。一名參與十年的台南家庭主婦說：「我孩子問我為什麼要蔬食，我說因為我想讓他長大後還有珊瑚礁可以看。」",
      stats: [{l:"夏季均溫", v:"+1.4°C"},{l:"年減碳排", v:"120萬噸"},{l:"月均電費", v:"NT$900"}]
    },
    continue: {
      headline: "外食碳排稅上路，一頓燒烤大餐加收 NT$280，餐飲業哭聲連天",
      subhead: "老闆：「客人少了三成，我父親那一代開創的店，要在我手上結束嗎？」",
      body: "台北（本報記者 林泰宇）—— 環保署推出餐飲碳排稅制度，火鍋或燒烤大餐最高需額外支付 NT$280。一名中壢老字號燒肉店第二代業主接受採訪時泣不成聲，現場記者無人開口打斷。",
      stats: [{l:"夏季均溫", v:"+2.9°C"},{l:"餐飲碳排稅", v:"最高NT$280/餐"},{l:"月均電費", v:"NT$2,800"}]
    }
  }
};

<<<<<<< Updated upstream
/* ══════════════════════════════════════
   PAGINATION
══════════════════════════════════════ */
const PAGE_LABELS = ['你的分數', '你的未來', '全球視角', '行動計畫'];
let currentPage = 1;
const TOTAL_PAGES = 4;

function initPages() {
  const nav = document.getElementById('pnav');
  const dots = document.getElementById('pnav-dots');
  nav.classList.add('show');
  dots.innerHTML = PAGE_LABELS.map((l,i) => `
    <div class="pdot ${i===0?'active':''}" onclick="goPage(${i+1})" title="${l}"></div>
  `).join('');
  goPage(1);
}

function goPage(n) {
  currentPage = n;
  // Hide all pages
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    const p = document.getElementById(`rpage-${i}`);
    if (p) { p.classList.remove('active'); }
  }
  // Show target
  const target = document.getElementById(`rpage-${n}`);
  if (target) {
    target.classList.add('active');
    // Re-trigger animation
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = '';
  }
  // Update dots
  document.querySelectorAll('.pdot').forEach((d,i) => {
    d.classList.toggle('active', i === n-1);
  });
  // Update label
  document.getElementById('pnav-label').textContent = `${n} / ${TOTAL_PAGES} · ${PAGE_LABELS[n-1]}`;

  // Trigger bench bars on page 3
  if (n === 3) {
    setTimeout(() => {
      document.querySelectorAll('.bench-bar-fill').forEach(el => {
        el.style.width = el.dataset.pct + '%';
        el.style.transition = 'width 1.3s cubic-bezier(0.16,1,0.3,1)';
      });
    }, 100);
  }
  // Trigger rec cards on page 4
  if (n === 4) {
    setTimeout(() => {
      document.querySelectorAll('.rec-card').forEach((el,i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    }, 100);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}


const TOTAL_Q = questions.length;
let answers = {};

=======
>>>>>>> Stashed changes
function getTheme(kg) {
  if (kg < 3)  return { bg:'#0c0a09', accent:'#f0c878', accentGlow:'rgba(240,200,120,0.15)' };
  if (kg < 6)  return { bg:'#080f0c', accent:'#6ee7b7', accentGlow:'rgba(110,231,183,0.15)' };
  if (kg < 10) return { bg:'#0f0d07', accent:'#facc15', accentGlow:'rgba(250,204,21,0.12)' };
  if (kg < 14) return { bg:'#110a06', accent:'#fb923c', accentGlow:'rgba(251,146,60,0.12)' };
  return        { bg:'#140608', accent:'#f87171', accentGlow:'rgba(248,113,113,0.12)' };
}

<<<<<<< Updated upstream
function applyTheme(kg) {
  const t = getTheme(kg);
  const r = document.documentElement;
  r.style.setProperty('--bg', t.bg);
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--accent-glow', t.accentGlow);
}

function countUp(el, target, ms = 900) {
  const start = performance.now();
  const from = parseFloat(el.textContent) || 0;
  function frame(now) {
    const p = Math.min((now - start) / ms, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (from + (target - from) * e).toFixed(2);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ══════════════════════════════════════
   QUIZ
══════════════════════════════════════ */
function buildQuiz() {
  const sec = document.getElementById('quiz-section');
  sec.innerHTML = `
    <div class="quiz-top">
      <span class="quiz-top-title">Carbon Life · 24H 碳足跡模擬</span>
      <span class="quiz-top-counter" id="qtop-counter">0 / ${TOTAL_Q} 完成</span>
    </div>`;
  questions.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'qcard';
    card.id = `qc${q.id}`;
    card.innerHTML = `
      <div class="qmeta">
        <span class="qnum">Q${String(q.id).padStart(2,'0')}</span>
        <span class="qdot">·</span>
        <span class="qcat">${q.icon} ${q.category}</span>
        <span class="qsrc" title="數據來源：官方係數資料庫">⚗ 官方係數</span>
      </div>
      <div class="qtitle">${q.title}</div>
      <div class="qdesc">${q.desc}</div>
      <div class="opts">
        ${q.options.map(o => `
          <button class="opt" onclick="pick(${q.id},${o.kg},'${o.icon}','${q.category}','${(o.label||'').replace(/'/g,"\\'")}',this)">
            <span class="opt-badge ${o.badge==='l'?'bl':o.badge==='m'?'bm':'bh'}">${o.badge==='l'?'低碳':o.badge==='m'?'中碳':'高碳'}</span>
            <span class="opt-ico">${o.icon}</span>
            <span class="opt-lbl">${o.label}</span>
            <span class="opt-kg">${o.note}</span>
            <span class="opt-src-s">📋 ${o.src.split('｜')[0]}</span>
          </button>`).join('')}
      </div>`;
    sec.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 55 * i);
  });
}

function pick(qId, kg, icon, category, label, btn) {
  answers[qId] = { kg, icon, category, label };
  const card = document.getElementById(`qc${qId}`);
  card.querySelectorAll('.opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  card.classList.add('answered');
  const total = Object.values(answers).reduce((s,a) => s+a.kg, 0);
  const done = Object.keys(answers).length;
  applyTheme(total);

  // Update header
  const hco2 = document.getElementById('h-co2');
  countUp(hco2, total, 300);
  document.getElementById('h-prog').textContent = `${done}/${TOTAL_Q}`;
  const hbar = document.getElementById('hbar');
  hbar.style.width = `${(done/TOTAL_Q)*100}%`;
  hbar.style.background = getTheme(total).accent;
  document.getElementById('qtop-counter').textContent = `${done} / ${TOTAL_Q} 完成`;

  // Mobile bar
  document.getElementById('mb-kg').textContent = total.toFixed(2) + ' kg CO₂e';
  document.getElementById('mb-kg').style.color = getTheme(total).accent;
  document.getElementById('mb-prog').textContent = `${done} / ${TOTAL_Q} 題`;
  const mbf = document.getElementById('mb-fill');
  mbf.style.width = `${(done/TOTAL_Q)*100}%`;
  mbf.style.background = getTheme(total).accent;

  if (done === TOTAL_Q) setTimeout(showResult, 700);
}

function startQuiz() {
  document.getElementById('hero').style.display = 'none';
  document.getElementById('quiz-section').style.display = 'block';
  document.getElementById('mbar').style.display = 'block';
  buildQuiz();
  window.scrollTo({top:0});
}

/* ══════════════════════════════════════
   RESULT
══════════════════════════════════════ */
function showResult() {
  document.getElementById('quiz-section').style.display = 'none';
  document.getElementById('mbar').style.display = 'none';
  document.getElementById('result-section').style.display = 'block';
  window.scrollTo({top:0, behavior:'smooth'});

  const total = Object.values(answers).reduce((s,a) => s+a.kg, 0);
  applyTheme(total);

  // Score
  const scoreEl = document.getElementById('r-score');
  countUp(scoreEl, total, 1400);
  scoreEl.style.color = getTheme(total).accent;

  let verdict, desc;
  if (total < 4)       { verdict="🍀 低碳楷模"; desc="你的生活方式已接近《巴黎協定》1.5°C 目標。你的每個選擇都在為更好的未來投票。"; }
  else if (total < 9)  { verdict="🌿 低於平均"; desc="不錯。你的碳足跡低於台灣平均值，有幾個關鍵選項若調整，可以進一步降低排放。"; }
  else if (total < 14) { verdict="🌍 接近台灣平均"; desc="你的碳足跡與台灣人均相近。飲食與交通是最大的改善空間。"; }
  else if (total < 20) { verdict="🌋 超出警戒線"; desc="你的生活方式對地球造成明顯壓力。最高排放的選項需要優先改變。"; }
  else                  { verdict="🔥 極高碳排放"; desc="警報。你的碳足跡是台灣平均值的數倍。立即從最高碳選項開始改變。"; }

  document.getElementById('r-verdict').textContent = verdict;
  document.getElementById('r-desc').textContent = desc;

  // Equiv chips
  const trees = Math.round(total / 0.058);
  const carKm = Math.round(total / 0.173 * 10) / 10;
  const phones = Math.round(total * 122);
  document.getElementById('equiv-chips').innerHTML = `
    <div class="equiv-chip"><span class="equiv-chip-ico">🌳</span><div class="equiv-chip-txt">需要 <strong>${trees} 棵樹</strong><br>吸碳一天</div></div>
    <div class="equiv-chip"><span class="equiv-chip-ico">🚗</span><div class="equiv-chip-txt">等於開車<br><strong>${carKm} 公里</strong></div></div>
    <div class="equiv-chip"><span class="equiv-chip-ico">📱</span><div class="equiv-chip-txt">等於手機<br><strong>充電 ${phones} 次</strong></div></div>`;

  buildNewspaper(total);
  buildBench(total);
  buildTempEditions(total);
  buildRecs(total);
  buildOneAction();

  // Ending colophon
  const now = new Date();
  const dateStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')}`;
  document.getElementById('ending-score').textContent = `你今天的碳足跡：${total.toFixed(2)} kg CO₂e`;
  document.getElementById('ending-date').textContent = `記錄於 ${dateStr}`;

  initPages();
}

/* ── NEWSPAPER ── */
function buildNewspaper(total) {
  // Find the highest-emission category
  const sorted = Object.entries(answers)
    .map(([qId, ans]) => ({...ans, qId: parseInt(qId)}))
    .sort((a,b) => b.kg - a.kg);

  const topCat = sorted[0]?.category || '午餐';
  const story = STORIES[topCat] || STORIES['午餐'];
  const year = 2051;
  const dateStr = `${year}年 8 月 12 日`;

  document.getElementById('newspaper').innerHTML = `
    <div class="np-masthead">
      <span class="np-name">THE CARBON TIMES</span>
      <span class="np-tagline">根據你今天 ${total.toFixed(2)} kg CO₂e 的生活方式推算</span>
      <div class="np-meta-row">
        <span>台灣特別報導版</span>
        <span>${dateStr}</span>
        <span>第 1 版 / 共 1 版</span>
      </div>
    </div>
    <div class="np-columns">
      <div class="np-col left">
        <span class="np-col-header change">✓ 如果你從明天改變</span>
        <div class="np-headline">${story.change.headline}</div>
        <div class="np-subhead">${story.change.subhead}</div>
        <div class="np-byline">本報記者 · 氣候希望特派</div>
        <div class="np-body">${story.change.body}</div>
        <div class="np-stats">
          ${story.change.stats.map(s=>`<div class="np-stat-row"><span class="np-stat-lbl">${s.l}</span><span class="np-stat-val">${s.v}</span></div>`).join('')}
        </div>
      </div>
      <div class="np-divider"></div>
      <div class="np-col right">
        <span class="np-col-header continue">✕ 你繼續今天的生活方式</span>
        <div class="np-headline">${story.continue.headline}</div>
        <div class="np-subhead">${story.continue.subhead}</div>
        <div class="np-byline">本報記者 · 氣候危機特派</div>
        <div class="np-body">${story.continue.body}</div>
        <div class="np-stats">
          ${story.continue.stats.map(s=>`<div class="np-stat-row"><span class="np-stat-lbl">${s.l}</span><span class="np-stat-val">${s.v}</span></div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── BENCHMARK ── */
function buildBench(total) {
  const benchmarks = [
    {label:'你今天',   meaning:'你的 24 小時碳足跡', kg:total, cls:'you', color: getTheme(total).accent},
    {label:'台灣平均', meaning:'台灣人均每日排放，高居全球前段班', kg:14.0, cls:'tw', color:'#facc15'},
    {label:'全球平均', meaning:'全球人均，仍是巴黎目標的 3.8 倍', kg:11.5, cls:'global', color:'#fb923c'},
    {label:'巴黎協定', meaning:'1.5°C 目標每日上限，地球的生存底線', kg:3.0, cls:'paris', color:'#60a5fa'},
  ];
  const maxKg = Math.max(...benchmarks.map(b=>b.kg), 1);
  document.getElementById('bench-list').innerHTML = benchmarks.map(b=>`
    <div class="bench-row">
      <div><span class="bench-lbl">${b.label}</span><span class="bench-meaning">${b.meaning}</span></div>
      <div class="bench-bar-wrap">
        <div class="bench-bar-fill" style="background:${b.color};width:0%" data-pct="${(b.kg/maxKg)*100}"></div>
      </div>
      <div class="bench-val"><strong>${b.kg.toFixed(1)}</strong> kg/日</div>
    </div>`).join('');
}

/* ── TEMP EDITIONS ── */
function buildTempEditions(total) {
  function getMyLevel(kg) {
    if (kg < 5) return 't15';
    if (kg < 12) return 't20';
    return 't30';
  }
  const myLevel = getMyLevel(total);

  const editions = [
    { id:'t15', label:'1.5°C 版', date:'巴黎協定目標 · 2045年', badge:'巴黎協定目標',
      headline:'台灣珊瑚礁復育成功，墾丁重現 1980 年代的壯麗景色',
      effects:['珊瑚礁減少 70–90%', '熱浪頻率增加 5 倍', '海平面上升 40 公分', '北極夏天偶爾無冰'],
      flag:'你正在努力往這個未來前進 ✓' },
    { id:'t20', label:'2.0°C 版', date:'當前全球軌跡 · 2060年', badge:'當前全球軌跡',
      headline:'全球珊瑚礁 99% 消失，UN 宣布進入「海洋喪期」',
      effects:['珊瑚礁幾乎全滅（99%）', '4 億人面臨缺水危機', '海平面上升 60 公分', '北極夏天完全無冰'],
      flag:'你的選擇正在貢獻這個未來 ✓' },
    { id:'t30', label:'3.0°C 版', date:'高排放情境 · 2080年', badge:'高排放情境',
      headline:'台南、高雄市區多處永久淹沒，政府啟動強制遷村計畫',
      effects:['多個沿海城市永久淹沒', '大規模物種滅絕啟動', '10 億人被迫氣候遷移', '部分地區不再適合人居'],
      flag:'你的選擇正在貢獻這個未來 ✓' },
  ];

  document.getElementById('temp-editions').innerHTML = editions.map(e=>`
    <div class="te ${e.id} ${e.id===myLevel?'active-temp':''}">
      <div class="te-masthead">
        <div class="te-name">${e.label}</div>
        <div class="te-date">${e.date}</div>
      </div>
      <div class="te-body">
        <span class="te-temp-badge">${e.badge}</span>
        <div class="te-headline">${e.headline}</div>
        <ul class="te-effects">${e.effects.map(f=>`<li>${f}</li>`).join('')}</ul>
        <div class="te-your-flag">${e.flag}</div>
      </div>
    </div>`).join('');
}

/* ── RECOMMENDATIONS ── */
function buildRecs(total) {
  const sorted = Object.entries(answers)
    .map(([qId, ans]) => {
      const q = questions.find(q=>q.id===parseInt(qId));
      const minOpt = q.options.reduce((a,b)=>a.kg<b.kg?a:b);
      const chosen = q.options.find(o=>o.kg===ans.kg);
      const savings = ans.kg - minOpt.kg;
      return {q, ans, minOpt, chosen, savings};
    })
    .filter(item => item.savings > 0.05 && item.chosen?.altLabel)
    .sort((a,b) => b.savings - a.savings)
    .slice(0,3);

  if (!sorted.length) {
    document.getElementById('rec-list').innerHTML = `<div style="padding:24px;color:var(--muted);font-size:0.82rem;border:1px solid var(--border);border-radius:2px;">你今天的選擇已經很低碳了 🎉 繼續保持！</div>`;
    return;
  }

  document.getElementById('rec-list').innerHTML = sorted.map((item,i) => {
    const d = item.savings;
    const w = d*7; const y = d*365;
    const trees = Math.round(y/21);
    const car = Math.round(y/0.173);
    return `
      <div class="rec-card" style="transition-delay:${i*0.1}s">
        <div class="rec-ghost">${i+1}</div>
        <div class="rec-top">
          <div>
            <div class="rec-cat">最高排放 #${i+1} · ${item.q.category}</div>
            <div class="rec-what">你選了：${item.ans.icon} ${item.ans.label}</div>
          </div>
          <div class="rec-kg">${item.ans.kg.toFixed(2)}<span>kg CO₂e / 日</span></div>
        </div>
        <div class="rec-arrow">
          <span>改成</span>
          <span class="rec-arr-icon">→</span>
          <span style="color:var(--text);font-weight:700">${item.minOpt.icon} ${item.chosen.altLabel || item.minOpt.label}</span>
          <span style="margin-left:auto;font-family:var(--mono);color:#4ade80;font-size:0.7rem">每天 - ${d.toFixed(2)} kg</span>
        </div>
        <div class="rec-chips">
          <div class="rec-chip">${d.toFixed(2)} kg<span>每天</span></div>
          <div class="rec-chip">${w.toFixed(1)} kg<span>每週</span></div>
          <div class="rec-chip">${Math.round(y)} kg<span>每年</span></div>
        </div>
        <div class="rec-impacts">
          <div class="rec-impact">🌳 等於種 <em>${trees} 棵樹</em></div>
          <div class="rec-impact">🚗 等於少開 <em>${car} 公里</em></div>
        </div>
      </div>`;
  }).join('');
}

/* ── ONE ACTION ── */
function buildOneAction() {
  const sorted = Object.entries(answers)
    .map(([qId, ans]) => {
      const q = questions.find(q=>q.id===parseInt(qId));
      const minOpt = q.options.reduce((a,b)=>a.kg<b.kg?a:b);
      const savings = ans.kg - minOpt.kg;
      return {q, ans, minOpt, savings};
    })
    .filter(item => item.savings > 0.05 && item.ans.kg > 0)
    .sort((a,b) => b.savings - a.savings);

  if (!sorted.length) {
    document.getElementById('one-action').innerHTML = `<div class="oa-label">今日建議</div><div class="oa-title">你今天的選擇已經很棒了！明天繼續 💪</div>`;
    return;
  }
  const top = sorted[0];
  const saveYear = top.savings * 365;
  const trees = Math.round(saveYear / 21);

  document.getElementById('one-action').innerHTML = `
    <div class="oa-label">明天就做這一件事</div>
    <div class="oa-title">
      ${top.q.category}：把「${top.ans.icon} ${top.ans.label}」<br>
      換成「${top.minOpt.icon} ${top.minOpt.label}」
    </div>
    <div class="oa-body">
      這是你今天所有選擇中，單一改變能帶來最大碳排削減的選項。<br>
      不需要改變整個生活方式，只需要這一個選擇。
    </div>
    <div class="oa-save">
      <span>每天省 ${top.savings.toFixed(2)} kg</span>
      <span>·</span>
      <span>每年省 ${Math.round(saveYear)} kg</span>
      <span>·</span>
      <span>等於種 ${trees} 棵樹</span>
    </div>`;
}
=======
createApp({
  setup() {
    // Reactive states
    const currentSection = ref('hero');
    const currentPage = ref(1);
    const questions = ref([]);
    const answers = ref({});
    const animatedScore = ref(0.0);
    const verdict = ref('');
    const verdictDesc = ref('');
    const page3Triggered = ref(false);

    const pageLabels = ['你的分數', '你的未來', '全球視角', '行動計畫'];

    // Computed properties
    const totalCO2 = computed(() => {
      return Object.values(answers.value).reduce((sum, ans) => sum + ans.kg, 0);
    });

    const answeredCount = computed(() => {
      return Object.keys(answers.value).length;
    });

    const progressBarWidth = computed(() => {
      if (questions.value.length === 0) return '0%';
      return `${(answeredCount.value / questions.value.length) * 100}%`;
    });

    const themeAccent = computed(() => {
      const val = totalCO2.value;
      if (val < 3)  return '#f0c878';
      if (val < 6)  return '#6ee7b7';
      if (val < 10) return '#facc15';
      if (val < 14) return '#fb923c';
      return '#f87171';
    });

    const treesRequired = computed(() => {
      return Math.round(totalCO2.value / 0.058);
    });

    const carKmEquiv = computed(() => {
      return Math.round((totalCO2.value / 0.173) * 10) / 10;
    });

    const phoneChargesEquiv = computed(() => {
      return Math.round(totalCO2.value * 122);
    });

    const endingDate = computed(() => {
      const now = new Date();
      return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
    });

    const newspaperStory = computed(() => {
      if (answeredCount.value === 0) return null;
      const sorted = Object.entries(answers.value)
        .map(([qId, ans]) => ({ ...ans, qId: parseInt(qId) }))
        .sort((a, b) => b.kg - a.kg);
      const topCat = sorted[0]?.category || '午餐';
      return STORIES[topCat] || STORIES['午餐'];
    });

    const benchmarks = computed(() => {
      const list = [
        { label: '你今天', meaning: '你的 24 小時碳足跡', kg: totalCO2.value, cls: 'you', color: themeAccent.value },
        { label: '台灣平均', meaning: '台灣人均每日排放，高居全球前段班', kg: 14.0, cls: 'tw', color: '#facc15' },
        { label: '全球平均', meaning: '全球人均，仍是巴黎目標的 3.8 倍', kg: 11.5, cls: 'global', color: '#fb923c' },
        { label: '巴黎協定', meaning: '1.5°C 目標每日上限，地球的生存底線', kg: 3.0, cls: 'paris', color: '#60a5fa' },
      ];
      const maxKg = Math.max(...list.map(b => b.kg), 1);
      return list.map(b => ({
        ...b,
        pct: (b.kg / maxKg) * 100
      }));
    });

    const myTempLevel = computed(() => {
      const val = totalCO2.value;
      if (val < 5) return 't15';
      if (val < 12) return 't20';
      return 't30';
    });

    const tempEditions = [
      { id:'t15', label:'1.5°C 版', date:'巴黎協定目標 · 2045年', badge:'巴黎協定目標',
        headline:'台灣珊瑚礁復育成功，墾丁重現 1980 年代的壯麗景色',
        effects:['珊瑚礁減少 70–90%', '熱浪頻率增加 5 倍', '海平面上升 40 公分', '北極夏天偶爾無冰'],
        flag:'你正在努力往這個未來前進 ✓' },
      { id:'t20', label:'2.0°C 版', date:'當前全球軌跡 · 2060年', badge:'當前全球軌跡',
        headline:'全球珊瑚礁 99% 消失，UN 宣布進入「海洋喪期」',
        effects:['珊瑚礁幾乎全滅（99%）', '4 億人面臨缺水危機', '海平面上升 60 公分', '北極夏天完全無冰'],
        flag:'你的選擇正在貢獻這個未來 ✓' },
      { id:'t30', label:'3.0°C 版', date:'高排放情境 · 2080年', badge:'高排放情境',
        headline:'台南、高雄市區多處永久淹沒，政府啟動強制遷村計畫',
        effects:['多個沿海城市永久淹沒', '大規模物種滅絕啟動', '10 億人被迫氣候遷移', '部分地區不再適合人居'],
        flag:'你的選擇正在貢獻這個未來 ✓' },
    ];

    const recommendations = computed(() => {
      if (questions.value.length === 0) return [];
      const list = [];
      for (const [qId, ans] of Object.entries(answers.value)) {
        const q = questions.value.find(item => item.id === parseInt(qId));
        if (!q) continue;
        const minOpt = q.options.reduce((a, b) => a.kg < b.kg ? a : b);
        const chosen = q.options.find(o => o.id === ans.id);
        const savings = ans.kg - minOpt.kg;
        if (savings > 0.05 && chosen && chosen.altLabel) {
          list.push({
            qId: q.id,
            category: q.category,
            ansIcon: ans.icon,
            ansLabel: ans.label,
            ansKg: ans.kg,
            minIcon: minOpt.icon,
            minLabel: minOpt.label,
            minAltLabel: chosen.altLabel,
            savings: savings
          });
        }
      }
      return list.sort((a, b) => b.savings - a.savings).slice(0, 3);
    });

    const oneActionRecommendation = computed(() => {
      if (questions.value.length === 0) return null;
      const list = [];
      for (const [qId, ans] of Object.entries(answers.value)) {
        const q = questions.value.find(item => item.id === parseInt(qId));
        if (!q) continue;
        const minOpt = q.options.reduce((a, b) => a.kg < b.kg ? a : b);
        const savings = ans.kg - minOpt.kg;
        if (savings > 0.05 && ans.kg > 0) {
          list.push({
            category: q.category,
            ansIcon: ans.icon,
            ansLabel: ans.label,
            minIcon: minOpt.icon,
            minLabel: minOpt.label,
            savings: savings
          });
        }
      }
      if (list.length === 0) return null;
      return list.sort((a, b) => b.savings - a.savings)[0];
    });

    // Watchers to dynamically update body styles based on the theme
    watch(totalCO2, (newVal) => {
      const t = getTheme(newVal);
      const r = document.documentElement;
      r.style.setProperty('--bg', t.bg);
      r.style.setProperty('--accent', t.accent);
      r.style.setProperty('--accent-glow', t.accentGlow);
    }, { immediate: true });

    // Methods
    const startQuiz = async () => {
      try {
        const response = await fetch('/api/questions');
        questions.value = await response.json();
        currentSection.value = 'quiz';
        window.scrollTo({ top: 0 });
      } catch (e) {
        console.error("Failed to load questions from API:", e);
      }
    };

    const pick = (qId, option) => {
      answers.value[qId] = option;
      if (answeredCount.value === questions.value.length) {
        setTimeout(submitResult, 700);
      }
    };

    const submitResult = async () => {
      const payload = {
        answers: Object.entries(answers.value).map(([qId, o]) => ({
          question_id: parseInt(qId),
          option_id: o.id
        }))
      };
      
      try {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        
        verdict.value = data.verdict;
        verdictDesc.value = data.description;
        
        currentSection.value = 'result';
        currentPage.value = 1;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        animateScore(data.total_co2);
      } catch (e) {
        console.error("Failed to calculate carbon results:", e);
      }
    };

    const animateScore = (targetVal) => {
      const duration = 1200;
      const startTime = performance.now();
      const startVal = animatedScore.value;

      const frame = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        animatedScore.value = startVal + (targetVal - startVal) * easeProgress;
        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          animatedScore.value = targetVal;
        }
      };
      requestAnimationFrame(frame);
    };

    const goPage = (n) => {
      currentPage.value = n;
      if (n === 3) {
        page3Triggered.value = false;
        setTimeout(() => {
          page3Triggered.value = true;
        }, 100);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const restartSimulator = () => {
      answers.value = {};
      currentSection.value = 'hero';
      currentPage.value = 1;
      animatedScore.value = 0.0;
      page3Triggered.value = false;
      window.scrollTo({ top: 0 });
    };

    return {
      currentSection,
      currentPage,
      questions,
      answers,
      animatedScore,
      verdict,
      verdictDesc,
      page3Triggered,
      pageLabels,
      totalCO2,
      answeredCount,
      progressBarWidth,
      themeAccent,
      treesRequired,
      carKmEquiv,
      phoneChargesEquiv,
      endingDate,
      newspaperStory,
      benchmarks,
      myTempLevel,
      tempEditions,
      recommendations,
      oneActionRecommendation,
      startQuiz,
      pick,
      goPage,
      restartSimulator
    };
  }
}).mount('#app');
>>>>>>> Stashed changes
