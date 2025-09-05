
// function override(id) {
//     const currentUsername = window.localStorage.getItem("Sec-Sight-current-username");
//     const nowProgress = window.localStorage.getItem("second_sight_whereToContinue");
//     window.localStorage.setItem("Second_Sight_SaveFile_" + currentUsername + "_" + id, nowProgress);

//     window.open("../continue.html", '_self');
// }

// function load(id) {
//     const currentUsername = window.localStorage.getItem("Sec-Sight-current-username");
//     const nowProgress = window.localStorage.getItem("Second_Sight_SaveFile_" + currentUsername + "_" + id);
//     window.localStorage.setItem("second_sight_whereToContinue", nowProgress);

//     window.open("../continue.html", '_self');
// }
const currentUsername = window.localStorage.getItem("Sec-Sight-current-username");
const file = window.localStorage.getItem("second_sight_achievements_" + currentUsername);
let achievements = file ? JSON.parse(file) : {};
let achievementContainers = document.querySelectorAll(".bg1, .bg2");

for (let i = 0; i < achievementContainers.length; i++) {
    console.log(i + "###" + achievementContainers[i]);
    let achievementContainer = achievementContainers[i];
    let stateElement = achievementContainer.querySelector(".achievement-state");
    stateElement.innerHTML = achievements[stateElement.id] ? "已达成" : "未达成";
    if (achievements[stateElement.id]) {
        achievementContainer.style.backgroundImage = 'url(./images/bg1.png)';
    }
}
