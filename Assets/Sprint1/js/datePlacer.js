var date = new Date().toLocaleDateString(); 
dateFormatted = date.replace(/\//g, ".");
var target= document.getElementById("mainDate");
var dateFinal = document.createTextNode(dateFormatted); 
target.appendChild(dateFinal);
