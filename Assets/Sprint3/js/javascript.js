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

//initialize comments array 
let comArray =[]


let response = fetch("http://project-1-api.herokuapp.com/comments?api_key=true");

response.then(function(servedComments){
    //creates array of comment objects
    return servedComments.json()
}).then(function(parsed){
    let toBePushed;
    for(let i=0; i<parsed.length;i++){
        let item = parsed[i];
        toBePushed = new comment(item.name,item.comment, new Date(item.timestamp), {likes: item.likes});
        comArray.push(toBePushed);
    }
    renderComments();
});



//get comments UL
let commentsUL = document.getElementById("existingComments");
//initial comments render



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
    let newComment = new comment(name, body, new Date());
   let newCommentPush = {"name": name,
                        "comment": body};

    let init = { method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(newCommentPush)
    }
    let postResponse = fetch("http://project-1-api.herokuapp.com/comments?api_key=true",init);
    postResponse.then(response=>{
                        return response.json()}
                    ).then(jsonData=>{
                        console.log(jsonData);
                    }).catch( err=>{
                        console.log(err);
                    });
    //add to comments array ??? no longer needed?
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
    console.log(comArray);
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
function comment(name, body, date,opts){
    this.name = name;
    this.body = body; 
    if(opts){
        this.likeNum=opts["likes"];
    }else{
        this.likeNum=0;
    }
    this.date = date; 
}


                                        