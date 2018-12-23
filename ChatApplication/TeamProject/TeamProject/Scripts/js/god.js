
const dateChange = (date) => {
    date = date.replace("T", " ")
    date = date.slice(0, 16)
    return date
}


const option = (name) => {
    return `<option value="${name}">${name}</option>`
}
const sentMessage = (message,date) => {
    date = dateChange(date)

    return `<div class="sentMessage"><span>${message}</span><div class='dateS'>${date}</div></div>`
   
    
}
const receivedMessage = (message, date) => {
    date = dateChange(date)
    return `<div class="receivedMessage"><span>${message}</span><div class='dateR'>${date}</div></div>`

}


const fetchUsers = () => {
    fetch('http://localhost:51696/api/user')
        .then(response => response.json())
        .then(data => {
            data.forEach((el) => {
                document.querySelector('#inputGroupSelect01').insertAdjacentHTML('beforeend', option(el))
            })
           
        })
}

const fetchMessages = (username) => {
    if (username != 'Choose user') {
        fetch('http://localhost:51696/api/God', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(username)
        }).then(response => response.json())
            .then(data => {
                let userList = []
                userIdentity = document.querySelector('#inputGroupSelect01').value

                data.forEach(function (el) {
                    if (el.SenderUsername != userIdentity) {
                        userList.push(el.SenderUsername)
                    }
                    if (el.ReceiverUsername != userIdentity) {
                        userList.push(el.ReceiverUsername)
                    }
                })
                //distinct users
                const distinctUsers = userList.filter(function onlyUnique(value, index, self) {
                    return self.indexOf(value) === index;
                })
                //clear second select first
                while (document.querySelector('#inputGroupSelect02').firstChild) {
                    document.querySelector('#inputGroupSelect02').removeChild(document.querySelector('#inputGroupSelect02').firstChild);
                }
                document.querySelector('#inputGroupSelect02').insertAdjacentHTML('beforeend', option('Choose conversation'))
                document.querySelector('#selectReceiver').classList.remove("hidden");
                distinctUsers.forEach((el) => {
                    document.querySelector('#inputGroupSelect02').insertAdjacentHTML('beforeend', option(el))
                })
                return data
            })
            .then(data => {
                username = document.querySelector('#inputGroupSelect01').value
                //event listener for second select
                document.querySelector('#inputGroupSelect02').addEventListener('change', (e) => {
                    //clear messages
                    while (document.querySelector('#displayMessages').firstChild) {
                        document.querySelector('#displayMessages').removeChild(document.querySelector('#displayMessages').firstChild);
                    }
                    otherUser = document.querySelector('#inputGroupSelect02').value
                    document.querySelector('#displayMessages').classList.remove("hidden");
                    data.forEach((item) => {
                        if (username === item.SenderUsername && otherUser === item.ReceiverUsername) {
                            document.querySelector('#displayMessages').insertAdjacentHTML('beforeend', sentMessage(item.Data, item.Date))
                        } else if (otherUser === item.SenderUsername && username === item.ReceiverUsername) {
                            document.querySelector('#displayMessages').insertAdjacentHTML('beforeend', receivedMessage(item.Data, item.Date))
                        }
                    })
                    document.querySelector('#displayMessages').scrollTop = document.querySelector('#displayMessages').scrollHeight;
                })
                
            })
    } else {
        while (document.querySelector('#inputGroupSelect02').firstChild) {
            document.querySelector('#inputGroupSelect02').removeChild(document.querySelector('#inputGroupSelect02').firstChild);
        }
        document.querySelector('#inputGroupSelect02').insertAdjacentHTML('beforeend', option('Choose conversation'))
        document.querySelector('#selectReceiver').classList.add("hidden");
    }
    
}

const main = async () => {
    await fetchUsers()
    //event listener for first select
    await document.querySelector('#inputGroupSelect01').addEventListener('change', (e) => {
        //clear messages
        while (document.querySelector('#displayMessages').firstChild) {
            document.querySelector('#displayMessages').removeChild(document.querySelector('#displayMessages').firstChild);
        }
        document.querySelector('#displayMessages').classList.add('hidden')
        const username = document.querySelector('#inputGroupSelect01').value
        fetchMessages(username)
        
    })

    
}

main()