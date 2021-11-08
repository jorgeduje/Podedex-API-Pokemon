"use strict"

//
function resetHeight(){
    document.body.style.height = window.innerHeight + 'px'
}
window.addEventListener('resize', resetHeight)
const mobileQuery = window.matchMedia('(max-width: 767px)')
if (mobileQuery.matches) resetHeight()

//
let idPkmn = 1

function traerInfo() {
    const url = `https://pokeapi.co/api/v2/pokemon/${ idPkmn }`
    fetch( url )
    .then( response => response.json() )
    .then( obj => showPkmn( obj ) )
    .catch( err => console.log(err) )
}

//
const colors = {
    bug : '#a8b820',
    dark : '#705848',
    dragon : '#7038f8',
    electric : '#f8d030',
    fairy : '#ee99ac',
    fighting : '#c03028',
    fire : '#f08030',
    flying : '#a890f0',
    ghost : '#705898',
    grass : '#78c850',
    ground : '#e0c068',
    ice : '#98d8d8',
    normal : '#a8a878',
    poison : '#a040a0',
    psychic : '#f85888',
    rock : '#b8a038',
    steel : '#b8b8d0',
    water : '#6890f0',
}
//
const prevPkImg = document.querySelector('#prevPkImg')
const imgPkm = document.querySelector('#pkImg')
const nextPkImg = document.querySelector('#nextPkImg')
prevPkImg.addEventListener('click', e => previousPkmn(e))
nextPkImg.addEventListener('click', e => nextPkmn(e) )
//
const namePkmn = document.querySelector('#pkName')
const typePkmn = document.querySelector('#pkType')
const abilitiesPkmn = document.querySelector('#pkAbilities')
//Stats
const statsContainer = document.querySelector('#pkStatsContainer')
//const displayStat = document.querySelector('.displayStat')
//const pkStats_Value = document.querySelector('.stat-value')
//const valueBar = document.querySelector('.valueBar')


const prevPk = document.getElementById('previous')
const nextPk = document.getElementById('next')
prevPk.addEventListener('click', e => previousPkmn(e))
nextPk.addEventListener('click', e => nextPkmn(e))
window.addEventListener('keydown', (e) => {
    //console.log(`key=${e.key},code=${e.code}`)
    if (e.key === 'ArrowLeft') previousPkmn(e)
    if (e.key === 'ArrowRight') nextPkmn(e)
})

function showPkmn (infoPkmn) {
    //console.log(infoPkmn)
    image(infoPkmn)
    
    //console.log(infoPkmn.id)
    namePkmn.textContent = infoPkmn.name

    typeOfPkmn(infoPkmn)
    
    stats(infoPkmn)
    
    ability(infoPkmn)
}

function image (el) {
    const urlImg = el.sprites.other["official-artwork"].front_default
    imgPkm.setAttribute('src', urlImg)
    imgPkm.setAttribute('alt', `${el.name}-image`)

    prevPkImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPkmn === 1 ? 898 : idPkmn - 1}.png`)
    nextPkImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPkmn === 898 ? 1 : idPkmn + 1}.png`)
}

function typeOfPkmn (el) {
    typePkmn.innerHTML = ``

    const frag = document.createDocumentFragment()

    let preTypeOfPkmn = el.types
    preTypeOfPkmn.forEach(element => {
       
        const typeSpan = document.createElement('span')
        typeSpan.textContent = element.type.name
        
       
        typeSpan.style.backgroundColor = `${colors[element.type.name]}`
        frag.append(typeSpan)
    })

    typePkmn.append(frag)
}

function stats (el) {
    statsContainer.innerHTML = ``
    const frag = document.createDocumentFragment()

    let stats = el.stats
    stats.forEach(element => {
      
        let percent = (element.base_stat * 100) / 255

        let displayStat = document.createElement('div')
        displayStat.classList.add('displayStat')
        
        displayStat.innerHTML = `
        <div class="displayStat">
            <div class="stat-value">
                <span>${element.stat.name}</span>
                <span>${element.base_stat}</span>
            </div>

            <div class="progressbar">
                <div class="valueBar" style="width:${percent}%;"></div>
            </div>
        </div>
        `
        frag.appendChild(displayStat)
    })
    statsContainer.appendChild(frag)
}

function ability (el) {
    abilitiesPkmn.innerHTML = ``

    const frag = document.createDocumentFragment()

    let abilities = el.abilities
    abilities.forEach(element => {
        //console.log(element.ability.name)
        const abilitySpan = document.createElement('span')
        abilitySpan.textContent = element.ability.name
        frag.append(abilitySpan)
    })

    abilitiesPkmn.append(frag)
}



function previousPkmn (event) {
    idPkmn = idPkmn === 1 ? 898 : idPkmn - 1
    traerInfo()
    event.stopPropagation()
}

function nextPkmn (event) {
    idPkmn = idPkmn === 898 ? 1 : idPkmn + 1
    traerInfo()
    event.stopPropagation()
}
//Event Listeners
window.addEventListener('DOMContentLoaded', e => {
    traerInfo()
})
