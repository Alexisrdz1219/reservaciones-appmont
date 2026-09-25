/**
 * ⚠️ AUTENTICACIÓN SIMULADA — SOLO PARA DESARROLLO/PROTOTIPO ⚠️
 * ---------------------------------------------------------------
 * Este archivo guarda usuarios y contraseñas en localStorage, en el
 * navegador del propio usuario, SIN cifrar. Sirve para construir y
 * probar visualmente el flujo de login/registro mientras no existe
 * un backend real.
 *
 * NO USAR ASÍ EN PRODUCCIÓN. Antes de tener usuarios reales, esto debe
 * reemplazarse por un backend (por ejemplo en Render) que:
 *   - Guarde contraseñas con hash (bcrypt/argon2), nunca en texto plano.
 *   - Entregue un token de sesión (JWT o cookie httpOnly) en vez de
 *     guardar la sesión directamente en localStorage.
 *   - Valide todo del lado del servidor, no solo en el navegador.
 *
 * Cuando llegue ese momento, solo hay que reemplazar las funciones de
 * este archivo — el resto de la app (login.js, register.js, etc.) ya
 * está escrito para llamarlas por su nombre, así que el cambio queda
 * contenido aquí.
 */

const USERS_KEY = 'reservaciones-app:users';
const SESSION_KEY = 'reservaciones-app:session';

function readUsers(){
  try{
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function writeUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Crea una cuenta nueva. Devuelve { ok, error? } */
export function registerUser({ nombre, negocio, email, password }){
  const users = readUsers();
  const yaExiste = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if(yaExiste){
    return { ok:false, error:'Ya existe una cuenta con ese correo.' };
  }
  users.push({ nombre, negocio, email, password, creadoEn: new Date().toISOString() });
  writeUsers(users);
  return { ok:true };
}

/** Valida credenciales. Devuelve { ok, error? } */
export function loginUser({ email, password }){
  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if(!user || user.password !== password){
    return { ok:false, error:'Correo o contraseña incorrectos.' };
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    email: user.email,
    nombre: user.nombre,
    negocio: user.negocio,
    iniciadoEn: new Date().toISOString()
  }));
  return { ok:true };
}

export function logoutUser(){
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(){
  try{
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}

export function isLoggedIn(){
  return getSession() !== null;
}

/** Simula el envío de un correo de recuperación. */
export function requestPasswordReset(email){
  const users = readUsers();
  const existe = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  // Nota: no le decimos al usuario si el correo existe o no en el mensaje
  // final (buena práctica de seguridad), pero sí lo dejamos disponible
  // aquí por si quieres registrar el intento en un log más adelante.
  return { ok:true, existed: existe };
}
