<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-box">
        <h1>🔐 Anmelden</h1>
        <p class="subtitle">Melden dich mit deinen Anmeldedaten an</p>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">E-Mail:</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="deine@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Passwort:</label>
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary btn-login" :disabled="isLoading">
            {{ isLoading ? 'Wird angemeldet...' : 'Anmelden' }}
          </button>
        </form>

        <p class="message" v-if="message" :class="messageType">{{ message }}</p>

        <div class="links">
          <p>Noch kein Konto? <router-link to="/register">Hier registrieren</router-link></p>
          <p><router-link to="/">Zur Startseite</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { authService } from '../services/auth'

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      messageType: '',
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true
      this.message = ''

      if (!this.email || !this.password) {
        this.message = 'Bitte fülle alle Felder aus'
        this.messageType = 'error'
        this.isLoading = false
        return
      }

      try {
        await authService.login({
          email: this.email,
          password: this.password
        })

        this.message = 'Anmeldung erfolgreich! Leiten weiter...'
        this.messageType = 'success'

        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 1500)
      } catch (error: any) {
        this.message = error.error || 'Login fehlgeschlagen'
        this.messageType = 'error'
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-box {
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.login-box h1 {
  text-align: center;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login {
  background-color: #667eea;
  color: white;
  margin-top: 1rem;
}

.btn-login:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.message {
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 5px;
  font-weight: 500;
}

.message.error {
  background-color: #ffebee;
  color: #c62828;
}

.message.success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.links {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
}

.links p {
  margin: 0.5rem 0;
  color: #666;
}

.links a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #5568d3;
  text-decoration: underline;
}
</style>
