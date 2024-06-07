function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.querySelector(".play-button");
    playButton.addEventListener("click", function () {
        alert("Game starting!");
    });
});
