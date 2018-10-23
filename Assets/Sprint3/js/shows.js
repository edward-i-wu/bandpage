
fetch("http://project-1-api.herokuapp.com/showdates?api_key=test").then(res=>{
    return res.json(); 
}).then(showDates=>{
    buildTable(showDates);
});

function buildTable(dates){
    let table = document.querySelector("tbody.showsBody");
    let newTr, newtd1, newtd2, newtd3, para1, para2, tbutton,
        p1Text, p2Text, newtd2Text, tbuttonText; 
    for(let i = 0; i< dates.length; i++){
        //create elements
        newTr = document.createElement("tr");
        newTr.setAttribute("class","showsBody__row");

        newtd1 = document.createElement("td");
        newtd1.setAttribute("class","showsBody__cell");
        newtd2 = document.createElement("td");
        newtd2.setAttribute("class","showsBody__cell");
        newtd2Text = document.createTextNode(dates[i].place);
        newtd3 = document.createElement("td");
        newtd3.setAttribute("class","showsBody__cell");
        
        para1 = document.createElement("P");
        p1Text = document.createTextNode(dates[i].date);
        para2= document.createElement("P");
        p2Text = document.createTextNode(dates[i].location);

        tbutton = document.createElement("button");
        tbuttonText= document.createTextNode("GET TICKETS");
        tbutton.setAttribute("class","ticket__button");

        //attach text to correct element
        newtd2.appendChild(newtd2Text);
        para1.appendChild(p1Text);
        para2.appendChild(p2Text);
        tbutton.appendChild(tbuttonText);
        
        //attach correct elements 
        newtd1.appendChild(para1);
        newtd1.appendChild(para2);
        newtd3.appendChild(tbutton);

        newTr.appendChild(newtd1);
        newTr.appendChild(newtd2);
        newTr.appendChild(newtd3);

        table.appendChild(newTr);

        
    }
    //!!! set last row id to lastRow
    newTr.setAttribute("id","lastRow");

    console.log(dates);
}
