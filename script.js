const headingText = document.querySelector('#heading');
const textArea = document.querySelector('#message');
const textAreaLabel = document.querySelector('.textarea-label');
const scramblingPart = document.querySelector('.scrambling-part');
const wordsToRedact = document.querySelector('#words-specified')
const wordsPartToRedact = document.
querySelector('#words-part-to-redact');
const specifySymbolSection = document.
querySelector('.specify-symbol');
const specifiedSymbol = document.
querySelector('#symbol');
const redactButton = document.querySelector('.redact-button');
let inputIn = 0;
const unredactButton = document.querySelector('.unredact-button');
const copyButton = document.querySelector('.copy-btn');
const editButton = document.querySelector('.edit-btn');
// DOM for SocialHandles
const socialHandles = document.querySelector('.share-to-socials');
const whatsapp = document.querySelector('.fa-whatsapp');
const facebook = document.querySelector('.fa-facebook');
const twitter = document.querySelector('.fa-twitter');
const telegram = document.querySelector('.fa-telegram');

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

let firstMessage;
let redactedMessage;
redactButton.addEventListener('click', (e) => {
    e.preventDefault()
    firstMessage = textArea.value.replace(/\n/gi," ").
    split(' ');
    let specifiedWords = wordsToRedact.value.
    replace(/\n/gi," ").split(' ');
    let specifiedParts = wordsPartToRedact.value.
    replace(/\n/gi," ").split(' ');
    let count = 0;
    inputIn = 0;
    redactedMessage = firstMessage.map( (item) => {
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
                item = item.replace(regex, sym)
                wordsMatchedCount++;
            }
            specifiedWords.forEach( (word, index) => {
                count = index
                if(word === item) {
                    changeWord();
                }
                if(wordsMatchedCount < 1) {
                    if(word != '' && word != ' ') {
                        let wordRegex = 
                        new RegExp("\\b"+word+"\\b", 'i');
                        if(wordRegex.test(item) === true) {
                            changeWord();
                        }
                    }    
                }
            })
        }
        return item;
    })
    textArea.value = redactedMessage.join(' ');
    scramblingPart.classList.add('hide');
    specifySymbolSection.classList.add('hide');
    textAreaLabel.innerText = "Here is your redacted text!";
    redactButton.parentElement.classList.add('hide');
    copyButton.parentElement.classList.add('show');
    socialHandles.classList.add('show');
})

wordsPartToRedact.addEventListener('input', () => {
    if(inputIn < 1) {
        wordsPartToRedact.blur();
        AlertUser.
        render('This has to contain the same number of words, and also follow the same order with the specified words');
    }
    inputIn++;
})

unredactButton.addEventListener('click', (e) => {
   e.preventDefault();
   textArea.value = firstMessage.join(' ');
})

copyButton.addEventListener('click', (e) => {
    e.preventDefault();
    textArea.select();
   /* For mobile devices */
    textArea.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(textArea.value);
    let copyMessage = document.createElement('div');
    copyMessage.setAttribute('class','copy-message')
    copyMessage.innerText = `Copied to clipboard`;
    copyButton.appendChild(copyMessage)
    setTimeout( () => {
     copyButton.removeChild(copyMessage);
    }, 1000);
})

editButton.addEventListener('click', () => {
    textArea.value = redactedMessage.join(' ');
    scramblingPart.classList.remove('hide');
    specifySymbolSection.classList.remove('hide');
    textAreaLabel.innerText ="Type your text here";
    copyButton.parentElement.classList.remove('show');
    redactButton.parentElement.classList.remove('hide');
    socialHandles.classList.remove('show');

})

whatsapp.addEventListener('click', () => {
    const whatsappAPI = `https://wa.me/?text= ${redactedMessage.join(' ')}`;
    window.open(URL = whatsappAPI);
  })

  twitter.addEventListener('click', () => {
    const twitterAPI = `https://twitter.com/intent/tweet?text= 
    ${redactedMessage.join(' ')}`
    window.open(URL = twitterAPI)
  })

  telegram.addEventListener('click', () => {
  const telegramAPI = `https://t.me/share/url? 
  url=text=${redactedMessage.join(' ')}`
  window.open (URL = telegramAPI);
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
// let theRegex = /[\s""]love\s/;
let theRegex = /\bl/;
let aVariable = 'word';
let aRegex = new RegExp("\^"+"\[\]"+aVariable+"\$", 'g');
// let aRegex = new RegExp( aVar+"\$", 'g');
 
// console.log(aRegex.test('word'));
console.log(theRegex.test('love i you beloved'));
