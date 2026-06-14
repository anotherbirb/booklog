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
        console.log("on load: saved");
    } else {
        console.log("saves r loading")
        console.log(localStorage.getItem("numberSaves"))
        const numSaves = parseInt(localStorage.getItem("numberSaves")) //so this is a NUMBER
        for (let s=0; s<numSaves; s++) {
            console.log("new div adding this should loop for  howevermany saves there r")
            const div = document.createElement('div');

            document.getElementById("saveContainer").appendChild(div)
            console.log("ok new div added")

            for (let i=0; i<categories.length;i++) {
                const p = document.createElement('p');
                p.innerHTML = "hello" //change change <<<<<<
                div.appendChild(p);
                console.log("worked");
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