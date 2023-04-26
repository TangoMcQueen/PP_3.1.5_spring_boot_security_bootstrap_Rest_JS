const editUserForm = document.getElementById("edit-user-form")

async function editModal(id) {
    fetch('http://localhost:8088/api/admin/users/' + id)
        .then(res => {
        res.json()
            .then(async user => {
                console.log(user);
                document.getElementById('idEdit').value = user.id;
                document.getElementById('firstNameEdit').value = user.name;
                document.getElementById('lastNameEdit').value = user.lastName;
                document.getElementById('ageEdit').value = user.age;
                document.getElementById('emailEdit').value = user.email;
                document.getElementById('passwordEdit').value = user.password;
                if (user.roles.length === 2) {
                    document.getElementById('adminFlag').setAttribute('selected', 'true');
                    document.getElementById('userFlag').setAttribute('selected', 'true');
                } else if (user.roles.length === 1 && (user.roles[0].id === 1)) {
                    document.getElementById('adminFlag').setAttribute('selected', 'true');
                } else if (user.roles.length === 1 && (user.roles[0].id === 2)) {
                    document.getElementById('userFlag').setAttribute('selected', 'true');
                }
            })
    })
}

editUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let idValue = document.getElementById("idEdit").value;
    let nameValue = document.getElementById('firstNameEdit').value;
    let lastNameValue = document.getElementById('lastNameEdit').value;
    let ageValue = document.getElementById('ageEdit').value;
    let emailValue = document.getElementById('emailEdit').value;
    let passwordValue = document.getElementById('passwordEdit').value;
    let rolesValue = getEditRoles(Array.from(document.getElementById("rolesEdit").selectedOptions).map(role => role.value));


    await fetch('http://localhost:8088/api/admin/users/' + idValue, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idValue,
            name: nameValue,
            lastName: lastNameValue,
            age: ageValue,
            email: emailValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(() => {
            document.getElementById("nav-admin-tab").click();
            showAllUsers();
            document.getElementById("closeEditModal").click();
        })
})

function getEditRoles(rols) {
    let roles = [];
    if (rols.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1,
            "name": 'ROLE_ADMIN'});
    }
    if (rols.indexOf("USER") >= 0) {
        roles.push({"id": 2,
            "name": 'ROLE_USER'});
    }
    return roles;
}
