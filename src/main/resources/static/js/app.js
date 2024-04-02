const allUsers = $('#AllUsers')
let editModalForm = document.forms['editModalForm']
let deleteModalForm = document.forms['deleteModalForm']
let newUserForm = document.forms['newUserForm']


$(async function () {
    await getAuthUser()
    await allUsersTable()
    addUser()
    editUser()
    deleteUser()
})

async function getUser(id) {
    let response = await fetch('api/users/' + id)
    return await response.json()
}

async function allUsersTable() {
    allUsers.empty()
    fetch('/api/users')
        .then(result => result.json())
        .then(data => data.forEach(user => {
                let roles = user.roles.map(role => ' ' + role.authority.substring(5))
                let tableRow = `$(
                <tr>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${user.id}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${user.firstName}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${user.lastName}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${user.email}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${roles}</td>
                    <td style="text-align: center; vertical-align: middle;font-size: large">
                        <button type="button" class="btn btn-info"
                            data-toogle="modal"
                            data-target="#editModal"
                            onclick="openEditModal(${user.id})">Edit
                        </button>
                    </td>
                    <td style="text-align: center; vertical-align: middle;font-size: large">
                        <button type="button" class="btn btn-danger" 
                            data-toggle="modal"
                            data-target="#deleteModal"
                            onclick="openDeleteModal(${user.id})">Delete
                        </button>
                    </td>
                </tr>)`
                allUsers.append(tableRow)
            }
        ))
}

async function openEditModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#editModal'))
    await fillModalForm(editModalForm, modal, id)
}

async function openDeleteModal(id) {
    const modal = new bootstrap.Modal(document.querySelector('#deleteModal'))
    await fillModalForm(deleteModalForm, modal, id)
    switch (deleteModalForm.roles.value) {
        case '1':
            deleteModalForm.roles.value = 'USER'
            break
        case '2':
            deleteModalForm.roles.value = 'ADMIN'
            break

    }
}

async function fillModalForm(form, modal, id) {
    modal.show()
    let user = await getUser(id)
    form.id.value = user.id
    form.firstName.value = user.firstName
    form.lastName.value = user.lastName
    form.email.value = user.email
    form.password.value = user.password
}

function addUser() {
    newUserForm.addEventListener('submit', event => {
        event.preventDefault()
        let newUserRoles = []
        for (let i = 0; i < newUserForm.roles.options.length; i++) {
            if (newUserForm.roles.options[i].selected) {
                newUserRoles.push({
                    id: newUserForm.roles.options[i].value,
                    authority: newUserForm.roles.options[i].text
                })
            }
        }
        console.log(newUserRoles);
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: newUserForm.id.value,
                roles: newUserRoles,
                firstName: newUserForm.firstName.value,
                lastName: newUserForm.lastName.value,
                email: newUserForm.email.value,
                password: newUserForm.password.value
            })
        }).then(() => {
            newUserForm.reset()
            allUsersTable()
            $('#users-tab').click()
        })
    })
}

function editUser() {
    editModalForm.addEventListener('submit', event => {
        event.preventDefault()
        let editedUserRoles = []
        for (let i = 0; i < editModalForm.roles.options.length; i++) {
            if (editModalForm.roles.options[i].selected) {
                editedUserRoles.push({
                    id: editModalForm.roles.options[i].value,
                    authority:  editModalForm.roles.options[i].text
                })
            }
        }

        fetch('/api/users/' +  editModalForm.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editModalForm.id.value,
                roles: editedUserRoles,
                firstName: editModalForm.firstName.value,
                lastName: editModalForm.lastName.value,
                email: editModalForm.email.value,
                password: editModalForm.password.value
            })
        }).then(() => {
            $('#editModalCloseButton').click()
            allUsersTable()
        })
    })
}


function deleteUser() {
    deleteModalForm.addEventListener("submit", event => {
        event.preventDefault()
        let id = encodeURIComponent(deleteModalForm.id.value)
        fetch("/api/users/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            $('#deleteModalCloseButton').click()
            allUsersTable()
        })
    })
}

// Get Authenticated User
function getAuthUser() {
    fetch('/api/user')
        .then(result => result.json())
        .then(data => {
            $('#UserEmail').append(data.email);
            let roles = data.roles.map(role => ' ' + role.authority.substring(5))
            $('#UserRoles').append(roles)
            let tableRow = `$( 
                <tr>
                    <th scope="col" style="text-align: center; vertical-align: middle;font-size: large">
                          ID
                    </th>
                    <th scope="col" style="text-align: center; vertical-align: middle;font-size: large">
                          First Name
                    </th>
                    <th scope="col" style="text-align: center; vertical-align: middle;font-size: large">
                          Last Name
                    </th>
                    <th scope="col" style="text-align: center; vertical-align: middle;font-size: large">
                          Email
                    </th>
                    <th scope="col" style="text-align: center; vertical-align: middle;font-size: large">
                          Roles
                    </th>
                </tr>)`
            $('#TableRow').append(tableRow)
            let user = `$(
                <tr>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${data.id}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${data.firstName}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${data.lastName}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${data.email}</td>
                    <td style="text-align: center; vertical-align: middle; font-size: large">${roles}</td>
                </tr>)`
            $('#UserTable').append(user)
        })
}