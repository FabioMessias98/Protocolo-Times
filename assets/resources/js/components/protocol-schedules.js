(function() {
    const buttonsCTA = Array.from( document.getElementsByClassName( 'js-call-to-action' ) )
    const buttonStart = document.querySelector( '.js-button-start' )
    const progressBar = document.querySelector( '.js-progress-bar' )
    const progressNumber = document.querySelector( '.js-progress-number' )

    changeSelect()

    buttonsCTA.forEach( element => {
        element.addEventListener( 'click', function() {
            scrollSection( this )
        })
    })

    buttonStart.addEventListener( 'click', () => {
        chooseCalculate()
    })
    
    function changeSelect() {
        if( document.querySelector( '.js-select-time' ) ) {
            const selectsTime = Array.from( document.getElementsByClassName( 'js-select-time' ) )
            const timeItems = Array.from( document.getElementsByClassName( 'js-select-time-item' ) )
            // const selectsCurrent = document.getElementsByClassName( '.js-kind-weather-current' )

            selectsTime.forEach( element => {
                element.addEventListener( 'click', function() {
                    this.classList.toggle( 'is-active' )
                })
            })

            timeItems.forEach( element => {
                element.addEventListener( 'click', function() {
                    this.parentElement.parentElement.querySelector( '.js-kind-weather-current' ).innerText = this.innerText
                })
            })
        }
    }

    function scrollSection( button ) {
        const sections = document.getElementsByClassName( 'js-section' )

        for( let i = 0; i < sections.length; i++ ) {
            if( sections[i].dataset.value == button.dataset.value ) {
                sections[i].classList.add( 'hidden' )
                sections[i].classList.remove( 'flex' )
                sections[++i].classList.add( 'flex' )
                sections[i].classList.remove( 'hidden' )
            }
        } 
    }

    function chooseCalculate() {
        const timeStudy = document.querySelector( '.js-time-study' ).value   
        const kindWeatherCurrent = document.querySelector( '.js-kind-weather-current' ).innerText

        if( kindWeatherCurrent == 'Horas' ) {
            calculateHours( timeStudy )
        } else if( kindWeatherCurrent == 'Minutos' ) {
            calculateMinutes( timeStudy )
        } else {
            console.log( 'Nenhum tipo de tempo encontrado!' )
        }
    }

    function calculateHours( time ) {
        time = time * 60
        calculateMinutes( time )
    }

    function calculateMinutes( time ) {
        let seconds = time * 60
        let percentage = 100
        let value = percentage / seconds

        let progressInterval = setInterval(() => {
            progressBar.style.width = `${percentage}%`
            progressNumber.innerText = `${parseInt(percentage)}%`
            percentage = percentage - value
            
            if( percentage > 25 && percentage < 75 ) {
                progressBar.style.backgroundColor = '#472E5F'
            } else if( percentage > 0 && percentage < 25 ) {
                progressBar.style.backgroundColor = '#A855F7'
            } else if( percentage < 0 ) {
                progressBar.style.width = '0%'
                progressNumber.innerText = '0%'
                clearInterval( progressInterval )
            }
        }, 1000)

        statusAnswer()
        waitTimeOut( progressInterval )
    }

    function statusAnswer() {
        const timeAnswer = document.querySelector( '.js-time-answer' ).value
        const progressAnswer = document.querySelector( '.js-progress-answer' )
        const timeStudy = document.querySelector( '.js-time-study' ).value   
        let percentage = 100
        let space = percentage / timeStudy

        progressAnswer.style.right =  `${space}%`
    }

    function waitTimeOut( interval ) {
        const timeAnswer = document.querySelector( '.js-time-answer' ).value
        let timeout = ((timeAnswer * 60) * 1000)
        
        setTimeout(() => {
            showModalAnswer( interval )
        }, timeout)
    }

    function showModalAnswer() {
        const answer = document.querySelector( '.js-answer-field' ).value 
        const modal = document.querySelector( '.js-modal-answer' )
        const text = document.querySelector( '.js-modal-answer-text' )
        const buttonConfirm = document.querySelector( '.js-modal-answer-button-confirm' )

        pauseProgressBar()

        modal.classList.add( 'is-active' )
        text.innerText = answer

        buttonConfirm.addEventListener( 'click', () => {
            modal.classList.remove( 'is-active' )
        })
    }

    function pauseProgressBar() {
        return
    }

//     let time = document.getElementById("time");
// let stopButton = document.getElementById("stop");
// let playButton = document.getElementById("play");

// let timeCount = 0,
//   currentTimeout;

// function play_pause() {
//   let status = playButton.innerHTML;
//   if (status == "pause") {
//     playButton.innerHTML = "Resume";
//     clearInterval(currentTimeout);
//     return;
//   }
//   playButton.innerHTML = "pause";
//   stopButton.hidden = false;
//   clearInterval(currentTimeout);
//   currentTimeout = setInterval(() => {
//     timeCount++;
//     const min = String(Math.trunc(timeCount / 60)).padStart(2, 0);
//     const sec = String(Math.trunc(timeCount % 60)).padStart(2, 0);
//     time.innerHTML = `${min} : ${sec}`;
//   }, 1000);
// }

// function reset() {
//   stopButton.hidden = true;
//   playButton.innerHTML = "play";
//   clearInterval(currentTimeout);
//   timeCount = 0;
//   time.innerHTML = `00 : 00`;
// }
})()