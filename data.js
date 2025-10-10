// פונקציה שמזהה את סוג המסלול לפי שם המסלול
function getMaslulType(shemkupa) {
    if (!shemkupa) return 'לא ידוע';
    
    const name = String(shemkupa).trim();
    
    // כללי - בדיקה ראשונה
    if (name.includes('כללי') && !name.includes('כללי ב')) {
        return 'כללי';
    }
    
    // S&P 500
    if (name.includes('500')) {
        return 'עוקב מדד s&p 500';
    }
    
    // מניות (ללא מדד/עוקב/סחיר/משולב/25/אג"ח/פאסיבי)
    if (name.includes('מניות') && 
        !name.includes('מדד') && 
        !name.includes('עוקב') && 
        !name.includes('סחיר') && 
        !name.includes('משולב') && 
        !name.includes('25') && 
        !name.includes('אג"ח') && 
        !name.includes('פאסיבי')) {
        return 'מניות';
    }
    
    // אשראי ואג"ח (ללא מניות/עוקב/סחיר)
    if (name.includes('אשראי') && 
        !name.includes('מניות') && 
        !name.includes('עוקב') && 
        !name.includes('סחיר')) {
        return 'אשראי ואג"ח';
    }
    
    // אשראי ואג"ח עם מניות (עם 25)
    if (name.includes('אשראי') && name.includes('25')) {
        return 'אשראי ואג"ח עם מניות';
    }
    
    // כספי שקלי
    if (name.includes('כספי (שקלי)')) {
        return 'כספי (שקלי)';
    }
    
    // עוקב מדדים - גמיש
    if (name.includes('עוקב') && name.includes('גמיש')) {
        return 'עוקב מדדים - גמיש';
    }
    
    // אג"ח ממשלות
    if (name.includes('ממשלות')) {
        return 'אג"ח ממשלות';
    }
    
    // הלכה יהודית
    if (name.includes('הלכה')) {
        return 'הלכה יהודית';
    }
    
    // משולב סחיר
    if (name.includes('משולב סחיר')) {
        return 'משולב סחיר';
    }
    
    // עוקב מדדי אג"ח (ללא מניות)
    if (name.includes('עוקב') && name.includes('אג"ח') && !name.includes('מניות')) {
        return 'עוקב מדדי אג"ח';
    }
    
    // עוקב מדדי מניות (ללא אג"ח ו-25)
    if (name.includes('מניות') && 
        !name.includes('אג"ח') && 
        name.includes('עוקב') && 
        !name.includes('25')) {
        return 'עוקב מדדי מניות';
    }
    
    // מניות סחיר (ללא 25)
    if (name.includes('מניות') && name.includes('סחיר') && !name.includes('25')) {
        return 'מניות סחיר';
    }
    
    // אג"ח סחיר (ללא מניות ולא ממשלתי)
    if (name.includes('סחיר') && 
        name.includes('אג"ח') && 
        !name.includes('מניות') && 
        !name.includes('ממשלתי')) {
        return 'אג"ח סחיר';
    }
    
    // אג"ח ממשלתי סחיר
    if (name.includes('סחיר') && name.includes('אג"ח') && name.includes('ממשלתי')) {
        return 'אג"ח ממשלתי סחיר';
    }
    
    // אג"ח סחיר עם מניות
    if (name.includes('סחיר') && name.includes('אג"ח') && name.includes('מניות')) {
        return 'אג"ח סחיר עם מניות';
    }
    
    // עוקב מדדי אג"ח עם מניות
    if (!name.includes('סחיר') && 
        name.includes('אג"ח') && 
        name.includes('מניות') && 
        name.includes('עוקב')) {
        return 'עוקב מדדי אג"ח עם מניות';
    }
    
    // 50-60 (כולל ווריאציות: "לבני 50 עד 60", "בני 50-60", "50 עד 60")
    if ((name.includes('50') && name.includes('60')) || 
        name.includes('לבני 50') || 
        name.includes('בני 50') ||
        name.includes('50-60')) {
        return '50-60';
    }
    
    // עד 50 (ללא עוקב ו-60) (כולל ווריאציות: "עד גיל 50", "עד 50")
    if ((name.includes('50') && !name.includes('עוקב') && !name.includes('60')) ||
        name.includes('עד גיל 50') ||
        name.includes('עד 50')) {
        return 'עד 50';
    }
    
    // 60 ומעלה (ללא 50) (כולל ווריאציות: "מגיל 60", "בני 60")
    if ((!name.includes('50') && name.includes('60')) ||
        name.includes('מגיל 60') ||
        name.includes('בני 60 ומעלה')) {
        return '60 ומעלה';
    }
    
    // סיכון מוגבר
    if (name.includes('מוגבר')) {
        return 'סיכון מוגבר';
    }
    
    // סיכון מועט
    if (name.includes('מועט')) {
        return 'סיכון מועט';
    }
    
    // סיכון בינוני
    if (name.includes('בינוני')) {
        return 'סיכון בינוני';
    }
    
    // אם לא התאים לשום קטגוריה - מחזיר "כללי"
    return 'כללי';
}

async function filterMaslul(mas, moza,hevra){
    var data;var dataforfilter;
   
  
    if(moza==="פוליסות חסכון"){dataforfilter=datanetunimKlaliXB}
    else if(moza==="קרנות חדשות"){dataforfilter=datanetunimKlaliXP}
    else{dataforfilter=datanetunimKlaliXM }
       

      
      if(dataforfilter===datanetunimKlaliXM){dataforfilter=dataforfilter.filter(item=>!item.ochlosiyayaad.includes('עובדי סקטור מסויים')
    &&  !item.ochlosiyayaad.includes('עובדי מפעל/גוף מסויים'))}
    
        if (mas==='כללי'){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                item.tesuam !== undefined &&
                Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === 'כללי' &&
                (hevra !== 0 ? item.menahelet.includes(hevra) :true)  
                
                            );
        data.sort((a, b) => b.tesuam - a.tesuam); 
        return data;
        }

        else if(mas==='עוקב מדד s&p 500'){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === 'עוקב מדד s&p 500'
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
            
            
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="מניות"){
            data = dataforfilter.filter(item => 
               item.mozar === moza && 
               item.tesuam !== undefined &&
               Number(item.tesuam)!==0 &&
               getMaslulType(item.shemkupa) === "מניות"
               && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
              

 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="אשראי ואג\"ח"){
                data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "אשראי ואג\"ח"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
              

 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="אשראי ואג\"ח עם מניות"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "אשראי ואג\"ח עם מניות"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
             
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="כספי (שקלי)"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "כספי (שקלי)"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="עוקב מדדים - גמיש"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "עוקב מדדים - גמיש"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
              
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="אג\"ח ממשלות"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "אג\"ח ממשלות"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
              
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="הלכה יהודית"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "הלכה יהודית"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
              
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="משולב סחיר"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "משולב סחיר"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
             
            
        
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="עוקב מדדי אג\"ח"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "עוקב מדדי אג\"ח"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)   
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);
         return data;
         }
        else if(mas==="עוקב מדדי מניות"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "עוקב מדדי מניות"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="מניות סחיר"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "מניות סחיר"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="אג\"ח סחיר"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "אג\"ח סחיר"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
           else if(mas==="אג\"ח ממשלתי סחיר"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "אג\"ח ממשלתי סחיר"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="אג\"ח סחיר עם מניות"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "אג\"ח סחיר עם מניות"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
              
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="עוקב מדדי אג\"ח עם מניות"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "עוקב מדדי אג\"ח עם מניות"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
                
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="50-60"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "50-60"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="עד 50"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "עד 50"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
        else if(mas==="60 ומעלה"){
            data = dataforfilter.filter(item => 
                item.mozar === moza && 
                 item.tesuam !== undefined &&  
                 Number(item.tesuam)!==0 &&
                getMaslulType(item.shemkupa) === "60 ומעלה"
                && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
               
 
 
            );
        data.sort((a, b) => b.tesuam - a.tesuam);    
        return data;
        }
         else if(mas==='סיכון מוגבר'){
             data = dataforfilter.filter(item => 
                 item.mozar === moza && 
                  item.tesuam !== undefined &&  
                  Number(item.tesuam)!==0 &&
                 item.shemkupa.includes("מוגבר") 
                 && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
             );
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
          }
          else if(mas==='סיכון מועט'){
             data = dataforfilter.filter(item => 
                 item.mozar === moza && 
                  item.tesuam !== undefined &&  
                  Number(item.tesuam)!==0 &&
                 item.shemkupa.includes("מועט") 
                 && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
             );
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
          }
          else if(mas==='סיכון בינוני'){
             data = dataforfilter.filter(item => 
                 item.mozar === moza && 
                  item.tesuam !== undefined &&  
                  Number(item.tesuam)!==0 &&
                 item.shemkupa.includes("בינוני") 
                 && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
             );
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
          }
}

// פונקציית עזר לבדיקת זיהוי מסלולים
function testMaslulType(shemkupa) {
    const result = getMaslulType(shemkupa);
    console.log(`שם המסלול: "${shemkupa}" → סוג: "${result}"`);
    return result;
}


