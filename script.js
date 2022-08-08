const headingText = document.querySelector('#heading');
const textArea = document.querySelector('#message');
const scramblingPart = document.querySelector('.scrambling-part');
const wordsToRedact = document.querySelector('#words-specified')
const wordsPartToRedact = document.
querySelector('#words-part-to-redact');
const specifiedSymbol = document.
querySelector('#symbol');
const redactButton = document.querySelector('.redact-button');
let inputIn = 0;
// Overlay divs
const overlay =  document.querySelector('.overlay')
const overlayBtn = document.querySelector('.overlay-btn')
const startQuizBtn = document.querySelector('.start-btn');
//creating custom alert fuction
function customAlert() {
    this.render = function (dialogue) {
      const dialogueBody = document.querySelector('.dialogue-body')
      dialogueBody.innerText = dialogue;
      overlay.classList.add('alert-user-custom');  
    }
}
overlayBtn.addEventListener('click', () => {
    overlay.classList.remove('alert-user-custom');
})
const AlertUser = new customAlert();


redactButton.addEventListener('click', (e) => {
    e.preventDefault()
    let firstMessage = textArea.value.replace(/\n/gi," ").
    split(' ');
    let specifiedWords = wordsToRedact.value.
    replace(/\n/gi," ").split(' ');
    let specifiedParts = wordsPartToRedact.value.
    replace(/\n/gi," ").split(' ');
    let count = 0;
    inputIn = 0;
    let redactedMessage = firstMessage.map( (item) => {
        let wordsMatchedCount = 0;
        let sym;
        if(count <= specifiedParts.length) {
            function changeWord()  {
                let regex = new RegExp(specifiedParts[count], "i");
                if(!specifiedSymbol.value) {
                    sym = '*'.repeat(specifiedParts[count].length);
                }
                else {
                    sym = specifiedSymbol.value[0].
                    repeat(specifiedParts[count].length);
                }
                console.log(count)
                item = item.replace(regex, sym)
                console.log(item, regex);
                wordsMatchedCount++;
            }
            specifiedWords.forEach( (word, index) => {
                count = index
                if(word === item) {
                    console.log(index, word, item);
                    changeWord();
                }
                if(wordsMatchedCount < 1) {
                    if(word != '' && word != ' ') {
                        let wordRegex = 
                        new RegExp("\\b"+word+"\\b", 'i');
                        if(wordRegex.test(item) === true) {
                            console.log(index, word, item);
                            changeWord();
                        }
                    }    
                }
            })
        }
        return item;
    })
    textArea.value = redactedMessage.join(' ');
})

wordsPartToRedact.addEventListener('input', () => {
    if(inputIn < 1) {
        // let alertUser = document.createElement('div');
        // alertUser.innerText = 'this has to follow the same order with the specified words'
        // alertUser.setAttribute('class','alert-user');
        // const specifyWordPart = document.querySelector('.word-part-to-redact')
        // specifyWordPart.appendChild(alertUser)
        // setTimeout( () => {
        //     alertUser.classList.add('hide')
        // }, 5000);
        wordsPartToRedact.blur();
        AlertUser.
        render('This has to contain the same number of words, and also follow the same order with the specified words');
    }
    inputIn++;
})






let aword = 
'boy'
let oneRegex = new RegExp("\\b"+aword+"\\b", 'gi')
// let oneRegex = new RegExp(aword, 'gi');

let anArray = ['boy.','boyous', 'jj', 'he', 'i']
// console.log(oneRegex.test(anArray[0]));
// console.log(oneRegex.test(anArray[1]));
// for(item of anArray) {
//     console.log(item)
// }

// const regex = new RegExp("\\b"+element+"\\b", "gi");
// if (!specifyChar) {
//     scrambledMessage =  scrambledMessage.replace( regex, "*".repeat(element.length));
// } else {
//     sym = specifyChar[0].repeat(element.length);
//     scrambledMessage =  scrambledMessage.replace( regex, sym);
// }
// setTimeout(callConsole, 7000)

// function callConsole() {
//     console.log('now')
// }