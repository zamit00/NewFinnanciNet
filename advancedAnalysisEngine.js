// Advanced Analysis Engine - Data Management and Analysis
// מנוע ניתוח מתקדם - ניהול ואיחסון נתונים

// אובייקט מרכזי לאחסון נתוני הלקוח
const clientAnalysisData = {
    // מאפייני לקוח בסיסיים
    profile: {
        age: null,
        employmentStatus: null,
        investmentHorizon: 'ארוך',
        moneyGoal: 'קצבה',
        riskProfile: null, // נמוך / בינוני / גבוה
        riskScore: null
    },
    
    // נתוני תיק ההשקעות
    portfolio: {
        totalValue: 0,
        accounts: [],
        productBreakdown: {}, // פילוח לפי מוצר
        providerBreakdown: {}, // פילוח לפי ספק
        pathwayBreakdown: {} // פילוח לפי מסלול
    },
    
    // ניתוח איכות
    quality: {
        averageReturns: {},
        comparisonToMarket: {},
        rankings: {}
    },
    
    // פערים שזוהו
    gaps: {
        highFees: [],
        lowPerformance: [],
        riskMismatch: [],
        concentration: [],
        recommendations: []
    },
    
    // תאריך ניתוח
    analysisDate: null,
    lastUpdated: null
};

// פונקציות לשמירה ושליפה מ-localStorage
const AnalysisStorage = {
    save: function() {
        try {
            clientAnalysisData.lastUpdated = new Date().toISOString();
            localStorage.setItem('clientAnalysisData', JSON.stringify(clientAnalysisData));
            console.log('✅ נתוני ניתוח נשמרו בהצלחה');
            return true;
        } catch (error) {
            console.error('❌ שגיאה בשמירת נתונים:', error);
            return false;
        }
    },
    
    load: function() {
        try {
            const saved = localStorage.getItem('clientAnalysisData');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(clientAnalysisData, data);
                console.log('✅ נתוני ניתוח נטענו בהצלחה');
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ שגיאה בטעינת נתונים:', error);
            return false;
        }
    },
    
    clear: function() {
        localStorage.removeItem('clientAnalysisData');
        // Reset to default values
        Object.keys(clientAnalysisData).forEach(key => {
            if (typeof clientAnalysisData[key] === 'object') {
                clientAnalysisData[key] = Array.isArray(clientAnalysisData[key]) ? [] : {};
            } else {
                clientAnalysisData[key] = null;
            }
        });
        console.log('🗑️ נתוני ניתוח נוקו');
    }
};

// פונקציות לעדכון פרופיל לקוח
const ClientProfile = {
    updateProfile: function(data) {
        Object.assign(clientAnalysisData.profile, data);
        AnalysisStorage.save();
        console.log('📝 פרופיל לקוח עודכן:', data);
    },
    
    getAge: function() {
        return clientAnalysisData.profile.age;
    },
    
    getRiskProfile: function() {
        return clientAnalysisData.profile.riskProfile;
    },
    
    isComplete: function() {
        const profile = clientAnalysisData.profile;
        return profile.age !== null && 
               profile.employmentStatus !== null && 
               profile.riskProfile !== null;
    }
};

// פונקציות לניתוח תיק ההשקעות
const PortfolioAnalyzer = {
    // ניתוח קבצי מסלקה שהועלו
    analyzeFromMislaka: function(mislakaData) {
        console.log('🔍 מנתח נתוני מסלקה...');
        
        if (!mislakaData || !mislakaData.data) {
            console.warn('⚠️ אין נתוני מסלקה זמינים');
            return false;
        }
        
        let totalValue = 0;
        const accounts = [];
        const productBreakdown = {};
        const providerBreakdown = {};
        const pathwayBreakdown = {};
        
        // עובר על כל הקבצים
        for (const fileData of mislakaData.data) {
            if (fileData.data && fileData.data.accounts) {
                for (const account of fileData.data.accounts) {
                    const accountInfo = {
                        provider: account.shemGoofMenahel || 'לא ידוע',
                        product: account.sugKupa || 'לא ידוע',
                        accountNumber: account.msTik || '',
                        balance: parseFloat(account.tsviratZchuyot) || 0,
                        managementFee: parseFloat(account.dmeyNihul) || 0,
                        pathways: []
                    };
                    
                    // הוסף למאזן כולל
                    totalValue += accountInfo.balance;
                    
                    // עדכן פילוח לפי מוצר
                    productBreakdown[accountInfo.product] = 
                        (productBreakdown[accountInfo.product] || 0) + accountInfo.balance;
                    
                    // עדכן פילוח לפי ספק
                    providerBreakdown[accountInfo.provider] = 
                        (providerBreakdown[accountInfo.provider] || 0) + accountInfo.balance;
                    
                    // ניתוח מסלולים
                    if (account.pathways) {
                        for (const pathway of account.pathways) {
                            const pathwayInfo = {
                                name: pathway.shemMasulHashkaa || 'לא ידוע',
                                value: parseFloat(pathway.schumBemislul) || 0,
                                return12m: parseFloat(pathway.tsuaNeto) || 0,
                                type: this.identifyPathwayType(pathway.shemMasulHashkaa)
                            };
                            
                            accountInfo.pathways.push(pathwayInfo);
                            
                            // עדכן פילוח מסלולים
                            pathwayBreakdown[pathwayInfo.type] = 
                                (pathwayBreakdown[pathwayInfo.type] || 0) + pathwayInfo.value;
                        }
                    }
                    
                    accounts.push(accountInfo);
                }
            }
        }
        
        // עדכן את הנתונים
        clientAnalysisData.portfolio = {
            totalValue,
            accounts,
            productBreakdown,
            providerBreakdown,
            pathwayBreakdown
        };
        
        AnalysisStorage.save();
        console.log(`✅ נותחו ${accounts.length} חשבונות, סך: ₪${totalValue.toLocaleString('he-IL')}`);
        return true;
    },
    
    // זיהוי סוג מסלול
    identifyPathwayType: function(pathwayName) {
        if (!pathwayName) return 'לא ידוע';
        
        // שימוש בפונקציה מ-data.js אם קיימת
        if (typeof getMaslulType === 'function') {
            return getMaslulType(pathwayName);
        }
        
        // fallback - זיהוי בסיסי
        const name = pathwayName.toLowerCase();
        if (name.includes('מניות')) return 'מניות';
        if (name.includes('אג"ח') || name.includes('אשראי')) return 'אג"ח';
        if (name.includes('כללי')) return 'כללי';
        if (name.includes('כספי')) return 'כספי';
        return 'אחר';
    },
    
    // קבלת סיכום התיק
    getSummary: function() {
        return {
            totalValue: clientAnalysisData.portfolio.totalValue,
            accountsCount: clientAnalysisData.portfolio.accounts.length,
            productCount: Object.keys(clientAnalysisData.portfolio.productBreakdown).length,
            providerCount: Object.keys(clientAnalysisData.portfolio.providerBreakdown).length
        };
    }
};

// פונקציות לניתוח איכות השקעות
const QualityAnalyzer = {
    // השוואה לממוצע השוק
    compareToMarket: function() {
        console.log('📊 משווה לממוצע השוק...');
        
        if (!clientAnalysisData.portfolio.accounts.length) {
            console.warn('⚠️ אין נתוני חשבונות');
            return null;
        }
        
        const comparisons = [];
        
        for (const account of clientAnalysisData.portfolio.accounts) {
            for (const pathway of account.pathways) {
                // חיפוש ממוצע בדאטה אינדיקטורס
                if (typeof dataIndicators !== 'undefined' && dataIndicators.length > 0) {
                    const avgData = dataIndicators.find(item => 
                        item.maslul === pathway.type && item.mozar === account.product
                    );
                    
                    if (avgData) {
                        const comparison = {
                            pathwayName: pathway.name,
                            pathwayType: pathway.type,
                            product: account.product,
                            clientReturn: pathway.return12m,
                            marketAverage: parseFloat(avgData.tesuam),
                            difference: pathway.return12m - parseFloat(avgData.tesuam),
                            performance: this.getPerformanceRating(
                                pathway.return12m, 
                                parseFloat(avgData.tesuam)
                            )
                        };
                        
                        comparisons.push(comparison);
                    }
                }
            }
        }
        
        clientAnalysisData.quality.comparisonToMarket = comparisons;
        AnalysisStorage.save();
        console.log(`✅ נותחו ${comparisons.length} מסלולים מול השוק`);
        return comparisons;
    },
    
    // דירוג ביצועים
    getPerformanceRating: function(clientReturn, marketAverage) {
        const diff = clientReturn - marketAverage;
        if (diff > 2) return 'מצוין';
        if (diff > 0) return 'טוב';
        if (diff > -2) return 'סביר';
        return 'נמוך';
    },
    
    // חישוב ציון איכות כולל
    calculateQualityScore: function() {
        const comparisons = clientAnalysisData.quality.comparisonToMarket;
        if (!comparisons || comparisons.length === 0) return null;
        
        let totalDiff = 0;
        let above = 0;
        
        comparisons.forEach(comp => {
            totalDiff += comp.difference;
            if (comp.difference > 0) above++;
        });
        
        return {
            averageDifference: totalDiff / comparisons.length,
            percentAboveAverage: (above / comparisons.length) * 100,
            rating: above / comparisons.length > 0.6 ? 'מצוין' : 
                   above / comparisons.length > 0.4 ? 'טוב' : 'דורש שיפור'
        };
    }
};

// פונקציות לזיהוי פערים
const GapAnalyzer = {
    // זיהוי דמי ניהול גבוהים
    identifyHighFees: function() {
        console.log('💰 בודק דמי ניהול...');
        
        const highFees = [];
        const feeThresholds = {
            'קרנות השתלמות': { צבירה: 0.5, הפקדה: 4 },
            'קופת גמל': { צבירה: 0.5, הפקדה: 6 },
            'קרן פנסיה': { צבירה: 0.5, הפקדה: 6 },
            'ביטוח מנהלים': { צבירה: 1, הפקדה: 4 }
        };
        
        for (const account of clientAnalysisData.portfolio.accounts) {
            const threshold = feeThresholds[account.product] || { צבירה: 1, הפקדה: 6 };
            
            if (account.managementFee > threshold.צבירה) {
                highFees.push({
                    provider: account.provider,
                    product: account.product,
                    currentFee: account.managementFee,
                    threshold: threshold.צבירה,
                    excess: account.managementFee - threshold.צבירה,
                    annualCost: account.balance * (account.managementFee / 100),
                    severity: account.managementFee > threshold.צבירה * 1.5 ? 'גבוה' : 'בינוני'
                });
            }
        }
        
        clientAnalysisData.gaps.highFees = highFees;
        AnalysisStorage.save();
        console.log(`⚠️ זוהו ${highFees.length} חשבונות עם דמי ניהול גבוהים`);
        return highFees;
    },
    
    // זיהוי ביצועים נמוכים
    identifyLowPerformance: function() {
        console.log('📉 בודק ביצועים נמוכים...');
        
        const lowPerf = [];
        const comparisons = clientAnalysisData.quality.comparisonToMarket;
        
        if (comparisons) {
            comparisons.forEach(comp => {
                if (comp.difference < -2) {
                    lowPerf.push({
                        pathway: comp.pathwayName,
                        product: comp.product,
                        clientReturn: comp.clientReturn,
                        marketAverage: comp.marketAverage,
                        gap: comp.difference,
                        severity: comp.difference < -5 ? 'גבוה' : 'בינוני'
                    });
                }
            });
        }
        
        clientAnalysisData.gaps.lowPerformance = lowPerf;
        AnalysisStorage.save();
        console.log(`⚠️ זוהו ${lowPerf.length} מסלולים עם ביצועים נמוכים`);
        return lowPerf;
    },
    
    // בדיקת התאמת סיכון
    checkRiskAlignment: function() {
        console.log('🎲 בודק התאמת סיכון...');
        
        const riskProfile = clientAnalysisData.profile.riskProfile;
        const age = clientAnalysisData.profile.age;
        const mismatches = [];
        
        if (!riskProfile || !age) {
            console.warn('⚠️ חסרים נתוני פרופיל');
            return [];
        }
        
        // הגדרת חשיפה מתאימה למניות לפי גיל וסיכון
        const recommendedEquityExposure = this.calculateRecommendedEquity(age, riskProfile);
        
        // חישוב חשיפה נוכחית למניות
        let totalEquity = 0;
        let totalValue = clientAnalysisData.portfolio.totalValue;
        
        for (const account of clientAnalysisData.portfolio.accounts) {
            for (const pathway of account.pathways) {
                if (pathway.type.includes('מניות') || pathway.type === 'כללי') {
                    totalEquity += pathway.value;
                }
            }
        }
        
        const currentEquityPercent = (totalEquity / totalValue) * 100;
        const gap = currentEquityPercent - recommendedEquityExposure.target;
        
        if (Math.abs(gap) > 15) {
            mismatches.push({
                type: 'חשיפה למניות',
                current: currentEquityPercent.toFixed(1),
                recommended: recommendedEquityExposure.target,
                gap: gap.toFixed(1),
                severity: Math.abs(gap) > 25 ? 'גבוה' : 'בינוני',
                reason: gap > 0 ? 'חשיפה עודפת לסיכון' : 'חשיפה נמוכה מדי לצמיחה'
            });
        }
        
        clientAnalysisData.gaps.riskMismatch = mismatches;
        AnalysisStorage.save();
        console.log(`⚠️ זוהו ${mismatches.length} אי-התאמות בסיכון`);
        return mismatches;
    },
    
    // חישוב חשיפה מומלצת למניות
    calculateRecommendedEquity: function(age, riskProfile) {
        // כלל אצבע: 100 - גיל = אחוז מניות מקסימלי
        let baseEquity = Math.max(20, Math.min(80, 100 - age));
        
        // התאמה לפי פרופיל סיכון
        if (riskProfile === 'נמוך') {
            baseEquity -= 20;
        } else if (riskProfile === 'גבוה') {
            baseEquity += 10;
        }
        
        return {
            target: Math.max(10, Math.min(90, baseEquity)),
            min: Math.max(5, baseEquity - 15),
            max: Math.min(95, baseEquity + 15)
        };
    },
    
    // בדיקת ריכוזיות
    checkConcentration: function() {
        console.log('🎯 בודק ריכוזיות...');
        
        const concentration = [];
        const providerBreakdown = clientAnalysisData.portfolio.providerBreakdown;
        const totalValue = clientAnalysisData.portfolio.totalValue;
        
        Object.entries(providerBreakdown).forEach(([provider, value]) => {
            const percentage = (value / totalValue) * 100;
            if (percentage > 50) {
                concentration.push({
                    provider,
                    value,
                    percentage: percentage.toFixed(1),
                    severity: percentage > 70 ? 'גבוה' : 'בינוני',
                    risk: 'חשיפה מוגזמת ליצרן אחד'
                });
            }
        });
        
        clientAnalysisData.gaps.concentration = concentration;
        AnalysisStorage.save();
        console.log(`⚠️ זוהו ${concentration.length} מקרים של ריכוזיות`);
        return concentration;
    },
    
    // ניתוח מקיף של כל הפערים
    performFullGapAnalysis: function() {
        console.log('🔬 מבצע ניתוח פערים מקיף...');
        
        this.identifyHighFees();
        this.identifyLowPerformance();
        this.checkRiskAlignment();
        this.checkConcentration();
        
        // יצירת המלצות
        this.generateRecommendations();
        
        console.log('✅ ניתוח פערים הושלם');
        return clientAnalysisData.gaps;
    },
    
    // יצירת המלצות
    generateRecommendations: function() {
        const recommendations = [];
        
        // המלצות לדמי ניהול
        if (clientAnalysisData.gaps.highFees.length > 0) {
            recommendations.push({
                category: 'דמי ניהול',
                priority: 'גבוהה',
                icon: '💰',
                title: 'דמי ניהול גבוהים',
                description: `זוהו ${clientAnalysisData.gaps.highFees.length} חשבונות עם דמי ניהול גבוהים מהממוצע`,
                action: 'מומלץ לנהל משא ומתן עם הספקים או לשקול מעבר לספק עם עמלות נמוכות יותר',
                potentialSaving: clientAnalysisData.gaps.highFees.reduce((sum, fee) => sum + fee.annualCost * 0.3, 0)
            });
        }
        
        // המלצות לביצועים
        if (clientAnalysisData.gaps.lowPerformance.length > 0) {
            recommendations.push({
                category: 'ביצועים',
                priority: 'גבוהה',
                icon: '📈',
                title: 'ביצועים מתחת לממוצע',
                description: `זוהו ${clientAnalysisData.gaps.lowPerformance.length} מסלולים עם ביצועים נמוכים`,
                action: 'שקול החלפת מסלולים או מעבר ליצרן עם ביצועים עקביים יותר'
            });
        }
        
        // המלצות לסיכון
        if (clientAnalysisData.gaps.riskMismatch.length > 0) {
            recommendations.push({
                category: 'סיכון',
                priority: 'בינונית',
                icon: '⚖️',
                title: 'אי-התאמה בפרופיל סיכון',
                description: `החשיפה הנוכחית אינה מתאימה לפרופיל הסיכון והגיל שלך`,
                action: 'מומלץ לאזן מחדש את התיק להתאמת רמת הסיכון'
            });
        }
        
        // המלצות לריכוזיות
        if (clientAnalysisData.gaps.concentration.length > 0) {
            recommendations.push({
                category: 'פיזור',
                priority: 'בינונית',
                icon: '🎯',
                title: 'ריכוזיות ביצרן',
                description: `חלק גדול מהתיק מרוכז אצל יצרן אחד`,
                action: 'שקול פיזור נוסף על ידי העברת חלק מהכספים ליצרן אחר'
            });
        }
        
        clientAnalysisData.gaps.recommendations = recommendations;
        AnalysisStorage.save();
    }
};

// פונקציות עזר
const AnalysisUtils = {
    // פורמט מספרים
    formatCurrency: function(value) {
        return `₪${Math.round(value).toLocaleString('he-IL')}`;
    },
    
    // פורמט אחוזים
    formatPercent: function(value, decimals = 1) {
        return `${value.toFixed(decimals)}%`;
    },
    
    // קבלת צבע לפי ביצועים
    getPerformanceColor: function(value, threshold = 0) {
        if (value > threshold + 2) return 'var(--success)';
        if (value > threshold) return '#28a745';
        if (value > threshold - 2) return 'var(--warning)';
        return 'var(--danger)';
    },
    
    // בדיקה אם יש נתונים
    hasPortfolioData: function() {
        return clientAnalysisData.portfolio.accounts.length > 0;
    },
    
    // קבלת תאריך עדכון
    getLastUpdate: function() {
        if (!clientAnalysisData.lastUpdated) return 'מעולם לא';
        const date = new Date(clientAnalysisData.lastUpdated);
        return date.toLocaleString('he-IL');
    }
};

// טעינת נתונים בעת טעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    AnalysisStorage.load();
    console.log('📂 מנוע ניתוח מתקדם נטען');
});

// ייצוא לשימוש גלובלי
window.clientAnalysisData = clientAnalysisData;
window.AnalysisStorage = AnalysisStorage;
window.ClientProfile = ClientProfile;
window.PortfolioAnalyzer = PortfolioAnalyzer;
window.QualityAnalyzer = QualityAnalyzer;
window.GapAnalyzer = GapAnalyzer;
window.AnalysisUtils = AnalysisUtils;

