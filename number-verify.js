document.head.innerHTML += `<style>
        
        .number-cube{
            width: 1em;
            font-size: 1.5em;
            margin:0.1em;
            padding:0.2em;
            
            border:0.5px solid #C7C7C7;
        }

        .number-incorrect{
            border:0.5px solid red;
        }
        
        .number-cube::-moz-placeholder{
            text-align:center;
        }

        .number-cube::-webkit-input-placeholder{
            text-align:center;
        }

        .number-cube:hover{
            border-color: #9C9C9C;
            cursor: default;
        }

        .number-cube:focus{
            border-color: #5C5C5C;
            text-align:left;
        }

        .inactive-number-cube{
            background: #C7C7C7;
            display: inline-block;
            font-size: 1.5em;
            margin:0.1em;

            padding:0.2em;
            width:1em;
            text-align:center;
        }

        .default-symbol{
            font-size: 2em;
        }
    
    </style>`;
var number_verify_prototype = Object.create(HTMLElement.prototype);
number_verify_prototype.countOfInputs = 0;
number_verify_prototype.errorText = "Неверный номер, попробуйте ещё раз";
number_verify_prototype.setMask = function(mask){
    var number = Array.from(mask);
    var errorTextAttr = this.getAttribute("number-error-text");
    this.countOfInputs = 0;
    this.innerHTML = "";
    for (var i = 0; i < number.length; i++){
        if (number[i] == 'I'){
            this.innerHTML += `<input type="text" oninput="changeInput(this.parentElement, this);" id="number_${this.countOfInputs}" class="number-cube" placeholder="_" maxlength="1">`;
            this.countOfInputs++;
        } else if(number[i] >= '0' && number[i] <= '9'){
            this.innerHTML += "<p class=\" inactive-number-cube\">" + number[i] + "</p>";

        } else if(number[i] == '*'){
            this.innerHTML += `<p class="inactive-number-cube">●</p>`;

        } else {
            this.innerHTML += "<span class=\"default-symbol\">" + number[i] + "</span>";
        }
    }
    this.innerHTML += `<p id="number-verify-error" style="color:red; display:none;">${errorTextAttr == undefined ? this.errorText : errorTextAttr}</p>`;
};
number_verify_prototype.setErrorText = function(text){
    this.errorText = text;
    var errPText = document.querySelector("#number-verify-error");
    if(!(errPText instanceof undefined)){
        errPText.textContent = text;
    }
}
number_verify_prototype.setCellIncorrect = function(position){
    document.querySelector(`#number_${position}`).classList.toggle("number-incorrect", true);
    document.querySelector("#number-verify-error").style.display = "block";
};
number_verify_prototype.clearAll = function(){
    for (var i = 0; i < this.countOfInputs; i++){
        var cell =  document.querySelector(`#number_${i}`);
        cell.value = "";
        cell.classList.toggle("number-incorrect", false);
    }
    document.querySelector("#number-verify-error").style.display = "none";

};
number_verify_prototype.createdCallback = function(){
    var number = this.getAttribute("mask");
    this.style.display = "inline-block";
    
    if (number != null || number != undefined){
       this.setMask(number);
    }
}

var numberVerify = document.registerElement("number-verify", {prototype: number_verify_prototype});
function changeInput(form, elm){
    if (!(elm.value >= '0' && elm.value <= '9')){
        elm.value = "";
        return;
    }
    var id = +elm.id.substring(7);
    if (elm.value.length != 0 && id != form.countOfInputs - 1){
        document.querySelector(`#number_${id + 1}`).focus();
    }

}
