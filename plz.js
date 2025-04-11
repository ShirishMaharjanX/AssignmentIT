// Make sure the DOM is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbar) {
                navbar.classList.remove('active');
            }
        });
    });

    // Handle page scrolling and active nav links
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (sectionId && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector('.navbar a[href*=' + sectionId + ']').classList.add('active');
                } else if (sectionId) {
                    document.querySelector('.navbar a[href*=' + sectionId + ']').classList.remove('active');
                }
            });
        });
    }

    // Gallery items click functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const title = this.querySelector('h3').textContent;
            
            const modal = document.createElement('div');
            modal.classList.add('modal');
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <h3>${title}</h3>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function() {
                modal.remove();
            });
            
            window.addEventListener('click', function(e) {
                if(e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.gallery-item, .about-img, .about-text');
    hiddenElements.forEach(el => observer.observe(el));

    // Login Button Functionality - Attach to all pages
    const loginBtns = document.querySelectorAll('.btnLogin-popup');
    
    loginBtns.forEach(loginBtn => {
        loginBtn.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.classList.add('login-modal');
            
            modal.innerHTML = `
                <div class="login-container">
                    <span class="close-login">&times;</span>
                    <div class="form-box">
                        <div class="button-box">
                            <div id="btn"></div>
                            <button type="button" class="toggle-btn" onclick="login()">Login</button>
                            <button type="button" class="toggle-btn" onclick="register()">Register</button>
                        </div>
                        <form id="login" class="input-group">
                            <input type="text" class="input-field" placeholder="Username" required>
                            <input type="password" class="input-field" placeholder="Password" required>
                            <div class="checkbox-row">
                                <input type="checkbox" class="checkbox"><span>Remember Password</span>
                            </div>
                            <button type="submit" class="submit-btn">Log in</button>
                        </form>
                        <form id="register" class="input-group">
                            <input type="text" class="input-field" placeholder="Username" required>
                            <input type="email" class="input-field" placeholder="Email" required>
                            <input type="password" class="input-field" placeholder="Password" required>
                            <div class="checkbox-row">
                                <input type="checkbox" class="checkbox" required><span>I agree to the terms & conditions</span>
                            </div>
                            <button type="submit" class="submit-btn">Register</button>
                        </form>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            window.login = function() {
                const loginForm = document.getElementById('login');
                const registerForm = document.getElementById('register');
                const btn = document.getElementById('btn');
                
                loginForm.style.left = "50px";
                registerForm.style.left = "450px";
                btn.style.left = "0";
            }
            
            window.register = function() {
                const loginForm = document.getElementById('login');
                const registerForm = document.getElementById('register');
                const btn = document.getElementById('btn');
                
                loginForm.style.left = "-400px";
                registerForm.style.left = "50px";
                btn.style.left = "110px";
            }
            window.login();
            const closeBtn = document.querySelector('.close-login');
            closeBtn.addEventListener('click', function() {
                modal.remove();
            });
            window.addEventListener('click', function(e) {
                if(e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
});