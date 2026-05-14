document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const loginMessage = document.getElementById('loginMessage');

            try {
                localStorage.clear();
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (response.ok) {
                    const user = result.data.user;
                    // Guardamos todo el objeto para tener acceso a 'metadata'
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('userRole', user.role);
                    localStorage.setItem('userData', JSON.stringify(user));

                    // Redirección por Rol y Color
                    if (user.role === 'admin') {
                        window.location.replace('dashboard-admin.html');
                    } else if (user.role === 'coach') {
                        window.location.replace('dashboard-coach.html');
                    } else {
                        window.location.replace('dashboard-usuario.html');
                    }
                } else {
                    loginMessage.textContent = result.message || "Error de acceso";
                    loginMessage.className = "alert alert-danger p-2 small";
                    loginMessage.classList.remove('d-none');
                }
            } catch (error) {
                alert("Error de conexión con el servidor.");
            }
        });
    }
});