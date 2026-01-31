// Obtener elementos del DOM
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const title = document.getElementById("title");
const message = document.getElementById("message");
const mainImage = document.getElementById("mainImage");
const buttonContainer = document.getElementById("buttonContainer");
const backgroundMusic = document.getElementById("backgroundMusic");

// Contador de clics en "No"
let noClickCount = 0;
const maxNoClicks = 5; // Número de clics antes de que desaparezca el botón "No"
let yesButtonEnabled = false; // El botón "Sí" está bloqueado inicialmente

// ============================================
// MÚSICA DE FONDO
// ============================================
// Intentar reproducir la música cuando el usuario interactúe con la página
document.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().catch(function(error) {
            console.log("No se pudo reproducir la música automáticamente:", error);
        });
    }
}, { once: true }); // Solo se ejecuta una vez

// Función para cuando se presiona "Sí"
btnYes.addEventListener("click", function() {
    // Solo funciona si el botón "No" ya desapareció
    if (!yesButtonEnabled) {
        // Efecto visual de que está bloqueado
        btnYes.style.animation = "shake 0.5s";
        setTimeout(() => {
            btnYes.style.animation = "";
        }, 500);
        
        // Mostrar mensaje de que debe hacer clic en "No" primero
        message.textContent = "¡Primero debes considerar el 'No'! 🤔";
        message.style.animation = "none";
        setTimeout(() => {
            message.style.animation = "slideUp 0.5s ease";
        }, 10);
        return;
    }
    
    // Cambiar el título
    title.textContent = "¡Yeiii! 💛";
    
    // Cambiar el mensaje
    message.textContent = "Casi que no, ¿eh? 😠";
    
    // Cambiar la imagen
    mainImage.src = "Molli.png";
    mainImage.classList.add("accepted");
    
    // Ocultar el botón "No"
    btnNo.style.display = "none";
    
    // Centrar el botón "Sí" y hacerlo más grande
    btnYes.classList.add("centered");
    btnYes.style.padding = "30px 70px";
    btnYes.style.fontSize = "2.5rem";
    btnYes.textContent = "Att: Ashley 💛";
    btnYes.style.cursor = "default";
    
    // Desactivar el botón después de hacer clic
    btnYes.disabled = true;
    btnYes.style.opacity = "1";
    
    // Agregar animación de confeti (opcional)
    createConfetti();
});

// Función para cuando se presiona "No"
btnNo.addEventListener("click", function() {
    noClickCount++;
    
    // Hacer que el botón "No" se encoja
    btnNo.classList.add("shrinking");
    setTimeout(() => {
        btnNo.classList.remove("shrinking");
    }, 300);
    
    // Hacer que el botón "Sí" crezca
    btnYes.classList.add("growing");
    setTimeout(() => {
        btnYes.classList.remove("growing");
    }, 300);
    
    // Si se alcanza el máximo de clics, ocultar el botón "No"
    if (noClickCount >= maxNoClicks) {
        btnNo.classList.add("hidden");
        setTimeout(() => {
            btnNo.style.display = "none";
            btnYes.classList.add("centered");
            
            // HABILITAR el botón "Sí" después de que desaparezca el "No"
            yesButtonEnabled = true;
            btnYes.style.cursor = "pointer";
            
            // Agregar efecto visual de que ahora está habilitado
            btnYes.style.boxShadow = "0 8px 25px rgba(236, 185, 57, 0.7)";
            btnYes.style.animation = "pulse 1.5s infinite";
            
            // Cambiar el mensaje para indicar que ahora puede hacer clic en "Sí"
            message.textContent = "Ahora sí puedes hacer clic 💛";
        }, 300);
    } else {
        // Reducir el tamaño del botón "No" progresivamente
        const currentPadding = 15 - (noClickCount * 2);
        const currentFontSize = 1.5 - (noClickCount * 0.15);
        btnNo.style.padding = `${currentPadding}px ${currentPadding * 2.5}px`;
        btnNo.style.fontSize = `${currentFontSize}rem`;
    }
    
    // Aumentar el tamaño del botón "Sí" progresivamente
    const newPadding = 20 + (noClickCount * 3);
    const newFontSize = 1.8 + (noClickCount * 0.2);
    btnYes.style.padding = `${newPadding}px ${newPadding * 2.5}px`;
    btnYes.style.fontSize = `${newFontSize}rem`;
    
    // Cambiar mensajes según los clics
    updateNoMessage(noClickCount);
});

// Función para actualizar mensajes cuando se hace clic en "No"
function updateNoMessage(count) {
    const messages = [
        "¿Estás seguro? 🤔",
        "Piénsalo mejor... 🥺",
        "¡Venga, di que sí! 💛",
        "El botón 'Sí' se ve mejor, ¿no? 😊",
        "Última oportunidad... 🎭"
    ];
    
    if (count <= messages.length) {
        message.textContent = messages[count - 1];
        // Animar el mensaje
        message.style.animation = "none";
        setTimeout(() => {
            message.style.animation = "slideUp 0.5s ease";
        }, 10);
    }
}

// Función para crear efecto de confeti (opcional)
function createConfetti() {
    const colors = ['#ecb939', '#f0c75e', '#726255', '#ff69b4', '#ff1493'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.8';
            
            document.body.appendChild(confetti);
            
            // Animación de caída
            const duration = Math.random() * 3 + 2;
            const rotation = Math.random() * 360;
            const xMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 0.8
                },
                { 
                    transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            // Eliminar el confeti después de la animación
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, i * 30);
    }
}

// Agregar efecto hover personalizado
btnYes.addEventListener('mouseenter', function() {
    if (!this.disabled) {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    }
});

btnYes.addEventListener('mouseleave', function() {
    if (!this.disabled) {
        this.style.transform = 'translateY(0) scale(1)';
    }
});

btnNo.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
});

btnNo.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';

});
