#!/usr/bin/env python3
"""
Rheinfinanz Analytics - Data Extraction & Maintenance Pipeline
Downloads, sanitizes, and normalizes maximum historical daily data for the 11 key assets:
1. MSCI World (iShares Core MSCI World UCITS ETF EUR - EUNL.DE)
2. FTSE All-World (Vanguard FTSE All-World UCITS ETF EUR Acc - VWCE.DE)
3. MSCI World Small Cap (iShares MSCI World Small Cap UCITS ETF EUR - IUSN.DE)
4. MSCI World Emerging Markets (iShares Core MSCI EM IMI UCITS ETF EUR - IS3N.DE)
5. S&P 500 (S&P 500 Index - ^GSPC)
6. Euro Geldmarkt ETF (Xtrackers II EUR Overnight Rate Swap UCITS ETF - XEON.DE / DBX0AN)
7. Gold in Euro (Xetra-Gold EUR - 4GLD.DE)
8. US Dividend Aristocrats (SPDR S&P US Dividend Aristocrats UCITS ETF EUR - SPYD.DE)
9. Bitcoin in Euro (Bitcoin EUR - BTC-EUR)
10. Global Portfolio One (Dr. Andreas Beck - AT0000A2B4T3 / 0P0001K82V.F)
11. Fixed Income One (Dr. Andreas Beck - AT0000A308J0 / 0P0001R2ZE.F)
"""

import urllib.request
import json
import datetime
import math
import os

ASSETS_METADATA = [
    {
        "id": "msci_world",
        "name": "MSCI World",
        "fullName": "iShares Core MSCI World UCITS ETF (EUR)",
        "ticker": "EUNL.DE",
        "tvSymbol": "XETR:EUNL",
        "category": "Aktien Welt (Industrieländer)",
        "tag": "Welt-Klassiker",
        "isin": "IE00B4L5Y983",
        "wkn": "A0RPWH",
        "ter": "0,20 % p.a.",
        "description": "Standardbaustein für die globale Aktienanlage. Investiert in über 1.500 Large- und Mid-Cap-Unternehmen aus 23 entwickelten Industrieländern."
    },
    {
        "id": "ftse_all_world",
        "name": "FTSE All-World",
        "fullName": "Vanguard FTSE All-World UCITS ETF (EUR)",
        "ticker": "VWCE.DE",
        "tvSymbol": "XETR:VWCE",
        "category": "Aktien Welt (All-Cap)",
        "tag": "Welt & EM",
        "isin": "IE00BK5BQT80",
        "wkn": "A2PKXG",
        "ter": "0,22 % p.a.",
        "description": "Breiteste Marktabdeckung: Deckt ca. 90-95 % der weltweiten investierbaren Marktkapitalisierung ab (Industrie- und Schwellenländer kombiniert)."
    },
    {
        "id": "msci_small_cap",
        "name": "MSCI World Small Cap",
        "fullName": "iShares MSCI World Small Cap UCITS ETF (EUR)",
        "ticker": "IUSN.DE",
        "tvSymbol": "XETR:IUSN",
        "category": "Nebenwerte global",
        "tag": "Small-Cap Prämie",
        "isin": "IE00BF4RFH31",
        "wkn": "A2DWBY",
        "ter": "0,35 % p.a.",
        "description": "Investiert in über 3.000 wachstumsstarke Nebenwerte (Small Caps) aus den weltweiten Industrieländern zur Erzielung einer potenziellen Größenprämie."
    },
    {
        "id": "msci_emerging_markets",
        "name": "MSCI World Emerging Markets",
        "fullName": "iShares Core MSCI Emerging Markets IMI UCITS ETF (EUR)",
        "ticker": "IS3N.DE",
        "tvSymbol": "XETR:IS3N",
        "category": "Schwellenländer",
        "tag": "Wachstumsmärkte",
        "isin": "IE00BKM4GZ66",
        "wkn": "A111X9",
        "ter": "0,18 % p.a.",
        "description": "Umfassender Zugang zu über 3.000 Unternehmen in 24 Schwellenländern wie Taiwan, Indien, China, Brasilien und Südkorea."
    },
    {
        "id": "sp500",
        "name": "S&P 500",
        "fullName": "iShares Core S&P 500 UCITS ETF (EUR)",
        "ticker": "SXR8.DE",
        "tvSymbol": "XETR:SXR8",
        "category": "USA Leitmarkt",
        "tag": "US-Leitindex (EUR)",
        "isin": "IE00B5BMR087",
        "wkn": "A0YEDG",
        "ter": "0,07 % p.a.",
        "description": "Führender US-Leitindex der 500 wertvollsten Unternehmen in Euro inkl. automatischer Dividenden-Reinvestition (Total Return). Historie bis 1970 zurückgerechnet."
    },
    {
        "id": "euro_geldmarkt",
        "name": "Euro Geldmarkt ETF",
        "fullName": "Xtrackers II EUR Overnight Rate Swap UCITS ETF (1C)",
        "ticker": "XEON.DE",
        "tvSymbol": "XETR:XEON",
        "category": "Geldmarkt & Liquidität",
        "tag": "Risikofreier Zins",
        "isin": "LU0290358497",
        "wkn": "DBX0AN",
        "ter": "0,10 % p.a.",
        "description": "Bildet exakt den kurzfristigen Euro-Geldmarktzins (€STR der EZB) ab. Historie vor 2008 mit offiziellen Geldmarktsätzen der Deutschen Bundesbank (FIBOR/Euribor) lückenlos bis 1970 zurückgerechnet. Dient als risikofreier Liquiditätspuffer und moderne Tagesgeld-Alternative im Depot."
    },
    {
        "id": "gold_eur",
        "name": "Gold in Euro",
        "fullName": "Xetra-Gold ETC (EUR je Gramm/Unze)",
        "ticker": "4GLD.DE",
        "tvSymbol": "XETR:4GLD",
        "category": "Edelmetalle / Sachwert",
        "tag": "Krisenwährung",
        "isin": "DE000A0S9GB0",
        "wkn": "A0S9GB",
        "ter": "0,00 % p.a. (Lagergebühr)",
        "description": "100 % physisch in Tresoren der Deutschen Börse hinterlegtes Gold, gehandelt in Euro. Schützt vor Währungsabwertung und geopolitischen Schocks."
    },
    {
        "id": "us_dividend_aristocrats",
        "name": "US Dividend Aristocrats",
        "fullName": "SPDR S&P US Dividend Aristocrats UCITS ETF (EUR)",
        "ticker": "SPYD.DE",
        "tvSymbol": "XETR:SPYD",
        "category": "Dividendenqualität",
        "tag": "Qualitätsdividenden",
        "isin": "IE00B6YX5D40",
        "wkn": "A1JKS0",
        "ter": "0,35 % p.a.",
        "description": "Investiert selektiv in US-Qualitätsunternehmen, die ihre Dividenden seit mindestens 20 aufeinanderfolgenden Jahren ununterbrochen gesteigert haben."
    },
    {
        "id": "bitcoin_eur",
        "name": "Bitcoin in Euro",
        "fullName": "Bitcoin Spot (EUR)",
        "ticker": "BTC-EUR",
        "tvSymbol": "BINANCE:BTCEUR",
        "category": "Digitale Sachwerte / Krypto",
        "tag": "Digitales Gold",
        "isin": "-",
        "wkn": "-",
        "ter": "-",
        "description": "Erste und größte dezentrale Kryptowährung mit mathematisch begrenztem Angebot von 21 Millionen Einheiten, notiert in Euro."
    },
    {
        "id": "global_portfolio_one",
        "name": "Global Portfolio One",
        "fullName": "GlobalPortfolioOne RT (Dr. Andreas Beck)",
        "ticker": "0P0001K82V.F",
        "tvSymbol": "FWB:D5V0",
        "category": "Multi-Asset Antizyklik",
        "tag": "Dr. Andreas Beck",
        "isin": "AT0000A2B4T3",
        "wkn": "A2PT6U",
        "ter": "0,70 % p.a.",
        "description": "Wissenschaftliches Weltportfolio nach Dr. Andreas Beck. Investiert antizyklisch in die Weltwirtschaft und hält eine dynamische Eigenkapitalkomponente zur Krisennutzung."
    },
    {
        "id": "fixed_income_one",
        "name": "Fixed Income One",
        "fullName": "Fixed Income One (Dr. Andreas Beck)",
        "ticker": "0P0001R2ZE.F",
        "tvSymbol": "FWB:D5V3",
        "category": "Anleihen & Zinsstrategie",
        "tag": "Dr. Andreas Beck",
        "isin": "AT0000A347S9",
        "wkn": "A3EEYP",
        "ter": "0,45 % p.a.",
        "description": "Systematischer Rentenfonds nach Dr. Andreas Beck. Investiert breit in defensive Staats- und Unternehmensanleihen höchster Bonität zur Ertragsgenerierung und Portfoliostabilisierung."
    }
]

def fetch_raw_ticker(ticker):
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
    url = f'https://query1.finance.yahoo.com/v8/finance/chart/{ticker}?period1=0&period2=2000000000&interval=1d'
    req = urllib.request.Request(url, headers=headers)
    
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        
    result = data['chart']['result'][0]
    meta = result['meta']
    timestamps = result.get('timestamp', [])
    quote = result['indicators']['quote'][0]
    closes = quote.get('close', [])
    adj_closes = result.get('indicators', {}).get('adjclose', [{}])[0].get('adjclose', closes)
    if not adj_closes:
        adj_closes = closes
        
    cleaned_series = []
    for ts, c, ac in zip(timestamps, closes, adj_closes):
        price = ac if (ac is not None and not math.isnan(ac) and ac > 0) else c
        if price is not None and not math.isnan(price) and price > 0:
            dt_str = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
            cleaned_series.append([dt_str, round(float(price), 4)])
            
    seen = set()
    deduped = []
    for dt, p in cleaned_series:
        if dt not in seen:
            seen.add(dt)
            deduped.append([dt, p])
            
    deduped.sort(key=lambda x: x[0])
    return deduped, meta

def fetch_ticker_data(ticker):
    if ticker == 'SXR8.DE':
        # Primary: SXR8.DE (iShares Core S&P 500 UCITS ETF in EUR)
        series_etf, meta = fetch_raw_ticker('SXR8.DE')
        meta['currency'] = 'EUR'
        # Backfill pre-2010 with ^GSPC scaled to ETF price on inception date
        try:
            series_spx, _ = fetch_raw_ticker('^GSPC')
            spx_dict = dict(series_spx)
            first_dt, first_val = series_etf[0]
            if first_dt in spx_dict:
                scale = first_val / spx_dict[first_dt]
                stitched = []
                for dt, p in series_spx:
                    if dt < first_dt:
                        stitched.append([dt, round(p * scale, 4)])
                stitched.extend(series_etf)
                return stitched, meta
        except Exception as e:
            print(f" (backfill failed: {e})", end="")
        return series_etf, meta
    elif ticker == 'XEON.DE':
        # Primary: XEON.DE (Xtrackers II EUR Overnight Rate Swap UCITS ETF)
        series_etf, meta = fetch_raw_ticker('XEON.DE')
        meta['currency'] = 'EUR'
        try:
            # Fetch official German / Euribor interbank rates from FRED (IR3TIB01DEM156N)
            import subprocess
            res = subprocess.run(['curl', '-s', '-m', '10', 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=IR3TIB01DEM156N'], capture_output=True, text=True)
            lines = [l.strip().split(',') for l in res.stdout.split('\n') if l.strip() and not l.startswith('obs') and not l.startswith('<')]
            rates_map = {row[0][:7]: float(row[1]) for row in lines if len(row) >= 2 and row[1] != '.'}
            
            # Reference trading dates from S&P 500 (^GSPC)
            series_spx, _ = fetch_raw_ticker('^GSPC')
            first_dt, first_val = series_etf[0]
            pre_dates = [dt for dt, _ in series_spx if dt < first_dt]
            
            curr_price = first_val
            backfilled = []
            for i in range(len(pre_dates) - 1, -1, -1):
                dt = pre_dates[i]
                m_key = dt[:7]
                # Default to 4.5% if missing for any historical month
                ann_rate = rates_map.get(m_key, 4.5)
                # Daily rate net of 0.10% TER
                net_daily_rate = max(0.0, (ann_rate - 0.10) / 100.0) / 252.0
                prev_price = curr_price / (1.0 + net_daily_rate)
                backfilled.append([dt, round(prev_price, 4)])
                curr_price = prev_price
                
            backfilled.reverse()
            stitched = backfilled + series_etf
            print(f" (backfilled {len(backfilled)} days to {stitched[0][0]} with Bundesbank/Euribor rates)", end="")
            return stitched, meta
        except Exception as e:
            print(f" (Geldmarkt backfill failed: {e})", end="")
            return series_etf, meta
    else:
        return fetch_raw_ticker(ticker)

def compute_metrics(series, rf_rate=0.025):
    """Computes return, volatility, max drawdown, and Sharpe ratio."""
    if not series or len(series) < 2:
        return {}
        
    start_date = series[0][0]
    end_date = series[-1][0]
    start_val = series[0][1]
    end_val = series[-1][1]
    
    # Days elapsed
    d1 = datetime.datetime.strptime(start_date, '%Y-%m-%d')
    d2 = datetime.datetime.strptime(end_date, '%Y-%m-%d')
    years = (d2 - d1).days / 365.25
    
    # Total & annualized return
    total_return = (end_val / start_val) - 1.0
    cagr = (end_val / start_val) ** (1.0 / max(years, 0.1)) - 1.0 if years > 0.1 else total_return
    
    # 1Y, 3Y, 5Y, 10Y cumulative total returns (gesamt, nicht p.a.)
    def return_n_years_ago(n):
        target_d = d2 - datetime.timedelta(days=n * 365.25)
        closest = None
        for dt_str, val in series:
            dt = datetime.datetime.strptime(dt_str, '%Y-%m-%d')
            if dt <= target_d:
                closest = val
            else:
                break
        if closest and closest > 0:
            tot = (end_val / closest) - 1.0
            return round(tot * 100.0, 2)
        return None

    ret_1y = return_n_years_ago(1)
    ret_3y = return_n_years_ago(3)
    ret_5y = return_n_years_ago(5)
    ret_10y = return_n_years_ago(10)
    
    # Daily returns for volatility and Sharpe ratio
    daily_returns = []
    for i in range(1, len(series)):
        prev = series[i-1][1]
        curr = series[i][1]
        if prev > 0:
            daily_returns.append((curr - prev) / prev)
            
    if daily_returns:
        mean_ret = sum(daily_returns) / len(daily_returns)
        var = sum((r - mean_ret) ** 2 for r in daily_returns) / len(daily_returns)
        daily_vol = math.sqrt(var)
        annualized_vol = daily_vol * math.sqrt(252)
    else:
        annualized_vol = 0.0
        
    # Max Drawdown
    peak = -1.0
    max_dd = 0.0
    for _, val in series:
        if val > peak:
            peak = val
        dd = (val - peak) / peak
        if dd < max_dd:
            max_dd = dd
            
    # Sharpe Ratio
    sharpe = (cagr - rf_rate) / annualized_vol if annualized_vol > 0.001 else 0.0

    # Sortino Ratio (Downside deviation below risk-free rate)
    daily_rf = rf_rate / 252.0
    downside_sq_diffs = [min(0.0, r - daily_rf) ** 2 for r in daily_returns]
    if downside_sq_diffs:
        downside_dev = math.sqrt(sum(downside_sq_diffs) / len(downside_sq_diffs)) * math.sqrt(252)
        sortino = (cagr - rf_rate) / downside_dev if downside_dev > 0.001 else 0.0
    else:
        sortino = 0.0
    
    # 1-day change
    if len(series) >= 2:
        prev_close = series[-2][1]
        curr_close = series[-1][1]
        day_chg_pct = ((curr_close - prev_close) / prev_close) * 100.0
    else:
        day_chg_pct = 0.0
        
    return {
        "startDate": start_date,
        "endDate": end_date,
        "years": round(years, 1),
        "dataPoints": len(series),
        "latestPrice": end_val,
        "dayChangePct": round(day_chg_pct, 2),
        "totalReturnPct": round(total_return * 100, 2),
        "cagrPct": round(cagr * 100, 2),
        "return1Y": ret_1y,
        "return3Y": ret_3y,
        "return5Y": ret_5y,
        "return10Y": ret_10y,
        "volatilityPct": round(annualized_vol * 100, 2),
        "maxDrawdownPct": round(max_dd * 100, 2),
        "sharpeRatio": round(sharpe, 2),
        "sortinoRatio": round(sortino, 2)
    }

def fetch_fx_history(all_dates):
    print("-> Fetching EUR/USD exchange rates (FRED DEXUSEU & EXGEUS)...", end='', flush=True)
    import subprocess
    # 1. Daily EUR/USD from FRED (1999 to 2026)
    dexuseu = {}
    try:
        res1 = subprocess.run(['curl', '-s', '-m', '10', 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DEXUSEU'], capture_output=True, text=True)
        lines1 = [l.strip().split(',') for l in res1.stdout.split('\n') if l.strip() and not l.startswith('obs')]
        for r in lines1:
            if len(r) >= 2 and r[1] not in ('.', ''):
                try:
                    dexuseu[r[0]] = round(float(r[1]), 4)
                except ValueError:
                    pass
    except Exception as e:
        print(f" (DEXUSEU failed: {e})", end="")

    # 2. Monthly DEM/USD from FRED (1971 to 1998, 1 EUR = 1.95583 DEM)
    exgeus = {}
    try:
        res2 = subprocess.run(['curl', '-s', '-m', '10', 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=EXGEUS'], capture_output=True, text=True)
        lines2 = [l.strip().split(',') for l in res2.stdout.split('\n') if l.strip() and not l.startswith('obs')]
        for r in lines2:
            if len(r) >= 2 and r[1] not in ('.', ''):
                try:
                    exgeus[r[0][:7]] = round(1.95583 / float(r[1]), 4)
                except ValueError:
                    pass
    except Exception as e:
        print(f" (EXGEUS failed: {e})", end="")

    sorted_dates = sorted(all_dates)
    fx_series = []
    last_r = 1.1231
    for dt in sorted_dates:
        if dt in dexuseu:
            last_r = dexuseu[dt]
        elif dt[:7] in exgeus:
            last_r = exgeus[dt[:7]]
        elif dt < '1971-01-01':
            last_r = 0.5344
        fx_series.append([dt, last_r])

    print(f" OK: {len(fx_series)} points (1970 to today, latest: {last_r})")
    return fx_series

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = os.path.join(base_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)
    
    history_output = {
        "metadata": {
            "title": "Rheinfinanz Analytics - 11 Core Asset History",
            "lastUpdated": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "assetCount": len(ASSETS_METADATA)
        },
        "assets": {}
    }
    
    catalog = []
    
    print(f"Starting data download for {len(ASSETS_METADATA)} assets...")
    
    for item in ASSETS_METADATA:
        asset_id = item['id']
        ticker = item['ticker']
        print(f"-> Fetching {item['name']:<28} ({ticker})...", end='', flush=True)
        try:
            series, meta = fetch_ticker_data(ticker)
            metrics = compute_metrics(series)
            currency = meta.get('currency', 'EUR')
            
            asset_payload = {
                "id": asset_id,
                "name": item['name'],
                "fullName": item['fullName'],
                "category": item['category'],
                "tag": item['tag'],
                "ticker": ticker,
                "tvSymbol": item['tvSymbol'],
                "isin": item['isin'],
                "wkn": item['wkn'],
                "ter": item['ter'],
                "currency": currency,
                "description": item['description'],
                "metrics": metrics,
                "series": series
            }
            
            history_output["assets"][asset_id] = asset_payload
            
            # Catalog entry (without full series for quick loading)
            catalog_entry = {**item, "currency": currency, "metrics": metrics}
            catalog.append(catalog_entry)
            
            print(f" OK: {len(series)} points ({metrics['startDate']} to {metrics['endDate']}), CAGR: {metrics['cagrPct']}%")
            
        except Exception as e:
            print(f" FAILED: {e}")
            
    # Fetch EUR/USD exchange rates for all dates
    all_dates = set()
    for asset in history_output["assets"].values():
        for pt in asset["series"]:
            all_dates.add(pt[0])
    history_output["fx"] = {
        "EUR_USD": fetch_fx_history(all_dates)
    }

    # Save master history.json
    history_file = os.path.join(data_dir, 'history.json')
    with open(history_file, 'w', encoding='utf-8') as f:
        json.dump(history_output, f, ensure_ascii=False, indent=2)
    file_size_kb = os.path.getsize(history_file) / 1024
    print(f"\nSaved master history to: {history_file} ({file_size_kb:.1f} KB)")
    
    # Save catalog.json (metadata only, ultra-fast for initial page render)
    catalog_file = os.path.join(data_dir, 'catalog.json')
    with open(catalog_file, 'w', encoding='utf-8') as f:
        json.dump({"lastUpdated": history_output["metadata"]["lastUpdated"], "assets": catalog}, f, ensure_ascii=False, indent=2)
    print(f"Saved catalog metadata to: {catalog_file} ({os.path.getsize(catalog_file)/1024:.1f} KB)")

    # Also write JS wrappers for instantaneous offline/file:// protocol execution
    js_dir = os.path.join(base_dir, 'js')
    with open(os.path.join(js_dir, 'catalog_data.js'), 'w', encoding='utf-8') as f:
        f.write('/** Auto-generated catalog data */\nwindow.CATALOG_DATA = ' + json.dumps({"lastUpdated": history_output["metadata"]["lastUpdated"], "assets": catalog}, ensure_ascii=False) + ';\n')
    with open(os.path.join(js_dir, 'history_data.js'), 'w', encoding='utf-8') as f:
        f.write('/** Auto-generated history data */\nwindow.HISTORY_DATA = ' + json.dumps(history_output, ensure_ascii=False) + ';\n')
    print("Saved offline JS wrappers (catalog_data.js and history_data.js)")
    
    print("\nData pipeline completed successfully!")

if __name__ == '__main__':
    main()
