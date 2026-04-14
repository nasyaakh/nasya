"""Patch Script.js: replace monthly line chart with yearly chart + setTrenYear"""
from pathlib import Path

JS = Path(r"d:\Semester 6\KP\Codingan\Script.js")
content = JS.read_text(encoding="utf-8")

OLD = """    let c1Chart = null, dKncChart = null, dKtdChart = null, dKtcChart = null, dKpcsChart = null, cUnitChart = null;
    let cb1 = null, dKncB = null, dKtdB = null, dKtcB = null, dKpcsB = null, cUnitB = null; // for landing
    function getChartColors() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        text: isDark ? '#94a3b8' : '#64748b',
        ringBg: isDark ? '#334155' : '#e2e8f0'
      };
    }
    function initCharts() {
      const { grid, text, ringBg } = getChartColors();
      const destroy = (c) => { if (c) c.destroy(); };
      [c1Chart, dKncChart, dKtdChart, dKtcChart, dKpcsChart, cUnitChart, cb1, dKncB, dKtdB, dKtcB, dKpcsB, cUnitB].forEach(destroy);

      // 1. Line Chart: Tren Insiden
      const lineOpts = {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
          datasets: [{
            label: 'Insiden Masuk', data: [5, 8, 12, 6, 9, 4],
            borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)',
            tension: 0.45, fill: true, pointBackgroundColor: '#3b82f6', pointRadius: 0, pointHoverRadius: 6, borderWidth: 3
          }]
        },
        options: {
          maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: text } },
            y: { grid: { color: grid, borderDash: [5, 5] }, ticks: { font: { size: 11 }, color: text }, beginAtZero: true }
          }
        }
      };

      const ctx1 = document.getElementById('c1'); if (ctx1) c1Chart = new Chart(ctx1, lineOpts);
      const ctx1Land = document.getElementById('c1-land'); if (ctx1Land) cb1 = new Chart(ctx1Land, lineOpts);"""

NEW = """    /* ═══════════════════════════════════════════
       TREN INSIDEN — Data Tahunan (12 bulan/tahun)
       ═══════════════════════════════════════════ */
    const TREN_DATA = {
      2022: [3, 5, 4, 7, 6, 8, 5, 9, 6, 4, 7, 5],
      2023: [4, 6, 8, 5, 9, 7, 11, 8, 6, 10, 7, 9],
      2024: [6, 8, 10, 9, 12, 8, 14, 11, 9, 13, 10, 12],
      2025: [7, 10, 9, 13, 11, 15, 10, 14, 12, 16, 11, 14],
      2026: [5, 8, 12, 6, 9, 4, 0, 0, 0, 0, 0, 0],
    };
    const BULAN_LABELS = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    let activeTrenYear = { admin: 2026, land: 2026 };

    function buildTrenChart(canvasEl, year, grid, text) {
      const rawData = TREN_DATA[year] || TREN_DATA[2026];
      const curYear = new Date().getFullYear();
      let labels = BULAN_LABELS;
      let data = rawData;
      if (year === curYear) {
        const lastIdx = rawData.reduce((acc, v, i) => v > 0 ? i : acc, 0);
        labels = BULAN_LABELS.slice(0, lastIdx + 1);
        data   = rawData.slice(0, lastIdx + 1);
      }
      const gradient = canvasEl.getContext('2d').createLinearGradient(0, 0, 0, 220);
      gradient.addColorStop(0, 'rgba(16,185,129,0.28)');
      gradient.addColorStop(1, 'rgba(16,185,129,0.0)');
      return new Chart(canvasEl, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Jumlah Insiden',
            data,
            borderColor: '#10b981',
            backgroundColor: gradient,
            tension: 0.45,
            fill: true,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#10b981',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            borderWidth: 2.5,
          }]
        },
        options: {
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              displayColors: false,
              backgroundColor: 'rgba(15,23,42,0.88)',
              titleColor: '#94a3b8',
              bodyColor: '#f8fafc',
              bodyFont: { size: 13, weight: '700' },
              padding: 10,
              callbacks: {
                title: (items) => items[0].label + '  ' + year,
                label: (item) => 'Insiden: ' + item.raw,
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: text } },
            y: { grid: { color: grid, borderDash: [5, 5] }, ticks: { font: { size: 11 }, color: text }, beginAtZero: true }
          }
        }
      });
    }

    function setTrenYear(year, ctx) {
      activeTrenYear[ctx] = year;
      const { grid, text } = getChartColors();
      const selId = ctx === 'land' ? 'year-sel-land' : 'year-sel-admin';
      document.querySelectorAll('#' + selId + ' .yr-btn').forEach(b => {
        b.classList.toggle('active', parseInt(b.dataset.year) === year);
      });
      if (ctx === 'land') {
        if (cb1) cb1.destroy();
        const el = document.getElementById('c1-land');
        if (el) cb1 = buildTrenChart(el, year, grid, text);
      } else {
        if (c1Chart) c1Chart.destroy();
        const el = document.getElementById('c1');
        if (el) c1Chart = buildTrenChart(el, year, grid, text);
      }
    }

    let c1Chart = null, dKncChart = null, dKtdChart = null, dKtcChart = null, dKpcsChart = null, cUnitChart = null;
    let cb1 = null, dKncB = null, dKtdB = null, dKtcB = null, dKpcsB = null, cUnitB = null; // for landing
    function getChartColors() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        grid: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
        text: isDark ? '#94a3b8' : '#64748b',
        ringBg: isDark ? '#334155' : '#e2e8f0'
      };
    }
    function initCharts() {
      const { grid, text, ringBg } = getChartColors();
      const destroy = (c) => { if (c) c.destroy(); };
      [c1Chart, dKncChart, dKtdChart, dKtcChart, dKpcsChart, cUnitChart, cb1, dKncB, dKtdB, dKtcB, dKpcsB, cUnitB].forEach(destroy);

      // 1. Line Chart: Tren Insiden Tahunan
      const ctx1 = document.getElementById('c1');
      if (ctx1) c1Chart = buildTrenChart(ctx1, activeTrenYear.admin, grid, text);
      const ctx1Land = document.getElementById('c1-land');
      if (ctx1Land) cb1 = buildTrenChart(ctx1Land, activeTrenYear.land, grid, text);"""

if OLD in content:
    content = content.replace(OLD, NEW, 1)
    JS.write_text(content, encoding="utf-8")
    print("OK: Script.js patched successfully")
    print(f"File size: {JS.stat().st_size:,} bytes")
else:
    print("ERROR: target block not found")
    # Debug: show char comparison
    idx = content.find("let c1Chart = null")
    print(f"  'let c1Chart' at position: {idx}")
