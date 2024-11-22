
var bmNameInput = document.querySelector("#bookmarkName");
var bmURLInput = document.querySelector("#websiteURL");
var outputTable = document.querySelector(".myTable");
var form = document.querySelector("form");
var btnSubmit = document.querySelector(".btn-submit");

form.addEventListener("submit",function(e){
    e.preventDefault();
});

btnSubmit.addEventListener( "click", add );

var bookmarksList;

if(localStorage.getItem("bookmarks") == null ){
    bookmarksList = [];
} else {
    bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
    display(bookmarksList);
}

function add() {

    var testURL = "" ;
    if ( bmNameInput.classList.contains("is-valid") && 
        bmURLInput.classList.contains("is-valid")) {
        
        if (bmURLInput.value.includes("https")) {
            testURL = bmURLInput.value;
        } else {
            testURL = `https:\\` + bmURLInput.value;
        }

        var bookmark = {
            name: bmNameInput.value.toLocaleLowerCase() ,
            URL: testURL
        };

        bookmarksList.push(bookmark);
        localStorage.setItem("bookmarks" , JSON.stringify(bookmarksList) );
        display(bookmarksList);
        clear();
        
        bmNameInput.classList.remove("is-valid");
        bmURLInput.classList.remove("is-valid");
    
    } else {
    alert("Not valid data");
    }
}

function display(arr){
    var cartona = "";
    for (var i= 0; i < arr.length; i++) {
        
        cartona += `
        <tr class="row border border-bottom-0 border-start-0 border-end-0 pt-2 mb-2">
                    <td class="col-3">${i+1}</td>
                    <td class="col-3 text-capitalize">${arr[i].name}</td>
                    <td class="col-3">
                        <button type="button" class="btn btn-visit">
                            <i class="fa-solid fa-eye"></i> 
                            <a href="${arr[i].URL}" target="_blank" class=" text-decoration-none text-white "> Visit</a>
                        </button>
                    </td>
                    <td class="col-3">
                        <button onclick="Delete(${i})" type="button" class="btn btn-danger">
                            <i class="fa-solid fa-trash-can"></i> Delete
                        </button>
                    </td>
                </tr>
                    `; 
    }

    outputTable.innerHTML = cartona;
}

function vaildateInputs(element) {

    var regex = {
        bookmarkName : /^(\w{3,}[ ]*)+$/,
        /*
        ? ==> {0,1}
        \/ ==> /
        \w ==> [a-zA-Z0-9_]
        + ==> {1,}
        * ==> {0,}
        \d ==> [0-9]
        */
        websiteURL : /^(https?:\/\/)?(w{3}\.)?(\w+\.)+\w{2,}\/?(:\d{2,5})?(\/\w+-?\w+)*(\.\w{3,})*\??$/gm,
    };
    
    if (regex[element.id].test(element.value) == true) {
        
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");

        element.nextElementSibling.classList.add("d-none");

    } else {
        
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");

        element.nextElementSibling.classList.remove("d-none");
    }
}

function Delete(bmindex){

    bookmarksList.splice(bmindex,1);
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarksList) );
    display(bookmarksList);
}

function clear() {
    bmNameInput.value = null;
    bmURLInput.value = null;
}