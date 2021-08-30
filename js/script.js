
let btn=document.getElementById("addBtn");
let note;

let card_data=document.querySelector("p.card-text");
console.log(card_data)

btn.addEventListener("click",function(){
    note=document.getElementById("addTxt").value;
    console.log(note)

    card_data.innerText=note;
})


