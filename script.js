if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

function openPopup() {
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
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

            document.getElementById("saveContainer").appendChild(div)
            

            for (let i=0; i<categories.length;i++) {
                //const p = document.createElement('p');

                const keyName = s + "_" + categories[i]
                const input = localStorage.getItem(keyName)
                console.log("keyname:", keyName)
                console.log("value of keyname:", localStorage.getItem(keyName))

                //p.innerHTML = input 
                //div.appendChild(p);
            }

            
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