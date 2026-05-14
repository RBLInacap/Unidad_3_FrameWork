document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Captura de datos
        const full_name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const role = document.getElementById('regRole').value;

        // 2. Preparar el mensaje visual (Cargando)
        registerMessage.textContent = "Procesando registro...";
        registerMessage.className = "alert alert-info mt-3 small text-center";
        registerMessage.classList.remove('d-none');

        try {
            // 3. Petición al Backend
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name,
                    email,
                    password,
                    role
                })
            });

            const result = await response.json();

            if (response.ok) {
                // ÉXITO: Usuario guardado en database.sqlite
                registerMessage.textContent = "¡Registro exitoso! Redirigiendo...";
                registerMessage.className = "alert alert-success mt-3 small text-center";
                
                // Esperar 2 segundos para que el usuario vea el éxito y redirigir
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);

            } else {
                // ERROR: El servidor respondió con un fallo (ej: email duplicado)
                registerMessage.textContent = result.message || "No se pudo completar el registro.";
                registerMessage.className = "alert alert-danger mt-3 small text-center";
            }

        } catch (error) {
            // ERROR DE RED: Servidor apagado o error de conexión
            console.error("Error de conexión:", error);
            registerMessage.textContent = "Error: No se pudo conectar con el servidor.";
            registerMessage.className = "alert alert-danger mt-3 small text-center";
        }
    });
});