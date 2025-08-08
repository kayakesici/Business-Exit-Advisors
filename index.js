// Hamburger menu accessibility
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const expanded = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', expanded);
});

hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    navLinks.classList.toggle('open');
    const expanded = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  }
});

// FAQ toggle with ARIA support and keyboard accessibility
document.querySelectorAll('.faq-item h4').forEach(header => {
  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-expanded', 'false');
  header.addEventListener('click', () => {
    const faq = header.parentElement;
    faq.classList.toggle('open');
    const expanded = faq.classList.contains('open');
    header.setAttribute('aria-expanded', expanded);
  });
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') header.click();
  });
});

// Smooth scroll for nav links (only for same-page anchors)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href.length > 1 && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior: 'smooth'});
    }
  });
});

// Interactive Pricing - keep plan keys matched to Silver/Gold/Platinum
const pricingCards = document.querySelectorAll('.pricing-card');
const pricingDetails = document.getElementById('pricingDetails');
const planDetails = {
  Silver: `
    <h3>Silver Plan</h3>
    <p>Best for owners who want professional valuation, an attractive sales brochure, and initial buyer screening via major portals.</p>
    <ul style='text-align:left;max-width:350px;margin:1rem auto 0 auto;'>
      <li>Professional Valuation</li>
      <li>Sales Brochure</li>
      <li>Listings on Major Portal</li>
      <li>Initial Buyer Screening</li>
    </ul>
    <a href='https://buy.stripe.com/test_8x27sM3BqdUR3cQa552Nq00' target='_blank' rel='noopener noreferrer' class='btn cta'>Select Silver</a>
  `,
  Gold: `
    <h3>Gold Plan</h3>
    <p>Our most popular plan. Includes everything in Silver plus targeted buyer outreach, negotiation support, and access to legal panel.</p>
    <ul style='text-align:left;max-width:350px;margin:1rem auto 0 auto;'>
      <li>Everything in Silver</li>
      <li>Targeted Buyer Outreach</li>
      <li>Negotiation support</li>
      <li>Access to legal panel</li>
    </ul>
    <a href='https://buy.stripe.com/test_fZu8wQ0pe4kh6p2a552Nq02' target='_blank' rel='noopener noreferrer' class='btn cta'>Select Gold</a>
  `,
  Platinum: `
    <h3>Platinum Plan</h3>
    <p>For complex or high-value exits. Includes everything in Gold plus exit readiness planning, due-diligence support, and access to a wealth advisor panel.</p>
    <ul style='text-align:left;max-width:350px;margin:1rem auto 0 auto;'>
      <li>Everything in Gold</li>
      <li>Exit Readiness Planning</li>
      <li>Due-Diligence Support</li>
      <li>Access to Wealth Advisor Panel</li>
    </ul>
    <a href='https://buy.stripe.com/test_fZubJ21tieYV3cQ9112Nq01' target='_blank' rel='noopener noreferrer' class='btn cta'>Select Platinum</a>
  `
};
pricingCards.forEach(card => {
  card.addEventListener('click', function() {
    pricingCards.forEach(c => c.classList.remove('selected'));
    this.classList.add('selected');
    const plan = this.getAttribute('data-plan');
    if (planDetails.hasOwnProperty(plan)) {
      pricingDetails.innerHTML = planDetails[plan];
      pricingDetails.style.display = 'block';
      pricingDetails.setAttribute('aria-live', 'polite');
      pricingDetails.scrollIntoView({ behavior: 'smooth' });
    } else {
      pricingDetails.style.display = 'none';
      pricingDetails.innerHTML = '';
    }
  });

  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      pricingCards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      const plan = this.getAttribute('data-plan');
      if (planDetails.hasOwnProperty(plan)) {
        pricingDetails.innerHTML = planDetails[plan];
        pricingDetails.style.display = 'block';
        pricingDetails.setAttribute('aria-live', 'polite');
        pricingDetails.scrollIntoView({ behavior: 'smooth' });
      } else {
        pricingDetails.style.display = 'none';
        pricingDetails.innerHTML = '';
      }
    }
  });
});

// Fade-in on scroll
function revealOnScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Hero slideshow (autoplay)
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length === 0) return;
  let currentSlide = 0;
  slides[currentSlide].classList.add('active');
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  setInterval(nextSlide, 5000);
}
window.addEventListener('DOMContentLoaded', initHeroSlideshow);
