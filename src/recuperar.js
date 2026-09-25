import { requestPasswordReset } from './auth-store.js';

const form = document.getElementById('recuperarForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const errorBanner = document.getElementById('errorBanner');
const successBanner = document.getElementById('successBanner');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorBanner.hidden = true;
  successBanner.hidden = true;
  emailError.textContent = '';
  emailInput.classList.remove('invalid');

  const email = emailInput.value.trim();
  if(!email){
    emailError.textContent = 'Escribe tu correo.';
    emailInput.classList.add('invalid');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando…';

  setTimeout(() => {
    requestPasswordReset(email);
    // Por seguridad, el mensaje es el mismo exista o no la cuenta:
    // así nadie puede usar este formulario para averiguar qué correos
    // están registrados.
    successBanner.textContent = 'Si ese correo tiene una cuenta, te enviamos instrucciones para recuperar tu contraseña.';
    successBanner.hidden = false;
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar instrucciones';
  }, 500);
});
