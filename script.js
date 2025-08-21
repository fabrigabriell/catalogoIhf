document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const contentSections = document.querySelectorAll('.content-section');
    const ruleSelect = document.getElementById('rule-select');
    const ruleContentDiv = document.getElementById('rule-content');
    const quizRuleSelect = document.getElementById('quiz-rule-select');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const questionContainer = document.getElementById('question-container');
    const quizFeedback = document.getElementById('quiz-feedback');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const quizResultsDiv = document.getElementById('quiz-results');
    
    const navigateButtons = document.querySelectorAll('[data-navigate]');

    let currentQuizQuestions = [];
    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;

    const catalogData = {
        "Regla 1": [
            {
                "question_es": "¿Cuáles son las medidas indicadas por las Reglas para el terreno de juego?",
                "options_es": ["40 x 20 metros", "42 x 20 metros", "38 x 18 metros", "Largo entre 38 y 42 metros, ancho entre 18 y 22 metros"],
                "answer_es": "40 x 20 metros",
                "question_en": "What are the measurements of the playing court according to the rules?",
                "options_en": ["40 x 20 metres", "42 x 20 metres", "38 x 18 metres", "Length between 38 and 42, width between 18 and 22 metres"],
                "answer_en": "40 x 20 metres"
            },
            {
                "question_es": "¿Cuáles son las medidas interiores de la portería?",
                "options_es": ["1,92 x 2,92 metros", "2,00 x 3,00 metros", "2,05 x 3,05 metros", "2,08 x 3,08 metros"],
                "answer_es": "2,00 x 3,00 metros",
                "question_en": "What are the required interior measurements of the goal?",
                "options_en": ["1.92 x 2.92 metres", "2.00 x 3.00 metres", "2.05 x 3.05 metres", "2.08 x 3.08 metres"],
                "answer_en": "2.00 x 3.00 metres"
            },
            {
                "question_es": "¿Cuál es el ancho de la línea de gol entre los postes de la portería?",
                "options_es": ["5cm", "6cm", "8cm", "10cm"],
                "answer_es": "8cm",
                "question_en": "How wide is the goal line between the posts?",
                "options_en": ["5cm", "6cm", "8cm", "10cm"],
                "answer_en": "8cm"
            },
            {
                "question_es": "¿Qué afirmaciones son correctas sobre el área del saque de centro?",
                "options_es": ["Consiste en un círculo de 3 metros de diámetro.", "Consiste en un círculo de 4 metros de diámetro.", "El área del saque de centro puede ser de un color diferente al terreno de juego.", "El área del saque de centro puede ser una línea circular.", "El área del saque de centro es obligatoria en todos los eventos de balonmano."],
                "answer_es": ["Consiste en un círculo de 4 metros de diámetro.", "El área del saque de centro puede ser de un color diferente al terreno de juego.", "El área del saque de centro puede ser una línea circular.", "El área del saque de centro es obligatoria en todos los eventos de balonmano."], // Múltiples respuestas correctas
                "question_en": "Which statements are correct about the throw-off area?",
                "options_en": ["It consists of a circle with a diameter of 3 metres.", "It consists of a circle with a diameter of 4 metres.", "The throw-off area can be an area with a different colour than the playing court", "The throw-off area can be a circle line.", "The throw-off area is mandatory for all events in handball."],
                "answer_en": ["It consists of a circle with a diameter of 4 metres.", "The throw-off area can be an area with a different colour than the playing court", "The throw-off area can be a circle line.", "The throw-off area is mandatory for all events in handball."]
            }
        ],
        "Regla 2": [
            {
                "question_es": "El portero BLANCO 1 rechaza un lanzamiento y el balón sale por la línea de gol fuera de la portería justo antes de la señal final automática del reloj público. Los árbitros se dan cuenta de que el partido ha terminado cinco minutos antes de tiempo. Como los jugadores aún están en la pista, se reanuda el juego con:",
                "options_es": ["Saque de portería para equipo BLANCO", "Golpe franco para equipo BLANCO", "Sin toque de silbato", "Después de toque de silbato"],
                "answer_es": "Saque de portería para equipo BLANCO",
                "question_en": "Goalkeeper WHITE 1 deflects a shot, and the ball crosses the outer goal line straight before the automatic final signal from the public clock. The referees realise that the match has ended five minutes early. As the players are still on the court, the game is resumed by:",
                "options_en": ["Goalkeeper throw for WHITE team", "Free throw for WHITE team", "Without whistle signal", "After whistle signal"],
                "answer_en": "Goalkeeper throw for WHITE team"
            },
            {
                "question_es": "Después de sonar la señal automática de final del primer tiempo, el árbitro se da cuenta inmediatamente que la primera parte ha finalizado un minuto antes. ¿Decisión correcta?",
                "options_es": ["Prolongar un minuto el segundo tiempo", "Se pierde ese minuto y no puede ser recuperado", "Después del primer tiempo, primero se juega un minuto en las mismas posiciones que en el primer tiempo, luego se cambian de campo y comienza el segundo tiempo", "Retener a los jugadores en el terreno de juego y jugar el minuto restante"],
                "answer_es": "Retener a los jugadores en el terreno de juego y jugar el minuto restante",
                "question_en": "After the automatic final signal from the public clock sounds for half-time, the referee immediately realises that the first half ended 1 minute too early. Correct decision?",
                "options_en": ["Prolong the second half by 1 minute", "The 1 minute is lost and not made up for.", "After the half-time, first play 1 minute on the same sides as in the first half, then change ends and begin second half normally", "Keep players on the court and have them play the remaining minute"],
                "answer_en": "Keep players on the court and have them play the remaining minute"
            },
            {
                "question_es": "BLANCO 11 efectúa un lanzamiento a portería. El portero NEGRO 1 recepciona el balón. Justo en ese momento suena la señal automática de final de partido. Los árbitros señalan al cronometrador que todavía quedan 30 segundos del segundo tiempo del partido. Todos los jugadores están todavía en el terreno de juego. ¿Cómo debe reanudarse el partido?",
                "options_es": ["Golpe franco para equipo NEGRO", "Saque de portería para equipo NEGRO", "Golpe franco para equipo BLANCO", "Después del toque de silbato", "Sin toque de silbato"],
                "answer_es": "Saque de portería para equipo NEGRO",
                "question_en": "WHITE 11 takes a shot on goal. Goalkeeper BLACK 1 catches the ball – just when the final signal from the public clock sounds. The referees point out to the timekeeper that 30 seconds remain in the second half of the game. All the players are still on the playing court. How should the game be restarted?",
                "options_en": ["Free throw for BLACK team", "Goalkeeper throw for BLACK team", "Free throw for WHITE team", "After whistle signal", "Without whistle signal"],
                "answer_en": "Goalkeeper throw for BLACK team"
            },
            {
                "question_es": "El equipo BLANCO va a ejecutar un golpe franco después de la señal de final de partido. Con este fin, primero BLANCO 3 y después BLANCO 4, abandonan el terreno de juego y son sustituidos en primer lugar por BLANCO 5 y posteriormente por BLANCO 6, quienes entran en el terreno de juego. ¿Cuál(es) de las siguientes afirmación(es) es/son correcta(s)?",
                "options_es": ["El cronometrador hace sonar el silbato e indica que se ha producido un cambio antirreglamentario del equipo BLANCO", "Exclusión de 2’ para BLANCO 4 por cambio antirreglamentario", "Exclusión de 2’ para BLANCO 6 por cambio antirreglamentario", "No hay ninguna razón para que el cronometrador haga sonar el silbato", "Golpe franco para el equipo BLANCO", "Golpe franco para el equipo NEGRO"],
                "answer_es": ["No hay ninguna razón para que el cronometrador haga sonar el silbato", "Golpe franco para el equipo BLANCO"],
                "question_en": "WHITE team is going to execute a free throw after the final whistle. First WHITE 3 and then WHITE 4 leave the court to be replaced by first WHITE 5 and then WHITE 6, who enter the court. Which of the following statements are correct?",
                "options_en": ["The timekeeper whistles and indicates a faulty substitution of WHITE team.", "2-minute suspension for WHITE 4 because of a faulty substitution", "2-minute suspension for WHITE 6 because of a faulty substitution", "There is no reason for the timekeeper to whistle.", "Free throw for WHITE team", "Free throw for BLACK team"],
                "answer_en": ["There is no reason for the timekeeper to whistle.", "Free throw for WHITE team"]
            },
            {
                "question_es": "El equipo NEGRO ejecuta un golpe franco como un lanzamiento directo a portería, poco antes del final del partido. La señal final automática suena justo antes de que el balón entre en la portería. ¿Decisión correcta?",
                "options_es": ["Final de partido", "Repetición del golpe franco para el equipo NEGRO sin toque de silbato", "Repetición del golpe franco para el equipo NEGRO con toque de silbato", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "answer_es": "Final de partido",
                "question_en": "A free throw for BLACK team is taken as a direct shot on goal just before the end of the match. The automatic final signal from the public clock sounds just before the ball enters the goal. Correct decision?",
                "options_en": ["End of the match", "The free throw for BLACK team must be retaken without whistle signal.", "The free throw for BLACK team must be retaken with whistle signal.", "7-metre throw for BLACK team"],
                "answer_en": "End of the match"
            },
            {
                "question_es": "Justo antes del final del partido, NEGRO 2 recibe el balón junto a la línea del área de portería del equipo BLANCO y tiene una clara ocasión de gol. Intenta marcar gol pero se lo impiden haciéndole una falta. Antes que el balón abandone la mano de NEGRO 2, suena la señal de final de partido. ¿Decisión correcta?",
                "options_es": ["Final del partido", "Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO", "Final del partido e informe escrito"],
                "answer_es": "Lanzamiento de 7 metros para el equipo NEGRO",
                "question_en": "Shortly before the end of the match BLACK 2 receives the ball at the goal-area line of WHITE team and has a clear chance of scoring. He tries to score but is prevented by a foul. Before the ball leaves the hand of BLACK 2, the automatic final signal from the public clock sounds. Correct decision?",
                "options_en": ["End of the match", "Free throw for BLACK team", "7-metre throw for BLACK team", "End of the match, note in the match report"],
                "answer_en": "7-metre throw for BLACK team"
            },
            {
                "question_es": "Poco antes de finalizar el primer tiempo, el equipo BLANCO tiene que ejecutar un lanzamiento de 7 metros. El lanzamiento realizado por BLANCO 9 golpea en el larguero, luego en la espalda del portero, que está aproximadamente a 3 metros por delante de su portería, y luego entra en la portería. La señal del cronometrador suena justo cuando el balón iba desde el larguero a la espalda del portero. ¿Cuál es la decisión correcta?",
                "options_es": ["Gol", "Repetición del lanzamiento de 7 metros", "Final del primer tiempo; ninguna otra decisión"],
                "answer_es": "Gol",
                "question_en": "Shortly before the end of the first half, a 7-metre throw for WHITE team has not yet been executed. The 7-metre throw of WHITE 9 hits the crossbar, then the back of the goalkeeper, who is standing approximately 3 metres in front of his goal, and then the ball enters the goal. The automatic final signal from the public clock sounds, when the ball is flying from the crossbar to the goalkeeper’s back. Correct decision?",
                "options_en": ["Goal", "7-metre throw is to be retaken", "Half-time break; no further decision"],
                "answer_en": "Goal"
            },
            {
                "question_es": "Después de finalizar el tiempo de juego, todavía tiene que ejecutarse un lanzamiento de 7 metros. Los árbitros esperan por el resultado inmediato del lanzamiento. ¿Qué árbitro debería entonces dar por finalizado el partido?",
                "options_es": ["El árbitro designado en primer lugar", "Uno de los dos árbitros", "El árbitro de centro", "El árbitro de portería"],
                "answer_es": "Uno de los dos árbitros",
                "question_en": "After the end of the playing time, a 7-metre throw is still to be executed. The referees wait for the immediate result of the throw. Which referee should then end the game?",
                "options_en": ["The first named referee", "One of the two referees", "The court referee", "The goal-line referee"],
                "answer_en": "One of the two referees"
            },
            {
                "question_es": "¿Cuándo comienza el partido?",
                "options_es": ["Cuando el árbitro designado en primer lugar hace sonar su silbato", "Cuando el balón abandona la mano del lanzador", "Cuando el cronometrador pone en marcha el cronómetro o el reloj oficial", "Después del toque de silbato del árbitro central para efectuar el saque de centro"],
                "answer_es": "Después del toque de silbato del árbitro central para efectuar el saque de centro",
                "question_en": "When does the match begin?",
                "options_en": ["When the first named referee whistles", "When the ball leaves the thrower’s hand", "When the timekeeper starts the stopwatch or the public clock", "After the whistle for the throw-off is blown by the court referee"],
                "answer_en": "After the whistle for the throw-off is blown by the court referee"
            },
            {
                "question_es": "Para un desempate por medio de lanzamientos de 7 metros, ¿quién decide qué portería debe usarse?",
                "options_es": ["El equipo que gana el sorteo", "El equipo que pierde el sorteo", "Los árbitros", "El árbitro designado en primer lugar"],
                "answer_es": "Los árbitros",
                "question_en": "For a 7-metre throwing, who decides which goal should be used?",
                "options_en": ["The team that wins the coin toss", "The team that loses the coin toss", "The referees", "The first named referee"],
                "answer_en": "The referees"
            },
            {
                "question_es": "Un golpe franco para el equipo NEGRO debe ejecutarse después de la señal de final de partido. Antes de su ejecución, BLANCO 8 y BLANCO 9 abandonan el terreno de juego al mismo tiempo. Son sustituidos primero por BLANCO 10 e inmediatamente después por BLANCO 11. ¿Cuál(es) de las siguientes respuestas es/son correcta(s)?",
                "options_es": ["El cronometrador pita e indica a los árbitros que ha habido un cambio antirreglamentario del equipo BLANCO.", "Exclusión para BLANCO 10 por cambio antirreglamentario", "Exclusión para BLANCO 11 por cambio antirreglamentario", "El cronometrador no pita dado que no hay ninguna infracción", "BLANCO 11 debe volver a la zona de cambios; o BLANCO 8 o BLANCO 9 deben regresar al terreno de juego"],
                "answer_es": ["El cronometrador no pita dado que no hay ninguna infracción", "BLANCO 11 debe volver a la zona de cambios; o BLANCO 8 o BLANCO 9 deben regresar al terreno de juego"],
                "question_en": "A free throw for BLACK team is to be executed after the final signal. Before the execution of the free throw, WHITE 8 and WHITE 9 leave the court at the same time. They are replaced first by WHITE 10 and immediately afterwards by WHITE 11. Which of the following statements are correct?",
                "options_en": ["The timekeeper whistles and indicates to the referees that there has been a faulty substitution by WHITE team", "2-minute suspension for WHITE 10 due to faulty substitution", "2-minute suspension for WHITE 11 due to faulty substitution", "The timekeeper must not whistle, as there is no rule violation.", "WHITE 11 must return to the substitution area; either WHITE 8 or WHITE 9 may re-enter the court"],
                "answer_en": ["The timekeeper must not whistle, as there is no rule violation.", "WHITE 11 must return to the substitution area; either WHITE 8 or WHITE 9 may re-enter the court"]
            },
            {
                "question_es": "Justo antes de finalizar el primer tiempo, BLANCO 7 agrede a NEGRO 5 destruyendo así una clara ocasión de gol. La señal automática suena antes de que el árbitro tenga tiempo de pitar. ¿Decisión correcta?",
                "options_es": ["La primera parte ha finalizado; no hay sanción progresiva para BLANCO 7", "La primera parte ha finalizado; no es posible señalar ni golpe franco ni lanzamiento de 7 metros", "Descalificación para BLANCO 7, informe escrito (la tarjeta roja y la tarjeta azul deben de ser mostradas por los árbitros)", "Lanzamiento de 7 metros para el equipo NEGRO", "Descalificación para BLANCO 7 (tarjeta roja mostrada por los árbitros)"],
                "answer_es": ["Descalificación para BLANCO 7, informe escrito (la tarjeta roja y la tarjeta azul deben de ser mostradas por los árbitros)", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "question_en": "Just before the end of the first half, WHITE 7 assaults BLACK 5 and destroys a clear chance of scoring. The automatic final signal sounds before the referees have time to whistle. Correct decision?",
                "options_en": ["The first half is over; no progressive punishment against WHITE 7", "The first half is over; no free throw or 7-metre throw is possible", "Disqualification of WHITE 7, written report (red and blue cards shown by the referees)", "7-metre throw for BLACK team", "Disqualification of WHITE 7 (red card shown by the referees)"],
                "answer_en": ["Disqualification of WHITE 7, written report (red and blue cards shown by the referees)", "7-metre throw for BLACK team"]
            },
            {
                "question_es": "¿Hasta cuándo puede un árbitro anular un gol que ya ha sido concedido?",
                "options_es": ["Hasta el toque de silbato para el saque de centro", "Hasta el toque de silbato para el final de partido", "Debe anularse si fue conseguido después de que el cronometrador interrumpiera el juego, aunque el saque de centro se hubiera ejecutado antes de la interrupción", "No se puede anular nunca"],
                "answer_es": "Debe anularse si fue conseguido después de que el cronometrador interrumpiera el juego, aunque el saque de centro se hubiera ejecutado antes de la interrupción",
                "question_en": "Up until when can the referees disallow a goal which has been awarded?",
                "options_en": ["Up until the whistle for the throw-off", "Up until the final whistle", "It must be disallowed if it was scored after the timekeeper interrupted the game or if the throw-off was taken before the interruption was noticed.", "It can never be disallowed."],
                "answer_en": "It must be disallowed if it was scored after the timekeeper interrupted the game or if the throw-off was taken before the interruption was noticed."
            },
            {
                "question_es": "Los árbitros acaban de señalar un saque de banda para el equipo BLANCO. En ese momento, el oficial responsable del equipo BLANCO solicita un Tiempo Muerto de Equipo. ¿Cuál(es) de las siguientes situación(es) es/son correcta(s)?",
                "options_es": ["El tiempo muerto de equipo no es posible, dado que el balón no está en juego", "El cronometrador hace sonar la señal, detiene el crono, y realiza la gestoforma Nº15", "Los árbitros confirman el Tiempo Muerto de Equipo para el equipo BLANCO", "El anotador anota el Tiempo Muerto de Equipo en el acta del partido"],
                "answer_es": ["El cronometrador hace sonar la señal, detiene el crono, y realiza la gestoforma Nº15", "Los árbitros confirman el Tiempo Muerto de Equipo para el equipo BLANCO", "El anotador anota el Tiempo Muerto de Equipo en el acta del partido"],
                "question_en": "The referees have just awarded a throw-in for WHITE team. At the same time the responsible team official from WHITE team requests a team time-out. Which of the following statements are correct?",
                "options_en": ["Team time-out is not possible, as the ball is out of play", "The timekeeper whistles, stops the clock and shows hand signal number 15.", "The referees confirm the team time-out for WHITE team.", "The scorekeeper enters the team time-out in the score sheet."],
                "answer_en": ["The timekeeper whistles, stops the clock and shows hand signal number 15.", "The referees confirm the team time-out for WHITE team.", "The scorekeeper enters the team time-out in the score sheet."]
            },
            {
                "question_es": "¿En qué situaciones es obligatorio un Time-out?",
                "options_es": ["Lanzamiento de 7 metros", "Exclusión de 2’", "Influencias externas", "Descalificación"],
                "answer_es": ["Exclusión de 2’", "Influencias externas", "Descalificación"],
                "question_en": "In which of the following situations is a time-out obligatory?",
                "options_en": ["7-metre throw", "2-minute suspension", "External influenc", "Disqualification"],
                "answer_en": ["2-minute suspension", "External influenc", "Disqualification"]
            },
            {
                "question_es": "BLANCO 9 lanza a portería. El portero NEGRO 12 recoge el balón. En ese instante, el cronometrador señala el final del partido. Los árbitros indican al cronometrador que todavía faltan 30 segundos del segundo tiempo. Todos los jugadores están en el terreno de juego. ¿Cómo debe reanudarse el encuentro?",
                "options_es": ["Golpe franco para el equipo NEGRO", "Saque de portería para el equipo NEGRO", "Golpe franco para el equipo BLANCO", "Es necesario toque de silbato para reanudar el juego"],
                "answer_es": "Saque de portería para el equipo NEGRO",
                "question_en": "WHITE 9 shoots on goal. Goalkeeper BLACK 12 catches the ball. At the same time the timekeeper whistles to end the game. The referees point out to the timekeeper that there is 30 seconds left of the second half. All the players have remained on the court. How should the game be restarted?",
                "options_en": ["Free throw for BLACK team", "Goalkeeper throw for BLACK team", "Free throw for WHITE team", "After whistle signal"],
                "answer_en": "Goalkeeper throw for BLACK team"
            },
            {
                "question_es": "Después de finalizar el tiempo habitual de juego con el resultado 20-20, el partido debe continuar hasta determinar un ganador. ¿Decisión correcta?",
                "options_es": ["1 minuto de descanso antes de que la prórroga comience", "5 minutos de descanso antes de que la prórroga comience", "1 minuto de descanso al final de la primera parte de la prórroga", "5 minutos de descanso al final de la primera parte de la prórroga"],
                "answer_es": "1 minuto de descanso antes de que la prórroga comience",
                "question_en": "After the regular playing time has ended with the result 20:20, the game must be continued until a winner has been determined. Correct decision?",
                "options_en": ["One-minute break before overtime starts", "Five-minute break before overtime starts", "One-minute break at the end of the first half of overtime", ".d) Five-minute break at the end of the first half of overtime"],
                "answer_en": "One-minute break before overtime starts"
            },
            {
                "question_es": "¿En cuáles de las siguientes situaciones es obligatorio un Time-out?",
                "options_es": ["Exclusión de 2’", "Golpe franco", "Juego pasivo", "Cambio antirreglamentario", "Amonestación", "Saque de banda"],
                "answer_es": ["Exclusión de 2’", "Cambio antirreglamentario"],
                "question_en": "In which of the following situations is a time-out obligatory?",
                "options_en": ["2-minute suspension", "Free throw", "Passive play", "Faulty substitution", "Warning", "Throw-in"],
                "answer_en": ["2-minute suspension", "Faulty substitution"]
            },
            {
                "question_es": "¿A quién no se le permite participar en los lanzamientos de 7 metros cuando el partido está todavía empatado después de las prórrogas?",
                "options_es": ["Un jugador que insulta a los árbitros justo después de que la prórroga haya finalizado", "Los porteros", "Un jugador cuya exclusión de 2’ no ha finalizado al final de la prórroga", "Un jugador descalificado", "Un jugador que ha recibido atención médica en la pista y aun no se han producido tres ataques de su equipo"],
                "answer_es": ["Un jugador cuya exclusión de 2’ no ha finalizado al final de la prórroga", "Un jugador descalificado"],
                "question_en": "Who is not allowed to participate in the 7-metre throwing, when a game is still tied after overtime?",
                "options_en": ["A player who insults the referees just after overtime has finished", "The goalkeepers", "A player whose 2-minute suspension had not expired at the end of overtime", "A disqualified player", "A player, who has received medical care on the court and has not yet served 3 attacks from his team"],
                "answer_en": ["A player whose 2-minute suspension had not expired at the end of overtime", "A disqualified player"]
            },
            {
                "question_es": "El portero BLANCO 12 despeja un lanzamiento 5 segundos antes de finalizar el partido. El balón toca el techo sobre el área de portería. La señal automática de final de partido suena inmediatamente antes de que el saque de banda sea ejecutado por el equipo NEGRO. ¿Decisión correcta?",
                "options_es": ["Saque de banda para el equipo NEGRO después de un toque de silbato", "Time–out", "Final del partido", "Esperar al resultado del saque de banda; después el partido termina"],
                "answer_es": "Final del partido",
                "question_en": "Five seconds before the end of the game, goalkeeper WHITE 12 stops a shot. The ball hits the ceiling above the goal area. The automatic final signal sounds immediately before the throw-in is executed by BLACK team. Correct decision?",
                "options_en": ["Throw-in for BLACK team after whistle signal", "Time-out", "The game is over.", "Wait for the result of the throw-in, thereafter the game is over"],
                "answer_en": "The game is over."
            },
            {
                "question_es": "NEGRO 8 ya ha recibido una amonestación. Durante un Tiempo Muerto de Equipo, NEGRO 8 está sentado en el banquillo de suplentes y se dirige a los árbitros de manera antideportiva. ¿Decisión correcta?",
                "options_es": ["Descalificación para NEGRO 8 (los árbitros muestran la tarjeta roja)", "Exclusión de 2’ para NEGRO 8", "Amonestación para NEGRO 8", "Ninguna acción es posible", "El equipo NEGRO se verá reducido en un jugador en pista durante 2 minutos desde el reinicio del partido después del Tiempo Muerto de Equipo"],
                "answer_es": ["Descalificación para NEGRO 8 (los árbitros muestran la tarjeta roja)", "El equipo NEGRO se verá reducido en un jugador en pista durante 2 minutos desde el reinicio del partido después del Tiempo Muerto de Equipo"],
                "question_en": "BLACK 8 has already received a warning. During a team time-out he sits on the bench and comments on the referees in an unsportsmanlike manner. Correct decision?",
                "options_en": ["Disqualification of BLACK 8 (red card shown by the referees)", "2-minute suspension for BLACK 8", "Warning for BLACK 8", "No action possible", "BLACK team will be reduced by 1 player on the court for 2minutes from the restart of the match after the team time-out."],
                "answer_en": ["Disqualification of BLACK 8 (red card shown by the referees)", "BLACK team will be reduced by 1 player on the court for 2minutes from the restart of the match after the team time-out."]
            },
            {
                "question_es": "¿Quién está autorizado a participar en un desempate por medio de lanzamientos de 7 metros?",
                "options_es": ["Todos los jugadores que están incluidos en el acta del partido", "Los jugadores que no han recibido una descalificación", "Los jugadores que no estén cumpliendo una exclusión de 2’ cuando el tiempo de prórroga haya expirado", "Los jugadores que han recibido autorización de los árbitros"],
                "answer_es": ["Los jugadores que no han recibido una descalificación", "Los jugadores que no estén cumpliendo una exclusión de 2’ cuando el tiempo de prórroga haya expirado"],
                "question_en": "Who is entitled to participate in a tie-breaker through 7-metre throws?",
                "options_en": ["All players who are included in the score sheet", "Players who have not received a disqualification", "Players who were not serving a 2-minute suspension when overtime expired", "Players who have received permission from the referees"],
                "answer_en": ["Players who have not received a disqualification", "Players who were not serving a 2-minute suspension when overtime expired"]
            },
            {
                "question_es": "Un golpe franco directo debe ser ejecutado después de la señal automática de final del partido. NEGRO 9 ocupa la posición correcta y lanza a la portería del equipo BLANCO. Cuando el balón sale de la mano de NEGRO 9, hay un pitido desde la mesa del cronometrador. El balón entra en la portería, sin que el portero BLANCO 1 tenga opción. El cronometrador informa a los árbitros de que BLANCO 7, que estaba dentro del terreno de juego en defensa durante la ejecución del golpe franco, había entrado en el terreno para sustituir a BLANCO 6 justo antes de que el golpe franco fuera ejecutado. ¿Cuál es la decisión correcta?",
                "options_es": ["Exclusión de 2’ para BLANCO 7", "Descalificación de BLANCO 7 (los árbitros muestran la tarjeta roja)", "Gol para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO", "Repetición del golpe franco para el equipo NEGRO después del toque de silbato"],
                "answer_es": ["Descalificación de BLANCO 7 (los árbitros muestran la tarjeta roja)", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "question_en": "A free throw has still to be executed after the automatic final signal from the public clock. BLACK 9 takes up a correct position and shoots on the goal of WHITE team. When the ball leaves the hand of BLACK 9, there is a whistle signal from the timekeeper. The ball goes into the goal, as goalkeeper WHITE 1 had no chance. The timekeeper informs the referees that WHITE 7, who was on the court in defence during the free throw, had entered the court to substitute WHITE 6, just before the free throw was executed. Correct decision?",
                "options_en": ["2-minute suspension for WHITE 7", "Disqualification of WHITE 7 (red card shown by the referees)", "Goal for BLACK team", "7-metre throw for BLACK team", "Repetition of the free throw for BLACK team after whistle signal"],
                "answer_en": ["Disqualification of WHITE 7 (red card shown by the referees)", "7-metre throw for BLACK team"]
            },
            {
                "question_es": "El partido está todavía empatado después de las prórrogas y las normas exigen una decisión por medio de lanzamientos de 7 metros. BLANCO 7 recibió una exclusión de 2’ en el minuto 9 de la segunda prórroga. Él es designado por el “oficial responsable de equipo” para participar en los lanzamientos de 7 metros. ¿Decisión correcta?",
                "options_es": ["BLANCO 7 está autorizado a participar", "BLANCO 7 no está autorizado a participar"],
                "answer_es": "BLANCO 7 no está autorizado a participar",
                "question_en": "The game is still tied after overtime, and the regulations require a decision through 7-metre throws. WHITE 7 was given a 2-minute suspension after nine minutes in the last overtime period. He is nominated by the responsible team official to participate in the 7-metre throwing. Correct decision?",
                "options_en": ["WHITE 7 is allowed to participate.", "WHITE 7 is not allowed to participate."],
                "answer_en": "WHITE 7 is not allowed to participate."
            },
            {
                "question_es": "¿Cuándo es obligatorio un Time-out?",
                "options_es": ["Cuando un oficial de equipo recibe una exclusión de 2’", "Cuando un jugador recibe su tercera exclusión de 2’", "Después de una conducta antideportiva repetida", "Cuando los árbitros necesitan consultarse entre ellos para tomar una decisión", "Después de una conducta antideportiva grave", "Después de mostrar una tarjeta amarilla a un oficial de equipo"],
                "answer_es": ["Cuando un oficial de equipo recibe una exclusión de 2’", "Cuando un jugador recibe su tercera exclusión de 2’", "Cuando los árbitros necesitan consultarse entre ellos para tomar una decisión", "Después de una conducta antideportiva grave"],
                "question_en": "When is a time-out mandatory?",
                "options_en": ["When a team official has been given a 2-minute suspension", "When a player has been given a third 2-minute suspension", "After repeated unsportsmanlike conduct", "When the referees are required to consult each other to reach a joint decision", "After a seriously unsportsmanlike conduct", "After a yellow card shown to a team official"],
                "answer_en": ["When a team official has been given a 2-minute suspension", "When a player has been given a third 2-minute suspension", "When the referees are required to consult each other to reach a joint decision", "After a seriously unsportsmanlike conduct"]
            },
            {
                "question_es": "Justo antes del final del primer tiempo, BLANCO 7 comete una falta sobre NEGRO 5 quien pierde una clara ocasión de gol. La señal final automática suena antes de que los árbitros tengan tiempo para pitar. ¿Decisión correcta?",
                "options_es": ["La primera parte ha terminado; ninguna otra acción", "Descalificación para BLANCO 7 sin informe escrito (tarjeta roja mostrada por los árbitros)", "Lanzamiento de 7 metros para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Descalificación para BLANCO 7, informe escrito (tarjeta roja y tarjeta azul mostradas por los árbitros)", "El equipo BLANCO será reducido en un jugador en pista durante 2 minutos desde el inicio de la segunda parte."],
                "answer_es": ["Descalificación para BLANCO 7, informe escrito (tarjeta roja y tarjeta azul mostradas por los árbitros)", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "question_en": "Just before the end of the first half, WHITE 7 commits an assault against BLACK 5, who thus misses a clear chance of scoring. The automatic signal from the public clock sounds before the referees have time to whistle. Correct decision?",
                "options_en": ["The first half is over; no further action", "Disqualification of WHITE 7 without written report (red card shown by the referees)", "7-metre throw for BLACK team", "Free throw for BLACK team", "Disqualification of WHITE 7, written report (red and blue cards shown by the referees)", "WHITE team will be reduced by 1 player on the court for 2 minutes from the beginning of the second half."],
                "answer_en": ["Disqualification of WHITE 7, written report (red and blue cards shown by the referees)", "7-metre throw for BLACK team"]
            },
            {
                "question_es": "Un golpe franco debe ser ejecutado después de la señal de final de primer tiempo. ¿Qué jugadores pueden ser sustituidos?",
                "options_es": ["Todos los jugadores de ambos equipos", "Sólo jugadores del equipo defensor", "Sólo jugadores del equipo atacante", "Sólo un jugador del equipo atacante", "Un jugador del equipo defensor por un portero, si el equipo jugaba en el momento de la señal de final jugaba sin portero"],
                "answer_es": "Todos los jugadores de ambos equipos",
                "question_en": "After the whistle signal for half-time, a free throw must still be executed. Which players can still be substituted?",
                "options_en": ["All players of both teams", "Only players of the defending team", "Only players of the attacking team", "1 player from the attacking team", "A court player from the defending team with a goalkeeper, if the team at the time of the final whistle play without goalkeeper"],
                "answer_en": "All players of both teams"
            },
            {
                "question_es": "¿Qué posiciones deben tener los jugadores durante la ejecución de un golpe franco después de la señal de final de partido?",
                "options_es": ["Todos los compañeros del lanzador deben estar fuera de la línea de golpe franco del contrario", "Todos los compañeros del lanzador deben estar en su propia mitad del terreno", "Los contrarios deben estar a 3 metros del lanzador o junto a su propia línea de área de portería", "Todos los compañeros del lanzador deben estar al menos a 3 menos de éste", "Todos los compañeros del lanzador podrán permanecer junto a éste en la línea de golpe franco de los contrarios"],
                "answer_es": ["Todos los compañeros del lanzador deben estar fuera de la línea de golpe franco del contrario", "Los contrarios deben estar a 3 metros del lanzador o junto a su propia línea de área de portería"],
                "question_en": "Which positions must the players assume during the execution of a free throw after the final whistle?",
                "options_en": ["All teammates of the thrower must be outside the free-throw line of the opponents.", "All teammates of the thrower must be in their own half of the court.", "The opponents must be 3 metres away from the thrower or at their own goal-area line.", "All teammates of the thrower must be at least 3 metres away from the thrower.", "All teammates of the thrower may stay together with the thrower at the free-throw line of the opponents."],
                "answer_en": ["All teammates of the thrower must be outside the free-throw line of the opponents.", "The opponents must be 3 metres away from the thrower or at their own goal-area line."]
            },
            {
                "question_es": "El atacante BLANCO 7 pasa el balón a BLANCO 8. En ese momento el cronometrador pita para un Tiempo Muerto del equipo BLANCO. Los árbitros y jugadores no oyen la señal y BLANCO 8 pasa el balón a BLANCO 10 que tiene una clara ocasión de gol. BLANCO 10 es ilegalmente parado por NEGRO 5. Los árbitros conceden un lanzamiento de 7 metros para el equipo BLANCO y una exclusión de 2’ para NEGRO 5. En este momento los árbitros se dan cuenta de que el cronometrador había pitado debido a la solicitud del Tiempo Muerto de Equipo. ¿Decisión correcta?",
                "options_es": ["Lanzamiento de 7 metros para el equipo BLANCO", "Exclusión de 2’ para NEGRO 5", "Tiempo Muerto de Equipo para el equipo BLANCO", "Saque de portería para el equipo NEGRO", "Toque de silbato para reanudar", "Reanudación con golpe franco para el equipo BLANCO en la posición donde se encontraba BLANCO 7 en el momento del toque de silbato del cronometrador"],
                "answer_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "Reanudación con golpe franco para el equipo BLANCO en la posición donde se encontraba BLANCO 7 en el momento del toque de silbato del cronometrador"],
                "question_en": "WHITE 7 passes the ball to WHITE 8. At this moment, the timekeeper whistles for a team time out for WHITE team. The referees and players do not hear this signal, and WHITE 8 passes the ball to WHITE 10, who has a clear chance of scoring. WHITE 10 is illegitimately stopped by BLACK 5. The referees give a 7-metre throw for WHITE team and a 2-minute suspension for BLACK 5. Now, first the referees perceive that the timekeeper has already whistled because of the team time-out request. Correct decision?",
                "options_en": ["7-metre throw for WHITE team", "2-minute suspension for BLACK 5", "Team time-out for WHITE team", "Goalkeeper throw for BLACK team", "Whistle signal for restart", "Restart with a free throw for WHITE team at the position of WHITE 7 at the time of the whistle from the timekeeper"],
                "answer_en": ["Team time-out for WHITE team", "Restart with a free throw for WHITE team at the position of WHITE 7 at the time of the whistle from the timekeeper"]
            },
            {
                "question_es": "La señal automática que indica el final de la primera parte ha sonado 1 minuto demasiado pronto. En el momento del pitido, ningún equipo estaba en posesión del balón y no hubo ninguna infracción (el balón estaba en el suelo, sobre el área de juego). Ambos equipos están todavía en el terreno de juego. ¿Decisión correcta?",
                "options_es": ["El minuto no se juega", "El minuto se juega antes del descanso", "El minuto se juega después del descanso, antes del inicio de la segunda parte", "El minuto es añadido a la segunda parte", "Se decide a través de un sorteo cuál es el equipo que continua en posesión del balón cuando se juegue el minuto", "El último equipo que estaba en posesión del balón es el que continua con la posesión cuando el juego se reanude"],
                "answer_es": "El minuto se juega después del descanso, antes del inicio de la segunda parte",
                "question_en": "The whistle signal ending the first half has come 1 minute too soon. At the time of the whistle signal, neither of the teams were in possession of the ball, and there was no violation of any rule. The ball was on the floor in the playing area. Both teams are still on the court. Correct decision?",
                "options_en": ["The 1 minute is not played.", "The 1 minute is played before the half-time break.", "The 1 minute is played after the half-time break before the start of the second half.", "The 1 minute is added to the second half.", "It is decided through a coin toss which team gets the ball when the 1 minute is played.", "The team that last were in possession of the ball get the ball when the game starts again."],
                "answer_en": "The 1 minute is played after the half-time break before the start of the second half."
            },
            {
                "question_es": "La primera parte del partido ha finalizado 1 minuto demasiado pronto. No ha habido ninguna infracción y el balón estaba en el aire sobre el área de portería. El portero coge el balón después de la señal final. Ambos equipos están todavía en el terreno de juego. ¿Decisión correcta?",
                "options_es": ["El minuto no se juega", "El minuto se juega antes del descanso", "El minuto se juega después del descanso, antes del inicio de la segunda parte", "El minuto es añadido a la segunda parte", "El equipo que estaba en posesión del balón es el que continúa con la posesión cuando el juego se reanude", "El juego se reanuda por medio de un saque de portería"],
                "answer_es": ["El minuto se juega después del descanso, antes del inicio de la segunda parte", "El juego se reanuda por medio de un saque de portería"],
                "question_en": "The first half of the game has been stopped 1 minute too soon. There has been no violation of any rule, and the ball was in the air over the goal area. The goalkeeper catches the ball after the whistle signal. Both teams are still on the court. Correct decision?",
                "options_en": ["The 1 minute is not played.", "The 1 minute is played before the half-time break.", "The 1 minute is played after the half-time break before the start of the second half.", "The 1 minute is added to the second half.", "The team that last were in possession of the ball get the ball when the game starts again.", "The game is restarted with a goalkeeper throw."],
                "answer_en": ["The 1 minute is played after the half-time break before the start of the second half.", "The game is restarted with a goalkeeper throw."]
            },
            {
                "question_es": "La primera parte del partido ha finalizado 1 minuto demasiado pronto. No ha habido ninguna infracción y el balón se encuentra en el aire sobre el área de portería. Después de la señal final, el balón se va por la línea exterior de portería. Ambos equipo están todavía en el terreno de juego. ¿Decisión correcta?",
                "options_es": ["El minuto no se juega", "El minuto se juega antes del descanso", "El minuto se juega después del descanso, antes del inicio de la segunda parte", "El minuto se añade a la segunda parte", "El equipo que estaba en posesión del balón es el que continúa con la posesión cuando el juego se reanude", "El juego se reanuda por medio con un saque de portería"],
                "answer_es": ["El minuto se juega después del descanso, antes del inicio de la segunda parte", "El juego se reanuda por medio con un saque de portería"],
                "question_en": "The first half of the match has been stopped 1 minute too soon. There has been no violation of any rule, and the ball was in the air over the goal area. After the whistle signal, the ball went over the outer goal line. Both teams are still on the court. Correct decision?",
                "options_en": ["The 1 minute is not played.", "The 1 minute is played before the half-time break.", "The 1 minute is played after the half-time break before the start of the second half.", "The 1 minute is added to the second half.", "The team that last were in possession of the ball get the ball when the game starts again.", "The game is restarted with a goalkeeper throw."],
                "answer_en": ["The 1 minute is played after the half-time break before the start of the second half.", "The game is restarted with a goalkeeper throw."]
            },
            {
                "question_es": "El equipo BLANCO ha marcado un gol y el equipo NEGRO quiere realizar un saque de centro rápido. Por eso NEGRO 5 bota rápidamente el balón en dirección a la línea de centro. Mientras hace esto, BLANCO 3 pasa corriendo y con su mano abierta le quita el balón a NEGRO 5. Por este motivo, el balón golpea en el pie de NEGRO 5 y sale rodando por encima de la línea de centro hasta el terreno de juego de los oponentes. ¿Decisión correcta?",
                "options_es": ["Time-out", "Saque de centro para el equipo NEGRO", "Sanción progresiva para BLANCO 3", "Golpe franco para el equipo BLANCO", "Exclusión de 2’ para BLANCO 3"],
                "answer_es": ["Time-out", "Saque de centro para el equipo NEGRO", "Sanción progresiva para BLANCO 3"],
                "question_en": "WHITE team have scored a goal, and BLACK team want to take the throw-off quickly. Therefore, BLACK 5 quickly dribbles the ball in the direction of the centre line. He runs past WHITE 3, who uses an open hand to play the ball away from BLACK 5, so that the ball hits the foot of BLACK 5 and rolls far away over the centre line into the half of WHITE team. Correct decision?",
                "options_en": ["Time-out", "Throw-off for BLACK team", "Progressive punishment against WHITE 3", "Free throw for WHITE team", "Direct 2-minute suspension for WHITE 3"],
                "answer_en": ["Time-out", "Throw-off for BLACK team", "Progressive punishment against WHITE 3"]
            },
            {
                "question_es": "¿En qué situaciones NO es obligatorio un Time-out?",
                "options_es": ["El balón se va lejos del terreno de juego", "El cronometrador hace sonar su silbato", "Un jugador parece estar lesionado", "Cuando los árbitros indican diferentes direcciones al tomar una decisión", "Un jugador de campo es sustituido por un portero para ejecutar un saque de portería"],
                "answer_es": ["El balón se va lejos del terreno de juego", "Un jugador de campo es sustituido por un portero para ejecutar un saque de portería"],
                "question_en": "In which situations is a time-out NOT obligatory?",
                "options_en": ["The ball goes far away from the court", "The timekeeper whistles", "A player seems injured", "When the referees indicate different directions, when making a decision", "A court player’s substitution with a goalkeeper to execute a goalkeeper throw"],
                "answer_en": ["The ball goes far away from the court", "A court player’s substitution with a goalkeeper to execute a goalkeeper throw"]
            },
            {
                "question_es": "¿Quién puede solicitar un Tiempo Muerto de Equipo?",
                "options_es": ["Uno de los oficiales de equipo", "Un jugador", "Solamente el “oficial responsable de equipo”", "El capitán del equipo"],
                "answer_es": "Solamente el “oficial responsable de equipo”",
                "question_en": "Who may request a team time-out?",
                "options_en": ["One of the team officials", "A player", "Only the responsible team official", "The team captain"],
                "answer_en": "Only the responsible team official"
            },
            {
                "question_es": "¿Cuáles de las siguientes afirmaciones sobre el Tiempo Muerto de Equipo son correctas?",
                "options_es": ["El Tiempo Muerto de Equipo sólo puede ser solicitado por el “oficial responsable del equipo”", "Si un Tiempo Muerto de Equipo es solicitado cuando el equipo contrario está en posesión del balón, el cronometrador debe devolver la “tarjeta verde” al oficial", "El periodo de 1 minuto para el Tiempo Muerto de Equipo comienza con el toque de silbato del cronometrador", "Las infracciones a las reglas durante un Tiempo Muerto de Equipo tienen las misas consecuencias que durante el tiempo de juego", "Después de un Tiempo Muerto de Equipo, el partido siempre se reanuda con un lanzamiento a favor del equipo que lo solicitó"],
                "answer_es": ["El Tiempo Muerto de Equipo sólo puede ser solicitado por el “oficial responsable del equipo”", "El periodo de 1 minuto para el Tiempo Muerto de Equipo comienza con el toque de silbato del cronometrador", "Las infracciones a las reglas durante un Tiempo Muerto de Equipo tienen las misas consecuencias que durante el tiempo de juego"],
                "question_en": "Which of the following statements regarding team time-outs are correct?",
                "options_en": ["The team time-out can only be requested by the responsible team official.", "If a team time-out is requested while the opponents are in possession of the ball, the timekeeper must give the green card back to the team official.", "The one-minute period for the team time-out starts when the timekeeper whistles.", "Rule violations during a team time-out have the same consequences as during the playing time.", "Following the team time-out, the game is always restarted with a throw for the team that requested the team time-out."],
                "answer_en": ["The team time-out can only be requested by the responsible team official.", "The one-minute period for the team time-out starts when the timekeeper whistles.", "Rule violations during a team time-out have the same consequences as during the playing time."]
            },
            {
                "question_es": "El equipo BLANCO tiene la posesión del balón. Un oficial del equipo NEGRO solicita un Tiempo Muerto de Equipo colocando la “tarjeta verde” sobre la mesa enfrente del cronometrador. ¿Cuál es la decisión correcta?",
                "options_es": ["La “tarjeta verde” es mostrada en alto sobre la mesa", "El cronometrador pita tan pronto como el equipo NEGRO gane la posesión del balón", "El cronometrador devuelve la “tarjeta verde” al oficial", "Sólo el “oficial responsable de equipo” puede solicitar el Tiempo Muerto de Equipo"],
                "answer_es": "El cronometrador devuelve la “tarjeta verde” al oficial",
                "question_en": "WHITE team is in possession of the ball. Official C from BLACK team requests a team time-out by placing the green card on the table in front of the timekeeper. Correct decision?",
                "options_en": ["The green card is put up on the table.", "The timekeeper whistles as soon as BLACK team gain possession of the ball.", "The timekeeper gives the green card back to the official.", "Only the responsible team official can request a team time-out."],
                "answer_en": "The timekeeper gives the green card back to the official."
            },
            {
                "question_es": "NEGRO 3 lanza a portería. El balón se queda parado en el suelo dentro del área de portería sin que haya sido tocado por ningún otro jugador. En este momento, el “oficial responsable de equipo” del equipo NEGRO solicita un Tiempo Muerto de Equipo. ¿Cuál es la decisión correcta?",
                "options_es": ["El cronometrador pita, detiene el reloj al mismo tiempo e indica a los árbitros el Tiempo Muerto de Equipo para el equipo NEGRO", "El cronometrador devuelve la tarjeta verde al “oficial responsable de equipo” del equipo NEGRO", "El partido se reanuda con un golpe franco a favor del equipo NEGRO", "Saque de portería para el equipo BLANCO"],
                "answer_es": "Saque de portería para el equipo BLANCO",
                "question_en": "BLACK 3 tries to shoot on goal. However, the ball comes to rest on the floor in the goal area without having been touched by any other player. At the same time, the responsible team official of BLACK team requests a team time-out. Correct decision?",
                "options_en": ["The timekeeper whistles, stops the clock at the same time, and indicates the team time-out for BLACK team to the referees.", "The timekeeper gives the green card back to the responsible team official from BLACK team.", "The game is restarted with a free throw for BLACK team.", "Goalkeeper throw for WHITE team"],
                "answer_en": "Goalkeeper throw for WHITE team"
            },
            {
                "question_es": "El portero BLANCO 1 pasa el balón a BLANCO 8, que está solo ante el portero NEGRO 12 junto al área de portería del equipo NEGRO. Justo antes de que el balón le llegue a BLANCO 8, el cronometrador hace sonar el silbato, ya que el entrenador del equipo BLANCO ha solicitado un Tiempo Muerto de Equipo en este desafortunado momento. ¿Cómo debería continuar el partido?",
                "options_es": ["Golpe franco para el equipo BLANCO fuera del área de portería del equipo BLANCO", "Golpe franco para el equipo BLANCO junto a la zona de cambios del equipo BLANCO", "Lanzamiento de 7 metros para el equipo BLANCO", "Golpe franco para el equipo BLANCO junto a la línea de golpe franco del equipo NEGRO"],
                "answer_es": "Golpe franco para el equipo BLANCO junto a la línea de golpe franco del equipo NEGRO",
                "question_en": "Goalkeeper WHITE 1 passes the ball to WHITE 8, who is alone with goalkeeper BLACK 12 near the goal area of BLACK team. Just before the ball gets to WHITE 8, there is a whistle signal from the timekeeper: official A from WHITE team has requested a team time-out. How should the game be continued?",
                "options_en": ["Free throw for WHITE team outside the goal area of WHITE team", "Free throw for WHITE team at the substitution area of WHITE team", "7-metre throw for WHITE team", "Free throw for WHITE team at the free-throw line of BLACK team"],
                "answer_en": "Free throw for WHITE team at the free-throw line of BLACK team"
            },
            {
                "question_es": "BLANCO 4 bloquea un lanzamiento de NEGRO 11. El balón toca el techo sobre el área de portería. Inmediatamente después, el oficial A del equipo NEGRO pone la “tarjeta verde” en la mesa frente al cronometrador. ¿Decisión correcta?",
                "options_es": ["El equipo NEGRO inmediatamente recibe el Tiempo Muerto de Equipo", "El equipo NEGRO no recibe el Tiempo Muerto de Equipo, porque el balón ha tocado el techo", "El equipo NEGRO no recibe el Tiempo Muerto de Equipo, porque el equipo BLANCO tiene la posesión del balón cuando el partido se reanude", "El equipo NEGRO recibe el Tiempo Muerto de Equipo, pero después de que el partido se haya reanudado"],
                "answer_es": "El equipo NEGRO no recibe el Tiempo Muerto de Equipo, porque el equipo BLANCO tiene la posesión del balón cuando el partido se reanude",
                "question_en": "WHITE 4 blocks a shot from BLACK 11. The ball touches the ceiling above the goal area. Immediately after this, official A from BLACK team puts the green card on the table in front of the timekeeper. Correct decision?",
                "options_en": ["BLACK team immediately receive a team time-out.", "BLACK team do not receive a team time-out because the ball touched the ceiling.", "BLACK team do not receive a team time-out because WHITE team have possession of the ball when the game is restarted.", "BLACK team receive a team time-out, but only after the game has restarted."],
                "answer_en": "BLACK team do not receive a team time-out because WHITE team have possession of the ball when the game is restarted."
            },
            {
                "question_es": "El equipo BLANCO tiene posesión de balón y solicita un Tiempo Muerto de Equipo. Los árbitros no escuchan el toque de silbato debido al ruido ambiental. Es después de 10 segundos, cuando el equipo NEGRO tiene posesión del balón, que los árbitros escuchan el toque de silbato. ¿Decisión correcta?",
                "options_es": ["Se concede el Tiempo Muerto de Equipo", "El juego se reanuda con golpe franco para el equipo NEGRO", "El Tiempo Muerto de Equipo no se concede", "El juego se reanuda con golpe franco para el equipo BLANCO"],
                "answer_es": "El Tiempo Muerto de Equipo no se concede",
                "question_en": "WHITE team is in possession of the ball and request a team time-out. Because of the noise, the referees do not hear the whistle signal of the timekeeper. Only after about ten seconds, when BLACK team are in possession of the ball, the referees hear the whistle. Correct decision?",
                "options_en": ["Team time-out is awarded", "The game is restarted with a free throw for BLACK team.", "Team time-out is not awarded", "The game is restarted with a free throw for WHITE team."],
                "answer_en": "Team time-out is not awarded"
            },
            {
                "question_es": "En el 78:00 el jugador BLANCO 7 recibe una exclusión de 2’, más tarde el partido finaliza empatado y las normas requieren una decisión mediante lanzamientos de 7 metros. BLANCO 7 es designado por el oficial responsable del equipo para participar en los lanzamientos de 7 metros. BLANCO 7 ejecuta el lanzamiento de 7 metros y consigue gol. ¿Decisión correcta?",
                "options_es": ["El gol es válido, BLANCO 7 está autorizado a participar", "El gol no es válido, BLANCO 7 no está autorizado a participar", "El lanzamiento se considera fallado", "Descalificación para BLANCO 7"],
                "answer_es": "El gol no es válido, BLANCO 7 no está autorizado a participar",
                "question_en": "At 78:00 player WHITE 7 receives a 2-minute suspension. The match ends in a draw, and the regulations require a decision through 7-metre throws. WHITE 7 is nominated by the responsible team official to participate in the 7-metre throwing. WHITE 7 executes the 7-metre throw and scores a goal. Correct decision?",
                "options_en": ["Goal is valid, WHITE 7 is allowed to participate", "Goal is not valid, WHITE 7 is not allowed to participate", "The throw is considered as failed", "Disqualification for WHITE 7"],
                "answer_en": "Goal is not valid, WHITE 7 is not allowed to participate"
            },
            {
                "question_es": "En el 55:00 el oficial responsable del equipo BLANCO solicita un Tiempo Muerto de Equipo, que es el segundo en el partido. En el 59:00 el mismo oficial responsable de equipo solicita el tercer Tiempo Muerto de Equipo. ¿Decisión correcta?",
                "options_es": ["El Tiempo Muerto de Equipo es posible", "El Tiempo Muerto de Equipo no es posible"],
                "answer_es": "El Tiempo Muerto de Equipo no es posible",
                "question_en": "At 55:00 the responsible team official from WHITE team requests a team time-out, which is the second in the match. At 59:00 the same responsible team official requests the third team time out. Correct decision?",
                "options_en": ["Team time-out is possible", "Team time-out is not possible"],
                "answer_en": "Team time-out is not possible"
            },
            {
                "question_es": "El equipo BLANCO está atacando. El oficial A del equipo BLANCO desea solicitar un Tiempo Muerto de Equipo y se dirige a la mesa para colocar la “tarjeta verde” y la coloca frente al cronometrador. Al mismo tiempo, BLANCO 4 lanza a portería y logra marcar gol. El cronometrador pita por el Tiempo Muerto de Equipo justo después de que el balón rebasase la línea de gol del equipo NEGRO. ¿Cuál es la decisión correcta?",
                "options_es": ["Gol para el equipo BLANCO", "El gol no es válido, porque el equipo BLANCO ha solicitado un Tiempo Muerto de Equipo", "Tiempo Muerto de Equipo para el equipo BLANCO", "No hay Tiempo Muerto para el equipo BLANCO, porque ya no están en posesión del balón", "La “tarjeta verde” debe ser devuelta al equipo", "Saque de centro para el equipo NEGRO"],
                "answer_es": ["Gol para el equipo BLANCO", "Tiempo Muerto de Equipo para el equipo BLANCO", "Saque de centro para el equipo NEGRO"],
                "question_en": "WHITE team is in attack. Official A from WHITE team wishes to request a team time-out and goes to the table to place the green card in front of the timekeeper. The green card is placed on the table in front of the timekeeper. At the same time, WHITE 4 takes a shot on goal and manages to score. The timekeeper whistles for the team time-out just after the ball passes the goal line of BLACK team. What is the correct decision?",
                "options_en": ["Goal for WHITE team", "The goal is not valid, because WHITE team have requested a team time-out.", "Team time-out for WHITE team", "No team time-out for WHITE team, because they are no longer in possession of the ball", "The green card must be returned to the team.", "Throw-off for BLACK team"],
                "answer_en": ["Goal for WHITE team", "Team time-out for WHITE team", "Throw-off for BLACK team"]
            },
            {
                "question_es": "El equipo BLANCO tuvo su segundo Tiempo Muerto de Equipo en el 55:10. En el 59:25, el equipo BLANCO quiere solicitar un tercer Tiempo Muerto de Equipo y coloca la “tarjeta verde” en la mesa frente al cronometrador. El equipo BLANCO está en posesión del balón. El cronometrador pita, detiene el tiempo y señala el Tiempo Muerto de Equipo para el equipo BLANCO. ¿Cuál es la decisión correcta?",
                "options_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "No se concede el Tiempo Muerto de Equipo", "Sanción progresiva para el oficial A del equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo NEGRO"],
                "answer_es": ["No se concede el Tiempo Muerto de Equipo", "Sanción progresiva para el oficial A del equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo NEGRO"],
                "question_en": "WHITE team had their second team time-out at 55:10. At 59:25, official A from WHITE team wants to request a third team time-out for his team and places the green card on the table in front of the timekeeper. WHITE team are in possession of the ball. The timekeeper whistles and stops the clock. He shows a team time-out for WHITE team. What is the correct decision?",
                "options_en": ["Team time-out for WHITE team", "No team time-out granted", "Progressive punishment for official A from WHITE team", "The match is restarted with a free throw for WHITE team.", "The match is restarted with a free throw for BLACK team."],
                "answer_en": ["No team time-out granted", "Progressive punishment for official A from WHITE team", "The match is restarted with a free throw for BLACK team."]
            },
            {
                "question_es": "El equipo BLANCO desea solicitar un Tiempo Muerto de Equipo. El oficial A del equipo BLANCO coloca la “tarjeta verde” en la mesa frente al cronometrador. Al mismo tiempo, BLANCO 9 lanza hacia la portería del equipo NEGRO. El cronometrador pita mientras el balón está en el aire. Poco después del toque de silbato, el portero NEGRO 12 atrapa el balón. ¿Cuál es la decisión correcta?",
                "options_es": ["No hay Tiempo Muerto de Equipo para el equipo BLANCO porque no está en posesión del balón", "Tiempo Muerto de Equipo para el equipo BLANCO", "La “tarjeta verde” se devuelve al equipo BLANCO", "El partido se reinicia con un saque de portería para el equipo NEGRO", "El partido se reinicia con un golpe franco para el equipo BLANCO"],
                "answer_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo BLANCO"],
                "question_en": "WHITE team want to request a team time-out. Official A from WHITE team places the green card on the table in front of the timekeeper. At the same time, WHITE 9 takes a shot on the goal of BLACK team. The timekeeper whistles while the ball is in the air. Shortly after the whistle, goalkeeper BLACK 12 catches the ball. What is the correct decision?",
                "options_en": ["No team time-out possible, because WHITE team are not in possession of the ball", "Team time-out for WHITE team", "The green card is returned to WHITE team.", "The match is restarted with a goalkeeper throw for BLACK team.", "The match is restarted with a free throw for WHITE team."],
                "answer_en": ["Team time-out for WHITE team", "The match is restarted with a free throw for WHITE team."]
            },
            {
                "question_es": "El equipo BLANCO desea solicitar un Tiempo Muerto de Equipo. El oficial A del equipo BLANCO coloca la “tarjeta verde” en la mesa frente al cronometrador. Antes de que el cronometrador conceda el Tiempo Muerto de Equipo, BLANCO 9 lanza a portería. El portero NEGRO 12 bloquea el disparo, y el cronometrador pita mientras el balón rueda dentro del área de portería. ¿Cuál es la decisión correcta?",
                "options_es": ["No hay Tiempo Muerto de Equipo para el equipo BLANCO porque no está en posesión del balón", "Tiempo Muerto de Equipo para el equipo BLANCO", "La “tarjeta verde” se devuelve al equipo BLANCO", "El partido se reinicia con un saque de portería para el equipo NEGRO", "El partido se reinicia con un golpe franco para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo NEGRO"],
                "answer_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo BLANCO"],
                "question_en": "WHITE team want to request a team time-out. Official A from WHITE team places the green card on the table in front of the timekeeper. Before the timekeeper whistles for the team time-out, WHITE 9 takes a shot on goal. The shot is blocked by goalkeeper BLACK 12, and the timekeeper whistles, while the ball is rolling inside the goal area. What is the correct decision?",
                "options_en": ["No team time-out possible because WHITE team are not in possession of the ball.", "Team time-out for WHITE team.", "The green card is returned to WHITE team.", "The match is restarted with a goalkeeper throw for BLACK team.", "The match is restarted with a free throw for WHITE team.", "The match is restarted with a free throw for BLACK team."],
                "answer_en": ["Team time-out for WHITE team.", "The match is restarted with a free throw for WHITE team."]
            },
            {
                "question_es": "El equipo BLANCO desea solicitar un Tiempo Muerto de Equipo. El oficial A del equipo BLANCO coloca la “tarjeta verde” en la mesa frente al cronometrador. Antes de que el cronometrador conceda el Tiempo Muerto de Equipo, BLANCO 9 lanza a portería. El portero NEGRO 12 para el lanzamiento, y el cronometrador pita, mientras que el balón, después de la parada, está en el aire sobre el área de portería. ¿Cuál es la decisión correcta?",
                "options_es": ["No hay Tiempo Muerto de Equipo para el equipo BLANCO porque no está en posesión de la pelota", "Tiempo Muerto de Equipo para el equipo BLANCO", "La “tarjeta verde” se devuelve al equipo BLANCO", "El partido se reinicia con un saque de portería para el equipo NEGRO", "El partido se reinicia con un golpe franco para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo NEGRO"],
                "answer_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo BLANCO"],
                "question_en": "WHITE team want to request a team time-out. Official A from WHITE team places the green card on the table in front of the timekeeper. Before the timekeeper whistles for the team time-out, WHITE 9 takes a shot on goal. The shot is blocked by goalkeeper BLACK 12, and the timekeeper whistles, while the ball, after the save, is in the air above the goal area. What is the correct decision?",
                "options_en": ["No team time-out possible because WHITE team are not in possession of the ball.", "Team time-out for WHITE team.", "The green card is returned to WHITE team.", "The match is restarted with a goalkeeper throw for BLACK team.", "The match is restarted with a free throw for WHITE team.", "The match is restarted with a free throw for BLACK team."],
                "answer_en": ["Team time-out for WHITE team.", "The match is restarted with a free throw for WHITE team."]
            },
            {
                "question_es": "El equipo BLANCO desea solicitar un Tiempo Muerto de Equipo. El oficial A del equipo BLANCO coloca la “tarjeta verde” en la mesa frente al cronometrador. Antes de que el cronometrador conceda el Tiempo Muerto de Equipo, BLANCO 11 comete una falta en ataque. El cronometrador pita por el Tiempo Muerto de Equipo justo antes de que el árbitro pite la falta en ataque. ¿Cuál es la decisión correcta?",
                "options_es": ["Los árbitros deciden que no habrá Tiempo Muerto de Equipo, ya que la falta en ataque se cometió antes de que el cronometrador pitara para el Tiempo Muerto de Equipo", "Tiempo Muerto de Equipo para el equipo BLANCO", "La “tarjeta verde” se devuelve al equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo NEGRO", "El partido se reinicia con un golpe franco para el equipo BLANCO"],
                "answer_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "El partido se reinicia con un golpe franco para el equipo BLANCO"],
                "question_en": "WHITE team want to request a team time-out. Official A from WHITE team places the green card on the table in front of the timekeeper. Before the timekeeper whistles for the team time-out, WHITE 11 commits an offensive foul. The timekeeper whistles for the team time-out just before the referee whistles for the offensive foul. What is the correct decision?",
                "options_en": ["The referees decide that there shall be no team time-out, because the offensive foul had been committed before the timekeeper whistled for the team time-out.", "Team time-out for WHITE team", "The green card is returned to WHITE team.", "The match is restarted with a free throw for BLACK team.", "The match is restarted with a free throw for WHITE team."],
                "answer_en": ["Team time-out for WHITE team", "The match is restarted with a free throw for WHITE team."]
            },
            {
                "question_es": "Se utiliza el sistema electrónico de Tiempo Muerto de Equipo en el partido. El equipo BLANCO tuvo su segundo Tiempo Muerto de Equipo en el 55:10. En el 59:35, el oficial A del equipo BLANCO quiere solicitar un tercer Tiempo Muerto de Equipo y activa el pulsador de bocina de Tiempo Muerto de Equipo. El balón está en juego y el equipo BLANCO está en posesión del balón. Suena la señal automática y el tiempo se para. ¿Cuál es la decisión correcta?",
                "options_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "No se concede Tiempo Muerto de Equipo", "Sanción progresiva para el oficial A del equipo BLANCO", "El partido se reanuda con un golpe franco para el equipo BLANCO", "El partido se reanuda con un golpe franco para el equipo NEGRO", "El equipo NEGRO puede elegir entre golpe franco y lanzamiento de 7 metros"],
                "answer_es": ["No se concede Tiempo Muerto de Equipo", "Sanción progresiva para el oficial A del equipo BLANCO", "El partido se reanuda con un golpe franco para el equipo NEGRO"],
                "question_en": "Electronic team time-out is used in the match. WHITE team had their second team time-out at 55:10. At 59:35, official A from WHITE team wants to request a third team time-out for his team and activates the team time-out buzzer. The ball is in play and WHITE team is in possession of the ball. The signal from the public clock sounds and the clock is stopped. What is the correct decision?",
                "options_en": ["Team time-out for WHITE team.", "No team time-out granted.", "Progressive punishment for official A from WHITE team.", "The match is restarted with a free throw for WHITE team.", "The match is restarted with a free throw for BLACK team.", "BLACK team can choose between free throw and 7-metre throw."],
                "answer_en": ["No team time-out granted.", "Progressive punishment for official A from WHITE team.", "The match is restarted with a free throw for BLACK team."]
            },
            {
                "question_es": "Se utiliza el sistema electrónico de Tiempo Muerto de Equipo en el partido. El equipo BLANCO está en posesión del balón. En el 58:40, BLANCO 7 comete una falta en ataque. Antes de que los árbitros pudieran pitar la falta en ataque, suena la señal automática porque el Oficial A del equipo BLANCO activó el pulsador de bocina de Tiempo Muerto de Equipo para solicitar un Tiempo Muerto de Equipo. Inmediatamente después, los árbitros pitan la falta en ataque contra BLANCO 7. ¿Cuál es la decisión correcta?",
                "options_es": ["El Tiempo Muerto de Equipo no es posible porque el equipo BLANCO ya no está en posesión del balón.", "Tiempo Muerto de Equipo para el equipo BLANCO.", "El equipo BLANCO perderá un Tiempo Muerto de Equipo.", "El partido se reanuda con un golpe franco para el equipo NEGRO.", "El partido se reanuda con un golpe franco para el equipo BLANCO.", "El partido se reanuda con un lanzamiento de 7 metros para el equipo NEGRO.", "El equipo NEGRO puede elegir entre golpe franco y lanzamiento de 7 metros.", "Sanción progresiva para el Oficial A del equipo BLANCO."],
                "answer_es": ["El Tiempo Muerto de Equipo no es posible porque el equipo BLANCO ya no está en posesión del balón.", "El equipo BLANCO perderá un Tiempo Muerto de Equipo.", "El partido se reanuda con un golpe franco para el equipo NEGRO.", "Sanción progresiva para el Oficial A del equipo BLANCO."],
                "question_en": "Electronic team time-out is used in the match. WHITE team is in possession of the ball. At 58:40, WHITE 7 commits an offensive foul. Before the referees were able to whistle for the offensive foul, the signal from the public clock sounds because Official A from WHITE team activated the team time-out buzzer to request a team time-out. Immediately thereafter the referees whistle offensive foul against WHITE 7. What is the correct decision?",
                "options_en": ["Team time-out is not possible because WHITE team is no longer in possession of the ball.", "Team time-out for WHITE team.", "WHITE team will lose one team time-out.", "The match is restarted with a free throw for BLACK team.", "The match is restarted with a free throw for WHITE team.", "The match is restarted with a 7-metre throw for BLACK team.", "BLACK team can choose between free throw and 7-metre throw.", "Progressive punishment against Official A from WHITE team."],
                "answer_en": ["Team time-out is not possible because WHITE team is no longer in possession of the ball.", "WHITE team will lose one team time-out.", "The match is restarted with a free throw for BLACK team.", "Progressive punishment against Official A from WHITE team."]
            },
            {
                "question_es": "Se utiliza el sistema electrónico de Tiempo Muerto de Equipo en el partido. En el 29:50 de la primera parte, BLANCO 9 lanza a portería. El lanzamiento es parado por el portero NEGRO 12 y, tras la parada, el balón queda en el aire por encima del área de portería. En ese momento, suena la señal automática porque el oficial A del equipo NEGRO ha activado el pulsador de bocina para solicitar un Tiempo Muerto de Equipo. ¿Cuál es la decisión correcta?",
                "options_es": ["No hay Tiempo Muerto de Equipo posible porque el equipo NEGRO no está en posesión del balón", "Tiempo Muerto de Equipo para el equipo NEGRO", "El equipo NEGRO perderá un Tiempo Muerto de Equipo.", "El partido se reanuda con un saque de portería para el equipo NEGRO", "El partido se reanuda con un golpe franco para el equipo BLANCO", "El partido se reanuda con un golpe franco para el equipo NEGRO", "El equipo BLANCO puede elegir entre un lanzamiento de 7 metros y un golpe franco", "El partido se reanudará con un lanzamiento de 7 metros para el equipo BLANCO", "Sanción progresiva para el Oficial A del equipo NEGRO"],
                "answer_es": ["No hay Tiempo Muerto de Equipo posible porque el equipo NEGRO no está en posesión del balón", "El equipo NEGRO perderá un Tiempo Muerto de Equipo.", "El partido se reanuda con un saque de portería para el equipo NEGRO", "Sanción progresiva para el Oficial A del equipo NEGRO"],
                "question_en": "Electronic team time-out is used in the match. At 29:50 in the first half, WHITE 9 takes a shot on goal. The shot is blocked by goalkeeper BLACK 12, and after the save, the ball is in the air above the goal area. At that moment, the signal from the public clock sounds because Official A from BLACK team has activated the buzzer to request a team time-out. What is the correct decision?",
                "options_en": ["No team time-out possible because BLACK team are not in possession of the ball.", "Team time-out for BLACK team.", "BLACK team will lose one team time-out.", "The match is restarted with a goalkeeper throw for BLACK team.", "The match is restarted with a free throw for WHITE team.", "The match is restarted with a free throw for BLACK team.", "WHITE team can choose between a 7-metre throw and free throw.", "The match is restarted with a 7-metre throw for WHITE team.", "Progressive punishment against Official A from BLACK team."],
                "answer_en": ["No team time-out possible because BLACK team are not in possession of the ball.", "BLACK team will lose one team time-out.", "The match is restarted with a goalkeeper throw for BLACK team.", "Progressive punishment against Official A from BLACK team."]
            },
            {
                "question_es": "El equipo NEGRO está en ataque. Los árbitros muestran la señal de pasivo. Después de dos pases suena el silbato del delegado porque el oficial A del equipo NEGRO ha solicitado un Tiempo Muerto de Equipo. Ni los árbitros ni los jugadores oyen el silbato y el juego continúa. El cuarto pase del equipo NEGRO va al extremo que tiene una clara ocasión de gol. El extremo salta para lanzar. Al hacerlo, es empujado por BLANCO 4 y pierde parcialmente el control de su cuerpo. El portero para el lanzamiento. Sólo en ese momento los árbitros y los jugadores se dan cuenta de que el delegado interrumpió el partido debido a la solicitud de Tiempo Muerto de Equipo. ¿Cuál es la decisión correcta?",
                "options_es": ["Tiempo Muerto de Equipo para el equipo NEGRO", "El partido se reanuda con un golpe franco para el equipo NEGRO", "El partido se reanuda con un lanzamiento de 7 metros para el equipoNEGRO", "Exclusión de 2 minutos para el equipo BLANCO 4", "No hay ninguna sanción", "La señal de pasivo sigue siendo válida – el equipo NEGRO ha realizado dospases", "La señal de pasivo sigue siendo válida – el equipo NEGRO ha realizado cuatro pases", "La señal de pasivo deja de ser válida porque BLANCO 4 es sancionado con 2 minutos de exclusión"],
                "answer_es": ["Tiempo Muerto de Equipo para el equipo NEGRO", "El partido se reanuda con un lanzamiento de 7 metros para el equipoNEGRO", "Exclusión de 2 minutos para el equipo BLANCO 4", "La señal de pasivo deja de ser válida porque BLANCO 4 es sancionado con 2 minutos de exclusión"],
                "question_en": "BLACK team is in attack. The referees show the forewarning signal. After two passes a whistle sounds from the delegate because Official A from BLACK team has requested a team time out. Neither the referees nor the players hear the whistle, and the game continues. The fourth pass from BLACK team goes to the wing player who has a clear chance of scoring. The wing player jumps to take a shot on goal. By doing so he is pushed by WHITE 4 and he partly loses body control. The goalkeeper saves the shot. Only at that point the referees and the players become aware that the delegate interrupted the match because of the team time-out request. What is the correct decision?",
                "options_en": ["Team time-out for BLACK team.", "The match is restarted with a free throw for BLACK team.", "The match is restarted with a 7-metre throw for BLACK team.", "2-minute suspension for WHITE 4. e) No punishment.", "The forewarning signal is still valid - BLACK team has completed two passes.", "The forewarning signal is still valid – BLACK team has completed four passes.", "The forewarning signal is no longer valid because WHITE 4 is punished with a 2-minute suspension."],
                "answer_en": ["Team time-out for BLACK team.", "The match is restarted with a 7-metre throw for BLACK team.", "2-minute suspension for WHITE 4. e) No punishment.", "The forewarning signal is no longer valid because WHITE 4 is punished with a 2-minute suspension."]
            },
            {
                "question_es": "El equipo BLANCO lanza a portería. El portero NEGRO 1 para el lanzamiento. El balón está botando dentro del área de portería cuando el Oficial A del equipo BLANCO solicita un Tiempo Muerto de Equipo poniendo la “tarjeta verde” delante del cronometrador. El cronometrador pita cuando el balón todavía está botando dentro del área de portería, pero el balón está muy cerca de BLANCO 13 que está completamente solo justo fuera del área de portería. ¿Cuál es la decisión correcta?",
                "options_es": ["Tiempo Muerto de Equipo para el equipo BLANCO", "No hay Tiempo Muerto de Equipo posible y se devuelve la “tarjeta verde” al Oficial A del equipo BLANCO", "Golpe franco para el equipo BLANCO", "Saque de portería para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo BLANCO"],
                "answer_es": ["No hay Tiempo Muerto de Equipo posible y se devuelve la “tarjeta verde” al Oficial A del equipo BLANCO", "Saque de portería para el equipo NEGRO"],
                "question_en": "WHITE team shoots at goal. Goalkeeper BLACK 1 saves the shot. The ball is bouncing inside the goal area when Team Official A from WHITE team requests a team time-out by putting the green card in front of the timekeeper. The timekeeper whistles when the ball is still bouncing inside the goal area, but the ball is very close to WHITE 13 who is completely alone just outside the goal area. What is the correct decision?",
                "options_en": ["Team time-out for WHITE team.", "No team time-out possible, and the green card is handed back to Team Official A from WHITE team.", "Free throw for WHITE team.", "Goalkeeper throw for BLACK team.", "Free throw for BLACK team.", "7-metre throw for WHITE team."],
                "answer_en": ["No team time-out possible, and the green card is handed back to Team Official A from WHITE team.", "Goalkeeper throw for BLACK team."]
            }
        ],
        "Regla 3": [
            {
                "question_es": "¿Cuántos colores puede tener el balón?",
                "options_es": ["1", "2", "3", "Ilimitados"],
                "answer_es": "Ilimitados",
                "question_en": "How many colours is the ball allowed to have?",
                "options_en": ["1", "2", "3", "Unlimited"],
                "answer_en": "Unlimited"
            },
            {
                "question_es": "¿Cuál de estos balones deben elegir los árbitros para un partido masculino?",
                "options_es": ["Circunferencia 57cm, peso 450g", "Circunferencia 58cm, peso 400g", "Circunferencia 59cm, peso 425g", "Circunferencia 60cm, peso 500g"],
                "answer_es": "Circunferencia 59cm, peso 425g",
                "question_en": "Which of the following balls must the referees select for a men’s game?",
                "options_en": ["Circumference 57cm, weight 450g", "Circumference 58cm, weight 400g", "Circumference 59cm, weight 425g", "Circumference 60cm, weight 500g"],
                "answer_en": "Circunference 59cm, weight 425g"
            },
            {
                "question_es": "¿Cuál de estos balones deben elegir los árbitros para un partido femenino?",
                "options_es": ["Circunferencia 53cm, peso 350g", "Circunferencia 54cm, peso 300g", "Circunferencia 55cm, peso 425g", "Circunferencia 56cm, peso 375g"],
                "answer_es": "Circunferencia 54cm, peso 300g",
                "question_en": "Which of the following balls must the referees select for at women’s game?",
                "options_en": ["Circumference 53cm, weight 350g", "Circumference 54cm, weight 300g", "Circumference 55cm, weight 425g", "Circumference 56cm, weight 375g"],
                "answer_en": "Circumference 54cm, weight 300g"
            },
            {
                "question_es": "Los árbitros han decidido poner en juego el balón de reserva. ¿Cuándo debería volver a utilizarse el balón original?",
                "options_es": ["En la próxima interrupción", "No puede ser utilizado de nuevo, excepto si fuera imposible seguir jugando con el balón reserva", "Cuando los árbitros decidan que es necesario utilizarlo otra vez", "Si uno de los equipos lo solicita"],
                "answer_es": "No puede ser utilizado de nuevo, excepto si fuera imposible seguir jugando con el balón reserva",
                "question_en": "The referees have decided to bring the reserve ball into play. When should the original ball be used again?",
                "options_en": ["At the time of the next interruption", "It cannot be used again, unless it becomes impossible to continue to use the reserve ball.", "When the referees find it necessary to use it again", "If one of the teams request it"],
                "answer_en": "It cannot be used again, unless it becomes impossible to continue to use the reserve ball."
            }
        ],
        "Regla 4": [
            {
                "question_es": "Poco antes de comenzar el partido, BLANCO 11 se lesiona gravemente de forma tal que no puede jugar. ¿Decisión correcta?",
                "options_es": ["BLANCO 11 no puede ser reemplazado", "BLANCO 11 puede ser reemplazado si los contrarios están de acuerdo", "Normalmente, el BLANCO 11 puede ser sustituido en el acta del partido y su sustituto puede llevar el número 11. Sin embargo, es posible que los árbitros tengan que observar el reglamento específico de la competición respectiva", "BLANCO 11 puede ser reemplazado pero su sustituto no puede llevar el número 11"],
                "answer_es": "Normalmente, el BLANCO 11 puede ser sustituido en el acta del partido y su sustituto puede llevar el número 11. Sin embargo, es posible que los árbitros tengan que observar el reglamento específico de la competición respectiva",
                "question_en": "Shortly before the beginning of the game, WHITE 11 is severely injured in a way that he is unable to play. Correct decision?",
                "options_en": ["WHITE 11 cannot be replaced.", "WHITE 11 can be replaced if the opponents accept this.", "Normally, WHITE 11 can be replaced in the match report and his substitute can wear number 11. However, the referees may have to observe special deviating regulations for the respective competition.", "WHITE 11 can be replaced, but his substitute cannot wear number 11."],
                "answer_en": "Normally, WHITE 11 can be replaced in the match report and his substitute can wear number 11. However, the referees may have to observe special deviating regulations for the respective competition."
            },
            {
                "question_es": "El equipo NEGRO se presenta con 5 jugadores de pista. El portero no está presente al comienzo del partido. El equipo NEGRO designa al jugador de pista NEGRO 5 como portero. ¿Cuáles son las consecuencias para NEGRO 5?",
                "options_es": ["NEGRO 5 podrá ser utilizado como jugador de pista en cualquier momento cuando realice un cambio correcto", "NEGRO 5 ya no podrá ser utilizado como jugador de pista", "NEGRO 5 podrá ser utilizado como jugador de pista si los oficiales del equipo BLANCO lo aceptan", "NEGRO 5 podrá ser utilizado como jugador de pista tan pronto llegue el portero ausente"],
                "answer_es": "NEGRO 5 podrá ser utilizado como jugador de pista tan pronto llegue el portero ausente",
                "question_en": "BLACK team appear with five court players. The goalkeeper is not present at the beginning of the game. BLACK team appoint court player BLACK 5 as goalkeeper. What are the consequences for BLACK 5?",
                "options_en": ["BLACK 5 can be used as a court player at any time, when he makes a correct substitution.", "BLACK 5 can no longer be used as a court player.", "BLACK 5 can be used as a court player if the officials of WHITE team accept this.", "BLACK 5 can be used as a court player, as soon as the intended goalkeeper is present."],
                "answer_en": "BLACK 5 can be used as a court player, as soon as the intended goalkeeper is present."
            },
            {
                "question_es": "Justo después del inicio del partido, el presidente del equipo BLANCO se sienta en el banquillo con los dos oficiales de equipo, el masajista y el entrenador. ¿Cuáles son las consecuencias?",
                "options_es": ["El portero suplente debe situarse detrás del banquillo", "El presidente del club debe abandonar la zona de cambios", "Uno de los oficiales debe abandonar la zona de cambios", "Quien no esté inscrito en el acta de partido debe abandonar la zona de cambios", "El “oficial responsable de equipo” recibe una sanción progresiva"],
                "answer_es": "Quien no esté inscrito en el acta de partido debe abandonar la zona de cambios",
                "question_en": "Just after the match has started, the club president of WHITE team sits down on the bench in the substitution area with two team officials, the masseur and the coach. What are the consequences?",
                "options_en": ["The substitute goalkeeper must stand behind the bench.", "The club president must leave the substitution area.", "One of the officials must leave the substitution area.", "Whoever is not included in the score sheet must leave the substitution area.", "The responsible team official gets a progressive punishment."],
                "answer_en": "Whoever is not included in the score sheet must leave the substitution area."
            },
            {
                "question_es": "¿Cuál es el número mínimo de jugadores que deben estar presentes en el terreno de juego al inicio del encuentro e inscritos en el acta de partido?",
                "options_es": ["5 jugadores", "4 jugadores de pista y un portero", "5 jugadores de pista y un portero", "6 jugadores de pista"],
                "answer_es": "5 jugadores de pista y un portero",
                "question_en": "What is the minimum number of players that must be present on the court at the beginning of the game and included in the match score sheet?",
                "options_en": ["Five players", "Four court players and one goalkeeper", "Five court players and one goalkeeper", "Six court players"],
                "answer_en": "Five court players and one goalkeeper"
            },
            {
                "question_es": "Cuatro escenarios: ¿Quién está autorizado a participar?",
                "options_es": ["Un jugador que está presente al comienzo del partido y está inscrito en el acta", "Un jugador que no está presente al comienzo del partido pero está inscrito en el acta", "Un jugador que está presente al comienzo del partido pero no está inscrito en el acta", "Un jugador que ha recibido permiso del cronometrador para jugar pero no está inscrito en el acta de partido"],
                "answer_es": ["Un jugador que está presente al comienzo del partido y está inscrito en el acta", "Un jugador que no está presente al comienzo del partido pero está inscrito en el acta"],
                "question_en": "Four scenarios: Who is entitled to participate?",
                "options_en": ["A player who is present at the beginning of the game and entered in the score sheet", "A player who is not present at the beginning of the game but is entered in the score sheet", "A player who is present at the beginning of the game but not entered in the score sheet", "A player who has received permission to play from the timekeeper but is not entered in the score sheet"],
                "answer_en": ["A player who is present at the beginning of the game and entered in the score sheet", "A player who is not present at the beginning of the game but is entered in the score sheet"]
            },
            {
                "question_es": "Al inicio del partido, sólo hay presentes 6 jugadores del equipo BLANCO. Inmediatamente después del inicio del partido llegan el resto de jugadores.El jugador BLANCO 7 entra directamente al terreno de juego desde su zona de cambios. No está incluido en el acta de partido. ¿Decisión correcta?",
                "options_es": ["Descalificación para BLANCO 7", "Exclusión de 2’ para BLANCO 7, que debe ser incluido en el acta de partido", "BLANCO 7 debe ser incluido en el acta de partido", "Sanción progresiva al “oficial responsable de equipo” del equipo BLANCO"],
                "answer_es": "BLANCO 7 debe ser incluido en el acta de partido",
                "question_en": "At the beginning of the game, there are only six players of WHITE team present. Immediately after the start of the game, the missing players arrive. WHITE 7 runs directly out on the playing court through the substitution area. He is not included in the score sheet. Correct decision?",
                "options_en": ["Disqualification of WHITE 7 (red card shown by the referees)", "2-minute suspension for WHITE 7, who must be included in the score sheet", "WHITE 7 must be entered in the score sheet, if this is in accordance with the regulations of the responsible federation", "Progressive punishment against the responsible team official of WHITE team"],
                "answer_en": "WHITE 7 must be entered in the score sheet, if this is in accordance with the regulations of the responsible federation"
            },
            {
                "question_es": "Los árbitros han concedido un golpe franco para el equipo BLANCO junto a la línea de golpe franco del equipo NEGRO. En ese momento el cronometrador hace sonar su silbato y detiene el tiempo. Los árbitros le preguntan por el motivo de su intervención y el cronometrador les informa que BLANCO 9 ha cometido un cambio antirreglamentario. ¿Decisión correcta?",
                "options_es": ["Golpe franco para el equipo BLANCO junto a la línea de golpe franco del equipo NEGRO", "Golpe franco para el equipo NEGRO, junto a su propia línea de golpe franco", "Golpe franco para el equipo NEGRO, desde la zona de cambios del equipo BLANCO", "Exclusión de 2’ para el jugador BLANCO 9"],
                "answer_es": ["Golpe franco para el equipo NEGRO, desde la zona de cambios del equipo BLANCO", "Exclusión de 2’ para el jugador BLANCO 9"],
                "question_en": "The referees have awarded a free throw for WHITE team at the free-throw line of BLACK team. Now, there is a whistle signal from the timekeeper, who stops the clock. The referees enquire about the reason for the intervention. The timekeeper informs the referees that WHITE 9 made a faulty substitution. Correct decision?",
                "options_en": ["Free throw for WHITE team at the free-throw line of BLACK team", "Free throw for BLACK team at the team’s own free-throw line", "Free throw for BLACK team at the substitution area of WHITE team", "2-minute suspension for WHITE 9"],
                "answer_en": ["Free throw for BLACK team at the substitution area of WHITE team", "2-minute suspension for WHITE 9"]
            },
            {
                "question_es": "NEGRO 14 realiza correctamente un cambio reglamentario mientras el partido está interrumpido. No obstante, el cronometrador hace sonar su silbato. NEGRO 14 no aparece en el acta del partido. Se descubre que este jugador está inscrito en el acta con el número 18. ¿Decisión correcta?",
                "options_es": ["Sanción progresiva al “oficial responsable de equipo” del equipo NEGRO", "Golpe franco para el equipo BLANCO junto a la mesa del anotador", "El número del jugador debe ser corregido en el acta de partido", "El juego se reanuda con el lanzamiento correspondiente a la situación del partido. Informe escrito"],
                "answer_es": ["El número del jugador debe ser corregido en el acta de partido", "El juego se reanuda con el lanzamiento correspondiente a la situación del partido. Informe escrito"],
                "question_en": "BLACK 14 makes a correct substitution, while the game is interrupted. However, a whistle comes from the timekeeper’s table. BLACK 14 is not entered correctly in the score sheet. It is found that this player has number 18 in the score sheet. Correct decision?",
                "options_en": ["Progressive punishment against the responsible team official from BLACK team", "Free throw for WHITE team at the timekeeper’s table", "The number is to be corrected in the score sheet.", "The game is continued with the throw corresponding to the situation, and there must be a written report."],
                "answer_en": ["The number is to be corrected in the score sheet.", "The game is continued with the throw corresponding to the situation, and there must be a written report."]
            },
            {
                "question_es": "¿Cuándo está permitido que hasta “dos personas” de un equipo (oficiales de equipo y/o jugadores) penetren en el terreno de juego?",
                "options_es": ["Durante un Time-out", "Durante un Time-out y con la autorización de los árbitros", "Cuando un jugador está lesionado", "Con la autorización del cronometrador"],
                "answer_es": "Durante un Time-out y con la autorización de los árbitros",
                "question_en": "When is it permitted for up to two people from one team (team officials and/or players) to enter the court?",
                "options_en": ["During a match interruption", "During a match interruption and with permission from a referee", "When a player is injured", "With permission from the timekeeper"],
                "answer_en": "During a match interruption and with permission from a referee"
            },
            {
                "question_es": "El árbitro pita e indica un time-out porque el jugador BLANCO 2 ha recibido su tercera exclusión de 2’. Mientras el árbitro se gira para informar al anotador y cronometrador de la descalificación, el “oficial responsable de equipo” del equipo BLANCO penetra en el terreno de juego para protestar la exclusión. Uno de los oficiales del equipo BLANCO ya había sido amonestado previamente. ¿Decisión correcta?",
                "options_es": ["Descalificación al oficial responsable del equipo BLANCO (tarjeta roja mostrada por los árbitros) y reducción de un jugador del equipo BLANCO durante 2’", "Amonestación al oficial responsable del equipo BLANCO", "Descalificación al oficial responsable del equipo BLANCO con informe escrito (tarjetas roja y azul mostradas por los árbitros)", "Exclusión de 2’ al oficial responsable del equipo BLANCO", "Reducción en la pista de un jugador adicional del equipo BLANCO durante 2’"],
                "answer_es": ["Descalificación al oficial responsable del equipo BLANCO con informe escrito (tarjetas roja y azul mostradas por los árbitros)", "Reducción en la pista de un jugador adicional del equipo BLANCO durante 2’"],
                "question_en": "The referee whistles to indicate a time-out because WHITE 2 is being given his third 2-minute suspension. As the referee turns to the timekeeper and scorekeeper to report the disqualification, the responsible team official from WHITE team runs onto the court to protest about the suspension. Team official B from WHITE team has previously already been given a warning. Correct decision?",
                "options_en": ["Disqualification of responsible team official from WHITE team (red card shown by the referees) and a reduction of WHITE team by an additional player for 2 minutes", "Personal warning for responsible team official from WHITE team", "Disqualification of responsible team official from WHITE team with a written report (red and blue cards shown by the referees)", "2-minute suspension for responsible team official from WHITE team", "Reduction of WHITE team by an additional player for 2 minutes on the court"],
                "answer_en": ["Disqualification of responsible team official from WHITE team with a written report (red and blue cards shown by the referees)", "Reduction of WHITE team by an additional player for 2 minutes on the court"]
            },
            {
                "question_es": "Durante un Time-out debido a la lesión de un jugador, BLANCO 2 entra en el terreno de juego sin el permiso de los árbitros. ¿Decisión correcta?",
                "options_es": ["Amonestación para BLANCO 2", "Sanción progresiva para el oficial responsable de equipo del equipo BLANCO", "Descalificación del BLANCO 2 (tarjeta roja mostrada por los árbitros)", "Exclusión de 2’ para BLANCO 2 y reducción en la pista de un jugador en su equipo por 2’"],
                "answer_es": "Exclusión de 2’ para BLANCO 2 y reducción en la pista de un jugador en su equipo por 2’",
                "question_en": "During a time-out due to a player’s injury, WHITE 2 runs onto the court as an additional player although neither one of the referees has given him permission to enter the court. Correct decision?",
                "options_en": ["Warning for WHITE 2", "Progressive punishment against the responsible team official from WHITE team", "Disqualification of WHITE 2 (red card shown by the referees)", "2-minute suspension for WHITE 2 and a reduction of his team by 1 player on the court for 2 minutes"],
                "answer_en": "2-minute suspension for WHITE 2 and a reduction of his team by 1 player on the court for 2 minutes"
            },
            {
                "question_es": "BLANCO 5 está lesionado en la pista y el árbitro central indica un tiempo muerto y da permiso para que dos personas del equipo BLANCO entren en la pista para atender a BLANCO 5. El oficial B del equipo NEGRO también entra en el terreno de juego para dar instrucciones a su portero. ¿Decisión correcta?",
                "options_es": ["Nada, la señal permite entrar en el terreno de juego a todos los jugadores y oficiales", "Los 4 oficiales del equipo NEGRO reciben una amonestación y, si la situación se repite, deben ser descalificados", "El “oficial responsable de equipo” del equipo NEGRO recibe una amonestación", "Sanción progresiva para el oficial B del equipo NEGRO", "Después de recibir atención médica en la pista, BLANCO 5 tiene que abandonar la pista inmediatamente, y solo puede volver a entrar en la pista después del tercer ataque de su equipo"],
                "answer_es": ["Sanción progresiva para el oficial B del equipo NEGRO", "Después de recibir atención médica en la pista, BLANCO 5 tiene que abandonar la pista inmediatamente, y solo puede volver a entrar en la pista después del tercer ataque de su equipo"],
                "question_en": "WHITE 5 is injured on the court, and the court referee indicates a time-out and gives permission for two people from WHITE team to enter the court to assist WHITE 5. Team official B from BLACK team also enters the court to give advice to his goalkeeper. Correct decision?",
                "options_en": ["No decision, the signal allows all players and officials to enter the court.", "All four officials of BLACK team receive a warning and if the episode is repeated they must be disqualified.", "The responsible team official of BLACK team receives a warning.", "Progressive punishment against team official B from BLACK team", "After receiving medical care on the playing court, WHITE 5 has to leave the court immediately, and he can only re-enter the court following the third attack of his team."],
                "answer_en": ["Progressive punishment against team official B from BLACK team", "After receiving medical care on the playing court, WHITE 5 has to leave the court immediately, and he can only re-enter the court following the third attack of his team."]
            },
            {
                "question_es": "El portero BLANCO 16 se ha lesionado y debe ser sustituido por BLANCO 5. El jugador BLANCO 5 se cambia la camiseta. Después de 20 minutos, BLANCO 16 está en condiciones de volver a jugar y el oficial A del equipo BLANCO ordena el cambio. BLANCO 5 se cambia la camiseta y entra en pista como jugador de campo sin advertir al cronometrador. ¿Decisión correcta?",
                "options_es": ["Ninguna sanción, pues está permitido", "Golpe franco para el equipo NEGRO", "Exclusión de 2’ para el jugador BLANCO 5", "Descalificación del jugador BLANCO 5 (tarjeta roja mostrada por los árbitros)"],
                "answer_es": "Exclusión de 2’ para el jugador BLANCO 5",
                "question_en": "Goalkeeper WHITE 16 has been injured and must be replaced by WHITE 5. WHITE 5 changes his shirt. After 20 minutes, WHITE 16 is ready to play again, and the team official A from WHITE team makes a substitution. WHITE 5 changes his shirt again and is sent in as a court player again without notification to the scorekeeper. Correct decision?",
                "options_en": ["No punishment, as this is allowed", "Free throw for BLACK team", "2-minute suspension for WHITE 5", "Disqualification of WHITE 5 (red card shown by the referees)"],
                "answer_en": "2-minute suspension for WHITE 5"
            },
            {
                "question_es": "BLANCO 4 abandona el terreno de juego por fuera de la línea de cambios. Cuando BLANCO 4 ha cruzado la línea de banda, pero no ha llegado aún a la zona de cambios, BLANCO 11 entra en el terreno de juego por el sitio correcto. ¿Cuál es la decisión correcta después de la señal del anotador?",
                "options_es": ["Golpe franco para el equipo NEGRO en el lugar donde BLANCO 4 abandonó el terreno de juego", "Golpe franco para el equipo NEGRO a la altura de la zona de cambios del equipo BLANCO", "Exclusión de 2’ para BLANCO 4", "Exclusión de 2’ para BLANCO 11", "Exclusión de 2’ para BLANCO 4 y BLANCO 11"],
                "answer_es": ["Golpe franco para el equipo NEGRO a la altura de la zona de cambios del equipo BLANCO", "Exclusión de 2’ para BLANCO 4"],
                "question_en": "WHITE 4 leaves the playing court beyond the substitution line. When WHITE 4 has crossed the sideline but not yet arrived in his substitution area, WHITE 11 crosses the line correctly to enter the playing court. What is the correct decision after the whistle from the timekeeper?",
                "options_en": ["Free throw for BLACK team where WHITE 4 left the court", "Free throw for BLACK team at height of the substitution area of WHITE team", "2-minute suspension for WHITE 4", "2-minute suspension for WHITE 11", "2-minute suspension for WHITE 4 and WHITE 11"],
                "answer_en": ["Free throw for BLACK team at height of the substitution area of WHITE team", "2-minute suspension for WHITE 4"]
            },
            {
                "question_es": "NEGRO 3 realiza el primer cambio antirreglamentario de su equipo durante una interrupción del partido. La interrupción fue causada por una decisión de golpe franco para el equipo NEGRO. NEGRO 3 no había sido amonestado ni excluido anteriormente en el partido. ¿Decisión correcta?",
                "options_es": ["Amonestación para NEGRO 3", "Exclusión de 2’ para NEGRO 3", "Golpe franco para el equipo BLANCO", "Golpe franco para el equipo NEGRO"],
                "answer_es": ["Exclusión de 2’ para NEGRO 3", "Golpe franco para el equipo BLANCO"],
                "question_en": "BLACK 3 makes the first faulty substitution for his team during an interruption of the match. The interruption was caused by a free-throw decision in favour of BLACK team. BLACK 3 has neither been warned nor suspended earlier in the match. Correct decision?",
                "options_en": ["Warning for BLACK 3", "2-minute suspension for BLACK 3", "Free throw for WHITE team", "Free throw for BLACK team"],
                "answer_en": ["2-minute suspension for BLACK 3", "Free throw for WHITE team"]
            },
            {
                "question_es": "Después de que los árbitros hayan awarded un lanzamiento de 7 metros a favor del equipo BLANCO, el jugador BLANCO 27, que ha sido designado para ejecutar el lanzamiento, realiza un cambio antirreglamentario, ¿Decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo BLANCO", "Saque de portería para el equipo NEGRO", "Exclusión de 2’ para BLANCO 27"],
                "answer_es": ["Golpe franco para el equipo NEGRO", "Exclusión de 2’ para BLANCO 27"],
                "question_en": "After the referees have awarded a 7-metre throw to WHITE team, WHITE 27, who has been designated to carry out the 7-metre throw, makes a faulty substitution. Correct decision?",
                "options_en": ["Free throw for BLACK team", "7-metre throw for WHITE team", "Goalkeeper throw for BLACK team", "2-minute suspension for WHITE 27"],
                "answer_en": ["Free throw for BLACK team", "2-minute suspension for WHITE 27"]
            },
            {
                "question_es": "El equipo BLANCO ha marcado un gol. Los árbitros todavía no han ordenado la ejecución del saque de centro cuando NEGRO 10 entra en el terreno de juego antes de que NEGRO 6 lo haya abandonado. ¿Decisión correcta?",
                "options_es": ["Saque de centro", "Golpe franco para el equipo BLANCO", "Exclusión de 2’ para NEGRO 10", "Exclusión de 2’ a NEGRO 6"],
                "answer_es": ["Golpe franco para el equipo BLANCO", "Exclusión de 2’ para NEGRO 10"],
                "question_en": "WHITE team have scored a goal. The referees have not yet whistled for the throw-off to be taken, when BLACK 10 enters the court before BLACK 6 has left it. Correct decision?",
                "options_en": ["Throw-off", "Free throw for WHITE team", "2-minute suspension for BLACK 10", "2-minute suspension for BLACK 6"],
                "answer_en": ["Free throw for WHITE team", "2-minute suspension for BLACK 10"]
            },
            {
                "question_es": "El equipo BLANCO sólo tiene 12 jugadores presentes al comienzo del encuentro, pues los dos jugadores designados como porteros todavía no han llegado. Por tanto, el equipo BLANCO comienza el encuentro con uno de los 12 jugadores de pista como portero. ¿Cuáles de las siguientes alternativas son correctas?",
                "options_es": ["El jugador de pista que comienza como portero debe ser inscrito en el acta de partido con los números 1, 12 o 16", "El jugador de pista que comienza como portero, después puede ser utilizado como jugador de pista", "Los porteros del equipo BLANCO que llegaron tarde deben ser inscritos en el acta del partido con los números 1, 12 o 16", "Sólo uno de los dos porteros que llegaron tarde puede ser utilizado como jugador de pista"],
                "answer_es": ["El jugador de pista que comienza como portero debe ser inscrito en el acta de partido con los números 1, 12 o 16", "El jugador de pista que comienza como portero, después puede ser utilizado como jugador de pista", "Los porteros del equipo BLANCO que llegaron tarde deben ser inscritos en el acta del partido con los números 1, 12 o 16"],
                "question_en": "WHITE team only have twelve players present at the beginning of the match, as the two goalkeepers are still missing. WHITE team therefore start with one of the twelve court players as a goalkeeper. Which of the following alternatives are correct?",
                "options_en": ["The court player who starts the match as a goalkeeper must be registered as number 1, 12 or 16 in the score sheet.", "The court player who starts the match as a goalkeeper can also be used as a court player later in the game.", "The late-arriving goalkeepers of WHITE team must be registered as number 1, 12 or 16 in the score sheet.", "One of the two late-arriving goalkeepers can only be used as a court player."],
                "answer_en": ["The court player who starts the match as a goalkeeper must be registered as number 1, 12 or 16 in the score sheet.", "The court player who starts the match as a goalkeeper can also be used as a court player later in the game.", "The late-arriving goalkeepers of WHITE team must be registered as number 1, 12 or 16 in the score sheet."]
            },
            {
                "question_es": "Durante un Time-Out, BLANCO 5 comete el primer cambio antirreglamentario de su equipo. El equipo BLANCO estaba en posesión del balón cuando el Time-out fue concedido. ¿Decisión correcta?",
                "options_es": ["Ninguna sanción", "Amonestación a BLANCO 5", "Exclusión de 2’ para BLANCO 5", "Golpe franco para el equipo NEGRO", "El equipo BLANCO mantiene la posesión del balón"],
                "answer_es": ["Exclusión de 2’ para BLANCO 5", "Golpe franco para el equipo NEGRO"],
                "question_en": "During a time-out, WHITE 5 makes the first faulty substitution of his team. WHITE team were in possession of the ball when the time-out was called. Correct decision?",
                "options_en": ["No punishment", "Warning for WHITE 5", "2-minute suspension for WHITE 5", "Free throw for BLACK team", "WHITE team remain in possession of the ball"],
                "answer_en": ["2-minute suspension for WHITE 5", "Free throw for BLACK team"]
            },
            {
                "question_es": "El portero BLANCO 3 quiere ejecutar un lanzamiento de 7 metros. Para proteger la portería vacía, BLANCO 15 entra en el terreno de juego equipado como portero reemplazando a un jugador de campo. ¿Decisión correcta?",
                "options_es": ["Exclusión de 2’ para BLANCO 3", "Exclusión de 2’ para BLANCO 15", "Ninguna sanción", "Lanzamiento de 7 metros para el equipo BLANCO", "Golpe franco para el equipo NEGRO a la altura de la zona de cambios del equipo BLANCO"],
                "answer_es": ["Exclusión de 2’ para BLANCO 15", "Golpe franco para el equipo NEGRO a la altura de la zona de cambios del equipo BLANCO"],
                "question_en": "Goalkeeper WHITE 3 wants to carry out a 7-metre throw. To protect the empty goal WHITE 15 enters the court in a goalkeeper uniform replacing a court player. Correct decision?",
                "options_en": ["2-minute suspension for WHITE 3", "2-minute suspension for WHITE 15", "No punishment", "7-metre throw for WHITE team", "Free throw for BLACK team at the height of the substitution area of WHITE team"],
                "answer_en": ["2-minute suspension for WHITE 15", "Free throw for BLACK team at the height of the substitution area of WHITE team"]
            },
            {
                "question_es": "Durante un contraataque del equipo BLANCO, que tiene una clara ocasión de gol, el jugador NEGRO 3 comete un cambio antirreglamentario. El anotador/cronometrador no reacciona, pero el árbitro central observa lo sucedido. ¿Cuál es la decisión correcta?",
                "options_es": ["Inmediata exclusión a NEGRO 3 y golpe franco para el equipo BLANCO", "Inmediata exclusión para NEGRO 3 y lanzamiento de 7 metros para el equipo BLANCO", "Esperar hasta que la clara ocasión de gol haya pasado, entonces exclusión para NEGRO 3 y golpe franco para el equipo BLANCO", "Esperar hasta que la clara ocasión de gol haya pasado, entonces exclusión para NEGRO 3 y reanudar con el lanzamiento que corresponda a la situación"],
                "answer_es": "Esperar hasta que la clara ocasión de gol haya pasado, entonces exclusión para NEGRO 3 y reanudar con el lanzamiento que corresponda a la situación",
                "question_en": "During a counter-attack by WHITE team, who have a clear chance of scoring, BLACK 3 makes a faulty substitution. The timekeeper and scorekeeper do not react, but the court referee spotted what had happened. Correct decision?",
                "options_en": ["Immediate suspension for BLACK 3 and free throw for WHITE team", "Immediate suspension for BLACK 3 and 7-metre throw for WHITE team", "Wait until the chance of scoring has passed, then suspension for BLACK 3 and free throw for WHITE team", "Wait until the chance of scoring has passed, then suspension for BLACK 3 and an appropriate throw according to the situation"],
                "answer_en": "Wait until the chance of scoring has passed, then suspension for BLACK 3 and an appropriate throw according to the situation"
            },
            {
                "question_es": "Un lanzamiento a la portería es rechazado por el portero BLANCO 1 y el balón rueda a lo largo de la línea de banda cerca de la zona de cambios del equipo BLANCO. BLANCO 5, que está sentado en el banco de reservas, mete su pie dentro del terreno de juego y detiene el balón para que BLANCO 4 pueda recogerlo antes de que sobrepase la línea de banda. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO", "Saque de banda para el equipo NEGRO", "Exclusión de 2’ para BLANCO 5", "Descalificación para BLANCO 5 (tarjeta roja mostrada por los árbitros)", "El equipo BLANCO se reduce en un jugador en pista durante 2’"],
                "answer_es": ["Descalificación para BLANCO 5 (tarjeta roja mostrada por los árbitros)", "El equipo BLANCO se reduce en un jugador en pista durante 2’"],
                "question_en": "A shot on goal is saved by goalkeeper WHITE 1, and the ball is rolling along the sideline near WHITE team’s substitution bench. WHITE 5, who sits on the substitution bench, now enters the court with one foot to stop the ball, so that WHITE 4 can pick it up before it crosses the sideline. Correct decision?",
                "options_en": ["Free throw for BLACK team", "Throw-in for BLACK team", "2-minute suspension for WHITE 5", "Disqualification of WHITE 5 (red card shown by the referees)", "WHITE team reduced by 1 player on the court for 2 minutes"],
                "answer_en": ["Disqualification of WHITE 5 (red card shown by the referees)", "WHITE team reduced by 1 player on the court for 2 minutes"]
            },
            {
                "question_es": "30 segundos antes de que se cumpla su tiempo de exclusión, BLANCO 3 penetra en el terreno de juego, aunque sin intervenir en el juego. En ese momento el equipo BLANCO está en posesión del balón. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO", "Golpe franco para el equipo BLANCO", "Exclusión de 2’ para BLANCO 3 y el equipo BLANCO se reduce en un jugador en el terreno de juego durante 30 segundos", "Salida de 30 segundos para BLANCO 3 y el equipo BLANCO se reduce en un jugador en el terreno de juego durante 2’", "Descalificación para BLANCO 3 (tarjeta roja mostrada por los árbitros) y el equipo BLANCO se reduce en un jugador en el terreno de juego durante 30 segundos"],
                "answer_es": ["Descalificación para BLANCO 3 (tarjeta roja mostrada por los árbitros) y el equipo BLANCO se reduce en un jugador en el terreno de juego durante 30 segundos"],
                "question_en": "30 seconds before his suspension time is over, WHITE 3 enters the court without interfering with the game. WHITE team are in possession of the ball. Correct decision?",
                "options_en": ["Free throw for BLACK team", "Free throw for WHITE team", "2-minute suspension for WHITE 3 and WHITE team are to be further reduced by 1 player on the court for 30 seconds", "30 seconds for WHITE 3 and WHITE team are to be reduced by 1 player on the court for 2 minutes", "Disqualification of WHITE 3 (red card shown by the referees) and WHITE team are to be further reduced by 1 player on the court for 30 seconds"],
                "answer_en": ["Disqualification of WHITE 3 (red card shown by the referees) and WHITE team are to be further reduced by 1 player on the court for 30 seconds"]
            },
            {
                "question_es": "BLANCO 5 está excluido. Después de 1 minutos 45 segundos de los 2’ de exclusión, el entrenador envía a BLANCO 5 al terreno de juego. ¿Cuál es la decisión correcta?",
                "options_es": ["Nueva exclusión para BLANCO 5 que dura 2 minutos y 15 segundos", "Descalificación para BLANCO 5 (tarjeta roja mostrada por los árbitros) y el equipo BLANCO se reduce en dos jugadores en pista durante 15 segundos y en un jugador en pista durante 1 minuto y 45 segundos", "BLANCO 5 recibe una nueva exclusión, y el equipo BLANCO se reduce en dos jugadores en pista durante 15 segundos y en un jugador en pista durante 1 minuto y 45 segundos"],
                "answer_es": "Descalificación para BLANCO 5 (tarjeta roja mostrada por los árbitros) y el equipo BLANCO se reduce en dos jugadores en pista durante 15 segundos y en un jugador en pista durante 1 minuto y 45 segundos",
                "question_en": "WHITE 5 has been suspended. After 1 minute and 45 seconds of the 2-minute suspension, team official A from WHITE team sends him onto the court. Correct decision?",
                "options_en": ["Another 2-minute suspension for WHITE 5, and WHITE team are to be reduced by 1 player on the court for 2 minutes and 15 seconds", "Disqualification for WHITE 5 (red card shown by the referees), and WHITE team are to be reduced by 2 players on the court for 15 seconds and by 1 player on the court for 1 minute and 45 seconds", "Another 2-minute suspension for WHITE 5, and WHITE team are to be reduced by 2 players on the court for 15 seconds and by 1 player on the court for 1 minute and 45 seconds"],
                "answer_en": "Disqualification for WHITE 5 (red card shown by the referees), and WHITE team are to be reduced by 2 players on the court for 15 seconds and by 1 player on the court for 1 minute and 45 seconds"
            },
            {
                "question_es": "Después de finalizar sus 2’ de exclusión, el portero NEGRO 1 quiere completar su equipo que, en ese momento, se encuentra en defensa. Para ello penetra en el terreno de juego vistiendo ropa de portero y se coloca en la posición de extremo, como sexto jugador de campo del equipo NEGRO. ¿Cuál es la decisión correcta?",
                "options_es": ["Sigue el juego", "Lanzamiento de 7 metros para el equipo BLANCO", "Golpe franco para el equipo BLANCO", "Exclusión de 2’ para el portero NEGRO 1"],
                "answer_es": ["Exclusión de 2’ para el portero NEGRO 1", "Golpe franco para el equipo BLANCO"],
                "question_en": "After his 2-minute suspension has ended, goalkeeper BLACK 1 wants to re-join his team, who are defending at that moment. He enters the court wearing his goalkeeper jersey to assume the wing position, as BLACK team’s sixth court player. Correct decision?",
                "options_en": ["Game continues without interruption", "7-metre throw for WHITE team", "Free throw for WHITE team", "2-minute suspension for goalkeeper BLACK 1"],
                "answer_en": ["2-minute suspension for goalkeeper BLACK 1", "Free throw for WHITE team"]
            },
            {
                "question_es": "¿Qué es lo correcto respecto a un jugador que está sangrando en el terreno de juego?",
                "options_es": ["El jugador debe salir inmediata y voluntariamente del terreno de juego", "El jugador puede permanecer en el terreno de juego hasta la próxima interrupción", "El jugador que reemplaza al que sangra puede entrar en la pista por fuera de la línea de cambios", "El jugador no debe regresar al terreno de juego hasta la próxima interrupción del partido", "Si el jugador rechaza seguir las instrucciones de los árbitros de abandonar el terreno de juego, debe ser sancionado por conducta antideportiva"],
                "answer_es": ["El jugador debe salir inmediata y voluntariamente del terreno de juego", "El jugador no debe regresar al terreno de juego hasta la próxima interrupción del partido", "Si el jugador rechaza seguir las instrucciones de los árbitros de abandonar el terreno de juego, debe ser sancionado por conducta antideportiva"],
                "question_en": "Which of the following statements are correct regarding a player who is bleeding on the court?",
                "options_en": ["The player must leave the court immediately and voluntarily.", "The player can remain on the court until the next interruption of the game.", "The player who replaces the bleeding player can enter the court beyond the substitution line.", "The player must not re-enter the court until the next interruption of the game.", "If the player refuses to follow the instructions of the referees to leave the court, he must be punished for unsportsmanlike conduct."],
                "answer_en": ["The player must leave the court immediately and voluntarily.", "The player must not re-enter the court until the next interruption of the game.", "If the player refuses to follow the instructions of the referees to leave the court, he must be punished for unsportsmanlike conduct."]
            },
            {
                "question_es": "BLANCO 5 está solo ante el portero NEGRO 1 y tiene una clara ocasión de gol. BLANCO 11 realiza un cambio antirreglamentario entrando en la pista antes de que BLANCO 9 la abandone. El cronometrador hace sonar su silbato precisamente cuando BLANCO 5 está preparado para lanzar. ¿Decisión correcta?",
                "options_es": ["Exclusión de 2’ para BLANCO 11", "Descalificación para BLANCO 11, informe escrito (Tarjeta roja y azul mostradas por los árbitros)", "Golpe franco para el equipo BLANCO", "Lanzamiento de 7 metros para el equipo BLANCO"],
                "answer_es": ["Descalificación para BLANCO 11, informe escrito (Tarjeta roja y azul mostradas por los árbitros)", "Lanzamiento de 7 metros para el equipo BLANCO"],
                "question_en": "WHITE 5 is alone with goalkeeper BLACK 1 and has a clear chance of scoring. BLACK 11 makes a faulty substitution, as he enters the court before BLACK 9 has left it. The timekeeper whistles because of this infraction, precisely when WHITE 5 is ready to shoot. Correct decision?",
                "options_en": ["2-minute suspension for BLACK 11", "Disqualification for BLACK 11, written report (red and blue cards shown by the referees)", "Free throw for WHITE team", "7-metre throw for WHITE team"],
                "answer_en": ["Disqualification for BLACK 11, written report (red and blue cards shown by the referees)", "7-metre throw for WHITE team"]
            },
            {
                "question_es": "El portero NEGRO 1 detiene un lanzamiento y pasa el balón a su compañero NEGRO 4. Después NEGRO 1 se desplaza hacia la línea de banda cerca de su zona de cambios. Él cruza claramente la línea, coge una toalla y bebe agua de una botella. No es sustituido en el terreno de juego por otro portero. ¿Decisión correcta?",
                "options_es": ["El juego continúa, ya que esto está permitido", "Exclusión de 2’ para NEGRO 1 por cambio antirreglamentario", "Golpe franco para el equipo BLANCO en la zona de cambios del equipo NEGRO"],
                "answer_es": ["Exclusión de 2’ para NEGRO 1 por cambio antirreglamentario", "Golpe franco para el equipo BLANCO en la zona de cambios del equipo NEGRO"],
                "question_en": "Goalkeeper BLACK 1 saves a shot and throws the ball to his teammate BLACK 4. Now, BLACK 1 goes to the sideline near his substitution area. He clearly crosses the line, takes a towel and drinks from a water bottle. He is not replaced on the court by another goalkeeper or court player. Correct decision?",
                "options_en": ["The game continues without interruption, as this is allowed.", "2-minute suspension for BLACK 1 for faulty substitution", "Free throw for WHITE team at the substitution area of BLACK team"],
                "answer_en": ["2-minute suspension for BLACK 1 for faulty substitution", "Free throw for WHITE team at the substitution area of BLACK team"]
            },
            {
                "question_es": "El oficial A del equipo NEGRO ya ha recibido una amonestación. Tras una decisión de los árbitros, el oficial D del equipo NEGRO entra varios metros dentro del terreno de juego sin permiso de los árbitros. ¿Decisión correcta?",
                "options_es": ["No hay sanción", "Amonestación para el oficial D del equipo NEGRO", "Exclusión de 2’ para el oficial D del equipo NEGRO", "Descalificación para el oficial D del equipo NEGRO (tarjetas roja y azul mostradas por los árbitros)"],
                "answer_es": "Descalificación para el oficial D del equipo NEGRO (tarjetas roja y azul mostradas por los árbitros)",
                "question_en": "Team official A from BLACK team received a warning earlier in the game. After a decision by the referees, team official D from BLACK team runs several metres onto the court without permission from the referees. Correct decision?",
                "options_en": ["No punishment", "Warning for team official D from BLACK team", "2-minutes suspension for team official D from BLACK team", "Disqualification for team official D from BLACK team (red card shown by the referees)"],
                "answer_en": "Disqualification for team official D from BLACK team (red card shown by the referees)"
            },
            {
                "question_es": "Hay un time-out por la lesión de BLANCO 6 debido a un incidente que no conllevó una sanción progresiva contra un jugador del equipo NEGRO. Los árbitros dan permiso para que dos personas entren en la pista para atender a BLANCO 6. El oficial C del equipo BLANCO atiende a BLANCO 6. El oficial A del equipo BLANCO persigue a NEGRO 5 que en su opinión ha causado la lesión. Sigue a NEGRO 5 hasta la zona de cambios y lo golpea en la cara ¿Decisión correcta?",
                "options_es": ["Descalificación del oficial A del equipo BLANCO, informe escrito (tarjeta roja y tarjeta azul mostradas por los árbitros), el equipo BLANCO se reduce en un jugador en pista durante 2’", "El juego se reanuda, después del toque de silbato, con el lanzamiento que corresponde al motivo de la interrupción", "Exclusión de 2’ para el oficial A del equipo BLANCO, el equipo BLANCO se reduce en un jugador en pista durante 2’", "Golpe franco para el equipo NEGRO", "Descalificación del oficial A del equipo BLANCO sin informe escrito (tarjeta roja mostrada por los árbitros), el equipo BLANCO se reduce en un jugador en pista durante 2’", "Después de recibir atención médica en la pista, BLANCO 6 debe abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo"],
                "answer_es": ["Descalificación del oficial A del equipo BLANCO, informe escrito (tarjeta roja y tarjeta azul mostradas por los árbitros), el equipo BLANCO se reduce en un jugador en pista durante 2’", "Después de recibir atención médica en la pista, BLANCO 6 debe abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo"],
                "question_en": "There is a time-out due to an injury of WHITE 6 caused by an incident that did not lead to a progressive punishment against a player from BLACK team. The referees have given permission for two people to enter the court and assist WHITE 6. Official C from WHITE team assists WHITE 6. Official A from WHITE team pursues BLACK 5, who in his opinion has caused the injury. He follows BLACK 5 into the substitution area of BLACK team and hits him in the face. Correct decision?",
                "options_en": ["Disqualification of official A from WHITE team, written report (red and blue cards shown by the referees), WHITE team is reduced by 1 player on the court for 2 minutes", "The game is restarted after a whistle signal with the throw that corresponds to the reason of the interruption.", "2-minute suspension for official A from WHITE team, WHITE team is reduced by 1 player on the court for 2 minutes", "Free throw for BLACK team", "Disqualification without written report of official A from WHITE team (red card shown by the referees), WHITE team is reduced by 1 player on the court for 2 minutes", "After receiving medical care on the court, WHITE 6 must leave the court and may only re enter the court following the third attack of his team."],
                "answer_en": ["Disqualification of official A from WHITE team, written report (red and blue cards shown by the referees), WHITE team is reduced by 1 player on the court for 2 minutes", "After receiving medical care on the court, WHITE 6 must leave the court and may only re enter the court following the third attack of his team."]
            },
            {
                "question_es": "Justo después de la ejecución de un saque de centro del equipo NEGRO, los árbitros detectan que una persona que no está inscrita en el acta de partido está presente en la zona de cambios del equipo NEGRO. Los árbitros comprueban que es uno de los directivos del club, pero el equipo NEGRO ya tenía inscritas a cuatro personas como oficiales de equipo en el acta de partido. ¿Decisión correcta?",
                "options_es": ["La persona que no está inscrita en acta debe abandonar la zona de cambios", "El oficial responsable del equipo NEGRO recibe una sanción progresiva", "Un oficial adicional de equipo debe abandonar la zona de cambios", "El encuentro se reanuda con golpe franco para el equipo BLANCO", "El encuentro se reanuda con golpe franco para el equipo NEGRO"],
                "answer_es": ["La persona que no está inscrita en acta debe abandonar la zona de cambios", "El oficial responsable del equipo NEGRO recibe una sanción progresiva", "El encuentro se reanuda con golpe franco para el equipo BLANCO"],
                "question_en": "Just after the execution of a throw-off for BLACK team, the referees realise that a person, who is not on the score sheet, is present in the substitution area of BLACK team. It turns out that this person is one of the board members of the club, but BLACK team has already had four other people registered as team officials in the score sheet. Correct decision?",
                "options_en": ["The person must leave the substitution area.", "Personal punishment for the responsible team official from BLACK team.", "An additional team official must leave the substitution area.", "The game is restarted with a free throw for WHITE team.", "The game is restarted with a free throw for BLACK team."],
                "answer_en": ["The person must leave the substitution area.", "Personal punishment for the responsible team official from BLACK team.", "The game is restarted with a free throw for WHITE team."]
            },
            {
                "question_es": "¿Qué está establecido en relación con el uniforme?",
                "options_es": ["Todos los jugadores de un equipo identificados como porteros deben llevar camisetas del mismo color", "Los jugadores deben llevar números de al menos 20 cm. de alto, tanto delante como detrás", "Los porteros están autorizados a llevar protecciones para la cabeza si están fabricadas de material blando", "Los jugadores, incluidos los porteros, pueden llevar números del 1 al 100"],
                "answer_es": ["Los jugadores deben llevar números de al menos 20 cm. de alto, tanto delante como detrás", "Los porteros están autorizados a llevar protecciones para la cabeza si están fabricadas de material blando", "Los jugadores, incluidos los porteros, pueden llevar números del 1 al 100"],
                "question_en": "Which of the following statements about the uniform are correct?",
                "options_en": ["All players of a team identified as goalkeepers must wear shirts of identical colour.", "The players must have at least 20cm high numbers on both the front and the back.", "The goalkeepers are allowed to wear head protection if it is made of soft material.", "The players including the goalkeepers may use numbers from 1 to 100."],
                "answer_en": ["The players must have at least 20cm high numbers on both the front and the back.", "The goalkeepers are allowed to wear head protection if it is made of soft material.", "The players including the goalkeepers may use numbers from 1 to 100."]
            },
            {
                "question_es": "BLANCO 10 está cumpliendo su primera exclusión de 2’ comenzando en el 21:00. Una vez reanudado el partido, protesta tan enérgicamente que los árbitros interrumpen el juego en 21:30 para sancionar a BLANCO 10 con una exclusión adicional de 2’. ¿Cuáles son las consecuencias para el equipo BLANCO?",
                "options_es": ["Exclusión de 2’ para BLANCO 10", "Descalificación para BLANCO 10", "El equipo BLANCO será reducido en un jugador hasta el 25:00", "El equipo BLANCO será reducido en dos jugadores hasta el 23:00 y luego en un jugador hasta el 23:30"],
                "answer_es": ["Descalificación para BLANCO 10", "El equipo BLANCO será reducido en dos jugadores hasta el 23:00 y luego en un jugador hasta el 23:30"],
                "question_en": "WHITE 10 is serving his first 2-minute suspension starting from 21:00. After the match has been restarted, he complains so strongly that the referees interrupt the match at 21:30 to give WHITE 10 an additional 2-minute suspension. What are the consequences for WHITE team?",
                "options_en": ["2-minute suspension for WHITE 10", "Disqualification of WHITE 10", "WHITE team will be reduced by 1 player on the court until 25:00", "WHITE team will be reduced by 2 players on the court until 23:00 and then by 1 player on the court until 23:30"],
                "answer_en": ["Disqualification of WHITE 10", "WHITE team will be reduced by 2 players on the court until 23:00 and then by 1 player on the court until 23:30"]
            },
            {
                "question_es": "¿En cuál de los siguientes casos debe darse una sanción personal al “oficial responsable de equipo”?",
                "options_es": ["Cuando un jugador de su equipo abandona la zona de cambios sin informar al anotador/cronometrador", "Si hay personas presentes en la zona de cambios, cuando empieza el partido, que no están inscritas en el acta del partido", "Cuando un jugador adicional entra en el terreno de juego", "Cuando un jugador que no está autorizado a participar entra en el terreno de juego", "Si una equipación incorrecta es detectada después del inicio del partido", "Si hay infracciones en la zona de cambios que no pueden ser claramente atribuidas de manera individual", "Si se detecta que los jugadores en la zona de cambios llevan una equipación incorrecta después del inicio del partido."],
                "answer_es": ["Si hay personas presentes en la zona de cambios, cuando empieza el partido, que no están inscritas en el acta del partido", "Cuando un jugador adicional entra en el terreno de juego", "Cuando un jugador que no está autorizado a participar entra en el terreno de juego", "Si hay infracciones en la zona de cambios que no pueden ser claramente atribuidas de manera individual"],
                "question_en": "In which of the following cases is the responsible team official to be given a personal punishment?",
                "options_en": ["When a player of his team leaves the substitution area without informing the timekeeper/scorekeeper.", "If there are people, who are not included in the score sheet, present in the substitution area when the game starts.", "When an additional player enters the court.", "When a player who is not entitled to participate enters the court.", "If it is detected that players on the court wear incorrect equipment after the start of the game.", "If there are violations in the substitution area, which cannot clearly be attributed to individuals.", "If it is detected that players in the substitution area wear incorrect equipment after the start of the game."],
                "answer_en": ["If there are people, who are not included in the score sheet, present in the substitution area when the game starts.", "When an additional player enters the court.", "When a player who is not entitled to participate enters the court.", "If there are violations in the substitution area, which cannot clearly be attributed to individuals."]
            },
            {
                "question_es": "Los árbitros realizan la gestoforma dando permiso para entrar al campo porque un jugador del equipo BLANCO está lesionado. ¿A quién le está permitido entrar al terreno de juego?",
                "options_es": ["Dos oficiales del equipo BLANCO; nadie más", "Dos oficiales de cada uno de los equipos BLANCO y NEGRO", "Dos personas (oficiales o jugadores) del equipo BLANCO", "Dos personas (oficiales o jugadores) de cada uno de los equipos BLANCO y NEGRO", "El médico del equipo BLANCO, si él no es uno de los cuatro oficiales de equipo."],
                "answer_es": "Dos personas (oficiales o jugadores) del equipo BLANCO",
                "question_en": "The referees give the hand signal to indicate permission to enter the court, because a player of WHITE team is injured. Who is allowed to enter the court?",
                "options_en": ["Two officials from WHITE team, nobody else", "Two officials from both WHITE and BLACK team", "Two people (officials or players) from WHITE team", "Two people (officials or players) from both WHITE and BLACK team", "The doctor of WHITE team, if he is not one of the four team officials"],
                "answer_en": "Two people (officials or players) from WHITE team"
            },
            {
                "question_es": "El oficial C del equipo BLANCO ya ha recibido una amonestación por protestar. Más tarde, el oficial B del equipo BLANCO penetra en el terreno de juego sin permiso, pero no se comporta de manera antideportiva. ¿Cuál es la decisión correcta?",
                "options_es": ["Amonestación para el oficial B del equipo BLANCO", "Exclusión de 2’ para el oficial B del equipo BLANCO; debe abandonar la zona de cambios durante 2’", "Descalificación para el oficial B del equipo BLANCO (tarjeta roja mostrada por los árbitros). El equipo BLANCO se reduce en un jugador en el terreno de juego durante 2’", "Exclusión de 2’ para el oficial B del equipo BLANCO; el equipo BLANCO se reduce en un jugador en el terreno de juego durante 2’, el oficial B puede mantenerse en la zona de cambios"],
                "answer_es": "Exclusión de 2’ para el oficial B del equipo BLANCO; el equipo BLANCO se reduce en un jugador en el terreno de juego durante 2’, el oficial B puede mantenerse en la zona de cambios",
                "question_en": "Official C from WHITE team has already received a warning for protests. Later on, official B from WHITE team enters the court without permission, but he does not behave in an unsportsmanlike manner. Correct decision?",
                "options_en": ["Warning for official B from WHITE team", "2-minute suspension for official B from WHITE team (must leave the bench for 2 minutes)", "Disqualification of official B from WHITE team (red card shown by the referees, WHITE team will be reduced by 1 player on the court for 2 minutes", "2-minute suspension for official B from WHITE team, WHITE team will be reduced by 1 player on the court for 2 minutes, official B can stay in the substitution area"],
                "answer_en": "2-minute suspension for official B from WHITE team, WHITE team will be reduced by 1 player on the court for 2 minutes, official B can stay in the substitution area"
            },
            {
                "question_es": "¿Cuál(es) de las siguientes acciones no está(n) permitida(s) cuando hay un Time-out debido a una lesión y los árbitros han mostrado la gestoforma para permitir entrar personas del equipo BLANCO al terreno de juego?",
                "options_es": ["Los jugadores del equipo NEGRO están cerca de la línea de banda para recibir instrucciones de su entrenador", "Los jugadores del equipo BLANCO realizan cambios fuera de su línea de cambios", "Uno de los oficiales del equipo BLANCO que se encuentra dentro del terreno de juego, se aleja del jugador lesionado y da instrucciones a otros jugadores de su equipo"],
                "answer_es": ["Los jugadores del equipo BLANCO realizan cambios fuera de su línea de cambios", "Uno de los oficiales del equipo BLANCO que se encuentra dentro del terreno de juego, se aleja del jugador lesionado y da instrucciones a otros jugadores de su equipo"],
                "question_en": "Which of the following actions are not allowed when there is a time-out because of an injury and the referees have given permission for up to two people from WHITE team to enter the court?",
                "options_en": ["The players of BLACK team stand near the sideline in order to get instructions from the coach.", "Players of WHITE team make substitutions outside the substitutions line.", "One of the team officials of WHITE team, who is on the court, moves far away from the injured player and gives instructions to the other players of his team."],
                "answer_en": ["Players of WHITE team make substitutions outside the substitutions line.", "One of the team officials of WHITE team, who is on the court, moves far away from the injured player and gives instructions to the other players of his team."]
            },
            {
                "question_es": "Antes del comienzo del partido, el delegado se da cuenta de que BLANCO 7 lleva protectores de tobillo de material duro que no están cubiertos. ¿Cuál es la decisión correcta?",
                "options_es": ["BLANCO 7 puede jugar con los protectores de tobillo, pero el delegado debe hacer un informe escrito a la dirección de la competición", "BLANCO 7 no puede jugar con protectores de tobillo que tengan partes duras descubiertas. El delegado debe avisar al oficial responsable del equipo de que el jugador debe quitarse los protectores de tobillo o cubrir las partes duras con material blando", "BLANCO 7 recibirá una amonestación", "El oficial del equipo responsable recibirá una amonestación", "Ninguna de las respuestas anteriores es válida"],
                "answer_es": "BLANCO 7 no puede jugar con protectores de tobillo que tengan partes duras descubiertas. El delegado debe avisar al oficial responsable del equipo de que el jugador debe quitarse los protectores de tobillo o cubrir las partes duras con material blando",
                "question_en": "Before the start of the match the delegate realises that WHITE 7 is wearing ankle protectors with hard material that is not covered. What is/are the correct decision(s)?",
                "options_en": ["WHITE 7 can play with the ankle protectors, but the delegate needs to send a report to the competition management.", "WHITE 7 cannot play with ankle protectors that have uncovered hard parts. The delegate must alert the responsible team official that the player should remove the ankle protectors or cover the hard parts with soft material.", "WHITE 7 will receive a warning.", "The responsible team official will receive a warning.", "None of the previous answers are valid."],
                "answer_en": "WHITE 7 cannot play with ankle protectors that have uncovered hard parts. The delegate must alert the responsible team official that the player should remove the ankle protectors or cover the hard parts with soft material."
            },
            {
                "question_es": "En el minuto 29:00 de la primera parte, BLANCO 5 recibe una exclusión de 2’. Después del descanso, el árbitro central pita para empezar la segunda parte. 3 segundos después de esto, el cronometrador hace sonar la señal. El equipo BLANCO tiene 7 jugadores en el terreno de juego. ¿Decisión correcta?",
                "options_es": ["Un jugador del equipo BLANCO debe abandonar el terreno de juego, ninguna sanción adicional", "Exclusión de 2’ por el jugador adicional del equipo BLANCO", "El equipo BLANCO se reducirá en dos jugadores en el terreno de juego durante 57 segundos y en un jugador durante 1 minuto y 3 segundos"],
                "answer_es": "El equipo BLANCO se reducirá en dos jugadores en el terreno de juego durante 57 segundos y en un jugador durante 1 minuto y 3 segundos",
                "question_en": "At 29:00 in the first half, WHITE 5 receives a 2-minute suspension. After the half-time break, the court referee whistles to start the second half. Three seconds after this, the timekeeper blows his whistle. WHITE team has seven players on the court. Correct decision?",
                "options_en": ["1 player of WHITE team must leave the court, no additional punishment", "2-minute suspension for the additional player from WHITE team", "WHITE team will be reduced by 2 players on the court for 57 seconds and by 1 player for 1 minute and 3 seconds."],
                "answer_en": "WHITE team will be reduced by 2 players on the court for 57 seconds and by 1 player for 1 minute and 3 seconds."
            },
            {
                "question_es": "Tiempo de juego 43:27. Interrupción efectuada por el cronometrador después del gol marcado por BLANCO 15 y del saque de centro. El cronometrador informa a los árbitros que BLANCO 15 no está incluido en el acta del partido. 14 jugadores del equipo BLANCO ya están inscritos. Los árbitros comprueban que el jugador BLANCO 11 no está presente. ¿Decisión correcta?",
                "options_es": ["El gol es anulado", "El gol es válido", "BLANCO 11 es borrado del acta y BLANCO 15 es inscrito en ella en conformidad con las regulaciones de la federación responsable", "BLANCO 15 no está autorizado a jugar y debe abandonar el terreno de juego", "Sanción progresiva para el oficial responsable del equipo BLANCO", "Informe escrito"],
                "answer_es": ["El gol es válido", "BLANCO 11 es borrado del acta y BLANCO 15 es inscrito en ella en conformidad con las regulaciones de la federación responsable", "Informe escrito"],
                "question_en": "The playing time is 43:27. There is an interruption by the timekeeper after a goal from WHITE 15 and throw-off. The timekeeper informs the referees that WHITE 15 is not registered in the score sheet. 14 players are already listed for WHITE team. The referees realise that WHITE 11 is not even present. Correct decision?",
                "options_en": ["The goal is cancelled.", "The goal is valid.", "WHITE 11 is removed, and WHITE 15 is registered in the score sheet in conformity with the regulations of the responsible federation.", "WHITE 15 is not allowed to play and must leave the court.", "Progressive punishment for the responsible team official from WHITE team", "Written report in conformity with the regulations of the responsible federation."],
                "answer_en": ["The goal is valid.", "WHITE 11 is removed, and WHITE 15 is registered in the score sheet in conformity with the regulations of the responsible federation.", "Written report in conformity with the regulations of the responsible federation."]
            },
            {
                "question_es": "El portero BLANCO 12 se tumba en el suelo con una lesión en la rodilla después de parar un lanzamiento del equipo NEGRO. ¿Decisión correcta?",
                "options_es": ["BLANCO 12 puede continuar el partido después de recibir tratamiento médico en la pista", "Dos personas del equipo BLANCO que están inscritas para participar, pueden entrar en la pista para dar asistencia médica en el terreno a BLANCO 12, después de que las gestoformas 15 y 16 han sido mostradas por los árbitros", "Solo una persona del equipo BLANCO, que está inscrita para participar, puede entrar en la pista para dar asistencia médica a BLANCO 12 en el terreno, después de que las gestoformas 15 y 16 han sido mostradas por los árbitros", "Después de recibir asistencia médica en la pista, BLANCO 12 solo puede volver a entrar en pista después del tercer ataque de su equipo", "Independientemente del número de ataques, BLANCO 12 puede volver a entrar en pista cuando el juego se reanude después del final de la primera parte.", "Si los oficiales de equipo se niegan a proporcionar la asistencia médica a BLANCO 12, el oficial responsable del equipo será sancionado progresivamente"],
                "answer_es": ["Dos personas del equipo BLANCO que están inscritas para participar, pueden entrar en la pista para dar asistencia médica en el terreno a BLANCO 12, después de que las gestoformas 15 y 16 han sido mostradas por los árbitros", "Después de recibir asistencia médica en la pista, BLANCO 12 solo puede volver a entrar en pista después del tercer ataque de su equipo", "Si los oficiales de equipo se niegan a proporcionar la asistencia médica a BLANCO 12, el oficial responsable del equipo será sancionado progresivamente"],
                "question_en": "Goalkeeper WHITE 12 lies on the floor with a knee injury after saving a shot from BLACK team. Correct decision?",
                "options_en": ["WHITE 12 may continue to play after receiving medical treatment on the court.", "Two people from WHITE team, who are entitled to participate, can enter the court to give WHITE 12 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "Only one person from WHITE team, who is entitled to participate, can enter the court to give WHITE 12 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "After receiving medical treatment on the court, WHITE 12 can only re-enter the court following the third attack of his team.", "Regardless of the number of attacks, WHITE 12 can re-enter the court when the game is continued after the end of a half.", "If the team officials refuse to provide the necessary treatment of WHITE 12, the responsible team official is to be punished progressively."],
                "answer_en": ["Two people from WHITE team, who are entitled to participate, can enter the court to give WHITE 12 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "After receiving medical treatment on the court, WHITE 12 can only re-enter the court following the third attack of his team.", "If the team officials refuse to provide the necessary treatment of WHITE 12, the responsible team official is to be punished progressively."]
            },
            {
                "question_es": "El portero BLANCO 1 para un lanzamiento del equipo NEGRO. Al hacerlo golpea su cabeza contra el poste de la portería. Necesita asistencia médica en la pista. ¿Decisión correcta?",
                "options_es": ["BLANCO 1 puede continuar el partido después de recibir asistencia médica en la pista, porque la asistencia fue causada por una lesión en la cabeza", "Después de recibir asistencia médica en la pista, BLANCO 1 solo puede volver a entrar en pista después del tercer ataque de su equipo"],
                "answer_es": "Después de recibir asistencia médica en la pista, BLANCO 1 solo puede volver a entrar en pista después del tercer ataque de su equipo",
                "question_en": "Goalkeeper WHITE 1 saves a shot from BLACK team. In doing so, he hits his head against the goal post and needs medical treatment on the court. Correct decision?",
                "options_en": ["WHITE 1 may continue to play after receiving medical treatment on the court, because the treatment was caused by a head injury.", "After receiving medical treatment on the court, WHITE 1 can only re-enter the court following the third attack of his team."],
                "answer_en": "After receiving medical treatment on the court, WHITE 1 can only re-enter the court following the third attack of his team."
            },
            {
                "question_es": "Después de recibir asistencia médica en la pista, BLANCO 7 está sentado en el banquillo en la zona de cambios. Durante el primer ataque del equipo BLANCO, NEGRO 2 intercepta el balón y corre en un contraataque solo con el portero BLANCO 12 entre él y la portería del equipo BLANCO. Antes de que NEGRO 2 pueda realizar un lanzamiento a portería, BLANCO 7 entra en la pista mediante una sustitución con BLANCO 9. ¿Decisión correcta?",
                "options_es": ["El cronometrador espera hasta que NEGRO 2 haya realizado el lanzamiento a portería antes de interrumpir el juego a causa de un cambio antirreglamentario del equipo BLANCO", "El cronometrador interrumpe el juego inmediatamente a causa de un cambio antirreglamentario del equipo BLANCO", "Time-out", "Exclusión de 2’ de BLANCO 7", "Descalificación sin informe escrito de BLANCO 7 (tarjeta roja mostrada por los árbitros)", "7 metros para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Independientemente del número de ataques de su equipo, BLANCO 7 puede reingresar a la pista después de cumplir una exclusión de 2’ 30"],
                "answer_es": ["El cronometrador interrumpe el juego inmediatamente a causa de un cambio antirreglamentario del equipo BLANCO", "Time-out", "Descalificación sin informe escrito de BLANCO 7 (tarjeta roja mostrada por los árbitros)", "7 metros para el equipo NEGRO"],
                "question_en": "After receiving medical treatment on the court WHITE 7 sits on the bench in the substitution area. During the first attack of WHITE team, BLACK 2 intercepts the ball and runs in a counter-attack alone with only goalkeeper WHITE 12 between him and the goal of WHITE team. Before BLACK 2 can take a shot on goal, WHITE 7 enters the court through a substitution with WHITE 9. Correct decision?",
                "options_en": ["The timekeeper waits until BLACK 2 has taken a shot on goal before interrupting the game due to a faulty substitution of WHITE team.", "The timekeeper immediately interrupts the game due to a faulty substitution of WHITE team.", "Time-out", "2-minute suspension of WHITE 7", "Disqualification without written report of WHITE 7 (red card shown by the referees)", "7-metre throw for BLACK team", "Free throw for BLACK team", "Regardless of the number of attacks of his team, WHITE 7 can re-enter the court after serving a 2-minute suspension."],
                "answer_en": ["The timekeeper immediately interrupts the game due to a faulty substitution of WHITE team.", "Time-out", "Disqualification without written report of WHITE 7 (red card shown by the referees)", "7-metre throw for BLACK team"]
            },
            {
                "question_es": "Después de recibir asistencia médica en la pista, NEGRO 11 está sentado en el banquillo quejándose sobre una decisión del árbitro. Por hacerlo, recibe su primera exclusión de 2’ del partido. Tras el segundo ataque del equipo NEGRO, NEGRO 11 vuelve a entrar en la pista después de cumplir sus 2’ de exclusión. ¿Decisión correcta?",
                "options_es": ["Time-out", "Exclusión de 2’ para NEGRO 11", "El juego continua", "Golpe franco para el equipo BLANCO"],
                "answer_es": ["Exclusión de 2’ para NEGRO 11", "Golpe franco para el equipo BLANCO"],
                "question_en": "After receiving medical treatment on the court, BLACK 11 sits on the bench and complains about a decision of the referees. Therefore, he receives his first 2-minute suspension of the match. Following the second attack of BLACK team, BLACK 11 re-enters the court after serving his 2-minute suspension. Correct decision?",
                "options_en": ["Time-out", "2-minute suspension of BLACK 11", "Play on", "Free throw for WHITE team"],
                "answer_en": ["2-minute suspension of BLACK 11", "Free throw for WHITE team"]
            },
            {
                "question_es": "NEGRO 10 recibe el balón en la línea de golpe franco. Justo después de coger el balón, es derribado por BLANCO 3. Cae tan desafortunadamente, que se hace daño en el codo y necesita asistencia médica en la pista. ¿Decisión correcta?",
                "options_es": ["Amonestación para BLANCO 3", "Exclusión de 2’ para BLANCO 3", "Dos personas del equipo NEGRO, que están autorizadas a participar, pueden penetrar en el terreno para dar asistencia médica a NEGRO 10 en la pista, después de las gestoformas 15 y 16 mostradas por uno de los árbitros", "NEGRO 10 puede continuar el juego después de recibir asistencia médica en la pista", "Después de recibir asistencia médica en la pista, NEGRO 10 solo puede volver al terreno de juego después del tercer ataque de su equipo", "Time-out"],
                "answer_es": ["Exclusión de 2’ para BLANCO 3", "Dos personas del equipo NEGRO, que están autorizadas a participar, pueden penetrar en el terreno para dar asistencia médica a NEGRO 10 en la pista, después de las gestoformas 15 y 16 mostradas por uno de los árbitros", "Después de recibir asistencia médica en la pista, NEGRO 10 solo puede volver al terreno de juego después del tercer ataque de su equipo", "Time-out"],
                "question_en": "BLACK 10 receives the ball at the free-throw line. Just after catching the ball he is pulled down by WHITE 3. He falls, hurts his elbow, and needs medical treatment on the court. Correct decision?",
                "options_en": ["Warning for WHITE 3", "2-minute suspension for WHITE 3", "Two people from BLACK team, who are entitled to participate, can enter the court to give BLACK 10 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "BLACK 10 may continue to play after receiving medical treatment on the court.", "After receiving medical treatment on the court, BLACK 10 can only re-enter the court following the third attack of his team.", "Time-out"],
                "answer_en": ["2-minute suspension for WHITE 3", "Two people from BLACK team, who are entitled to participate, can enter the court to give BLACK 10 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "After receiving medical treatment on the court, BLACK 10 can only re-enter the court following the third attack of his team.", "Time-out"]
            },
            {
                "question_es": "NEGRO 10 recibe el balón de NEGRO 9 en un contraataque. Justo después de pasar el balón, NEGRO 9 es derribado por BLANCO 11. Justo después de recibir el balón, NEGRO 10 cae y queda lesionado en el suelo. ¿Decisión correcta?",
                "options_es": ["Amonestación para BLANCO 11", "Exclusión de 2’ para BLANCO 11", "Dos personas del equipo NEGRO, que tienen derecho a participar, pueden penetrar en el terreno de juego para dar asistencia médica a NEGRO 10 en la pista, después de las gestoformas 15 y 16 mostradas por uno de los árbitros", "NEGRO 10 puede continuar el juego después de recibir asistencia médica en la pista", "Después de recibir asistencia médica en la pista, NEGRO 10 solo puede volver al terreno de juego después del tercer ataque de su equipo", "Time-out"],
                "answer_es": ["Exclusión de 2’ para BLANCO 11", "Dos personas del equipo NEGRO, que tienen derecho a participar, pueden penetrar en el terreno de juego para dar asistencia médica a NEGRO 10 en la pista, después de las gestoformas 15 y 16 mostradas por uno de los árbitros", "Después de recibir asistencia médica en la pista, NEGRO 10 solo puede volver al terreno de juego después del tercer ataque de su equipo", "Time-out"],
                "question_en": "BLACK 10 receives the ball in a counter-attack from BLACK 9. Just after passing the ball, BLACK 9 is pulled down by WHITE 11. Right after receiving the ball, BLACK 10 falls and lies injured on the floor. Correct decision?",
                "options_en": ["Warning for WHITE 11", "2-minute suspension for WHITE 11", "Two people from BLACK team, who are entitled to participate, can enter the court to give BLACK 10 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "BLACK 10 may continue to play after receiving medical treatment on the court.", "After receiving medical treatment on the court, BLACK 10 can only re-enter the court following the third attack of his team.", "Time-out"],
                "answer_en": ["2-minute suspension for WHITE 11", "Two people from BLACK team, who are entitled to participate, can enter the court to give BLACK 10 medical treatment on the court after the hand signals 15 and 16 have been shown by one of the referees.", "After receiving medical treatment on the court, BLACK 10 can only re-enter the court following the third attack of his team.", "Time-out"]
            },
            {
                "question_es": "Cuando quedan 3 minutos para el final del partido, el marcador es 21-21. NEGRO 2, que es el máximo anotador de su equipo, se tuerce su tobillo. NEGRO 2 se encuentra en el suelo. Uno de los árbitros pregunta a NEGRO 2, si necesita asistencia médica en la pista. Como NEGRO 2 no responde la pregunta, pero todavía está tirado en el suelo, los árbitros interrumpen el juego y muestran las gestoformas 15 y 16 para permitir a dos personas del equipo NEGRO penetrar en la pista para dar asistencia médica a NEGRO 2. En el equipo NEGRO se niegan a enviar personas a la pista, y antes de que los árbitros realicen cualquier otra acción, NEGRO 2 está listo para continuar el partido. ¿Decisión correcta?",
                "options_es": ["NEGRO 2 puede continuar el juego", "NEGRO 2 debe salir de la pista y solo puede entrar después del tercer ataque de su equipo", "Sanción progresiva al oficial responsable del equipo NEGRO"],
                "answer_es": ["NEGRO 2 debe salir de la pista y solo puede entrar después del tercer ataque de su equipo", "Sanción progresiva al oficial responsable del equipo NEGRO"],
                "question_en": "With three minutes left, the game is tied at 21-21. BLACK 2, the top scorer of his team, twists his ankle and ends up lying on the floor. One of the referees asks BLACK 2 if he needs medical treatment on the court. As BLACK 2 does not answer the question, but remains on the floor, the referees interrupt the game and show the hand signals 15 and 16 to allow two people from BLACK team to enter the court and give medical treatment to BLACK 2. BLACK team refuse to send anyone onto the court, and before the referees take any other action, BLACK 2 is ready to continue. Correct decision?",
                "options_en": ["BLACK 2 may continue to play.", "BLACK 2 must leave the court and can only re-enter the court following the third attack of his team.", "Progressive punishment to responsible team official of BLACK team"],
                "answer_en": ["BLACK 2 must leave the court and can only re-enter the court following the third attack of his team.", "Progressive punishment to responsible team official of BLACK team"]
            },
            {
                "question_es": "Con 30 segundos restantes de la primera mitad, BLANCO 5 recibe asistencia médica en la pista. Después de recibir asistencia médica, he abandona el terreno de juego y solo puede volver a ingresar después del tercer ataque de su equipo. Después de un minuto de la segunda mitad durante el segundo ataque del equipo BLANCO, BLANCO 5 penetra en el terreno de juego con una sustitución correcta con BLANCO 4. ¿Decisión correcta?",
                "options_es": ["Continua el juego", "Exclusión de 2’ para BLANCO 5 por un cambio antirreglamentario (penetrar en el terreno de juego antes de tiempo después de recibir asistencia médica en la pista)", "Time-out"],
                "answer_es": ["Exclusión de 2’ para BLANCO 5 por un cambio antirreglamentario (penetrar en el terreno de juego antes de tiempo después de recibir asistencia médica en la pista)", "Time-out"],
                "question_en": "With 30 seconds left in the first half, WHITE 5 receives medical treatment on the court. After receiving medical treatment, he leaves the court and can only re-enter following the third attack of his team. After one minute of the second half, during the second attack of WHITE team, WHITE 5 enters the court through a correct substitution with WHITE 4. Correct decision?",
                "options_en": ["Play on", "2-minute suspension for WHITE 5 due to a faulty substitution (entering the court too early after receiving medical treatment on the court)", "Time-out"],
                "answer_en": ["2-minute suspension for WHITE 5 due to a faulty substitution (entering the court too early after receiving medical treatment on the court)", "Time-out"]
            },
            {
                "question_es": "Después de un choque, BLANCO 4 y NEGRO 5 están tendidos en el suelo, aparentemente lesionados. Los árbitros inmediatamente interrumpen el juego y muestran las gestoformas 15 y 16 para dar permiso a ambos equipos para que 2 personas ingresen al terreno de juego para dar asistencia médica en la pista. Antes de que cualquier persona pueda entrar en la pista, NEGRO 5 está listo para jugar. BLANCO 4 recibe asistencia médica en la pista. Después de 20 segundos el juego puede continuar. ¿Decisión correcta?",
                "options_es": ["Después de recibir asistencia médica en la pista, BLANCO 4 tiene que abandonar el terreno de juego y solo puede volver a entrar después del tercer ataque de su equipo", "Como NEGRO 5 no recibió asistencia médica en la pista, se le permite continuar jugando", "NEGRO 5 tiene que abandonar el terreno de juego y solo puede volver a entrar después del tercer ataque de su equipo"],
                "answer_es": ["Después de recibir asistencia médica en la pista, BLANCO 4 tiene que abandonar el terreno de juego y solo puede volver a entrar después del tercer ataque de su equipo", "Como NEGRO 5 no recibió asistencia médica en la pista, se le permite continuar jugando"],
                "question_en": "After a collision, WHITE 4 and BLACK 5 lie on the floor and seem to be injured. The referees immediately interrupt the game and show the hand signals 15 and 16 to give both teams permission to let two people enter the court and give medical treatment on the court. Before any person can enter the court, BLACK 5 is ready to play. WHITE 4 receives medical treatment on the court. After 20 seconds, play can continue. Correct decision?",
                "options_en": ["After receiving medical treatment on the court, WHITE 4 has to leave the court and can only re-enter following the third attack of his team.", "As BLACK 5 did not receive medical treatment on the court, he is allowed to continue.", "BLACK 5 has to leave the court and can only re-enter following the third attack of his team."],
                "answer_en": ["After receiving medical treatment on the court, WHITE 4 has to leave the court and can only re-enter following the third attack of his team.", "As BLACK 5 did not receive medical treatment on the court, he is allowed to continue."]
            },
            {
                "question_es": "BLANCO 2 está lesionado y necesita asistencia médica en el terreno de juego. La primera mitad termina después del primer ataque de su equipo. Cuando el árbitro pita para comenzar la segunda mitad, BLANCO 2 está en la pista durante el ataque de su equipo. ¿Decisión correcta?",
                "options_es": ["El cronometrador interrumpe el juego inmediatamente e informa a los árbitros", "Exclusión de 2’ para BLANCO 2", "Continua el juego", "Golpe franco para el equipo NEGRO en la zona de cambios", "No hay exclusión para BLANCO 2, que debe abandonar el terreno de juego. El equipo BLANCO continúa en posesión del balón porque es un error del cronometrador/delegado"],
                "answer_es": ["El cronometrador interrumpe el juego inmediatamente e informa a los árbitros", "Exclusión de 2’ para BLANCO 2", "Golpe franco para el equipo NEGRO en la zona de cambios"],
                "question_en": "WHITE 2 is injured and needs medical treatment on the court. The first half finishes after the first attack of his team. When the referee whistles to start the second half, WHITE 2 is on the court during the attack of his team. Correct decision?",
                "options_en": ["The timekeeper immediately interrupts the game and informs the referees.", "2-minute suspension for WHITE 2", "Play on", "Free throw for BLACK team in the substitution area", "No suspension for WHITE 2 who must leave the court. WHITE team continues in possession of the ball because it is a mistake by the timekeeper/delegate."],
                "answer_en": ["The timekeeper immediately interrupts the game and informs the referees.", "2-minute suspension for WHITE 2", "Free throw for BLACK team in the substitution area"]
            },
            {
                "question_es": "BLANCO 4 está recibiendo asistencia médica en la pista. Después de recibir la asistencia, BLANCO 4 tiene que salir del terreno de juego y solo puede volver a ingresar después del tercer ataque de su equipo. Después del segundo ataque del equipo BLANCO, el oficial A del equipo BLANCO le pide a BLANCO 4 que entre a la pista para defender. BLANCO 4 entra a la pista a través de un cambio con BLANCO 6 para defender solamente ¿Decisión correcta?",
                "options_es": ["El juego continua – BLANCO 4 puede jugar en defensa", "Amonestación para BLANCO 4, porque ingresó a la pista antes de tiempo", "Exclusión de 2’ para BLANCO 4 por un cambio antirreglamentario"],
                "answer_es": ["Exclusión de 2’ para BLANCO 4 por un cambio antirreglamentario"],
                "question_en": "WHITE 4 is receiving medical treatment on the court. After receiving treatment, WHITE 4 has to leave the court and can only re-enter following the third attack of his team. After the second attack of WHITE team, team official A from WHITE team asks WHITE 4 to enter the court to play in defence. WHITE 4 enters the court through a substitution with WHITE 6 to play in defence only. Correct decision?",
                "options_en": ["Play on (WHITE 4 is allowed to play in defence)", "Warning for WHITE 4, because he entered the court too early", "2-minute suspension for WHITE 4 due to a faulty substitution"],
                "answer_en": "2-minute suspension for WHITE 4 due to a faulty substitution"
            },
            {
                "question_es": "BLANCO 11 resbala en el suelo y termina justo fuera del terreno de juego en el otro lado de la zona de cambios. Golpea su cabeza contra el tablero publicitario. Los árbitros inmediatamente interrumpen el juego para dar asistencia médica a BLANCO 11. Después de 20 segundos, BLANCO 11 está listo para jugar. ¿Decisión correcta?",
                "options_es": ["BLANCO 11 puede continuar el juego, porque estaba fuera del terreno de juego, cuando recibió la asistencia médica", "BLANCO 11 tiene que abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo"],
                "answer_es": "BLANCO 11 tiene que abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo",
                "question_en": "WHITE 11 slides on the floor and ends just outside the court on the other side of the substitution area. He hits his head against the advertising board. The referees immediately interrupt the game to call for medical treatment for WHITE 11. After 20 seconds, WHITE 11 is ready to play again. Correct decision?",
                "options_en": ["WHITE 11 is allowed to continue the game, because he was lying outside the court, when he received medical treatment.", "WHITE 11 has to leave the court and can only re-enter following the third attack of his team."],
                "answer_en": "WHITE 11 has to leave the court and can only re-enter following the third attack of his team."
            },
            {
                "question_es": "Después de un minuto de juego, hay un forcejeo entre el pivote NEGRO 3 y BLANCO 6. NEGRO 3 termina tirado en el suelo, aparentemente lesionado. Los árbitros deciden advertir verbalmente a BLANCO 6. NEGRO 3 pide asistencia médica en la pista. Después de recibir asistencia médica en el terreno de juego, NEGRO 3 está listo para continuar jugando. ¿Decisión correcta?",
                "options_es": ["NEGRO 3 puede continuar jugando", "NEGRO 3 tiene que abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo"],
                "answer_es": "NEGRO 3 tiene que abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo",
                "question_en": "After one minute of the game, there is a fight between BLACK 3 and WHITE 6. BLACK 3 ends up lying on the floor and seems to be injured. The referees choose to give WHITE 6 a verbal caution. BLACK 3 asks for medical treatment on the court. After receiving medical treatment on the court, BLACK 3 is ready to continue the game. Correct decision?",
                "options_en": ["BLACK 3 is allowed to continue the game.", "BLACK 3 has to leave the court and can only re-enter following the third attack of his team."],
                "answer_en": "BLACK 3 has to leave the court and can only re-enter following the third attack of his team."
            },
            {
                "question_es": "El equipo NEGRO está en un contraataque. NEGRO 2 bota el balón y es empujado por BLANCO 10. NEGRO 12 pierde parcialmente el control del cuerpo pero se las arregla para pasar el balón a NEGRO 4, que marca un gol. Después de marcar el gol, NEGRO 4 se tuerce el tobillo mientras corre en defensa. Los árbitros interrumpen el juego, excluyen 2’ a BLANCO 10 y dan permiso para que 2 personas entren al terreno de juego para dar asistencia médica a NEGRO 4. Después de 30 segundos NEGRO 4 está listo para jugar. ¿Decisión correcta?",
                "options_es": ["NEGRO 4 puede continuar jugando", "NEGRO 4 tiene que abandonar el terreno de juego y solo puede volver a entrar después del tercer ataque de su equipo"],
                "answer_es": "NEGRO 4 tiene que abandonar el terreno de juego y solo puede volver a entrar después del tercer ataque de su equipo",
                "question_en": "BLACK team is in a counter-attack. BLACK 2 dribbles the ball and is pushed by WHITE 10. NEGRO 12 loses partially body control, but manages to play the ball to BLACK 4, who scores a goal. After scoring a goal, BLACK 4 twists his ankle while running back in defence. The referees interrupt the game, give a 2-minute suspension for WHITE 10 and give permission for two people to enter the court to give medical treatment to BLACK 4. After 30 seconds, BLACK 4 is ready to play again. Correct decision?",
                "options_en": ["BLACK 4 is allowed to continue the game.", "BLACK 4 has to leave the court and can only re-enter following the third attack of his team."],
                "answer_en": "BLACK 4 has to leave the court and can only re-enter following the third attack of his team."
            },
            {
                "question_es": "BLANCO 11 realiza un lanzamiento a portería. El defensor NEGRO 2 desafortunadamente es golpeado en la cara por el balón y necesita asistencia médica en la pista. Después de 20 segundos de asistencia, NEGRO 2 está listo para jugar. ¿Decisión correcta?",
                "options_es": ["NEGRO 2 puede continuar jugando, porque la lesión fue causada por un balón en la cara", "NEGRO 2 tiene que abandonar la pista y solo puede volver a entrar después del tercer ataque de su equipo"],
                "answer_es": "NEGRO 2 puede continuar jugando, porque la lesión fue causada por un balón en la cara",
                "question_en": "WHITE 11 takes a shot on goal. Defender BLACK 2 is unfortunately hit in the face by the ball and needs medical treatment on the court. After 20 seconds of treatment, BLACK 2 is ready to play again. Correct decision?",
                "options_en": ["BLACK 2 is allowed to continue the game, because the injury was caused by a ball in the face.", "BLACK 2 has to leave the court and can only re-enter following the third attack of his team."],
                "answer_en": "BLACK 2 is allowed to continue the game, because the injury was caused by a ball in the face."
            },
            {
                "question_es": "El pivote NEGRO 2 está tirado en el suelo en el área de portería del equipo BLANCO después de un lanzamiento a portería solicitando asistencia médica aparentemente debido a una lesión en la pierna. El equipo BLANCO acaba de comenzar un contrataque. ¿Decisión correcta?",
                "options_es": ["Los árbitros inmediatamente interrumpen el juego y muestran las gestoformas 15 y 16 para solicitar asistencia médica en la pista para NEGRO 2", "Continua el juego hasta que haya un resultado del contraataque del equipo BLANCO – entonces interrumpen el juego para solicitar asistencia médica para NEGRO 2"],
                "answer_es": "Los árbitros inmediatamente interrumpen el juego y muestran las gestoformas 15 y 16 para solicitar asistencia médica en la pista para NEGRO 2",
                "question_en": "BLACK 2 is lying on the floor in the goal area of WHITE team after a shot on goal asking for medical treatment, apparently because of a leg injury. WHITE team has just started a counter-attack. Correct decision?",
                "options_en": ["The referees immediately interrupt the game and show hand signals 15 and 16 to call for medical treatment for BLACK 2", "Play on until there is a result of the counter-attack from WHITE team – then interrupt the game to call for medical treatment for BLACK 2"],
                "answer_en": "The referees immediately interrupt the game and show hand signals 15 and 16 to call for medical treatment for BLACK 2"
            },
            {
                "question_es": "BLANCO 2 está calentando sin codera. Después de 5 minutos de juego, el equipo BLANCO está en posesión del balón. BLANCO 2 penetra en el terreno de juego mediante una sustitución correcta. Los árbitros observan que BLANCO 2 ahora usa una codera con componentes duros descubiertos. ¿Decisión correcta?",
                "options_es": ["Continua el juego, se le permite usar una codera con componentes duros descubiertos", "Los árbitros interrumpen el juego, BLANCO 2 tiene que abandonar la pista y solo puede volver a entrar después de quitarse la codera o cubrir los componentes duros descubiertos", "Los árbitros interrumpen el juego, BLANCO 2 tiene que abandonar la pista y sólo puede volver a entrar después de quitarse la codera", "Sanción progresiva para BLANCO 2", "Sanción progresiva para el oficial responsable del equipo BLANCO", "Golpe franco para el equipo BLANCO", "Golpe franco para el equipo NEGRO"],
                "answer_es": ["Los árbitros interrumpen el juego, BLANCO 2 tiene que abandonar la pista y solo puede volver a entrar después de quitarse la codera o cubrir los componentes duros descubiertos", "Golpe franco para el equipo NEGRO"],
                "question_en": "WHITE 2 is warming up without elbow protection. After 5 minutes of the game, WHITE team is in possession of the ball. WHITE 2 enters the court under a correct substitution. The referees notice that WHITE 2 now wears an elbow protection with uncovered hard components. Correct decision?",
                "options_en": ["Play on, it is allowed to wear an elbow protection with uncovered hard components.", "The referees interrupt the game, WHITE 2 has to leave the court and can only re-enter after removing the elbow protection or covering up the uncovered hard components.", "The referees interrupt the game, WHITE 2 has to leave the court and can only re-enter after removing the elbow protection.", "Progressive punishment for WHITE 2", "Progressive punishment for responsible team official from WHITE team", "Free throw for WHITE team", "Free throw for BLACK team"],
                "answer_en": ["The referees interrupt the game, WHITE 2 has to leave the court and can only re-enter after removing the elbow protection or covering up the uncovered hard components.", "Free throw for BLACK team"]
            },
            {
                "question_es": "Mientras que el equipo BLANCO está atacando cerca de la línea de 9m. El jugador BLANCO 7 entra en la pista después una sustitución normal con su sudadera amarilla sobre la camiseta blanca normal. ¿Decisión correcta?",
                "options_es": ["Time-out, el jugador necesita quitarse la sudadera amarilla antes de continuar en la pista", "Golpe franco para el equipo NEGRO", "Exclusión de 2’ para BLANCO 7", "Golpe franco para el equipo BLANCO"],
                "answer_es": ["Time-out, el jugador necesita quitarse la sudadera amarilla antes de continuar en la pista", "Golpe franco para el equipo NEGRO"],
                "question_en": "WHITE team is attacking close to the 9-metre line. WHITE 7 enters the court after a normal substitution wearing his yellow pullover/jersey over the normal white t-shirt. Correct decision?",
                "options_en": ["The referees interrupt the game, WHITE 7 must take off the yellow jersey before continuing on the court.", "Free throw for BLACK team.", "2-minute suspension for WHITE 7.", "Free throw for WHITE team."],
                "answer_en": ["The referees interrupt the game, WHITE 7 must take off the yellow jersey before continuing on the court.", "Free throw for BLACK team."]
            },
            {
                "question_es": "El equipo BLANCO está en posesión del balón, cuando el cronometrador interrumpe el partido. El cronometrador le dice a los árbitros que BLANCO 11 ha entrado en la pista, y no hay BLANCO 11 incluido en el acta de partido. Resulta que el oficial A había incluido erróneamente al jugador en el acta de partido como número 13. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo BLANCO.", "Golpe franco para el equipo NEGRO.", "BLANCO 11 no tiene permitido participar en el partido", "Se corrige el error y BLANCO 11 tiene derecho a participar", "Informe escrito", "Sanción progresiva para el oficial A del equipo BLANCO"],
                "answer_es": ["Se corrige el error y BLANCO 11 tiene derecho a participar", "Informe escrito"],
                "question_en": "WHITE team is in possession of the ball, when the timekeeper interrupts the match. The timekeeper tells the referees that WHITE 11 has entered the court, and there is no WHITE 11 included in the score sheet. It turns out that official A had wrongly included the player in the score sheet as number 13. What is the correct decision?",
                "options_en": ["Free throw for WHITE team", "Free throw for BLACK team c) WHITE 11 is not allowed to participate in the match.", "The mistake is corrected, and WHITE 11 is entitled to participate.", "Note in the match report/written report in conformity with the regulations of the responsible federation.", "Progressive punishment for official A from WHITE team"],
                "answer_en": ["The mistake is corrected, and WHITE 11 is entitled to participate.", "Note in the match report/written report in conformity with the regulations of the responsible federation."]
            },
            {
                "question_es": "El marcador está 29:29 con 10 segundos restantes en el partido. El portero BLANCO 12 ejecuta un saque de portería y pasa el balón a BLANCO 11. BLANCO 11 ve que BLANCO 9 está en una posición libre en la línea del área de portería del equipo NEGRO. Antes de que pueda realizar el pase a BLANCO 9, el cronometrador interrumpe el juego debido a una mal cambio. NEGRO 2 ha entrado en el terreno de juego antes de que NEGRO 4 lo abandonara. ¿Cuál es la decisión correcta?",
                "options_es": ["Time-out.", "Golpe franco para el equipo BLANCO", "Lanzamiento de 7 metros para el equipo BLANCO", "Exclusión de 2’ para NEGRO 2", "Descalificación para NEGRO 2 (tarjeta roja mostrada por los árbitros)"],
                "answer_es": ["Time-out.", "Lanzamiento de 7 metros para el equipo BLANCO", "Descalificación para NEGRO 2 (tarjeta roja mostrada por los árbitros)"],
                "question_en": "The score is 29:29 with 10 seconds left in the match. Goalkeeper WHITE 12 executes a goalkeeper throw and passes the ball to WHITE 11. WHITE 11 sees that WHITE 9 is in a free position at the goal-area line of BLACK team. Before he can play the pass to WHITE 9, the timekeeper interrupts the game because of a faulty substitution. BLACK 2 has entered the court before BLACK 4 has left it. What is the correct decision?",
                "options_en": ["Time-out", "Free throw for WHITE team", "7-metre throw for WHITE team", "2-minute suspension for BLACK 2", "Disqualification for BLACK 2 (red card shown by the referees)"],
                "answer_en": ["Time-out", "7-metre throw for WHITE team", "Disqualification for BLACK 2 (red card shown by the referees)"]
            },
            {
                "question_es": "El marcador está 29:29 con 10 segundos restantes en el partido. El portero BLANCO 12 ejecuta un saque de portería y pasa el balón a BLANCO 11. BLANCO 11 ve que BLANCO 9 está en una posición libre en la línea del área de portería del equipo NEGRO. Pasa el balón a BLANCO 9. Antes de que BLANCO 9 lance a portería, el cronometrador interrumpe el juego debido a un mal cambio. NEGRO 2 ha entrado al terreno de juego antes de que NEGRO 4 lo abandonara. ¿Cuál es la decisión correcta?",
                "options_es": ["Time-out.", "Golpe franco para el equipo BLANCO.", "Lanzamiento de 7 metros para el equipo BLANCO.", "Exclusión de 2’ para NEGRO 2", "Descalificación para NEGRO 2 (tarjeta roja mostrada por los árbitros)"],
                "answer_es": ["Time-out.", "Lanzamiento de 7 metros para el equipo BLANCO.", "Descalificación para NEGRO 2 (tarjeta roja mostrada por los árbitros)"],
                "question_en": "The score is 29:29 with 10 seconds left in the match. Goalkeeper WHITE 12 executes a goalkeeper throw and passes the ball to WHITE 11. WHITE 11 sees that WHITE 9 is in a free position at the goal-area line of BLACK team. He passes the ball to WHITE 9. Before WHITE 9 takes a shot on goal, the timekeeper interrupts the game because of a faulty substitution. BLACK 2 has entered the court before BLACK 4 has left it. What is the correct decision?",
                "options_en": ["Time-out", "Free throw for WHITE team", "7-metre throw for WHITE team", "2-minute suspension for BLACK 2", "Disqualification for BLACK 2 (red card shown by the referees)"],
                "answer_en": ["Time-out", "7-metre throw for WHITE team", "Disqualification for BLACK 2 (red card shown by the referees)"]
            }
        ],
        "Regla 5": [
            {
                "question_es": "El portero NEGRO 1 para un lanzamiento a portería e inicia un contraataque. Al hacerlo sobrepasa la línea de área de portería con su pie izquierdo. ¿Cuál es la decisión correcta?",
                "options_es": ["Sigue el juego", "Golpe franco para el equipo BLANCO", "Repetición del saque de portería después de toque de silbato"],
                "answer_es": "Golpe franco para el equipo BLANCO",
                "question_en": "Goalkeeper BLACK 1 saves a shot on goal and starts a counter-attack. In doing so, he crosses the goal-area line with his left foot. Correct decision?",
                "options_en": ["Game continues without interruption", "Free throw for WHITE team", "Repeat goalkeeper throw after restart signal"],
                "answer_en": "Free throw for WHITE team"
            },
            {
                "question_es": "El portero BLANCO 12 está en el terreno de juego fuera de su área de portería. Cuando recibe el balón de un compañero, el portero introduce uno de sus pies dentro del área de portería, mientras que el otro pie permanece fuera de ella. ¿Cuál es la decisión correcta?",
                "options_es": ["Lanzamiento de 7 metros para el equipo NEGRO", "El juego continúa sin interrupción", "Golpe franco para el equipo NEGRO", "Exclusión de 2’ para el portero BLANCO 12"],
                "answer_es": "El juego continúa sin interrupción",
                "question_en": "Goalkeeper WHITE 12 is standing outside his goal area on the court. While receiving the ball from a teammate, the goalkeeper steps back with one foot into the goal area, while the other foot remains where it is. Correct decision?",
                "options_en": ["7-metre throw for BLACK team", "Game continues without interruption", "Free throw for BLACK team", "2-minute suspension for goalkeeper WHITE 12"],
                "answer_en": "Game continues without interruption"
            },
            {
                "question_es": "El portero BLANCO 12 para un lanzamiento y se lanza hacia el balón que se mueve en dirección al terreno de juego. BLANCO 12 alcanza el balón, se desliza y traspasa la línea del área de portería y pasa el balón a un compañero. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO", "El juego continua sin interrupción", "Saque de portería para el equipo BLANCO después de toque de silbato"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "Goalkeeper WHITE 12 saves a shot by diving towards the ball, which is moving in the direction of the playing area. WHITE 12 reaches the ball, but slides across the goal-area line and passes the ball in the playing area to a teammate. Correct decision?",
                "options_en": ["Free throw for BLACK team", "Game continues without interruption", "Goalkeeper throw for WHITE team after whistle signal"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "El portero NEGRO 1 para un lanzamiento y el balón rueda en dirección al terreno de juego. Para detener el balón antes que lo recoja BLANCO 15, que está esperando junto a la línea de área de portería, el portero golpea el balón con su pie justo antes de que lo recoja BLANCO 15 tal que el balón cruza la línea de fondo. ¿Cuál es la decisión correcta?",
                "options_es": ["Lanzamiento de 7 metros para el equipo BLANCO", "Golpe franco para el equipo BLANCO", "El juego continua sin interrupción", "Sanción progresiva para NEGRO 1 por poner en peligro al contrario"],
                "answer_es": "Lanzamiento de 7 metros para el equipo BLANCO",
                "question_en": "Goalkeeper BLACK 1 stops a shot on goal. The ball is rolling towards the playing area. To stop the ball before it reaches WHITE 15, who is waiting at the goal-area line, he slides it with his foot across the outer goal line just before it reaches WHITE 15. Correct decision?",
                "options_en": ["7-metre throw for WHITE team", "Free throw for WHITE team", "Game continues without interruption", "Progressive punishment against BLACK 1 since he has endangered an opponent"],
                "answer_en": "7-metre throw for WHITE team"
            },
            {
                "question_es": "El portero BLANCO 12 no consigue controlar el balón. El balón atraviesa el área de portería en dirección a la línea de banda. El portero usa su pie para jugar el balón, que cruza la línea de fondo. ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Golpe franco para el equipo NEGRO", "Saque de banda para el equipo NEGRO", "Sanción progresiva para el portero"],
                "answer_es": "Saque de banda para el equipo NEGRO",
                "question_en": "Goalkeeper WHITE 12 has not managed to get the ball under control. The ball moves inside the goal area towards the side line. The goalkeeper uses his foot to play the ball across the outer goal line. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "Free throw for BLACK team", "Throw-in for BLACK team", "Progressive punishment against the goalkeeper"],
                "answer_en": "Throw-in for BLACK team"
            },
            {
                "question_es": "El portero BLANCO 1 para un lanzamiento. El balón rueda en dirección hacia el terreno de juego donde NEGRO 6 está solo preparado para recogerlo. BLANCO 1 para el balón con su pie cuando éste se encuentra sobre la línea del área de portería. ¿Cuál es la decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO después de un toque de silbato", "Sanción progresiva para el BLANCO 1", "Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "answer_es": "Lanzamiento de 7 metros para el equipo NEGRO",
                "question_en": "Goalkeeper WHITE 1 blocks a shot. The ball rolls in the direction of the playing area, where BLACK 6 waits alone to pick up the ball. WHITE 1 manages to stop the ball with his foot, when the ball is on the goal-area line. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team after whistle signal", "Progressive punishment against WHITE 1", "Free throw for BLACK team", "7-metre throw for BLACK team"],
                "answer_en": "7-metre throw for BLACK team"
            },
            {
                "question_es": "NEGRO 18 efectúa un lanzamiento a portería. El lanzamiento es blocado, de forma que el balón cambia de dirección y va claramente hacia la línea de fondo (dentro del área de portería). BLANCO 1 corre tras el balón y con la ayuda de su pie consigue enviarlo fuera de la línea de gol. ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Saque de banda para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Amonestación para BLANCO 1"],
                "answer_es": "Saque de portería para el equipo BLANCO",
                "question_en": "BLACK 18 takes a shot on goal. The shot is blocked by WHITE 7, so that the ball changes direction and goes clearly in the direction of the outer goal line inside the goal area. Goalkeeper WHITE 1 runs after the ball and manages to put it over the outer goal line with his foot. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "Throw-in for BLACK team", "Free throw for BLACK team", "Warning for WHITE 1"],
                "answer_en": "Goalkeeper throw for WHITE team"
            },
            {
                "question_es": "El portero NEGRO 12 salta en su propia área de portería para recoger un pase largo de BLANCO 7. NEGRO 12 lo recoge mientras está en el aire y cae con un pie dentro de su área de portería y el otro pie fuera. En esta posición él juega el balón hacia NEGRO 3. ¿Decisión correcta?",
                "options_es": ["Lanzamiento de 7 metros para el equipo BLANCO", "El juego continua sin interrupción", "Golpe franco para el equipo BLANCO", "Corrección y saque de portería después del toque de silbato"],
                "answer_es": "Golpe franco para el equipo BLANCO",
                "question_en": "Goalkeeper BLACK 12 jumps up in his goal area to catch a long pass from WHITE 7. BLACK 12 catches the ball while he is in the air and lands with the ball with one foot in the goal area and one foot in the playing area. In this position he plays the ball to BLACK 3. Correct decision?",
                "options_en": ["7-metre throw to WHITE team", "Game continues without interruption", "Free throw to WHITE team", "Correction and goalkeeper throw after whistle signal"],
                "answer_en": "Free throw to WHITE team"
            },
            {
                "question_es": "El jugador BLANCO 9 pasa el balón a su portero BLANCO 1, que se encuentra en el área de juego. Como BLANCO 9 está presionado, lanza el balón demasiado alto, por lo que BLANCO 1 tiene que retroceder y entrar en el área de portería con un pie, inmediatamente después de haber recogido el balón. ¿Decisión correcta?",
                "options_es": ["El juego continua sin interrupción", "Time-out", "Lanzamiento de 7 metros para el equipo NEGRO", "Golpe franco para el equipo NEGRO"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "WHITE 9 passes the ball to his goalkeeper WHITE 1, who is standing in the playing area. Because WHITE 9 is under pressure, he throws the ball too high, so that WHITE 1 must move back and enter the goal area with one foot, immediately after catching the ball. Correct decision?",
                "options_en": ["Game continues without interruption", "Time-out", "7-metre throw for BLACK team", "Free throw for BLACK team"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "Los árbitros deciden dar un golpe franco para el equipo BLANCO junto a la línea del área de portería del equipo BLANCO. El portero BLANCO 1, está con un pie en el área de portería y el otro en el terreno de juego. Pasa el balón a BLANCO 8, quien marca un gol. ¿Decisión correcta?",
                "options_es": ["Gol para el equipo BLANCO", "Repetición del golpe franco fuera del área de portería del equipo BLANCO", "Golpe franco a favor del equipo NEGRO junto a la línea de área de portería del equipo BLANCO", "Saque de portería para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo BLANCO"],
                "answer_es": "Golpe franco a favor del equipo NEGRO junto a la línea de área de portería del equipo BLANCO",
                "question_en": "The referees give a free throw for WHITE team at the goal-area line of WHITE team. Goalkeeper WHITE 1 is standing with one foot in the goal area and one foot in the playing area. He passes the ball to WHITE 8, who scores a goal. Correct decision?",
                "options_en": ["Goal for WHITE team", "Repetition of the free throw outside the goal area of WHITE team", "Free throw for BLACK team at the goal-area line of WHITE team", "Goalkeeper throw for BLACK team", "7-metre throw for WHITE team"],
                "answer_en": "Free throw for BLACK team at the goal-area line of WHITE team"
            },
            {
                "question_es": "El árbitro pita debido a que NEGRO 21 dio muchos pasos. NEGRO 21 deja el balón sobre la línea de área de portería del equipo BLANCO. El portero BLANCO 12 quiere ejecutar rápidamente el lanzamiento. Él se ayuda con una mano en el suelo en el área de juego y tiene un pie en el suelo en el área de portería. Desde esta posición, pasa el balón a BLANCO 3, que inicia un contraataque que termina con un gol para el equipo BLANCO. ¿Decisión correcta?",
                "options_es": ["Repetición del golpe franco para el equipo BLANCO después de un toque de silbato", "Gol para el equipo BLANCO", "Golpe franco para el equipo NEGRO debido a la ejecución antirreglamentaria del golpe franco de BLANCO 12", "Time–out"],
                "answer_es": ["Golpe franco para el equipo NEGRO debido a la ejecución antirreglamentaria del golpe franco de BLANCO 12", "Time–out"],
                "question_en": "The referee whistles because of too many steps by BLACK 21. BLACK 21 puts the ball down at the goal-area line of WHITE team. Goalkeeper WHITE 12 wants to throw the ball quickly. He supports himself with one hand on the floor in the playing area, and he has one foot on the floor in the goal area. From this position he plays the ball to WHITE 3, who starts a counter-attack that leads to a goal for WHITE team. Correct decision?",
                "options_en": ["Repeat the free throw for WHITE team after whistle signal.", "Goal for WHITE team", "Free throw for BLACK team because of illegal free-throw execution by WHITE 12", "Time-out"],
                "answer_en": ["Free throw for BLACK team because of illegal free-throw execution by WHITE 12", "Time-out"]
            },
            {
                "question_es": "El portero NEGRO 12 salta en el área de juego justo fuera de su área de portería, recoge en el aire el balón que le pasó BLANCO 4 y lo lanza más allá de su línea exterior de portería. Después el portero cae dentro del área de portería. ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Saque de banda para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Amonestación para BLANCO 12"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "Goalkeeper WHITE 12 jumps up in the playing area just outside his goal area, catches the ball that has been thrown to him by WHITE 4 in the air, and throws it over the outer goal line. He then lands inside the goal area. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "Throw-in for BLACK team", "Free throw for BLACK team", "Warning for WHITE 12"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "El balón está en el suelo fuera del área de portería del equipo BLANCO. El portero BLANCO 1 está parado dentro del área de portería y recoge el balón para evitar que lo haga un adversario. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO", "Sanción progresiva para BLANCO 1", "Ninguna intervención, ya que esta acción está permitida"],
                "answer_es": "Ninguna intervención, ya que esta acción está permitida",
                "question_en": "The ball is on the floor right outside the goal area of WHITE team. Goalkeeper WHITE 1 stands inside the goal area and picks up the ball to prevent an opponent from taking it. Correct decision?",
                "options_en": ["Free throw for BLACK team", "7-metre throw for BLACK team", "Progressive punishment for WHITE 1", "No intervention because it is allowed"],
                "answer_en": "No intervention because it is allowed"
            }
        ],
        "Regla 6": [
            {
                "question_es": "El balón está parado en la línea del área de portería. El atacante BLANCO 7 lorecoge e intenta marcar. BLANCO 7 tiene una clara oportunidad de gol, cuando es tacado ilegalmente. ¿Decisión correcta?",
                "options_es": ["Golpe franco a favor del equipo NEGRO", "Golpe franco a favor del equipo BLANCO", "Lanzamiento de 7 metros a favor del equipo BLANCO", "Saque de portería a favor del equipo NEGRO"],
                "answer_es": "Lanzamiento de 7 metros a favor del equipo BLANCO",
                "question_en": "The ball lies on the goal-area line. Attacker WHITE 7 picks it up and tries to score. WHITE 7 has a clear chance of scoring, when he is illegally attacked. Correct decision?",
                "options_en": ["Free throw for BLACK team", "Free throw for WHITE team", "7-metre throw for WHITE team", "Goalkeeper throw for BLACK team"],
                "answer_en": "7-metre throw for WHITE team"
            },
            {
                "question_es": "El balón está rodando en el área de portería del equipo BLANCO. NEGRO 8 recoge el balón y marca un gol. ¿Decisión correcta?",
                "options_es": ["Golpe franco para el equipo BLANCO", "Saque de portería para el equipo BLANCO", "Gol", "Saque de centro"],
                "answer_es": "Golpe franco para el equipo BLANCO",
                "question_en": "The ball is rolling in the goal area of WHITE team. BLACK 8 picks the ball up and scores a goal. Correct decision?",
                "options_en": ["Free throw for WHITE team", "Goalkeeper throw for WHITE team", "Goal", "Throw-off"],
                "answer_en": "Free throw for WHITE team"
            },
            {
                "question_es": "BLANCO 3 está con ambos pies en el área de juego y recoge un balón rechazado por su portero. Ante la defensa correcta de NEGRO 10, BLANCO 3 bota el balón varias veces en su propia área de portería. ¿Decisión correcta?",
                "options_es": ["El juego continúa sin interrupción", "Lanzamiento de 7 metros para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Golpe franco para el equipo BLANCO"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "WHITE 3 stands with both feet in the playing area and catches the ball rebounding from his goalkeeper. When WHITE 3 is correctly obstructed by BLACK 10, he bounces the ball several times in his own goal area. Correct decision?",
                "options_en": ["Game continues without interruption", "7-metre throw for BLACK team", "Free throw for BLACK team", "Free throw for WHITE team"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "BLANCO 7 está fuera del área de portería del equipo NEGRO pero recoge el balón que está claramente en el aire encima del área de portería y marca un gol. ¿Decisión correcta?",
                "options_es": ["Gol para el equipo BLANCO", "Golpe franco para el equipo NEGRO", "Saque de portería para el equipo NEGRO", "Saque de portería para el equipo NEGRO después de un toque de silbato"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "WHITE 7 stands outside the goal area of BLACK team, but grabs the ball that is clearly in the air above the goal area and scores a goal. Correct decision?",
                "options_en": ["Goal for WHITE team", "Free throw for BLACK team", "Goalkeeper throw for BLACK team", "Goalkeeper throw for BLACK team after whistle signal"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "El jugador BLANCO 8, que es correctamente defendido por varios contrarios, rueda intencionadamente el balón hacia su propia área de portería, donde el balón sedetiene. El portero del equipo BLANCO no recoge el balón. ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Saque de portería para el equipo BLANCO, después de un toque de silbato", "Lanzamiento de 7 metros para el equipo NEGRO", "Golpe franco para el equipo NEGRO"],
                "answer_es": "Lanzamiento de 7 metros para el equipo NEGRO",
                "question_en": "WHITE 8, who is attacked correctly by several opponents, intentionally rolls the ball into his own goal area, where the ball comes to rest. Goalkeeper WHITE 1 does not pick up the ball. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "Goalkeeper throw for WHITE team after whistle signal", "7-metre throw for BLACK team", "Free throw for BLACK team"],
                "answer_en": "7-metre throw for BLACK team"
            },
            {
                "question_es": "BLANCO 5 juega intencionadamente el balón hacia su propia área de portería. El balón da en el poste y rueda hacia el área de juego. El portero BLANCO 12 recoge el balón dentro de su área y lo pasa a BLANCO 7 que marca un gol. ¿Cuál es la decisión correcta?",
                "options_es": ["Lanzamiento de 7 metros para el equipo NEGRO", "Gol", "Golpe franco para el equipo NEGRO", "Saque de portería para el equipo BLANCO"],
                "answer_es": "Lanzamiento de 7 metros para el equipo NEGRO",
                "question_en": "WHITE 5 plays the ball into his own team’s goal area. The ball hits the goal post and rolls towards the playing area. Goalkeeper WHITE 12 picks up the ball and passes it to WHITE 7, who scores a goal. Correct decision?",
                "options_en": ["7-metre throw for BLACK team", "Goal", "Free throw for BLACK team", "Goalkeeper throw for WHITE team"],
                "answer_en": "7-metre throw for BLACK team"
            },
            {
                "question_es": "El equipo NEGRO ha marcado un gol y BLANCO 10 ejecuta el saque de centro correspondiente. No encuentra a ningún compañero desmarcado, así que sorprende a su portero BLANCO 12 jugando el balón hacia él, a pesar de que el portero está dentro de su área de portería. BLANCO 12 recepciona el balón y se lo pasa a BLANCO 9. ¿Cuál es la decisión correcta?",
                "options_es": ["El juego continúa sin interrupción", "Lanzamiento de 7 metros para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Repetición del saque de centro después de corregir la situación"],
                "answer_es": "Lanzamiento de 7 metros para el equipo NEGRO",
                "question_en": "BLACK team has scored a goal, and WHITE 10 executes the subsequent throw-off. He does not find any other teammate available, so he surprises his goalkeeper WHITE 12 by playing the ball back to him, even though the goalkeeper is standing in his goal area. WHITE 12 takes the ball and passes it to WHITE 9. Correct decision?",
                "options_en": ["Game continues without interruption", "7-metre throw for BLACK team", "Free throw for BLACK team", "Throw-off repeated after correction"],
                "answer_en": "7-metre throw for BLACK team"
            },
            {
                "question_es": "El balón sale del rechace del portero del equipo NEGRO hacia el jugador atacante BLANCO 4, que lo está esperando justo fuera de la línea del área de portería. Para evitar una clara ocasión de gol, NEGRO 2 penetra en el área de portería y evita que BLANCO 4 coja el balón. ¿Decisión correcta?",
                "options_es": ["Golpe franco para el equipo BLANCO", "Lanzamiento de 7 metros para el equipo BLANCO", "Sanción progresiva para NEGRO 2", "Descalificación para NEGRO 2 (tarjeta roja mostrada por los árbitros)"],
                "answer_es": ["Lanzamiento de 7 metros para el equipo BLANCO", "Descalificación para NEGRO 2 (tarjeta roja mostrada por los árbitros)"],
                "question_en": "The ball rebounds from goalkeeper BLACK 1 to the attacking player WHITE 4, who is waiting just outside the goal-area line. To prevent a clear chance of scoring, BLACK 2 enters the goal area and prevents WHITE 4 from receiving the ball. Correct decision?",
                "options_en": ["Free throw for WHITE team", "7-metre throw for WHITE team", "Progressive punishment against BLACK 2", "Disqualification of BLACK 2 (red card shown by the referees)"],
                "answer_en": ["7-metre throw for WHITE team", "Disqualification of BLACK 2 (red card shown by the referees)"]
            },
            {
                "question_es": "BLANCO 10 pasa el balón hacia su propia área de portería. El portero BLANCO 1 salta y coge el balón en el aire. BLANCO 1 lo sujeta firmemente pero cae fuera del área de portería. ¿Decisión correcta?",
                "options_es": ["El juego continúa", "Saque de portería para el equipo BLANCO", "Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "WHITE 10 passes the ball in the direction of his own goal area. Goalkeeper WHITE 1 jumps from the goal area and catches the ball in the air. WHITE 1 firmly holds on to the ball and lands outside the goal area. Correct decision?",
                "options_en": ["Game continues without interruption", "Goalkeeper throw for WHITE team", "Free throw for BLACK team", "7-metre throw for BLACK team"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "BLANCO 11 pasa el balón hacia su propia área de portería, donde el portero BLANCO 1 salta y coge el balón en el aire. BLANCO 1 sujeta el balón firmemente y cae con un pie dentro del área de portería y el otro fuera. ¿Decisión correcta?",
                "options_es": ["El juego continúa", "Saque de portería para el equipo BLANCO", "Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "The ball is passed from WHITE 11 back into the goal area, where goalkeeper WHITE 1 jumps up and catches the ball in the air. WHITE 1 firmly holds on to the ball and lands with one foot inside the goal area and one foot outside. Correct decision?",
                "options_en": ["Game continues without interruption", "Goalkeeper throw for WHITE team", "Free throw for BLACK team", "7-metre throw for BLACK team"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "BLANCO 7 del equipo atacante tiene el balón y pisa dentro del área de portería del equipo contrario. ¿Decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO", "Saque de portería para el equipo NEGRO", "Saque de portería para el equipo NEGRO después del toque de silbato", "Golpe franco para el equipo NEGRO después del toque de silbato"],
                "answer_es": "Saque de portería para el equipo NEGRO",
                "question_en": "WHITE 7 from the attacking team is in possession of the ball and steps with the ball into the goal area of BLACK team. Correct decision?",
                "options_en": ["Free throw for BLACK team", "Goalkeeper throw for BLACK team", "Goalkeeper throw for BLACK team after whistle signal", "Free throw for BLACK team after whistle signal"],
                "answer_en": "Goalkeeper throw for BLACK team"
            },
            {
                "question_es": "El balón está parado en el suelo del área de portería del equipo BLANCO. En este momento, el anotador pita y explica que BLANCO 5 ha hecho un cambio antirreglamentario. ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Exclusión de 2’ para BLANCO 5", "Golpe franco para el equipo NEGRO junto a la línea de golpe franco del equipo BLANCO", "Golpe franco para el equipo NEGRO junto a la zona de cambios del equipo BLANCO"],
                "answer_es": ["Saque de portería para el equipo BLANCO", "Exclusión de 2’ para BLANCO 5", "Golpe franco para el equipo NEGRO junto a la zona de cambios del equipo BLANCO"],
                "question_en": "The ball is lying on the floor in the goal area of WHITE team. At this moment, the timekeeper whistles and explains that WHITE 5 has made a faulty substitution. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "2-minute suspension for WHITE 5", "Free throw for BLACK team at the free-throw line of WHITE team", "Free throw for BLACK team at the substitution area of WHITE team"],
                "answer_en": ["Goalkeeper throw for WHITE team", "2-minute suspension for WHITE 5", "Free throw for BLACK team at the substitution area of WHITE team"]
            },
            {
                "question_es": "¿En cuál(es) de los siguientes casos debe ordenarse un saque de portería?",
                "options_es": ["Cuando un jugador del equipo atacante que tiene el balón toca el área de portería del equipo contrario", "Cuando un jugador del equipo atacante sin balón toca el área de portería del equipo contrario y gana una ventaja al hacerlo", "Cuando un jugador del equipo atacante envía el balón por encima de la línea exterior de portería del equipo contrario", "Cuando un jugador con el balón toca el área de portería de su propio equipo"],
                "answer_es": ["Cuando un jugador del equipo atacante que tiene el balón toca el área de portería del equipo contrario", "Cuando un jugador del equipo atacante sin balón toca el área de portería del equipo contrario y gana una ventaja al hacerlo", "Cuando un jugador del equipo atacante envía el balón por encima de la línea exterior de portería del equipo contrario"],
                "question_en": "In which of the following cases should a goalkeeper throw be given?",
                "options_en": ["When a player of the attacking team (with the ball) touches the goal area of the opponents", "When a player of the attacking team (without the ball) touches the goal area of the opponents and gains an advantage by doing so", "When a player of the attacking team deflects the ball out across the outer goal line of the opponents", "When a player with the ball touches the goal area of his own team"],
                "answer_en": ["When a player of the attacking team (with the ball) touches the goal area of the opponents", "When a player of the attacking team (without the ball) touches the goal area of the opponents and gains an advantage by doing so", "When a player of the attacking team deflects the ball out across the outer goal line of the opponents"]
            },
            {
                "question_es": "El equipo BLANCO está atacando. NEGRO 4 está parado junto a la línea del área de portería. El balón está en el aire y NEGRO 4 lo alcanza y lo dirige hacia su propia área de portería. El balón es tocado por el portero NEGRO 1 y entonces cruza la línea exterior de portería fuera de la portería. ¿Decisión correcta?",
                "options_es": ["Saque de banda para el equipo BLANCO", "Golpe franco para el equipo BLANCO", "Lanzamiento de 7 metros para el equipo BLANCO", "Saque de portería para el equipo NEGRO", "Sanción progresiva para NEGRO 4"],
                "answer_es": ["Lanzamiento de 7 metros para el equipo BLANCO", "Sanción progresiva para NEGRO 4"],
                "question_en": "WHITE team is attacking. BLACK 4 stands at the goal-area line. The ball is in the air, and BLACK 4 reaches it to direct it into the goal area. The ball is touched by goalkeeper BLACK 1 and then crosses the outer goal line. Correct decision?",
                "options_en": ["Throw-in for WHITE team", "Free throw for WHITE team", "7-metre throw for WHITE team", "Goalkeeper throw for BLACK team", "Progressive punishment for BLACK 4"],
                "answer_en": ["7-metre throw for WHITE team", "Progressive punishment for BLACK 4"]
            },
            {
                "question_es": "El portero BLANCO 12 ha detenido un lanzamiento y tiene el balón bajo control en su área de portería. El portero aún tiene el balón en sus manos cuando el cronometrador pita por un cambio antirreglamentario del BLANCO 10. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO en la zona de cambios del equipo BLANCO", "Time-out", "Saque de portería para el equipo BLANCO", "Exclusión de 2’ para BLANCO 10", "Golpe franco para el equipo NEGRO en la línea de golpe franco del equipo BLANCO"],
                "answer_es": ["Golpe franco para el equipo NEGRO en la zona de cambios del equipo BLANCO", "Time-out", "Exclusión de 2’ para BLANCO 10"],
                "question_en": "Goalkeeper WHITE 12 has saved a shot and has the ball under control in his goal area. He still has the ball in his hands when the timekeeper whistles for a faulty substitution by WHITE 10. Correct decision?",
                "options_en": ["Free throw for BLACK team at the substitution area of WHITE team", "Time-out", "Goalkeeper throw for WHITE team", "2-minute suspension for WHITE 10", "Free throw for BLACK team at the free-throw line of WHITE team"],
                "answer_en": ["Free throw for BLACK team at the substitution area of WHITE team", "Time-out", "2-minute suspension for WHITE 10"]
            },
            {
                "question_es": "El portero BLANCO 12 salta en el área de juego justo fuera de su área de portería, recoge en el aire el balón que le pasó BLANCO 4 y lo lanza más allá de su línea exterior de portería. Después el portero cae dentro del área de portería. ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Saque de banda para el equipo NEGRO", "Golpe franco para el equipo NEGRO", "Amonestación para BLANCO 12"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "Goalkeeper WHITE 12 jumps up in the playing area just outside his goal area, catches the ball that has been thrown to him by WHITE 4 in the air, and throws it over the outer goal line. He then lands inside the goal area. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "Throw-in for BLACK team", "Free throw for BLACK team", "Warning for WHITE 12"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "BLANCO 9 lanza hacia la portería del equipo NEGRO. El portero NEGRO 1 para el lanzamiento y el balón sale rodando hacia el área de juego donde un jugador del equipo NEGRO está preparado para recogerlo. Como el portero resultó lesionado al detener el lanzamiento, los árbitros interrumpen el partido cuando el balón aún estaba en el área de portería. ¿Decisión correcta?",
                "options_es": ["Golpe franco para el equipo BLANCO", "Saque de portería para el equipo NEGRO", "Golpe franco para el equipo NEGRO"],
                "answer_es": "Saque de portería para el equipo NEGRO",
                "question_en": "WHITE 9 shoots at the goal of BLACK team. Goalkeeper BLACK 1 saves the shot, and the ball rolls towards the playing area, where a player from BLACK team is ready to pick it up. As BLACK 1 was injured when saving the shot, the referees interrupt the game, while the ball is still in the goal area. Correct decision?",
                "options_en": ["Free throw for WHITE team", "Goalkeeper throw for BLACK team", "Free throw for BLACK team"],
                "answer_en": "Goalkeeper throw for BLACK team"
            },
            {
                "question_es": "El balón rueda en el suelo dentro del área de portería del equipo BLANCO. En este momento, el cronometrador toca el silbato y explica que BLANCO 5 ha cometido un cambio antirreglamentario. ¿Decisión correcta?",
                "options_es": ["Saque de portería para BLANCO", "Exclusión de 2’ para BLANCO 5", "Golpe franco a favor del equipo NEGRO en la línea de golpe franco el equipo BLANCO", "Golpe franco a favor del equipo NEGRO en la zona de cambios del equipo BLANCO"],
                "answer_es": ["Saque de portería para BLANCO", "Exclusión de 2’ para BLANCO 5", "Golpe franco a favor del equipo NEGRO en la zona de cambios del equipo BLANCO"],
                "question_en": "The ball is rolling on the floor in the goal area of WHITE team. At this moment, the timekeeper whistles and explains that WHITE 5 has made a faulty substitution. Correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "2-minute suspension for WHITE 5", "Free throw for BLACK team at the free-throw line of WHITE team", "Free throw for BLACK team at the substitution area of WHITE team"],
                "answer_en": ["Goalkeeper throw for WHITE team", "2-minute suspension for WHITE 5", "Free throw for BLACK team at the substitution area of WHITE team"]
            },
            {
                "question_es": "BLANCO 5 hace un lanzamiento a portería. El lanzamiento es rechazado por el portero NEGRO 12 y va en el aire sobre el área de portería en dirección al pivote BLANCO 11, que está de pie en la línea del área de portería con una clara ocasión de gol preparado para coger el balón. El defensor NEGRO 2 salta en dirección al balón, y mientras está en el aire sobre el área de portería, juega el balón en dirección a la línea lateral. Debido al pega en el balón, éste se detiene en el área de portería sin que el portero lo toque ¿Decisión correcta?",
                "options_es": ["Saque de portería para el equipo NEGRO", "Golpe franco para el equipo BLANCO", "Lanzamiento de 7 metros para el equipo BLANCO", "Sanción progresiva para NEGRO 2"],
                "answer_es": ["Lanzamiento de 7 metros para el equipo BLANCO", "Sanción progresiva para NEGRO 2"],
                "question_en": "WHITE 5 takes a shot on goal. The shot is blocked by goalkeeper BLACK 12 and goes in the air over the goal area in the direction of pivot WHITE 11, who is standing at the goal-area line alone and ready to catch the ball. Defender BLACK 2 jumps in the direction of the ball, and while in mid air over the goal area, he plays the ball in the direction of the sideline. Because of glue on the ball, the ball comes to rest in the goal area without the goalkeeper touching it. Correct decision?",
                "options_en": ["Goalkeeper throw for BLACK team", "Free throw for WHITE team", "7-metre throw for WHITE team", "Progressive punishment for BLACK 2"],
                "answer_en": ["7-metre throw for WHITE team", "Progressive punishment for BLACK 2"]
            },
            {
                "question_es": "El portero NEGRO 1 ha parado un lanzamiento y quiere pasar el balón a NEGRO 6, que está preparado para un contraataque. Cuando NEGRO 1 hace el pase, toca la línea del área de portería. NEGRO 6 consigue el balón y marca un gol. ¿Decisión correcta?",
                "options_es": ["El gol es válido", "Golpe franco para el equipo BLANCO", "Corrección y repetición del saque de portería después del toque de silbato", "El gol no es válido"],
                "answer_es": "El gol no es válido",
                "question_en": "Goalkeeper BLACK 1 has saved a shot and wants to pass the ball to BLACK 6, who is ready for a fast break. When BLACK 1 makes the pass, he touches the goal-area line. BLACK 6 gets the ball and scores a goal. Correct decision?",
                "options_en": ["Goal is valid", "Free throw for team WHITE", "Correction and repeated goalkeeper throw after whistle", "Goal is not valid"],
                "answer_en": "Goal is not valid"
            },
            {
                "question_es": "BLANCO 6 está en un contraataque. Salta, lanza a portería y aterriza en el área de portería del equipo NEGRO. El portero NEGRO 12 bloquea el lanzamiento, y el balón va a BLANCO 11, que marca un gol mientras BLANCO 6 está en el área de portería entre él y el portero NEGRO 12. ¿Decisión correcta?",
                "options_es": ["Gol para el equipo BLANCO", "Saque de portería para el equipo NEGRO", "Golpe franco para el equipo NEGRO"],
                "answer_es": "Golpe franco para el equipo NEGRO",
                "question_en": "WHITE 6 is counter-attacking. He jumps, takes a shot on goal, and lands in the goal area of BLACK team. Goalkeeper BLACK 12 blocks the shot, and the ball goes to WHITE 11, who scores a goal, while WHITE 6 is lying in the goal area between him and goalkeeper BLACK 12. Correct decision?",
                "options_en": ["Goal for WHITE team", "Goalkeeper throw for BLACK team", "Free throw for BLACK team"],
                "answer_en": "Free throw for BLACK team"
            },
            {
                "question_es": "El equipo BLANCO está atacando y juega con su portería vacía. BLANCO 11 lanza a portería. El portero NEGRO 1 para el lanzamiento. Ejecuta el saque de portería hacia la portería vacía. BLANCO 10 intenta parar el lanzamiento. Salta desde fuera de su propia área de portería y, mientras está en el aire sobre la zona de portería, toca el balón. La pelota cruza la línea de banda. Después de tocar el balón, BLANCO 10 cae dentro del área de portería. ¿Cuál es la decisión correcta?",
                "options_es": ["Saque de portería para el equipo BLANCO", "Golpe franco para el equipo NEGRO", "Lanzamiento de 7 metros para el equipo NEGRO", "Saque de banda para el equipo NEGRO", "Sanción progresiva para BLANCO 10"],
                "answer_es": ["Lanzamiento de 7 metros para el equipo NEGRO", "Sanción progresiva para BLANCO 10"],
                "question_en": "WHITE team are in attack and play with an empty goal. WHITE 11 takes a shot on goal. Goalkeeper BLACK 1 saves the shot. He executes the goalkeeper throw as a shot on the empty goal. WHITE 10 tries to save the shot. He jumps from outside his own goal area and – while in the air over the goal area – touches the ball. The ball crosses the outer goal line. After touching the ball, WHITE 10 lands inside the goal area. What is the correct decision?",
                "options_en": ["Goalkeeper throw for WHITE team", "Free throw for BLACK team", "7-metre throw for BLACK team", "Throw-in for BLACK team", "Progressive punishment for WHITE 10"],
                "answer_en": ["7-metre throw for BLACK team", "Progressive punishment for WHITE 10"]
            },
            {
                "question_es": "El equipo BLANCO está atacando y juega con su portería vacía. BLANCO 11 lanza a portería. El portero NEGRO 1 para el lanzamiento. Ejecuta el saque de portería hacia la portería vacía. BLANCO 10 intenta parar el lanzamiento. Salta desde fuera de su propia área de portería y, mientras está en el aire sobre el área de portería, atrapa el balón y cae dentro del área de portería con el balón en sus manos. ¿Cuál es la decisión correcta?",
                "options_es": ["Golpe franco para el equipo NEGRO.", "Lanzamiento de 7 metros para el equipo NEGRO.", "Sanción progresiva para BLANCO 10"],
                "answer_es": ["Lanzamiento de 7 metros para el equipo NEGRO.", "Sanción progresiva para BLANCO 10"],
                "question_en": "WHITE team are in attack and play with an empty goal. WHITE 11 takes a shot on goal. Goalkeeper BLACK 1 saves the shot. He executes the goalkeeper throw as a shot on the empty goal. WHITE 10 tries to save the shot. He jumps from outside his own goal area and – while in the air over the goal area – catches the ball and lands inside the goal area with the ball in his hands. What is the correct decision?",
                "options_en": ["Free throw for BLACK team.", "7-metre throw for BLACK team.", "Progressive punishment for WHITE 10."],
                "answer_en": ["7-metre throw for BLACK team.", "Progressive punishment for WHITE 10."]
            }
        ]
    };

    function showSection(sectionName) {
        contentSections.forEach(sec => {
            sec.classList.remove('active');
            if (sec.id === `${sectionName}-section`) {
                sec.classList.add('active');
            }
        });
        
        if (sectionName === 'rules' && ruleSelect.value) {
            showRuleContent(ruleSelect.value);
        }
    }

   function loadRules() {
        // Agregar opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona una regla...';
        ruleSelect.appendChild(defaultOption);
        
        const defaultQuizOption = document.createElement('option');
        defaultQuizOption.value = '';
        defaultQuizOption.textContent = 'Todas las reglas (aleatorio)';
        quizRuleSelect.appendChild(defaultQuizOption);

        for (const rule in catalogData) {
            const option = document.createElement('option');
            option.value = rule;
            option.textContent = rule;
            ruleSelect.appendChild(option);
            
            const quizOption = document.createElement('option');
            quizOption.value = rule;
            quizOption.textContent = rule;
            quizRuleSelect.appendChild(quizOption);
        }
    }

    // Mostrar contenido de la regla seleccionada
    function showRuleContent(rule) {
        if (!rule) {
            ruleContentDiv.innerHTML = '<p>Selecciona una regla para ver su contenido.</p>';
            return;
        }
        
        const ruleData = catalogData[rule];
        if (!ruleData) {
            ruleContentDiv.innerHTML = '<p>No se encontró contenido para esta regla.</p>';
            return;
        }
        
        ruleContentDiv.innerHTML = `<h3>${rule}</h3>`; // Mostrar título de la regla
        
        ruleData.forEach((item, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'rule-item';
            questionElement.innerHTML = `
                <h4>Pregunta ${index + 1}:</h4>
                <p><strong>${item.question_es}</strong></p>
                <ul class="options-list">
                    ${item.options_es.map(option => `<li>${option}</li>`).join('')}
                </ul>
                <p class="correct-answer"><strong>Respuesta correcta:</strong> ${item.answer_es}</p>
            `;
            ruleContentDiv.appendChild(questionElement);
        });
    }

    // Iniciar el cuestionario
    function startQuiz() {
        const selectedRule = quizRuleSelect.value;
        
        if (selectedRule === '') {
            // Si no se selecciona regla específica, mezclar todas las preguntas
            currentQuizQuestions = [];
            for (const rule in catalogData) {
                currentQuizQuestions = currentQuizQuestions.concat(catalogData[rule]);
            }
            // Mezclar preguntas aleatoriamente
            currentQuizQuestions = shuffleArray(currentQuizQuestions);
        } else {
            currentQuizQuestions = [...catalogData[selectedRule]];
        }
        
        if (currentQuizQuestions.length === 0) {
            alert('No hay preguntas disponibles para el cuestionario.');
            return;
        }
        
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        quizResultsDiv.style.display = 'none';
        showNextQuestion();
    }

    // Función para mezclar array aleatoriamente
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Mostrar la siguiente pregunta del cuestionario
    function showNextQuestion() {
        if (currentQuestionIndex < currentQuizQuestions.length) {
            const question = currentQuizQuestions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <div class="question-header">
                    <h3>Pregunta ${currentQuestionIndex + 1} de ${currentQuizQuestions.length}</h3>
                    <p class="question-text">${question.question_es}</p>
                </div>
            `;
            
            const optionsList = document.createElement('div');
            optionsList.className = 'quiz-options';
            
            question.options_es.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.innerHTML = `
                    <label>
                        <input type="radio" name="quiz-option" value="${option}">
                        <span class="option-text">${option}</span>
                    </label>
                `;
                optionsList.appendChild(optionDiv);
            });
            
            questionContainer.appendChild(optionsList);
            
            // Agregar botón de evaluar
            const evaluateBtn = document.createElement('button');
            evaluateBtn.textContent = 'Evaluar Respuesta';
            evaluateBtn.className = 'btn-secondary evaluate-btn';
            evaluateBtn.addEventListener('click', evaluateAnswer);
            questionContainer.appendChild(evaluateBtn);
            
            quizFeedback.textContent = '';
            quizFeedback.className = 'quiz-feedback';
            nextQuestionBtn.style.display = 'none';
        } else {
            showResults();
        }
    }

    // Evaluar la respuesta
    function evaluateAnswer() {
        const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            const correctAnswer = currentQuizQuestions[currentQuestionIndex].answer_es;
            
            // Deshabilitar todas las opciones
            const allOptions = document.querySelectorAll('input[name="quiz-option"]');
            allOptions.forEach(option => option.disabled = true);
            
            // Ocultar botón de evaluar
            const evaluateBtn = document.querySelector('.evaluate-btn');
            if (evaluateBtn) evaluateBtn.style.display = 'none';
            
            if (answer === correctAnswer) {
                correctAnswersCount++;
                quizFeedback.textContent = '¡Correcto! ✓';
                quizFeedback.className = 'quiz-feedback correct';
                selectedOption.parentElement.parentElement.classList.add('correct-option');
            } else {
                quizFeedback.textContent = `Incorrecto. ✗ La respuesta correcta es: ${correctAnswer}`;
                quizFeedback.className = 'quiz-feedback incorrect';
                selectedOption.parentElement.parentElement.classList.add('incorrect-option');
                
                // Marcar la respuesta correcta
                allOptions.forEach(option => {
                    if (option.value === correctAnswer) {
                        option.parentElement.parentElement.classList.add('correct-option');
                    }
                });
            }
            
            // Mostrar botón siguiente
            if (currentQuestionIndex < currentQuizQuestions.length - 1) {
                nextQuestionBtn.textContent = 'Siguiente Pregunta';
            } else {
                nextQuestionBtn.textContent = 'Ver Resultados';
            }
            nextQuestionBtn.style.display = 'block';
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    }

    // Mostrar resultados del cuestionario
    function showResults() {
        const percentage = Math.round((correctAnswersCount / currentQuizQuestions.length) * 100);
        let performanceMessage = '';
        
        if (percentage >= 80) {
            performanceMessage = '¡Excelente conocimiento de las reglas!';
        } else if (percentage >= 60) {
            performanceMessage = 'Buen conocimiento, pero puedes mejorar.';
        } else {
            performanceMessage = 'Necesitas estudiar más las reglas.';
        }
        
        questionContainer.innerHTML = '';
        quizResultsDiv.innerHTML = `
            <div class="results-content">
                <h3>🏆 Resultados del Cuestionario</h3>
                <div class="score">
                    <p class="score-text">Respuestas correctas: <strong>${correctAnswersCount}</strong> de <strong>${currentQuizQuestions.length}</strong></p>
                    <p class="percentage">Porcentaje: <strong>${percentage}%</strong></p>
                    <p class="performance">${performanceMessage}</p>
                </div>
                <div class="results-actions">
                    <button class="btn-primary" onclick="location.reload()">Nuevo Cuestionario</button>
                    <button class="btn-secondary" onclick="document.querySelector('[data-section=\\'rules\\']').click()">Estudiar Reglas</button>
                </div>
            </div>
        `;
        quizResultsDiv.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
    }

    // Navegación entre secciones (enlaces del menú)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            showSection(section);
        });
    });

    // Navegación con botones data-navigate
    navigateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-navigate');
            showSection(section);
        });
    });

    // Cargar reglas al inicio
    loadRules();

    // Eventos de cambio en el selector de reglas
    ruleSelect.addEventListener('change', (e) => {
        showRuleContent(e.target.value);
    });

    // Iniciar cuestionario
    startQuizBtn.addEventListener('click', startQuiz);
    
    // Siguiente pregunta
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        showNextQuestion();
    });

    // Mostrar contenido inicial de reglas si hay alguna seleccionada
    if (ruleSelect.value) {
        showRuleContent(ruleSelect.value);
    }
});function loadRules() {
        // Agregar opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona una regla...';
        ruleSelect.appendChild(defaultOption);
        
        const defaultQuizOption = document.createElement('option');
        defaultQuizOption.value = '';
        defaultQuizOption.textContent = 'Todas las reglas (aleatorio)';
        quizRuleSelect.appendChild(defaultQuizOption);

        for (const rule in catalogData) {
            const option = document.createElement('option');
            option.value = rule;
            option.textContent = rule;
            ruleSelect.appendChild(option);
            
            const quizOption = document.createElement('option');
            quizOption.value = rule;
            quizOption.textContent = rule;
            quizRuleSelect.appendChild(quizOption);
        }
    }

    // Mostrar contenido de la regla seleccionada
    function showRuleContent(rule) {
        if (!rule) {
            ruleContentDiv.innerHTML = '<p>Selecciona una regla para ver su contenido.</p>';
            return;
        }
        
        const ruleData = catalogData[rule];
        if (!ruleData) {
            ruleContentDiv.innerHTML = '<p>No se encontró contenido para esta regla.</p>';
            return;
        }
        
        ruleContentDiv.innerHTML = `<h3>${rule}</h3>`; // Mostrar título de la regla
        
        ruleData.forEach((item, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'rule-item';
            questionElement.innerHTML = `
                <h4>Pregunta ${index + 1}:</h4>
                <p><strong>${item.question_es}</strong></p>
                <ul class="options-list">
                    ${item.options_es.map(option => `<li>${option}</li>`).join('')}
                </ul>
                <p class="correct-answer"><strong>Respuesta correcta:</strong> ${item.answer_es}</p>
            `;
            ruleContentDiv.appendChild(questionElement);
        });
    }

    // Iniciar el cuestionario
    function startQuiz() {
        const selectedRule = quizRuleSelect.value;
        
        if (selectedRule === '') {
            // Si no se selecciona regla específica, mezclar todas las preguntas
            currentQuizQuestions = [];
            for (const rule in catalogData) {
                currentQuizQuestions = currentQuizQuestions.concat(catalogData[rule]);
            }
            // Mezclar preguntas aleatoriamente
            currentQuizQuestions = shuffleArray(currentQuizQuestions);
        } else {
            currentQuizQuestions = [...catalogData[selectedRule]];
        }
        
        if (currentQuizQuestions.length === 0) {
            alert('No hay preguntas disponibles para el cuestionario.');
            return;
        }
        
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        quizResultsDiv.style.display = 'none';
        showNextQuestion();
    }

    // Función para mezclar array aleatoriamente
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Mostrar la siguiente pregunta del cuestionario
    function showNextQuestion() {
        if (currentQuestionIndex < currentQuizQuestions.length) {
            const question = currentQuizQuestions[currentQuestionIndex];
            questionContainer.innerHTML = `
                <div class="question-header">
                    <h3>Pregunta ${currentQuestionIndex + 1} de ${currentQuizQuestions.length}</h3>
                    <p class="question-text">${question.question_es}</p>
                </div>
            `;
            
            const optionsList = document.createElement('div');
            optionsList.className = 'quiz-options';
            
            question.options_es.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'quiz-option';
                optionDiv.innerHTML = `
                    <label>
                        <input type="radio" name="quiz-option" value="${option}">
                        <span class="option-text">${option}</span>
                    </label>
                `;
                optionsList.appendChild(optionDiv);
            });
            
            questionContainer.appendChild(optionsList);
            
            // Agregar botón de evaluar
            const evaluateBtn = document.createElement('button');
            evaluateBtn.textContent = 'Evaluar Respuesta';
            evaluateBtn.className = 'btn-secondary evaluate-btn';
            evaluateBtn.addEventListener('click', evaluateAnswer);
            questionContainer.appendChild(evaluateBtn);
            
            quizFeedback.textContent = '';
            quizFeedback.className = 'quiz-feedback';
            nextQuestionBtn.style.display = 'none';
        } else {
            showResults();
        }
    }

    // Evaluar la respuesta
    function evaluateAnswer() {
        const selectedOption = document.querySelector('input[name="quiz-option"]:checked');
        if (selectedOption) {
            const answer = selectedOption.value;
            const correctAnswer = currentQuizQuestions[currentQuestionIndex].answer_es;
            
            // Deshabilitar todas las opciones
            const allOptions = document.querySelectorAll('input[name="quiz-option"]');
            allOptions.forEach(option => option.disabled = true);
            
            // Ocultar botón de evaluar
            const evaluateBtn = document.querySelector('.evaluate-btn');
            if (evaluateBtn) evaluateBtn.style.display = 'none';
            
            if (answer === correctAnswer) {
                correctAnswersCount++;
                quizFeedback.textContent = '¡Correcto! ✓';
                quizFeedback.className = 'quiz-feedback correct';
                selectedOption.parentElement.parentElement.classList.add('correct-option');
            } else {
                quizFeedback.textContent = `Incorrecto. ✗ La respuesta correcta es: ${correctAnswer}`;
                quizFeedback.className = 'quiz-feedback incorrect';
                selectedOption.parentElement.parentElement.classList.add('incorrect-option');
                
                // Marcar la respuesta correcta
                allOptions.forEach(option => {
                    if (option.value === correctAnswer) {
                        option.parentElement.parentElement.classList.add('correct-option');
                    }
                });
            }
            
            // Mostrar botón siguiente
            if (currentQuestionIndex < currentQuizQuestions.length - 1) {
                nextQuestionBtn.textContent = 'Siguiente Pregunta';
            } else {
                nextQuestionBtn.textContent = 'Ver Resultados';
            }
            nextQuestionBtn.style.display = 'block';
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    }

    // Mostrar resultados del cuestionario
    function showResults() {
        const percentage = Math.round((correctAnswersCount / currentQuizQuestions.length) * 100);
        let performanceMessage = '';
        
        if (percentage >= 80) {
            performanceMessage = '¡Excelente conocimiento de las reglas!';
        } else if (percentage >= 60) {
            performanceMessage = 'Buen conocimiento, pero puedes mejorar.';
        } else {
            performanceMessage = 'Necesitas estudiar más las reglas.';
        }
        
        questionContainer.innerHTML = '';
        quizResultsDiv.innerHTML = `
            <div class="results-content">
                <h3>🏆 Resultados del Cuestionario</h3>
                <div class="score">
                    <p class="score-text">Respuestas correctas: <strong>${correctAnswersCount}</strong> de <strong>${currentQuizQuestions.length}</strong></p>
                    <p class="percentage">Porcentaje: <strong>${percentage}%</strong></p>
                    <p class="performance">${performanceMessage}</p>
                </div>
                <div class="results-actions">
                    <button class="btn-primary" onclick="location.reload()">Nuevo Cuestionario</button>
                    <button class="btn-secondary" onclick="document.querySelector('[data-section=\\'rules\\']').click()">Estudiar Reglas</button>
                </div>
            </div>
        `;
        quizResultsDiv.style.display = 'block';
        nextQuestionBtn.style.display = 'none';
    }

    // Navegación entre secciones (enlaces del menú)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            showSection(section);
        });
    });

    // Navegación con botones data-navigate
    navigateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-navigate');
            showSection(section);
        });
    });

    // Cargar reglas al inicio
    loadRules();

    // Eventos de cambio en el selector de reglas
    ruleSelect.addEventListener('change', (e) => {
        showRuleContent(e.target.value);
    });

    // Iniciar cuestionario
    startQuizBtn.addEventListener('click', startQuiz);
    
    // Siguiente pregunta
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        showNextQuestion();
    });

    // Mostrar contenido inicial de reglas si hay alguna seleccionada
    if (ruleSelect.value) {
        showRuleContent(ruleSelect.value);
    }