// Dentro de tu función de login exitoso:
localStorage.setItem('token', result.token);
localStorage.setItem('userData', JSON.stringify(result.user));

const role = result.user.role;
if (role === 'admin') window.location.href = 'dashboard-admin.html';
else if (role === 'coach') window.location.href = 'dashboard-coach.html';
else window.location.href = 'dashboard-usuario.html';