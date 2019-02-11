//read in file
var fileReadIn = "";
function readTextFile(file){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
        if(rawFile.readyState === 4){
            if(rawFile.status === 200 || rawFile.status == 0){
                var allText = rawFile.responseText;
                fileReadIn = allText;            
            }
        }
    }
    rawFile.send(null);
}

//list of destinations, saved under their IATA code for ease of redirection using the flight comparison website
var places = ["bcn","par","jac","muc","vte","fnj","bru","lis"];
var place = places[Math.floor(Math.random()*places.length)];
//read text 
readTextFile("images/" + place + "/" + place + ".txt");

function fillPage(){
    fileReadIn = fileReadIn.split("\n");
    var body = document.body, tbl = document.createElement('table');
    
    //add image
    var image = document.createElement('img');
    image.setAttribute("src","images/" + place + "/" + place + ".jpg");
    body.appendChild(image);

    //create table of facts, incrementing by 2 because each element is 2-fold
    //head e.g. 'Location' and relevant data e.g. 'Barcelona'
    for(var i = 0; i < fileReadIn.length; i = i+2){
        var row = tbl.insertRow();
        var head = row.insertCell();
        head.innerHTML = fileReadIn[i];
        head.style.fontWeight = 'bold';
        var tail = row.insertCell();
        tail.innerHTML = fileReadIn[i+1];
    }
    //add table
    body.appendChild(tbl);

    /add button
    var btn = document.createElement('button');
    btn.id = "flightButton";
    var txt = document.createTextNode("Cheap Flight");
    btn.appendChild(txt);
    body.appendChild(btn);
    //open in new tab
    btn.onclick = function(){
        window.open("https://www.skyscanner.ie/transport/flights/dub/" + place +"/"
            +"?adults=1&children=0&adultsv2=1&childrenv2=&infants=0&cabinclass=economy&rtn="
            +"1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false",'_blank');
    }   
}

//run function
fillPage();
