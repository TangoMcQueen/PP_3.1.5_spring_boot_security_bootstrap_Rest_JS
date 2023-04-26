
function deleteModal(id) {
    fetch('http://localhost:8088/api/admin/users/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(user => {
                document.getElementById('idDel').value = user.id;
                document.getElementById('firstNameDel').value = user.name;
                document.getElementById('lastNameDel').value = user.lastName;
                document.getElementById('ageDel').value = user.age;
                document.getElementById('emailDel').value = user.email;
            })
    })
}

async function deleteUser() {
    await fetch('http://localhost:8088/api/admin/users/' + document.getElementById('idDel').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(document.getElementById('idDel').value)
        })
        .then(() => {
            document.getElementById("nav-admin-tab").click();
            showAllUsers();
            document.getElementById("closeDeleteModal").click();})
}
