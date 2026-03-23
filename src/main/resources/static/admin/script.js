const BASE_URL = "http://localhost:8080/api"
const newAutoClickerForm = document.getElementById("new-auto-clicker")
const autoClickersTBody = document.getElementById("auto-clickers").tBodies[0]

newAutoClickerForm.addEventListener("submit" , e => {
    e.preventDefault()
    const form = e.target
    const name = form.querySelector("input[name=name]").value
    const title = form.querySelector("input[name=title]").value
    const cost = form.querySelector("input[name=cost]").value
    const cps = form.querySelector("input[name=cps]").value
    fetch(BASE_URL + "/autoclickers", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, title, cost, cps}),
    }).then(() => {
        bootstrap.Modal.getInstance(document.getElementById("new-auto-clicker-modal")).hide()
        updateAutoClickers()
    })
})

async function getAutoClickers() {
    return await fetch(BASE_URL + "/autoclickers").then(res => {return res.json()})
}

async function updateAutoClickers() {
    const clickers = await getAutoClickers();
    autoClickersTBody.innerHTML = ""
    clickers.forEach(autoClicker => {
        autoClickersTBody.appendChild(buildAutoClickerRow(autoClicker))
    })
}

function buildAutoClickerRow(autoClicker) {
    const tr = document.createElement("tr")
    const fields = ["id", "name", "title", "cost", "cps"]

    fields.forEach(field => {
        const td = document.createElement("td")
        td.textContent = autoClicker[field]
        tr.appendChild(td)
    })
    const actionTd = document.createElement("td")
    const deleteButton = document.createElement("button")
    deleteButton.classList.add("btn", "btn-danger")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", () => {
        deleteAutoClicker(autoClicker).then(updateAutoClickers)
    })
    actionTd.appendChild(deleteButton)
    tr.appendChild(actionTd)
    return tr
}

async function deleteAutoClicker(autoClicker) {
    fetch(BASE_URL + "/autoclickers/" + autoClicker.id, {
        method: "DELETE",
    })
}


updateAutoClickers()