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
        fullName: 'iShares Core S&P 500 UCITS ETF (EUR)',
        ticker: 'SXR8.DE',
        category: 'USA Leitmarkt',
        tag: 'US-Leitindex (EUR)',
        isin: 'IE00B5BMR087',
        wkn: 'A0YEDG',
        ter: '0,07 % p.a.',
        currency: 'EUR',
        description: 'Führender US-Leitindex der 500 wertvollsten Unternehmen in Euro inkl. automatischer Dividenden-Reinvestition (Total Return). Historie bis 1970 zurückgerechnet.',
        metrics: { latestPrice: 738.96, dayChangePct: 0.15, cagrPct: 8.36, volatilityPct: 15.65, maxDrawdownPct: -54.20, sharpeRatio: 0.38, return1Y: 22.00, return3Y: 20.91, return5Y: 13.35 }
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
let currentChartMode = 'indexed'; // 'indexed' or 'drawdown'
let historicalChartInstance = null;

// Table Sorting State
let tableSortColumn = null;
let tableSortAsc = false;

// Section 2: Historical Portfolio & Savings Plan Backtest State
let trajectoryChartInstance = null;
let extraDepositsList = [];
let withdrawalsList = [];

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
    initIndexCards();
    initHistoricalComparisonModule();
    renderInstrumentDetails(getAssetById(focusedAssetId));
    initBacktestModule();
});

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
    if (counter) {
        const count = activeBacktestAssets.size;
        counter.textContent = `${count} von 11 Indizes im Chart aktiv`;
    }
}

function renderInstrumentDetails(item) {
    const box = document.getElementById('instrumentDetailsBox');
    if (!box) return;

    const m = item.metrics || {};
    const priceFormatted = `${(m.latestPrice || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${item.currency === 'USD' ? '$' : '€'}`;
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
            <span class="inst-metric-val">${m.sharpeRatio !== undefined ? m.sharpeRatio : '-'}</span>
        </div>
        <div class="inst-metric-item">
            <span class="inst-metric-label">Sortino Ratio</span>
            <span class="inst-metric-val" style="color: var(--gold-dark);">${m.sortinoRatio !== undefined ? m.sortinoRatio : '-'}</span>
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
    initTimeframePills();
    initCustomDateControls();
    initModePills();
    initQuickActionButtons();
    initTableSorting();
    renderHistoricalTable();
    initHistoricalChart();
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
    items.forEach(item => {
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
        const sortinoStr = m.sortinoRatio !== null && m.sortinoRatio !== undefined ? m.sortinoRatio.toFixed(2) : '-';

        const color = ASSET_COLORS[item.id] || '#112D4E';

        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.title = 'Klicken, um diesen Index im Chart ein- oder auszublenden';
        tr.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 8px; height: 8px; border-radius: 50%; background: ${color};"></span>
                    <div>
                        <div style="font-weight: 700; color: var(--navy-dark);">${item.name}</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${item.isin || item.ticker}</div>
                    </div>
                </div>
            </td>
            <td><span style="font-size: 0.74rem; background: #F1F5F9; padding: 2px 7px; border-radius: 4px;">${item.category}</span></td>
            <td class="${dayClass}">${dayStr}</td>
            <td class="${m.return1Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret1YStr}</td>
            <td class="${m.return3Y >= 0 ? 'metric-positive' : 'metric-negative'}">${ret3YStr}</td>
            <td class="metric-positive" style="font-weight: 700;">${totRetStr}</td>
            <td style="font-weight: 700; color: var(--navy-primary);">${cagrStr}</td>
            <td>${volStr}</td>
            <td class="metric-negative">${ddStr}</td>
            <td style="font-weight: 600;">${sharpeStr}</td>
            <td style="font-weight: 700; color: var(--gold-dark);">${sortinoStr}</td>
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
                                return ` ${context.dataset.label}: ${val.toFixed(2)} % Drawdown`;
                            } else {
                                return ` ${context.dataset.label}: ${val.toFixed(1)} (Index Basis 100)`;
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
                            return currentChartMode === 'drawdown' ? `${value} %` : value;
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
                const indexed = (lastKnown / basePrice) * 100;
                dataPoints.push(Math.round(indexed * 10) / 10);
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
            borderColor: color,
            backgroundColor: bgColor,
            fill: fill,
            borderWidth: isSingleAsset ? 3.0 : 2.2,
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
   Section 2: Persönlicher historischer Sparplan- & Portfolio-Backtest
   ========================================================================== */

function initBacktestModule() {
    initBacktestInputs();
    initBacktestChart();
    updateBacktestAssetBadge();
    runHistoricalBacktest();
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

    // Collapsible Accordions
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

    // Open wrapper if not already open
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
    const assetSelect = document.getElementById('backtestAssetSelect');
    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    if (!assetSelect || !historyData) return '2019-10-20';

    const selVal = assetSelect.value;
    let requiredAssets = [];

    if (BACKTEST_STRATEGIES[selVal]) {
        requiredAssets = Object.keys(BACKTEST_STRATEGIES[selVal].weights);
    } else {
        requiredAssets = [selVal];
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
                            return ` ${context.dataset.label}: ${Math.round(context.parsed.y).toLocaleString('de-DE')} €`;
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
}

/**
 * Historical Backtest Calculation Engine
 * Replays cash-flows on actual historical daily prices up to today.
 */
function runHistoricalBacktest() {
    const historyData = window.HISTORY_DATA ? window.HISTORY_DATA.assets : {};
    if (!historyData || Object.keys(historyData).length === 0) return;

    const assetSelect = document.getElementById('backtestAssetSelect');
    const inpStart = document.getElementById('inputBacktestStart');
    const inpCapital = document.getElementById('inputInitialCapital');
    const inpMonthly = document.getElementById('inputMonthlyRate');

    if (!assetSelect || !inpStart) return;

    const selVal = assetSelect.value;
    let weights = {};
    let strategyTitle = '';

    if (BACKTEST_STRATEGIES[selVal]) {
        weights = BACKTEST_STRATEGIES[selVal].weights;
        strategyTitle = BACKTEST_STRATEGIES[selVal].name;
    } else {
        weights = { [selVal]: 1.0 };
        const item = getAssetById(selVal);
        strategyTitle = `${item.fullName || item.name} (100 %)`;
    }

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

    // Helper to get price on date t
    function getPrice(id, dt) {
        if (priceMaps[id].has(dt)) {
            lastKnownPrices[id] = priceMaps[id].get(dt);
        }
        return lastKnownPrices[id];
    }

    // Day 0: Execute Initial Capital
    const day0 = tradingDates[0];
    if (initialCapital > 0) {
        assetIds.forEach(id => {
            const p = getPrice(id, day0);
            const alloc = initialCapital * weights[id];
            units[id] += alloc / p;
        });
        cumulativeDeposits += initialCapital;
        cashFlows.push({ date: day0, amount: -initialCapital });
    }

    // Iterate through trading dates
    tradingDates.forEach((dt, idx) => {
        // Update prices
        assetIds.forEach(id => { getPrice(id, dt); });

        const currentMonth = dt.substring(0, 7); // YYYY-MM

        // 1. Check for monthly savings execution (1st trading day of new month, after start month)
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
        }
        lastKnownMonth = currentMonth;

        // 2. Check for extra deposits on this date
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
            }
        });

        // 3. Check for withdrawals on this date
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

        // Calculate portfolio value on date dt
        let currentPortfolioVal = 0;
        assetIds.forEach(id => {
            currentPortfolioVal += units[id] * lastKnownPrices[id];
        });

        const netInvested = cumulativeDeposits - cumulativeWithdrawals;

        // Track max drawdown of portfolio equity
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

    // Downsample for Trajectory Chart (250 points)
    const step = Math.max(1, Math.floor(timelineLabels.length / 260));
    const sampledLabels = [];
    const sampledDepotVals = [];
    const sampledNetDeposits = [];

    for (let i = 0; i < timelineLabels.length; i += step) {
        sampledLabels.push(timelineLabels[i]);
        sampledDepotVals.push(Math.round(timelinePortfolioValue[i]));
        sampledNetDeposits.push(Math.round(timelineNetDeposits[i]));
    }
    if (sampledLabels[sampledLabels.length - 1] !== timelineLabels[timelineLabels.length - 1]) {
        sampledLabels.push(timelineLabels[timelineLabels.length - 1]);
        sampledDepotVals.push(Math.round(timelinePortfolioValue[timelinePortfolioValue.length - 1]));
        sampledNetDeposits.push(Math.round(timelineNetDeposits[timelineNetDeposits.length - 1]));
    }

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
            }
        ];
        trajectoryChartInstance.update();
    }

    // Populate Detailed Cash-Flow Breakdown Table
    const summaryTbody = document.getElementById('backtestSummaryTableBody');
    if (summaryTbody) {
        summaryTbody.innerHTML = `
            <tr>
                <td><strong>Gewähltes Anlageinstrument / Portfolio</strong></td>
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
                <td>Sofortkauf von Fondsanteilen am Starttag zu historischen Tagesschlusskursen.</td>
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

