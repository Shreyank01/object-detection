function setup() {
    canvas = createCanvas(600,400);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Object : Detecting...";
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
    object_detector.detect(img , gotResult);
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

img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg")
}

function draw() {
    image(img ,0 ,0 ,600 ,400); 
    if(status != "") {
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object : Detected";

            percent = Math.floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("Detected_objects").innerHTML = "Detected objects : " + objects[0].label + "," + objects[1].label+ ","+ objects[2].label;
        }
    }

}