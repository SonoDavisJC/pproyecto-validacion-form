const d = document;

const $inputName = d.getElementById("MyName");
const $inputSurnames = d.getElementById("MySurnames");
const $inputEmail = d.getElementById("MyEmail");
const $inputTelefono = d.getElementById("MyTelefono");
const $inputDescription = d.getElementById("MyDescription");
const $inputSubmit = d.querySelector('.input__submit');

//let $labelError = d.querySelector(".input-group__help--error");

const iconSucces = 'fa-solid fa-circle-check icon-succes';
const iconError = 'fa-sharp fa-solid fa-circle-xmark icon-error';


const Validation = {myname: false, mysurnames: false, myemail: false, mytelefono:false};

let Data = {name:'', surnames: '', email: '', phone: '', message: ''}; 

d.addEventListener("click", e => {
    if(e.target.matches("form .input__submit")){
        e.preventDefault();

        // ---- Validation Name 
        ValidationName();
        $inputName.addEventListener("input", ValidationName);
        Validation.myname = ValidationName();


        ValidationSurnames();
        $inputSurnames.addEventListener("input", ValidationSurnames);
        Validation.mysurnames = ValidationSurnames();


        ValidationEmail();
        $inputEmail.addEventListener("input", ValidationEmail);
        Validation.myemail = ValidationEmail();

        
        ValidationTelefono();
        $inputTelefono.addEventListener("input", ValidationTelefono);
        Validation.mytelefono = ValidationTelefono();
  
        DescriptionMessage();

        // console.log(Validation);

        ValidarFormularioTodo();
    }
})

function StyleError(input, label, message, iconValue) {
    input.style.border = '2px solid brown';
    label.textContent = message;
    label.style.color = 'red';
    iconValue.className = iconError;
}

function StyleSuccess(input, label, iconValue) {
    input.style.border = '2px solid green';
    label.textContent = '';
    iconValue.className =  iconSucces;
}



function CamposObligatorios() {
    return 'Campos obligatorios';
}

function ValidationName() {
    const patronRegex = /[^a-zA-Z]+$/g
    const messageHelpLenght = 'Para el nombre se requiere mas de 3 caracteres';
    const messageCaracteres = 'No se permite caracteres espciales';
    const $icon = $inputName.previousElementSibling;
    const $labelError = $inputName.nextElementSibling;
    let testRegex = patronRegex.test($inputName.value);

    if($inputName.value.length === 0) {
        StyleError($inputName, $labelError, CamposObligatorios(), $icon);
        return false;
    }
    if (testRegex)  {
        StyleError($inputName, $labelError, messageCaracteres, $icon);
        return false;
    }
    if ($inputName.value.length < 3 ) {
        StyleError($inputName, $labelError, messageHelpLenght, $icon);
        return false;
    }

    StyleSuccess($inputName, $labelError, $icon)
    Data.name = $inputName.value;
    return true;
}


function ValidationSurnames () { 
    const patronRegex = /([\s][A-Za-záéíóúñ]{2,})+$/g;
    const messageHelp = 'Para el Segundo Nombre se requiere mas de 3 caracteres';
    const messageCaracteres = 'Se requiere los dos apellidos, evitar caracteres especiales';
    const $icon = $inputSurnames.previousElementSibling;
    const $labelError = $inputSurnames.nextElementSibling;
    let testRegex = patronRegex.test($inputSurnames.value);

    if($inputSurnames.value.length === 0) {
        StyleError($inputSurnames, $labelError, CamposObligatorios(), $icon);
        return false;
    }
    if(!testRegex) {
        StyleError($inputSurnames, $labelError, messageCaracteres, $icon);
        return false;
    }
    if ($inputSurnames.value.length < 3 ) {
        StyleError($inputSurnames, $labelError, messageHelp, $icon);
        return false;
    }

    StyleSuccess($inputSurnames, $labelError, $icon)
    Data.surnames = $inputSurnames.value;
    return true;
}


function ValidationEmail () { 
    const patronRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; 
    const messageHelp = 'Para el Email se requiere mas de 3 caracteres';
    const messageCaracteres = 'Correo electronico invalido';
    const $icon = $inputEmail.previousElementSibling;
    const $labelError = $inputEmail.nextElementSibling;
    let testRegex =  patronRegex.test($inputEmail.value);

    
    if($inputEmail.value.length === 0) {
        StyleError($inputEmail, $labelError, CamposObligatorios(), $icon);
        return false;
    }
    if(!testRegex) {
        StyleError($inputEmail, $labelError, messageCaracteres, $icon);
        return false;
    }
    if ($inputEmail.value.length < 3 ) {
        StyleError($inputEmail, $labelError, messageHelp, $icon);
        return false;
    }
    StyleSuccess($inputEmail, $labelError, $icon)
    Data.email = $inputEmail.value;
    return true;
}


function ValidationTelefono () { 
    // /^[0-9]$/     -> Patron para solo numeros
    const patronRegex =  /[^0-9]/g
    const messageHelp = 'Para el telefono se requiere 9 caracteres';
    const messageCaracteres =  'Solo se permite numeros'
    const $icon = $inputTelefono.previousElementSibling;
    const $labelError = $inputTelefono.nextElementSibling;
    let testRegex = patronRegex.test($inputTelefono.value);

    if($inputTelefono.value.length === 0) {
        StyleError($inputTelefono, $labelError, CamposObligatorios(), $icon);
        return false;
    }
    if(testRegex) {
        StyleError($inputTelefono, $labelError, messageCaracteres, $icon);
        return false;
    }
    if ($inputTelefono.value.length > 9 || $inputTelefono.value.length < 9) {
        StyleError($inputTelefono, $labelError, messageHelp, $icon);
        return false;
    }
    StyleSuccess($inputTelefono, $labelError, $icon)
    Data.phone = $inputTelefono.value;
    return true;
}

function DescriptionMessage () {
    return Data.message = $inputDescription.value;
}


function ValidarFormularioTodo() {
    const Resultado = Object.values(Validation).every(value => {
        return value === true;
    });

    if(!Resultado) {
        $inputSubmit.style.backgroundColor = '';
        return;
    } 

    $inputSubmit.value = "Enviando...";
    const serviceID = 'default_service';
    const templateID = 'template_4l1f7zb';

    emailjs.send(serviceID, templateID, Data)
    .then(() => {
        $inputSubmit.style.backgroundColor = 'rgba(27, 177, 27, 0.733)';  
        $inputSubmit.value = 'Enviado';
    },(err) => {
        //btn.value = 'Send Email';
        alert(JSON.stringify(err));
    });
    
}