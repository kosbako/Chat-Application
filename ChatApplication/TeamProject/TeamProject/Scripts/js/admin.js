
const userRow = (username, firstName, lastName, index) => {
    let str = `<tr>
                    <th scope="row" class="tableCol">${index}</th>
                    <td class="tableCol">${username}</td>
                    <td class="tableCol">${firstName}</td>
                    <td class="tableCol">${lastName}</td>
                    <td class="tableCol">MakeAdmin</td>
                    <td class="tableCol">Delete</td>
                </tr>`
    return str
}

//send post request to make a user admin
const fetchToMakeAdmin = async (username) => {
    await fetch('http://localhost:51696/api/Admin/MakeAdmin', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(username)
    })
    await window.location.reload()
}
//send post request to delete a user
const fetchToDeleteUser = async (username) => {
    await fetch('http://localhost:51696/api/Admin/Remove', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(username)
    })
    await window.location.reload()
}
// fetching users and displaying them
    //**********
const fetchUsers = () => {
    fetch('http://localhost:51696/api/admin/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach((el, index) => {
                document.querySelector('tbody').insertAdjacentHTML('beforeend', userRow(el.Username, el.FirstName, el.LastName, index+1))
            })
            // add listener for removing users
            document.querySelectorAll('.tableCol:nth-child(6)').forEach((removeBtn, index) => {
                removeBtn.addEventListener('click', (e) => {
                    let username
                    let i = index
                    data.forEach((el, index) => {
                        if (index === i) {
                            username = el.Username
                        }
                    })
                    fetchToDeleteUser(username)
                })
            })
            //add event listener for making admin
            document.querySelectorAll('.tableCol:nth-child(5)').forEach((makeAdminBtn, index) => {
                makeAdminBtn.addEventListener('click', (e) => {
                    let username
                    let i = index
                    data.forEach((el, index) => {
                        if (index === i) {
                            username = el.Username
                        }
                    })
                    fetchToMakeAdmin(username)
                })
            })
        })
}
fetchUsers()

    //************