const token = import.meta.env.VITE_KEY
const champ = document.getElementById("champ")
const form = document.getElementById("Form")
const ErrorSpan = document.getElementById("error")
const containerBoite = document.getElementById("containerBoite")
const selected = []

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${champ.value}&appid=${token}`)
    const res = await req.json()
    console.log(res);

    if (res.cod === "404" || res.cod === "400") {
        ErrorSpan.innerText = "Please search for a valid city 😩"
        ErrorSpan.style.display = "block"
    }
    else {

        if (/*selected.find(el => el === res.name)*/false) {
            ErrorSpan.innerText = "Please search for a uniq city 😩"
            ErrorSpan.style.display = "block"
        }
        else {
            selected.push(res.name)
            ErrorSpan.style.display = "none"
            const div = document.createElement("div")
            const p = document.createElement("p")
            const langue = document.createElement("sup")
            const deg = document.createElement("p")
            const cel = document.createElement("sup")
            const ImgUrl = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`
            const img = document.createElement('img')
            const desc = document.createElement("p")
            const ImgIconTrash = document.createElement("img")

            ImgIconTrash.setAttribute("src", "./")
            desc.classList.add("descBoite")
            desc.innerText = res.weather[0].description
            img.classList.add("ImgWeather")
            img.setAttribute("src", ImgUrl)
            cel.innerText = "°C"
            deg.classList.add("degBoite")
            deg.innerText = parseInt(res.wind.deg / 10)
            langue.innerText = res.sys.country
            langue.classList.add("langueBoite")
            p.innerText = res.name
            p.classList.add("pboite")
            div.classList.add("boite")

            deg.appendChild(cel)
            div.appendChild(p)
            div.appendChild(deg)
            p.appendChild(langue)
            div.appendChild(img)
            div.appendChild(desc)
            containerBoite.appendChild(div)

        }
    }

})