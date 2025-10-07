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
                 item.shemkupa.includes(mas) &&
                 (hevra !== 0 ? item.menahelet.includes(hevra) :true)  
                 
                             );
         data.sort((a, b) => b.tesuam - a.tesuam); 
         return data;
         }

         else if(mas==='עוקב מדד s&p 500' && moza!=="פוליסות חסכון"){
             data = dataforfilter.filter(item => 
                 item.mozar === moza && 
                  item.tesuam !== undefined &&
                  Number(item.tesuam)!==0 &&
                 item.shemkupa.includes('500') 
                 && (hevra !== 0 ? item.menahelet.includes(hevra):true)  
                
             
             
             );
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==='עוקב מדד s&p 500' && moza==="פוליסות חסכון"){
             data = dataforfilter.filter(item => 
                item.mozar === moza && 
                Number(item.tesuam)!==0 &&
                item.tesuam !== undefined &&
                item.shemkupa.includes('500')
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
                item.shemkupa.includes('מניות') &&
                !item.shemkupa.includes('מדד') &&
                !item.shemkupa.includes('עוקב') &&
                !item.shemkupa.includes('סחיר') &&
                !item.shemkupa.includes('משולב') &&
                !item.shemkupa.includes('25') &&
                !item.shemkupa.includes('"אג\"ח"') && 
                !item.shemkupa.includes('פאסיבי')
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
                 item.shemkupa.includes('אשראי') &&
                 !item.shemkupa.includes('מניות') &&
                 !item.shemkupa.includes('עוקב') &&
                 !item.shemkupa.includes('סחיר')
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
                 item.shemkupa.includes('אשראי') &&
                 item.shemkupa.includes('25') 
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
                 item.shemkupa.includes('כספי (שקלי)')
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
                 item.shemkupa.includes('עוקב') &&
                 item.shemkupa.includes('גמיש')
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
                 item.shemkupa.includes('ממשלות')
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
                 item.shemkupa.includes('הלכה')
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
                 item.shemkupa.includes("משולב סחיר")
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
                 item.shemkupa.includes("עוקב") &&
                 item.shemkupa.includes("אג\"ח") &&
                 !item.shemkupa.includes("מניות") 
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
                 item.shemkupa.includes("מניות") &&
                 !item.shemkupa.includes("אג\"ח") &&
                 item.shemkupa.includes("עוקב") &&
                 !item.shemkupa.includes("25") 
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
                 item.shemkupa.includes("מניות") &&
                 item.shemkupa.includes("סחיר") && 
                 !item.shemkupa.includes("25")  
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
                 item.shemkupa.includes("סחיר") &&
                 item.shemkupa.includes("אג\"ח") &&
                 !item.shemkupa.includes("מניות") &&
                 !item.shemkupa.includes("ממשלתי")
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
                 item.shemkupa.includes("סחיר") &&
                 item.shemkupa.includes("אג\"ח") &&
                 item.shemkupa.includes("ממשלתי") &&
                 (hevra !== 0 ? item.menahelet.includes(hevra):true)  
  
             );
         data.sort((a, b) => b.tesuam - a.tesuam);    
         return data;
         }
         else if(mas==="אג\"ח סחיר עם מניות"){
             data = dataforfilter.filter(item => 
                 item.mozar === moza && 
                  item.tesuam !== undefined &&  
                  Number(item.tesuam)!==0 &&
                 item.shemkupa.includes("סחיר") &&
                 item.shemkupa.includes("אג\"ח") &&
                 item.shemkupa.includes("מניות") 
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
                 !item.shemkupa.includes("סחיר") &&
                 item.shemkupa.includes("אג\"ח") &&
                 item.shemkupa.includes("מניות") &&
                 item.shemkupa.includes("עוקב")
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
                 item.shemkupa.includes("50") &&
                 item.shemkupa.includes("60") 
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
                 item.shemkupa.includes("50") &&
                 !item.shemkupa.includes('עוקב') &&
                 !item.shemkupa.includes("60") 
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
                 !item.shemkupa.includes("50") &&
                 item.shemkupa.includes("60") 
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
 
 

