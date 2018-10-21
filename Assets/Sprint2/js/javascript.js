//Sprint 1
//set main date page
let date = new Date().toLocaleDateString(); 
dateFormatted = date.replace(/\//g, ".");
let target= document.getElementById("mainDate");
let dateFinal = document.createTextNode(dateFormatted); 
target.appendChild(dateFinal);

//<----------------------------------------------------------------------->
//Sprint 2


 
const msInSecond = 1000; 
const msInMinute = msInSecond*60;
const msInHour = msInMinute*60;
const msInDay = msInHour*24;
const msInMonth= msInDay*30; //count 30 days as a month
const msInYear = msInDay*365;

//array of objects to use Array.find() on 
//to find appropriate time-scale in terms of miliseconds
const timeScale = [ {key: msInYear, value:"year"},
                    {key: msInMonth, value: "month"},
                    {key: msInDay, value: "day"},
                    {key: msInHour, value: "hour"},
                    {key: msInMinute, value: "minute"},
                    {key: msInSecond, value: "second"},
                    {key: -1, value:"Just a moment ago"}
                ];

//initial hard coded comments array, reflecting comments in copy and get existing comments ul as global variables
let comArray =[ new comment("Jill Saunders", "Masters of their instruments and on time with each other all the time, perfect what a pleasure", new Date(2018, 0)),
                new comment("Edward Anthony", "These guys are beyond great. The opening melody was incredible and had to be very difficult. The #1 band I regret not seeing LIVE", new Date(2018, 6)),
                new comment("Corey Kohan", "Its just amazing all the sounds that come out of this band. Neil is just an animal on the drum kit and Geddy and Alex are just as good on their instruments.", new Date(2018, 7)),
                new comment("Jack Deng", "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.", new Date(2018, 8,29))];
//get comments UL container
let commentsUL = document.getElementById("existingComments");
//initial comments render
renderComments();


// //use this specific method so old IE compatible 
// //fill the array with current comments
// Array.prototype.forEach.call(comments, current=>{
//     let name= current.getElementsByClassName("comment__name")[0].innerHTML;
//     let body = current.getElementsByClassName("comment__body")[0].innerHTML;
//     let date = current.getElementsByClassName("comment__date")[0].innerHTML;
//     comArray.push(new comment(name, body,date));
// });

// //reverse so we can simply push newest comments to the end
// comArray=comArray.reverse();


//find the form element, add event listener and stop default 

let form= document.getElementById("commentform");
let submitButton= document.getElementById("submitButton");

form.addEventListener(  'submit', 
                        event=>{ event.preventDefault();
                        // temporarily disable button to prevent spam 
                        submitButton.setAttribute("disabled","true");
                        setInterval(function(){submitButton.removeAttribute("disabled")},2000);
                        //function that actually updates comments DOM & comments array 
                        submitEvent(event)} );

function submitEvent(event){
    //loop through info form.elements
    let name;
    let body;
    let value;
    for(let i =0; i<form.elements.length; i++){
        //continues if not textarea input
        if(form.elements[i].tagName.toLowerCase()!=="textarea" && form.elements[i].tagName.toLowerCase()!=="input"){
            continue;
        }
        value = form.elements[i].value; 

        if(form.elements[i].className === "commentSection__form--nameInput"){
            name = value; 
        }
        if(form.elements[i].className === "commentSection__form--commentsInput"){
            body = value; 
        }
        //clear the input and textarea values after submit
        form.elements[i].value = '';
    }
    let newComment = new comment(name,body, new Date());
    //add to comments array 
    comArray.push(newComment);
    //clear dom
    clearComments();
    //re-render dom
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



function formatDate(date){
        let currentDate= new Date(); 
        //difference in miliseconds 
        let diff = currentDate - date; 
        //find the correct time scale using timeScale
        let timeUnit=timeScale.find(time=>{ return diff > time.key}); 

        //for comments less than 1 second, the key-value pair returned is {key:-1, value:"Just a moment ago"}
        //therefore just return the value 
        if(timeUnit.key===-1){
            return timeUnit.value; 
        }
        //convert to the unit of time we will display, and round to the nearest half 
        let ans = Math.round(diff/timeUnit.key); 
        //check if the value is singular, in order to display grammatically correct string
        if(ans===1){
            return ans + " " + timeUnit.value + " ago" 
        }else{
            return ans + " " + timeUnit.value + "s ago" 
        }
 
}

//comment object 
function comment(name, body, date){
    this.name = name;
    this.body = body; 
    this.date = date; 
}

                                        