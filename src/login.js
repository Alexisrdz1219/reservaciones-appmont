import { loginUser } from './auth-store.js';

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const errorBanner = document.getElementById('errorBanner');
const successBanner = document.getElementById('successBanner');
const submitBtn = document.getElementById('submitBtn');

// Si venimos de un registro exitoso, lo avisamos aquí.
if(new URLSearchParams(window.location.search).get('registrado') === '1'){
  successBanner.textContent = 'Cuenta creada. Ya puedes iniciar sesión.';
  successBanner.hidden = false;
}

function clearErrors(){
  errorBanner.hidden = true;
  emailError.textContent = '';
  passwordError.textContent = '';
  emailInput.classList.remove('invalid');
  passwordInput.classList.remove('invalid');
}

function showBannerError(msg){
  errorBanner.textContent = msg;
  errorBanner.hidden = false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  if(!email){
    emailError.textContent = 'Escribe tu correo.';
    emailInput.classList.add('invalid');
    valid = false;
  }
  if(!password){
    passwordError.textContent = 'Escribe tu contraseña.';
    passwordInput.classList.add('invalid');
    valid = false;
  }
  if(!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Entrando…';

  // Pequeño retraso simulado para que se sienta como una llamada real.
  setTimeout(() => {
    const result = loginUser({ email, password });
    if(result.ok){
      window.location.href = '/dashboard.html';
    } else {
      showBannerError(result.error);
      submitBtn.disabled = false;
      submitBtn.textContent = 'Entrar';
    }
  }, 400);
});
