// Terms Consent - Shows only on first visit

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('termsConsentOverlay');
    const acceptBtn = document.getElementById('acceptTermsBtn');
    
    // Check if user already accepted terms
    const hasAcceptedTerms = localStorage.getItem('termsAccepted');
    
    if (!hasAcceptedTerms) {
        // Show overlay on first visit
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    } else {
        // Hide overlay if already accepted
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
    
    // Handle accept button click
    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            // Save acceptance to localStorage
            localStorage.setItem('termsAccepted', 'true');
            localStorage.setItem('termsAcceptedDate', new Date().toISOString());
            
            // Hide overlay with animation
            if (overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    overlay.classList.add('hidden');
                }, 300);
            }
        });
    }
    
    // Allow opening terms modal from consent box
    const termsLinks = document.querySelectorAll('.terms-link');
    termsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof openTermsModal === 'function') {
                openTermsModal();
            }
        });
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

