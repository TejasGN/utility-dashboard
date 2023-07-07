const prntBtn = document.querySelectorAll('.btnprnt');
const oprtnBtn = document.querySelectorAll('.btnoprtn');
const sploprtn = document.querySelectorAll('.sploprtn');
const txtBox = document.querySelector('.calc_txtbox');
let plusMinusFlag = true;
let calString = "0";
const checkBrackets = function(str){
    try{
        return !str.split('').reduce((uptoPrevChar, thisChar) => {
            if(thisChar === '(') return ++uptoPrevChar;
            else if (thisChar === ')') return --uptoPrevChar;
            return uptoPrevChar
        }, 0);
    }
    catch(err){
        console.log("Error in checkBrackets", err);
    }
}
const calculate = function(val){
    try{
        if(checkBrackets(val)){
            if(txtBox.value.indexOf('sin') != -1 || txtBox.value.indexOf('cos') != -1 || txtBox.value.indexOf('tan') != -1 || txtBox.value.indexOf('sqrt') != -1 || txtBox.value.indexOf('Log') != -1 || txtBox.value.indexOf('^') != -1){
                calString = txtBox.value;
                if(calString.indexOf('sin') != -1){
                    calString = calString.replace('sin', 'Math.sin');
                }
                if(calString.indexOf('cos') != -1){
                    calString = calString.replace('cos', 'Math.cos');
                }
                if(calString.indexOf('tan') != -1){
                    calString = calString.replace('tan', 'Math.tan');
                }
                if(calString.indexOf('sqrt') != -1){
                    calString = calString.replace('sqrt', 'Math.sqrt');
                }
                if(calString.indexOf('Log') != -1){
                    calString = calString.replace('Log', 'Math.log');
                }
                if(calString.indexOf('^') != -1){
                    calString = Math.pow(calString.split('^')[0], calString.split('^')[1]);
                }
            }
            else{
                calString = txtBox.value;
            }
            plusMinusFlag = true;
            return eval(calString);
        }
        else{
            return txtBox.value;
        }
    }
    catch(err){
        console.log("Error in calculate", err);
    }
}
prntBtn.forEach(function(elem){
    elem.addEventListener('click', function(){
        if(txtBox.value == "0" && (this.classList.contains('num') || this.classList.contains('brckt'))){
            if(this.getAttribute('data-attr') != "."){
                txtBox.value = this.getAttribute('data-attr');
            }
            else{
                txtBox.value += this.getAttribute('data-attr');
            }
        }
        else if(txtBox.value != "0" ){
            let lastChar = txtBox.value.charAt(txtBox.value.length - 1);
            if(this.classList.contains('oprtr') && (lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/" || lastChar == "^")){
                txtBox.value = txtBox.value.substring(0, txtBox.value.length - 1) + this.getAttribute('data-attr');
            }
            else if(this.getAttribute('data-attr') == "."){
                if(txtBox.value.indexOf(".") == -1){
                    if((lastChar == "+" || lastChar == "-" || lastChar == "*" || lastChar == "/")){
                        txtBox.value += "0" + this.getAttribute('data-attr');
                    }
                    else if(lastChar == "."){
                        txtBox.value = txtBox.value.substring(0, txtBox.value.length - 1) + this.getAttribute('data-attr');
                    }
                    else{
                        txtBox.value += this.getAttribute('data-attr');
                    }
                }
            }
            else if(this.getAttribute('data-attr') == "^"){
                if(txtBox.value.indexOf("^") != -1){
                    txtBox.value = calculate(txtBox.value) + this.getAttribute('data-attr');
                }
                else{
                    txtBox.value += this.getAttribute('data-attr');
                }
            }
            else{
                txtBox.value += this.getAttribute('data-attr');
            }
        }
    });
});
oprtnBtn.forEach(function(elem){
    elem.addEventListener('click', function(){
        if(this.getAttribute('data-attr') == 'plusminus'){
            if(txtBox.value.charAt(0) == "-"){
                plusMinusFlag = false;
            }
            plusMinusFlag = !plusMinusFlag;
            if(plusMinusFlag){
                txtBox.value = txtBox.value.substring(1);
            }
            else{
                txtBox.value = "-"+txtBox.value;
            }
        }
        else if(this.getAttribute('data-attr') == 'clear'){
            txtBox.value = "0";
            plusMinusFlag = true;
        }
        else if(this.getAttribute('data-attr') == 'bckspc'){
            let lstFourChars = txtBox.value.substring(txtBox.value.length - 4);
            let lstFiveChars = txtBox.value.substring(txtBox.value.length - 5);
            if(lstFourChars == 'sin(' || lstFourChars == 'cos(' || lstFourChars == 'tan(' || lstFourChars == 'Log('){
                txtBox.value = txtBox.value.substring(0, txtBox.value.length - 4);
            }
            else if(lstFiveChars == "sqrt("){
                txtBox.value = txtBox.value.substring(0, txtBox.value.length - 5);
            }
            else{
                txtBox.value = txtBox.value.substring(0, txtBox.value.length - 1);
            }
        }
        else{
            txtBox.value = calculate(txtBox.value);
        }
        
    });
});
sploprtn.forEach(function(elem){
    elem.addEventListener('click', function(){
        if(txtBox.value == "0"){
            txtBox.value = this.getAttribute('data-attr')+"(";
        }
        else{
            txtBox.value += this.getAttribute('data-attr')+"("; 
        }
    });
});
document.querySelector('.pi').addEventListener('click', function(){
    if(txtBox.value == "0"){
        txtBox.value = Math.PI;
    }
    else{
        txtBox.value = calculate(txtBox.value) * Math.PI;
    }
});
document.querySelector('.by-hundrd').addEventListener('click', function(){
    if(txtBox.value != "0"){
        txtBox.value = calculate(txtBox.value) / 100;
    }
});
txtBox.addEventListener('keyup', function(e){
    if(e.keyCode == "13"){
        txtBox.value = calculate(txtBox.value);
    }
});