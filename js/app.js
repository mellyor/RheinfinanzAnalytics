/**
 * Rheinfinanz Analytics - App Controller & Interactive Visualizations
 * Unifies the 11 Core Assets into a direct Historical Return & Drawdown Analysis Engine and Strategy Lab.
 */

// Asset Color Palette for Charts and UI Accents
const ASSET_COLORS = {
    msci_world: '#112D4E',             // Rheinfinanz Navy Primary
    ftse_all_world: '#2563EB',         // Royal Blue
    msci_small_cap: '#7C3AED',         // Deep Purple
    msci_emerging_markets: '#DB2777',  // Vibrant Rose
    sp500: '#059669',                  // Emerald Green
    euro_geldmarkt: '#475569',         // Slate Gray
    gold_eur: '#D4AF37',               // Rheinfinanz Luxury Gold
    us_dividend_aristocrats: '#0D9488',// Teal Green
    bitcoin_eur: '#EA580C',            // Deep Amber
    global_portfolio_one: '#AA8825',   // Dr. Andreas Beck Dark Gold
    fixed_income_one: '#0284C7'        // Sky Blue
};

// Fallback catalog definition
const FALLBACK_CATALOG = [
    {
        id: 'msci_world',
        name: 'MSCI World',
        fullName: 'iShares Core MSCI World UCITS ETF (EUR)',
        ticker: 'EUNL.DE',
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
        category: 'Aktien Welt (All-Cap)',
        tag: 'Welt & EM',
        isin: 'IE00BK5BQT80',
        wkn: 'A2PKXG',
        ter: '0,22 % p.a.',
        currency: 'EUR',
        description: 'Breiteste Marktabdeckung: Deckt ca. 90-95 % der weltweiten investierbaren Marktkapitalisierung ab (inkl. Schwellenländer).',
        metrics: { latestPrice: 169.36, dayChangePct: -0.89, cagrPct: 12.60, volatilityPct: 15.93, maxDrawdownPct: -33.43, sharpeRatio: 0.63, return1Y: 20.89, return3Y: 19.82 }
    },
    {
        id: 'msci_small_cap',
        name: 'MSCI World Small Cap',
        fullName: 'iShares MSCI World Small Cap UCITS ETF (EUR)',
        ticker: 'IUSN.DE',
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
        fullName: 'S&P 500 Index (^GSPC)',
        ticker: '^GSPC',
        category: 'USA Leitmarkt',
        tag: 'US-Leitindex',
        isin: 'US78378X1072',
        wkn: 'A0AET0',
        ter: '0,00 % p.a. (Index)',
        currency: 'USD',
        description: 'Offizieller US-Leitindex der 500 wertvollsten Unternehmen (^GSPC). Weltweite Referenz für die 200-Tage-Linie (SMA 200) und Hebel-Strategien. Historie lückenlos ab 1970.',
        metrics: { latestPrice: 7712.57, dayChangePct: 0.28, cagrPct: 8.09, volatilityPct: 15.65, maxDrawdownPct: -56.78, sharpeRatio: 0.36, return1Y: 33.15, return3Y: 96.50, return5Y: 124.62, return10Y: 259.85 }
    },
    {
        id: 'euro_geldmarkt',
        name: 'Euro Geldmarkt ETF',
        fullName: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF (1C)',
        ticker: 'XEON.DE',
        category: 'Geldmarkt & Liquidität',
        tag: 'Risikofreier Zins',
        isin: 'LU0290358497',
        wkn: 'DBX0AN',
        ter: '0,10 % p.a.',
        currency: 'EUR',
        description: 'Bildet exakt den kurzfristigen Euro-Geldmarktzins (€STR der EZB) ab. Täglich verfügbare risikofreie Liquidität.',
        metrics: { latestPrice: 150.53, dayChangePct: 0.01, cagrPct: 0.69, volatilityPct: 0.65, maxDrawdownPct: -4.12, sharpeRatio: 0.12, return1Y: 3.85, return3Y: 3.65 }
    },
    {
        id: 'gold_eur',
        name: 'Gold in Euro',
        fullName: 'Xetra-Gold ETC (EUR je Gramm/Unze)',
        ticker: '4GLD.DE',
        category: 'Edelmetalle / Sachwert',
        tag: 'Krisenwährung',
        isin: 'DE00A0S9GB0',
        wkn: 'A0S9GB',
        ter: '0,00 % p.a.',
        currency: 'EUR',
        description: '100 % physisch in Tresoren der Deutschen Börse hinterlegtes Gold, gehandelt in Euro.',
        metrics: { latestPrice: 117.88, dayChangePct: 0.62, cagrPct: 9.83, volatilityPct: 14.28, maxDrawdownPct: -37.80, sharpeRatio: 0.51, return1Y: 38.50, return3Y: 21.20 }
    },
    {
        id: 'us_dividend_aristocrats',
        name: 'US Dividend Aristocrats',
        fullName: 'SPDR S&P US Dividend Aristocrats UCITS ETF (EUR)',
        ticker: 'SPYD.DE',
        category: 'Dividendenqualität',
        tag: 'Qualitätsdividenden',
        isin: 'IE00B6YX5D40',
        wkn: 'A1JKS0',
        ter: '0,35 % p.a.',
        currency: 'EUR',
        description: 'Investiert in US-Qualitätsunternehmen mit kontinuierlichen Dividendenerhöhungen seit über 20 aufeinanderfolgenden Jahren.',
        metrics: { latestPrice: 76.28, dayChangePct: -0.32, cagrPct: 11.84, volatilityPct: 14.10, maxDrawdownPct: -34.80, sharpeRatio: 0.66, return1Y: 24.20, return3Y: 14.50 }
    },
    {
        id: 'bitcoin_eur',
        name: 'Bitcoin in Euro',
        fullName: 'Bitcoin Spot (EUR)',
        ticker: 'BTC-EUR',
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
        category: 'Multi-Asset Antizyklik',
        tag: 'Dr. Andreas Beck',
        isin: 'AT0000A2B4T3',
        wkn: 'A2PT6U',
        ter: '0,70 % p.a.',
        currency: 'EUR',
        description: 'Wissenschaftliches Weltportfolio nach Dr. Andreas Beck. Hält eine dynamische Investitionsreserve zur antizyklischen Nutzung schwerer Marktkrisen.',
        metrics: { latestPrice: 183.48, dayChangePct: -0.45, cagrPct: 10.49, volatilityPct: 13.82, maxDrawdownPct: -21.40, sharpeRatio: 0.58, return1Y: 19.80, return3Y: 13.90 }
    },
    {
        id: 'fixed_income_one',
        name: 'Fixed Income One',
        fullName: 'Fixed Income One (Dr. Andreas Beck)',
        ticker: '0P0001R2ZE.F',
        category: 'Anleihen & Zinsstrategie',
        tag: 'Dr. Andreas Beck',
        isin: 'AT0000A347S9',
        wkn: 'A3EEYP',
        ter: '0,45 % p.a.',
        currency: 'EUR',
        description: 'Systematische defensive Anleihen- und Zinsstrategie nach Dr. Andreas Beck zur stabilen Ertragsgenerierung und Portfoliodämpfung.',
        metrics: { latestPrice: 105.25, dayChangePct: 0.05, cagrPct: 3.36, volatilityPct: 4.15, maxDrawdownPct: -4.80, sharpeRatio: 0.40, return1Y: 4.90, return3Y: 3.30 }
    }
];

// App State
const ASSET_CATALOG = (window.CATALOG_DATA && window.CATALOG_DATA.assets) ? window.CATALOG_DATA.assets : FALLBACK_CATALOG;

// Section 1: Chart & Matrix Table State (Default: MSCI World only!)
let activeBacktestAssets = new Set(['msci_world']);
let focusedAssetId = 'msci_world';
let currentPeriod = '5y'; // '1y', '3y', '5y', '10y', 'max', 'custom'
let customStartDate = null;
let customEndDate = null;
let currentChartMode = 'price'; // 'price' or 'drawdown'
let currentCurrency = 'EUR'; // 'EUR' or 'USD'
let _FX_CACHE_MAP = null;

function getFxRate(dateStr) {
    if (!window.HISTORY_DATA || !window.HISTORY_DATA.fx || !window.HISTORY_DATA.fx.EUR_USD) {
        return 1.1231;
    }
    if (!_FX_CACHE_MAP) {
        _FX_CACHE_MAP = new Map(window.HISTORY_DATA.fx.EUR_USD);
    }
    if (_FX_CACHE_MAP.has(dateStr)) {
        return _FX_CACHE_MAP.get(dateStr);
    }
    let d = new Date(dateStr);
    for (let i = 0; i < 7; i++) {
        d.setDate(d.getDate() - 1);
        const prevDt = d.toISOString().split('T')[0];
        if (_FX_CACHE_MAP.has(prevDt)) {
            return _FX_CACHE_MAP.get(prevDt);
        }
    }
    return 1.1231;
}
let historicalChartInstance = null;
let historyZoomController = null;

// Table Sorting State
let tableSortColumn = null;
let tableSortAsc = false;

// Section 2: Historical Portfolio & Savings Plan Backtest State
let trajectoryChartInstance = null;
let wealthZoomController = null;
let backtestPortfolioMode = 'preset'; // 'preset' or 'coresatellite'
let coreAssetId = 'msci_world';
let coreWeightPct = 80;
let satelliteItems = [
    { id: 'sat_1', assetId: 'gold_eur', weightPct: 10 },
    { id: 'sat_2', assetId: 'bitcoin_eur', weightPct: 10 }
];
let extraDepositsList = [];
let withdrawalsList = [];

// Hebel- & 200-SMA Trendfolge Strategie State
let leverageUnderlyingId = 'sp500';
let leverageFactor = 2.0;
let leverageTer = 0.0060; // 0.60 % p.a.
let leverageUseSma = true;
let leverageOrderFee = 1.00; // 1.00 € pro Switch

// SMA 200 Calculation Cache (Rolling calculation over full series from 1970)
const SMA200_CACHE = new Map();

function getSMA200Map(assetId) {
    if (SMA200_CACHE.has(assetId)) {
        return SMA200_CACHE.get(assetId);
    }
    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    const asset = historyData[assetId];
    const map = new Map();
    if (!asset || !asset.series || asset.series.length < 200) {
        SMA200_CACHE.set(assetId, map);
        return map;
    }
    const series = asset.series;
    let sum = 0;
    for (let i = 0; i < 200; i++) {
        sum += series[i][1];
    }
    map.set(series[199][0], sum / 200.0);

    for (let i = 200; i < series.length; i++) {
        sum += series[i][1] - series[i - 200][1];
        map.set(series[i][0], sum / 200.0);
    }
    SMA200_CACHE.set(assetId, map);
    return map;
}

// Multi-Asset Strategy Presets for Section 2 Backtest
const BACKTEST_STRATEGIES = {
    strat_beck_80_20: {
        id: 'strat_beck_80_20',
        name: 'Dr. Beck Portfolio (80 % GPO + 20 % Fixed Income)',
        weights: { global_portfolio_one: 0.80, fixed_income_one: 0.20 },
        description: 'Wissenschaftliches Weltportfolio mit antizyklischer Eigenkapitalkomponente (GPO) kombiniert mit defensivem Anleihenanker (FIO).'
    },
    strat_world_100: {
        id: 'strat_world_100',
        name: '100 % All-World Aktien (90 % MSCI World + 10 % EM)',
        weights: { msci_world: 0.90, msci_emerging_markets: 0.10 },
        description: 'Vollständige Marktabdeckung der globalen Aktienmärkte nach Marktkapitalisierung.'
    },
    strat_70_30: {
        id: 'strat_70_30',
        name: '70 / 30 Welt-Portfolio (70 % MSCI World + 30 % EM)',
        weights: { msci_world: 0.70, msci_emerging_markets: 0.30 },
        description: 'BIP-gewichteter All-World Klassiker nach Dr. Gerd Kommer mit 30 % Schwellenländer-Anteil.'
    },
    strat_60_40: {
        id: 'strat_60_40',
        name: '60 / 40 Klassiker (60 % MSCI World + 40 % Fixed Income)',
        weights: { msci_world: 0.60, fixed_income_one: 0.40 },
        description: 'Klassisches institutionelles Portfolio zur Risikoglättung mit 40 % Renten-/Zinsanteil.'
    },
    strat_allweather: {
        id: 'strat_allweather',
        name: 'Allwetter-Portfolio (35 % World, 5 % EM, 45 % Bonds, 10 % Gold, 5 % Cash)',
        weights: { msci_world: 0.35, msci_emerging_markets: 0.05, fixed_income_one: 0.45, gold_eur: 0.10, euro_geldmarkt: 0.05 },
        description: 'Breit diversifiziert über Aktien, defensive Anleihen, Sachwert Gold und Geldmarkt.'
    }
};

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    initMainViewTabs();
    initIndexCards();
    initHistoricalComparisonModule();
    renderInstrumentDetails(getAssetById(focusedAssetId));
    initBacktestModule();
});

function initMainViewTabs() {
    const tabs = document.querySelectorAll('.main-view-tab');
    const secHistorical = document.getElementById('historical-analytics');
    const secStrategy = document.getElementById('strategy-lab');

    function switchView(targetId, updateHash = true) {
        tabs.forEach(t => {
            const isActive = t.getAttribute('data-target') === targetId;
            t.classList.toggle('active', isActive);
        });

        if (targetId === 'historical-analytics') {
            if (secHistorical) secHistorical.style.display = 'block';
            if (secStrategy) secStrategy.style.display = 'none';
            if (updateHash) history.replaceState(null, '', '#historical-analytics');
            if (historicalChartInstance) historicalChartInstance.resize();
        } else {
            if (secHistorical) secHistorical.style.display = 'none';
            if (secStrategy) secStrategy.style.display = 'block';
            if (updateHash) history.replaceState(null, '', '#strategy-lab');
            if (trajectoryChartInstance) trajectoryChartInstance.resize();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            switchView(target);
        });
    });

    const headerLinks = document.querySelectorAll('.header-actions .nav-link-btn');
    headerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href').replace('#', '');
            switchView(href);
        });
    });

    // Check initial hash on load
    const hash = window.location.hash.replace('#', '');
    if (hash === 'strategy-lab') {
        switchView('strategy-lab', false);
    } else {
        switchView('historical-analytics', false);
    }
}

function getAssetById(id) {
    return ASSET_CATALOG.find(a => a.id === id) || ASSET_CATALOG[0];
}

/* ==========================================================================
   Section 1: 11 Interactive Toggle Cards & Historical Chart
   ========================================================================== */

function initIndexCards() {
    const grid = document.getElementById('indicesGrid');
    if (!grid) return;

    grid.innerHTML = '';
    ASSET_CATALOG.forEach(item => {
        const metrics = item.metrics || {};
        const isPositive = (metrics.dayChangePct || 0) >= 0;
        const changeStr = `${isPositive ? '+' : ''}${(metrics.dayChangePct || 0).toFixed(2).replace('.', ',')} %`;
        
        let priceStr = `${(metrics.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.currency === 'USD' ? '$' : '€'}`;
        if (item.id === 'msci_small_cap') {
            priceStr = `${(metrics.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} €`;
        }

        const isActive = activeBacktestAssets.has(item.id);
        const color = ASSET_COLORS[item.id] || '#112D4E';

        const card = document.createElement('div');
        card.className = `index-card ${isActive ? 'active' : ''}`;
        card.id = `card-${item.id}`;
        card.style.setProperty('--card-accent-color', color);

        card.innerHTML = `
            <div class="index-header">
                <div>
                    <div class="index-name">${item.name}</div>
                    <div class="index-region">${item.category}</div>
                </div>
                <div class="index-card-toggle" id="toggle-badge-${item.id}">
                    ${isActive ? '✓ Im Chart' : '+ Dazuschalten'}
                </div>
            </div>
            <div class="index-val-row" style="margin-top: 4px;">
                <span class="index-value">${priceStr}</span>
                <span class="index-change-pill ${isPositive ? 'pill-up' : 'pill-down'}">${changeStr}</span>
            </div>
            <div style="margin-top: 8px; font-size: 0.72rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                <span style="font-weight: 600; color: var(--gold-dark);">${item.tag}</span>
                <span>CAGR: <strong style="color: var(--navy-dark);">${metrics.cagrPct ? metrics.cagrPct + '%' : '-'}</strong></span>
            </div>
        `;

        card.addEventListener('click', () => {
            toggleAsset(item.id);
        });

        grid.appendChild(card);
    });

    updateSelectionCounter();
}

function toggleAsset(assetId) {
    if (activeBacktestAssets.has(assetId)) {
        if (activeBacktestAssets.size > 1) {
            activeBacktestAssets.delete(assetId);
            if (focusedAssetId === assetId) {
                focusedAssetId = Array.from(activeBacktestAssets)[0];
            }
        } else {
            focusedAssetId = assetId;
        }
    } else {
        activeBacktestAssets.add(assetId);
        focusedAssetId = assetId;
    }

    syncCardStates();
    updateSelectionCounter();
    renderInstrumentDetails(getAssetById(focusedAssetId));
    updateHistoricalChart();
}

function syncCardStates() {
    ASSET_CATALOG.forEach(item => {
        const card = document.getElementById(`card-${item.id}`);
        const badge = document.getElementById(`toggle-badge-${item.id}`);
        const isActive = activeBacktestAssets.has(item.id);

        if (card) {
            if (isActive) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        }
        if (badge) {
            badge.textContent = isActive ? '✓ Im Chart' : '+ Dazuschalten';
        }
    });

}

function updateSelectionCounter() {
    const counter = document.getElementById('selectionCounter');
    const badge = document.getElementById('indicesCountBadge');
    const count = activeBacktestAssets.size;
    if (counter) {
        if (currentCurrency === 'PCT') {
            counter.innerHTML = `${count} von 11 Indizes im Chart aktiv <span style="font-size: 0.76rem; font-weight: 600; color: var(--gold-dark); margin-left: 6px;">• Vergleichsbasis: Prozentuale Rendite (Startet bei 0,0 %)</span>`;
        } else {
            const curSymbol = currentCurrency === 'USD' ? '$' : '€';
            counter.innerHTML = `${count} von 11 Indizes im Chart aktiv <span style="font-size: 0.76rem; font-weight: 600; color: var(--gold-dark); margin-left: 6px;">• Vergleichsbasis: 1.000 ${curSymbol} Startkapital (Startet bei 0 ${curSymbol})</span>`;
        }
    }
    if (badge) {
        badge.textContent = `${count} im Chart aktiv`;
    }
}

function updateModeButtonLabels() {
    const btnModePrice = document.getElementById('btnModePrice');
    if (!btnModePrice) return;
    if (currentCurrency === 'PCT') {
        btnModePrice.textContent = 'Rendite in % (Start 0 %)';
        btnModePrice.title = 'Prozentuale Gesamtrendite (Startet bei 0,0 %)';
    } else {
        const curSymbol = currentCurrency === 'USD' ? '$' : '€';
        btnModePrice.textContent = `Wertzuwachs in ${curSymbol} (Start 0 ${curSymbol})`;
        btnModePrice.title = `Wertentwicklung bezogen auf 1.000 ${curSymbol} Startinvestition (Startet bei 0 ${curSymbol})`;
    }
}

function renderInstrumentDetails(item) {
    const box = document.getElementById('instrumentDetailsBox');
    if (!box) return;

    const m = item.metrics || {};
    const eurPrice = m.latestPrice || 0;
    let priceFormatted = '';
    if (currentCurrency === 'USD') {
        const rate = getFxRate(m.endDate || '2026-10-21');
        const usdPrice = eurPrice * rate;
        priceFormatted = `${usdPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $ (${eurPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €)`;
    } else {
        priceFormatted = `${eurPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`;
    }
    const color = ASSET_COLORS[item.id] || '#112D4E';

    box.innerHTML = `
        <div class="inst-metric-item" style="grid-column: 1 / -1; display: flex; flex-direction: row; justify-content: space-between; align-items: center; border-bottom: 1.5px solid var(--border-subtle); padding-bottom: 8px; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="width: 12px; height: 12px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
                <strong style="font-size: 1.05rem; color: var(--navy-dark); font-family: var(--font-heading);">${item.fullName || item.name}</strong>
                <span style="font-size: 0.72rem; background: rgba(212, 175, 55, 0.15); border: 1px solid var(--gold); color: var(--gold-dark); padding: 2px 7px; border-radius: 4px; font-weight: 700;">${item.tag}</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">Aktueller Detail-Steckbrief (Total Return)</span>
        </div>
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
            <span class="inst-metric-val">${(item.id !== 'euro_geldmarkt' && m.sharpeRatio !== undefined && m.sharpeRatio !== null) ? m.sharpeRatio : '—'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Sortino Ratio</span>
            <span class="inst-metric-val" style="color: var(--gold-dark);">${(item.id !== 'euro_geldmarkt' && m.sortinoRatio !== undefined && m.sortinoRatio !== null) ? m.sortinoRatio : '—'}</span>
        </div>
        <div class="inst-metric-item" style="grid-column: 1 / -1; margin-top: 4px; border-top: 1px dashed var(--border-subtle); padding-top: 8px;">
            <span class="inst-metric-label">Profil & Anlagestrategie</span>
            <p style="font-size: 0.82rem; color: var(--text-secondary); margin: 3px 0 0 0; line-height: 1.45;">
                ${item.description || ''}
            </p>
        </div>
    `;
}

function initHistoricalComparisonModule() {
    initIndicesCollapsible();
    initTimeframePills();
    initCustomDateControls();
    initModePills();
    initCurrencyPills();
    initQuickActionButtons();
    initMatrixCollapsible();
    initRiskToggle();
    initTableSorting();
    renderHistoricalTable();
    initHistoricalChart();
}

function initIndicesCollapsible() {
    const btnToggle = document.getElementById('btnToggleIndices');
    const content = document.getElementById('indicesCollapsibleContent');
    const wrap = document.getElementById('indicesCollapsibleWrapper');
    const toggleText = document.getElementById('indicesToggleText');
    const chevron = document.getElementById('indicesChevron');

    if (btnToggle && content && wrap) {
        btnToggle.addEventListener('click', () => {
            const isOpen = wrap.classList.toggle('open');
            content.style.display = isOpen ? 'block' : 'none';
            if (toggleText) {
                toggleText.textContent = isOpen ? 'Indizes einklappen' : 'Indizes auswählen / einblenden';
            }
            if (chevron) {
                chevron.textContent = isOpen ? '▲' : '▼';
            }
        });
    }
}

function initMatrixCollapsible() {
    const btnToggle = document.getElementById('btnToggleMatrix');
    const matrixContent = document.getElementById('matrixCollapsibleContent');
    const matrixWrap = document.getElementById('matrixCollapsibleWrapper');
    const toggleText = document.getElementById('matrixToggleText');

    if (btnToggle && matrixContent && matrixWrap) {
        btnToggle.addEventListener('click', () => {
            const isOpen = matrixWrap.classList.toggle('open');
            matrixContent.style.display = isOpen ? 'block' : 'none';
            if (toggleText) {
                toggleText.textContent = isOpen ? 'Matrix ausblenden' : 'Matrix einblenden';
            }
        });
    }
}

function initQuickActionButtons() {
    // 1. Zurücksetzen (MSCI World)
    const btnReset = document.getElementById('btnResetMsci');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            activeBacktestAssets = new Set(['msci_world']);
            focusedAssetId = 'msci_world';
            syncCardStates();
            updateSelectionCounter();
            renderInstrumentDetails(getAssetById(focusedAssetId));
            updateHistoricalChart();
        });
    }

    // 2. Alle Indizes
    const btnAll = document.getElementById('btnSelectAll');
    if (btnAll) {
        btnAll.addEventListener('click', () => {
            activeBacktestAssets = new Set(ASSET_CATALOG.map(a => a.id));
            syncCardStates();
            updateSelectionCounter();
            updateHistoricalChart();
        });
    }
}

function initTimeframePills() {
    const pills = document.querySelectorAll('.timeframe-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentPeriod = pill.getAttribute('data-period');
            
            // Sync date inputs
            syncCustomDateInputsForPeriod(currentPeriod);
            updateHistoricalChart();
        });
    });

    // Default: Set date inputs to match 5y
    syncCustomDateInputsForPeriod('5y');
}

function syncCustomDateInputsForPeriod(period) {
    const inpStart = document.getElementById('inputCustomStart');
    const inpEnd = document.getElementById('inputCustomEnd');
    if (!inpStart || !inpEnd) return;

    const now = new Date();
    const endStr = now.toISOString().split('T')[0];
    let startStr = '2019-10-20';

    if (period === '1y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 1); startStr = d.toISOString().split('T')[0];
    } else if (period === '3y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 3); startStr = d.toISOString().split('T')[0];
    } else if (period === '5y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 5); startStr = d.toISOString().split('T')[0];
    } else if (period === '10y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 10); startStr = d.toISOString().split('T')[0];
    } else if (period === 'max') {
        startStr = '1970-01-02';
    }

    inpStart.value = startStr;
    inpEnd.value = endStr;
}

function initCustomDateControls() {
    const btnApply = document.getElementById('btnApplyCustomDate');
    const inpStart = document.getElementById('inputCustomStart');
    const inpEnd = document.getElementById('inputCustomEnd');

    if (btnApply && inpStart && inpEnd) {
        btnApply.addEventListener('click', () => {
            const startVal = inpStart.value;
            const endVal = inpEnd.value;

            if (!startVal || !endVal) {
                alert('Bitte geben Sie ein gültiges Start- und Enddatum ein.');
                return;
            }

            if (startVal > endVal) {
                alert('Das Startdatum muss vor dem Enddatum liegen.');
                return;
            }

            // Unset active timeframe pill
            document.querySelectorAll('.timeframe-pill').forEach(p => p.classList.remove('active'));

            currentPeriod = 'custom';
            customStartDate = startVal;
            customEndDate = endVal;

            updateHistoricalChart();
        });
    }
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

function initCurrencyPills() {
    const pills = document.querySelectorAll('.currency-pill');
    const btnModePrice = document.getElementById('btnModePrice');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentCurrency = pill.getAttribute('data-curr'); // 'EUR' or 'USD'

            // If user clicked currency while in drawdown mode, switch to price mode to show the currency chart
            if (currentChartMode !== 'price') {
                const modePills = document.querySelectorAll('.mode-pill');
                modePills.forEach(p => p.classList.remove('active'));
                if (btnModePrice) btnModePrice.classList.add('active');
                currentChartMode = 'price';
            }

            updateModeButtonLabels();
            updateSelectionCounter();
            updateHistoricalChart();
            renderInstrumentDetails(getAssetById(focusedAssetId));
        });
    });

}

let showRiskMetrics = false;

function initRiskToggle() {
    const btn = document.getElementById('btnToggleRiskCols');
    const text = document.getElementById('riskToggleText');
    const badge = document.getElementById('matrixColCountBadge');
    if (!btn) return;

    btn.addEventListener('click', () => {
        showRiskMetrics = !showRiskMetrics;
        btn.classList.toggle('active', showRiskMetrics);
        if (text) {
            text.textContent = showRiskMetrics ? 'Sharpe & Sortino ausblenden' : 'Sharpe & Sortino Ratio einblenden';
        }
        if (badge) {
            badge.textContent = showRiskMetrics ? '12 Spalten • Sortierbar' : '10 Spalten • Sortierbar';
        }

        const riskCols = document.querySelectorAll('.risk-col');
        riskCols.forEach(col => {
            col.style.display = showRiskMetrics ? 'table-cell' : 'none';
        });
    });

}

function initTableSorting() {
    const headers = document.querySelectorAll('#historicalComparisonTable th.sortable-th');
    headers.forEach(th => {
        th.addEventListener('click', () => {
            const col = th.getAttribute('data-sort');
            if (tableSortColumn === col) {
                tableSortAsc = !tableSortAsc;
            } else {
                tableSortColumn = col;
                tableSortAsc = false; // Descending by default for metrics
            }
            renderHistoricalTable();
        });
    });

}

function renderHistoricalTable() {
    const tbody = document.getElementById('historicalComparisonTableBody');
    if (!tbody) return;

    // Update header icons and active classes
    const headers = document.querySelectorAll('#historicalComparisonTable th.sortable-th');
    headers.forEach(th => {
        const col = th.getAttribute('data-sort');
        const iconSpan = th.querySelector('.sort-icon');
        if (col === tableSortColumn) {
            th.classList.add('active-sort');
            if (iconSpan) iconSpan.textContent = tableSortAsc ? ' ▲' : ' ▼';
        } else {
            th.classList.remove('active-sort');
            if (iconSpan) iconSpan.textContent = '';
        }
    });

    // Create sorted copy
    let items = [...ASSET_CATALOG];
    if (tableSortColumn) {
        items.sort((a, b) => {
            let valA, valB;
            if (tableSortColumn === 'name' || tableSortColumn === 'category') {
                valA = a[tableSortColumn] || '';
                valB = b[tableSortColumn] || '';
                return tableSortAsc ? valA.localeCompare(valB, 'de') : valB.localeCompare(valA, 'de');
            } else {
                valA = a.metrics ? a.metrics[tableSortColumn] : null;
                valB = b.metrics ? b.metrics[tableSortColumn] : null;
                if (valA === null || valA === undefined) return 1;
                if (valB === null || valB === undefined) return -1;
                return tableSortAsc ? valA - valB : valB - valA;
            }
        });
    }

    tbody.innerHTML = '';
    const riskStyle = showRiskMetrics ? 'display: table-cell;' : 'display: none;';

    items.forEach(item => {
        const m = item.metrics || {};

        const ret1YStr = (m.return1Y !== null && m.return1Y !== undefined) ? `${m.return1Y >= 0 ? '+' : ''}${m.return1Y.toFixed(2).replace('.', ',')} %` : '-';
        const ret3YStr = (m.return3Y !== null && m.return3Y !== undefined) ? `${m.return3Y >= 0 ? '+' : ''}${m.return3Y.toFixed(2).replace('.', ',')} %` : '-';
        const ret5YStr = (m.return5Y !== null && m.return5Y !== undefined) ? `${m.return5Y >= 0 ? '+' : ''}${m.return5Y.toFixed(2).replace('.', ',')} %` : '-';
        const ret10YStr = (m.return10Y !== null && m.return10Y !== undefined) ? `${m.return10Y >= 0 ? '+' : ''}${m.return10Y.toFixed(2).replace('.', ',')} %` : '-';

        const totRetStr = (m.totalReturnPct !== null && m.totalReturnPct !== undefined) ? `+${m.totalReturnPct.toFixed(1).replace('.', ',')} %` : '-';
        const cagrStr = (m.cagrPct !== null && m.cagrPct !== undefined) ? `+${m.cagrPct.toFixed(2).replace('.', ',')} %` : '-';
        const volStr = (m.volatilityPct !== null && m.volatilityPct !== undefined) ? `${m.volatilityPct.toFixed(2).replace('.', ',')} %` : '-';
        const ddStr = (m.maxDrawdownPct !== null && m.maxDrawdownPct !== undefined) ? `${m.maxDrawdownPct.toFixed(2).replace('.', ',')} %` : '-';
        const isGeldmarkt = item.id === 'euro_geldmarkt';
        const sharpeStr = (!isGeldmarkt && m.sharpeRatio !== null && m.sharpeRatio !== undefined) ? m.sharpeRatio.toFixed(2) : '—';
        const sortinoStr = (!isGeldmarkt && m.sortinoRatio !== null && m.sortinoRatio !== undefined) ? m.sortinoRatio.toFixed(2) : '—';

        const color = ASSET_COLORS[item.id] || '#112D4E';

        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.title = 'Klicken, um diesen Index im Chart ein- oder auszublenden';
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <span style="width: 7px; height: 7px; border-radius: 50%; background: ${color}; flex-shrink: 0;"></span>
                    <span style="font-weight: 700; color: var(--navy-dark); font-size: 0.79rem; white-space: nowrap;">${item.name}</span>
                </div>
            </td>
            <td><span style="font-size: 0.68rem; background: #F1F5F9; padding: 2px 5px; border-radius: 3px; white-space: nowrap;">${item.category}</span></td>
            <td class="num-col ${m.return1Y !== null && m.return1Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret1YStr}</td>
            <td class="num-col ${m.return3Y !== null && m.return3Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret3YStr}</td>
            <td class="num-col ${m.return5Y !== null && m.return5Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret5YStr}</td>
            <td class="num-col ${m.return10Y !== null && m.return10Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret10YStr}</td>
            <td class="num-col metric-positive" style="font-weight: 700;">${totRetStr}</td>
            <td class="num-col" style="font-weight: 700; color: var(--navy-primary);">${cagrStr}</td>
            <td class="num-col">${volStr}</td>
            <td class="num-col metric-negative">${ddStr}</td>
            <td class="num-col risk-col" style="${riskStyle} font-weight: 600;">${sharpeStr}</td>
            <td class="num-col risk-col" style="${riskStyle} font-weight: 700; color: var(--gold-dark);">${sortinoStr}</td>
        `;

        tr.addEventListener('click', () => {
            toggleAsset(item.id);
        });

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
            layout: {
                padding: { top: 14, right: 14, bottom: 4, left: 4 }
            },
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
                    itemSort: function(a, b) {
                        // Dynamically sort tooltips descending by value at mouse hover position:
                        // Top performer / highest chart line is always first!
                        const valA = (a.parsed && a.parsed.y !== null && !isNaN(a.parsed.y)) ? a.parsed.y : -Infinity;
                        const valB = (b.parsed && b.parsed.y !== null && !isNaN(b.parsed.y)) ? b.parsed.y : -Infinity;
                        return valB - valA;
                    },
                    callbacks: {
                        label: function(context) {
                            const val = context.parsed ? context.parsed.y : null;
                            if (val === null || isNaN(val)) return null;

                            if (currentChartMode === 'drawdown') {
                                return ` ${context.dataset.label}: ${val.toFixed(2)} % Drawdown`;
                            }

                            if (currentCurrency === 'PCT') {
                                const sign = val >= 0 ? '+' : '';
                                return ` ${context.dataset.label}: ${sign}${val.toFixed(2).replace('.', ',')} %`;
                            } else {
                                const cur = (currentCurrency === 'USD' || context.dataset.currency === 'USD') ? '$' : '€';
                                const sign = val >= 0 ? '+' : '';
                                return ` ${context.dataset.label}: ${sign}${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${cur}`;
                            }
                        },
                        footer: function(tooltipItems) {
                            if (currentChartMode === 'price') {
                                if (currentCurrency === 'PCT') {
                                    return 'Basis: Prozentuale Gesamtrendite (Startet bei 0,0 %)';
                                } else {
                                    const cur = currentCurrency === 'USD' ? '$' : '€';
                                    return `Basis: 1.000 ${cur} Startkapital (Startet bei 0 ${cur})`;
                                }
                            }
                            return '';
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
                    grid: {
                        color: function(context) {
                            if (context.tick && context.tick.value === 0) {
                                return 'rgba(10, 25, 47, 0.35)'; // Darker zero baseline
                            }
                            return 'rgba(0, 0, 0, 0.06)';
                        },
                        lineWidth: function(context) {
                            if (context.tick && context.tick.value === 0) {
                                return 1.8;
                            }
                            return 1.0;
                        }
                    },
                    ticks: {
                        color: '#0A192F',
                        font: { size: 11, weight: 'bold' },
                        callback: function(value) {
                            if (currentChartMode === 'drawdown') return `${value} %`;
                            if (currentCurrency === 'PCT') {
                                const sign = value > 0 ? '+' : '';
                                return `${sign}${value} %`;
                            } else {
                                const cur = currentCurrency === 'USD' ? '$' : '€';
                                const sign = value > 0 ? '+' : '';
                                return `${sign}${value.toLocaleString('de-DE')} ${cur}`;
                            }
                        }
                    }
                }
            }
        }
    });

    historyZoomController = attachChartDragZoom(() => historicalChartInstance, 'historicalComparisonChart', 'historicalChartContainer');

    updateHistoricalChart();
}

function updateHistoricalChart() {
    if (!historicalChartInstance) return;

    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    if (!historyData || Object.keys(historyData).length === 0) return;

    const now = new Date();
    let targetStartDate = '2019-10-20';
    let targetEndDate = now.toISOString().split('T')[0];

    if (currentPeriod === 'custom' && customStartDate && customEndDate) {
        targetStartDate = customStartDate;
        targetEndDate = customEndDate;
    } else if (currentPeriod === '1y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 1); targetStartDate = d.toISOString().split('T')[0];
    } else if (currentPeriod === '3y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 3); targetStartDate = d.toISOString().split('T')[0];
    } else if (currentPeriod === '5y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 5); targetStartDate = d.toISOString().split('T')[0];
    } else if (currentPeriod === '10y') {
        const d = new Date(); d.setFullYear(now.getFullYear() - 10); targetStartDate = d.toISOString().split('T')[0];
    } else if (currentPeriod === 'max') {
        targetStartDate = '1970-01-01';
    }

    // Collect all dates from active assets between targetStartDate and targetEndDate
    const dateSet = new Set();
    const activeSeriesMap = {};

    activeBacktestAssets.forEach(assetId => {
        const asset = historyData[assetId];
        if (asset && asset.series) {
            const filtered = asset.series.filter(pt => pt[0] >= targetStartDate && pt[0] <= targetEndDate);
            if (filtered.length > 0) {
                activeSeriesMap[assetId] = filtered;
                filtered.forEach(pt => dateSet.add(pt[0]));
            }
        }
    });

    const sortedDates = Array.from(dateSet).sort();
    if (sortedDates.length === 0) return;

    // Downsample if more than 280 dates to ensure instant 60fps rendering
    const step = Math.max(1, Math.floor(sortedDates.length / 280));
    const sampledDates = [];
    for (let i = 0; i < sortedDates.length; i += step) {
        sampledDates.push(sortedDates[i]);
    }
    if (sampledDates[sampledDates.length - 1] !== sortedDates[sortedDates.length - 1]) {
        sampledDates.push(sortedDates[sortedDates.length - 1]);
    }

    const datasets = [];
    const isSingleAsset = activeBacktestAssets.size === 1;

    activeBacktestAssets.forEach(assetId => {
        const asset = historyData[assetId];
        const series = activeSeriesMap[assetId];
        if (!asset || !series || series.length === 0) return;

        const priceMap = new Map();
        series.forEach(pt => priceMap.set(pt[0], pt[1]));

        const firstDate = series[0][0];
        const isUsdAsset = (asset.currency === 'USD');
        const startRate = (currentCurrency === 'USD')
            ? (isUsdAsset ? 1.0 : getFxRate(firstDate))
            : (isUsdAsset ? (1.0 / getFxRate(firstDate)) : 1.0);
        const startVal = series[0][1] * startRate;

        let peak = -Infinity;
        let lastKnownRaw = null;

        const dataPoints = [];

        sampledDates.forEach(dt => {
            if (dt < firstDate) {
                dataPoints.push(null);
                return;
            }

            if (priceMap.has(dt)) {
                lastKnownRaw = priceMap.get(dt);
            } else if (lastKnownRaw === null) {
                lastKnownRaw = series[0][1];
            }

            const rate = (currentCurrency === 'USD')
                ? (isUsdAsset ? 1.0 : getFxRate(dt))
                : (isUsdAsset ? (1.0 / getFxRate(dt)) : 1.0);
            const curVal = lastKnownRaw * rate;
            if (curVal > peak) peak = curVal;

            if (currentChartMode === 'drawdown') {
                const dd = peak > 0 ? ((curVal - peak) / peak) * 100 : 0;
                dataPoints.push(Math.round(dd * 100) / 100);
            } else if (currentCurrency === 'PCT') {
                const perf = startVal > 0 ? ((curVal - startVal) / startVal) : 0;
                dataPoints.push(Math.round(perf * 10000) / 100);
            } else {
                // Performance / Wertzuwachs in € or $ based on 1.000 starting capital (starts at 0 €/$)
                const perf = startVal > 0 ? ((curVal - startVal) / startVal) : 0;
                const gain = perf * 1000.0;
                dataPoints.push(Math.round(gain * 100) / 100);
            }
        });

        const color = ASSET_COLORS[assetId] || '#112D4E';
        let bgColor = 'transparent';
        let fill = false;
        if (isSingleAsset) {
            if (currentChartMode === 'drawdown') {
                bgColor = 'rgba(239, 68, 68, 0.08)';
                fill = true;
            } else {
                bgColor = 'rgba(17, 45, 78, 0.06)';
                fill = true;
            }
        }

        datasets.push({
            label: asset.name,
            data: dataPoints,
            currency: currentCurrency,
            borderColor: color,
            backgroundColor: bgColor,
            fill: fill,
            borderWidth: isSingleAsset ? 3.0 : 2.2,
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.15,
            spanGaps: false
        });
    });

    if (historyZoomController) {
        historyZoomController.reset(true);
    }

    historicalChartInstance.data.labels = sampledDates;
    historicalChartInstance.data.datasets = datasets;
    historicalChartInstance.update();

    updateModeButtonLabels();
    updateSelectionCounter();
}

/* ==========================================================================
   Section 2: Persönlicher historischer Sparplan- & Portfolio-Backtest
   ========================================================================== */

let backtestEventsVisibility = {
    switches: true,
    deposits: true,
    savings: true
};
let backtestActiveEventDetails = new Map();
let backtestSwitchDataVariants = { normalBuy: null, hoverBuy: null, normalSell: null, hoverSell: null };

function initBacktestModule() {
    initBacktestInputs();
    initCoreSatelliteControls();
    initBacktestChartSizeControls();
    initBacktestEventControls();
    initBacktestChart();
    updateBacktestAssetBadge();
    runHistoricalBacktest();
}

let currentHighlightedCategory = null;

function highlightEventCategory(cat) {
    if (!trajectoryChartInstance || !trajectoryChartInstance.data || !trajectoryChartInstance.data.datasets) return;

    trajectoryChartInstance.data.datasets.forEach((ds, idx) => {
        if (!ds.eventCategory) return;
        const meta = trajectoryChartInstance.getDatasetMeta(idx);

        let targetRadius = 0;
        let targetBorderWidth = 1.5;

        if (cat === null) {
            // Restore normal visibility and default sizes based on user's active toggles
            const isVisible = !!backtestEventsVisibility[ds.eventCategory];
            ds.hidden = !isVisible;
            if (meta) meta.hidden = !isVisible;

            if (ds.eventCategory === 'switches') {
                targetRadius = 9.0;
                targetBorderWidth = 2.5;
                // Restore tightly attached normal positions for switches
                if (ds.id === 'event_switches_buy' && backtestSwitchDataVariants.normalBuy) {
                    ds.data = backtestSwitchDataVariants.normalBuy;
                }
                if (ds.id === 'event_switches_sell' && backtestSwitchDataVariants.normalSell) {
                    ds.data = backtestSwitchDataVariants.normalSell;
                }
            } else if (ds.eventCategory === 'deposits') {
                targetRadius = 7.5;
                targetBorderWidth = 2.0;
            } else if (ds.eventCategory === 'savings') {
                targetRadius = 3.5;
                targetBorderWidth = 1.5;
            }
        } else if (ds.eventCategory === cat) {
            // SHOW ONLY the hovered event category, prominently highlighted!
            ds.hidden = false;
            if (meta) meta.hidden = false;

            if (ds.eventCategory === 'switches') {
                targetRadius = 14.5;
                targetBorderWidth = 3.5;
                // Only on hover: expand overlapping switch pairs so they do not obscure each other!
                if (ds.id === 'event_switches_buy' && backtestSwitchDataVariants.hoverBuy) {
                    ds.data = backtestSwitchDataVariants.hoverBuy;
                }
                if (ds.id === 'event_switches_sell' && backtestSwitchDataVariants.hoverSell) {
                    ds.data = backtestSwitchDataVariants.hoverSell;
                }
            } else if (ds.eventCategory === 'deposits') {
                targetRadius = 13.0;
                targetBorderWidth = 3.0;
            } else if (ds.eventCategory === 'savings') {
                targetRadius = 7.0;
                targetBorderWidth = 2.0;
            }
        } else {
            // HIDE ALL OTHER EVENT CATEGORIES COMPLETELY WHILE HOVERING!
            ds.hidden = true;
            if (meta) meta.hidden = true;
            targetRadius = 0;
            targetBorderWidth = 0;

            if (ds.eventCategory === 'switches') {
                if (ds.id === 'event_switches_buy' && backtestSwitchDataVariants.normalBuy) {
                    ds.data = backtestSwitchDataVariants.normalBuy;
                }
                if (ds.id === 'event_switches_sell' && backtestSwitchDataVariants.normalSell) {
                    ds.data = backtestSwitchDataVariants.normalSell;
                }
            }
        }

        ds.pointRadius = targetRadius;
        ds.radius = targetRadius;
        ds.pointBorderWidth = targetBorderWidth;
        ds.borderWidth = targetBorderWidth;

        if (meta && meta.data) {
            meta.data.forEach(pt => {
                if (pt && pt.options) {
                    pt.options.radius = targetRadius;
                    pt.options.borderWidth = targetBorderWidth;
                }
            });
        }
    });

    trajectoryChartInstance.update('none');
}

/**
 * Universal Drag-to-Zoom Engine for Financial Charts
 * Allows users to click and drag across any date range (left-to-right or right-to-left)
 * to zoom in horizontally with automatic Y-axis fitting.
 * Includes a floating 'Zoom aufheben' reset button and double-click reset support.
 */
function attachChartDragZoom(getChart, canvasId, containerId) {
    const canvas = document.getElementById(canvasId);
    const container = document.getElementById(containerId);
    if (!canvas || !container) return null;

    let selectionBox = container.querySelector('.chart-drag-selection');
    if (!selectionBox) {
        selectionBox = document.createElement('div');
        selectionBox.className = 'chart-drag-selection';
        container.appendChild(selectionBox);
    }

    let btnReset = container.querySelector('.btn-reset-zoom');
    if (!btnReset) {
        btnReset = document.createElement('button');
        btnReset.type = 'button';
        btnReset.className = 'btn-reset-zoom';
        btnReset.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"/>
            </svg>
            <span>Zoom aufheben</span>
        `;
        btnReset.title = 'Zoom aufheben und vollständige Historie anzeigen (auch per Doppelklick)';
        container.appendChild(btnReset);
    }

    let isDragging = false;
    let dragStartX = 0;
    let isZoomed = false;

    function resetZoom(skipUpdate) {
        const chart = getChart();
        if (chart && chart.options && chart.options.scales) {
            delete chart.options.scales.x.min;
            delete chart.options.scales.x.max;
            delete chart.options.scales.y.min;
            delete chart.options.scales.y.max;
            if (!skipUpdate) {
                chart.update('none');
            }
        }
        isZoomed = false;
        btnReset.style.display = 'none';
        selectionBox.style.display = 'none';
    }

    btnReset.addEventListener('click', (e) => {
        e.stopPropagation();
        resetZoom(false);
    });

    canvas.addEventListener('dblclick', () => {
        if (isZoomed) {
            resetZoom(false);
        }
    });

    canvas.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only primary left-click
        const chart = getChart();
        if (!chart || !chart.chartArea || !chart.scales.x) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Ensure mousedown starts inside chart plotting area
        if (mouseX < chart.chartArea.left || mouseX > chart.chartArea.right ||
            mouseY < chart.chartArea.top || mouseY > chart.chartArea.bottom) {
            return;
        }

        isDragging = true;
        dragStartX = mouseX;

        selectionBox.style.top = chart.chartArea.top + 'px';
        selectionBox.style.height = (chart.chartArea.bottom - chart.chartArea.top) + 'px';
        selectionBox.style.left = mouseX + 'px';
        selectionBox.style.width = '0px';
        selectionBox.style.display = 'block';

        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const chart = getChart();
        if (!chart || !chart.chartArea) return;

        const rect = canvas.getBoundingClientRect();
        const curX = Math.max(chart.chartArea.left, Math.min(chart.chartArea.right, e.clientX - rect.left));

        const minX = Math.min(dragStartX, curX);
        const width = Math.abs(curX - dragStartX);

        selectionBox.style.left = minX + 'px';
        selectionBox.style.width = width + 'px';
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        selectionBox.style.display = 'none';

        const chart = getChart();
        if (!chart || !chart.chartArea || !chart.scales.x) return;

        const rect = canvas.getBoundingClientRect();
        const curX = Math.max(chart.chartArea.left, Math.min(chart.chartArea.right, e.clientX - rect.left));
        const dragDist = Math.abs(curX - dragStartX);

        // Require at least 20px drag distance to avoid accidental clicks
        if (dragDist < 20) return;

        const pStart = Math.min(dragStartX, curX);
        const pEnd = Math.max(dragStartX, curX);

        const vStart = chart.scales.x.getValueForPixel(pStart);
        const vEnd = chart.scales.x.getValueForPixel(pEnd);

        const totalLabels = chart.data && chart.data.labels ? chart.data.labels.length : 0;
        if (totalLabels < 3) return;

        let idxStart = Math.max(0, Math.min(Math.round(vStart), Math.round(vEnd)));
        let idxEnd = Math.min(totalLabels - 1, Math.max(Math.round(vStart), Math.round(vEnd)));

        if (idxEnd - idxStart < 2) {
            if (idxEnd < totalLabels - 1) idxEnd = Math.min(totalLabels - 1, idxStart + 2);
            else idxStart = Math.max(0, idxEnd - 2);
        }

        // Apply X-range zoom
        chart.options.scales.x.min = idxStart;
        chart.options.scales.x.max = idxEnd;

        // Auto-fit Y scale to visible range with 8% padding
        let yMin = Infinity;
        let yMax = -Infinity;
        if (chart.data && chart.data.datasets) {
            chart.data.datasets.forEach(ds => {
                if (ds.hidden) return;
                if (!ds.data || !Array.isArray(ds.data)) return;
                for (let i = idxStart; i <= idxEnd; i++) {
                    const val = ds.data[i];
                    if (val !== null && val !== undefined && !isNaN(val)) {
                        if (val < yMin) yMin = val;
                        if (val > yMax) yMax = val;
                    }
                }
            });
        }

        if (isFinite(yMin) && isFinite(yMax) && yMin < yMax) {
            const range = yMax - yMin;
            const pad = range > 0 ? range * 0.08 : 10;
            if (canvas.id === 'wealthTrajectoryCanvas') {
                chart.options.scales.y.min = Math.max(0, Math.floor(yMin - pad));
                chart.options.scales.y.max = Math.ceil(yMax + pad);
            } else {
                if (typeof currentChartMode !== 'undefined' && currentChartMode === 'drawdown') {
                    chart.options.scales.y.min = Math.floor(yMin - pad);
                    chart.options.scales.y.max = 0;
                } else {
                    chart.options.scales.y.min = Math.floor(yMin - pad);
                    chart.options.scales.y.max = Math.ceil(yMax + pad);
                }
            }
        }

        chart.update('none');
        isZoomed = true;
        btnReset.style.display = 'inline-flex';
    });

    return {
        reset: resetZoom,
        isZoomed: () => isZoomed
    };
}

function initBacktestChartSizeControls() {
    const card = document.getElementById('wealthTrajectoryCard');
    const btnNormal = document.getElementById('btnSizeNormal');
    const btnLarge = document.getElementById('btnSizeLarge');
    const btnFullscreen = document.getElementById('btnSizeFullscreen');

    if (!card) return;

    let previousNonFullscreenSize = 'normal';

    function setSize(size) {
        [btnNormal, btnLarge, btnFullscreen].forEach(b => {
            if (b) b.classList.remove('active');
        });

        const canvas = document.getElementById('wealthTrajectoryCanvas');

        if (size === 'normal') {
            card.classList.remove('is-large', 'fullscreen-active');
            document.body.style.overflow = '';
            previousNonFullscreenSize = 'normal';
            if (btnNormal) btnNormal.classList.add('active');
            if (btnFullscreen) {
                btnFullscreen.innerHTML = `
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    <span>Vollbild</span>
                `;
            }
            if (canvas) {
                canvas.style.width = '100%';
                canvas.style.maxWidth = '100%';
                canvas.removeAttribute('width');
            }
        } else if (size === 'large') {
            card.classList.add('is-large');
            card.classList.remove('fullscreen-active');
            document.body.style.overflow = '';
            previousNonFullscreenSize = 'large';
            if (btnLarge) btnLarge.classList.add('active');
            if (btnFullscreen) {
                btnFullscreen.innerHTML = `
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    <span>Vollbild</span>
                `;
            }
            if (canvas) {
                canvas.style.width = '100%';
                canvas.style.maxWidth = '100%';
                canvas.removeAttribute('width');
            }
        } else if (size === 'fullscreen') {
            card.classList.add('fullscreen-active');
            card.classList.remove('is-large');
            document.body.style.overflow = 'hidden';
            if (btnFullscreen) {
                btnFullscreen.classList.add('active');
                btnFullscreen.innerHTML = `
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Schließen</span>
                `;
            }
        }

        setTimeout(() => {
            if (trajectoryChartInstance) trajectoryChartInstance.resize();
        }, 50);
    }

    if (btnNormal) btnNormal.addEventListener('click', () => setSize('normal'));
    if (btnLarge) btnLarge.addEventListener('click', () => setSize('large'));
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            if (card.classList.contains('fullscreen-active')) {
                setSize(previousNonFullscreenSize || 'normal');
            } else {
                setSize('fullscreen');
            }
        });
    }

    // Escape exits fullscreen
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && card.classList.contains('fullscreen-active')) {
            setSize(previousNonFullscreenSize || 'normal');
        }
    });

}

function initBacktestEventControls() {
    const btnSwitches = document.getElementById('btnToggleEventSwitches');
    const btnDeposits = document.getElementById('btnToggleEventDeposits');
    const btnSavings = document.getElementById('btnToggleEventSavings');

    function toggleCategory(cat, btn) {
        backtestEventsVisibility[cat] = !backtestEventsVisibility[cat];
        if (btn) btn.classList.toggle('active', backtestEventsVisibility[cat]);

        if (backtestEventsVisibility[cat]) {
            highlightEventCategory(cat);
        } else {
            highlightEventCategory(null);
        }
    }

    function setupBtn(btn, cat) {
        if (!btn) return;
        btn.addEventListener('click', () => toggleCategory(cat, btn));
        btn.addEventListener('mouseenter', () => {
            highlightEventCategory(cat);
        });
        btn.addEventListener('mouseleave', () => {
            highlightEventCategory(null);
        });
    }

    setupBtn(btnSwitches, 'switches');
    setupBtn(btnDeposits, 'deposits');
    setupBtn(btnSavings, 'savings');
}

function initBacktestInputs() {
    const assetSelect = document.getElementById('backtestAssetSelect');
    if (assetSelect) {
        assetSelect.addEventListener('change', () => {
            updateBacktestAssetBadge();
            runHistoricalBacktest();
        });
    }

    const inpStart = document.getElementById('inputBacktestStart');
    if (inpStart) {
        inpStart.addEventListener('change', () => {
            document.querySelectorAll('#backtestDatePills .date-preset-pill').forEach(b => b.classList.remove('active'));
            runHistoricalBacktest();
        });
    }

    const inpCapital = document.getElementById('inputInitialCapital');
    if (inpCapital) {
        inpCapital.addEventListener('input', runHistoricalBacktest);
    }

    const inpMonthly = document.getElementById('inputMonthlyRate');
    if (inpMonthly) {
        inpMonthly.addEventListener('input', runHistoricalBacktest);
    }

    const btnRun = document.getElementById('btnRunBacktest');
    if (btnRun) {
        btnRun.addEventListener('click', runHistoricalBacktest);
    }

    // Quick Date Inception Buttons
    const datePills = document.querySelectorAll('#backtestDatePills .date-preset-pill');
    datePills.forEach(pill => {
        pill.addEventListener('click', () => {
            datePills.forEach(b => b.classList.remove('active'));
            pill.classList.add('active');

            const yearsAttr = pill.getAttribute('data-years');
            const now = new Date();
            let dateStr = '2019-10-20';

            if (yearsAttr === 'max') {
                const earliestDate = getEarliestDateForCurrentSelection();
                dateStr = earliestDate;
            } else {
                const yrs = parseInt(yearsAttr, 10);
                const d = new Date();
                d.setFullYear(now.getFullYear() - yrs);
                dateStr = d.toISOString().split('T')[0];
            }

            if (inpStart) inpStart.value = dateStr;
            runHistoricalBacktest();
        });
    });

    // Collapsible Accordions for Extra Cashflows
    const headerExtra = document.getElementById('headerExtraDeposits');
    const wrapExtra = document.getElementById('wrapExtraDeposits');
    if (headerExtra && wrapExtra) {
        headerExtra.addEventListener('click', () => {
            wrapExtra.classList.toggle('open');
        });
    }

    const headerWithdrawal = document.getElementById('headerWithdrawals');
    const wrapWithdrawal = document.getElementById('wrapWithdrawals');
    if (headerWithdrawal && wrapWithdrawal) {
        headerWithdrawal.addEventListener('click', () => {
            wrapWithdrawal.classList.toggle('open');
        });
    }

    // Dynamic Row Adders
    const btnAddDeposit = document.getElementById('btnAddExtraDeposit');
    if (btnAddDeposit) {
        btnAddDeposit.addEventListener('click', () => {
            addDynamicCashflowRow('extraDepositsList', 'deposit');
        });
    }

    const btnAddWithdraw = document.getElementById('btnAddWithdrawal');
    if (btnAddWithdraw) {
        btnAddWithdraw.addEventListener('click', () => {
            addDynamicCashflowRow('withdrawalsList', 'withdrawal');
        });
    }
}

function initCoreSatelliteControls() {
    // Mode tabs (Preset vs Core-Satellite vs Hebel & SMA)
    const tabs = document.querySelectorAll('#portfolioModeTabs .portfolio-mode-tab');
    const presetContainer = document.getElementById('presetPortfolioContainer');
    const coreSatContainer = document.getElementById('coreSatelliteContainer');
    const leverageContainer = document.getElementById('leverageContainer');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            backtestPortfolioMode = tab.getAttribute('data-mode');

            if (presetContainer) presetContainer.style.display = backtestPortfolioMode === 'preset' ? 'block' : 'none';
            if (coreSatContainer) coreSatContainer.style.display = backtestPortfolioMode === 'coresatellite' ? 'block' : 'none';
            if (leverageContainer) leverageContainer.style.display = backtestPortfolioMode === 'leverage' ? 'block' : 'none';

            if (backtestPortfolioMode === 'coresatellite') {
                renderSatellitesList();
            }
            runHistoricalBacktest();
        });
    });

    // Core asset selector
    const selectCore = document.getElementById('selectCoreAsset');
    if (selectCore) {
        selectCore.addEventListener('change', (e) => {
            coreAssetId = e.target.value;
            runHistoricalBacktest();
        });
    }

    // Core weight slider
    const sliderCore = document.getElementById('sliderCoreWeight');
    const dispCore = document.getElementById('dispCoreWeight');
    const dispCoreLabel = document.getElementById('dispCoreWeightLabel');

    if (sliderCore) {
        sliderCore.addEventListener('input', (e) => {
            coreWeightPct = parseInt(e.target.value, 10);
            if (dispCore) dispCore.textContent = `${coreWeightPct} %`;
            if (dispCoreLabel) dispCoreLabel.textContent = `${coreWeightPct} %`;
            updateCoreSatelliteAllocationBadge();
            runHistoricalBacktest();
        });
    }

    // Add satellite button
    const btnAddSat = document.getElementById('btnAddSatellite');
    if (btnAddSat) {
        btnAddSat.addEventListener('click', () => {
            const totalSat = satelliteItems.reduce((s, i) => s + (i.weightPct || 0), 0);
            const remaining = Math.max(5, 100 - coreWeightPct - totalSat);
            const newId = `sat_${Date.now()}`;
            
            const usedAssets = new Set(satelliteItems.map(s => s.assetId));
            const available = ASSET_CATALOG.find(a => !usedAssets.has(a.id) && a.id !== coreAssetId) || ASSET_CATALOG[0];

            satelliteItems.push({
                id: newId,
                assetId: available.id,
                weightPct: remaining
            });

            renderSatellitesList();
            runHistoricalBacktest();
        });
    }

    // Hebel- & 200-SMA Trendfolge Controls
    const selUnderlying = document.getElementById('selectLeverageUnderlying');
    if (selUnderlying) {
        selUnderlying.addEventListener('change', (e) => {
            leverageUnderlyingId = e.target.value;
            runHistoricalBacktest();
        });
    }

    const inpFactor = document.getElementById('inputLeverageFactor');
    const inpTer = document.getElementById('inputLeverageTer');
    const pills = document.querySelectorAll('#leverageQuickPills .lev-pill');

    if (inpFactor) {
        inpFactor.addEventListener('input', (e) => {
            leverageFactor = Math.max(1.0, parseFloat(e.target.value) || 1.0);
            pills.forEach(p => {
                const pLev = parseFloat(p.getAttribute('data-lev'));
                p.classList.toggle('active', Math.abs(pLev - leverageFactor) < 0.05);
            });
            runHistoricalBacktest();
        });
    }

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const lev = parseFloat(pill.getAttribute('data-lev'));
            const ter = parseFloat(pill.getAttribute('data-ter'));
            leverageFactor = lev;
            if (inpFactor) inpFactor.value = lev;
            if (inpTer) {
                inpTer.value = ter;
                leverageTer = ter / 100.0;
            }
            runHistoricalBacktest();
        });
    });

    if (inpTer) {
        inpTer.addEventListener('input', (e) => {
            const val = Math.max(0, parseFloat(e.target.value) || 0);
            leverageTer = val / 100.0;
            runHistoricalBacktest();
        });
    }

    const checkSma = document.getElementById('checkLeverageSma');
    if (checkSma) {
        checkSma.addEventListener('change', (e) => {
            leverageUseSma = e.target.checked;
            runHistoricalBacktest();
        });
    }

    const inpFee = document.getElementById('inputOrderFee');
    if (inpFee) {
        inpFee.addEventListener('input', (e) => {
            leverageOrderFee = Math.max(0, parseFloat(e.target.value) || 0);
            runHistoricalBacktest();
        });
    }
}

function renderSatellitesList() {
    const list = document.getElementById('satellitesList');
    if (!list) return;

    list.innerHTML = '';
    satelliteItems.forEach((sat, idx) => {
        const row = document.createElement('div');
        row.className = 'satellite-row';

        let optionsHtml = '';
        ASSET_CATALOG.forEach(asset => {
            const isSelected = asset.id === sat.assetId;
            optionsHtml += `<option value="${asset.id}" ${isSelected ? 'selected' : ''}>${asset.name} (${asset.category})</option>`;
        });

        row.innerHTML = `
            <select class="sat-asset-select">
                ${optionsHtml}
            </select>
            <div class="sat-weight-wrapper">
                <input type="number" class="sat-weight-input" min="1" max="30" step="1" value="${sat.weightPct}">
                <span class="sat-weight-suffix">%</span>
            </div>
            <button type="button" class="btn-remove-row" title="Satellit entfernen">✕</button>
        `;

        row.querySelector('.sat-asset-select').addEventListener('change', (e) => {
            sat.assetId = e.target.value;
            runHistoricalBacktest();
        });

        row.querySelector('.sat-weight-input').addEventListener('input', (e) => {
            sat.weightPct = Math.max(0, parseInt(e.target.value, 10) || 0);
            updateCoreSatelliteAllocationBadge();
            runHistoricalBacktest();
        });

        row.querySelector('.btn-remove-row').addEventListener('click', () => {
            satelliteItems.splice(idx, 1);
            renderSatellitesList();
            updateCoreSatelliteAllocationBadge();
            runHistoricalBacktest();
        });

        list.appendChild(row);
    });

    updateCoreSatelliteAllocationBadge();
}

function updateCoreSatelliteAllocationBadge() {
    const totalSatellites = satelliteItems.reduce((sum, item) => sum + (item.weightPct || 0), 0);
    const totalAlloc = coreWeightPct + totalSatellites;
    const remainingForSatellites = Math.max(0, 100 - coreWeightPct);

    const dispRemaining = document.getElementById('dispSatellitesRemaining');
    if (dispRemaining) {
        dispRemaining.textContent = `Verbleibend: ${remainingForSatellites} %`;
    }

    const badge = document.getElementById('dispTotalAllocationBadge');
    if (badge) {
        if (totalAlloc === 100) {
            badge.className = 'allocation-badge success';
            badge.textContent = '✓ 100 % vollständig';
        } else if (totalAlloc < 100) {
            badge.className = 'allocation-badge warning';
            badge.textContent = `Noch ${100 - totalAlloc} % offen`;
        } else {
            badge.className = 'allocation-badge warning';
            badge.textContent = `+${totalAlloc - 100} % Überhang`;
        }
    }
}

function addDynamicCashflowRow(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'dynamic-row';

    const now = new Date();
    const defaultDate = now.toISOString().split('T')[0];

    row.innerHTML = `
        <input type="date" class="row-date" value="${defaultDate}">
        <input type="number" class="row-amount" min="100" step="500" value="2000" placeholder="Betrag in €">
        <button type="button" class="btn-remove-row" title="Eintrag löschen">✕</button>
    `;

    row.querySelector('.btn-remove-row').addEventListener('click', () => {
        row.remove();
        runHistoricalBacktest();
    });

    row.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', runHistoricalBacktest);
    });

    container.appendChild(row);

    const wrapper = container.closest('.collapsible-wrapper');
    if (wrapper) wrapper.classList.add('open');

    runHistoricalBacktest();
}

function updateBacktestAssetBadge() {
    const badge = document.getElementById('backtestAssetInfoBadge');
    const assetSelect = document.getElementById('backtestAssetSelect');
    if (!badge || !assetSelect) return;

    const selVal = assetSelect.value;
    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};

    if (BACKTEST_STRATEGIES[selVal]) {
        const strat = BACKTEST_STRATEGIES[selVal];
        const earliestDate = getEarliestDateForCurrentSelection();
        badge.innerHTML = `
            <strong>${strat.name}</strong><br>
            <span style="font-size: 0.72rem;">Multi-Asset-Struktur &bull; Reale Historie verfügbar ab <strong>${formatDateDE(earliestDate)}</strong></span>
        `;
    } else {
        const item = getAssetById(selVal);
        const assetHist = historyData[selVal];
        const startDate = assetHist && assetHist.series && assetHist.series.length > 0 ? assetHist.series[0][0] : '1970-01-02';
        badge.innerHTML = `
            <strong>${item.fullName || item.name}</strong> (ISIN: ${item.isin || item.ticker || '-'})<br>
            <span style="font-size: 0.72rem;">100 % Total Return (Dividenden reinvestiert) in EUR &bull; Verfügbar ab <strong>${formatDateDE(startDate)}</strong></span>
        `;
    }
}

function getEarliestDateForCurrentSelection() {
    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    if (!historyData) return '2019-10-20';

    if (backtestPortfolioMode === 'leverage') {
        const underlying = historyData[leverageUnderlyingId || 'sp500'];
        if (underlying && underlying.series && underlying.series.length >= 200) {
            return underlying.series[199][0]; // For S&P 500, ~1970-10-15
        }
        return '1970-10-15';
    }

    let requiredAssets = [];

    if (backtestPortfolioMode === 'coresatellite') {
        if (BACKTEST_STRATEGIES[coreAssetId]) {
            requiredAssets.push(...Object.keys(BACKTEST_STRATEGIES[coreAssetId].weights));
        } else {
            requiredAssets.push(coreAssetId);
        }
        satelliteItems.forEach(sat => {
            if (sat.assetId) requiredAssets.push(sat.assetId);
        });
    } else {
        const assetSelect = document.getElementById('backtestAssetSelect');
        const selVal = assetSelect ? assetSelect.value : 'sp500';
        if (BACKTEST_STRATEGIES[selVal]) {
            requiredAssets = Object.keys(BACKTEST_STRATEGIES[selVal].weights);
        } else {
            requiredAssets = [selVal];
        }
    }

    let maxStartDate = '1970-01-01';
    requiredAssets.forEach(id => {
        const asset = historyData[id];
        if (asset && asset.series && asset.series.length > 0) {
            const firstDate = asset.series[0][0];
            if (firstDate > maxStartDate) maxStartDate = firstDate;
        }
    });

    return maxStartDate;
}

function initBacktestChart() {
    const ctx = document.getElementById('wealthTrajectoryCanvas');
    if (!ctx) return;

    trajectoryChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: { top: 14, right: 14, bottom: 4, left: 4 }
            },
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
                        color: '#0A192F',
                        filter: function(item, chart) {
                            if (chart && chart.datasets && chart.datasets[item.datasetIndex]) {
                                return !chart.datasets[item.datasetIndex].hideFromLegend;
                            }
                            return true;
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#FFFFFF',
                    titleColor: '#0A192F',
                    bodyColor: '#112D4E',
                    borderColor: '#D4AF37',
                    borderWidth: 1.5,
                    padding: 12,
                    itemSort: function(a, b) {
                        return b.parsed.y - a.parsed.y;
                    },
                    callbacks: {
                        title: function(items) {
                            if (!items || items.length === 0) return '';
                            return formatDateDE(items[0].label);
                        },
                        label: function(context) {
                            const val = context.parsed ? context.parsed.y : null;
                            if (val === null || isNaN(val)) return null;

                            const ds = context.dataset;
                            const dt = context.label;

                            if (ds.id === 'event_switches_buy') {
                                const swInfo = backtestActiveEventDetails.get(dt + '_switch');
                                const smaText = swInfo && swInfo.smaDiffPct !== undefined ? ` (${swInfo.smaDiffPct >= 0 ? '+' : ''}${swInfo.smaDiffPct.toFixed(1).replace('.', ',')} % vs. 200-SMA)` : '';
                                const realVal = swInfo ? swInfo.val : Math.round(val);
                                return ` 🟢 Umschichtung in Hebel-ETF${smaText} • Depotwert: ${Math.round(realVal).toLocaleString('de-DE')} €`;
                            }
                            if (ds.id === 'event_switches_sell') {
                                const swInfo = backtestActiveEventDetails.get(dt + '_switch');
                                const smaText = swInfo && swInfo.smaDiffPct !== undefined ? ` (${swInfo.smaDiffPct >= 0 ? '+' : ''}${swInfo.smaDiffPct.toFixed(1).replace('.', ',')} % vs. 200-SMA)` : '';
                                const realVal = swInfo ? swInfo.val : Math.round(val);
                                return ` 🔴 Absicherung in Geldmarkt${smaText} • Depotwert: ${Math.round(realVal).toLocaleString('de-DE')} €`;
                            }
                            if (ds.id === 'event_deposits') {
                                const depInfo = backtestActiveEventDetails.get(dt + '_deposit');
                                const title = depInfo && depInfo.type === 'initial' ? 'Start-Einmalanlage' : 'Sonderzahlung';
                                const amtStr = depInfo ? ` (+${Math.round(depInfo.amount).toLocaleString('de-DE')} €)` : '';
                                return ` 💎 ${title}${amtStr} • Neuer Depotwert: ${Math.round(val).toLocaleString('de-DE')} €`;
                            }
                            if (ds.id === 'event_savings') {
                                const savInfo = backtestActiveEventDetails.get(dt + '_saving');
                                const amtStr = savInfo ? ` (+${Math.round(savInfo.amount).toLocaleString('de-DE')} €)` : '';
                                return ` 🔵 Sparplankauf${amtStr} • Neuer Depotwert: ${Math.round(val).toLocaleString('de-DE')} €`;
                            }

                            return ` ${context.dataset.label}: ${Math.round(val).toLocaleString('de-DE')} €`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.04)' },
                    ticks: { color: '#64748B', font: { size: 11 }, maxTicksLimit: 12 }
                },
                y: {
                    grid: { color: 'rgba(0, 0, 0, 0.06)' },
                    ticks: {
                        color: '#0A192F',
                        font: { size: 11, weight: 'bold' },
                        callback: function(value) {
                            return value >= 1000000 ? `${(value/1000000).toFixed(2)} Mio. €` : `${Math.round(value).toLocaleString('de-DE')} €`;
                        }
                    }
                }
            }
        }
    });

    wealthZoomController = attachChartDragZoom(() => trajectoryChartInstance, 'wealthTrajectoryCanvas', 'wealthChartBox');
}

/**
 * Hebel- & 200-SMA Trendfolge Backtest Engine
 * Simulates daily leveraged ETF compounding, 200-day rolling SMA signal next-day execution,
 * money-market switching, order fees, and cash flows.
 */
function runLeverageBacktest(historyData, inpStart, initialCapital, monthlyRate, extraDeposits, withdrawals) {
    const underlyingId = leverageUnderlyingId || 'sp500';
    const cashId = 'euro_geldmarkt';

    const underlyingAsset = historyData[underlyingId];
    const cashAsset = historyData[cashId];

    if (!underlyingAsset || !cashAsset || !underlyingAsset.series || !cashAsset.series) return;

    const underlyingSeries = underlyingAsset.series;
    const cashSeries = cashAsset.series;
    const smaMap = getSMA200Map(underlyingId);

    const underlyingPriceMap = new Map(underlyingSeries);
    const cashPriceMap = new Map(cashSeries);

    // Need at least 200 trading days prior so SMA-200 is available on start date
    const earliestDate = underlyingSeries.length >= 200 ? underlyingSeries[199][0] : underlyingSeries[0][0];
    let userStartDate = inpStart.value || '2019-10-20';
    if (userStartDate < earliestDate) {
        userStartDate = earliestDate;
        inpStart.value = earliestDate;
    }

    // Filter trading dates from userStartDate onwards where both assets & SMA are available
    const tradingDates = underlyingSeries
        .map(pt => pt[0])
        .filter(dt => dt >= userStartDate && smaMap.has(dt));

    if (tradingDates.length === 0) return;

    // Determine initial state based on previous trading day's close vs SMA
    const idx0 = underlyingSeries.findIndex(pt => pt[0] === tradingDates[0]);
    const prevPt = (idx0 > 0) ? underlyingSeries[idx0 - 1] : underlyingSeries[0];
    const prevClose0 = prevPt[1];
    const prevSma0 = smaMap.get(prevPt[0]) || prevClose0;

    let currentState = leverageUseSma ? (prevClose0 >= prevSma0 ? 'LEVERAGE' : 'MONEY_MARKET') : 'LEVERAGE';

    let valA = initialCapital;
    let valB = initialCapital;
    let valC = initialCapital;

    let cumulativeDeposits = initialCapital;
    let cumulativeWithdrawals = 0;
    let totalMonthlySavings = 0;
    let monthlySavingsCount = 0;
    let totalExtraDeposits = 0;
    let extraDepositsCount = 0;
    let totalWithdrawals = 0;
    let withdrawalsCount = 0;

    let switchesCount = 0;
    let totalFeesPaid = 0;
    let daysInLeverage = 0;
    let daysInMoneyMarket = 0;

    const cashFlowsA = [];
    const cashFlowsB = [];
    const cashFlowsC = [];

    const switchEvents = new Map();
    const depositEvents = new Map();
    const savingEvents = new Map();
    backtestActiveEventDetails.clear();

    if (initialCapital > 0) {
        cashFlowsA.push({ date: tradingDates[0], amount: -initialCapital });
        cashFlowsB.push({ date: tradingDates[0], amount: -initialCapital });
        cashFlowsC.push({ date: tradingDates[0], amount: -initialCapital });
        depositEvents.set(tradingDates[0], { type: 'initial', amount: initialCapital });
        backtestActiveEventDetails.set(tradingDates[0] + '_deposit', {
            category: 'deposits',
            type: 'initial',
            amount: initialCapital,
            val: Math.round(initialCapital),
            netInvested: Math.round(initialCapital)
        });
    }

    const timelineLabels = [tradingDates[0]];
    const timelineValA = [Math.round(valA)];
    const timelineValB = [Math.round(valB)];
    const timelineValC = [Math.round(valC)];
    const timelineNetDeposits = [Math.round(initialCapital)];

    let peakA = valA;
    let maxDdA = 0;
    let peakB = valB;
    let maxDdB = 0;
    let peakC = valC;
    let maxDdC = 0;

    let lastKnownMonth = tradingDates[0].substring(0, 7);
    let lastKnownCashPrice = cashPriceMap.get(tradingDates[0]) || 100;

    for (let t = 1; t < tradingDates.length; t++) {
        const dt = tradingDates[t];
        const prevDt = tradingDates[t - 1];

        // 1. Signal check from yesterday's close (prevDt)
        const prevClose = underlyingPriceMap.get(prevDt);
        const prevSma = smaMap.get(prevDt) || prevClose;
        const targetState = leverageUseSma ? (prevClose >= prevSma ? 'LEVERAGE' : 'MONEY_MARKET') : 'LEVERAGE';

        if (targetState !== currentState) {
            if (leverageOrderFee > 0 && valA > 0) {
                valA = Math.max(0, valA - leverageOrderFee);
                totalFeesPaid += leverageOrderFee;
            }
            switchesCount++;
            currentState = targetState;
            if (leverageUseSma) {
                const diffPct = prevSma > 0 ? ((prevClose - prevSma) / prevSma) * 100 : 0;
                switchEvents.set(dt, { targetState: currentState, date: dt, prevClose: prevClose, prevSma: prevSma, smaDiffPct: diffPct });
                backtestActiveEventDetails.set(dt + '_switch', {
                    category: 'switches',
                    targetState: currentState,
                    date: dt,
                    val: Math.round(valA),
                    prevClose: prevClose,
                    prevSma: prevSma,
                    smaDiffPct: diffPct
                });
            }
        }

        // 2. Daily returns for day t applied to existing portfolio
        const currClose = underlyingPriceMap.get(dt);
        const r_spx = (currClose - prevClose) / prevClose;
        const r_lev = Math.max(-0.999, leverageFactor * r_spx - (leverageTer / 252.0));

        const prevCash = cashPriceMap.get(prevDt) || lastKnownCashPrice;
        const currCash = cashPriceMap.get(dt) || prevCash;
        lastKnownCashPrice = currCash;
        const r_cash = (currCash - prevCash) / prevCash;

        // Apply return to Strategy A
        if (currentState === 'LEVERAGE') {
            valA *= (1.0 + r_lev);
            daysInLeverage++;
        } else {
            valA *= (1.0 + r_cash);
            daysInMoneyMarket++;
        }

        // Apply return to Buy & Hold Leveraged B
        valB *= (1.0 + r_lev);

        // Apply return to 1x Buy & Hold C (TER 0.07%)
        valC *= (1.0 + r_spx - (0.0007 / 252.0));

        // 3. Monthly Savings execution at today's close (matching unit purchasing at close)
        const currentMonth = dt.substring(0, 7);
        if (lastKnownMonth && currentMonth !== lastKnownMonth && monthlyRate > 0) {
            valA += monthlyRate;
            valB += monthlyRate;
            valC += monthlyRate;
            cumulativeDeposits += monthlyRate;
            totalMonthlySavings += monthlyRate;
            monthlySavingsCount++;
            cashFlowsA.push({ date: dt, amount: -monthlyRate });
            cashFlowsB.push({ date: dt, amount: -monthlyRate });
            cashFlowsC.push({ date: dt, amount: -monthlyRate });
            savingEvents.set(dt, { type: 'monthly', amount: monthlyRate });
            backtestActiveEventDetails.set(dt + '_saving', {
                category: 'savings',
                type: 'monthly',
                amount: monthlyRate,
                val: Math.round(valA),
                netInvested: Math.round(cumulativeDeposits - cumulativeWithdrawals)
            });
        }
        lastKnownMonth = currentMonth;

        // 4. Extra Deposits execution at today's close
        extraDeposits.forEach(dep => {
            if (dep.date === dt) {
                valA += dep.amount;
                valB += dep.amount;
                valC += dep.amount;
                cumulativeDeposits += dep.amount;
                totalExtraDeposits += dep.amount;
                extraDepositsCount++;
                cashFlowsA.push({ date: dt, amount: -dep.amount });
                cashFlowsB.push({ date: dt, amount: -dep.amount });
                cashFlowsC.push({ date: dt, amount: -dep.amount });
                const existing = depositEvents.get(dt) ? depositEvents.get(dt).amount : 0;
                const totalAmt = existing + dep.amount;
                depositEvents.set(dt, { type: 'extra', amount: totalAmt });
                backtestActiveEventDetails.set(dt + '_deposit', {
                    category: 'deposits',
                    type: 'extra',
                    amount: totalAmt,
                    val: Math.round(valA),
                    netInvested: Math.round(cumulativeDeposits - cumulativeWithdrawals)
                });
            }
        });

        // 5. Withdrawals execution at today's close
        withdrawals.forEach(w => {
            if (w.date === dt) {
                const actA = Math.min(w.amount, valA);
                const actB = Math.min(w.amount, valB);
                const actC = Math.min(w.amount, valC);
                valA = Math.max(0, valA - actA);
                valB = Math.max(0, valB - actB);
                valC = Math.max(0, valC - actC);
                cumulativeWithdrawals += actA;
                totalWithdrawals += actA;
                withdrawalsCount++;
                cashFlowsA.push({ date: dt, amount: +actA });
                cashFlowsB.push({ date: dt, amount: +actB });
                cashFlowsC.push({ date: dt, amount: +actC });
            }
        });

        const netInvested = cumulativeDeposits - cumulativeWithdrawals;

        // Drawdown tracking A
        if (valA > peakA) peakA = valA;
        if (peakA > 0) {
            const ddA = ((valA - peakA) / peakA) * 100;
            if (ddA < maxDdA) maxDdA = ddA;
        }

        // Drawdown tracking B
        if (valB > peakB) peakB = valB;
        if (peakB > 0) {
            const ddB = ((valB - peakB) / peakB) * 100;
            if (ddB < maxDdB) maxDdB = ddB;
        }

        // Drawdown tracking C (1x ungehebelt)
        if (valC > peakC) peakC = valC;
        if (peakC > 0) {
            const ddC = ((valC - peakC) / peakC) * 100;
            if (ddC < maxDdC) maxDdC = ddC;
        }

        timelineLabels.push(dt);
        timelineValA.push(valA);
        timelineValB.push(valB);
        timelineValC.push(valC);
        timelineNetDeposits.push(netInvested);
    }

    const finalDate = tradingDates[tradingDates.length - 1];
    const finalNetInvested = cumulativeDeposits - cumulativeWithdrawals;
    const finalProfitA = valA - finalNetInvested;
    const finalProfitPctA = finalNetInvested > 0 ? (finalProfitA / finalNetInvested) * 100 : 0;
    const finalMultiplierA = finalNetInvested > 0 ? (valA / finalNetInvested).toFixed(2) + 'x' : '1.00x';

    // Terminal cash flow for IRR
    cashFlowsA.push({ date: finalDate, amount: +valA });
    cashFlowsB.push({ date: finalDate, amount: +valB });
    cashFlowsC.push({ date: finalDate, amount: +valC });

    const irrA = calculateIRR(cashFlowsA);
    const irrB = calculateIRR(cashFlowsB);
    const irrC = calculateIRR(cashFlowsC);

    // Update KPI Displays
    const kpiEnd = document.getElementById('kpiFinalCapital');
    const kpiDep = document.getElementById('kpiDeposits');
    const kpiSubDep = document.getElementById('kpiSubDeposits');
    const kpiProf = document.getElementById('kpiProfit');
    const kpiMult = document.getElementById('kpiMultiplier');
    const kpiIrr = document.getElementById('kpiIrr');
    const kpiDd = document.getElementById('kpiDrawdown');

    if (kpiEnd) kpiEnd.textContent = `${Math.round(valA).toLocaleString('de-DE')} €`;
    if (kpiDep) kpiDep.textContent = `${Math.round(finalNetInvested).toLocaleString('de-DE')} €`;
    if (kpiSubDep) kpiSubDep.textContent = `Start: ${initialCapital.toLocaleString('de-DE')} € + Sparraten: ${totalMonthlySavings.toLocaleString('de-DE')} €`;
    if (kpiProf) {
        kpiProf.textContent = `${finalProfitA >= 0 ? '+' : ''}${Math.round(finalProfitA).toLocaleString('de-DE')} € (${finalProfitA >= 0 ? '+' : ''}${finalProfitPctA.toFixed(1).replace('.', ',')} %)`;
        kpiProf.style.color = finalProfitA >= 0 ? 'var(--green-trend)' : 'var(--red-trend)';
    }
    if (kpiMult) kpiMult.textContent = `Multiplikator: ${finalMultiplierA}`;
    if (kpiIrr) {
        kpiIrr.textContent = `${irrA !== null ? (irrA >= 0 ? '+' : '') + irrA.toFixed(2).replace('.', ',') + ' % p.a.' : 'n/a'}`;
        kpiIrr.style.color = irrA !== null && irrA >= 0 ? 'var(--gold-dark)' : 'var(--red-trend)';
    }
    if (kpiDd) kpiDd.textContent = `Max. Rücksetzer: ${maxDdA.toFixed(1).replace('.', ',')} %`;

    const periodBadge = document.getElementById('chartPeriodBadge');
    if (periodBadge) {
        periodBadge.textContent = `${formatDateDE(userStartDate)} – Heute (${(tradingDates.length / 252).toFixed(1).replace('.', ',')} Jahre)`;
    }

    // Map full daily values for precise point alignment
    const valAMap = new Map();
    const valBMap = new Map();
    const valCMap = new Map();
    const netDepositsMap = new Map();

    for (let i = 0; i < timelineLabels.length; i++) {
        const d = timelineLabels[i];
        valAMap.set(d, Math.round(timelineValA[i]));
        valBMap.set(d, Math.round(timelineValB[i]));
        valCMap.set(d, Math.round(timelineValC[i]));
        netDepositsMap.set(d, Math.round(timelineNetDeposits[i]));
    }

    // Collect all critical event dates so they are never lost in downsampling
    const criticalDates = new Set();
    criticalDates.add(timelineLabels[0]);
    criticalDates.add(timelineLabels[timelineLabels.length - 1]);

    for (const dt of switchEvents.keys()) criticalDates.add(dt);
    for (const dt of depositEvents.keys()) criticalDates.add(dt);
    for (const dt of savingEvents.keys()) criticalDates.add(dt);

    // Downsample for Trajectory Chart (approx 260 base points + critical event dates)
    const step = Math.max(1, Math.floor(timelineLabels.length / 260));
    const sampledDatesSet = new Set(criticalDates);
    for (let i = 0; i < timelineLabels.length; i += step) {
        sampledDatesSet.add(timelineLabels[i]);
    }
    sampledDatesSet.add(timelineLabels[timelineLabels.length - 1]);

    const sampledLabels = Array.from(sampledDatesSet).sort();
    const sampledValA = [];
    const sampledValB = [];
    const sampledValC = [];
    const sampledNetDeposits = [];

    const dataPointsSwitchBuyNormal = [];
    const dataPointsSwitchBuyHover = [];
    const dataPointsSwitchSellNormal = [];
    const dataPointsSwitchSellHover = [];
    const dataPointsDeposits = [];
    const dataPointsSavings = [];

    // Identify switches that are immediately adjacent in time (<= 3 calendar days apart)
    const switchDatesList = Array.from(switchEvents.keys()).sort();
    const collisionDates = new Set();
    for (let i = 0; i < switchDatesList.length; i++) {
        const d1 = new Date(switchDatesList[i]).getTime();
        for (let j = 0; j < switchDatesList.length; j++) {
            if (i !== j) {
                const d2 = new Date(switchDatesList[j]).getTime();
                const diffDays = Math.abs(d1 - d2) / (1000 * 60 * 60 * 24);
                if (diffDays <= 3) {
                    collisionDates.add(switchDatesList[i]);
                    break;
                }
            }
        }
    }

    const maxValAcrossChart = Math.max(...timelineValA, initialCapital);

    sampledLabels.forEach(dt => {
        const vA = valAMap.get(dt) !== undefined ? valAMap.get(dt) : null;
        const vB = valBMap.get(dt) !== undefined ? valBMap.get(dt) : null;
        const vC = valCMap.get(dt) !== undefined ? valCMap.get(dt) : null;
        const vDep = netDepositsMap.get(dt) !== undefined ? netDepositsMap.get(dt) : null;

        sampledValA.push(vA);
        sampledValB.push(vB);
        sampledValC.push(vC);
        sampledNetDeposits.push(vDep);

        // NORMAL VIEW: ALL triangles hug the curve line directly (~1px offset)
        const deltaNormal = vA !== null ? Math.max(50, Math.round(maxValAcrossChart * 0.0035)) : 0;
        // HOVER VIEW: ONLY for the rare direct collisions (switches <= 3 days apart), expand separation to ~7px
        const isCollision = collisionDates.has(dt);
        const deltaHover = vA !== null ? (
            isCollision ? Math.round(maxValAcrossChart * 0.022) : deltaNormal
        ) : 0;

        const sw = switchEvents.get(dt);
        if (sw && sw.targetState === 'LEVERAGE') {
            dataPointsSwitchBuyNormal.push(vA !== null ? vA + deltaNormal : null);
            dataPointsSwitchBuyHover.push(vA !== null ? vA + deltaHover : null);
        } else {
            dataPointsSwitchBuyNormal.push(null);
            dataPointsSwitchBuyHover.push(null);
        }

        if (sw && sw.targetState === 'MONEY_MARKET') {
            dataPointsSwitchSellNormal.push(vA !== null ? Math.max(0, vA - deltaNormal) : null);
            dataPointsSwitchSellHover.push(vA !== null ? Math.max(0, vA - deltaHover) : null);
        } else {
            dataPointsSwitchSellNormal.push(null);
            dataPointsSwitchSellHover.push(null);
        }

        if (depositEvents.has(dt)) {
            dataPointsDeposits.push(vA);
        } else {
            dataPointsDeposits.push(null);
        }

        if (savingEvents.has(dt)) {
            dataPointsSavings.push(vA);
        } else {
            dataPointsSavings.push(null);
        }
    });

    backtestSwitchDataVariants = {
        normalBuy: dataPointsSwitchBuyNormal,
        hoverBuy: dataPointsSwitchBuyHover,
        normalSell: dataPointsSwitchSellNormal,
        hoverSell: dataPointsSwitchSellHover
    };

    // Chart Datasets
    const datasets = [
        {
            label: `Strategie: ${underlyingAsset.name} (${leverageFactor}x ${leverageUseSma ? '+ SMA 200' : 'Buy & Hold'})`,
            data: sampledValA,
            borderColor: '#112D4E',
            backgroundColor: 'rgba(17, 45, 78, 0.04)',
            borderWidth: 2.8,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: false,
            tension: 0.1
        }
    ];

    if (leverageUseSma) {
        datasets.push({
            label: `Vergleich: ${leverageFactor}x Hebel Buy & Hold (ohne SMA)`,
            data: sampledValB,
            borderColor: '#8B5CF6',
            borderWidth: 1.8,
            borderDash: [5, 4],
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: false,
            tension: 0.1
        });
    }

    datasets.push({
        label: `Referenz: ${underlyingAsset.name} 1x ungehebelt`,
        data: sampledValC,
        borderColor: '#0284C7',
        borderWidth: 1.8,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: false,
        tension: 0.1
    });

    datasets.push({
        label: 'Eingezahltes Netto-Kapital',
        data: sampledNetDeposits,
        borderColor: '#94A3B8',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        pointHoverRadius: 3,
        fill: false,
        tension: 0
    });

    // 1. Sparplankäufe (drawn first / underneath event markers)
    datasets.push({
        id: 'event_savings',
        eventCategory: 'savings',
        label: '● Sparplankäufe',
        data: dataPointsSavings,
        showLine: false,
        pointRadius: 3.5,
        pointHoverRadius: 6.0,
        pointStyle: 'circle',
        pointBackgroundColor: '#06B6D4',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 1.5,
        hideFromLegend: true,
        hidden: !backtestEventsVisibility.savings
    });

    // 2. Einmalzahlungen (drawn above savings)
    datasets.push({
        id: 'event_deposits',
        eventCategory: 'deposits',
        label: '💎 Einmalzahlungen',
        data: dataPointsDeposits,
        showLine: false,
        pointRadius: 7.5,
        pointHoverRadius: 12,
        pointStyle: 'rectRot',
        pointBackgroundColor: '#F59E0B',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2.0,
        hideFromLegend: true,
        hidden: !backtestEventsVisibility.deposits
    });

    // 3. Umschichtungen (drawn on top of all events so no circle/diamond can ever obscure the triangles!)
    if (leverageUseSma) {
        datasets.push({
            id: 'event_switches_sell',
            eventCategory: 'switches',
            label: '🔴 Umschichtung in Geldmarkt',
            data: dataPointsSwitchSellNormal,
            showLine: false,
            pointRadius: 9.0,
            pointHoverRadius: 14.5,
            pointStyle: 'triangle',
            pointRotation: 180,
            pointBackgroundColor: '#EF4444',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2.5,
            hideFromLegend: true,
            hidden: !backtestEventsVisibility.switches
        });

        datasets.push({
            id: 'event_switches_buy',
            eventCategory: 'switches',
            label: '🟢 Umschichtung in Hebel-ETF',
            data: dataPointsSwitchBuyNormal,
            showLine: false,
            pointRadius: 9.0,
            pointHoverRadius: 14.5,
            pointStyle: 'triangle',
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2.5,
            hideFromLegend: true,
            hidden: !backtestEventsVisibility.switches
        });
    }

    if (wealthZoomController) {
        wealthZoomController.reset(true);
    }

    if (trajectoryChartInstance) {
        trajectoryChartInstance.data.labels = sampledLabels;
        trajectoryChartInstance.data.datasets = datasets;
        trajectoryChartInstance.update('none');
    }

    const btnSwitches = document.getElementById('btnToggleEventSwitches');
    if (btnSwitches) {
        btnSwitches.style.display = leverageUseSma ? 'inline-flex' : 'none';
    }

    // Update Counter Badges in Event Toolbar
    const countSwitchesEl = document.getElementById('countEventSwitches');
    const countDepositsEl = document.getElementById('countEventDeposits');
    const countSavingsEl = document.getElementById('countEventSavings');

    if (countSwitchesEl) countSwitchesEl.textContent = switchesCount;
    if (countDepositsEl) countDepositsEl.textContent = (initialCapital > 0 ? 1 : 0) + extraDepositsCount;
    if (countSavingsEl) countSavingsEl.textContent = monthlySavingsCount;

    // Summary Table
    const totalDays = daysInLeverage + daysInMoneyMarket;
    const levPct = totalDays > 0 ? (daysInLeverage / totalDays * 100).toFixed(1) : '100.0';
    const cashPct = totalDays > 0 ? (daysInMoneyMarket / totalDays * 100).toFixed(1) : '0.0';

    const summaryTbody = document.getElementById('backtestSummaryTableBody');
    if (summaryTbody) {
        summaryTbody.innerHTML = `
            <tr>
                <td><strong>Hebel-Strategie &amp; Parameter</strong></td>
                <td style="font-weight: 700; color: var(--navy-dark);">${underlyingAsset.name} mit ${leverageFactor}x Tageshebel (TER: ${(leverageTer * 100).toFixed(2).replace('.', ',')} % p.a.)</td>
                <td>Synthetischer täglicher ETF-Hebel (Pfadabhängigkeit &amp; Volatilitätsentwertung real abgebildet).</td>
            </tr>
            <tr>
                <td><strong>Trendfolge-Logik (SMA 200)</strong></td>
                <td style="font-weight: 700; color: ${leverageUseSma ? 'var(--gold-dark)' : 'var(--text-secondary)'};">
                    ${leverageUseSma ? `200-Tage SMA aktiv &ndash; aktuell: <strong>${currentState === 'LEVERAGE' ? '🟢 Im Hebel-ETF (Aufwärtstrend)' : '🟡 Im Geldmarkt (Absicherung)'}</strong>` : 'Deaktiviert (Dauerhaft im Hebel-ETF)'}
                </td>
                <td>Next-Day Execution: Vergleich des ${underlyingAsset.name} Vortagesschlusskurses mit dem 200-Tage-Durchschnitt.</td>
            </tr>
            <tr>
                <td><strong>Marktphasen-Verteilung</strong></td>
                <td style="font-weight: 600;">
                    ${daysInLeverage.toLocaleString('de-DE')} Tage Hebel (${levPct} %) &bull; ${daysInMoneyMarket.toLocaleString('de-DE')} Tage Geldmarkt (${cashPct} %)
                </td>
                <td>Historische Tage, die das Portfolio im gehebelten ETF bzw. im Euro Geldmarkt ETF verbracht hat.</td>
            </tr>
            <tr>
                <td><strong>Signalwechsel &amp; Ordergebühren</strong></td>
                <td style="font-weight: 600;">${switchesCount} Umschichtungen &bull; Gesamtkosten: ${totalFeesPaid.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</td>
                <td>Ordergebühr von ${leverageOrderFee.toFixed(2).replace('.', ',')} € pro Wechsel zwischen Hebel und Geldmarkt.</td>
            </tr>
            <tr>
                <td><strong>Historischer Anlagezeitraum</strong></td>
                <td style="font-weight: 600;">${formatDateDE(tradingDates[0])} bis ${formatDateDE(finalDate)} (${(tradingDates.length / 252).toFixed(1).replace('.', ',')} Jahre)</td>
                <td>${tradingDates.length.toLocaleString('de-DE')} echte Börsenhandelstage mit realen Tagesschlusskursen.</td>
            </tr>
            <tr>
                <td><strong>Start-Einmalanlage</strong></td>
                <td style="font-weight: 600;">${initialCapital.toLocaleString('de-DE')} €</td>
                <td>Sofortinvestition am Starttag entsprechend der damaligen 200-SMA-Signallage.</td>
            </tr>
            <tr>
                <td><strong>Monatliche Sparplanausführungen</strong></td>
                <td style="font-weight: 600;">${totalMonthlySavings.toLocaleString('de-DE')} € (${monthlySavingsCount} Raten &agrave; ${monthlyRate.toLocaleString('de-DE')} €)</td>
                <td>Automatisch zum 1. Handelstag des Monats in die jeweils aktive Anlageklasse (Hebel oder Geldmarkt) investiert.</td>
            </tr>
            ${extraDepositsCount > 0 ? `
            <tr>
                <td><strong>Zusätzliche Einzahlungen</strong></td>
                <td style="font-weight: 600;">${totalExtraDeposits.toLocaleString('de-DE')} € (${extraDepositsCount} Buchungen)</td>
                <td>Manuell terminierte Sonderzahlungen zum jeweiligen historischen Tageskurs.</td>
            </tr>` : ''}
            ${withdrawalsCount > 0 ? `
            <tr>
                <td><strong>Entnahmen / Teilverkäufe</strong></td>
                <td style="font-weight: 600; color: var(--red-trend);">&minus;${totalWithdrawals.toLocaleString('de-DE')} € (${withdrawalsCount} Entnahmen)</td>
                <td>Realisierte Kapitalabzüge aus dem Depotbestand.</td>
            </tr>` : ''}
            <tr>
                <td><strong>Eingezahltes Netto-Kapital</strong></td>
                <td style="font-weight: 700; color: var(--navy-dark);">${finalNetInvested.toLocaleString('de-DE')} €</td>
                <td>Eigenkapitaleinsatz des Anlegers über die gesamte Anlagedauer.</td>
            </tr>
            <tr style="background: rgba(212, 175, 55, 0.08);">
                <td><strong>Endvermögen heute (Depotwert)</strong></td>
                <td style="font-weight: 800; font-size: 1.05rem; color: var(--navy-primary);">${Math.round(valA).toLocaleString('de-DE')} €</td>
                <td>Aktueller realer Ist-Stand des Depotvermögens nach Abzug aller TER-Kosten und Ordergebühren.</td>
            </tr>
            <tr>
                <td><strong>Absoluter Vermögenszuwachs</strong></td>
                <td style="font-weight: 700; color: ${finalProfitA >= 0 ? 'var(--green-trend)' : 'var(--red-trend)'};">
                    ${finalProfitA >= 0 ? '+' : ''}${Math.round(finalProfitA).toLocaleString('de-DE')} € (${finalProfitA >= 0 ? '+' : ''}${finalProfitPctA.toFixed(1).replace('.', ',')} %)
                </td>
                <td>Erzielter Gesamtertrag über den gewählten Anlagehorizont.</td>
            </tr>
            <tr>
                <td><strong>Persönliche Jahresrendite (IRR p.a.)</strong></td>
                <td style="font-weight: 800; font-size: 1.02rem; color: var(--gold-dark);">
                    ${irrA !== null ? (irrA >= 0 ? '+' : '') + irrA.toFixed(2).replace('.', ',') + ' % p.a.' : 'n/a'}
                </td>
                <td>
                    Interner Zinsfuß unter Berücksichtigung aller Zahlungszeitpunkte.
                    <br><span style="font-size: 0.72rem; color: var(--text-muted);">
                        Vergleich: 1x ungehebelt: <strong>${irrC !== null ? (irrC >= 0 ? '+' : '') + irrC.toFixed(2).replace('.', ',') + ' % p.a.' : '--'}</strong>
                        ${leverageUseSma ? ` &bull; Hebel Buy &amp; Hold: <strong>${irrB !== null ? (irrB >= 0 ? '+' : '') + irrB.toFixed(2).replace('.', ',') + ' % p.a.' : '--'}</strong>` : ''}
                    </span>
                </td>
            </tr>
            <tr>
                <td><strong>Maximaler historischer Drawdown</strong></td>
                <td style="font-weight: 700; color: var(--red-trend);">${maxDdA.toFixed(1).replace('.', ',')} %</td>
                <td>
                    Größter zwischenzeitlicher Verlust vom jeweiligen Höchststand.
                    <br><span style="font-size: 0.72rem; color: var(--text-muted);">
                        Vergleich: 1x ungehebelt: <strong>${maxDdC.toFixed(1).replace('.', ',')} %</strong>
                        ${leverageUseSma ? ` &bull; Hebel Buy &amp; Hold: <strong>${maxDdB.toFixed(1).replace('.', ',')} %</strong>` : ''}
                    </span>
                </td>
            </tr>
        `;
    }
}

/**
 * Historical Backtest Calculation Engine
 * Replays cash-flows on actual historical daily prices up to today.
 */
function runHistoricalBacktest() {
    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    if (!historyData || Object.keys(historyData).length === 0) return;

    const inpStart = document.getElementById('inputBacktestStart');
    const inpCapital = document.getElementById('inputInitialCapital');
    const inpMonthly = document.getElementById('inputMonthlyRate');

    if (!inpStart) return;

    const initialCapital = Math.max(0, parseFloat(inpCapital ? inpCapital.value : 0) || 0);
    const monthlyRate = Math.max(0, parseFloat(inpMonthly ? inpMonthly.value : 0) || 0);

    // Collect extra deposits
    const extraDeposits = [];
    document.querySelectorAll('#extraDepositsList .dynamic-row').forEach(row => {
        const dt = row.querySelector('.row-date')?.value;
        const amt = parseFloat(row.querySelector('.row-amount')?.value) || 0;
        if (dt && amt > 0) extraDeposits.push({ date: dt, amount: amt });
    });

    // Collect withdrawals
    const withdrawals = [];
    document.querySelectorAll('#withdrawalsList .dynamic-row').forEach(row => {
        const dt = row.querySelector('.row-date')?.value;
        const amt = parseFloat(row.querySelector('.row-amount')?.value) || 0;
        if (dt && amt > 0) withdrawals.push({ date: dt, amount: amt });
    });

    // Delegate to Leverage Backtest engine if in Leverage mode
    if (backtestPortfolioMode === 'leverage') {
        runLeverageBacktest(historyData, inpStart, initialCapital, monthlyRate, extraDeposits, withdrawals);
        return;
    }

    let weights = {};
    let strategyTitle = '';

    if (backtestPortfolioMode === 'coresatellite') {
        const coreFrac = coreWeightPct / 100;
        let coreName = '';

        if (BACKTEST_STRATEGIES[coreAssetId]) {
            coreName = BACKTEST_STRATEGIES[coreAssetId].name;
            for (const [subId, subWeight] of Object.entries(BACKTEST_STRATEGIES[coreAssetId].weights)) {
                weights[subId] = (weights[subId] || 0) + subWeight * coreFrac;
            }
        } else {
            const coreItem = getAssetById(coreAssetId);
            coreName = coreItem.name;
            weights[coreAssetId] = (weights[coreAssetId] || 0) + coreFrac;
        }

        const satDescriptions = [];
        satelliteItems.forEach(sat => {
            if (sat.assetId && sat.weightPct > 0) {
                const satFrac = sat.weightPct / 100;
                weights[sat.assetId] = (weights[sat.assetId] || 0) + satFrac;
                const item = getAssetById(sat.assetId);
                satDescriptions.push(`${item.name} (${sat.weightPct} %)`);
            }
        });

        // Normalize weights if sum differs from 1.0
        const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
        if (totalWeight > 0) {
            for (const k in weights) {
                weights[k] /= totalWeight;
            }
        }

        strategyTitle = `Core-Satellite: Core ${coreName} (${coreWeightPct} %) + Satelliten: ${satDescriptions.join(', ') || 'Keine'}`;
    } else {
        const assetSelect = document.getElementById('backtestAssetSelect');
        const selVal = assetSelect ? assetSelect.value : 'sp500';

        if (BACKTEST_STRATEGIES[selVal]) {
            weights = BACKTEST_STRATEGIES[selVal].weights;
            strategyTitle = BACKTEST_STRATEGIES[selVal].name;
        } else {
            weights = { [selVal]: 1.0 };
            const item = getAssetById(selVal);
            strategyTitle = `${item.fullName || item.name} (100 %)`;
        }
    }

    // Earliest possible date for selected assets
    const earliestDate = getEarliestDateForCurrentSelection();
    let userStartDate = inpStart.value || '2019-10-20';
    if (userStartDate < earliestDate) {
        userStartDate = earliestDate;
        inpStart.value = earliestDate;
    }

    // Build trading date union from userStartDate onwards
    const assetIds = Object.keys(weights);
    const dateSet = new Set();
    const priceMaps = {};

    assetIds.forEach(id => {
        const asset = historyData[id];
        priceMaps[id] = new Map();
        if (asset && asset.series) {
            asset.series.forEach(pt => {
                priceMaps[id].set(pt[0], pt[1]);
                if (pt[0] >= userStartDate) {
                    dateSet.add(pt[0]);
                }
            });
        }
    });

    const tradingDates = Array.from(dateSet).sort();
    if (tradingDates.length === 0) return;

    // Simulation state
    const units = {};
    assetIds.forEach(id => { units[id] = 0; });

    let cumulativeDeposits = 0;
    let cumulativeWithdrawals = 0;
    let totalMonthlySavings = 0;
    let monthlySavingsCount = 0;
    let totalExtraDeposits = 0;
    let extraDepositsCount = 0;
    let totalWithdrawals = 0;
    let withdrawalsCount = 0;

    const cashFlows = []; // [{ date, amount }] where deposit < 0, withdrawal > 0

    // Timeline series for trajectory chart
    const timelineLabels = [];
    const timelinePortfolioValue = [];
    const timelineNetDeposits = [];

    let lastKnownMonth = null;
    let lastKnownPrices = {};
    assetIds.forEach(id => {
        const asset = historyData[id];
        lastKnownPrices[id] = priceMaps[id].get(tradingDates[0]) || asset?.series[0]?.[1] || 100;
    });

    let peakValue = 0;
    let maxDrawdownPct = 0;

    function getPrice(id, dt) {
        if (priceMaps[id].has(dt)) {
            lastKnownPrices[id] = priceMaps[id].get(dt);
        }
        return lastKnownPrices[id];
    }

    // Day 0: Execute Initial Capital
    const day0 = tradingDates[0];
    const depositEvents = new Map();
    const savingEvents = new Map();
    backtestActiveEventDetails.clear();

    if (initialCapital > 0) {
        assetIds.forEach(id => {
            const p = getPrice(id, day0);
            const alloc = initialCapital * weights[id];
            units[id] += alloc / p;
        });
        cumulativeDeposits += initialCapital;
        cashFlows.push({ date: day0, amount: -initialCapital });
        depositEvents.set(day0, { type: 'initial', amount: initialCapital });
        backtestActiveEventDetails.set(day0 + '_deposit', {
            category: 'deposits',
            type: 'initial',
            amount: initialCapital,
            val: Math.round(initialCapital),
            netInvested: Math.round(initialCapital)
        });
    }

    // Iterate through trading dates
    tradingDates.forEach((dt, idx) => {
        assetIds.forEach(id => { getPrice(id, dt); });

        const currentMonth = dt.substring(0, 7); // YYYY-MM

        // 1. Monthly savings execution (1st trading day of new month)
        if (lastKnownMonth && currentMonth !== lastKnownMonth && monthlyRate > 0) {
            assetIds.forEach(id => {
                const p = lastKnownPrices[id];
                const alloc = monthlyRate * weights[id];
                units[id] += alloc / p;
            });
            cumulativeDeposits += monthlyRate;
            totalMonthlySavings += monthlyRate;
            monthlySavingsCount++;
            cashFlows.push({ date: dt, amount: -monthlyRate });
            savingEvents.set(dt, { type: 'monthly', amount: monthlyRate });
            backtestActiveEventDetails.set(dt + '_saving', {
                category: 'savings',
                type: 'monthly',
                amount: monthlyRate,
                val: Math.round(cumulativeDeposits), // updated below if needed
                netInvested: Math.round(cumulativeDeposits)
            });
        }
        lastKnownMonth = currentMonth;

        // 2. Extra deposits
        extraDeposits.forEach(dep => {
            if (dep.date === dt) {
                assetIds.forEach(id => {
                    const p = lastKnownPrices[id];
                    const alloc = dep.amount * weights[id];
                    units[id] += alloc / p;
                });
                cumulativeDeposits += dep.amount;
                totalExtraDeposits += dep.amount;
                extraDepositsCount++;
                cashFlows.push({ date: dt, amount: -dep.amount });
                const existing = depositEvents.get(dt) ? depositEvents.get(dt).amount : 0;
                const totalAmt = existing + dep.amount;
                depositEvents.set(dt, { type: 'extra', amount: totalAmt });
                backtestActiveEventDetails.set(dt + '_deposit', {
                    category: 'deposits',
                    type: 'extra',
                    amount: totalAmt,
                    val: Math.round(cumulativeDeposits),
                    netInvested: Math.round(cumulativeDeposits)
                });
            }
        });

        // 3. Withdrawals
        withdrawals.forEach(w => {
            if (w.date === dt) {
                let currentVal = 0;
                assetIds.forEach(id => { currentVal += units[id] * lastKnownPrices[id]; });
                if (currentVal > 0) {
                    const actualWithdraw = Math.min(w.amount, currentVal);
                    const sellFraction = actualWithdraw / currentVal;
                    assetIds.forEach(id => { units[id] *= (1 - sellFraction); });
                    cumulativeWithdrawals += actualWithdraw;
                    totalWithdrawals += actualWithdraw;
                    withdrawalsCount++;
                    cashFlows.push({ date: dt, amount: +actualWithdraw });
                }
            }
        });

        // Deduct 0.07% p.a. ETF TER for S&P 500 index replication (mirroring real UCITS ETFs like iShares SXR8)
        if (idx > 0 && units['sp500'] > 0) {
            units['sp500'] *= (1.0 - (0.0007 / 252.0));
        }

        // Calculate portfolio value on date dt
        let currentPortfolioVal = 0;
        assetIds.forEach(id => {
            currentPortfolioVal += units[id] * lastKnownPrices[id];
        });

        const netInvested = cumulativeDeposits - cumulativeWithdrawals;

        // Track max drawdown
        if (currentPortfolioVal > peakValue) {
            peakValue = currentPortfolioVal;
        }
        if (peakValue > 0) {
            const dd = ((currentPortfolioVal - peakValue) / peakValue) * 100;
            if (dd < maxDrawdownPct) {
                maxDrawdownPct = dd;
            }
        }

        timelineLabels.push(dt);
        timelinePortfolioValue.push(currentPortfolioVal);
        timelineNetDeposits.push(netInvested);
    });

    // Final Valuation Today
    const finalDate = tradingDates[tradingDates.length - 1];
    let finalDepotValue = 0;
    assetIds.forEach(id => {
        finalDepotValue += units[id] * lastKnownPrices[id];
    });

    const finalNetInvested = cumulativeDeposits - cumulativeWithdrawals;
    const finalProfit = finalDepotValue - finalNetInvested;
    const finalProfitPct = finalNetInvested > 0 ? (finalProfit / finalNetInvested) * 100 : 0;
    const finalMultiplier = finalNetInvested > 0 ? (finalDepotValue / finalNetInvested).toFixed(2) + 'x' : '1.00x';

    // Add terminal cash flow today (+finalDepotValue)
    cashFlows.push({ date: finalDate, amount: +finalDepotValue });

    // Solve for IRR p.a.
    const irrPct = calculateIRR(cashFlows);

    // Update KPI Displays
    const kpiEnd = document.getElementById('kpiFinalCapital');
    const kpiDep = document.getElementById('kpiDeposits');
    const kpiSubDep = document.getElementById('kpiSubDeposits');
    const kpiProf = document.getElementById('kpiProfit');
    const kpiMult = document.getElementById('kpiMultiplier');
    const kpiIrr = document.getElementById('kpiIrr');
    const kpiDd = document.getElementById('kpiDrawdown');

    if (kpiEnd) kpiEnd.textContent = `${Math.round(finalDepotValue).toLocaleString('de-DE')} €`;
    if (kpiDep) kpiDep.textContent = `${Math.round(finalNetInvested).toLocaleString('de-DE')} €`;
    if (kpiSubDep) kpiSubDep.textContent = `Start: ${initialCapital.toLocaleString('de-DE')} € + Sparraten: ${totalMonthlySavings.toLocaleString('de-DE')} €`;
    if (kpiProf) {
        kpiProf.textContent = `${finalProfit >= 0 ? '+' : ''}${Math.round(finalProfit).toLocaleString('de-DE')} € (${finalProfit >= 0 ? '+' : ''}${finalProfitPct.toFixed(1).replace('.', ',')} %)`;
        kpiProf.style.color = finalProfit >= 0 ? 'var(--green-trend)' : 'var(--red-trend)';
    }
    if (kpiMult) kpiMult.textContent = `Multiplikator: ${finalMultiplier}`;
    if (kpiIrr) {
        kpiIrr.textContent = `${irrPct !== null ? (irrPct >= 0 ? '+' : '') + irrPct.toFixed(2).replace('.', ',') + ' % p.a.' : 'n/a'}`;
        kpiIrr.style.color = irrPct !== null && irrPct >= 0 ? 'var(--gold-dark)' : 'var(--red-trend)';
    }
    if (kpiDd) kpiDd.textContent = `Max. Rücksetzer: ${maxDrawdownPct.toFixed(1).replace('.', ',')} %`;

    const periodBadge = document.getElementById('chartPeriodBadge');
    if (periodBadge) {
        periodBadge.textContent = `${formatDateDE(userStartDate)} – Heute (${(tradingDates.length / 252).toFixed(1).replace('.', ',')} Jahre)`;
    }

    // Map full daily values for precise point alignment
    const valMap = new Map();
    const netDepositsMap = new Map();

    for (let i = 0; i < timelineLabels.length; i++) {
        const d = timelineLabels[i];
        valMap.set(d, Math.round(timelinePortfolioValue[i]));
        netDepositsMap.set(d, Math.round(timelineNetDeposits[i]));
    }

    // Collect all critical event dates so they are never lost in downsampling
    const criticalDates = new Set();
    criticalDates.add(timelineLabels[0]);
    criticalDates.add(timelineLabels[timelineLabels.length - 1]);

    for (const dt of depositEvents.keys()) criticalDates.add(dt);
    for (const dt of savingEvents.keys()) criticalDates.add(dt);

    // Downsample for Trajectory Chart (approx 260 base points + critical event dates)
    const step = Math.max(1, Math.floor(timelineLabels.length / 260));
    const sampledDatesSet = new Set(criticalDates);
    for (let i = 0; i < timelineLabels.length; i += step) {
        sampledDatesSet.add(timelineLabels[i]);
    }
    sampledDatesSet.add(timelineLabels[timelineLabels.length - 1]);

    const sampledLabels = Array.from(sampledDatesSet).sort();
    const sampledDepotVals = [];
    const sampledNetDeposits = [];
    const dataPointsDeposits = [];
    const dataPointsSavings = [];

    sampledLabels.forEach(dt => {
        const val = valMap.get(dt) !== undefined ? valMap.get(dt) : null;
        sampledDepotVals.push(val);
        sampledNetDeposits.push(netDepositsMap.get(dt) !== undefined ? netDepositsMap.get(dt) : null);

        if (depositEvents.has(dt)) {
            dataPointsDeposits.push(val);
        } else {
            dataPointsDeposits.push(null);
        }

        if (savingEvents.has(dt)) {
            dataPointsSavings.push(val);
        } else {
            dataPointsSavings.push(null);
        }
    });

    if (trajectoryChartInstance) {
        trajectoryChartInstance.data.labels = sampledLabels;
        trajectoryChartInstance.data.datasets = [
            {
                label: 'Realer Depotwert',
                data: sampledDepotVals,
                borderColor: '#112D4E',
                backgroundColor: 'rgba(17, 45, 78, 0.08)',
                fill: true,
                borderWidth: 2.8,
                pointRadius: 0,
                pointHoverRadius: 6,
                tension: 0.15
            },
            {
                label: 'Eingezahltes Netto-Kapital',
                data: sampledNetDeposits,
                borderColor: '#64748B',
                backgroundColor: 'transparent',
                borderDash: [5, 4],
                borderWidth: 2.0,
                pointRadius: 0,
                tension: 0.05
            },
            {
                id: 'event_deposits',
                eventCategory: 'deposits',
                label: '💎 Einmalzahlungen',
                data: dataPointsDeposits,
                showLine: false,
                pointRadius: 7.5,
                pointHoverRadius: 12,
                pointStyle: 'rectRot',
                pointBackgroundColor: '#F59E0B',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2.5,
                hideFromLegend: true,
                hidden: !backtestEventsVisibility.deposits
            },
            {
                id: 'event_savings',
                eventCategory: 'savings',
                label: '● Sparplankäufe',
                data: dataPointsSavings,
                showLine: false,
                pointRadius: 4.0,
                pointHoverRadius: 6.0,
                pointStyle: 'circle',
                pointBackgroundColor: '#06B6D4',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 1.5,
                hideFromLegend: true,
                hidden: !backtestEventsVisibility.savings
            }
        ];
        if (wealthZoomController) {
            wealthZoomController.reset(true);
        }
        trajectoryChartInstance.update();
    }

    const btnSwitches = document.getElementById('btnToggleEventSwitches');
    if (btnSwitches) {
        btnSwitches.style.display = 'none';
    }

    // Update Counter Badges in Event Toolbar
    const countSwitchesEl = document.getElementById('countEventSwitches');
    const countDepositsEl = document.getElementById('countEventDeposits');
    const countSavingsEl = document.getElementById('countEventSavings');

    if (countSwitchesEl) countSwitchesEl.textContent = '0';
    if (countDepositsEl) countDepositsEl.textContent = (initialCapital > 0 ? 1 : 0) + extraDepositsCount;
    if (countSavingsEl) countSavingsEl.textContent = monthlySavingsCount;

    // Populate Detailed Cash-Flow Breakdown Table
    const summaryTbody = document.getElementById('backtestSummaryTableBody');
    if (summaryTbody) {
        summaryTbody.innerHTML = `
            <tr>
                <td><strong>Gewähltes Portfolio / Struktur</strong></td>
                <td style="font-weight: 700; color: var(--navy-dark);">${strategyTitle}</td>
                <td>Reale Total-Return-Preise inkl. automatischer Dividenden- und Ertragsreinvestition.</td>
            </tr>
            <tr>
                <td><strong>Investitionszeitraum</strong></td>
                <td style="font-weight: 600;">${formatDateDE(userStartDate)} bis heute (${formatDateDE(finalDate)})</td>
                <td>Gesamtlaufzeit: ca. ${(tradingDates.length / 252).toFixed(1).replace('.', ',')} Jahre (${tradingDates.length} Börsentage).</td>
            </tr>
            <tr>
                <td><strong>Start-Einmalanlage</strong></td>
                <td style="font-weight: 600;">${initialCapital.toLocaleString('de-DE')} €</td>
                <td>Sofortkauf von Anteilen am Starttag zu historischen Tagesschlusskursen.</td>
            </tr>
            <tr>
                <td><strong>Monatliche Sparplanausführungen</strong></td>
                <td style="font-weight: 600;">${totalMonthlySavings.toLocaleString('de-DE')} € (${monthlySavingsCount} Ausführungen à ${monthlyRate.toLocaleString('de-DE')} €)</td>
                <td>Monatlicher Anteilskauf zum jeweiligen Marktschlusskurs des 1. Handelstages.</td>
            </tr>
            <tr>
                <td><strong>Zusätzliche Sonderzahlungen</strong></td>
                <td style="font-weight: 600;">+${totalExtraDeposits.toLocaleString('de-DE')} € (${extraDepositsCount} Zusatzeinzahlungen)</td>
                <td>Sonderinvestitionen an den jeweils definierten Kalendertagen.</td>
            </tr>
            <tr>
                <td><strong>Teilverkäufe / Entnahmen</strong></td>
                <td style="font-weight: 600; color: ${totalWithdrawals > 0 ? 'var(--red-trend)' : 'inherit'};">-${totalWithdrawals.toLocaleString('de-DE')} € (${withdrawalsCount} Entnahmen)</td>
                <td>Realisierte Kapitalrückflüsse aus anteiligen Fondsverkäufen.</td>
            </tr>
            <tr style="background: rgba(17, 45, 78, 0.03);">
                <td><strong>Summe eingezahltes Netto-Kapital</strong></td>
                <td style="font-weight: 700; font-size: 0.95rem;">${Math.round(finalNetInvested).toLocaleString('de-DE')} €</td>
                <td>Tatsächlicher eigener Kapitaleinsatz (Startkapital + Sparraten + Einzahlungen - Entnahmen).</td>
            </tr>
            <tr style="background: rgba(212, 175, 55, 0.08);">
                <td><strong>Reales Depot-Endvermögen heute</strong></td>
                <td style="font-weight: 800; font-size: 1.05rem; color: var(--gold-dark);">${Math.round(finalDepotValue).toLocaleString('de-DE')} €</td>
                <td>Aktueller Marktwert aller gehaltenen Anteile auf Basis der letzten Börsenschlusskurse.</td>
            </tr>
            <tr>
                <td><strong>Absoluter Wertzuwachs (Reingewinn)</strong></td>
                <td style="font-weight: 700; color: ${finalProfit >= 0 ? 'var(--green-trend)' : 'var(--red-trend)'};">
                    ${finalProfit >= 0 ? '+' : ''}${Math.round(finalProfit).toLocaleString('de-DE')} € (${finalProfit >= 0 ? '+' : ''}${finalProfitPct.toFixed(2).replace('.', ',')} %)
                </td>
                <td>Kapital-Multiplikator: <strong>${finalMultiplier}</strong> auf das eingesetzte Nettokapital.</td>
            </tr>
            <tr>
                <td><strong>Persönliche Rendite p.a. (IRR / MWRR)</strong></td>
                <td style="font-weight: 800; color: ${irrPct !== null && irrPct >= 0 ? 'var(--gold-dark)' : 'var(--red-trend)'}; font-size: 0.95rem;">
                    ${irrPct !== null ? (irrPct >= 0 ? '+' : '') + irrPct.toFixed(2).replace('.', ',') + ' % p.a.' : 'n/a'}
                </td>
                <td>Exakter interner Zinsfuß unter Berücksichtigung des exakten Timings jedes einzelnen Cash-Flows.</td>
            </tr>
            <tr>
                <td><strong>Maximaler erlebter Depot-Rücksetzer</strong></td>
                <td style="font-weight: 600; color: var(--red-trend);">${maxDrawdownPct.toFixed(2).replace('.', ',')} %</td>
                <td>Größter Buchverlust vom Zwischenhoch bis zum Tiefpunkt, den das Gesamtdepot im Zeitraum überstanden hat.</td>
            </tr>
        `;
    }
}

/**
 * Money-Weighted Rate of Return (IRR) Calculator
 * Solves: sum_k [ C_k / (1 + r)^t_k ] = 0
 * using bisection root-finding.
 */
function calculateIRR(cashFlows) {
    if (!cashFlows || cashFlows.length < 2) return null;

    const baseDate = new Date(cashFlows[0].date).getTime();
    const parsedFlows = cashFlows.map(cf => {
        const tDays = (new Date(cf.date).getTime() - baseDate) / (1000 * 60 * 60 * 24);
        return {
            tYears: tDays / 365.25,
            amount: cf.amount
        };
    });

    const maxT = parsedFlows[parsedFlows.length - 1].tYears;
    if (maxT <= 0.05) return null; // Too short for annualized IRR

    function npv(r) {
        let val = 0;
        for (let i = 0; i < parsedFlows.length; i++) {
            val += parsedFlows[i].amount / Math.pow(1 + r, parsedFlows[i].tYears);
        }
        return val;
    }

    let low = -0.85;
    let high = 5.0; // up to +500% p.a.

    let npvLow = npv(low);
    let npvHigh = npv(high);

    // If root is even higher (e.g. Bitcoin early days)
    if (npvLow * npvHigh > 0) {
        high = 50.0;
        npvHigh = npv(high);
        if (npvLow * npvHigh > 0) {
            return null;
        }
    }

    // Bisection iterations (40 steps give < 1e-6 precision)
    for (let iter = 0; iter < 50; iter++) {
        const mid = (low + high) / 2;
        const npvMid = npv(mid);

        if (Math.abs(npvMid) < 0.01) {
            return mid * 100;
        }

        if (npvLow * npvMid < 0) {
            high = mid;
            npvHigh = npvMid;
        } else {
            low = mid;
            npvLow = npvMid;
        }
    }

    return ((low + high) / 2) * 100;
}

function formatDateDE(isoDate) {
    if (!isoDate) return '-';
    const parts = isoDate.split('-');
    if (parts.length !== 3) return isoDate;
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
}


