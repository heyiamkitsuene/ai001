function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function analyzeImage() {
  const input = document.getElementById('imageInput');
  const preview = document.getElementById('preview');
  const result = document.getElementById('aiResult');

  if (!input.files.length) {
    alert("請先選擇圖片");
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    preview.innerHTML = `<img src="${e.target.result}">`;
  };

  reader.readAsDataURL(file);

  const options = ["無風險", "準備發生", "正在發生"];
  const ai = options[Math.floor(Math.random() * options.length)];
  result.innerText = `🤖 AI 模擬判斷結果：${ai}`;
}

function calculateRisk() {
  const slope = parseFloat(document.getElementById('slope').value);
  const soil = document.getElementById('soil').value;
  const water = parseFloat(document.getElementById('water').value);
  const veg = parseFloat(document.getElementById('veg').value);

  if (isNaN(slope) || isNaN(water) || isNaN(veg)) {
    alert("請填寫完整資料");
    return;
  }

  let score = 0;
  score += slope > 40 ? 30 : slope > 30 ? 20 : 10;
  score += soil === "clay" ? 25 : soil === "sand" ? 15 : 5;
  score += water > 40 ? 25 : water > 25 ? 15 : 5;
  score += veg < 30 ? 20 : veg < 60 ? 10 : 5;

  const fs = (1 / (1 + water / 100)) * (1 / (1 + slope / 60));
  const level = score >= 75 ? "極高風險" :
                score >= 55 ? "高風險" :
                score >= 35 ? "中風險" : "低風險";

  document.getElementById("resultBox").innerHTML = `
    📐 穩定係數 Fs ≈ ${fs.toFixed(2)}<br>
    🧮 風險分數：${score}/100<br>
    🚨 最終判定：${level}
  `;
}
