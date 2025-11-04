document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('backgroundAudio');
    const cartaTextoDiv = document.getElementById('cartaTexto');
    const portadaDiv = document.getElementById('portada');
    const iniciarBtn = document.getElementById('iniciarBtn'); // El botón visible
    const reiniciarBtn = document.getElementById('reiniciarBtn');

    // El texto de tu carta (sin cambios)
    const cartaTexto = [
        "Sabes, mi amor, a veces me pierdo en un pensamiento precioso: ¿Qué pasaría si el mundo, solo por un instante, se detuviera justo en este momento?",
        "Imagino un lugar hecho de pura luz, donde la fragancia de tu risa no se desvanezca y donde la felicidad que siento contigo se vuelva aire eterno.",
        "En ese universo sin prisa, cada segundo sería un cofre lleno de magia pura, solo para nosotros.",
        "Podríamos viajar de la mano por galaxias que solo tú y yo conocemos, descubriendo que cada secreto que el universo guarda, palidece al lado de la maravilla que eres.",
        "Pero la verdad, mi vida, es que de nada serviría la eternidad si no la paso mirando tus ojos. El verdadero milagro es hacer que estos recuerdos simples que creamos hoy sean inmortales.",
        "Y mientras este reloj loco de la vida no deja de girar, quiero que sepas que atesoro cada suspiro, cada silencio, cada pequeño segundo que me regalas. Porque al final, tú y yo somos nuestra propia eternidad.",
        "Somos un amor completo, una fuerza que no necesita condiciones ni fronteras. Una verdad tan grande que trasciende el tiempo y el espacio.",
        "Dicen que el tiempo es oro, pero te juro que lo más valioso de este viaje caótico no es el tiempo que nos queda, sino la calidad mágica de con quién lo compartimos.",
        "Y tú... tú eres mi punto de gravedad, mi persona favorita, el hogar al que mi alma siempre quiere volver en este vasto universo.",
        "Así que sigamos, mi amor. Sigamos creando este álbum de recuerdos inmortales, haciendo que cada amanecer cuente y sabiendo que el único tesoro verdadero es este amor que compartimos.",
        "Con el amor que no conoce el fin ni el principio, siempre tuyo,",
        "Kevin."
    ];

    const fadeDelay = 4500;
    let currentLine = 0;
    let timer = null;

    // 1. Inicializar la estructura del texto
    function setupCarta() {
        cartaTextoDiv.innerHTML = '';
        cartaTexto.forEach((text, index) => {
            const newP = document.createElement('p');
            newP.textContent = text;
            newP.id = `linea${index + 1}`;
            newP.classList.add('linea');
            cartaTextoDiv.appendChild(newP);
        });
    }

    // 2. Función para hacer aparecer la siguiente línea
    function showNextLine() {
        if (currentLine < cartaTexto.length) {
            const lineElement = document.getElementById(`linea${currentLine + 1}`);
            if (lineElement) {
                lineElement.classList.add('aparecer');
                currentLine++;
                timer = setTimeout(showNextLine, fadeDelay);
            }
        }
        else if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    // 3. Función de inicio: Oculta la portada, activa audio y texto
    function startPresentation() {
        // Ocultar la portada con un fade out
        portadaDiv.classList.add('fade-out');

        // OCULTAR EL BOTÓN DE INICIO con CSS
        iniciarBtn.style.opacity = '0';
        iniciarBtn.style.pointerEvents = 'none'; // Deja de ser clickeable

        // Reproducir audio
        audioPlayer.play().catch(error => {
            console.error("Error al intentar reproducir audio.", error);
        });

        reiniciarBtn.style.display = 'inline-block'; // Muestra Reiniciar

        // Inicia la secuencia de aparición de texto
        showNextLine();
    }

    // 4. Función de reinicio: Detiene todo y lo prepara para empezar de nuevo
    function restartPresentation() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        audioPlayer.pause();
        audioPlayer.currentTime = 0;

        document.querySelectorAll('.linea').forEach(line => {
            line.classList.remove('aparecer');
        });

        currentLine = 0;

        // Mostrar el botón de Iniciar y la Portada, y ocultar Reiniciar
        iniciarBtn.style.opacity = '1'; // Muestra el botón Iniciar de nuevo
        iniciarBtn.style.pointerEvents = 'auto'; // Vuelve a ser clickeable

        reiniciarBtn.style.display = 'none';
        portadaDiv.classList.remove('fade-out'); // Muestra la portada de nuevo
    }

    // Event Listeners
    iniciarBtn.addEventListener('click', startPresentation);
    reiniciarBtn.addEventListener('click', restartPresentation);

    // Inicializar la estructura al cargar
    setupCarta();
});
