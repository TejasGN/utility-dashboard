let _homewrap, currNum = 1;
const generateRandomNum = (currNum) => {
    try{
        let newNum = Math.floor(Math.random() * 10) + 1;
        currNum = currNum == newNum ? generateRandomNum(currNum) : newNum;
        return currNum;
    }
    catch(err){
        console.log("Error in generateRandomNum", err);
    }
};

const setHomeBg = () => {
    try{
        let homeBgString = generateRandomNum(currNum) + ".jpg";
        _homewrap.style.backgroundImage = "url(\"images/bg_img" + homeBgString + "\")";
    }
    catch(err){
        console.log("Error in setHomeBg", err);
    }
};
_homewrap = document.querySelector('.homewrap');
setHomeBg();
setInterval(() => {
    setHomeBg();
}, 15000);
