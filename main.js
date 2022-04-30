function setup() {
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(400,400);
    object_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Object : Detecting...";
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
    
}

function gotResult(error , results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

status = "";
objects = [];

function preload() {
}

function draw() {
    image(video ,0 ,0 ,400 ,400); 
    if(status != "") {
        object_detector.detect(video , gotResult);
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object : Detected";
            r = random(255);
            g = random(255);
            b = random(255);
            a = random(100,255);
            percent = Math.floor(objects[i].confidence * 100);
            fill(r,g,b,a);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke(r,g,b,a);
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
             document.getElementById("Detected_objects").innerHTML = "Number of objects detected are : " + objects.length; 
                }
    }

}