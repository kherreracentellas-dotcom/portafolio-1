// Obtención de referencias a los elementos del formulario
const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');

// Agregando el escuchador de eventos para el envío del formulario
submitButton.addEventListener('click', async function(e) {
  e.preventDefault();

  // Captura de los valores de los campos del formulario
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validación básica del lado del cliente
  if (!name || !email || !message) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Deshabilitar botón para evitar múltiples envíos
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  try {
    // Envío de los datos del formulario al servidor usando la API fetch
    const response = await fetch('form.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
    });

    // Procesando la respuesta del servidor
    if (response.ok) {
      console.log('El formulario se ha enviado correctamente.');
      alert('¡Gracias! Tu mensaje ha sido enviado con éxito.');
      form.reset(); // Restablecer el formulario después del envío exitoso
    } else {
      console.error('Error en el envío del formulario:', response.status);
      alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  } catch (error) {
    // Captura de errores de red o generales
    console.error('Error en la petición:', error);
    alert('No se pudo conectar con el servidor. Revisa tu conexión.');
  } finally {
    // Restaurar el estado del botón
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar';
  }
});

