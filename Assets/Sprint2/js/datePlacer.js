//set main date page
let date = new Date().toLocaleDateString(); 
dateFormatted = date.replace(/\//g, ".");
let target= document.getElementById("mainDate");
let dateFinal = document.createTextNode(dateFormatted); 
target.appendChild(dateFinal);

//<----------------------------------------------------------------------->
//initialise the comments array and get existing comments ul as global variables
let comArray =[];
let commentsUL = document.getElementById("existingComments");
//returns a STATIC NodeList
let comments = commentsUL.querySelectorAll("li");

//use this specific method so old IE compatible 
//fill the array with current comments
Array.prototype.forEach.call(comments, current=>{
    let name= current.getElementsByClassName("comment__name")[0].innerHTML;
    let body = current.getElementsByClassName("comment__body")[0].innerHTML;
    let date = current.getElementsByClassName("comment__date")[0].innerHTML; 
    comArray.push(new comment(name, body,date));
});

//!!!reverse so we can simply push newest comments to the end
comArray=comArray.reverse();

//find the form element, add event listener and stop default 

let form= document.getElementById("commentform");
let submitButton= document.getElementById("submitButton");

form.addEventListener(  'submit', 
                        event=>{ event.preventDefault();
                        // temporarily disable button to prevent spam 
                        submitButton.setAttribute("disabled","true");
                        setInterval(function(){submitButton.removeAttribute("disabled")},2000);
                        //call function that actually updates comments DOM and comments array 
                        submitEvent(event)} );

function submitEvent(event){
    //loop through info form.elements
    let name;
    let body;
    for(let i =0; i<form.elements.length; i++){
        //continues if not textarea input
        if(form.elements[i].tagName.toLowerCase()!=="textarea"){
            continue;
        }

        let value = form.elements[i].value; 

        if(form.elements[i].className === "commentSection__form--nameInput"){
            name = value; 
        }
        if(form.elements[i].className === "commentSection__form--commentsInput"){
            body = value; 
        }
       
    }
    let newComment = new comment(name,body, new Date());
    //add to comments array 
    comArray.push(newComment);
    //clear
    clearComments();
    //re-render
    renderComments();
}

//clear list passed by submitEvent
function clearComments(){
    for(let i=commentsUL.childNodes.length-1; i>=0; i--){
         commentsUL.removeChild(commentsUL.childNodes[i]);
        } 
}

function renderComments(){
    let newListItem;
    let newNameChild;
    let newBodyChild;

    for(let i=comArray.length-1; i>=0;i--){
        //call function that builds and displays the comment 
        displayComment(comArray[i]);
    }
}

function displayComment(item){
     //create the three nodes to be added
     newListItem= document.createElement('li');
     newListItem.setAttribute("class","comment");

     newNameChild = document.createElement('div');
     newNameChild.setAttribute("class","comment__name");

     newDateChild = document.createElement('div');
     newDateChild.setAttribute("class","comment__date");

     newBodyChild = document.createElement('div');
     newBodyChild.setAttribute("class", "comment__body");
     //creates text nodes
     let textName = document.createTextNode(item.name);
     let textBody = document.createTextNode(item.body);
     let textDate = document.createTextNode(formatDate(item.date));

     //append text to divs
     newNameChild.appendChild(textName);
     newBodyChild.appendChild(textBody);
     newDateChild.appendChild(textDate);
     //append divs to li
     newListItem.appendChild(newNameChild);
     newListItem.appendChild(newDateChild);
     newListItem.appendChild(newBodyChild);
     //append li to live ul
     commentsUL.appendChild(newListItem);
}
//
function formatDate(date){
    let currentDate= new Date(); 
    //difference in miliseconds 
    let diff = currentDate - date; 
    //convert to seconds 
    diff = diff/1000; 
    if(diff<1){
        return "Just a moment ago";
    }
    if(diff < 60){
        return diff + " seconds ago";
    }else{
        var seconds = diff%60; 
    }

    //convert to minutes
    diff = diff/60;
    if(diff<60){
        return diff + " minutes ago " + seconds + " seconds ago";
    }else{
        var minutes = diff%60; 
    }
    //convert to hours
    diff = diff/60;
    if(diff<24){
        return diff+" hours ago " + minutes + " minutes ago " + seconds + " seconds ago";
    }else{
        var hours = diff%24; 
    }

    //convert to 


    return date
}

//comment object 
function comment(name, body, date){
    this.name = name;
    this.body = body; 
    this.date = date; 
}

                                        