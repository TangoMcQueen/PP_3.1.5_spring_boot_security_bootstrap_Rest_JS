const addUserForm = document.getElementById("add-user-form")

addUserForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let nameValue = document.getElementById('name').value;
    let lastNameValue = document.getElementById('lastName').value;
    let ageValue = document.getElementById('age').value;
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let rolesValue = getRoles(Array.from(document.getElementById("newUserRoles").selectedOptions).map(role => role.value));

    fetch('http://localhost:8088/api/admin/users', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            name: nameValue,
            lastName: lastNameValue,
            age: ageValue,
            email: emailValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(user => {
            const usersArr = [];
            usersArr.push(user);
            showAllUsers(usersArr);
        })
        .then(() => {
            document.getElementById("nav-admin-tab").click();})
})

function getRoles(rols) {
    let roles = [];
    if (rols.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    if (rols.indexOf("USER") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}