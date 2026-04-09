const BASE_URL = "http://localhost:8080/api/upgrades"
const UPGRADE_FIELDS = ["id", "name", "title", "cost", "cpsMulti", "clickMulti"]
const form = document.getElementById("upgrade-form")
const modalLabel = document.getElementById("upgrade-modal-label")
const newButton = document.getElementById("new-upgrade")
const tBody = document.getElementById("upgrades").tBodies[0]
const modal = document.getElementById("upgrade-modal")


async function getUpgrades() {
    return await fetch(BASE_URL).then(res => {
        return res.json()
    })
}

newButton.addEventListener("click", () => {
    modalLabel.textContent = "New Upgrade"
    UPGRADE_FIELDS.forEach(field => {
        form.querySelector(`input[name=${field}]`).value = ""
    })
})

modal.addEventListener("shown.bs.modal", () => {
    form.querySelector("input:not([type=hidden])").focus()
})

form.addEventListener("submit", e => {
    e.preventDefault()

    const id = form.querySelector("input[name=id]").value
    const name = form.querySelector("input[name=name]").value
    const title = form.querySelector("input[name=title]").value
    const cost = form.querySelector("input[name=cost]").value
    const cpsMulti = form.querySelector("input[name=cpsMulti]").value
    const clickMulti = form.querySelector("input[name=clickMulti]").value
    const newUpgrade = id === ""
    const promise = newUpgrade ? createUpgrade(name, title, cost, cpsMulti, clickMulti) : updateUpgrade(id, name, title, cost, cpsMulti, clickMulti)
    promise.then(async () => {
        bootstrap.Modal.getInstance(document.getElementById("upgrade-modal")).hide()
        await updateTable()

        showPrimaryToast(newUpgrade ? "Upgrade created" : "Upgrade updated")
        //await updateTable()
    }).catch(err =>
        showErrorToast(err.message))
    });

function trId(upgrade){
    return "upgrade" + upgrade.id
}

async function createUpgrade(name, title, cost, cpsMulti, clickMulti) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name,
            title,
            cost,
            cpsMulti,
            clickMulti
        }),
    })
    if (!res.ok) throw new Error("Could not create: " + (await res.json()).error)
}

async function updateUpgrade(id, name, title, cost, cpsMulti, clickMulti) {
    const res = await fetch(BASE_URL + "/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, title, cost, cpsMulti, clickMulti}),

    })
    if (!res.ok) throw new Error("Could not delete: " + (await res.json()).error)

}

async function deleteUpgrade(id) {
    const res = await fetch(BASE_URL + "/" + id, {
        method: "DELETE"
    })
    if (!res.ok) throw new Error("Could not delete: " + (await res.json()).error)

}


async function updateTable() {
    const upgrades = await getUpgrades()
    tBody.innerHTML = ""
    upgrades.forEach(upgrade => {
        tBody.appendChild(buildRow(upgrade))
    })
}


function buildRow(upgrade) {
    const tr = document.createElement("tr")
    tr.setAttribute("id", trId(upgrade))

    UPGRADE_FIELDS.forEach(field => {
        const td = document.createElement("td")
        td.textContent = upgrade[field]
        tr.appendChild(td)
    })

    const actionTd = document.createElement("td")
    const actionDiv = document.createElement("div")
    actionTd.appendChild(actionDiv)
    actionDiv.classList.add("d-flex", "gap-2")
    actionDiv.appendChild(buildDeleteButton(upgrade))
    actionDiv.appendChild(buildEditButton(upgrade))
    tr.appendChild(actionTd)
    return tr
}



function buildDeleteButton(upgrade) {
    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "🗑"
    deleteBtn.classList.add("btn", "btn-danger")
    deleteBtn.addEventListener("click", () => {
        // Skriv EventListener Her
        if (confirm("Are you sure?")) {
            deleteUpgrade(upgrade.id)
                .then(() => {
                    document.getElementById(trId(upgrade)).remove()
                    showPrimaryToast("Upgrade Deleted")
                })
                .catch(err => showErrorToast(err.message))
        }
    })
    return deleteBtn
}

function buildEditButton(upgrade) {
    const editBtn = document.createElement("button")

    editBtn.textContent = "✎"
    editBtn.classList.add("btn", "btn-warning")
    editBtn.setAttribute("data-bs-toggle", "modal")
    editBtn.setAttribute("data-bs-target", "#upgrade-modal")
    editBtn.addEventListener("click", () => {
        // Skriv EventListener Her
        fillForm(upgrade)


    })
    return editBtn
}

function fillForm(upgrade) {
    modalLabel.textContent = "Edit upgrade"
    UPGRADE_FIELDS.forEach(field => {
        form.querySelector(`input[name=${field}]`).value = upgrade[field];


    })

}

document.addEventListener("DOMContentLoaded", async () => {
    await updateTable()
})





