


const dateChange = (date) => {
    date = date.replace("T", " ")
    date = date.slice(0, 16)
    return date
}

const div1_1 = `<div class="chat_list ">
                            <div class="chat_people">
                                <div class="chat_img"><img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"></div>
                                <div class="chat_ib">
                                    <h5>`
const div1_2 = '</h5></div></div></div>'

const sentMessage = (text, date) => {
    
        date = dateChange(date)
        return `<div class="outgoing_message"><div class="sent_message"><p>${text}</p>
            <span class="time_date"> ${date}</span></div></div>`;
           
}

const receivedMessage = (text, date) => {
    date = dateChange(date)

        return `<div class="incoming_message"><div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
            <div class="received_message">
            <div class="received_withd_message">
            <p>${text}</p><span class="time_date"> ${date}</span></div></div></div>`
   
}




const fetchFirstMessage = (name) => {
    document.querySelector('.inbox_chat').insertAdjacentHTML('beforeend', div1_1 + `${name}` + div1_2)
    document.querySelector('.inbox_chat .chat_list h5').classList.add("active_chat")
    fetch('http://localhost:51696/api/message')
        .then(response => response.json())
        .then(data => {
            msgHistory = document.querySelector('.message_history');
            //clean history
            while (msgHistory.firstChild) {
                msgHistory.removeChild(msgHistory.firstChild);
            }
            let userName = document.querySelector('.inbox_chat .chat_list h5').textContent
            currentReceiver = userName
            //display messages
            data.forEach((item) => {
                if (userIdentity.toUpperCase() === item.SenderUsername.toUpperCase() && userName.toUpperCase() === item.ReceiverUsername.toUpperCase()) {
                    document.querySelector('.message_history').insertAdjacentHTML('beforeend', sentMessage(item.Data, item.Date))
                } else if (userName.toUpperCase() === item.SenderUsername.toUpperCase() && userIdentity.toUpperCase() === item.ReceiverUsername.toUpperCase()) {
                    document.querySelector('.message_history').insertAdjacentHTML('beforeend', receivedMessage(item.Data, item.Date))
                }
            })
            msgHistory.scrollTop = msgHistory.scrollHeight;


        })
}

let currentReceiver;

const fetchUsers = () => {
    let userList = []
    fetch('http://localhost:51696/api/user')
        .then(response => response.json())
        .then(data => {
            data.forEach(function (username) {
                userList.push(username)
            })
            
            while (document.querySelector('#popup').firstChild) {
                document.querySelector('#popup').removeChild(document.querySelector('#popup').firstChild);
            }
            document.querySelector('#popup').insertAdjacentHTML('beforeend', `<h5>Add User</h5>`)
            document.querySelector('#popup').insertAdjacentHTML('beforeend', `<button> X </button>`)
            //event listener to close popup
            document.querySelector('#popup button').addEventListener('click', () => {
                document.querySelector('#popup').style.display = 'none';
            })
            //Retreiving users
            userList.forEach((el) => {
                
                document.querySelector('#popup').insertAdjacentHTML('beforeend', `<p>${el}</p>`)
            })
            let paragraphList = document.querySelectorAll('#popup p')
            paragraphList.forEach((el) => {
                el.addEventListener('click', (e) => {
                    fetchMessage(el.innerHTML)
                    document.querySelector('#popup').style.display = 'none';
                })
            })
        })
        
}

let displayMessages = () => {
   
    let userClick = document.querySelectorAll('.inbox_chat .chat_list h5') ;

            userClick.forEach(function (element) {
                element.addEventListener('click', function (e) {
                    //remove active class from all elements
                    userClick.forEach(function (element) {
                        element.classList.remove("active_chat")
                    });
                    //add active class to clicked element
                    e.target.classList.add("active_chat");
                    fetch('http://localhost:51696/api/message')
                        .then(response => response.json())
                        .then(data => {
                            msgHistory = document.querySelector('.message_history');
                            //clean history
                            while (msgHistory.firstChild) {
                                msgHistory.removeChild(msgHistory.firstChild);
                            }
                            let userName = e.target.textContent
                            currentReceiver = userName
                            //display messages
                            data.forEach((item) => {
                                if (userIdentity.toUpperCase() === item.SenderUsername.toUpperCase() && userName.toUpperCase() === item.ReceiverUsername.toUpperCase()) {
                                    document.querySelector('.message_history').insertAdjacentHTML('beforeend', sentMessage(item.Data, item.Date))
                                } else if (userName.toUpperCase() === item.SenderUsername.toUpperCase() && userIdentity.toUpperCase() === item.ReceiverUsername.toUpperCase()) {
                                    document.querySelector('.message_history').insertAdjacentHTML('beforeend', receivedMessage(item.Data, item.Date))
                                }
                            })
                            msgHistory.scrollTop = msgHistory.scrollHeight;
                            
                        })

                    

                })
            })
        
    
}




const fetchMessage = (text) => {
    //let userReturn
    let userList = []
    fetch('http://localhost:51696/api/message')
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            userIdentity = document.querySelector('h3').textContent
            data.forEach(function (el) {
                if (el.SenderUsername.toUpperCase() != userIdentity.toUpperCase()) {
                    userList.push(el.SenderUsername)
                }
                if (el.ReceiverUsername.toUpperCase() != userIdentity.toUpperCase()) {
                    userList.push(el.ReceiverUsername)
                }
            })
            const dinstictUsers = userList.filter(function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            })
            //clean user history
            while (document.querySelector('.inbox_chat').firstChild) {
                document.querySelector('.inbox_chat').removeChild(document.querySelector('.inbox_chat').firstChild);
            }
            //display sidebar
            if (text) {
                fetchFirstMessage(text)
            }
            dinstictUsers.forEach((item, index) => {
                if (index === 0 && !text) {
                    fetchFirstMessage(item)
                    
                } else {
                    document.querySelector('.inbox_chat').insertAdjacentHTML('beforeend', div1_1 + `${item}` + div1_2)

                }
                
            })
            if (document.querySelector('.active_chat').innerHTML != null) {
                document.querySelector('#downloadButton').style.display = "inline-block"
            }
            // ##########################################3
            displayMessages()
    
    })
}
//run fetchMessages
fetchMessage()
 

// button for send message
let submitMessage = document.querySelector('.message_send_btn')
submitMessage.addEventListener('click', function (e) {
    e.preventDefault();
    let contacts = document.querySelectorAll('.inbox_chat .chat_list h5')
    if (contacts.length === 0) {
        alert('Please add a user first')
    } else {
        let MessageVM = {
            data: document.querySelector('.write_message').value,
            ReceiverUsername: currentReceiver
        }
        fetch('http://localhost:51696/Home/SendMessage', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(MessageVM)
        })
        document.querySelector('.message_history').insertAdjacentHTML('beforeend', sentMessage(MessageVM.data, new Date().toISOString().slice(0, 10)))

        document.querySelector('.write_message').value = ' ';
    }
    
    
})

//addUser button
document.querySelector('#addUserButton').addEventListener('click', function (e) {
    document.querySelector('#popup').style.display = 'block';
    
    
    fetchUsers()
})
//Code for Download messages
//*********************
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


const downLoadMessages = (name) => {
    let text = ''
    let username = document.querySelector('h3').innerHTML
    fetch('http://localhost:51696/api/message')
        .then(response => response.json())
        .then(data => {
            data.forEach((el) => {
                const date = dateChange(el.Date);
                if (el.SenderUsername.toUpperCase() === username.toUpperCase() && el.ReceiverUsername.toUpperCase() === name.toUpperCase()) {
                    text = text + `${date}\r\n${el.Data}\r\n\r\n`
                } else if (el.SenderUsername.toUpperCase() === name.toUpperCase() && el.ReceiverUsername.toUpperCase() === username.toUpperCase()) {
                    text = text + `${date}\r\n${el.SenderUsername}: ${el.Data}\r\n\r\n`
                }
            })
            
            download(`${name}.txt`, `${text}`)
        })
}
    //event listener for download button
document.querySelector('#downloadButton').addEventListener('click', () => {
    downLoadMessages(document.querySelector('.active_chat').innerHTML)

    
})


