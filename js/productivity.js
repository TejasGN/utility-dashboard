let amPmVal = "AM";
let _welcmContainer, _userNameTxt, _submitName, _mainContainer, _userNameSpan, _greetTxt;

const setGreetings = (hrs) => {
    try{
        let grtString;
        if(hrs >= 1 && hrs <= 5) grtString = "Night";
        else if(hrs >= 6 && hrs <= 11) grtString = "Morning";
        else if(hrs >= 12 && hrs <= 17) grtString = "Afternoon";
        else grtString = "Evening";
        _greetTxt.innerHTML = grtString;
    }
    catch(err){
        console.log("Error in setGreetings", err);
    }
};

const displayCurrentTime = () => {
    try{
        let currDate = new Date();
        let currHrs = currDate.getHours();
        let currMins = currDate.getMinutes();
        let CurrSec = currDate.getSeconds();
        setGreetings(currHrs);
        document.querySelector('#hrs').innerHTML = padSingleDigit(adjustHrs(currHrs));
        document.querySelector('#mins').innerHTML = padSingleDigit(currMins);
        document.querySelector('#ampm').innerHTML = amPmVal;
    }
    catch(err){
        console.log("Error in displayCurrentTime", err);
    }
};

const padSingleDigit = (num) => {
    try{
        if (num < 10) return "0" + num; 
        else return num; 
    }
    catch(err){
        console.log("Error in padSingleDigit", err);
    }
};

const adjustHrs = (hrs) => {
    try{
        if(hrs >= 12){
            amPmVal = "PM";
            return hrs - 12;
        }
        else if(hrs == 0){
            return "12";
        }
        else {
            return hrs;
        }
    }
    catch(err){
        console.log("Error in adjustHrs", err);
    }
};

const setUserNameStorage = (usrNm) => {
    try{
        localStorage.setItem('userName', usrNm);
        _mainContainer.style.display = "block";
        _welcmContainer.style.display = "none";
        setUserName(usrNm);
    }
    catch(err){
        console.log("Error in setUserNameStorage", err);
    }
};

const showWelcomeScrn = () => {
    try{
        _mainContainer.style.display = "none";
        _welcmContainer.style.display = "block";
        _userNameTxt.addEventListener('keyup', (e) => {
            if(e.keyCode == '13' && e.target.value.trim().length >= 1) setUserNameStorage(e.target.value);
        });
        _submitName.addEventListener('click', () => {
            if(_userNameTxt.value.trim().length >= 1) setUserNameStorage(_userNameTxt.value);
        });
    }
    catch(err){
        console.log("Error in showWelcomeScrn", err);
    }
};

const setUserName = (usr) => {
    try{
        _userNameSpan.innerHTML = usr;
    }
    catch(err){
        console.log("Error in setUserName", err);
    }
};

const successfulLookup = position => {
    try{
        const { latitude, longitude } = position.coords;
        localStorage.setItem('lat', latitude);
        localStorage.setItem('lon', longitude);
    }
    catch(err){
        console.log("Error in successfulLookup", err);
    }
}

window.onload = () => {
    try{
        _welcmContainer = document.querySelector('.welcm-container');
        _userNameTxt = document.querySelector('#user-name-txt');
        _submitName = document.querySelector('.submit-name');
        _mainContainer = document.querySelector('.main-container');
        _userNameSpan = document.querySelector('#user-name');
        _greetTxt = document.querySelector('#greet-txt');
        !!localStorage.getItem('userName') ? userName = setUserName(localStorage.getItem('userName')) : showWelcomeScrn();
        displayCurrentTime();
        setInterval(() => {
            displayCurrentTime();
        }, 60000);
        if(!localStorage.getItem('lat')) window.navigator.geolocation.getCurrentPosition(successfulLookup);
    }
    catch(err){
        console.log("Error in onload", err);
    }
};