/**
 * Rheinfinanz Analytics - App Controller & Interactive Visualizations
 */

// Index definitions with TradingView symbols
const INDEX_CONFIG = [
    {
        id: 'msci_world',
        name: 'MSCI World',
        region: 'Global Equity (23 Länder)',
        symbol: 'AMEX:URTH',
        fallbackSymbol: 'XETR:EUNL',
        displayValue: '3.420,15',
        changeStr: '+0,82 %',
        isPositive: true,
        tag: 'Welt-Leitindex'
    },
    {
        id: 'sp500',
        name: 'S&P 500',
        region: 'USA (Top 500)',
        symbol: 'SP:SPX',
        fallbackSymbol: 'AMEX:SPY',
        displayValue: '5.864,67',
        changeStr: '+0,41 %',
        isPositive: true,
        tag: 'US-Standard'
    },
    {
        id: 'nasdaq100',
        name: 'Nasdaq 100',
        region: 'US-Technologie',
        symbol: 'NASDAQ:NDX',
        fallbackSymbol: 'NASDAQ:QQQ',
        displayValue: '20.322,40',
        changeStr: '+0,63 %',
        isPositive: true,
        tag: 'Technologie'
    },
    {
        id: 'dax',
        name: 'DAX 40',
        region: 'Deutschland',
        symbol: 'XETR:DAX',
        fallbackSymbol: 'INDEX:DAX',
        displayValue: '19.655,23',
        changeStr: '+0,38 %',
        isPositive: true,
        tag: 'Deutschland'
    },
    {
        id: 'eurostoxx50',
        name: 'Euro Stoxx 50',
        region: 'Europa (Eurozone)',
        symbol: 'INDEX:SX5E',
        fallbackSymbol: 'XETR:EXW1',
        displayValue: '4.945,80',
        changeStr: '+0,29 %',
        isPositive: true,
        tag: 'Europa'
    },
    {
        id: 'emerging_markets',
        name: 'MSCI Emerging Markets',
        region: 'Schwellenländer',
        symbol: 'AMEX:EEM',
        fallbackSymbol: 'XETR:EIMI',
        displayValue: '44,82',
        changeStr: '+1,15 %',
        isPositive: true,
        tag: 'Emerging Markets'
    },
    {
        id: 'global_bonds',
        name: 'Global Aggregate Bonds',
        region: 'Defensive Anleihen',
        symbol: 'AMEX:BND',
        fallbackSymbol: 'XETR:AGGH',
        displayValue: '72,14',
        changeStr: '-0,08 %',
        isPositive: false,
        tag: 'Anleihen'
    },
    {
        id: 'gold',
        name: 'Gold (Unze in USD)',
        region: 'Edelmetalle',
        symbol: 'TVC:GOLD',
        fallbackSymbol: 'OANDA:XAUUSD',
        displayValue: '2.720,50 $',
        changeStr: '+0,54 %',
        isPositive: true,
        tag: 'Sachwert / Gold'
    }
];

// App State
let currentSymbolConfig = INDEX_CONFIG[0];
let currentStrategyId = 'world_70_30';
let customWeights = { ...PRESET_STRATEGIES.custom.weights };
let trajectoryChartInstance = null;
let donutChartInstance = null;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initIndexCards();
    initTradingViewChart(currentSymbolConfig.symbol);
    initStrategyPresets();
    initSliders();
    initCharts();
    updateCalculations();
});

/* ==========================================================================
   TradingView Live Index Chart
   ========================================================================== */

function initIndexCards() {
    const grid = document.getElementById('indicesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    INDEX_CONFIG.forEach(item => {
        const card = document.createElement('div');
        card.className = `index-card ${item.id === currentSymbolConfig.id ? 'active' : ''}`;
        card.id = `card-${item.id}`;
        card.innerHTML = `
            <div class="index-header">
                <div>
                    <div class="index-name">${item.name}</div>
                    <div class="index-region">${item.region}</div>
                </div>
                <span class="index-change-pill ${item.isPositive ? 'pill-up' : 'pill-down'}">${item.changeStr}</span>
            </div>
            <div class="index-val-row">
                <span class="index-value">${item.displayValue}</span>
                <span style="font-size: 0.7rem; color: var(--text-muted);">${item.tag}</span>
            </div>
        `;

        card.addEventListener('click', () => {
            selectIndex(item);
        });

        grid.appendChild(card);
    });
}

function selectIndex(item) {
    currentSymbolConfig = item;

    // Update active card styling
    document.querySelectorAll('.index-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`card-${item.id}`);
    if (activeCard) activeCard.classList.add('active');

    // Update badge and title
    const symbolBadge = document.getElementById('activeSymbolBadge');
    if (symbolBadge) symbolBadge.textContent = item.name;

    const titleH3 = document.getElementById('chartTitleH3');
    if (titleH3) titleH3.textContent = `${item.name} – Live Chart & Performance`;

    const titleSpan = document.getElementById('chartTitleSpan');
    if (titleSpan) titleSpan.textContent = `${item.region} • Ticker: ${item.symbol}`;

    // Reload TradingView Chart Widget
    initTradingViewChart(item.symbol);
}

function initTradingViewChart(symbol) {
    const container = document.getElementById('tradingview_widget_container');
    if (!container) return;

    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Europe/Berlin",
        "theme": "dark",
        "style": "1", // 1 = Candles, 2 = Line, 3 = Area
        "locale": "de_DE",
        "enable_publishing": false,
        "backgroundColor": "rgba(13, 22, 41, 1)",
        "gridColor": "rgba(255, 255, 255, 0.05)",
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false,
        "calendar": false,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
    });

    container.appendChild(script);
}

/* ==========================================================================
   Strategy Lab & Calculator Controller
   ========================================================================== */

function initStrategyPresets() {
    const container = document.getElementById('presetsGroup');
    if (!container) return;

    container.innerHTML = '';

    Object.values(PRESET_STRATEGIES).forEach(strat => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `preset-pill-btn ${strat.id === currentStrategyId ? 'active' : ''}`;
        btn.id = `preset-btn-${strat.id}`;

        const retStr = `${(strat.expectedReturn * 100).toFixed(1)} % p.a.`;

        btn.innerHTML = `
            <div class="preset-info">
                <strong>${strat.name}</strong>
                <span>${strat.subtitle}</span>
            </div>
            <span class="preset-badge">${strat.id === 'custom' ? 'Individuell' : retStr}</span>
        `;

        btn.addEventListener('click', () => {
            selectStrategy(strat.id);
        });

        container.appendChild(btn);
    });
}

function selectStrategy(id) {
    currentStrategyId = id;

    // Highlight preset button
    document.querySelectorAll('.preset-pill-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`preset-btn-${id}`);
    if (btn) btn.classList.add('active');

    // Show/hide custom weights box
    const customBox = document.getElementById('customWeightsBox');
    if (customBox) {
        if (id === 'custom') {
            customBox.classList.add('active');
        } else {
            customBox.classList.remove('active');
        }
    }

    updateCalculations();
}

function initSliders() {
    const inputs = ['sliderInitialCapital', 'sliderMonthlyRate', 'sliderYears', 'inflationToggle'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                updateSliderDisplay(id);
                updateCalculations();
            });
            el.addEventListener('change', () => {
                updateSliderDisplay(id);
                updateCalculations();
            });
        }
    });

    // Custom Weights Sliders
    const weightKeys = ['weight_world', 'weight_emerging', 'weight_bonds', 'weight_gold', 'weight_cash'];
    weightKeys.forEach(key => {
        const slider = document.getElementById(key);
        if (slider) {
            slider.addEventListener('input', (e) => {
                handleCustomWeightChange(key, parseFloat(e.target.value));
            });
        }
    });
}

function updateSliderDisplay(id) {
    if (id === 'sliderInitialCapital') {
        const val = parseFloat(document.getElementById('sliderInitialCapital').value);
        document.getElementById('dispInitialCapital').textContent = formatCurrency(val);
    } else if (id === 'sliderMonthlyRate') {
        const val = parseFloat(document.getElementById('sliderMonthlyRate').value);
        document.getElementById('dispMonthlyRate').textContent = formatCurrency(val) + ' / Monat';
    } else if (id === 'sliderYears') {
        const val = parseInt(document.getElementById('sliderYears').value);
        document.getElementById('dispYears').textContent = `${val} Jahre`;
    }
}

function handleCustomWeightChange(changedKey, newVal) {
    const keyMap = {
        'weight_world': 'world_equity',
        'weight_emerging': 'emerging_equity',
        'weight_bonds': 'bonds',
        'weight_gold': 'gold',
        'weight_cash': 'cash'
    };

    const targetKey = keyMap[changedKey];
    customWeights[targetKey] = newVal / 100;

    // Display number
    const dispEl = document.getElementById(`disp_${changedKey}`);
    if (dispEl) dispEl.textContent = `${newVal} %`;

    // Calculate sum of weights
    const total = Object.values(customWeights).reduce((a, b) => a + b, 0);
    const totalIndicator = document.getElementById('dispTotalWeight');
    if (totalIndicator) {
        totalIndicator.textContent = `${Math.round(total * 100)} %`;
        if (Math.round(total * 100) === 100) {
            totalIndicator.style.color = 'var(--green-trend)';
        } else {
            totalIndicator.style.color = 'var(--gold)';
        }
    }

    updateCalculations();
}

/* ==========================================================================
   Calculation & Visualization Update Pipeline
   ========================================================================== */

function updateCalculations() {
    const initialCapital = parseFloat(document.getElementById('sliderInitialCapital').value) || 0;
    const monthlyRate = parseFloat(document.getElementById('sliderMonthlyRate').value) || 0;
    const years = parseInt(document.getElementById('sliderYears').value) || 10;
    const adjustForInflation = document.getElementById('inflationToggle').checked;

    // Determine current weights and metrics
    let activeWeights;
    let strategyData;

    if (currentStrategyId === 'custom') {
        // Normalize custom weights if needed
        const total = Object.values(customWeights).reduce((a, b) => a + b, 0);
        const normalized = {};
        for (const [k, v] of Object.entries(customWeights)) {
            normalized[k] = total > 0 ? (v / total) : 0;
        }
        activeWeights = normalized;
        const metrics = calculatePortfolioMetrics(activeWeights);
        strategyData = {
            ...PRESET_STRATEGIES.custom,
            weights: activeWeights,
            expectedReturn: metrics.expectedReturn,
            volatility: metrics.volatility,
            sharpeRatio: metrics.sharpeRatio,
            estimatedMaxDrawdown: metrics.estimatedMaxDrawdown
        };
    } else {
        strategyData = PRESET_STRATEGIES[currentStrategyId];
        activeWeights = strategyData.weights;
    }

    // Run Trajectory Simulation
    const simResult = simulateWealthTrajectory({
        initialCapital,
        monthlyRate,
        years,
        nominalReturn: strategyData.expectedReturn,
        volatility: strategyData.volatility,
        inflationRate: 0.02,
        adjustForInflation
    });

    // Update KPI Cards
    updateKPICards(simResult, strategyData, adjustForInflation);

    // Update Charts
    updateTrajectoryChart(simResult);
    updateDonutChart(activeWeights);

    // Update Stress Test Table
    updateStressTestTable(strategyData);
}

function updateKPICards(sim, strategy, isReal) {
    const elFinalCapital = document.getElementById('kpiFinalCapital');
    if (elFinalCapital) {
        elFinalCapital.textContent = formatCurrency(sim.finalExpected);
    }

    const elSubCapital = document.getElementById('kpiSubCapital');
    if (elSubCapital) {
        elSubCapital.textContent = isReal ? 'Kaufkraftbereinigt (2 % p.a. Inflation)' : 'Nominaler Vermögensendwert';
    }

    const elProfit = document.getElementById('kpiProfit');
    if (elProfit) {
        elProfit.textContent = `+${formatCurrency(sim.finalInterest)}`;
    }

    const elDeposits = document.getElementById('kpiDeposits');
    if (elDeposits) {
        elDeposits.textContent = `Eingezahlt: ${formatCurrency(sim.finalDeposits)}`;
    }

    const elMultiplier = document.getElementById('kpiMultiplier');
    if (elMultiplier) {
        const mult = sim.finalDeposits > 0 ? (sim.finalExpected / sim.finalDeposits).toFixed(2) : '1.0';
        elMultiplier.textContent = `${mult}x`;
    }

    const elSharpe = document.getElementById('kpiSharpe');
    if (elSharpe) {
        elSharpe.textContent = `Sharpe Ratio: ${strategy.sharpeRatio.toFixed(2)}`;
    }

    const elRisk = document.getElementById('kpiRisk');
    if (elRisk) {
        elRisk.textContent = `${(strategy.volatility * 100).toFixed(1)} % p.a.`;
    }

    const elDrawdown = document.getElementById('kpiDrawdown');
    if (elDrawdown) {
        elDrawdown.textContent = `Max. Drawdown: ca. ${(strategy.historicalMaxDrawdown * 100).toFixed(0)} %`;
    }
}

function updateStressTestTable(strategy) {
    const elExpRet = document.getElementById('tableExpReturn');
    if (elExpRet) elExpRet.textContent = `${(strategy.expectedReturn * 100).toFixed(2)} % p.a.`;

    const elVol = document.getElementById('tableVolatility');
    if (elVol) elVol.textContent = `${(strategy.volatility * 100).toFixed(2)} % p.a.`;

    const elDraw = document.getElementById('tableMaxDrawdown');
    if (elDraw) elDraw.textContent = `${(strategy.historicalMaxDrawdown * 100).toFixed(1)} %`;

    const elSharpe = document.getElementById('tableSharpe');
    if (elSharpe) elSharpe.textContent = strategy.sharpeRatio.toFixed(2);

    // Crisis simulation estimation
    const el2008 = document.getElementById('tableCrisis2008');
    if (el2008) {
        const impact2008 = (strategy.historicalMaxDrawdown * 100).toFixed(1);
        el2008.textContent = `${impact2008} %`;
    }

    const elCorona = document.getElementById('tableCrisisCorona');
    if (elCorona) {
        const impactCorona = (strategy.historicalMaxDrawdown * 0.65 * 100).toFixed(1);
        elCorona.textContent = `${impactCorona} %`;
    }
}

/* ==========================================================================
   Chart.js Rendering Engines
   ========================================================================== */

function initCharts() {
    // 1. Trajectory Area Chart
    const ctxTrajectory = document.getElementById('wealthTrajectoryCanvas');
    if (ctxTrajectory) {
        trajectoryChartInstance = new Chart(ctxTrajectory, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Optimistischer Korridor (90. Perzentil)',
                        data: [],
                        borderColor: 'rgba(243, 229, 171, 0.4)',
                        borderDash: [5, 5],
                        backgroundColor: 'transparent',
                        pointRadius: 0,
                        fill: false,
                        tension: 0.35,
                        order: 1
                    },
                    {
                        label: 'Erwarteter Vermögensverlauf (Median)',
                        data: [],
                        borderColor: '#D4AF37',
                        borderWidth: 2.5,
                        backgroundColor: 'rgba(212, 175, 55, 0.12)',
                        pointBackgroundColor: '#D4AF37',
                        pointRadius: 2,
                        pointHoverRadius: 6,
                        fill: '-1', // Fill down from optimistic
                        tension: 0.35,
                        order: 2
                    },
                    {
                        label: 'Konservativer Korridor (10. Perzentil)',
                        data: [],
                        borderColor: 'rgba(239, 68, 68, 0.45)',
                        borderDash: [4, 4],
                        backgroundColor: 'rgba(10, 25, 47, 0.4)',
                        pointRadius: 0,
                        fill: '-1',
                        tension: 0.35,
                        order: 3
                    },
                    {
                        label: 'Eingezahltes Eigenkapital',
                        data: [],
                        borderColor: '#3F72AF',
                        borderWidth: 2,
                        backgroundColor: 'rgba(63, 114, 175, 0.08)',
                        pointRadius: 0,
                        fill: false,
                        tension: 0.1,
                        order: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#94A3B8',
                            font: { family: 'Inter', size: 11 },
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0A192F',
                        titleColor: '#F8FAFC',
                        bodyColor: '#DBE2EF',
                        borderColor: 'rgba(212, 175, 55, 0.4)',
                        borderWidth: 1,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return ` ${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#64748B', font: { family: 'Inter', size: 10 } }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            color: '#64748B',
                            font: { family: 'Inter', size: 10 },
                            callback: function(val) {
                                if (val >= 1000000) return (val / 1000000).toFixed(1) + ' Mio. €';
                                if (val >= 1000) return (val / 1000).toFixed(0) + ' Tsd. €';
                                return val + ' €';
                            }
                        }
                    }
                }
            }
        });
    }

    // 2. Asset Allocation Donut Chart
    const ctxDonut = document.getElementById('assetDonutCanvas');
    if (ctxDonut) {
        donutChartInstance = new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#112D4E', // World Equity Navy
                        '#D4AF37', // Emerging Gold
                        '#3F72AF', // Bonds Wave Blue
                        '#AA8825', // Gold Dark Gold
                        '#94A3B8'  // Cash Slate
                    ],
                    borderColor: '#111D35',
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            font: { family: 'Inter', size: 10.5 },
                            boxWidth: 10,
                            padding: 8
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0A192F',
                        titleColor: '#F8FAFC',
                        bodyColor: '#DBE2EF',
                        borderColor: 'rgba(212, 175, 55, 0.4)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${(context.parsed).toFixed(1)} %`;
                            }
                        }
                    }
                },
                cutout: '68%'
            }
        });
    }
}

function updateTrajectoryChart(sim) {
    if (!trajectoryChartInstance) return;

    trajectoryChartInstance.data.labels = sim.labels;
    trajectoryChartInstance.data.datasets[0].data = sim.optimisticSeries;
    trajectoryChartInstance.data.datasets[1].data = sim.expectedSeries;
    trajectoryChartInstance.data.datasets[2].data = sim.pessimisticSeries;
    trajectoryChartInstance.data.datasets[3].data = sim.depositsSeries;

    trajectoryChartInstance.update();
}

function updateDonutChart(weights) {
    if (!donutChartInstance) return;

    const labels = [];
    const data = [];
    const colors = [];

    for (const [key, weight] of Object.entries(weights)) {
        if (weight > 0.001 && ASSET_CLASSES[key]) {
            labels.push(ASSET_CLASSES[key].shortName);
            data.push(Math.round(weight * 1000) / 10);
            colors.push(ASSET_CLASSES[key].color);
        }
    }

    donutChartInstance.data.labels = labels;
    donutChartInstance.data.datasets[0].data = data;
    donutChartInstance.data.datasets[0].backgroundColor = colors;

    donutChartInstance.update();
}

/* Utility Helpers */
function formatCurrency(val) {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
    }).format(val);
}
