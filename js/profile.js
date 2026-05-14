document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!token || userData.role !== 'user') {
        localStorage.clear();
        window.location.href = 'login.html';
        return;
    }

    const syncView = () => {
        document.getElementById('displayName').textContent = userData.full_name;
        document.getElementById('displayEmail').textContent = userData.email;
        document.getElementById('userEmail').value = userData.email;
        document.getElementById('editFullName').value = userData.full_name;
        renderSports();
    };

    const updateRequest = async (data) => {
        const res = await fetch(`http://localhost:3000/api/users/${userData.id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return res.ok;
    };

    document.getElementById('editNameForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = document.getElementById('editFullName').value;
        if (await updateRequest({ full_name: newName })) {
            userData.full_name = newName;
            localStorage.setItem('userData', JSON.stringify(userData));
            syncView();
            alert("Nombre actualizado");
        }
    });

    const renderSports = () => {
        const list = document.getElementById('sportsList');
        list.innerHTML = '';
        (userData.metadata.sports || []).forEach(s => {
            list.innerHTML += `<li class="list-group-item d-flex justify-content-between"><b>${s.name}</b> <span>${s.frequency_per_week}x</span></li>`;
        });
    };

    syncView();
});