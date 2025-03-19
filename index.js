let mood = null;
let selectedContainer = null;
const commentElement = document.getElementById("comment");
const moodArr = [
    { "id": 1, "name": "Happy", "emoji": "😊" },
    { "id": 2, "name": "Sad", "emoji": "😢" },
    { "id": 3, "name": "Excited", "emoji": "🎉" },
    { "id": 4, "name": "Angry", "emoji": "😡" },
    { "id": 5, "name": "Relaxed", "emoji": "😌" },
    { "id": 6, "name": "Stressed", "emoji": "😖" },
    { "id": 7, "name": "Tired", "emoji": "😴" },
    { "id": 8, "name": "Confused", "emoji": "😕" },
    { "id": 9, "name": "Loved", "emoji": "❤️" },
    { "id": 10, "name": "Motivated", "emoji": "🔥" },
    { "id": 11, "name": "Bored", "emoji": "😐" },
    { "id": 12, "name": "Anxious", "emoji": "😟" },
    { "id": 13, "name": "Grateful", "emoji": "🙏" },
    { "id": 14, "name": "Hopeful", "emoji": "🌟" },
    { "id": 15, "name": "Lonely", "emoji": "🥺" },
    { "id": 16, "name": "Overwhelmed", "emoji": "😵" },
    { "id": 17, "name": "Proud", "emoji": "😌" },
    { "id": 18, "name": "Jealous", "emoji": "😒" },
    { "id": 19, "name": "Guilty", "emoji": "😞" },
    { "id": 20, "name": "Nervous", "emoji": "😬" },
    { "id": 21, "name": "Inspired", "emoji": "💡" },
    { "id": 22, "name": "Shy", "emoji": "😳" },
    { "id": 23, "name": "Sick", "emoji": "🤒" },
    { "id": 24, "name": "Embarrassed", "emoji": "😳" },
    { "id": 25, "name": "Surprised", "emoji": "😲" },
    { "id": 26, "name": "Energetic", "emoji": "⚡" },
    { "id": 27, "name": "Serene", "emoji": "🌿" },
    { "id": 28, "name": "Frustrated", "emoji": "😤" },
    { "id": 29, "name": "Curious", "emoji": "🤔" },
    { "id": 30, "name": "Content", "emoji": "🙂" }
  ]
  const modalElement = document.querySelector(".modal");
  const moodElement = document.getElementById("mood-container");
  moodArr.forEach((value) => {
    const container = document.createElement("div");
    const emoji = document.createElement("div");
    emoji.innerHTML = value?.emoji;
    const name = document.createElement("span");
    name.innerText = value?.name
    container.classList.add("mood-card")
    container.appendChild(emoji);
    container.appendChild(name);
    moodElement.appendChild(container)
    container.addEventListener("click", () => 
        {
            if(selectedContainer) {
                selectedContainer.style.backgroundColor = "#5353bc";
                selectedContainer = null;
                if(mood === value.id) {
                     mood = null;
                    return
                } else {
                    selectedContainer = container;
                    selectedContainer.style.backgroundColor = "green";
                    mood = value.id
                }
            } else {
                selectedContainer = container;
                selectedContainer.style.backgroundColor = "green";
                mood = value.id
            }
        }
    )
  })
const submitMood = document.getElementById("submit-mood")
submitMood.addEventListener("click", () => {
    const comment = document.getElementById("comment")?.value;
    if(!comment?.length || mood === null) {
        alert("comment and mood are required field")
        return;
    }
    const savedMoods = JSON.parse(localStorage.getItem("moods") || "[]")
    let date = new Date().setHours(0, 0, 0, 0)
    const isExistTodayMood = savedMoods.find((value) => value.date === date);
    if(isExistTodayMood) {
        alert("Today's Mood has been Registered");
        return;
    }
    const dateOfMood = new Date().toDateString()
    savedMoods.push({id: mood, comment,date, dateOfMood })
    localStorage.setItem("moods", JSON.stringify(savedMoods))
    mood = null;
    reset()
    showMoods()
    modalElement.style.display = "none";
})
const modalController = document.getElementById("open-modal")
console.log(modalController)
modalController.addEventListener("click", () => {
    modalElement.style.display = "block"
})
modalElement.addEventListener("click", (e) => {
    reset()
    modalElement.style.display = "none";
})
document.querySelector(".container").addEventListener("click", (event) => event.stopPropagation())
document.querySelector('.close-button').addEventListener("click", () => {
    reset()
    modalElement.style.display = "none";
})
function reset() {
    commentElement.value = "";
    if(selectedContainer)
        selectedContainer.style.backgroundColor = "#5353bc";
    selectedContainer = null
}
function showMoods() {
    try {
        const moods = JSON.parse(localStorage.getItem("moods") || "[]");
        const viewMood = document.querySelector(".pastmoods")
        if(moods.length === 0) {
            viewMood.innerHTML = `<div style="background-color: white; padding: 5px 10px; margin: auto; margin-top: 10px;">List is empty</div>`
            return;
        } else {
            viewMood.innerHTML = ""
        }
        const items = document.createElement("div");
        items.classList.add("past-item-container")
        moods.forEach((obj) => {
            const  {emoji, name} = moodArr.find((value) => value.id === obj?.id)
            const item = document.createElement("div");
            item.classList.add("past-item")
            item.innerHTML = `
                <div class="emoji-name">
                    <span>${emoji}</span> 
                    <span>${name}</span>
                </div>
                <span>${obj?.comment}</span>
                <div class="date-delete">
                    <span>${obj?.dateOfMood}</span> 
                    <span onclick="remove(${obj?.date})">Remove</span>
                </div>
            `;
            
            items.appendChild(item)
        })
        viewMood.appendChild(items)
    } catch(err) {
        localStorage.removeItem("moods")
    }
}
showMoods()
function remove(date) {
    const moods = JSON.parse(localStorage.getItem("moods") || "[]");
    console.log(moods.filter(value => value?.date !== date))
    localStorage.setItem("moods", JSON.stringify(moods.filter(value => value?.date !== date)))
    showMoods()
}