var video, htmlTracks;
var trackStatusesDiv;
 
window.onload = function() {
   video = document.querySelector("#videoOne");
   trackStatusesDiv = document.querySelector("#divOne");
   htmlTracks = document.querySelectorAll("track");
   displayTrackStatuses(htmlTracks);
};
 
function displayTrackStatuses(htmlTracks) {
   // displays track info
   for(var i = 0; i < htmlTracks.length; i++) {
     var currentHtmlTrack = htmlTracks[i];
     var currentTextTrack = currentHtmlTrack.track;
     var label = "<li>label = " + currentHtmlTrack.label + "</li>";
     var kind = "<li>kind = "   + currentHtmlTrack.kind + "</li>";
     var lang = "<li>lang = "   + currentHtmlTrack.srclang + "</li>";
     var readyState = "<li>readyState = " + currentHtmlTrack.readyState + "</li>"; //ready state of 2 means subtitle is available, ready state of 0 means not available. 
     var mode = "<li>mode = " +currentTextTrack.mode + "</li>"; //mode is an attribute of textTrack, so have to use textTrack to set it
     trackStatusesDiv.innerHTML += "<li><b>Track:" + i + ":</b></li>"+ "<ul>" + label + kind + lang + readyState + mode + "</ul>";
  }
}

function readContent(track){
    console.log("currently reading content of track ... ");
    displayTrackStatuses(htmlTracks);
}

function getTrack(htmlTrack, callback){
    var textTrack = htmlTracks.track;
    if(htmlTracks.readyState === 2){
        console.log("text track has already been loaded");
        textTrack.mode = "hidden";
        htmlTracks.addEventListener('load', function(e){
            callback(textTrack);
        });
    }
}

function forceLoadTrack(n){
    getTrack(htmlTracks[n], readContent);
}