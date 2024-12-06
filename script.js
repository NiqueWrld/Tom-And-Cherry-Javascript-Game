const jerry = document.querySelector(".jerry");
let score = 0;
let highScore = 0;
let prevHighScore = localStorage.getItem("high-score");

let comments = [
    "Catch me if you can!",
    "You're doing great!",
    "Keep going, you're close to a new high score!",
    "Unstoppable! What a streak!",
    "Wow, you're a pro at this!",
];

if (prevHighScore) {
    highScore = prevHighScore;
}

jerry.addEventListener("mouseover", function () {
    moveJerry();
    setJerrySticker("dance");
    setComment("Nice try! Almost got me!");
});

function moveJerry() {
    jerry.style.top = `${Math.floor(Math.random() * 80)}%`;
    jerry.style.left = `${Math.floor(Math.random() * 80)}%`;
}

jerry.addEventListener("click", function () {
    score++;
    updateScore();
    moveJerry();
    setComment(getDynamicComment());
});

function updateScore() {
    document.querySelector(".score").innerHTML = `<strong>Score:</strong> ${score}`;
    if (score > highScore) {
        highScore = score;
        updateHighScore();
        setComment("New high score! You're amazing!");
    }
}

function updateHighScore() {
    localStorage.setItem("high-score", highScore);
    document.querySelector(".high-score").innerHTML = `<strong>High Score:</strong> ${highScore}`;
}

function setComment(comment) {
    document.querySelector(".comment").innerHTML = comment;
}

function isCursorClose(event, element, threshold = 50) {
    const rect = element.getBoundingClientRect();
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const closestX = Math.max(rect.left, Math.min(cursorX, rect.right));
    const closestY = Math.max(rect.top, Math.min(cursorY, rect.bottom));

    const distance = Math.sqrt(
        (cursorX - closestX) ** 2 + (cursorY - closestY) ** 2
    );

    return distance <= threshold; // Return true if within the threshold
}

document.addEventListener("mousemove", function (event) {
    if (isCursorClose(event, jerry, 100)) {
        setJerrySticker("run");
        setComment("You’re getting close!");
    }
});

function setJerrySticker(sticker) {
    let url;

    switch (sticker) {
        case "run":
            url = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzVydnFhZTFtdXJlbjV6eGpqeWp5ZjdpMDdhdDNzNzlieGhuM2piMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VgzX3nD1QWEj3KWBCy/giphy.webp";
            break;
        case "dance":
            url = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGk0d2k1OHZ6NzdrZ3RidXRyb25vdXZwZGJpaTF4czdoOGZ4aHdpcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/98py5SveIyU4wN0rHt/giphy.gif";
            break;
        default:
            break;
    }

    jerry.style.background = `url(${url})`;
    jerry.style.backgroundSize = "cover"; // Adjusts the image size
    jerry.style.backgroundRepeat = "no-repeat"; // Prevents repeating the image
    jerry.style.backgroundPosition = "center"; // Centers the image
}

function getDynamicComment() {
    if (score < 5) return comments[0];
    if (score < 10) return comments[1];
    if (score < highScore - 2) return comments[2];
    if (score >= highScore) return comments[3];
    return comments[4];
}

updateScore();
updateHighScore();
