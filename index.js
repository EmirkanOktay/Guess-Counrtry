let startButton = document.querySelector("#start");
let allCountries = document.querySelector("#all");
let europeanCountries = document.querySelector("#europe");
let asianCountries = document.querySelector("#asia");
let northAmericanCountries = document.querySelector("#na");
let southAmericanCountries = document.querySelector("#sa");
let africanCountries = document.querySelector("#africa");
let getCapital = document.querySelector("#capital");
let writeScore = document.querySelector("#score")
let getFlag = document.querySelector("#flag"); 
let getLang = document.querySelector("#lang");
let showInput = document.querySelector("#guess");
let guessButton = document.querySelector("#guessButton");
let resetButton = document.querySelector("#reset");
let writeNumber = document.querySelector("#number");
let getName = "";
let finalScore = 0;

let buttons = [africanCountries, europeanCountries, asianCountries, northAmericanCountries, southAmericanCountries];
let api;
let buttonOfValue;
let default1 = `https://restcountries.com/v3.1/all`;

if (default1) {
    api = `https://restcountries.com/v3.1/all`;
}

if (allCountries.addEventListener("click", () => {
    api = `https://restcountries.com/v3.1/all`;
})) {}

else {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            buttonOfValue = buttons[i].value;
            api = `https://restcountries.com/v3.1/region/${buttonOfValue}`;
        });
    }
}

function auto(button){
    button = startButton
    if(button)
    {
        setTimeout(()=>{
            button.click();
        },1)
    }
}

startButton.addEventListener("click", () => {
    let query = `${api}`;
    fetch(query)
        .then(country => country.json())
        .then(data => {
            let random = data[Math.floor(Math.random() * data.length)];
            getFlag.src = `${random.flags.png}`; 
            getFlag.style.display = "block"
            getCapital.innerHTML = ` Capital : ${random.capital}`;
            let lang = `Language : ${Object.values(random.languages).join(",")}`
            getLang.innerHTML = lang;
            console.clear()
            console.log(random);
            showInput.style.display = "block";
            guessButton.style.display = "block";
            getName = `${random.name.common}`;
        });
});
  

guessButton.addEventListener("click", () => {
    let inputValue = showInput.value;
    let formattedInput = inputValue.charAt(0).toUpperCase().trim() + inputValue.slice(1).toLowerCase().trim();

    if (formattedInput === "") {
        alert("You must write a name of country");
        finalScore = 0;
    } 
    else if (formattedInput.trim() === getName) {
        finalScore += 20; 
        writeScore.innerHTML = ` Your Score : ${finalScore}`;
        alert("Correct!");
        auto(startButton)
    } 
    else {
        finalScore -= 20; 
        if (finalScore < 0) {
            finalScore = 0;     
        }
        writeScore.innerHTML = ` Your Score : ${finalScore}`;
        alert(`Correct answer was ${getName}`);
        auto(startButton)
    }

});

resetButton.addEventListener("click", () => {
    getFlag.src = ""; 
     getFlag.style.display = "none"
    getCapital.innerHTML = ""; 
    getLang.innerHTML = ""; 
    showInput.value = ""; 
    showInput.style.display = "none"; 
    guessButton.style.display = "none"; 
    getName = "";
    writeScore.innerHTML = ""
});
