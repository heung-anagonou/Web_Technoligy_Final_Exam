function checkMail(){
let email=document.getElementById('email').value;
if(email.includes('@acity.edu')){
    document.getElementById('msg').innerHTML='Registered';
}else{
    document.getElementById('msg').innerHTML='Use valid ACity email';
}
}