document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userModal = new bootstrap.Modal(document.getElementById('userModal'));

    // 1. SEGURIDAD
    if (!token || userData.role !== 'admin') {
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    // 2. RENDER DATOS DEL ADMIN LOGUEADO
    const syncAdminProfile = () => {
        document.getElementById('adminDisplayName').textContent = userData.full_name;
        document.getElementById('selfName').value = userData.full_name;
        document.getElementById('adminDisplayCampus').textContent = userData.metadata?.campus || 'No asignada';
        document.getElementById('adminDisplayPosition').textContent = userData.metadata?.position || 'Administrador General';
    };

    // 3. EDITAR MIS PROPIOS DATOS (PUT /api/users/:id)
    document.getElementById('editSelfForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedData = { full_name: document.getElementById('selfName').value };
        const pass = document.getElementById('selfPass').value;
        if (pass) updatedData.password = pass;

        try {
            const res = await fetch(`http://localhost:3000/api/users/${userData.id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (res.ok) {
                userData.full_name = updatedData.full_name;
                localStorage.setItem('userData', JSON.stringify(userData));
                syncAdminProfile();
                showAlert("✅ Tus datos han sido actualizados", "success");
                e.target.reset();
            }
        } catch (err) { showAlert("Error al actualizar perfil", "danger"); }
    });

    // 4. CARGAR TABLA DE USUARIOS
    const loadUsers = async () => {
        const res = await fetch('http://localhost:3000/api/users', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok) renderTable(result.data);
    };

    const renderTable = (users) => {
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';
        users.forEach(u => {
            const meta = u.metadata || {};
            const extra = u.role === 'admin' ? meta.campus : (u.role === 'coach' ? meta.specialty : 'Socio');
            tbody.innerHTML += `
                <tr>
                    <td class="ps-4 small text-muted">#${u.id}</td>
                    <td><div class="fw-bold">${u.full_name}</div><div class="x-small text-muted">${u.email}</div></td>
                    <td><span class="badge ${u.role === 'admin' ? 'bg-danger' : 'bg-success'}">${u.role}</span></td>
                    <td>${extra || '-'}</td>
                    <td class="text-center pe-4">
                        <button class="btn btn-sm btn-outline-primary" onclick="openEdit(${JSON.stringify(u).replace(/"/g, '&quot;')})">✏️</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteU(${u.id})">🗑️</button>
                    </td>
                </tr>`;
        });
    };

    // --- CRUD OTROS USUARIOS ---
    window.openUserModal = () => {
        document.getElementById('adminUserForm').reset();
        document.getElementById('mUserId').value = '';
        document.getElementById('mTitle').textContent = "Crear Nuevo Usuario";
        document.getElementById('mPassArea').classList.remove('d-none');
        userModal.show();
    };

    window.openEdit = (u) => {
        document.getElementById('mUserId').value = u.id;
        document.getElementById('mName').value = u.full_name;
        document.getElementById('mEmail').value = u.email;
        document.getElementById('mRole').value = u.role;
        document.getElementById('mTitle').textContent = "Editando a " + u.full_name;
        document.getElementById('mPassArea').classList.add('d-none');
        userModal.show();
    };

    document.getElementById('adminUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('mUserId').value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:3000/api/users/${id}` : `http://localhost:3000/api/users`;
        
        const data = {
            full_name: document.getElementById('mName').value,
            email: document.getElementById('mEmail').value,
            role: document.getElementById('mRole').value
        };
        if (!id) data.password = document.getElementById('mPass').value;

        const res = await fetch(url, {
            method,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            userModal.hide();
            loadUsers();
            showAlert(id ? "Usuario actualizado" : "Usuario creado", "success");
        }
    });

    window.deleteU = async (id) => {
        if (!confirm("¿Eliminar usuario?")) return;
        const res = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) { loadUsers(); showAlert("Usuario eliminado", "warning"); }
    };

    const showAlert = (m, t) => {
        const a = document.getElementById('statusAlert');
        a.textContent = m;
        a.className = `alert alert-${t} d-block shadow-sm`;
        setTimeout(() => a.classList.add('d-none'), 3000);
    };

    syncAdminProfile();
    loadUsers();
});

function logout() { localStorage.clear(); window.location.href = 'login.html'; }