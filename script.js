let character, scoreDiv;
let speed = 45; 
let score = 0;
window.addEventListener("DOMContentLoaded", ()=>{
    character = document.querySelector(".character");
    scoreDiv = document.querySelector('.score')
    window.addEventListener('keydown', (e)=>{
        console.log(e.key)
        if(!character){
            return;
        }
        if(e.key === "a" || e.key === 'ArrowLeft'){
            character.style.left = (character.offsetLeft - speed) + "px"
        }
        else if(e.key === "d" || e.key === 'ArrowRight'){
            character.style.left = (character.offsetLeft + speed) + "px"
        }
        else if(e.key === "w" || e.key === 'ArrowUp'){
            character.style.top = (character.offsetTop - speed) + "px"
        }
        else if(e.key === "s" || e.key === 'ArrowDown'){
            character.style.top = (character.offsetTop + speed) + "px"
        }

        // after checking the if... this is checked
        gameOver();
    });
    RandomElements();
});
// checks if charecter out of boundry
function gameOver() {
    let characterRect = character.getBoundingClientRect();

    if (
        characterRect.top < 0 ||
        characterRect.bottom > window.innerHeight ||
        characterRect.left < 0 ||
        characterRect.right > window.innerWidth
    ) {
        alert("Game Over!");
        location.reload(); 
    }
}

// creates random element
function RandomElements(){
    // create the element
    let food = document.createElement('div')
    food.classList.add('food');

    // random position and color
    let leftPos = Math.floor(Math.random() * (window.innerWidth - 25));
    let topPos = Math.floor(Math.random() * (window.innerHeight -  25));

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    
    let color = `rgb(${r}, ${g}, ${b})`;
    
    food.style.background = color; 
    food.style.backgroundColor = color; 

    food.style.left = leftPos + 'px';
    food.style.top = topPos + 'px';
    document.body.appendChild(food);

    // Continuously check if the character eats the food
    let intervall = setInterval(()=>{

        if(checkCollision(character, food)){
            score += 5;
            scoreDiv.innerText = "Score : " + score;
            clearInterval(intervall);
            food.remove();
            setTimeout(RandomElements, 500);
        }
    }, 100)
}
// checks for collisions
function checkCollision(character, food) {
    let characterObj = character.getBoundingClientRect(); 
    let foodObj = food.getBoundingClientRect(); 

    return (
        characterObj.left < foodObj.right &&
        characterObj.right > foodObj.left && 
        characterObj.top < foodObj.bottom && 
        characterObj.bottom > foodObj.top 
    );
}