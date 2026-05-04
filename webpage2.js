(function() {
    const questions = [
      {
        id: 1,
        category: "交通",
        title: "今天主要通勤方式？",
        desc: "以單程10公里計算，不同交通工具碳排差距可達數十倍。",
        options: [
          { label: "步行 / 腳踏車", kg: 0.0, badge: "low", note: "0.00 kg" },
          { label: "捷運 / 公車", kg: 0.40, badge: "low", note: "0.40 kg" },
          { label: "機車 (燃油)", kg: 0.68, badge: "mid", note: "0.68 kg" },
          { label: "獨自開車", kg: 1.73, badge: "high", note: "1.73 kg" }
        ]
      },
      {
        id: 2,
        category: "飲食",
        title: "午餐選擇？",
        desc: "蔬食便當約1.0 kgCO₂e，葷食便當平均約3.25 kgCO₂e。",
        options: [
          { label: "素食 / 蔬食", kg: 1.00, badge: "low", note: "1.00 kg" },
          { label: "雞肉 / 豬肉", kg: 2.00, badge: "mid", note: "2.00 kg" },
          { label: "牛肉料理", kg: 3.25, badge: "high", note: "3.25 kg" },
          { label: "進口牛排", kg: 5.00, badge: "high", note: "5.00 kg" }
        ]
      },
      {
        id: 3,
        category: "用電",
        title: "空調 / 家電使用？",
        desc: "電力係數0.494 kgCO₂/度。冷氣溫度設定影響耗電量。",
        options: [
          { label: "不開冷氣", kg: 0.10, badge: "low", note: "0.10 kg" },
          { label: "26°C 搭配電扇", kg: 0.42, badge: "low", note: "0.42 kg" },
          { label: "22°C 開整天", kg: 2.77, badge: "mid", note: "2.77 kg" },
          { label: "長時間高耗電", kg: 4.20, badge: "high", note: "4.20 kg" }
        ]
      },
      {
        id: 4,
        category: "消費",
        title: "今天有購物嗎？",
        desc: "一件快時尚衣物碳排約1.6 kg，新手機生產碳排約70 kg (均攤每日)。",
        options: [
          { label: "沒有購物", kg: 0.00, badge: "low", note: "0.00 kg" },
          { label: "二手物品", kg: 0.10, badge: "low", note: "0.10 kg" },
          { label: "一件新衣服", kg: 1.60, badge: "mid", note: "1.60 kg" },
          { label: "新手機 (日均)", kg: 8.00, badge: "high", note: "8.00 kg" }
        ]
      },
      {
        id: 5,
        category: "旅遊",
        title: "近期有旅遊計畫嗎？",
        desc: "火車0.06 kg/人公里；長程飛機碳排極高，均攤至每日。",
        options: [
          { label: "沒有旅遊", kg: 0.00, badge: "low", note: "0.00 kg" },
          { label: "台鐵島內", kg: 0.60, badge: "low", note: "0.60 kg" },
          { label: "日本來回", kg: 3.00, badge: "mid", note: "3.00 kg" },
          { label: "歐美長途", kg: 7.00, badge: "high", note: "7.00 kg" }
        ]
      }
    ];

    const answers = {};

    function updateHeader() {
      const total = Object.values(answers).reduce((s, a) => s + a.kg, 0);
      const count = Object.keys(answers).length;
      document.getElementById('h-carbon').textContent = total.toFixed(2) + ' kg';
      document.getElementById('h-progress').textContent = `${count}/5`;
    }

    function buildQuiz() {
      const section = document.getElementById('quiz-section');
      section.innerHTML = '';
      questions.forEach((q) => {
        const card = document.createElement('div');
        card.className = 'q-card';
        card.id = `qcard-${q.id}`;
        card.innerHTML = `
          <div class="q-meta">${q.category} · 問題 ${q.id}/5</div>
          <div class="q-title">${q.title}</div>
          <div class="q-desc">${q.desc}</div>
          <div class="options-grid">
            ${q.options.map(opt => `
              <button class="opt-btn" data-qid="${q.id}" data-kg="${opt.kg}" data-cat="${q.category}">
                <span class="badge ${opt.badge==='low'?'badge-low':opt.badge==='mid'?'badge-mid':'badge-high'}">${opt.badge==='low'?'低碳':opt.badge==='mid'?'中碳':'高碳'}</span>
                <span class="opt-label">${opt.label}</span>
                <span class="opt-carbon">${opt.note}</span>
              </button>
            `).join('')}
          </div>
        `;
        section.appendChild(card);
      });

      document.querySelectorAll('.opt-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const qId = parseInt(this.dataset.qid);
          const kg = parseFloat(this.dataset.kg);
          const category = this.dataset.cat;
          const card = document.getElementById(`qcard-${qId}`);

          card.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
          this.classList.add('selected');
          answers[qId] = { kg, category };
          updateHeader();

          if (Object.keys(answers).length === questions.length) {
            setTimeout(showResult, 200);
          }
        });
      });
    }

    function startQuiz() {
      document.getElementById('hero-section').style.display = 'none';
      document.getElementById('quiz-section').style.display = 'block';
      buildQuiz();
      window.scrollTo(0, 0);
    }

    function showResult() {
      document.getElementById('quiz-section').style.display = 'none';
      document.getElementById('result-section').style.display = 'block';

      const total = Object.values(answers).reduce((s, a) => s + a.kg, 0);
      document.getElementById('r-score').textContent = total.toFixed(2);

      let verdict, desc;
      if (total < 4) {
        verdict = "低碳生活";
        desc = "你的碳足跡遠低於平均，非常環保。";
      } else if (total < 10) {
        verdict = "接近平均";
        desc = "與台灣人均排放接近，仍有改善空間。";
      } else if (total < 16) {
        verdict = "偏高";
        desc = "碳足跡明顯高於平均，建議檢視高碳選項。";
      } else {
        verdict = "極高碳排";
        desc = "碳排放量驚人，請從飲食與交通開始調整。";
      }
      document.getElementById('r-verdict').textContent = verdict;
      document.getElementById('r-desc').textContent = desc;

      const benchmarks = [
        { label: '你今天', kg: total },
        { label: '台灣平均', kg: 14.0 },
        { label: '全球平均', kg: 11.5 },
        { label: '巴黎目標', kg: 3.0 }
      ];
      const maxKg = Math.max(...benchmarks.map(b => b.kg), 1);
      document.getElementById('compare-grid').innerHTML = benchmarks.map(b => `
        <div class="compare-row">
          <span class="compare-label">${b.label}</span>
          <div class="compare-bar-wrap">
            <div class="compare-bar-fill" style="width:${(b.kg/maxKg)*100}%;"></div>
          </div>
          <span class="compare-value">${b.kg.toFixed(1)} kg</span>
        </div>
      `).join('');

      const catMap = {};
      Object.values(answers).forEach(a => {
        catMap[a.category] = (catMap[a.category] || 0) + a.kg;
      });
      document.getElementById('breakdown-grid').innerHTML = Object.entries(catMap)
        .sort((a, b) => b[1] - a[1])
        .map(([cat, kg]) => `<div class="breakdown-item"><strong>${cat}</strong><br>${kg.toFixed(2)} kg</div>`)
        .join('');

      window.scrollTo(0, 0);
    }

    window.startQuiz = startQuiz;
  })();
