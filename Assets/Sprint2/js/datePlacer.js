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

//!!!reverse
comArray=comArray.reverse();

//find the form element, add event listener and stop default 

var form= document.getElementById("commentform");
var submitButton= document.getElementById("submitButton");

form.addEventListener(  'submit', 
                        function(event){ event.preventDefault();
                        submitButton.setAttribute("disabled","true");
                        setInterval(function(){submitButton.removeAttribute("disabled")},2000);
                        submitEvent(event)} );

function submitEvent(event){
    
    //loop through info from form.elements
    var name;
    var body;
    for(var i =0; i<form.elements.length; i++){
        //continues if not textarea input
        if(form.elements[i].tagName.toLowerCase()!=="textarea"){
            continue;
        }

        var value = form.elements[i].value; 

        if(form.elements[i].className === "commentSection__form--nameInput"){
            name = value; 
        }
        if(form.elements[i].className === "commentSection__form--commentsInput"){
            body = value; 
        }
       
    }
    var newComment = new comment(name,body, new Date());
    //add to your array 
    comArray.push(newComment);
    //clear
    clearComments();
    //re-render
    renderComments();
}

//clear list passed by submitEvent
function clearComments(){
    for(var i=commentsUL.childNodes.length-1; i>=0; i--){
         commentsUL.removeChild(commentsUL.childNodes[i]);
        } 
}

function renderComments(){
    var newListItem;
    var newNameChild;
    var newBodyChild;
    for(var i=comArray.length-1; i>=0;i--){
        //variable for current comment
        var item = comArray[i];
        //create the three nodes to be added
        newListItem= document.createElement('li');
        newListItem.setAttribute("class","comment");

        newNameChild = document.createElement('div');
        newNameChild.setAttribute("class","comment__name");

        newBodyChild = document.createElement('div');
        newBodyChild.setAttribute("class", "comment__body");
        //creates text nodes
        var textName = document.createTextNode(item.name);
        var textBody = document.createTextNode(item.body);

        //append text to divs, and divs to li
        newNameChild.appendChild(textName);
        newBodyChild.appendChild(textBody);
        newListItem.appendChild(newNameChild);
        newListItem.appendChild(newBodyChild);
        //!!!date
        
        commentsUL.appendChild(newListItem);

    }
}

//create new comment from form 

//function createNewCom(form)

//comment object 
function comment(name, body, date){
    this.name = name;
    this.body = body; 
    this.date = date; 
}

                                        