/**
 * Protege páginas que requieren sesión iniciada.
 * Impórtalo al inicio de cualquier página interna (dashboard, reservas, etc.):
 *
 *   import { requireSession } from './auth-guard.js';
 *   const session = requireSession();
 *
 * Si no hay sesión, redirige a index.html (login) automáticamente
 * y detiene la ejecución del resto del script de esa página.
 */
import { getSession } from './auth-store.js';

export function requireSession(){
  const session = getSession();
  if(!session){
    window.location.href = '/index.html';
    return null;
  }
  return session;
}
