/**
 * Rheinfinanz Analytics - Strategie- und Portfolioberechnungsmodul
 * Enthält Asset-Klassen-Parameter, vordefinierte Strategien, Zinseszins- und Risikosimulationen
 */

const ASSET_CLASSES = {
    world_equity: {
        id: 'world_equity',
        name: 'Aktien Industrieländer (MSCI World)',
        shortName: 'Aktien Welt',
        expectedReturn: 0.075, // 7.5% p.a.
        volatility: 0.150,     // 15.0% p.a.
        color: '#112D4E',      // Navy Primary
        description: 'Breit gestreute Beteiligung an über 1.500 führenden Unternehmen aus 23 Industrieländern.'
    },
    emerging_equity: {
        id: 'emerging_equity',
        name: 'Aktien Schwellenländer (MSCI Emerging Markets)',
        shortName: 'Emerging Markets',
        expectedReturn: 0.082, // 8.2% p.a.
        volatility: 0.190,     // 19.0% p.a.
        color: '#D4AF37',      // Gold
        description: 'Investition in wachstumsstarke Märkte wie Asien, Lateinamerika und Osteuropa mit höherem Rendite- und Risikopotenzial.'
    },
    bonds: {
        id: 'bonds',
        name: 'Anleihen (Globale Staats- & Unternehmensanleihen)',
        shortName: 'Anleihen',
        expectedReturn: 0.038, // 3.8% p.a.
        volatility: 0.055,     // 5.5% p.a.
        color: '#3F72AF',      // Wave Blue
        description: 'Defensive Zinspapiere mit hoher Bonität zur Dämpfung von Wertschwankungen im Gesamtdepot.'
    },
    gold: {
        id: 'gold',
        name: 'Gold (Physisch besichert)',
        shortName: 'Gold',
        expectedReturn: 0.050, // 5.0% p.a.
        volatility: 0.140,     // 14.0% p.a.
        color: '#AA8825',      // Dark Gold
        description: 'Knappes Sachwert-Edelmetall zur Absicherung gegen extreme Marktverwerfungen und Währungsabwertung.'
    },
    cash: {
        id: 'cash',
        name: 'Geldmarkt / Tagesgeld',
        shortName: 'Geldmarkt / Cash',
        expectedReturn: 0.025, // 2.5% p.a.
        volatility: 0.005,     // 0.5% p.a.
        color: '#94A3B8',      // Slate / Neutral
        description: 'Täglich verfügbare Liquiditätsreserve ohne Kursrisiko, aber inflationsgefährdet.'
    }
};

const PRESET_STRATEGIES = {
    world_100: {
        id: 'world_100',
        name: '100 % All-World Aktien',
        subtitle: 'Maximales langfristiges Wachstum',
        icon: 'globe',
        riskLevel: 'Dynamisch / Wachstumsstark',
        riskScore: 5,
        weights: {
            world_equity: 0.90,
            emerging_equity: 0.10,
            bonds: 0.0,
            gold: 0.0,
            cash: 0.0
        },
        description: 'Reines Weltaktienportfolio (nach Marktkapitalisierung) für maximale Renditechancen bei einem Anlagehorizont von mindestens 10–15 Jahren.',
        expectedReturn: 0.076,
        volatility: 0.152,
        historicalMaxDrawdown: -0.54,
        sharpeRatio: 0.37
    },
    world_70_30: {
        id: 'world_70_30',
        name: '70 / 30 Welt-Portfolio',
        subtitle: 'BIP-gewichteter All-World Klassiker',
        icon: 'pie-chart',
        riskLevel: 'Dynamisch',
        riskScore: 5,
        weights: {
            world_equity: 0.70,
            emerging_equity: 0.30,
            bonds: 0.0,
            gold: 0.0,
            cash: 0.0
        },
        description: 'Der populäre 70/30-Ansatz nach Dr. Gerd Kommer. Gewichtet Schwellenländer stärker nach ihrem weltweiten Wirtschaftsanteil (BIP).',
        expectedReturn: 0.077,
        volatility: 0.160,
        historicalMaxDrawdown: -0.56,
        sharpeRatio: 0.36
    },
    classic_60_40: {
        id: 'classic_60_40',
        name: '60 / 40 Klassiker',
        subtitle: 'Ausgewogen mit Stabilitätsanker',
        icon: 'shield',
        riskLevel: 'Ausgewogen',
        riskScore: 3,
        weights: {
            world_equity: 0.50,
            emerging_equity: 0.10,
            bonds: 0.40,
            gold: 0.0,
            cash: 0.0
        },
        description: 'Der zeitlose institutionelle Standard: 60 % weltweite Aktien kombiniert mit 40 % qualitätsorientierten Anleihen zur Glättung von Crashphasen.',
        expectedReturn: 0.059,
        volatility: 0.098,
        historicalMaxDrawdown: -0.32,
        sharpeRatio: 0.40
    },
    allweather: {
        id: 'allweather',
        name: 'Allwetter-Portfolio',
        subtitle: 'Kompensiert alle Markt- und Zinszyklen',
        icon: 'cloud-sun',
        riskLevel: 'Konservativ / Stabil',
        riskScore: 2,
        weights: {
            world_equity: 0.35,
            emerging_equity: 0.05,
            bonds: 0.45,
            gold: 0.10,
            cash: 0.05
        },
        description: 'In Anlehnung an Ray Dalios All-Weather-Prinzip: Schützt Vermögen in Phasen von Inflation, Deflation, Wachstum und Rezession durch breite Diversifikation.',
        expectedReturn: 0.052,
        volatility: 0.072,
        historicalMaxDrawdown: -0.19,
        sharpeRatio: 0.44
    },
    custom: {
        id: 'custom',
        name: 'Individuelle Allokation',
        subtitle: 'Frei konfigurierbares Wunsch-Portfolio',
        icon: 'sliders',
        riskLevel: 'Benutzerdefiniert',
        riskScore: 0,
        weights: {
            world_equity: 0.50,
            emerging_equity: 0.15,
            bonds: 0.20,
            gold: 0.05,
            cash: 0.10
        },
        description: 'Konfigurieren Sie Ihre eigene Vermögensaufteilung stufenlos mit interaktiven Schiebereglern.',
        expectedReturn: 0.063,
        volatility: 0.110,
        historicalMaxDrawdown: -0.35,
        sharpeRatio: 0.39
    }
};

/**
 * Berechnet Portfoliokennzahlen (Rendite, Volatilität, Drawdown-Schätzung)
 * basierend auf Asset-Gewichtungen
 */
function calculatePortfolioMetrics(weights) {
    let expectedReturn = 0;
    for (const [key, weight] of Object.entries(weights)) {
        if (ASSET_CLASSES[key]) {
            expectedReturn += weight * ASSET_CLASSES[key].expectedReturn;
        }
    }

    // Vereinfachte Portfoliovolatilität unter Berücksichtigung von Diversifikationseffekten
    // Korrelationsabschätzung zwischen Equity und Bonds (~0.15), Gold (~0.05)
    let weightedVol = 0;
    let equityWeight = (weights.world_equity || 0) + (weights.emerging_equity || 0);
    let bondWeight = weights.bonds || 0;
    let goldWeight = weights.gold || 0;
    let cashWeight = weights.cash || 0;

    let varTerm = 
        Math.pow(equityWeight * 0.155, 2) + 
        Math.pow(bondWeight * 0.055, 2) + 
        Math.pow(goldWeight * 0.140, 2) + 
        Math.pow(cashWeight * 0.005, 2) +
        2 * (equityWeight * bondWeight * 0.155 * 0.055 * 0.15) +
        2 * (equityWeight * goldWeight * 0.155 * 0.140 * 0.05);

    let portfolioVol = Math.sqrt(Math.max(0.0001, varTerm));

    // Risikofreier Zins (ca. 2.0%)
    const riskFreeRate = 0.020;
    const sharpeRatio = portfolioVol > 0 ? (expectedReturn - riskFreeRate) / portfolioVol : 0;

    // Geschätzter historischer Max Drawdown (heuristische Approximation)
    const estimatedMaxDrawdown = -Math.min(0.60, Math.max(0.08, portfolioVol * 3.3));

    return {
        expectedReturn,
        volatility: portfolioVol,
        sharpeRatio,
        estimatedMaxDrawdown
    };
}

/**
 * Simuliert den Vermögensverlauf über Zeit (Monat für Monat)
 * inkl. Zinseszins, Einzahlungen, Inflation und Perzentil-Bänder
 */
function simulateWealthTrajectory({
    initialCapital = 10000,
    monthlyRate = 500,
    years = 20,
    nominalReturn = 0.07,
    volatility = 0.14,
    inflationRate = 0.02,
    adjustForInflation = false
}) {
    const monthlyReturn = nominalReturn / 12;
    const monthlyVol = volatility / Math.sqrt(12);
    const totalMonths = years * 12;

    const labels = [];
    const depositsSeries = [];
    const expectedSeries = [];
    const optimisticSeries = [];  // 90. Perzentil
    const pessimisticSeries = []; // 10. Perzentil

    let currentDeposit = initialCapital;
    let currentExpected = initialCapital;

    // Startjahr (0)
    labels.push('Start');
    depositsSeries.push(Math.round(initialCapital));
    expectedSeries.push(Math.round(initialCapital));
    optimisticSeries.push(Math.round(initialCapital));
    pessimisticSeries.push(Math.round(initialCapital));

    for (let month = 1; month <= totalMonths; month++) {
        currentDeposit += monthlyRate;
        currentExpected = (currentExpected * (1 + monthlyReturn)) + monthlyRate;

        // Jedes volle Jahr (oder alle 12 Monate) einen Datenpunkt im Chart
        if (month % 12 === 0) {
            const yearIndex = month / 12;
            labels.push(`Jahr ${yearIndex}`);

            // Inflationsfaktor zur Kaufkraftbereinigung
            const inflationFactor = adjustForInflation ? Math.pow(1 + inflationRate, yearIndex) : 1;

            const adjustedDeposit = currentDeposit / inflationFactor;
            const adjustedExpected = currentExpected / inflationFactor;

            // Korridor-Berechnung (Lognormale Verteilungsnäherung für t Jahre)
            const sigmaT = volatility * Math.sqrt(yearIndex);
            const zScore90 = 1.282; // 90% Perzentil
            const zScore10 = -1.282; // 10% Perzentil

            // Korridorfaktor um den Erwartungswert
            const upperFactor = Math.exp(zScore90 * sigmaT - 0.5 * sigmaT * sigmaT);
            const lowerFactor = Math.exp(zScore10 * sigmaT - 0.5 * sigmaT * sigmaT);

            const adjustedOptimistic = (currentExpected * upperFactor) / inflationFactor;
            const adjustedPessimistic = Math.max(adjustedDeposit * 0.7, (currentExpected * lowerFactor) / inflationFactor);

            depositsSeries.push(Math.round(adjustedDeposit));
            expectedSeries.push(Math.round(adjustedExpected));
            optimisticSeries.push(Math.round(adjustedOptimistic));
            pessimisticSeries.push(Math.round(adjustedPessimistic));
        }
    }

    const finalExpected = expectedSeries[expectedSeries.length - 1];
    const finalDeposits = depositsSeries[depositsSeries.length - 1];
    const finalInterest = Math.max(0, finalExpected - finalDeposits);

    return {
        labels,
        depositsSeries,
        expectedSeries,
        optimisticSeries,
        pessimisticSeries,
        finalExpected,
        finalDeposits,
        finalInterest,
        interestRatio: finalExpected > 0 ? (finalInterest / finalExpected) : 0
    };
}
