<template>
  <div class="home-page">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <div class="logo-icon">📋</div>
          <h1>TaskFlow</h1>
        </div>
        <div class="nav-links">
          <router-link to="/login" class="btn btn-secondary">Login</router-link>
          <router-link to="/register" class="btn btn-primary">Registrieren</router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Deine Produktivität im Griff</h1>
          <p class="hero-subtitle">Verwalte Projekte, Tasks und Teams in einer intuitiven Plattform – wie Asana, Trello und Monday.com, aber einfacher.</p>
          <div class="hero-buttons">
            <router-link to="/register" class="btn btn-primary btn-large">
              <span>🚀</span> Kostenlos starten
            </router-link>
            <router-link to="/login" class="btn btn-outline btn-large">
              <span>→</span> Anmelden
            </router-link>
          </div>
        </div>
        <div class="hero-image">
          <div class="dashboard-preview">
            <div class="window-header">
              <div class="window-dots"></div>
            </div>
            <div class="window-content">
              <div class="preview-item"></div>
              <div class="preview-item"></div>
              <div class="preview-item"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <div class="section-header">
          <h2>Alles, was du brauchst</h2>
          <p>Professionelle Task-Verwaltung für Teams und Einzelne</p>
        </div>
        <div class="features-grid">
          <div class="feature-card card-1">
            <div class="feature-icon">📌</div>
            <h3>Task-Management</h3>
            <p>Erstelle, bearbeite und verwalte Aufgaben in Echtzeit</p>
            <div class="card-accent"></div>
          </div>
          <div class="feature-card card-2">
            <div class="feature-icon">👥</div>
            <h3>Team-Zusammenarbeit</h3>
            <p>Arbeite mit deinem Team und teile Aufgaben sofort</p>
            <div class="card-accent"></div>
          </div>
          <div class="feature-card card-3">
            <div class="feature-icon">📊</div>
            <h3>Echtzeit-Dashboards</h3>
            <p>Übersichtliche Statistiken und Fortschrittsverfolgung</p>
            <div class="card-accent"></div>
          </div>
          <div class="feature-card card-4">
            <div class="feature-icon">⏰</div>
            <h3>Deadline-Verwaltung</h3>
            <p>Fälligkeitsdaten setzen und Benachrichtigungen erhalten</p>
            <div class="card-accent"></div>
          </div>
          <div class="feature-card card-5">
            <div class="feature-icon">🏷️</div>
            <h3>Intelligente Kategorisierung</h3>
            <p>Organisiere mit Tags, Labels und benutzerdefinierten Feldern</p>
            <div class="card-accent"></div>
          </div>
          <div class="feature-card card-6">
            <div class="feature-icon">🔔</div>
            <h3>Intelligente Benachrichtigungen</h3>
            <p>Bleibe informiert über alle wichtigen Änderungen</p>
            <div class="card-accent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="how-it-works">
      <div class="container">
        <h2>So funktioniert's</h2>
        <div class="steps-grid">
          <div class="step">
            <div class="step-number">01</div>
            <h3>Registrieren</h3>
            <p>Erstelle dein Konto in weniger als 2 Minuten</p>
          </div>
          <div class="step">
            <div class="step-number">02</div>
            <h3>Projekte erstellen</h3>
            <p>Starte dein erstes Projekt und lade dein Team ein</p>
          </div>
          <div class="step">
            <div class="step-number">03</div>
            <h3>Tasks verwalten</h3>
            <p>Erstelle Tasks, setze Deadlines und verwalte den Fortschritt</p>
          </div>
          <div class="step">
            <div class="step-number">04</div>
            <h3>Erreiche Ziele</h3>
            <p>Behalte den Überblick und erreiche deine Ziele schneller</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing">
      <div class="container">
        <h2>Einfache Preisgestaltung</h2>
        <div class="pricing-grid">
          <div class="pricing-card basic">
            <h3>Kostenlos</h3>
            <div class="price">€0<span>/Monat</span></div>
            <ul class="features-list">
              <li>✓ Bis zu 5 Projekte</li>
              <li>✓ Grundlegende Task-Verwaltung</li>
              <li>✓ Bis zu 3 Team-Mitglieder</li>
            </ul>
            <button class="btn btn-secondary">Jetzt starten</button>
          </div>
          <div class="pricing-card pro">
            <div class="badge">Empfohlen</div>
            <h3>Pro</h3>
            <div class="price">€9<span>/Monat</span></div>
            <ul class="features-list">
              <li>✓ Unbegrenzte Projekte</li>
              <li>✓ Erweiterte Funktionen</li>
              <li>✓ Unbegrenzte Team-Mitglieder</li>
              <li>✓ Prioritäts-Support</li>
            </ul>
            <router-link to="/register" class="btn btn-primary">Kostenlos testen</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2>Bereit, produktiver zu werden?</h2>
        <p>Starte jetzt kostenlos. Keine Kreditkarte erforderlich.</p>
        <router-link to="/register" class="btn btn-primary btn-large">
          <span>🚀</span> Kostenlos registrieren
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>TaskFlow</h4>
            <p>Deine Produktivitätsplattform</p>
          </div>
          <div class="footer-section">
            <h4>Produkt</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Preise</a></li>
              <li><a href="#about">Über uns</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Rechtliches</h4>
            <ul>
              <li><a href="#">Datenschutz</a></li>
              <li><a href="#">AGB</a></li>
              <li><a href="#">Impressum</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 TaskFlow. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage'
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Navbar */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1.2rem 0;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: white;
}

.logo-icon {
  font-size: 2rem;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Buttons */
.btn {
  padding: 0.75rem 1.8rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid transparent;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.btn-outline {
  background-color: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  border-color: white;
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-large {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6rem 2rem 8rem;
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  opacity: 0.1;
  border-radius: 50%;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: white;
  top: -100px;
  right: -100px;
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: white;
  bottom: -50px;
  left: 10%;
  animation: float 8s ease-in-out infinite reverse;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: white;
  top: 50%;
  left: 50%;
  animation: float 7s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(30px); }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  animation: slideInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
  animation: slideInUp 0.8s ease 0.1s both;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  animation: slideInUp 0.8s ease 0.2s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-image {
  animation: slideInRight 0.8s ease 0.3s both;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.dashboard-preview {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
}

.dashboard-preview:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
}

.window-header {
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
}

.window-dots {
  display: flex;
  gap: 0.5rem;
}

.window-dots::before,
.window-dots::after {
  content: '';
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.window-dots::before {
  box-shadow: 16px 0 0 rgba(255, 255, 255, 0.3), 32px 0 0 rgba(255, 255, 255, 0.3);
}

.window-content {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
}

.preview-item {
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  margin-bottom: 1rem;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Features Section */
.features {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.8rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 800;
}

.section-header p {
  font-size: 1.1rem;
  color: #999;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feature-card:hover .card-accent {
  transform: scaleX(1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: #333;
  font-weight: 700;
}

.feature-card p {
  color: #777;
  line-height: 1.7;
}

/* How it works */
.how-it-works {
  padding: 6rem 2rem;
  background: white;
}

.how-it-works h2 {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 4rem;
  color: #333;
  font-weight: 800;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.step {
  text-align: center;
  position: relative;
  padding: 2rem;
}

.step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  z-index: 1;
}

.step-number {
  position: relative;
  z-index: 2;
  font-size: 2rem;
  font-weight: 800;
  color: white;
  padding-top: 1.2rem;
}

.step h3 {
  font-size: 1.3rem;
  margin: 2rem 0 1rem;
  color: #333;
  font-weight: 700;
}

.step p {
  color: #999;
  line-height: 1.6;
}

/* Pricing Section */
.pricing {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
}

.pricing h2 {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 3rem;
  color: #333;
  font-weight: 800;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.pricing-card.pro {
  border-color: #667eea;
  transform: scale(1.05);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
}

.pricing-card:hover {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 700;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.price span {
  font-size: 1rem;
  color: #999;
}

.features-list {
  list-style: none;
  margin: 2rem 0;
  text-align: left;
}

.features-list li {
  padding: 0.8rem 0;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.features-list li:last-child {
  border-bottom: none;
}

.pricing-card .btn {
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
}

/* CTA Section */
.cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
}

.cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.cta p {
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
}

/* Footer */
.footer {
  background-color: #1a1a2e;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #333;
}

.footer-section h4 {
  margin-bottom: 1rem;
  font-weight: 700;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #999;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #667eea;
}

.footer-bottom {
  text-align: center;
  padding: 2rem 0;
  color: #777;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .hero-text h1 {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .section-header h2,
  .how-it-works h2,
  .pricing h2,
  .cta h2 {
    font-size: 2rem;
  }

  .features-grid,
  .steps-grid,
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.pro {
    transform: scale(1);
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
