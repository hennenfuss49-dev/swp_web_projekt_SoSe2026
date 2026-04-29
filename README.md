# 📋 TaskFlow - Task Management Anwendung

Eine moderne, responsive Task-Management-Anwendung mit Vue 3, TypeScript, Express.js und MySQL.

## ✨ Features

- 🎨 **Moderne UI** - Beautiful gradient design mit animationen
- 👤 **Benutzer-Authentifizierung** - Sichere Registrierung und Anmeldung
- 🔐 **Sichere Passwörter** - Bcrypt Hashing
- 🎯 **Task Management** - Erstelle, bearbeite und verwalte Tasks
- 👥 **Team Collaboration** - Arbeite mit deinem Team zusammen
- 📊 **Dashboard** - Übersichtliche Statistiken und Übersicht
- 💾 **MySQL Datenspeicherung** - Persistente Datenspeicherung
- 📱 **Responsive Design** - Funktioniert auf allen Geräten

## 🚀 Quick Start

### 1. Datenbank einrichten

```bash
mysql -u root -p < database.sql
```

Siehe [DATABASE_SETUP.md](DATABASE_SETUP.md) für detaillierte Anleitung.

### 2. Backend starten

```bash
cd backend
npm install
npm run dev
```

Backend läuft auf http://localhost:3001

### 3. Frontend starten (neues Terminal)

```bash
npm install
npm run serve
```

Frontend läuft auf http://localhost:8080

## 📂 Projektstruktur

```
swp_web_projekt/
├── src/                           # Vue 3 Frontend
│   ├── pages/                     # Seitenkomponenten
│   │   ├── HomePage.vue          # Startseite
│   │   ├── LoginPage.vue         # Anmeldung
│   │   ├── RegisterPage.vue      # Registrierung
│   │   └── DashboardPage.vue     # Dashboard
│   ├── services/                 # API Services
│   │   └── auth.ts               # Authentifizierung Service
│   ├── router/                   # Vue Router
│   │   └── index.ts              # Routen-Konfiguration
│   ├── App.vue                   # Haupt-App
│   └── main.ts                   # Entry Point
├── backend/                       # Express.js Backend
│   ├── routes/                   # API Routes
│   │   └── auth.ts               # Auth Endpoints
│   ├── server.ts                 # Hauptserver
│   ├── db.ts                     # MySQL Verbindung
│   ├── .env                      # Umgebungsvariablen
│   └── package.json
├── database.sql                  # MySQL Schema
├── DATABASE_SETUP.md            # Datenbank-Anleitung
└── SETUP.md                      # Vollständige Setup-Anleitung
```

## 🔗 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login  
POST /api/auth/verify
```

## 📋 Seiten Navigation

```
Homepage (/) 
  ↓
Register (/register) oder Login (/login)
  ↓
Dashboard (/dashboard)
```

## 🛠️ Technologie Stack

### Frontend
- Vue 3
- TypeScript  
- Vue Router 4
- Axios
- CSS3 mit Animationen

### Backend
- Express.js
- TypeScript
- MySQL2
- Bcrypt (Passwort Hashing)
- JWT (Token Management)

### Datenbank
- MySQL
- Relational Database Design
- Foreign Keys & Indizes

## 📖 Weitere Dokumentation

- [Detailliertes Setup Guide](SETUP.md)
- [Datenbank Schema](DATABASE_SETUP.md)

## 💡 Standard Login (nach Registrierung)

1. Gehe zu http://localhost:8080
2. Klicke "Registrieren"
3. Fülle das Formular aus
4. Nach Registrierung → automatisch zum Dashboard
5. Zum Abmelden → Button im Dashboard

## ⚙️ Umgebungsvariablen

**Backend `.env`:**
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taskflow
JWT_SECRET=your-secret-key-change-this
```

## 🐛 Häufige Probleme

| Problem | Lösung |
|---------|--------|
| CORS Error | Backend muss auf Port 3001 laufen |
| MySQL Connection Error | MySQL nicht gestartet / .env Einstellungen prüfen |
| Seite lädt nicht | Frontend auf Port 8080, Backend auf 3001 starten |

## 📝 Lizenz

Dieses Projekt ist für Schulungszwecke erstellt.

---

**Made with ❤️ für das SWP-Projekt 2026**

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
