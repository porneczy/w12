const parseJSON = async (url) => {
    const response = await fetch(url)
    return response.json()
}

//kapcsoszárojel, egy objectumból kivonjuk a kulcsokat  (object destructuring)
const userComponent = ({name, surname}) => {
    return `
    <div>
        <h1>${name}</h1>
        <h2>${surname}</h2>
    </div>
    `
}
//komponenseket függvényként irjukj
function addUserComponent() {
    return `
        <div>
            <input type="text" class="firstName" name="firstname" placeholder="First name">
            <input type="text" class="surname" name="surname" placeholder="Surname">
            <button>Send</button>
        </div>
    `
}

const loadEvent = async () => {
    if (window.location.pathname === "/admin/order-view") {
        console.log("ez az admin felület");
    }else{
        console.log("vásárlói felület");
    }

    const rootElement = document.getElementById("root");
    const result = await parseJSON("/api/v1/users")
    
    rootElement.insertAdjacentHTML(
        'beforeend',
        result.map(user => userComponent(user)).join("")
    )
    rootElement.insertAdjacentHTML(
        'afterend',
        addUserComponent()
    )
    const button = document.querySelector('button');
    const firstName = document.querySelector('.firstName')
    const surname = document.querySelector('.surname')

    button.addEventListener('click', event => {
        
        const userData = { 
            name: firstName.value,
            surname: surname.value,
        };

        fetch('/users/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        })
        .then(async data =>{
            const user = await data.json()
            rootElement.insertAdjacentHTML("beforeend", userComponent(user))
        })
    });
}
window.addEventListener("load", loadEvent);