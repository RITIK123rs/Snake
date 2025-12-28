const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const boxSize = 10;
const row = canvas.height / boxSize;
const col = canvas.width / boxSize;
let arrow = "right";

console.log(row, " and ", col, " and ", canvas.width, " and ", canvas.height);
const bodyColor = "#32CD32";
const headColor = "#006400";
const foodColor = "#FF4500";
c.strokeStyle = "rgba(0, 0, 0, 1)";   
c.lineWidth = 1.7;    
let position = new Array();
let food = new Object();
let currentScore = -1;
function start() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelector(".afterBox").style.display = "none";
//   console.log("hs received =", getHS());
  document.querySelector(".scoreBox .hs").innerHTML = getHS();
  arrow = "right";
  position = [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ];
  food = {
    x: 0,
    y: 0,
  };
  currentScore = -1;
  generateFood();
  interval = setInterval(group, 150);
  c.fillStyle = headColor;
  c.fillRect(
    position[0].x * boxSize,
    position[0].y * boxSize,
    boxSize,
    boxSize
  );
  c.strokeRect(position[0].x * boxSize,
    position[0].y * boxSize,
    boxSize,
    boxSize);
  for (i = 1; i < position.length; i++) {
    c.fillStyle = bodyColor;
    c.fillRect(
      position[i].x * boxSize,
      position[i].y * boxSize,
      boxSize,
      boxSize
    );
    c.strokeRect(position[i].x * boxSize,
    position[i].y * boxSize,
    boxSize,
    boxSize);
  }
}

function gameover() {
  document.querySelector(".afterBox .score").innerHTML = currentScore;
  document.querySelector(".afterBox").style.display = "flex";
  setHS();
}

function run() {
  //   console.log(position);
  c.clearRect(0, 0, canvas.width, canvas.height);
  //   console.log(food);
  //   console.log(position[0]);
  var temp = new Object();
  switch (arrow) {
    case "up":
      if (food.x == position[0].x && food.y == position[0].y - 1) {
        position.unshift({ x: position[0].x, y: position[0].y - 1 });
        // console.log("increase body");
        generateFood();
      } else if (
        position[0].y - 1 == -1 ||
        position.some(
          (obj) => position[0].x == obj.x && position[0].y - 1 == obj.y
        )
      ) {
        clearInterval(interval);
        gameover();
      }
      temp.x = position[0].x;
      temp.y = position[0].y - 1;
      break;
    case "down":
      if (food.x == position[0].x && food.y == position[0].y + 1) {
        position.unshift({ x: position[0].x, y: position[0].y + 1 });
        // console.log("increase body");
        generateFood();
      } else if (
        position[0].y + 1 == row ||
        position.some(
          (obj) => position[0].x == obj.x && position[0].y + 1 == obj.y
        )
      ) {
        clearInterval(interval);
        gameover();
      }
      temp.x = position[0].x;
      temp.y = position[0].y + 1;
      break;
    case "left":
      if (food.x == position[0].x - 1 && food.y == position[0].y) {
        position.unshift({ x: position[0].x - 1, y: position[0].y });
        // console.log("increase body");
        generateFood();
      } else if (
        position[0].x - 1 == -1 ||
        position.some(
          (obj) => position[0].x - 1 == obj.x && position[0].y == obj.y
        )
      ) {
        clearInterval(interval);
        gameover();
      }
      temp.x = position[0].x - 1;
      temp.y = position[0].y;
      break;
    case "right":
      if (food.x == position[0].x + 1 && food.y == position[0].y) {
        position.unshift({ x: position[0].x + 1, y: position[0].y });
        // console.log("increase body");
        generateFood();
      } else if (
        position[0].x + 1 == col ||
        position.some(
          (obj) => position[0].x + 1 == obj.x && position[0].y == obj.y
        )
      ) {
        clearInterval(interval);
        gameover();
      }
      temp.x = position[0].x + 1;
      temp.y = position[0].y;
      break;
  }

  position.unshift(temp);
  position.pop();
  //   console.log(temp);
  c.fillStyle = headColor;
  c.fillRect(
    position[0].x * boxSize,
    position[0].y * boxSize,
    boxSize,
    boxSize
  );
  c.strokeRect(position[0].x * boxSize,
    position[0].y * boxSize,
    boxSize,
    boxSize);
  for (i = 1; i < position.length; i++) {
    c.fillStyle = bodyColor;
    c.fillRect(
      position[i].x * boxSize,
      position[i].y * boxSize,
      boxSize,
      boxSize
    );
    c.strokeRect(position[i].x * boxSize,
    position[i].y * boxSize,
    boxSize,
    boxSize);
  }
}

function direction() {
  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp" && arrow != "down") {
      arrow = "up";
    } else if (event.key == "ArrowDown" && arrow != "up") {
      arrow = "down";
    } else if (event.key == "ArrowLeft" && arrow !== "right") {
      arrow = "left";
    } else if (event.key == "ArrowRight" && arrow !== "left") {
      arrow = "right";
    }
  });
  //   console.log("Current direction:", arrow);
}

function generateFood() {
  var temp = new Object();
  do {
    food.x = parseInt(Math.random() * col - 1);
    food.y = parseInt(Math.random() * row - 1);
  } while (position.some((obj) => food.x == obj.x && food.y == obj.y));
  currentScore++;
  //   console.log("food Gererated Sucessfully");
}

function foodLocation() {
  //   console.log("food location set");
  c.fillStyle = foodColor;
  c.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
  c.strokeRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function group() {
  run();
  direction();
  foodLocation();
  document.querySelector(".scoreBox .cs").innerHTML = currentScore;
}

function setHS() {
  console.log("set hs");
  document.cookie.split(";").forEach((item) => {
    var temp = item.split("=");
    if (temp[0].trim() == "Hscore") {
      if (parseInt(temp[1]) < currentScore) {
        console.log("set value =", currentScore);
        document.cookie = `Hscore=${currentScore}; path=/`;
      }
    }
  });
}

function getHS() {
    getValue=0;
  document.cookie.split(";").forEach((item) => {
    var temp = item.split("=");
    if (temp[0].trim() === "Hscore") {
    //     console.log("cookie name =", temp[0]); 
    //   console.log("cookie value =", temp[1]);
      getValue=temp[1];
    }
  }); 
    return getValue;
}
if (!document.cookie) {
  document.cookie = "Hscore=0;";
}

start();
