const { createApp, ref, computed, watch } = Vue;

// Constants for stories
const STORIES = {
  "交通": {
    change: {
      headline: "大眾運輸使用率創歷史新高，台北空氣品質連續 90 天優良",
      subhead: "市民：「不開車反而更輕鬆，每個月還省了一萬塊」",
      body: "台北（本報記者 林佳穎）—— 最新調查顯示，選擇大眾運輸通勤的市民比例已達 78%，台北盆地 PM2.5 濃度降至近三十年最低值。多名受訪市民表示，省下的油錢和停車費已足夠每年出國旅遊一次。",
      stats: [{ l: "夏季均溫", v: "+1.4°C" }, { l: "珊瑚礁覆蓋率", v: "42%（恢復中）" }, { l: "月均電費", v: "NT$920" }]
    },
    continue: {
      headline: "台北塞車費每月逾萬元，上班族嘆「只剩下工作和繳費」",
      subhead: "政府：不漲費不足以達成減碳目標，環保團體仍批為德不卒",
      body: "台北（本報記者 陳怡如）—— 政府於本月正式實施都市碳排通行費，獨自開車通勤月費已突破 NT$10,800。多名上班族坦言正考慮搬離台北，每逢上下班時段捷運依舊人滿為患。",
      stats: [{ l: "夏季均溫", v: "+3.0°C" }, { l: "珊瑚礁覆蓋率", v: "3%（全滅邊緣）" }, { l: "月均電費", v: "NT$2,600" }]
    }
  },
  "早餐": {
    change: {
      headline: "在地早餐店復興，年輕世代以「慢食早晨」對抗外送文化",
      subhead: "食物碳足跡標示制度上路，消費者開始用新眼光看菜單",
      body: "台北（本報記者 黃思穎）—— 全台在地早餐店數量三年成長 23%，年輕族群開始重視食物碳足跡，在地食材、低包材的選擇正成為新世代的早晨儀式。碳足跡標示讓每個人的選擇都更有意識。",
      stats: [{ l: "夏季均溫", v: "+1.3°C" }, { l: "食物廢棄物", v: "-31%" }, { l: "月均電費", v: "NT$900" }]
    },
    continue: {
      headline: "外送碳稅上路，每份外送早餐加收 NT$45，App 評分跌至歷史低點",
      subhead: "「買早餐還要繳罰款？」民眾怒火延燒，業者緊急召開緊急記者會",
      body: "台北（本報記者 吳明哲）—— 政府為抑制外送碳排放，宣布自本月起對每筆外送訂單加收 NT$45 碳稅。外送平台股價應聲重挫，多名外送員上街抗議，稱此舉是「搶奪底層勞工的飯碗」。",
      stats: [{ l: "夏季均溫", v: "+2.7°C" }, { l: "外送碳稅", v: "NT$45/筆" }, { l: "月均電費", v: "NT$2,200" }]
    }
  },
  "辦公": {
    change: {
      headline: "遠端辦公永久化，台灣企業碳排量五年減少 31%",
      subhead: "員工滿意度創歷史新高：「通勤時間歸零，還給我了人生」",
      body: "台北（本報記者 張馨云）—— 台灣主要企業宣布混合辦公制度永久化，通勤碳排較 2025 年下降 31%。員工滿意度調查顯示，九成上班族認為生活品質有顯著改善，台北道路壅塞情況也大幅緩解。",
      stats: [{ l: "夏季均溫", v: "+1.4°C" }, { l: "企業碳排", v: "-31%" }, { l: "月均電費", v: "NT$880" }]
    },
    continue: {
      headline: "航空碳稅每公里 NT$2.5，商務人士出差成本暴增三倍",
      subhead: "企業呼籲寬限期，環保團體強力反對：「讓碳排付出代價是基本道理」",
      body: "台北（本報記者 劉承翰）—— 交通部宣布航空碳稅正式上路，一趟台北東京商務來回增加 NT$12,000 碳稅成本。多家跨國企業宣布縮減亞太區出差預算，部分公司已考慮將亞太總部遷往碳稅較低的城市。",
      stats: [{ l: "夏季均溫", v: "+3.1°C" }, { l: "航空碳稅", v: "NT$2.5/km" }, { l: "月均電費", v: "NT$3,200" }]
    }
  },
  "午餐": {
    change: {
      headline: "台灣蔬食革命：植物性午餐市占率首破五成",
      subhead: "農委會：在地蔬食供應鏈成熟，碳排量三年減少 18%",
      body: "台北（本報記者 許雅婷）—— 台灣午餐蔬食市占率今年首度突破 50%。農委會表示在地蔬食供應鏈已穩定成熟，消費者選擇低碳飲食的意識大幅提升，帶動農業轉型，也成為其他亞洲國家的仿效對象。",
      stats: [{ l: "夏季均溫", v: "+1.3°C" }, { l: "蔬食市占", v: "51%" }, { l: "月均電費", v: "NT$920" }]
    },
    continue: {
      headline: "牛肉每公斤突破 NT$2,000，台灣宣布限購令，傳統餐廳業者群起抗議",
      subhead: "畜牧業甲烷被列「氣候炸彈」：科學家說這是無法再逃避的事實",
      body: "台北（本報記者 林建宏）—— 政府將於下月實施牛肉限購令，每戶每週不得超過 500 克。一名牛肉麵店業者老淚縱橫表示：「我父親傳給我的店，就要這樣結束了嗎？」環保署長表示此為「氣候緊急措施，別無選擇」。",
      stats: [{ l: "夏季均溫", v: "+2.9°C" }, { l: "牛肉均價", v: "NT$2,000/kg" }, { l: "月均電費", v: "NT$2,600" }]
    }
  },
  "消費": {
    change: {
      headline: "循環經濟盛行，二手市場規模首度超越全新商品市場",
      subhead: "「修而不換」成為新世代的生活哲學，也成為年輕人的身份認同",
      body: "台北（本報記者 陳雅芳）—— 台灣二手商品市場今年規模突破 NT$3,000 億，首度超越新品市場。年輕世代將租借和修理視為生活方式，二手市集在台北已成為週末最受歡迎的社交場所。",
      stats: [{ l: "夏季均溫", v: "+1.2°C" }, { l: "電子廢棄物", v: "-44%" }, { l: "月均電費", v: "NT$850" }]
    },
    continue: {
      headline: "電子廢棄物堆積如山，台灣垃圾場面積超越台北市，居民怒告政府",
      subhead: "每年 85 萬噸電子廢棄物：「我們把毒留給了自己的孩子」",
      body: "台北（本報記者 方俊明）—— 環保署最新數據顯示，台灣每年產生 85 萬噸電子廢棄物，其中僅 23% 妥善回收。新北市里長帶居民集體至環保署門口抗議，要求政府正視電子廢棄物對水源 and 土壤的污染問題。",
      stats: [{ l: "夏季均溫", v: "+2.7°C" }, { l: "電子廢棄物", v: "85萬噸/年" }, { l: "月均電費", v: "NT$2,200" }]
    }
  },
  "空調": {
    change: {
      headline: "智慧電網普及，台灣家庭電費五年降低 28%，尖峰用電創新低",
      subhead: "政府節能補貼奏效：「一個好的政策，可以改變一整個社會的習慣」",
      body: "台北（本報記者 謝宛真）—— 經濟部宣布台灣夏季尖峰用電需求較 2025 年下降 18%，智慧溫控系統補貼政策帶動全民節能風潮。一名台南家庭主婦表示：「現在不開到 22 度，其實也活得很好。」",
      stats: [{ l: "夏季均溫", v: "+1.3°C" }, { l: "電費降幅", v: "-28%" }, { l: "月均電費", v: "NT$820" }]
    },
    continue: {
      headline: "夏季每週輪流停電 4 小時，製造業損失慘重，電費調漲 180%",
      subhead: "50 萬戶申請電費補貼：「繳不起電費了，這是在過什麼日子？」",
      body: "台北（本報記者 江志偉）—— 台電宣布今夏全台分區輪流停電，尖峰缺電達 350 萬瓩。電費調漲 180% 引爆民怨，台北市長緊急宣布開放政府機關供市民避暑，有民眾帶著行李箱住進區公所大廳。",
      stats: [{ l: "夏季均溫", v: "+3.0°C" }, { l: "電費漲幅", v: "+180%" }, { l: "月均電費", v: "NT$3,100" }]
    }
  },
  "飲水": {
    change: {
      headline: "自備容器文化扎根，台灣一次性塑膠垃圾量減少 44%",
      subhead: "國際媒體：台灣是「自備容器革命」的全球先行者",
      body: "台北（本報記者 蔡欣穎）—— 推行自備容器獎勵制度五年後，台灣一次性塑膠廢棄物較 2025 年減少 44%，國際環保組織給予最高評價。一名咖啡廳老闆說：「自備杯的客人現在超過八成，我們幾乎不用再買拋棄式杯子了。」",
      stats: [{ l: "夏季均溫", v: "+1.2°C" }, { l: "塑膠廢棄物", v: "-44%" }, { l: "月均電費", v: "NT$900" }]
    },
    continue: {
      headline: "塑膠微粒已進入台灣飲用水，衛福部發佈健康警示",
      subhead: "研究：每週吃進一張信用卡份量的塑膠 —— 這已是現在式",
      body: "台北（本報記者 趙偉倫）—— 衛福部最新調查顯示，台灣 78% 自來水樣本中檢測到微塑膠。醫學研究指出長期暴露微塑膠與心血管疾病、免疫異常有關，政府建議全台家庭安裝過濾器，但補貼預算仍未到位。",
      stats: [{ l: "夏季均溫", v: "+2.5°C" }, { l: "飲水微塑膠", v: "78%水樣陽性" }, { l: "月均電費", v: "NT$2,000" }]
    }
  },
  "娛樂": {
    change: {
      headline: "戶外低碳娛樂風潮，台北城市森林計畫讓市區降溫 1.8°C",
      subhead: "公共空間活化讓人與人更靠近：「以前都宅在家，現在才發現社區有多美」",
      body: "台北（本報記者 羅欣怡）—— 台北市推動城市森林計畫成效顯著，市區均溫較 2025 年下降 1.8°C。低碳休閒活動大幅推廣後，市民心理健康指數同步上升，急診室因熱衰竭就診人數大幅減少。",
      stats: [{ l: "夏季均溫", v: "+1.3°C" }, { l: "市區降溫", v: "-1.8°C" }, { l: "月均電費", v: "NT$880" }]
    },
    continue: {
      headline: "電玩直播業被列「高耗能產業」，數據中心用電已占全台 12%",
      subhead: "政府祭重稅，電競公司喊著要出走：「台灣要成為數位孤島嗎？」",
      body: "台北（本報記者 蔡明哲）—— 數位娛樂產業正式列入高耗能管制清單，電競中心每年須繳交高額碳費。多家電競公司考慮遷往海外，業界人士指出：「政府一邊說要發展數位經濟，一邊用碳稅把我們趕走。」",
      stats: [{ l: "夏季均溫", v: "+2.7°C" }, { l: "數據中心用電", v: "占全台12%" }, { l: "月均電費", v: "NT$2,500" }]
    }
  },
  "晚餐": {
    change: {
      headline: "台灣「週一蔬食」運動：全國每年減少碳排 120 萬噸",
      subhead: "學校蔬食日帶動的飲食革命，正在靜悄悄地改變一個世代",
      body: "台北（本報記者 吳美玲）—— 農委會統計，全台「每週一蔬食」參與人數已達 600 萬，每年減少碳排放 120 萬噸。一名參與十年的台南家庭主婦說：「我孩子問我為什麼要蔬食，我說因為我想讓他長大後還有珊瑚礁可以看。」",
      stats: [{ l: "夏季均溫", v: "+1.4°C" }, { l: "年減碳排", v: "120萬噸" }, { l: "月均電費", v: "NT$900" }]
    },
    continue: {
      headline: "外食碳排稅上路，一頓燒烤大餐加收 NT$280，餐飲業哭聲連天",
      subhead: "老闆：「客人少了三成，我父親那一代開創的店，要在我手上結束嗎？」",
      body: "台北（本報記者 林泰宇）—— 環保署推出餐飲碳排稅制度，火鍋或燒烤大餐最高需額外支付 NT$280。一名中壢老字號燒肉店第二代業主接受採訪時泣不成聲，現場記者無人開口打斷。",
      stats: [{ l: "夏季均溫", v: "+2.9°C" }, { l: "餐飲碳排稅", v: "最高NT$280/餐" }, { l: "月均電費", v: "NT$2,800" }]
    }
  }
};

function getTheme(kg) {
  if (kg < 3) return { bg: '#0c0a09', accent: '#f0c878', accentGlow: 'rgba(240,200,120,0.15)' };
  if (kg < 6) return { bg: '#080f0c', accent: '#6ee7b7', accentGlow: 'rgba(110,231,183,0.15)' };
  if (kg < 10) return { bg: '#0f0d07', accent: '#facc15', accentGlow: 'rgba(250,204,21,0.12)' };
  if (kg < 14) return { bg: '#110a06', accent: '#fb923c', accentGlow: 'rgba(251,146,60,0.12)' };
  return { bg: '#140608', accent: '#f87171', accentGlow: 'rgba(248,113,113,0.12)' };
}

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
      if (val < 3) return '#f0c878';
      if (val < 6) return '#6ee7b7';
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
      {
        id: 't15', label: '1.5°C 版', date: '巴黎協定目標 · 2045年', badge: '巴黎協定目標',
        headline: '台灣珊瑚礁復育成功，墾丁重現 1980 年代的壯麗景色',
        effects: ['珊瑚礁減少 70–90%', '熱浪頻率增加 5 倍', '海平面上升 40 公分', '北極夏天偶爾無冰'],
        flag: '你正在努力往這個未來前進 ✓'
      },
      {
        id: 't20', label: '2.0°C 版', date: '當前全球軌跡 · 2060年', badge: '當前全球軌跡',
        headline: '全球珊瑚礁 99% 消失，UN 宣布進入「海洋喪期」',
        effects: ['珊瑚礁幾乎全滅（99%）', '4 億人面臨缺水危機', '海平面上升 60 公分', '北極夏天完全無冰'],
        flag: '你的選擇正在貢獻這個未來 ✓'
      },
      {
        id: 't30', label: '3.0°C 版', date: '高排放情境 · 2080年', badge: '高排放情境',
        headline: '台南、高雄市區多處永久淹沒，政府啟動強制遷村計畫',
        effects: ['多個沿海城市永久淹沒', '大規模物種滅絕啟動', '10 億人被迫氣候遷移', '部分地區不再適合人居'],
        flag: '你的選擇正在貢獻這個未來 ✓'
      },
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
