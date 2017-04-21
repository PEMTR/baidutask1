var imagedata = document.images[0];
var image = document.getElementById("image");
var point = [0, 0];
var mouseOverCanvas = false;
var mouseDownCanvas = false;
var rectangle = new Path2D();
var offsetX = 0,
    offsetY = 0;

function canvasMouseOver() {
    mouseOverCanvas = true;
}

function canvasMouseOut() {
    mouseOverCanvas = false;
    mouseDownCanvas = false;
}

function canvasMouseMove(event) {
    if (mouseDownCanvas) {
        var x = event.offsetX - offsetX,
            y = event.offsetY - offsetY;
        if ((point[0] - x + 1024) <= 5184 && point[0] - x > 0) {

            point[0] -= x;

        }

        if ((point[1] - x + 768) <= 3457 && point[1] - x > 0) {

            point[1] -= y;

        }

        if (point[1] < 0)
            point[1] = 0;

        if (point[1] + 768 > 3457)
            point[1] = 3457 - 768;


        var canvas = document.getElementById("bigcanvas");
        var canvasCtx = document.getElementById("bigcanvas").getContext("2d");
        var thumbnail = document.getElementById("thumbnail");
        var thumbnailCtx = thumbnail.getContext("2d");
        canvasCtx.drawImage(imagedata, point[0], point[1], 1024, 768, 0, 0, 1024, 768);
        thumbnailCtx.drawImage(imagedata, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, 300,
            image.naturalHeight / (image.naturalWidth / 300));
        thumbnailCtx.strokeRect((point[0] / image.naturalWidth) * 300, (point[1] / image.naturalHeight) * thumbnail.height, (1024 / image.naturalWidth) * 300, (768 / image.naturalHeight) * image.naturalHeight / (image.naturalWidth / 300));

        offsetX = event.offsetX;
        offsetY = event.offsetY;

    }
}

function canvasMouseDown(event) {
    mouseDownCanvas = true;
    offsetX = event.offsetX;
    offsetY = event.offsetY;


}

function canvasMouseUp() {
    mouseDownCanvas = false;
    var ctx = document.getElementById("bigcanvas").getContext("2d");
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

}

function imageDrag() {
    if (mouseOverCanvas) {

    }
}
var n = 1
var bigcanvas = document.getElementById("bigcanvas");
bigcanvas.addEventListener("mouseover", canvasMouseOver, false);
bigcanvas.addEventListener("mouseout", canvasMouseOut, false);
bigcanvas.addEventListener("mousemove", canvasMouseMove, false);
bigcanvas.addEventListener("mousedown", canvasMouseDown, false);
bigcanvas.addEventListener("mouseup", canvasMouseUp, false);

function run() {
    var canvasCtx = document.getElementById("bigcanvas").getContext("2d");
    var thumbnail = document.getElementById("thumbnail");
    var thumbnailCtx = thumbnail.getContext("2d");




    thumbnail.height = image.naturalHeight / (image.naturalWidth / 300);
    rectangle.rect(0, 0, (1024 / image.naturalWidth) * 300, (768 / image.naturalHeight) * image.naturalHeight / (image.naturalWidth / 300))

    thumbnailCtx.drawImage(imagedata, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, 300,
        image.naturalHeight / (image.naturalWidth / 300));
    canvasCtx.drawImage(imagedata, point[0], point[1], point[0] + 1024, point[1] + 768, 0, 0, 1024, 768);
    thumbnailCtx.stroke(rectangle)
}

function drawThumbnail(x, y, w, h) {
    var thumbnail = document.getElementById("thumbnail");
    var ctx = thumbnail.getContext("2d");

    ctx.drawImage(imagedata, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, 300,
        image.naturalHeight / (image.naturalWidth / 300));
    ctx.strokeRect(0, 0, (1024 / image.naturalWidth) * 300, (768 / image.naturalHeight) * image.naturalHeight / (image.naturalWidth / 300));

}
