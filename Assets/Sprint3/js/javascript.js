//Sprint 1
//set main date page
let date = new Date().toLocaleDateString(); 
dateFormatted = date.replace(/\//g, ".");
let target= document.getElementById("mainDate");
let dateFinal = document.createTextNode(dateFormatted); 
target.appendChild(dateFinal);

//<----------------------------------------------------------------------->
//Sprint 2
const apiKey = "?api_key=1069db9a-3e4f-4c22-b84a-2a095f91378ab";
const baseURL= "http://project-1-api.herokuapp.com/";
const commLink = "comments/";

 
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


let response = fetch(`${baseURL}${commLink}${apiKey}`);

response.then(function(servedComments){
    //creates array of comment objects
    return servedComments.json()
}).then(function(parsed){
    let toBePushed;
    for(let i=0; i<parsed.length;i++){
        let item = parsed[i];
        toBePushed = new comment(item.name,item.comment, new Date(item.timestamp), {likes: item.likes, id: item.id});
        comArray.push(toBePushed);
    }
    renderComments();
});



//get comments UL
let commentsUL = document.getElementById("existingComments");


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
    }
    //store in local array
    let newComment = new comment(name, body, new Date());
    //comment to be pushed to database
    let newCommentPush = {"name": name,
                        "comment": body};

    let init = { method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(newCommentPush)
    }
    fetch(`${baseURL}${commLink}${apiKey}`,init
                    ).then(response=>{
                        return response.json()}
                    ).then(doubleCheck).then(obj=>{
                        //check that an object was found
                        if(obj!==undefined){
                            //attach returned id to local comments array object
                            newComment.id =obj.id;
                            comArray.push(newComment);
                            clearComments();
                            renderComments();
                            form.reset();
                        }
                    }).catch( err=>{
                        console.log(err);
                    });
    
}

//function that refetches and checks the pushed comment actually exists 
function doubleCheck(commentObj){
    return fetch(`${baseURL}${commLink}${apiKey}`
                  ).then(res=>{
                    return res.json();
                }).then(jsonData=>{
                    return jsonData.find(item=>{
                        return item.id === commentObj.id;
                    });
                })
}

//clear list passed by submitEvent
function clearComments(){
    for(let i=commentsUL.childNodes.length-1; i>=0; i--){
         commentsUL.removeChild(commentsUL.childNodes[i]);
        } 
}

function renderComments(){
  
    for(let i=comArray.length-1; i>=0;i--){
        //call function that builds and displays the comment 
        displayComment(comArray[i]);
    }
}

function displayComment(item){
     //create the three nodes to be added
     let newListItem;
     let newNameChild;
     let newBodyChild;
     let newThumbsChild;
     let newThumbsCounter;
     newListItem= document.createElement('li');
     newListItem.setAttribute("class","comment");

     newNameChild = document.createElement('div');
     newNameChild.setAttribute("class","comment__name");

     newDateChild = document.createElement('div');
     newDateChild.setAttribute("class","comment__date");

     newBodyChild = document.createElement('div');
     newBodyChild.setAttribute("class", "comment__body");
     
     newThumbsChild=document.createElement('div');
     newThumbsChild.setAttribute("class", "comment__thumb");
     let putInit = { method:"PUT"};
    

    //thumbCounter 
    newThumbsCounter=document.createElement('div');
    newThumbsCounter.setAttribute("class","comment__likeCounter");


    // x close button, needs a container so hover registers
    newXChildContainer= document.createElement('div');
    newXChild = document.createElement('a');
    newXChildContainer.setAttribute("class", "comment__delete");
    newXChildContainer.appendChild(newXChild);
    //delete call
    let deleteInit = {method:"DELETE"};
    newXChildContainer.addEventListener('click',()=>fetch(`${baseURL}${commLink}${item.id}${apiKey}`
                                                        ,deleteInit).then(res=>{return res.json();
                                                         }).then(deleted=>{
                                                        //set comArray to array with deleted id filtered out, and re-render comments
                                                             if(deleted.id!=undefined){
                                                                let newArray=comArray.filter(item=>{return item.id!==deleted.id});
                                                                comArray=newArray;
                                                                //get containing comments list 
                                                                let commentsContainer=document.getElementById("existingComments");
                                                                commentsContainer.removeChild(newListItem);
                                                             }
                                                         }));
     
    //creates text nodes
     let textName = document.createTextNode(item.name);
     let textBody = document.createTextNode(item.body);
     let textDate = document.createTextNode(formatDate(item.date));
     let textX = document.createTextNode("❌");
     let likeNum = document.createTextNode(item.likeNum);


     //append text to divs
     newNameChild.appendChild(textName);
     newBodyChild.appendChild(textBody);
     newDateChild.appendChild(textDate);
     newXChild.appendChild(textX);
     newThumbsCounter.appendChild(likeNum);

     //append divs to li
     newListItem.appendChild(newNameChild);
     newListItem.appendChild(newDateChild);
     newListItem.appendChild(newXChildContainer);
     newListItem.appendChild(newBodyChild);
     newListItem.appendChild(newThumbsChild);
     newListItem.appendChild(newThumbsCounter);
     //append li to live ul
     commentsUL.appendChild(newListItem);

     newThumbsChild.addEventListener('click', ()=>{return fetch(`${baseURL}${commLink}${item.id}/like${apiKey}`,putInit).then(res=>{return res.json();
     }).then(comment=>{ 
         
        if(comment.likes != undefined){
            let thumbs = newThumbsCounter;
            newThumbsCounter.innerHTML = '';
            let updatedLikes = document.createTextNode(comment.likes);
            newThumbsCounter.appendChild(updatedLikes);
            
         }}).catch(err =>{
             console.log(err);
         })});
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
        this.id = opts["id"];
    }else{
        this.likeNum=0;
    }
    this.date = date; 
}


                                        