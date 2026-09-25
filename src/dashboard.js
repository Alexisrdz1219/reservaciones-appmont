import { requireSession } from './auth-guard.js';
import { logoutUser } from './auth-store.js';

// Si no hay sesión, esto redirige a /index.html y el resto del archivo
// no se ejecuta.
const session = requireSession();
if(session){
  document.getElementById('welcomeMsg').textContent = `Bienvenido/a, ${session.nombre} 👋`;

  document.getElementById('logoutBtn').addEventListener('click', () => {
    logoutUser();
    window.location.href = '/index.html';
  });
}
