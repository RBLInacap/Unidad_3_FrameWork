document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const sportModal = new bootstrap.Modal(document.getElementById('sportModal'));

    // 1. SEGURIDAD: Solo Coaches permitidos
    if (!token || (userData && userData.role !== 'coach')) {
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    // 2. INICIALIZAR PERFIL PROPIO
    const initProfile = () => {
        document.getElementById('coachName').textContent = userData.full_name;
        document.getElementById('coachEmail').textContent = userData.email;
        const specialty = userData.metadata?.specialty || 'Entrenador Personal';
        document.getElementById('coachSpecialty').textContent = specialty.toUpperCase();
    };

    // 3. CRUD: READ (Cargar Socios)
    const loadSocios = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const result = await res.json();
            
            if (res.ok) {
                const socios = result.data.filter(u => u.role === 'user');
                document.getElementById('socioCount').textContent = `${socios.length} Socios`;
                renderTable(socios);
            }
        } catch (err) {
            console.error("Error al cargar socios:", err);
        }
    };

    const renderTable = (socios) => {
        const tbody = document.getElementById('socioTableBody');
        tbody.innerHTML = '';

        socios.forEach(s => {
            const sports = s.metadata?.sports || [];
            const sportsTags = sports.map(sp => 
                `<span class="badge bg-light text-info border border-info me-1">${sp.name}</span>`
            ).join('');

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="ps-4">
                    <div class="fw-bold text-dark">${s.full_name}</div>
                    <div class="x-small text-muted" style="font-size: 0.7rem;">${s.email}</div>
                </td>
                <td>${sportsTags || '<span class="text-muted italic small">Sin asignar</span>'}</td>
                <td class="text-center pe-4">
                    <button class="btn btn-sm btn-info text-white" 
                            onclick="openManageModal(${s.id}, '${s.full_name}', '${JSON.stringify(sports).replace(/'/g, "\\'")}')">
                        ➕ Asignar
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    };

    // 4. CRUD: UPDATE (Asignar Deporte a Socio)
    window.openManageModal = (id, name, currentSportsJson) => {
        document.getElementById('targetId').value = id;
        document.getElementById('targetName').textContent = name;
        // Guardar estado actual de deportes para añadir el nuevo sin borrar los viejos
        document.getElementById('addSportToSocioForm').dataset.current = currentSportsJson;
        sportModal.show();
    };

    document.getElementById('addSportToSocioForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const socioId = document.getElementById('targetId').value;
        const name = document.getElementById('cSportName').value.trim();
        const freq = document.getElementById('cSportFreq').value;
        
        const currentSports = JSON.parse(e.target.dataset.current);
        const updatedMetadata = {
            sports: [...currentSports, { name, frequency_per_week: parseInt(freq) }]
        };

        try {
            const response = await fetch(`http://localhost:3000/api/users/${socioId}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ metadata: updatedMetadata })
            });

            if (response.ok) {
                sportModal.hide();
                loadSocios();
                e.target.reset();
            } else {
                alert("No se pudo actualizar el expediente del socio.");
            }
        } catch (err) {
            alert("Error de conexión con el servidor.");
        }
    });

    // 5. ACTUALIZAR PROPIA CLAVE
    document.getElementById('editCoachPass').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('newPass').value;
        const status = document.getElementById('statusMsg');

        try {
            const res = await fetch(`http://localhost:3000/api/users/${userData.id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ password: newPassword })
            });

            if (res.ok) {
                status.textContent = "Clave actualizada con éxito";
                status.className = "alert alert-success mt-3 small text-center d-block";
                e.target.reset();
                setTimeout(() => status.classList.add('d-none'), 3000);
            }
        } catch (err) {
            status.textContent = "Error al conectar";
            status.className = "alert alert-danger mt-3 small text-center d-block";
        }
    });

    // Ejecución inicial
    initProfile();
    loadSocios();
});