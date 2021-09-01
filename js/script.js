// #branch advanced to do advanced-1 changes


shownotes();//to show notes in the notes card section immediately after the reload.                     

//if user adds a add, add it to the local storage

//if press the button then get item from storage if it returns null then make empty array otherwise if it has elements then fetch it and push the input elements to it and again add to the storage.
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let noteObj;
    let addTxt = document.getElementById('addTxt')
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    noteObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";//to remove the textbox text immdiatedly after adding note
    // console.log(noteObj)

    shownotes();
})

function shownotes() {
    /** This is  use to show/display the notes in the the container from local storage. */    
    let noteObj;
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }

    let html = "";
    noteObj.forEach(function (element, index) {
        html += `<div class="card mx-1 dynamicCard" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Notes${index+1}</h5>
          <p class="card-text">${element}</p>
          <button id=${index} onclick=deleteNote(this.id) class="btn btn-primary">Delete Note</a>
        </div> 
      </div>` //here we heave written onclick  to use the deletNote function the id will be automatically set. The id will be  its index. The parameter passed in the deleteNote is the  id of the note which is actually its index.
    });
    let noteElem = document.getElementById("notesCard");
    if (noteObj.length!=0){
        noteElem.innerHTML = html;
    }
    else{
        //If no notes present
        noteElem.innerHTML="<h1>No Note present</h1>"
    }
};

function deleteNote(index){
    /** Function to delete a note */
    // console.log(`Deleting note of index of ${index}`);
    
    // We will delete the note by deleting the note data form local storage.

    // So to do this we first make changes in notesObj then againg uploading to the localStorage.

    let noteObj;
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    
    // console.log(noteObj);
    
    noteObj.splice(index,1)//deleting  1 elemnt from the specified index

    // console.log(noteObj);

    localStorage.setItem("notes",JSON.stringify(noteObj));
    shownotes();
}

// Making filter for search bar.
let search=document.getElementById("searchTxt");

search.addEventListener("input",function(){
    
    let inputVal=search.value;
    console.log("input event fired",inputVal);

    let notecards=document.getElementsByClassName("dynamicCard");

    // console.log(notecards);

    Array.from(notecards).forEach(function(element){
        // console.log(element);
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(search.value)){
            // console.log(cardTxt);
            element.style.display="block";
        }
        else{
            element.style.display="None";
        }
    });

})
