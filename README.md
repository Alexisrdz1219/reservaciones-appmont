# Reservaciones — Ecosistema de inicio de sesión

Proyecto base hecho con **Vite** (HTML + CSS + JS puro, sin frameworks). Por ahora incluye:

- `index.html` → Iniciar sesión
- `register.html` → Crear cuenta
- `recuperar.html` → Recuperar contraseña
- `dashboard.html` → Placeholder protegido por sesión (aquí irá el dashboard real más adelante)

## ⚠️ Importante: autenticación temporal

Las cuentas y contraseñas se guardan en `localStorage` del navegador (ver `src/auth-store.js`),
**sin cifrar**. Esto es solo para poder ver y probar el flujo visual mientras no existe un
backend real. Antes de tener usuarios de verdad, hay que reemplazar `auth-store.js` por
llamadas a un backend (por ejemplo en Render) que sí cifre contraseñas y maneje sesiones
de forma segura.

## Correr el proyecto en tu computadora

```bash
npm install
npm run dev
```

Esto abre el proyecto en `http://localhost:5173`.

## Compilar para producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar. Vercel hace esto automáticamente al conectar
el repositorio, no hace falta correrlo a mano para desplegar.

## Estructura

```
├── index.html          # Login
├── register.html        # Registro
├── recuperar.html        # Recuperar contraseña
├── dashboard.html        # Placeholder protegido
├── vite.config.js        # Config multi-página de Vite
├── public/
│   └── favicon.svg
└── src/
    ├── style.css          # Estilos compartidos
    ├── auth-store.js       # "Base de datos" simulada (temporal)
    ├── auth-guard.js       # Protege páginas que requieren sesión
    ├── login.js
    ├── register.js
    ├── recuperar.js
    └── dashboard.js
```
