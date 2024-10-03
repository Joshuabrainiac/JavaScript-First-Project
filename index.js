
let currentImage;
let AllContacts = []
let singleContact = null
let formButtonText = "Add New Contact"


const form = document.querySelector('form')
const preview = document.querySelector('.preview')
const cancelbutton = document.querySelector('.cancelbutton')
const formButton = document.querySelector('.form-button')

formButton.innerHTML = formButtonText

function SubmitForm(event) {
    event.preventDefault()
    const email = event.target.email
    const username = event.target.username
    const color = event.target.color
    const image = event.target.image

    const errorTag = document.createElement('div')
    errorTag.style.color = "red"
    errorTag.style.fontSize = "0.8rem"

    if(singleContact === null) {
        if (image.value === "") {
            errorTag.innerHTML = "Image is required"
            event.target.children[1].appendChild(errorTag)
            return image.style.border = "1px solid red"
        }
        if (event.target.children[1]?.children[2]) {
            image.style.border = "1px solid lightgray"
            event.target.children[1].removeChild(event.target.children[1].children[2])
        }
    }
    if (username.value === "") {
        errorTag.innerHTML = "Username is required"
        event.target.children[2].appendChild(errorTag)
        return username.style.border = "1px solid red"
    }
    if (event.target.children[2]?.children[2]) {
        username.style.border = "1px solid lightgray"
        event.target.children[2].removeChild(event.target.children[2].children[2])
    }

    if (email.value === "") {
        errorTag.innerHTML = "Email address is required"
        event.target.children[3].appendChild(errorTag)
        return email.style.border = "1px solid red"
    }
    if (event.target.children[3].children[2]) {
        email.style.border = "1px solid lightgray"
        event.target.children[3].removeChild(event.target.children[3].children[2])
    }

    if (color.value === "") {
        errorTag.innerHTML = "Color is required"
        event.target.children[4].appendChild(errorTag)
        return color.style.border = "1px solid red"
    }
    if (event.target.children[4].children[2]) {
        color.style.border = "1px solid lightgray"
        event.target.children[4].removeChild(event.target.children[4].children[2])
    }

    const currentNumberOfContacts = AllContacts.length

    if (singleContact === null) {
        const newData = {
            id: currentNumberOfContacts + 1,
            image: currentImage,
            username: username.value,
            email: email.value,
            color: color.value,
        }
        AllContacts.unshift(newData)
    } else {
        // update data base on single contact and form
        const getSingleContact = AllContacts.map(function(item) {
            if(item.id === singleContact.id) {
                console.log(item, 'inside')
                return {
                    ...item,
                    username: username.value,
                    email: email.value,
                    color: color.value,
                }
            }
            return item
        })
        AllContacts = getSingleContact
        CancelUpdate()
    }
/*

CRUD
C = create
R = read
U = update
D = delete

*/
    
    SupplyHtml()

    username.value = ""
    image.value = ""
    email.value = ""
}
function UploadImage(event) {
    const file = event.target.files[0]
    currentImage = URL.createObjectURL(file)
}

// const AllContacts = [
//     {
//         image: "./images/img.jpg",
//         username: "Keneth doe",
//         email: "john@gmail.com",
//         color: "blue",
//     },
//     {
//         image: "./images/img.jpg",
//         username: "John doe",
//         email: "john@gmail.com",
//         color: "blue",
//     },
//     {
//         image: "./images/img.jpg",
//         username: "Grace doe",
//         email: "john@gmail.com",
//         color: "blue",
//     },
// ]

const container = document.querySelector('.container-body')

function SupplyHtml() {
    let output = ``
    if (AllContacts.length < 1) {
        container.innerHTML = `
        <div class="no-contact">No Contact saved yet.</div>
        `
    }
    else {
        AllContacts.forEach(function (item) {
            return output += `
        <div class="contact">
            <div class="contact-container">
                <img src="${item.image}" alt="">
                <div>
                    <div>(${item.id}) ${item.username}</div>
                    <div>${item.email}</div>
                    <div class="contact-box" style="background-color: ${item.color};"></div>
                </div>
            </div>
            <div>
                <div>
                    <button onclick="GetContact(${item.id})" class="contact-button updatebtn">update</button>
                </div>
                <div>
                    <button onclick="DeleteContact(${item.id})" class="contact-button deletebtn">delete</button>
                </div>
            </div>
        </div>
        `
        })
        container.innerHTML = output
    }

}

SupplyHtml()

function GetContact(id) {
    const findContact = AllContacts.find(function (item) {
        if (item.id === id) {
            return item
        }
    })
    singleContact = findContact
    const username = form.children[2].children[1]
    const email = form.children[3].children[1]
    const color = form.children[4].children[1]
    username.value = findContact.username
    email.value = findContact.email
    color.value = findContact.color
    preview.src = findContact.image
    preview.style.display = "block"
    cancelbutton.style.display = "block"
    formButton.innerHTML = "Update Contact"
    formButton.style.backgroundColor = "blue"
}

function DeleteContact(id) {
    const result = AllContacts.filter(function (item) {
        if (item.id !== id) {
            return item
        }
    })
    AllContacts = result
    SupplyHtml()
}

cancelbutton.addEventListener('click', CancelUpdate)


function CancelUpdate() {
    form.children[1].children[1].value = null //image = ""
    form.children[2].children[1].value = "" //username = ""
    form.children[3].children[1].value = "" // email = ""
    form.children[4].children[1].value = "#000000" // color = ""
    singleContact = null
    preview.style.display = "none"
    cancelbutton.style.display = "none"
    formButton.innerHTML = "Add New Contact"
    formButton.style.backgroundColor = "green"
}