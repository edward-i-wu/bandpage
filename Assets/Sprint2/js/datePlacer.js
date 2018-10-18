//set main date page
var date = new Date().toLocaleDateString(); 
dateFormatted = date.replace(/\//g, ".");
var target= document.getElementById("mainDate");
var dateFinal = document.createTextNode(dateFormatted); 
target.appendChild(dateFinal);

//<----------------------------------------------------------------------->
//initialise the comments array and get existing comments ul
var comArray =[];
var commentsUL = document.getElementById("existingComments");
//returns a STATIC NodeList
var comments = commentsUL.querySelectorAll("li");

//use this specific method so old IE compatible 
//fill the array with current comments
Array.prototype.forEach.call(comments, function(current){
    var name= current.getElementsByClassName("comment__name")[0].innerHTML;
    var body = current.getElementsByClassName("comment__body")[0].innerHTML;
    var date = current.getElementsByClassName("comment__date")[0].innerHTML; 
    comArray.push(new comment(name, body,date));
});

//find the form element, add event listener and stop default 

var form= document.getElementById("commentform");
var submitButton= document.getElementById("submitButton");

form.addEventListener(  'submit', 
                        function(event){ event.preventDefault();
                        submitButton.setAttribute("disabled","true");
                        setInterval(function(){submitButton.removeAttribute("disabled")},2000);
                        submitEvent(event)} );

function submitEvent(event){
    
    //get info from form.elements
    var tester = new comment("test","tester", "right now");
    //
    //get comments
    clearComments(existingComments);
}

//clear list passed by submitEvent
function clearComments(list){

}

//create new comment from form 

//function createNewCom(form)

//comment object 
function comment(name, body, date){
    this.name = name;
    this.body = body; 
    this.date = date; 
}

                                        