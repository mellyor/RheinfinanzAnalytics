/**
 * Rheinfinanz Analytics - App Controller & Interactive Visualizations
 * Connects the 11 Core Assets, TradingView Live Chart, Historical Comparison Engine & Strategy Lab
 */

// Asset Color Palette for Charts and UI
const ASSET_COLORS = {
    msci_world: '#112D4E',             // Navy Primary
    ftse_all_world: '#3B82F6',         // Royal Blue
    msci_small_cap: '#8B5CF6',         // Purple
    msci_emerging_markets: '#EC4899',  // Rose
    sp500: '#10B981',                  // Emerald Green
    euro_geldmarkt: '#64748B',         // Slate Gray
    gold_eur: '#D4AF37',               // Luxury Gold
    us_dividend_aristocrats: '#059669',// Deep Green
    bitcoin_eur: '#F59E0B',            // Amber
    global_portfolio_one: '#AA8825',   // Dr. Beck Gold/Brown
    fixed_income_one: '#0284C7'        // Sky Blue
};

// Fallback catalog definition in case file:// protocol restricts external JSON fetch
const FALLBACK_CATALOG = [
    {
        id: 'msci_world',
        name: 'MSCI World',
        fullName: 'iShares Core MSCI World UCITS ETF (EUR)',
        ticker: 'EUNL.DE',
        tvSymbol: 'XETR:EUNL',
        category: 'Aktien Welt (Industrieländer)',
        tag: 'Welt-Klassiker',
        isin: 'IE00B4L5Y983',
        wkn: 'A0RPWH',
        ter: '0,20 % p.a.',
        currency: 'EUR',
        description: 'Standardbaustein für die globale Aktienanlage. Investiert in über 1.500 Unternehmen aus 23 entwickelten Industrieländern.',
        metrics: { latestPrice: 129.79, dayChangePct: -0.72, cagrPct: 12.57, volatilityPct: 15.26, maxDrawdownPct: -33.63, sharpeRatio: 0.66, return1Y: 20.61, return3Y: 19.87 }
    },
    {
        id: 'ftse_all_world',
        name: 'FTSE All-World',
        fullName: 'Vanguard FTSE All-World UCITS ETF (EUR)',
        ticker: 'VWCE.DE',
        tvSymbol: 'XETR:VWCE',
        category: 'Aktien Welt (All-Cap)',
        tag: 'Welt & EM',
        isin: 'IE00BK5BQT80',
        wkn: 'A2PKXG',
        ter: '0,22 % p.a.',
        currency: 'EUR',
        description: 'Breiteste Marktabdeckung: Deckt ca. 90-95 % der weltweiten investierbaren Marktkapitalisierung ab.',
        metrics: { latestPrice: 169.36, dayChangePct: -0.89, cagrPct: 12.60, volatilityPct: 15.93, maxDrawdownPct: -33.43, sharpeRatio: 0.63, return1Y: 20.89, return3Y: 19.82 }
    },
    {
        id: 'msci_small_cap',
        name: 'MSCI World Small Cap',
        fullName: 'iShares MSCI World Small Cap UCITS ETF (EUR)',
        ticker: 'IUSN.DE',
        tvSymbol: 'XETR:IUSN',
        category: 'Nebenwerte global',
        tag: 'Small-Cap Prämie',
        isin: 'IE00BF4RFH31',
        wkn: 'A2DWBY',
        ter: '0,35 % p.a.',
        currency: 'EUR',
        description: 'Investiert in über 3.000 weltweite Small Caps zur Erzielung einer potenziellen Nebenwerte-Prämie.',
        metrics: { latestPrice: 8.95, dayChangePct: -0.68, cagrPct: 9.24, volatilityPct: 18.42, maxDrawdownPct: -39.12, sharpeRatio: 0.37, return1Y: 14.50, return3Y: 8.20 }
    },
    {
        id: 'msci_emerging_markets',
        name: 'MSCI Emerging Markets',
        fullName: 'iShares Core MSCI EM IMI UCITS ETF (EUR)',
        ticker: 'IS3N.DE',
        tvSymbol: 'XETR:IS3N',
        category: 'Schwellenländer',
        tag: 'Wachstumsmärkte',
        isin: 'IE00BKM4GZ66',
        wkn: 'A111X9',
        ter: '0,18 % p.a.',
        currency: 'EUR',
        description: 'Zugang zu über 3.000 Unternehmen in 24 Schwellenländern wie Taiwan, Indien, China und Brasilien.',
        metrics: { latestPrice: 45.91, dayChangePct: -0.55, cagrPct: 7.45, volatilityPct: 16.85, maxDrawdownPct: -32.50, sharpeRatio: 0.31, return1Y: 16.20, return3Y: 6.80 }
    },
    {
        id: 'sp500',
        name: 'S&P 500',
        fullName: 'S&P 500 Index (US Large Caps)',
        ticker: '^GSPC',
        tvSymbol: 'SP:SPX',
        category: 'USA Leitmarkt',
        tag: 'US-Leitindex',
        isin: 'US78378X1072',
        wkn: 'A0AET0',
        ter: 'Index (0 %)',
        currency: 'USD',
        description: 'Führender US-Leitindex der 500 wertvollsten börsennotierten Unternehmen (Historie seit 1970).',
        metrics: { latestPrice: 7690.73, dayChangePct: 0.41, cagrPct: 8.08, volatilityPct: 16.02, maxDrawdownPct: -56.78, sharpeRatio: 0.38, return1Y: 34.12, return3Y: 26.50 }
    },
    {
        id: 'euro_geldmarkt',
        name: 'Euro Geldmarkt ETF',
        fullName: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF (1C)',
        ticker: 'XEON.DE',
        tvSymbol: 'XETR:XEON',
        category: 'Geldmarkt & Liquidität',
        tag: 'Risikofreier Zins',
        isin: 'LU0290358497',
        wkn: 'DBX0AN',
        ter: '0,10 % p.a.',
        currency: 'EUR',
        description: 'Bildet exakt den kurzfristigen Euro-Geldmarktzins (€STR der EZB) ab. Täglich verfügbare Liquidität.',
        metrics: { latestPrice: 150.53, dayChangePct: 0.01, cagrPct: 0.69, volatilityPct: 0.65, maxDrawdownPct: -4.12, sharpeRatio: 0.12, return1Y: 3.85, return3Y: 3.65 }
    },
    {
        id: 'gold_eur',
        name: 'Gold in Euro',
        fullName: 'Xetra-Gold ETC (EUR je Gramm/Unze)',
        ticker: '4GLD.DE',
        tvSymbol: 'XETR:4GLD',
        category: 'Edelmetalle / Sachwert',
        tag: 'Krisenwährung',
        isin: 'DE000A0S9GB0',
        wkn: 'A0S9GB',
        ter: '0,00 % p.a.',
        currency: 'EUR',
        description: '100 % physisch in Tresoren der Deutschen Börse hinterlegtes Gold, notiert in Euro.',
        metrics: { latestPrice: 117.88, dayChangePct: 0.62, cagrPct: 9.83, volatilityPct: 14.28, maxDrawdownPct: -37.80, sharpeRatio: 0.51, return1Y: 38.50, return3Y: 21.20 }
    },
    {
        id: 'us_dividend_aristocrats',
        name: 'US Dividend Aristocrats',
        fullName: 'SPDR S&P US Dividend Aristocrats UCITS ETF (EUR)',
        ticker: 'SPYD.DE',
        tvSymbol: 'XETR:SPYD',
        category: 'Dividendenqualität',
        tag: 'Qualitätsdividenden',
        isin: 'IE00B6YX5D40',
        wkn: 'A1JKS0',
        ter: '0,35 % p.a.',
        currency: 'EUR',
        description: 'Investiert in US-Qualitätsunternehmen mit kontinuierlichen Dividendenerhöhungen seit über 20 Jahren.',
        metrics: { latestPrice: 76.28, dayChangePct: -0.32, cagrPct: 11.84, volatilityPct: 14.10, maxDrawdownPct: -34.80, sharpeRatio: 0.66, return1Y: 24.20, return3Y: 14.50 }
    },
    {
        id: 'bitcoin_eur',
        name: 'Bitcoin in Euro',
        fullName: 'Bitcoin Spot (EUR)',
        ticker: 'BTC-EUR',
        tvSymbol: 'BINANCE:BTCEUR',
        category: 'Digitale Sachwerte / Krypto',
        tag: 'Digitales Gold',
        isin: '-',
        wkn: '-',
        ter: '-',
        currency: 'EUR',
        description: 'Erste und größte dezentrale Kryptowährung mit mathematisch begrenztem Angebot von 21 Millionen Coins.',
        metrics: { latestPrice: 72675.71, dayChangePct: 2.14, cagrPct: 55.26, volatilityPct: 62.15, maxDrawdownPct: -84.10, sharpeRatio: 0.85, return1Y: 118.50, return3Y: 65.40 }
    },
    {
        id: 'global_portfolio_one',
        name: 'Global Portfolio One',
        fullName: 'GlobalPortfolioOne RT (Dr. Andreas Beck)',
        ticker: '0P0001K82V.F',
        tvSymbol: 'FWB:D5V0',
        category: 'Multi-Asset Antizyklik',
        tag: 'Dr. Andreas Beck',
        isin: 'AT0000A2B4T3',
        wkn: 'A2PT6U',
        ter: '0,70 % p.a.',
        currency: 'EUR',
        description: 'Wissenschaftliches Weltportfolio nach Dr. Andreas Beck. Hält eine dynamische Investitionsreserve zur antizyklischen Krisennutzung.',
        metrics: { latestPrice: 183.48, dayChangePct: -0.45, cagrPct: 10.49, volatilityPct: 13.82, maxDrawdownPct: -21.40, sharpeRatio: 0.58, return1Y: 19.80, return3Y: 13.90 }
    },
    {
        id: 'fixed_income_one',
        name: 'Fixed Income One',
        fullName: 'Fixed Income One (Dr. Andreas Beck)',
        ticker: '0P0001R2ZE.F',
        tvSymbol: 'FWB:D5V3',
        category: 'Anleihen & Zinsstrategie',
        tag: 'Dr. Andreas Beck',
        isin: 'AT0000A308J0',
        wkn: 'A3DC11',
        ter: '0,45 % p.a.',
        currency: 'EUR',
        description: 'Systematische Anleihen- und Zinsstrategie nach Dr. Andreas Beck zur stabilen Ertragsgenerierung und Portfoliodämpfung.',
        metrics: { latestPrice: 105.25, dayChangePct: 0.05, cagrPct: 3.36, volatilityPct: 4.15, maxDrawdownPct: -4.80, sharpeRatio: 0.40, return1Y: 4.90, return3Y: 3.30 }
    }
];

// App State
let ASSET_CATALOG = (window.CATALOG_DATA && window.CATALOG_DATA.assets) ? window.CATALOG_DATA.assets : FALLBACK_CATALOG;
let currentSymbolConfig = ASSET_CATALOG[0];
let currentStrategyId = 'beck_gpo';
let customWeights = { ...PRESET_STRATEGIES.custom.weights };

// Historical Backtest State
let historicalChartInstance = null;
let activeBacktestAssets = new Set(['msci_world', 'global_portfolio_one', 'sp500', 'gold_eur', 'euro_geldmarkt']);
let currentPeriod = 'gpo'; // 'gpo', 'fio', '5y', '10y', 'max'
let currentChartMode = 'indexed'; // 'indexed' or 'drawdown'

// Strategy Lab Charts
let trajectoryChartInstance = null;
let donutChartInstance = null;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initIndexCards();
    initTradingViewChart(currentSymbolConfig.tvSymbol || currentSymbolConfig.ticker);
    renderInstrumentDetails(currentSymbolConfig);
    initHistoricalComparisonModule();
    initStrategyPresets();
    initSliders();
    initCharts();
    updateCalculations();
});

/* ==========================================================================
   Section 1: TradingView Live Index & Instrument Cards
   ========================================================================== */

function initIndexCards() {
    const grid = document.getElementById('indicesGrid');
    const tabsContainer = document.getElementById('chartTabs');
    if (!grid) return;

    grid.innerHTML = '';
    if (tabsContainer) tabsContainer.innerHTML = '';

    ASSET_CATALOG.forEach(item => {
        const metrics = item.metrics || {};
        const isPositive = (metrics.dayChangePct || 0) >= 0;
        const changeStr = `${isPositive ? '+' : ''}${(metrics.dayChangePct || 0).toFixed(2).replace('.', ',')} %`;
        
        let priceStr = `${(metrics.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.currency === 'USD' ? '$' : '€'}`;
        if (item.id === 'msci_small_cap') {
            priceStr = `${(metrics.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €`;
        }

        const card = document.createElement('div');
        card.className = `index-card ${item.id === currentSymbolConfig.id ? 'active' : ''}`;
        card.id = `card-${item.id}`;
        card.innerHTML = `
            <div class="index-header">
                <div>
                    <div class="index-name">${item.name}</div>
                    <div class="index-region">${item.category}</div>
                </div>
                <span class="index-change-pill ${isPositive ? 'pill-up' : 'pill-down'}">${changeStr}</span>
            </div>
            <div class="index-val-row">
                <span class="index-value">${priceStr}</span>
                <span style="font-size: 0.72rem; font-weight: 600; color: var(--gold-dark);">${item.tag}</span>
            </div>
            <div style="margin-top: 8px; font-size: 0.72rem; color: var(--text-muted); display: flex; justify-content: space-between;">
                <span>CAGR: <strong>${metrics.cagrPct ? metrics.cagrPct + '%' : '-'}</strong></span>
                <span>MaxDD: <strong style="color: var(--red-trend);">${metrics.maxDrawdownPct ? metrics.maxDrawdownPct + '%' : '-'}</strong></span>
            </div>
        `;

        card.addEventListener('click', () => {
            selectIndex(item);
        });

        grid.appendChild(card);

        // Quick Tabs
        if (tabsContainer) {
            const tabBtn = document.createElement('button');
            tabBtn.className = `chart-tab-btn ${item.id === currentSymbolConfig.id ? 'active' : ''}`;
            tabBtn.id = `tab-${item.id}`;
            tabBtn.textContent = item.name;
            tabBtn.addEventListener('click', () => {
                selectIndex(item);
            });
            tabsContainer.appendChild(tabBtn);
        }
    });
}

function selectIndex(item) {
    currentSymbolConfig = item;

    // Update active card styling
    document.querySelectorAll('.index-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.getElementById(`card-${item.id}`);
    if (activeCard) activeCard.classList.add('active');

    // Update active tab styling
    document.querySelectorAll('.chart-tab-btn').forEach(b => b.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${item.id}`);
    if (activeTab) activeTab.classList.add('active');

    // Update badge and title
    const symbolBadge = document.getElementById('activeSymbolBadge');
    if (symbolBadge) symbolBadge.textContent = item.name;

    const titleH3 = document.getElementById('chartTitleH3');
    if (titleH3) titleH3.textContent = `${item.fullName || item.name} – Live Chart`;

    const titleSpan = document.getElementById('chartTitleSpan');
    if (titleSpan) titleSpan.textContent = `${item.category} • WKN: ${item.wkn || '-'} • ISIN: ${item.isin || '-'} • TradingView: ${item.tvSymbol || item.ticker}`;

    // Reload TradingView Chart Widget
    initTradingViewChart(item.tvSymbol || item.ticker);

    // Update instrument details box
    renderInstrumentDetails(item);
}

function renderInstrumentDetails(item) {
    const box = document.getElementById('instrumentDetailsBox');
    if (!box) return;

    const m = item.metrics || {};
    const priceFormatted = `${(m.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.currency === 'USD' ? '$' : '€'}`;

    box.innerHTML = `
        <div class="inst-metric-item">
            <span class="inst-metric-label">Aktueller Kurs</span>
            <span class="inst-metric-val" style="color: var(--navy-primary);">${priceFormatted}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">ISIN / WKN</span>
            <span class="inst-metric-val" style="font-size: 0.85rem;">${item.isin || '-'} / ${item.wkn || '-'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Kosten (TER)</span>
            <span class="inst-metric-val">${item.ter || '0,00 %'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Historische Rendite (CAGR)</span>
            <span class="inst-metric-val" style="color: var(--green-trend);">${m.cagrPct ? '+' + m.cagrPct + ' % p.a.' : '-'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Volatilität p.a.</span>
            <span class="inst-metric-val">${m.volatilityPct ? m.volatilityPct + ' %' : '-'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Max. Drawdown</span>
            <span class="inst-metric-val" style="color: var(--red-trend);">${m.maxDrawdownPct ? m.maxDrawdownPct + ' %' : '-'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Sharpe Ratio</span>
            <span class="inst-metric-val">${m.sharpeRatio !== undefined ? m.sharpeRatio : '-'}</span>
        </div>
        <div class="inst-metric-item" style="grid-column: 1 / -1; margin-top: 4px; border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
            <span class="inst-metric-label">Profil & Anlagestrategie</span>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 3px 0 0 0; line-height: 1.45;">
                ${item.description || ''}
            </p>
        </div>
    `;
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
        "theme": "light",
        "style": "1", // 1 = Candles, 2 = Line, 3 = Area
        "locale": "de_DE",
        "enable_publishing": false,
        "backgroundColor": "#FFFFFF",
        "gridColor": "rgba(0, 0, 0, 0.05)",
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
   Section 2: Historical Comparison & Backtest Engine
   ========================================================================== */

function initHistoricalComparisonModule() {
    initTimeframePills();
    initModePills();
    initAssetChips();
    renderHistoricalTable();
    initHistoricalChart();
}

function initTimeframePills() {
    const pills = document.querySelectorAll('.timeframe-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentPeriod = pill.getAttribute('data-period');
            updateHistoricalChart();
        });
    });
}

function initModePills() {
    const pills = document.querySelectorAll('.mode-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentChartMode = pill.getAttribute('data-mode');
            updateHistoricalChart();
        });
    });
}

function initAssetChips() {
    const group = document.getElementById('assetChipsGroup');
    if (!group) return;

    group.innerHTML = '';
    ASSET_CATALOG.forEach(item => {
        const chip = document.createElement('div');
        const isActive = activeBacktestAssets.has(item.id);
        const color = ASSET_COLORS[item.id] || '#112D4E';

        chip.className = `asset-chip ${isActive ? 'active' : ''}`;
        chip.style.setProperty('--chip-color', color);
        chip.innerHTML = `
            <span class="asset-chip-dot" style="background: ${color};"></span>
            <span>${item.name}</span>
        `;

        chip.addEventListener('click', () => {
            if (activeBacktestAssets.has(item.id)) {
                if (activeBacktestAssets.size > 1) {
                    activeBacktestAssets.delete(item.id);
                    chip.classList.remove('active');
                }
            } else {
                activeBacktestAssets.add(item.id);
                chip.classList.add('active');
            }
            updateHistoricalChart();
        });

        group.appendChild(chip);
    });
}

function renderHistoricalTable() {
    const tbody = document.getElementById('historicalComparisonTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    ASSET_CATALOG.forEach(item => {
        const m = item.metrics || {};
        const isDayPos = (m.dayChangePct || 0) >= 0;
        const dayStr = `${isDayPos ? '+' : ''}${(m.dayChangePct || 0).toFixed(2).replace('.', ',')} %`;
        const dayClass = isDayPos ? 'metric-positive' : 'metric-negative';

        const ret1YStr = m.return1Y !== null && m.return1Y !== undefined ? `${m.return1Y >= 0 ? '+' : ''}${m.return1Y.toFixed(2).replace('.', ',')} %` : '-';
        const ret3YStr = m.return3Y !== null && m.return3Y !== undefined ? `${m.return3Y >= 0 ? '+' : ''}${m.return3Y.toFixed(2).replace('.', ',')} %` : '-';
        const cagrStr = m.cagrPct !== null && m.cagrPct !== undefined ? `+${m.cagrPct.toFixed(2).replace('.', ',')} %` : '-';
        const totRetStr = m.totalReturnPct !== null && m.totalReturnPct !== undefined ? `+${m.totalReturnPct.toFixed(1).replace('.', ',')} %` : '-';
        const volStr = m.volatilityPct !== null && m.volatilityPct !== undefined ? `${m.volatilityPct.toFixed(2).replace('.', ',')} %` : '-';
        const ddStr = m.maxDrawdownPct !== null && m.maxDrawdownPct !== undefined ? `${m.maxDrawdownPct.toFixed(2).replace('.', ',')} %` : '-';
        const sharpeStr = m.sharpeRatio !== null && m.sharpeRatio !== undefined ? m.sharpeRatio.toFixed(2) : '-';

        let priceStr = `${(m.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.currency === 'USD' ? '$' : '€'}`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="font-weight: 700; color: var(--navy-dark);">${item.name}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">${item.isin || item.ticker}</div>
            </td>
            <td><span style="font-size: 0.74rem; background: #F1F5F9; padding: 2px 7px; border-radius: 4px;">${item.category}</span></td>
            <td style="font-weight: 600;">${priceStr}</td>
            <td class="${dayClass}">${dayStr}</td>
            <td class="${m.return1Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret1YStr}</td>
            <td class="${m.return3Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret3YStr}</td>
            <td class="metric-positive" style="font-weight: 700;">${totRetStr}</td>
            <td style="font-weight: 700; color: var(--navy-primary);">${cagrStr}</td>
            <td>${volStr}</td>
            <td class="metric-negative">${ddStr}</td>
            <td style="font-weight: 600;">${sharpeStr}</td>
        `;
        tbody.appendChild(tr);
    });
}

function initHistoricalChart() {
    const ctx = document.getElementById('historicalComparisonChart');
    if (!ctx) return;

    historicalChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: []
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
                        boxWidth: 12,
                        usePointStyle: true,
                        font: { family: 'Cinzel, Georgia, serif', size: 12, weight: 'bold' },
                        color: '#0A192F'
                    }
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    titleColor: '#0A192F',
                    bodyColor: '#112D4E',
                    borderColor: '#D4AF37',
                    borderWidth: 1.5,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const val = context.parsed.y;
                            if (currentChartMode === 'drawdown') {
                                return ` ${context.dataset.label}: ${val.toFixed(2)} %`;
                            } else {
                                return ` ${context.dataset.label}: ${val.toFixed(1)} (Index)`;
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.04)' },
                    ticks: {
                        color: '#64748B',
                        font: { size: 11 },
                        maxTicksLimit: 12
                    }
                },
                y: {
                    grid: { color: 'rgba(0, 0, 0, 0.06)' },
                    ticks: {
                        color: '#0A192F',
                        font: { size: 11, weight: 'bold' },
                        callback: function(value) {
                            return currentChartMode === 'drawdown' ? `${value}%` : value;
                        }
                    }
                }
            }
        }
    });

    updateHistoricalChart();
}

function updateHistoricalChart() {
    if (!historicalChartInstance) return;

    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    if (!historyData || Object.keys(historyData).length === 0) return;

    // Determine target start date based on currentPeriod
    let targetStartDate = '2022-03-08'; // Default GPO inception
    const now = new Date();

    if (currentPeriod === 'gpo') {
        targetStartDate = '2022-03-08';
    } else if (currentPeriod === 'fio') {
        targetStartDate = '2023-06-02';
    } else if (currentPeriod === '5y') {
        const d = new Date();
        d.setFullYear(now.getFullYear() - 5);
        targetStartDate = d.toISOString().split('T')[0];
    } else if (currentPeriod === '10y') {
        const d = new Date();
        d.setFullYear(now.getFullYear() - 10);
        targetStartDate = d.toISOString().split('T')[0];
    } else if (currentPeriod === 'max') {
        // Earliest date of active assets
        targetStartDate = '1970-01-01';
    }

    // Collect all dates from active assets >= targetStartDate
    const dateSet = new Set();
    const activeSeriesMap = {};

    activeBacktestAssets.forEach(assetId => {
        const asset = historyData[assetId];
        if (asset && asset.series) {
            const filtered = asset.series.filter(pt => pt[0] >= targetStartDate);
            if (filtered.length > 0) {
                activeSeriesMap[assetId] = filtered;
                filtered.forEach(pt => dateSet.add(pt[0]));
            }
        }
    });

    const sortedDates = Array.from(dateSet).sort();
    if (sortedDates.length === 0) return;

    // Downsample if more than 350 dates to ensure smooth performance
    const step = Math.max(1, Math.floor(sortedDates.length / 300));
    const sampledDates = [];
    for (let i = 0; i < sortedDates.length; i += step) {
        sampledDates.push(sortedDates[i]);
    }
    // Always include the latest date
    if (sampledDates[sampledDates.length - 1] !== sortedDates[sortedDates.length - 1]) {
        sampledDates.push(sortedDates[sortedDates.length - 1]);
    }

    const datasets = [];

    activeBacktestAssets.forEach(assetId => {
        const asset = historyData[assetId];
        const series = activeSeriesMap[assetId];
        if (!asset || !series || series.length === 0) return;

        // Build price map for fast lookup
        const priceMap = new Map();
        series.forEach(pt => priceMap.set(pt[0], pt[1]));

        // Fill sampled points
        const basePrice = series[0][1];
        let peak = basePrice;
        let lastKnown = basePrice;

        const dataPoints = [];

        sampledDates.forEach(dt => {
            if (priceMap.has(dt)) {
                lastKnown = priceMap.get(dt);
            }
            if (lastKnown > peak) peak = lastKnown;

            if (currentChartMode === 'drawdown') {
                const dd = ((lastKnown - peak) / peak) * 100;
                dataPoints.push(Math.round(dd * 100) / 100);
            } else {
                // Indexed: base 100
                const indexed = (lastKnown / basePrice) * 100;
                dataPoints.push(Math.round(indexed * 10) / 10);
            }
        });

        const color = ASSET_COLORS[assetId] || '#112D4E';

        datasets.push({
            label: asset.name,
            data: dataPoints,
            borderColor: color,
            backgroundColor: color,
            borderWidth: (assetId === 'msci_world' || assetId === 'global_portfolio_one') ? 2.8 : 2.0,
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.15
        });
    });

    historicalChartInstance.data.labels = sampledDates;
    historicalChartInstance.data.datasets = datasets;
    historicalChartInstance.update();
}

/* ==========================================================================
   Section 3: Strategy Lab & Portfolio Calculator Controller
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

    document.querySelectorAll('.preset-pill-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById(`preset-btn-${id}`);
    if (btn) btn.classList.add('active');

    const strat = PRESET_STRATEGIES[id];
    const customBox = document.getElementById('customWeightsBox');

    if (id === 'custom') {
        if (customBox) customBox.style.display = 'block';
    } else {
        if (customBox) customBox.style.display = 'none';
        customWeights = { ...strat.weights };
        updateSliderDisplays();
    }

    // Update preset description
    const descEl = document.getElementById('selectedStrategyDesc');
    if (descEl) descEl.textContent = strat.description;

    const nameEl = document.getElementById('selectedStrategyName');
    if (nameEl) nameEl.textContent = strat.name;

    updateCalculations();
}

function updateSliderDisplays() {
    const sliders = [
        { id: 'weight_world', key: 'world_equity', disp: 'disp_weight_world' },
        { id: 'weight_emerging', key: 'emerging_equity', disp: 'disp_weight_emerging' },
        { id: 'weight_bonds', key: 'bonds', disp: 'disp_weight_bonds' },
        { id: 'weight_gold', key: 'gold', disp: 'disp_weight_gold' },
        { id: 'weight_cash', key: 'cash', disp: 'disp_weight_cash' }
    ];

    sliders.forEach(s => {
        const input = document.getElementById(s.id);
        const disp = document.getElementById(s.disp);
        const valPct = Math.round((customWeights[s.key] || 0) * 100);
        if (input) input.value = valPct;
        if (disp) disp.textContent = `${valPct} %`;
    });

    const totalPct = Math.round(Object.values(customWeights).reduce((a, b) => a + b, 0) * 100);
    const totalDisp = document.getElementById('dispTotalWeight');
    if (totalDisp) {
        totalDisp.textContent = `${totalPct} %`;
        totalDisp.style.color = totalPct === 100 ? 'var(--green-trend)' : 'var(--red-trend)';
    }
}

function initSliders() {
    const capitalSlider = document.getElementById('sliderInitialCapital');
    const capitalDisp = document.getElementById('dispInitialCapital');
    if (capitalSlider && capitalDisp) {
        capitalSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            capitalDisp.textContent = `${val.toLocaleString('de-DE')} €`;
            updateCalculations();
        });
    }

    const monthlySlider = document.getElementById('sliderMonthlyRate');
    const monthlyDisp = document.getElementById('dispMonthlyRate');
    if (monthlySlider && monthlyDisp) {
        monthlySlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            monthlyDisp.textContent = `${val.toLocaleString('de-DE')} € / Monat`;
            updateCalculations();
        });
    }

    const yearsSlider = document.getElementById('sliderYears');
    const yearsDisp = document.getElementById('dispYears');
    if (yearsSlider && yearsDisp) {
        yearsSlider.addEventListener('input', (e) => {
            yearsDisp.textContent = `${e.target.value} Jahre`;
            updateCalculations();
        });
    }

    const inflationCheck = document.getElementById('inflationToggle');
    if (inflationCheck) {
        inflationCheck.addEventListener('change', () => {
            updateCalculations();
        });
    }

    // Custom allocation sliders
    const allocSliders = [
        { id: 'weight_world', key: 'world_equity', disp: 'disp_weight_world' },
        { id: 'weight_emerging', key: 'emerging_equity', disp: 'disp_weight_emerging' },
        { id: 'weight_bonds', key: 'bonds', disp: 'disp_weight_bonds' },
        { id: 'weight_gold', key: 'gold', disp: 'disp_weight_gold' },
        { id: 'weight_cash', key: 'cash', disp: 'disp_weight_cash' }
    ];

    allocSliders.forEach(s => {
        const el = document.getElementById(s.id);
        const disp = document.getElementById(s.disp);
        if (el) {
            el.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value) / 100;
                customWeights[s.key] = val;
                if (disp) disp.textContent = `${e.target.value} %`;

                const totalPct = Math.round(Object.values(customWeights).reduce((a, b) => a + b, 0) * 100);
                const totalDisp = document.getElementById('dispTotalWeight');
                if (totalDisp) {
                    totalDisp.textContent = `${totalPct} %`;
                    totalDisp.style.color = totalPct === 100 ? 'var(--green-trend)' : 'var(--red-trend)';
                }

                updateCalculations();
            });
        }
    });
}

function initCharts() {
    // 1. Donut Chart (Allocation)
    const ctxDonut = document.getElementById('assetDonutCanvas');
    if (ctxDonut) {
        donutChartInstance = new Chart(ctxDonut, {
            type: 'doughnut',
            data: {
                labels: ['Aktien Welt', 'Emerging Markets', 'Anleihen', 'Gold', 'Geldmarkt'],
                datasets: [{
                    data: [80, 5, 0, 0, 15],
                    backgroundColor: ['#112D4E', '#D4AF37', '#3F72AF', '#AA8825', '#94A3B8'],
                    borderColor: '#FFFFFF',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '72%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 10,
                            font: { size: 10, family: 'Inter, sans-serif' },
                            color: '#0A192F'
                        }
                    }
                }
            }
        });
    }

    // 2. Trajectory Chart
    const ctxTrajectory = document.getElementById('wealthTrajectoryCanvas');
    if (ctxTrajectory) {
        trajectoryChartInstance = new Chart(ctxTrajectory, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
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
                            boxWidth: 12,
                            usePointStyle: true,
                            font: { family: 'Cinzel, Georgia, serif', size: 11, weight: 'bold' },
                            color: '#0A192F'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#FFFFFF',
                        titleColor: '#0A192F',
                        bodyColor: '#112D4E',
                        borderColor: '#D4AF37',
                        borderWidth: 1.5,
                        padding: 12,
                        callbacks: {
                            label: function(context) {
                                return ` ${context.dataset.label}: ${context.parsed.y.toLocaleString('de-DE')} €`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(0, 0, 0, 0.04)' },
                        ticks: { color: '#64748B', font: { size: 11 } }
                    },
                    y: {
                        grid: { color: 'rgba(0, 0, 0, 0.06)' },
                        ticks: {
                            color: '#0A192F',
                            font: { size: 11, weight: 'bold' },
                            callback: function(value) {
                                return value >= 1000000 ? `${(value/1000000).toFixed(1)} Mio. €` : `${Math.round(value/1000)}k €`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateCalculations() {
    const initialCapital = parseFloat(document.getElementById('sliderInitialCapital')?.value || 25000);
    const monthlyRate = parseFloat(document.getElementById('sliderMonthlyRate')?.value || 500);
    const years = parseInt(document.getElementById('sliderYears')?.value || 20, 10);
    const adjustForInflation = document.getElementById('inflationToggle')?.checked || false;

    // Calculate portfolio expected metrics
    let expectedReturn = 0.078;
    let portfolioVol = 0.138;
    let maxDrawdown = -0.28;
    let sharpeRatio = 0.42;

    if (currentStrategyId !== 'custom' && PRESET_STRATEGIES[currentStrategyId]) {
        const strat = PRESET_STRATEGIES[currentStrategyId];
        expectedReturn = strat.expectedReturn;
        portfolioVol = strat.volatility;
        maxDrawdown = strat.historicalMaxDrawdown;
        sharpeRatio = strat.sharpeRatio;
    } else {
        const metrics = calculatePortfolioMetrics(customWeights);
        expectedReturn = metrics.expectedReturn;
        portfolioVol = metrics.volatility;
        maxDrawdown = metrics.estimatedMaxDrawdown;
        sharpeRatio = metrics.sharpeRatio;
    }

    // Run wealth simulation
    const simulation = simulateWealthTrajectory({
        initialCapital,
        monthlyRate,
        years,
        nominalReturn: expectedReturn,
        volatility: portfolioVol,
        inflationRate: 0.02,
        adjustForInflation
    });

    // Update KPI Displays
    const finalExpected = simulation.expectedSeries[simulation.expectedSeries.length - 1];
    const finalDeposits = simulation.depositsSeries[simulation.depositsSeries.length - 1];
    const finalInterest = Math.max(0, finalExpected - finalDeposits);
    const multiplier = finalDeposits > 0 ? (finalExpected / finalDeposits).toFixed(2) + 'x' : '1.0x';

    const kpiEnd = document.getElementById('kpiFinalCapital');
    const kpiDep = document.getElementById('kpiDeposits');
    const kpiInt = document.getElementById('kpiProfit');
    const kpiMult = document.getElementById('kpiMultiplier');
    const kpiSh = document.getElementById('kpiSharpe');
    const kpiRk = document.getElementById('kpiRisk');
    const kpiDd = document.getElementById('kpiDrawdown');

    if (kpiEnd) kpiEnd.textContent = `${Math.round(finalExpected).toLocaleString('de-DE')} €`;
    if (kpiDep) kpiDep.textContent = `Eingezahlt: ${Math.round(finalDeposits).toLocaleString('de-DE')} €`;
    if (kpiInt) kpiInt.textContent = `+${Math.round(finalInterest).toLocaleString('de-DE')} €`;
    if (kpiMult) kpiMult.textContent = multiplier;
    if (kpiSh) kpiSh.textContent = `Sharpe Ratio: ${sharpeRatio.toFixed(2)}`;
    if (kpiRk) kpiRk.textContent = `${(portfolioVol * 100).toFixed(1)} % p.a.`;
    if (kpiDd) kpiDd.textContent = `Max. Drawdown: ca. ${(maxDrawdown * 100).toFixed(0)} %`;

    // Update Stress Test Table
    const tableExp = document.getElementById('tableExpReturn');
    const tableVol = document.getElementById('tableVolatility');
    const tableMaxDD = document.getElementById('tableMaxDrawdown');
    const tableSharpe = document.getElementById('tableSharpe');
    const tableC2008 = document.getElementById('tableCrisis2008');
    const tableCCorona = document.getElementById('tableCrisisCorona');

    if (tableExp) tableExp.textContent = `${(expectedReturn * 100).toFixed(2)} % p.a.`;
    if (tableVol) tableVol.textContent = `${(portfolioVol * 100).toFixed(2)} % p.a.`;
    if (tableMaxDD) tableMaxDD.textContent = `${(maxDrawdown * 100).toFixed(1)} %`;
    if (tableSharpe) tableSharpe.textContent = sharpeRatio.toFixed(2);
    if (tableC2008) tableC2008.textContent = `ca. ${(maxDrawdown * 100).toFixed(0)} %`;
    if (tableCCorona) tableCCorona.textContent = `ca. ${(maxDrawdown * 0.65 * 100).toFixed(0)} %`;

    // Update Donut Chart
    if (donutChartInstance) {
        let weights = currentStrategyId !== 'custom' ? PRESET_STRATEGIES[currentStrategyId].weights : customWeights;
        donutChartInstance.data.datasets[0].data = [
            Math.round((weights.world_equity || 0) * 100),
            Math.round((weights.emerging_equity || 0) * 100),
            Math.round((weights.bonds || 0) * 100),
            Math.round((weights.gold || 0) * 100),
            Math.round((weights.cash || 0) * 100)
        ];
        donutChartInstance.update();
    }

    // Update Trajectory Chart
    if (trajectoryChartInstance) {
        trajectoryChartInstance.data.labels = simulation.labels;
        trajectoryChartInstance.data.datasets = [
            {
                label: '90. Perzentil (Optimistisch)',
                data: simulation.optimisticSeries,
                borderColor: 'rgba(212, 175, 55, 0.5)',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                borderDash: [5, 5],
                fill: '+1',
                tension: 0.25,
                pointRadius: 0
            },
            {
                label: 'Erwarteter Vermögenswert',
                data: simulation.expectedSeries,
                borderColor: '#112D4E',
                backgroundColor: 'transparent',
                borderWidth: 3,
                tension: 0.2,
                pointRadius: 2,
                pointHoverRadius: 6
            },
            {
                label: '10. Perzentil (Pessimistisch)',
                data: simulation.pessimisticSeries,
                borderColor: 'rgba(239, 68, 68, 0.45)',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.25,
                pointRadius: 0
            },
            {
                label: 'Summe der Einzahlungen',
                data: simulation.depositsSeries,
                borderColor: '#94A3B8',
                backgroundColor: 'transparent',
                borderWidth: 2,
                pointRadius: 0
            }
        ];
        trajectoryChartInstance.update();
    }
}
