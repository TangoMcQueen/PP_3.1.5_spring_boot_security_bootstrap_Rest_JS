const data = document.getElementById("data-user");
const url = 'http://localhost:8088/api/viewUser';
const panel = document.getElementById("user-panel");

function userAuthInfo() {
    fetch(url)
        .then((res) => res.json())
        .then((user) => {

            let temp = '';

            temp += `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td>${user.roles.map(role => " " + role.name.substring(5))}</td> 
            </tr>`;
            data.innerHTML = temp;
            panel.innerHTML = `<h5>${user.email} with roles: ${user.roles.map(role => " " + role.name.substring(5))}</h5>`
        });
}

userAuthInfo()