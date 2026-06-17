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

    //location.reload()
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
            const div = document.createElement('div');
            div.classList.add("entries")


            div.id = s;
            console.log("the id of the div:")
            console.log(div.id)

            div.addEventListener("click", loadLog)

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


    //for loop here lol

    /*
    const text = localStorage.getItem("savedText");
    if (text) {
        document.getElementById("formOutput").innerHTML = text;
    }
    */
}

function clearStorage() {
    localStorage.clear();
}

function loadLog(ev) {
    // so ev.target is the entire div, ev.target.id is the id of the div 

    document.getElementById("loadLog").style.display = "block";

    console.log("localstorage length:", window.localStorage.length)

    /*
    for (let i=1; i<localStorage.length; i++) {
        const targetKeys = []
        //u can use like localStorage.key(i)
    } */
    const targetKeys = {} //put everything we need here

    Object.keys(localStorage).forEach(key => {
        
        //console.log("KEY:", key, ", VALUE:", localStorage.getItem(key))

        const value = localStorage.getItem(key) // i dont think i need this?? no i do
        const targetSave = String(ev.target.id) //id of clicked div
        const keySaveNum = key[0] //getting the first letter of the key string, which should be num


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


}
