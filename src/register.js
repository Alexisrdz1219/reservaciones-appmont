import { registerUser } from './auth-store.js';

const form = document.getElementById('registerForm');
const fields = {
  nombre: document.getElementById('nombre'),
  negocio: document.getElementById('negocio'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  passwordConfirm: document.getElementById('passwordConfirm'),
};
const errors = {
  nombre: document.getElementById('nombreError'),
  negocio: document.getElementById('negocioError'),
  email: document.getElementById('emailError'),
  password: document.getElementById('passwordError'),
  passwordConfirm: document.getElementById('passwordConfirmError'),
};
const errorBanner = document.getElementById('errorBanner');
const submitBtn = document.getElementById('submitBtn');

function clearErrors(){
  errorBanner.hidden = true;
  Object.values(fields).forEach(f => f.classList.remove('invalid'));
  Object.values(errors).forEach(e => e.textContent = '');
}

function markInvalid(key, message){
  fields[key].classList.add('invalid');
  errors[key].textContent = message;
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const nombre = fields.nombre.value.trim();
  const negocio = fields.negocio.value.trim();
  const email = fields.email.value.trim();
  const password = fields.password.value;
  const passwordConfirm = fields.passwordConfirm.value;

  let valid = true;

  if(!nombre){ markInvalid('nombre', 'Escribe tu nombre.'); valid = false; }
  if(!negocio){ markInvalid('negocio', 'Escribe el nombre de tu negocio.'); valid = false; }
  if(!email){
    markInvalid('email', 'Escribe tu correo.'); valid = false;
  } else if(!isValidEmail(email)){
    markInvalid('email', 'Ese correo no parece válido.'); valid = false;
  }
  if(!password){
    markInvalid('password', 'Escribe una contraseña.'); valid = false;
  } else if(password.length < 8){
    markInvalid('password', 'Usa al menos 8 caracteres.'); valid = false;
  }
  if(passwordConfirm !== password){
    markInvalid('passwordConfirm', 'Las contraseñas no coinciden.'); valid = false;
  }

  if(!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Creando cuenta…';

  setTimeout(() => {
    const result = registerUser({ nombre, negocio, email, password });
    if(result.ok){
      window.location.href = '/index.html?registrado=1';
    } else {
      errorBanner.textContent = result.error;
      errorBanner.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Crear cuenta';
    }
  }, 400);
});
