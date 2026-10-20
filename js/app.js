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

// By default: ONLY ONE index is selected (MSCI World) as requested!
let activeBacktestAssets = new Set(['msci_world']);
let focusedAssetId = 'msci_world';
let currentPeriod = 'gpo'; // 'gpo', 'fio', '5y', '10y', 'max'
let currentChartMode = 'indexed'; // 'indexed' or 'drawdown'
let historicalChartInstance = null;

// Strategy Lab State
let currentStrategyId = 'beck_gpo';
let customWeights = { ...PRESET_STRATEGIES.custom.weights };
let trajectoryChartInstance = null;
let donutChartInstance = null;

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
    initIndexCards();
    initHistoricalComparisonModule();
    renderInstrumentDetails(getAssetById(focusedAssetId));
    initStrategyPresets();
    initSliders();
    initCharts();
    updateCalculations();
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
        // Only allow unselecting if at least one other asset remains active
        if (activeBacktestAssets.size > 1) {
            activeBacktestAssets.delete(assetId);
            // If the unselected asset was focused, switch focus to another active asset
            if (focusedAssetId === assetId) {
                focusedAssetId = Array.from(activeBacktestAssets)[0];
            }
        } else {
            // Keep it active, but re-focus
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
            <span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">Aktueller Detail-Steckbrief</span>
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
    initModePills();
    initQuickActionButtons();
    renderHistoricalTable();
    initHistoricalChart();
}

function initQuickActionButtons() {
    const btnMsci = document.getElementById('btnOnlyMsci');
    if (btnMsci) {
        btnMsci.addEventListener('click', () => {
            activeBacktestAssets = new Set(['msci_world']);
            focusedAssetId = 'msci_world';
            syncCardStates();
            updateSelectionCounter();
            renderInstrumentDetails(getAssetById(focusedAssetId));
            updateHistoricalChart();
        });
    }

    const btnGpo = document.getElementById('btnGpoVsWorld');
    if (btnGpo) {
        btnGpo.addEventListener('click', () => {
            activeBacktestAssets = new Set(['msci_world', 'global_portfolio_one']);
            focusedAssetId = 'global_portfolio_one';
            syncCardStates();
            updateSelectionCounter();
            renderInstrumentDetails(getAssetById(focusedAssetId));
            updateHistoricalChart();
        });
    }

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

    // Downsample if more than 300 dates to ensure instant 60fps rendering
    const step = Math.max(1, Math.floor(sortedDates.length / 280));
    const sampledDates = [];
    for (let i = 0; i < sortedDates.length; i += step) {
        sampledDates.push(sortedDates[i]);
    }
    // Always include latest date
    if (sampledDates[sampledDates.length - 1] !== sortedDates[sortedDates.length - 1]) {
        sampledDates.push(sortedDates[sortedDates.length - 1]);
    }

    const datasets = [];
    const isSingleAsset = activeBacktestAssets.size === 1;

    activeBacktestAssets.forEach(assetId => {
        const asset = historyData[assetId];
        const series = activeSeriesMap[assetId];
        if (!asset || !series || series.length === 0) return;

        // Build price map for fast lookup
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
                // Indexed: base 100
                const indexed = (lastKnown / basePrice) * 100;
                dataPoints.push(Math.round(indexed * 10) / 10);
            }
        });

        const color = ASSET_COLORS[assetId] || '#112D4E';

        // Enhanced single asset presentation with soft background gradient
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
   Section 2: Strategy Lab & Portfolio Calculator Controller
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
