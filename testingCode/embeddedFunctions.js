exports.checkDateBeforeCurrentDate = (input) => {
    var currentD = new Date();
    if (input < currentD) {
        return true;
    }
    else {
        return false;
    }
}

exports.checkIsNotANumber = (input) => {
    if (isNaN(input) == false) {
        return false;
    }
    else {
        return true;
    }
}

exports.isValidEmail = (input) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
        return true;
    }
    else{
        return false;
    }
    
}

exports.containsInput = (input) => {
    if (input.length==0) {
        return false;
    }
    else{
        return true;
    }
    
}

exports.isValidRepoLink = (input) => {
    if (input.includes('https://github.com/')) {
        return true;
    }
    else{
        return false;
    }
    
}

exports.isValidNameOrSurname = (input) => {
    var letters = /^[A-Za-z]+$/;
    if(this.containsInput(input)==true){
        if(this.checkIsNotANumber(input)){
            if(letters.test(input.value)){
                return true
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

exports.isValidUsername = (input) => {
    var letters = /^[A-Za-z]+$/;
    var characters=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.containsInput(input)==true){
        if(this.checkIsNotANumber(input)){
            if(letters.test(input.value) || characters.test(input.value) ){
                return true
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}
