// DoceFinance Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initNavbarScroll();
    initAnimations();
    initModals();
    initFormValidation();
    initCounters();
    initCountdown();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Stagger animation for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize modals
function initModals() {
    // Demo modal form submission
    const demoModal = document.getElementById('demoModal');
    const demoForm = demoModal.querySelector('form');
    const demoSubmitBtn = demoModal.querySelector('.btn-primary');
    
    if (demoForm && demoSubmitBtn) {
        demoSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(demoForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateDemoForm(formObject)) {
                // Simulate form submission
                showLoadingState(demoSubmitBtn);
                
                setTimeout(() => {
                    showSuccessMessage('Teste grátis iniciado! Verifique seu email para as instruções.');
                    bootstrap.Modal.getInstance(demoModal).hide();
                    resetForm(demoForm);
                }, 2000);
            }
        });
    }
    
    // Video modal
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('hidden.bs.modal', function() {
            // Pause video when modal is closed
            const iframe = videoModal.querySelector('iframe');
            if (iframe) {
                iframe.src = iframe.src; // Reset iframe to stop video
            }
        });
    }
    
    // Pricing plan buttons
    initPricingButtons();
}

// Initialize pricing buttons
function initPricingButtons() {
    const pricingButtons = document.querySelectorAll('.pricing-card .btn');
    
    pricingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pricingCard = this.closest('.pricing-card');
            const planName = pricingCard.querySelector('h5').textContent;
            const planPrice = pricingCard.querySelector('.amount').textContent;
            const planPeriod = pricingCard.querySelector('.period').textContent;
            
            // Show plan selection modal or redirect to contact
            showPlanSelectionModal(planName, planPrice, planPeriod);
        });
    });
}

// Show plan selection modal
function showPlanSelectionModal(planName, planPrice, planPeriod) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="planModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Escolher Plano ${planName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <h4 class="text-primary">Plano ${planName}</h4>
                            <div class="price-display">
                                <span class="currency">KZ</span>
                                <span class="amount">${planPrice}</span>
                                <span class="period">${planPeriod}</span>
                            </div>
                        </div>
                        
                        <form id="planForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="planFirstName" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="planFirstName" required>
                                </div>
                                <div class="col-md-6">
                                    <label for="planLastName" class="form-label">Sobrenome</label>
                                    <input type="text" class="form-control" id="planLastName" required>
                                </div>
                                <div class="col-12">
                                    <label for="planEmail" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="planEmail" required>
                                </div>
                                <div class="col-12">
                                    <label for="planPhone" class="form-label">Telefone</label>
                                    <input type="tel" class="form-control" id="planPhone" required>
                                </div>
                                <div class="col-12">
                                    <label for="planBusiness" class="form-label">Nome do seu negócio</label>
                                    <input type="text" class="form-control" id="planBusiness" required>
                                </div>
                                <div class="col-12">
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle me-2"></i>
                                        <strong>Processo de Pagamento:</strong><br>
                                        1. Após o envio, você receberá os dados para pagamento<br>
                                        2. Efetue o pagamento via Express ou Transferência Bancária<br>
                                        3. Envie o comprovativo de pagamento<br>
                                        4. Receba o documento com informações da licença
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="planTerms" required>
                                        <label class="form-check-label" for="planTerms">
                                            Aceito os <a href="termos-de-uso.html" class="text-primary" target="_blank">Termos de Uso</a> e <a href="politica-de-privacidade.html" class="text-primary" target="_blank">Política de Privacidade</a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="submitPlanBtn">Solicitar Referência de Pagamento</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('planModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('planModal'));
    modal.show();
    
    // Handle form submission
    const submitBtn = document.getElementById('submitPlanBtn');
    const planForm = document.getElementById('planForm');
    
    submitBtn.addEventListener('click', function() {
        const formData = new FormData(planForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (validatePlanForm(formObject)) {
            showLoadingState(submitBtn);
            
            setTimeout(() => {
                showSuccessMessage(`Solicitação enviada! Você receberá os dados para pagamento do plano ${planName} em breve.`);
                modal.hide();
            }, 2000);
        }
    });
    
    // Clean up modal when hidden
    document.getElementById('planModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}

// Validate plan form
function validatePlanForm(data) {
    let isValid = true;
    
    const requiredFields = ['planFirstName', 'planLastName', 'planEmail', 'planPhone', 'planBusiness'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'Este campo é obrigatório');
            isValid = false;
        }
    });
    
    // Validate email
    const email = document.getElementById('planEmail');
    if (data.planEmail && !isValidEmail(data.planEmail)) {
        showFieldError(email, 'Por favor, insira um email válido');
        isValid = false;
    }
    
    // Validate phone
    const phone = document.getElementById('planPhone');
    if (data.planPhone && !isValidPhone(data.planPhone)) {
        showFieldError(phone, 'Por favor, insira um telefone válido');
        isValid = false;
    }
    
    // Validate terms checkbox
    const terms = document.getElementById('planTerms');
    if (!terms.checked) {
        showFieldError(terms, 'Você deve aceitar os termos de uso');
        isValid = false;
    }
    
    return isValid;
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Initialize countdown timer
function initCountdown() {
    // Set the launch date: November 27, 2024 (current year)
    const currentYear = new Date().getFullYear();
    const launchDate = new Date(`November 27, ${currentYear} 00:00:00`).getTime();
    
    // Update the year in the HTML
    const yearElement = document.getElementById('launch-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the countdown display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.innerHTML = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.innerHTML = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.innerHTML = seconds.toString().padStart(2, '0');
        
        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);
            
            // Update countdown display to show launch message
            if (daysElement) daysElement.innerHTML = '00';
            if (hoursElement) hoursElement.innerHTML = '00';
            if (minutesElement) minutesElement.innerHTML = '00';
            if (secondsElement) secondsElement.innerHTML = '00';
            
            // Show launch message
            const countdownContainer = document.querySelector('.launch-countdown');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div class="text-center">
                        <h4 class="fw-bold mb-2">
                            <i class="fas fa-rocket me-2"></i>DoceFinance Lançado!
                        </h4>
                        <p class="mb-3">O DoceFinance já está disponível!</p>
                        <div class="alert alert-success mb-0">
                            <i class="fas fa-check-circle me-2"></i>
                            <strong>Oferta Especial ainda disponível!</strong><br>
                            <small>50% de desconto no plano Semestral para os primeiros 15 usuários</small>
                        </div>
                    </div>
                `;
            }
        }
    }, 1000);
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    });
}

// Validate demo form
function validateDemoForm(data) {
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'business'];
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, 'Este campo é obrigatório');
            isValid = false;
        }
    });
    
    // Validate email
    const email = document.getElementById('email');
    if (data.email && !isValidEmail(data.email)) {
        showFieldError(email, 'Por favor, insira um email válido');
        isValid = false;
    }
    
    // Validate terms checkbox
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showFieldError(terms, 'Você deve aceitar os termos de uso');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Por favor, insira um email válido');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show loading state
function showLoadingState(button) {
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processando...';
    button.disabled = true;
    
    // Store original text for later restoration
    button.dataset.originalText = originalText;
}

// Reset form
function resetForm(form) {
    form.reset();
    
    // Clear all validation states
    const inputs = form.querySelectorAll('.is-invalid');
    inputs.forEach(input => {
        input.classList.remove('is-invalid');
    });
    
    const errorDivs = form.querySelectorAll('.invalid-feedback');
    errorDivs.forEach(div => div.remove());
    
    // Reset submit button
    const submitBtn = form.querySelector('.btn-primary');
    if (submitBtn && submitBtn.dataset.originalText) {
        submitBtn.innerHTML = submitBtn.dataset.originalText;
        submitBtn.disabled = false;
    }
}

// Show success message
function showSuccessMessage(message) {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed';
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Initialize counters animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animate counter
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with currency symbol if needed
        if (element.textContent.includes('R$')) {
            element.textContent = `R$ ${Math.floor(current).toLocaleString()}`;
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar {
        transition: all 0.3s ease;
    }
    
    .navbar-scrolled {
        background-color: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
    }
    
    .invalid-feedback {
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: #dc3545;
    }
`;
document.head.appendChild(style);
