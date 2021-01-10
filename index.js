const form = document.querySelector('.add-container')
const select = document.querySelector('.add-type')
const description = document.querySelector('.add-description')
const message = document.querySelector('.msg')
const addValue = document.querySelector('.add-value')
const budzetPrihodValue = document.querySelector('.budzet-prihod-value')
const budzetRashodValue = document.querySelector('.budzet-rashod-value')
const ukupno = document.querySelector('.budzet-value')
const procenat = document.querySelector('.budzet-rashod-procenat')
const listaPrihodi = document.querySelector('.lista-prihodi')
const listaRashodi = document.querySelector('.lista-rashodi')
const resetBtn = document.querySelector('.btn-reset')


let budzet = localStorage.getItem('budzet')?(JSON.parse(localStorage.getItem('budzet'))): ({
    prihodi:0,
    rashodi:0,                   
})                              
let lista = localStorage.getItem('lista')?(JSON.parse(localStorage.getItem('lista'))): ({
    prihodi:[],
    rashodi:[]                                
})

budzetPrihodValue.innerHTML =`+ ${budzet.prihodi}` 
budzetRashodValue.innerHTML =`- ${budzet.rashodi}` 
ukupno.innerHTML = budzet.prihodi - budzet.rashodi
if(budzet.rashodi < budzet.prihodi){
    procenat.innerHTML =`${String(Math.floor (budzet.rashodi / budzet.prihodi * 100))} %`
}
lista.prihodi.forEach(item=>{
    let li = document.createElement('div')
    li.className = `item clearfix`
    li.innerHTML = `
    <div class="item-description">${item.opis}</div>
    <div class="right clearfix">
        <div class="item-value">${item.vrednost}</div>
        <div class="item-delete">
            <button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button>
        </div>
    </div>`
        
    listaPrihodi.appendChild(li)
})
lista.rashodi.forEach(item=>{
    let li = document.createElement('div')
    li.className = `item clearfix`
    li.innerHTML = `
    <div class="item-description">${item.opis}</div>
    <div class="right clearfix">
        <div class="item-value">${item.vrednost}</div>
        <div class="item-percentage">${item.vrednost<budzet.prihodi ?  (Math.floor(item.vrednost/budzet.prihodi*100)+"%"):('')}</div>
        <div class="item-delete">
            <button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button>
        </div>
    </div>`
    
    listaRashodi.appendChild(li)
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(description.value.trim() != ''){ 
        if(addValue.value>0){
            message.innerHTML=''       //greske koje se ispisuju na ekranu
            if(select.value == 'pri'){
                budzet = {...budzet,prihodi:budzet.prihodi + Number(addValue.value)}  //pravim kopiju stejta(budzeta) i dodaje novu vrednost!!!
                budzetPrihodValue.innerHTML =`+ ${budzet.prihodi}` 
                lista = {...lista,prihodi:[...lista.prihodi,{opis:description.value,vrednost:addValue.value}]}
                listaPrihodi.innerHTML=''
                lista.prihodi.forEach(item=>{    
                    let li = document.createElement('div')
                    li.className = `item clearfix`
                    li.innerHTML = `
                        <div class="item-description">${item.opis}</div>
                        <div class="right clearfix">
                            <div class="item-value">${item.vrednost}</div>
                            <div class="item-delete">
                                 <button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                        </div>`
                    listaPrihodi.appendChild(li)
                })
            }
        
            else{
                budzet = {...budzet,rashodi:budzet.rashodi + Number(addValue.value)}   
                budzetRashodValue.innerHTML =`- ${budzet.rashodi}` 
                lista = {...lista,rashodi:[...lista.rashodi,{opis:description.value,vrednost:addValue.value}]}
                listaRashodi.innerHTML=''
                lista.rashodi.forEach(item=>{
                    let li = document.createElement('div')
                    li.className = `item clearfix`
                    li.innerHTML = `
                          <div class="item-description">${item.opis}</div>
                          <div class="right clearfix">
                              <div class="item-value">${item.vrednost}</div>
                              <div class="item-percentage">${item.vrednost<budzet.prihodi ?  (Math.floor(item.vrednost/budzet.prihodi*100)+"%"):('')}</div>
                              <div class="item-delete">
                                <button class="item-delete-btn"><i class="ion-ios-close-outline"></i></button>
                              </div>
                          </div>`
                    listaRashodi.appendChild(li)
                })
            }
            ukupno.innerHTML = budzet.prihodi - budzet.rashodi
            if(budzet.rashodi<budzet.prihodi){
                procenat.innerHTML =`${String(Math.floor (budzet.rashodi/budzet.prihodi*100))} %` 
            }
            else{
                procenat.innerHTML=''
            }
            description.value=''
            addValue.value=null
        }
        else{
            message.innerHTML='Vrednost mora biti veca od nule'  
        }
    }
    else{
        message.innerHTML='Polje opis mora biti popunjeno'
    }
    
    let budzetToJson = JSON.stringify(budzet) 
    localStorage.setItem('budzet',budzetToJson)
    let listaToJson = JSON.stringify(lista)
    localStorage.setItem('lista',listaToJson)
})

resetBtn.addEventListener('click',()=>{
    localStorage.removeItem('budzet')
    localStorage.removeItem('lista')
    budzet={
        prihodi:0,
        rashodi:0,
    }
    lista = {
        prihodi:[],
        rashodi:[]
    }
    budzetPrihodValue.innerHTML =''
    budzetRashodValue.innerHTML =''
    listaPrihodi.innerHTML=''
    listaRashodi.innerHTML=''
    ukupno.innerHTML=''
    procenat.innerHTML=''
})
