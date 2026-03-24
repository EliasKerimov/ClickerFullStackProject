const BASE_URL = "http://localhost:8080/api/autoclickers"
const AUTO_CLICKER_FIELDS = ["id", "name", "title", "cost", "cps"]
const form = document.getElementById("auto-clicker-form")
const modalLabel = document.getElementById("auto-clicker-modal-label")
const newButton = document.getElementById("new-auto-clicker")
const tBody = document.getElementById("auto-clickers").tBodies[0]

newButton.addEventListener("click", () => {
    modalLabel.textContent = "New Auto-Clicker"
    AUTO_CLICKER_FIELDS.forEach(field => {
        form.querySelector(`input[name=${field}]`).value = ""
    })
})

form.addEventListener("submit" , e => {
    e.preventDefault()
    const id = form.querySelector("input[name=id]").value
    const name = form.querySelector("input[name=name]").value
    const title = form.querySelector("input[name=title]").value
    const cost = form.querySelector("input[name=cost]").value
    const cps = form.querySelector("input[name=cps]").value
    const promise = id === "" ? createAutoClicker(name, title, cost, cps) : updateAutoClicker(id, name, title, cost, cps)
    promise.then(async () => {
        bootstrap.Modal.getInstance(document.getElementById("auto-clicker-modal")).hide()
        await updateTable()
    }).catch(err => {console.log(err)})
})

async function createAutoClicker(name, title, cost, cps) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, title, cost, cps}),
    })
}

async function updateAutoClicker(id, name, title, cost, cps) {
    return fetch(BASE_URL + "/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, title, cost, cps})
    })
}

async function getAutoClickers() {
    return await fetch(BASE_URL).then(res => {return res.json()})
}

async function updateTable() {
    const clickers = await getAutoClickers();
    tBody.innerHTML = ""
    clickers.forEach(autoClicker => {
        tBody.appendChild(buildRow(autoClicker))
    })
}

function buildRow(autoClicker) {
    const tr = document.createElement("tr")

    AUTO_CLICKER_FIELDS.forEach(field => {
        const td = document.createElement("td")
        td.textContent = autoClicker[field]
        tr.appendChild(td)
    })
    const actionTd = document.createElement("td")
    actionTd.classList.add("d-flex", "gap-2")
    actionTd.appendChild(buildDeleteButton(autoClicker))
    actionTd.appendChild(buildEditButton(autoClicker))
    tr.appendChild(actionTd)
    return tr
}

function buildDeleteButton(autoClicker) {
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("btn", "btn-danger")
    deleteButton.textContent = "🗑"
    deleteButton.addEventListener("click", () => {
        if(confirm("Are you sure?")){
            deleteAutoClicker(autoClicker).then(updateTable)
        }
    })
    return deleteButton
}

function buildEditButton(autoClicker) {
    const editButton = document.createElement("button")
    editButton.classList.add("btn", "btn-warning")
    editButton.textContent = "✎"
    editButton.setAttribute("data-bs-toggle", "modal")
    editButton.setAttribute("data-bs-target", "#auto-clicker-modal")
    editButton.addEventListener("click", () => {
        fillForm(autoClicker)
    })
    return editButton
}

function fillForm(autoClicker) {
    modalLabel.textContent = "Edit Auto-Clicker"
    AUTO_CLICKER_FIELDS.forEach(field => {
        form.querySelector(`input[name=${field}]`).value = autoClicker[field]
    })
}

async function deleteAutoClicker(autoClicker) {
    return fetch(BASE_URL + "/autoclickers/" + autoClicker.id, {
        method: "DELETE",
    })
}


updateTable()