// #branch object.Now to add title we will use array of objects. And for important notes we have used checkbox


shownotes();//to show notes in the notes card section immediately after the reload.                     

//if user adds a add, add it to the local storage

//if press the button then get item from storage if it returns null then make empty array otherwise if it has elements then fetch it and push the input elements to it and again add to the storage.
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    // console.log(document.getElementById("imp_note").checked);
    let noteObj;
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let imp_note = document.getElementById('imp_note');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        noteObj = [];
    }
    else {
        noteObj = JSON.parse(notes);
    }
    let myobj = {
        title: addTitle.value,
        text: addTxt.value,
        check: imp_note.checked
    }
    noteObj.push(myobj);//everytime an array of object will be created
    localStorage.setItem("notes", JSON.stringify(noteObj));
    addTxt.value = "";//to remove the textbox text immdiatedly after adding note
    addTitle.value = "";
    imp_note.checked = false;
    // console.log(noteObj)

    shownotes();
})

function color(cond) {
    /** This is use to change color if cond is true */
    if (cond == true) {
        return "#ffb1b1";
    }
    else {
        return "white";
    }
}


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
        html += `<div class="card mx-1 my-1 dynamicCard" style="width: 18rem;background:${color(element.check)};">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id=${index} onclick=deleteNote(this.id) class="btn btn-primary">Delete Note</a>
        </div> 
      </div>` //here we heave written onclick  to use the deletNote function the id will be automatically set. The id will be  its index. The parameter passed in the deleteNote is the  id of the note which is actually its index.
    });
    let noteElem = document.getElementById("notesCard");
    if (noteObj.length != 0) {
        noteElem.innerHTML = html;
    }
    else {
        //If no notes present
        noteElem.innerHTML = "<h3>No Note present</h3>"
    }

    let check_mode = document.getElementById("darkmode");
    let mode = check_mode.innerHTML;

    if (mode == "Light") {
        let card_color = document.querySelectorAll(".dynamicCard");
        card_color.forEach(function (element) {
            card_color.forEach(function (element) {
                if (element.style.background == "white") {
                    element.classList.add("bg-dark", "text-white");
                }
            })
        })
    }

};

function deleteNote(index) {
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

    noteObj.splice(index, 1)//deleting  1 elemnt from the specified index

    // console.log(noteObj);

    localStorage.setItem("notes", JSON.stringify(noteObj));
    shownotes();
}

// Making filter for search bar.
let search = document.getElementById("searchTxt");

search.addEventListener("input", function () {

    let inputVal = search.value;
    console.log("input event fired", inputVal);

    let notecards = document.getElementsByClassName("dynamicCard");

    // console.log(notecards);

    Array.from(notecards).forEach(function (element) {
        // console.log(element);
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(search.value)) {
            // console.log(cardTxt);
            element.style.display = "block";
        }
        else {
            element.style.display = "None";
        }
    });

})


// Making darkmode
let darkBtn = document.getElementById("darkmode");
darkBtn.addEventListener("click", function () {
    let dark_check = document.getElementById("darkmode").innerHTML;
    if (dark_check == "Dark") {
        toggle_color("black", "white")
        color_list = ["#f44336", "#009688", "#3f51b5", "#00bcd4", "#ffeb3b", "#03a9f4"]
        let card_color = document.querySelectorAll(".dynamicCard");
        card_color.forEach(function (element) {
            // element.style="border:4px solid #009688;width:18rem"
            card_color.forEach(function (element) {
                if (element.style.background == "white") {
                    element.classList.add("bg-dark", "text-white");//adding bootstrap class to change the style without modifing the whole content;
                }
            })
        })

        let dark_text = document.getElementById("darkmode");
        dark_text.innerHTML = "Light";

    }
    else {
        // to switch normal white theme
        toggle_color("white", "black");
        let dark_text = document.getElementById("darkmode");
        dark_text.innerHTML = "Dark";
        let card_color = document.querySelectorAll(".dynamicCard");
        card_color.forEach(function (element) {
            if (element.style.background != "red") {
                element.classList.remove("bg-dark", "text-white");
            }
        })

    }


})

function toggle_color(bg, headings) {
    /** to toggle between dark and light theme */
    document.body.style = `background:${bg};`;
    let dark_bg = document.querySelectorAll(".dark_color");
    // console.log(dark_bg);
    dark_bg.forEach(function (element) {
        element.style = `background:${bg};`;
    })

    let head_hr = document.querySelectorAll(".white_dark")
    head_hr.forEach(function (element) {
        element.style = `color:${headings};`;
    })
}