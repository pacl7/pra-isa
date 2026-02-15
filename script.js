const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const noMessage = document.getElementById("no-message");

envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
});

if (window.innerWidth > 600) {
   
/* Movimento botão NÃO */
const buttonWrapper = noBtn.parentElement;
const letterContent = document.querySelector(".letter-content");

buttonWrapper.style.position = "absolute";

letterContent.addEventListener("mouseover", (e) => {

    const rect = letterContent.getBoundingClientRect();
    const btnRect = buttonWrapper.getBoundingClientRect();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);

    // Só foge se o mouse estiver perto
    if (distance < 120) {

        const angle = Math.atan2(btnCenterY - mouseY, btnCenterX - mouseX);

        const moveDistance = 80;

        let newLeft = buttonWrapper.offsetLeft + Math.cos(angle) * moveDistance;
        let newTop = buttonWrapper.offsetTop + Math.sin(angle) * moveDistance;

        // limites dentro da parte branca
        const maxX = letterContent.clientWidth - btnRect.width;
        const maxY = letterContent.clientHeight - btnRect.height;

        newLeft = Math.max(0, Math.min(maxX, newLeft));
        newTop = Math.max(0, Math.min(maxY, newTop));

        buttonWrapper.style.left = newLeft + "px";
        buttonWrapper.style.top = newTop + "px";
    }
});
noBtn.addEventListener("mouseover", () => {
    const moveX = Math.random() * 150 - 75;
    const moveY = Math.random() * 150 - 75;
    noBtn.parentElement.style.transform =
        `translate(${moveX}px, ${moveY}px)`;
});
}

/* Messaggi */
const noMessages = [
    "Você tem certeza?",
    "Acho que clicou sem querer-",
    "Então vai no Sim véi",
    "Por favor",
    "Por favorzinho?",
    "Hein hein?",
    "Você quer mesmo me deixar triste? :<",
    "Mas ce tem certeza?",
    "Eu te imploro T_T",
    "Ele tá alii",
    "É o botão escrito 'Sim' :D",
    "Hmmm e se eu tirar ele..."
];

let count = 0;

noBtn.addEventListener("click", () => {
    if (count < noMessages.length) {
        noMessage.textContent = noMessages[count];
        count++;
    } else {
        noBtn.parentElement.style.display = "none";
        noMessage.textContent = "hehehehehe";
    }
});

/* Botão SIM */
yesBtn.addEventListener("click", () => {
    noMessage.style.display = "none";
    title.textContent = "YAAAAAYYYYYY!! EU TE AMO MUITOOOOOOO❤️❤️❤️";
    catImg.src = "gato_danca.gif";
    buttons.style.display = "none";
    startConfetti();
});

/* Confetti */
function startConfetti() {
    for (let i = 0; i < 1000; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        const size = Math.random() * 8 + 6;
        confetti.style.width = size + "px";
        confetti.style.height = size + "px";

        confetti.style.left = Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            `hsl(${Math.random() * 360}, 100%, 60%)`;

        const duration = Math.random() * 3 + 3;
        confetti.style.animationDuration = duration + "s";

        const delay = Math.random() * 5; // <-- DISTRIBUZIONE TEMPORALE
        confetti.style.animationDelay = delay + "s";

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}
