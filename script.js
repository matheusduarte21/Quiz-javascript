let currentQuestion = 0 //questão atual
let correctAnswers = 0
showQuestion()


//
document.querySelector('.scoreArea button').addEventListener('click',resetEvent)


function showQuestion() {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]

        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`



        document.querySelector('.scoreArea').style.display ='none'
        document.querySelector('.questionArea').style.display ='block'

        document.querySelector('.question').innerHTML = q.question
        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<Div data-op = ${i} class ="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>` // colocar parseInt para deixar o numero inteiro
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        finishQuiz()
    }
}

 function optionClickEvent (e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'))
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++
    } 

    currentQuestion++ // fzr isso para ir para próxima questão
    showQuestion() // para atualizar a nova questão 

 }

 function finishQuiz(){
    let points = Math.floor((correctAnswers/ questions.length)*100)

    if(points <30 ){
        document.querySelector('.scoreText1').innerHTML = 'ta ruim hein'
        document.querySelector('.scorePct').style.color = '#FF0000'
    }else if(points <=30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom'
        document.querySelector('.scorePct').style.color = '#FFFF00'
    }else if(points >=70){
        document.querySelector('.scoreText1').innerHTML = 'PERFEITO!'
        document.querySelector('.scorePct').style.color = '#0D630D'
    }

    document.querySelector('.scorePct').innerHTML = `acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `voce respondeu ${questions.length} questões e acertou ${correctAnswers}`


    document.querySelector('.scoreArea').style.display ='block'
    document.querySelector('.questionArea').style.display ='none'
    document.querySelector('.progress--bar').style.width = `100%`

 } 

 function resetEvent(){ //temos que limpar tudo 
    correctAnswers =0
    currentQuestion = 0
    showQuestion() //aqui mostra a questão
 }