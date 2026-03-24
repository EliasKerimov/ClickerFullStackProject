const BASE_URL = "http://localhost:8080/api/upgrades"

async function getUpgrades() {
    return await fetch(BASE_URL).then(res => {
        return res.json()
    })
}

form.addEventListener("submit", e =>  {
    e.preventDefault()

    const name =  form.querySelector("input[name=name]")
    const title =  form.querySelector("input[name=title]")
    const cost =  form.querySelector("input[name=cost]")
    const cps =  form.querySelector("input[name=cps]")



})