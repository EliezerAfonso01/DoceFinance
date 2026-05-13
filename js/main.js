document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lead form submission handling
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            
            // Show success message (in a real app, you'd send this to a server)
            const button = this.querySelector('button');
            const originalText = button.innerText;
            
            button.disabled = true;
            button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            
            setTimeout(() => {
                this.innerHTML = `
                    <div class="text-center py-4">
                        <i class="bi bi-check-circle-fill text-success fs-1 mb-3"></i>
                        <h4 class="fw-bold">Obrigado pelo interesse!</h4>
                        <p class="text-muted">Enviámos um e-mail com os próximos passos para o seu acesso gratuito.</p>
                        <button type="button" class="btn btn-outline-primary rounded-pill mt-2" onclick="location.reload()">Voltar</button>
                    </div>
                `;
            }, 1500);
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-2');
        }
    });
});
