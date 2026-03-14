<?php
  // Configuración de la dirección de destino y asunto
  $to = 'kevin.herrera.centellas@gmail.com'; 
  $subject = 'Mensaje del formulario de contacto - Portafolio';

  // Obtención y sanitización de los datos del formulario
  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

  // Validación básica del lado del servidor
  if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
      http_response_code(400);
      echo "Datos inválidos o faltantes.";
      exit;
  }

  // Configuración de las cabeceras del correo
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion();

  // Intento de envío del correo electrónico
  if (mail($to, $subject, $message, $headers)) {
      http_response_code(200);
      echo "Correo enviado con éxito.";
  } else {
      http_response_code(500);
      echo "Error al enviar el correo.";
  }
?>

