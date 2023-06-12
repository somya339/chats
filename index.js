var acitveUser = "", sender = "", imageUrl = "";
const send = document.getElementById("send")
send.addEventListener("click", e => {
    // e.preventDefault();
    let text = document.getElementById("text");
    if (text.value !== "") {
        let newMessage = document.createElement("div");
        newMessage.innerHTML = `<div class="message">${text.value}</div>`
        const chatBox = document.getElementById("chat-section");
        if (chatBox.lastElementChild && !chatBox.lastElementChild.classList.contains("right")) {
            newMessage.classList.add("right");
            sender = acitveUser;
        }
        else {
            sender = "you";
        }
        chatBox.appendChild(newMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
        saveMessage(text.value);
        text.value = ""
    }
})
window.addEventListener("keypress", e => {
    if (e.key == 'Enter') {
        let text = document.getElementById("text");
        if (text.value !== "") {
            let newMessage = document.createElement("div");
            newMessage.innerHTML = `<div class="message">${text.value}</div>`
            const chatBox = document.getElementById("chat-section");
            if (chatBox.lastElementChild && !chatBox.lastElementChild.classList.contains("right")) {
                newMessage.classList.add("right");
                sender = acitveUser;
            }
            else {
                sender = "you";
            }
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            saveMessage(text.value);
            text.value = ""
        }
    }
})

// localstorage chat persistence

const insertMessage = (text, sender) => {
    let newMessage = document.createElement("div");
    if(text.indexOf("https:")!= -1){
        newMessage.innerHTML = `<img class="message" src="${text}"/>`
    }
    else{
        newMessage.innerHTML = `<div class="message">${text}</div>`
    }
    const chatBox = document.getElementById("chat-section");
    if (sender !== "you") {
        newMessage.classList.add("right");
    }
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
}

const loadChats = () => {
    let jsonData = localStorage.getItem(acitveUser);
    let data = JSON.parse(jsonData);
    console.log(data);
    data.chats.forEach(e => {
        insertMessage(e.message, e.sender)
    })
}


const saveMessage = (text) => {
    let jsonData = localStorage.getItem(`${acitveUser}`);
    let chatObject = JSON.parse(jsonData);
    let message = { sender: sender, message: text };
    chatObject.chats.push(message)
    localStorage.setItem(`${acitveUser}`, JSON.stringify(chatObject));
}

// load users from localstorage

const saveUserBtn = document.getElementById("save-user");
saveUserBtn.addEventListener("click", e => {
    const name = document.getElementById("user-name").value;

    if (localStorage.getItem(name) === null) {
        localStorage.setItem(name.toLocaleLowerCase(), JSON.stringify({ chats: [] }));
        window.location.reload();
    }
    else {
        alert("User with the same name already exist.")
        //     const lable = document.createElement("div");
        //     let toastMessage = `
        //     <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        //     <div class="toast-header">
        //       <small class="text-muted">just now</small>
        //       <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        //         <span aria-hidden="true">&times;</span>
        //       </button>
        //     </div>
        //     <div class="toast-body">
        //       User with the same name already exist.
        //     </div>
        //   </div>`
        //     lable.innerHTML = toastMessage;
        //     document.querySelector("body").appendChild(lable);
        //     toastMessage.toast("show");
    }
})

const loadUsers = () => {
    for (let i = 0; i < localStorage.length; i++) {
        // console.log(i);
        const newChatUser = document.createElement("div");
        newChatUser.innerHTML = `
        <div class="chat">
            <img src="user_icon_149329.png" class="user-icon u3">
            <div class="user-details">
                <h4>${localStorage.key(i)}</h4>
                <h6>offline</h6>
            </div>
        </div>`
        document.getElementById("users").append(newChatUser);
    }
}
loadUsers();


// activate user chat

var users = document.querySelectorAll(".chat");
users.forEach(e => {
    e.addEventListener("click", event => {
        users.forEach(e => e.style.background = "#f5e4ff")
        e.style.background = "#c9ace4"
        document.getElementById("chat-name").textContent = e.lastElementChild.firstElementChild.textContent;
        acitveUser = e.lastElementChild.firstElementChild.textContent.toLocaleLowerCase();
        document.getElementById("chat-window").classList.remove("hidden")
        document.getElementById("prechatbox").classList.add("hidden");
        const chatBox = document.getElementById("chat-section");
        chatBox.innerHTML = ""
        loadChats();
    })
})

// send and save file

const fileUpload = document.getElementById("fileUpload");
var myWidget = cloudinary.createUploadWidget({
    cloudName: "dl4wtrjgb",
    uploadPreset: "plp23m7h"
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Image uploaded successfully:', result.info.secure_url);
        imageUrl = result.info.secure_url
        saveFile();
        // Do something with the uploaded image URL, such as displaying it on the page
    } else {
        console.log('Error uploading image:', error);
    }
});
fileUpload.addEventListener("click", e => {
    myWidget.open();
})

const sendFile = document.getElementById("sendFile");
const saveFile =  () => {
    let newMessage = document.createElement("div");
    newMessage.innerHTML = `<img src="${imageUrl}" class="message message-img"></img>`
    const chatBox = document.getElementById("chat-section");
    if (chatBox.lastElementChild && !chatBox.lastElementChild.classList.contains("right")) {
        newMessage.classList.add("right");
        sender = acitveUser;
    }
    else {
        sender = "you";
    }
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    const jsonData = localStorage.getItem(acitveUser);
    const data = JSON.parse(jsonData);
    data.chats.push({
        sender : sender,
        message : imageUrl
    })
    localStorage.setItem(acitveUser , JSON.stringify(data))
}


// open and close sidebar
const revealSideBar = () => {
    // console.log("hello");
    document.getElementById("sidebar").style.transform = "translateX(0)"
}

window.addEventListener("resize", () => {
    if (window.innerWidth <= 888) {
        document.getElementById("bars").classList.remove("squeez")
        document.getElementById("close-sidebar").classList.remove("squeez")
        document.getElementById("sidebar").style.transform = "translateX(0px)"
    }
    else {
        document.getElementById("bars").classList.add("squeez")
        document.getElementById("close-sidebar").classList.add("squeez")
        if (acitveUser === "") {
            document.getElementById("sidebar").style.transform = "translateX(0px)"
        }
    }
})

const hideSideBar = () => {
    // console.log("hello");
    document.getElementById("sidebar").style.transform = "translateX(-200px)"
}