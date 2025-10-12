/* ========================================
   SITE SESSION MANAGEMENT
   ======================================== */

// ניקוי הזכרון כשסוגרים את החלון/טאב של האתר
window.addEventListener('beforeunload', function() {
    localStorage.removeItem('openingMediaShown');
    console.log('🗑️ Cleared openingMediaShown from localStorage on page close');
});

console.log('✅ Site session management loaded');

