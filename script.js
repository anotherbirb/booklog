if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
} 

function closeLoad() {
    document.getElementById("loadLog").style.display = "none"
}








const categories = ["title", "summary", "analysis", "quotes", "comments"] //number  of categories; old name "array"

const extras = ["color", "size"]

const bookColors = ["#853232", "#b34e25", "#bfa21f", "#327348", "#15ad8f", "#1573ad", "#34438a", "#604094", "#944090"]

function logData(event) { //called when "LOG" button pressed
    event.preventDefault()
    /* example
    const titleText = document.getElementById("title").value; 
    document.getElementById("formOutput").innerHTML = titleText; */
    const numSaves = parseInt(localStorage.getItem("numberSaves")) + 1;
    localStorage.setItem("numberSaves", String(numSaves));

    const currentNumSaves = localStorage.getItem("numberSaves") //this is a STRING not an INT

    for (i = 0; i < categories.length; i++) { //for everything in the categories loop
        //trying to set local storage item 

        const key = currentNumSaves +  "_" + String(categories[i]); //the naming formula

        const categoryData = document.getElementById(categories[i]).value; //getting
        localStorage.setItem(key, categoryData);
        
        console.log(key, localStorage.getItem(key))
    }

    //setting color
    const colorName = currentNumSaves + "_" + "color"
    const colorData = document.getElementById("selectColor").value
    localStorage.setItem(colorName, colorData)
    console.log(colorName, localStorage.getItem(colorName))


    location.reload()
    //^^^ put this back up 
}

window.onload = function() {    

    if (localStorage.getItem("numberSaves") == null) { //checj if numberSaves eexists!
        localStorage.setItem("numberSaves", "0"); //the string will be "parseInt()"ed
        console.log("save is null, created new save");

    } else {
        console.log("saves r loading")
        console.log(localStorage.getItem("numberSaves"))

        const numSaves = parseInt(localStorage.getItem("numberSaves")) //so this is a NUMBER

        for (let s=1; s<=numSaves; s++) {

            overflowCheck(s)


            const div = document.createElement('div');
            div.classList.add("books")
            div.id = s;

            //getting color
            const randomColor = bookColors[Math.floor(Math.random() * bookColors.length)]
            const colorKey = s + "_" + "color"
            if (localStorage.getItem(colorKey)) {
                div.style.backgroundColor = localStorage.getItem(colorKey)
            } else {
                div.style.backgroundColor = randomColor
            }

            //setting height
            function randomHeight(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            div.style.height = randomHeight(19, 22) + "vh"

            div.addEventListener("click", loadLog)

            //getting the title
            const title = document.createElement('p');
            const titleKey = s + "_" + "title";
            const titleValue = localStorage.getItem(titleKey)
            let titleHTML = titleValue

            if (titleValue.length>=13) {
                const shortened = titleValue.slice(0, 12)
                titleHTML = shortened + "..."
            } else {
                titleHTML = titleValue
            }

            title.innerHTML = titleHTML

            

            div.appendChild(title)

            console.log("about to append book", s, "to shelf with id:", document.getElementById("saveContainer").id);
            document.getElementById("saveContainer").appendChild(div)
            
            /* add p for every category
            for (let i=0; i<categories.length;i++) {
                const p = document.createElement('p');

                const keyName = s + "_" + categories[i]
                const input = localStorage.getItem(keyName)
                console.log("keyname:", keyName)
                console.log("value of keyname:", localStorage.getItem(keyName))

                p.innerHTML = input 
                div.appendChild(p);
            } */

        }
        
    }

    //overflow check

    function overflowCheck(s) {

        if (document.querySelector(".books")) {
            let bookWidth = 0
            document.querySelectorAll(".books").forEach((element) => {
            if (element.parentElement.id === "saveContainer") {
                bookWidth += element.offsetWidth
            }
            
            })

            const bookshelf = document.getElementById("bookshelf")
            const shelfWidth = document.getElementById("saveContainer")
            const singleBookWidth = document.querySelector(".books").offsetWidth

            //console.log("bookWidth:", bookWidth, "shelfWidth:", shelfWidth.clientWidth, "after book", s);   

            if (bookWidth>=shelfWidth.clientWidth - (2 * singleBookWidth)) { //if its overflowing
                console.log("overflowing!!!")

                const array = Array.from(document.querySelectorAll(".shelf")) //converting elements to array
                const currentShelf = document.getElementById("saveContainer")
                const index = array.indexOf(currentShelf)
            
                currentShelf.id = String(index) //resetting current shelf id
                array[index + 1].id = "saveContainer"
            
        
            }
        }
    }


        
    
    
}


function clearStorage() {
    localStorage.clear();
    location.reload();
}

function loadLog(ev) {
    // so ev.target is the entire div, ev.target.id is the id of the div 

    document.getElementById("loadLog").style.display = "block";

    if (ev.target.tagName == "P") {
        ev = ev.target.parentElement 
        //EV IS NOW EV.TARGET DO NOT USE EV.TARGET
    } else {
        ev = ev.target
    }

    /*
    for (let i=1; i<localStorage.length; i++) {
        const targetKeys = []
        //u can use like localStorage.key(i)
    } */
    const targetKeys = {} //put everything we need here

    Object.keys(localStorage).forEach(key => {
        
        //console.log("KEY:", key, ", VALUE:", localStorage.getItem(key))

        const value = localStorage.getItem(key) // i dont think i need this?? no i do
        const targetSave = String(ev.id) //id of clicked div
        const underscore = key.indexOf("_")  //underscore var is a number
        const keySaveNum = key.slice(0, underscore) //getting the first letter of the key string, which should be num THIS IS THE PROBME


        if (keySaveNum == targetSave) {
            targetKeys[key] = value
        }

    });

    for (const category of categories) {
        const id = category + "Load";
        const p = document.getElementById(id)
        Object.keys(targetKeys).forEach(key => {
            if (key.includes(category)) {
                p.innerHTML = targetKeys[key]
            }
        })
    }

    console.log(targetKeys, "targetkeys ,<<")


}


function randomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function makeColorOptions() {
    for (color in bookColors) {
        const newOption = document.createElement("option")
        newOption.value = bookColors[color]
        newOption.innerHTML = bookColors[color]
        newOption.style.color = bookColors[color]
        document.getElementById("selectColor").append(newOption)
    }
}

makeColorOptions()