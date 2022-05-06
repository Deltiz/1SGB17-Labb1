//Laboration 1
'use strict';

//GET & POST!
//npm install nodemon  ->in terminal type this to run "./node_modules/.bin/nodemon"
//npm install express
//npm install jsdom
//npm install body-parser
//npm init

const express = require('express');
const jsDOM = require('jsdom');
const fs = require('fs');
const bloggArray = require('./blogPosts.js');
let app = express();

//express.static middleware...
app.use('/public', express.static(__dirname + '/static'));
app.use('/public/images', express.static(__dirname + '/static'));
//express.urlencoded middleware...
app.use(express.urlencoded( {extended : true}));
//Lyssnar på port 81
app.listen(3009, function() {
    console.log('Servern är igång! på port 81. Avbryt med ctrl-c');
});


//GET svar till browser (IE / Crome etc)
app.get('/', function(request, response){
    console.log('En utskrift från get......');
    console.log(bloggArray.blogPosts[0].nickName);
    response.sendFile(__dirname + '/index.html');
});



//GET GET svar till browser (IE / Crome etc)
app.get('/skriv', function(request, response){
    console.log('En utskrift från get......');
    response.sendFile(__dirname + '/skriv.html');
});

//POST svar ifrån browser (IE / Crome etc)
app.post('/skriv', function(request, response) {
    console.log('En utskrift från post...');
    console.log( request.body.subject );
    console.log( request.body.msgbody );
    console.log( request.body.nickname );
    console.log( request.body.timestamp );
    let now = new Date();
// shows current date/time
 console.log( now );

    
    //response.sendFile(__dirname + '/static/html/index.html');
    fs.readFile(__dirname + '/index.html', function(error, data) {

        if( error ){
            console.log('Något gick fel...'); //Kanske något att fixa till för er...
        } else {
           // console.log( data.toString() ); // Om man vill kolla den html kod som läses in.

            //Ngt att fixa är kontrollen för att det finns ngt i nickname...

            let htmlCode = data;
            let serverDOM = new jsDOM.JSDOM( htmlCode );
            //let mainNodeRef = serverDOM.window.document.querySelector('main');
            let section = serverDOM.window.document.querySelector('section');
            let h1Ref = serverDOM.window.document.createElement('p');
            let textH1Ref = serverDOM.window.document.createTextNode("Du skrev namnet "+request.body.nickname);
            
                //Där texten ska visas
                let pRefH1 = serverDOM.window.document.createElement('p');
                let pRefH2 = serverDOM.window.document.createElement('h2');
                let pRefH3 = serverDOM.window.document.createElement('p');
                let pRefP = serverDOM.window.document.createElement('p');
                let lineBreak = serverDOM.window.document.createElement('br');
                //texten

                //let pText = serverDOM.window.document.createTextNode( request.body.nickname);//blogArray.blogPosts[0].nickName);

                console.log(bloggArray.blogPosts[0].nickName);
                let pText = serverDOM.window.document.createTextNode( bloggArray.blogPosts[0].nickName);
                pRefH1.appendChild(pText);

                pText = serverDOM.window.document.createTextNode(bloggArray.blogPosts[0].msgSubject);
                pRefH2.appendChild(pText);

                pText = serverDOM.window.document.createTextNode(bloggArray.blogPosts[0].timeStamp);
                
                pRefH3.appendChild(pText);

                pText = serverDOM.window.document.createTextNode(bloggArray.blogPosts[0].msgBody);
                pRefP.appendChild(pText);
                //Där texten ska hamna

                section.appendChild(pRefH2);
                section.appendChild(pRefH3);
                section.appendChild(pRefP);
                section.appendChild(pRefH1);
                            
                htmlCode = serverDOM.serialize();
                response.send( htmlCode );

        }
    });
});

