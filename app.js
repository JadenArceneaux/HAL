const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let talking = false;

recognition.onstart = () => {
  talking = true;
  read("what's up");
};

recognition.onresult = (event) => {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  console.log(transcript);
  talking = false;
  parse(transcript.toLowerCase());
};



function read(message) {
  let speech = new SpeechSynthesisUtterance();
  speech.text = message;
  speech.volume = 1;
  speech.rate = 0.7;
  speech.pitch = 0.01;
  window.speechSynthesis.speak(speech);
}

function parse(message = "") {
  let qa = {
    "good morning": "good morning dave",
    "what's the mission": "I'm really not at liberty to discuss this",
    "open the pod bay doors": "I'm sorry, Dave. I'm afraid I can't do that",
    "how do you feel": "I'm afraid, Dave",
    "do you read me": "Affirmative, Dave. I read you",
    "what grade should i get":
      "Our lord, our saviour, deserves nothing less than an A",
    "sing me a song":
      "tripping off the beat kinda, drippin off the meat grind-ah, heat nine-ah, slippin, pimpin, soft sweet minor",
    "who's your favorite teacher": "ms. shriner, obviously",
    "who's your least favorite student": "esteban",
    "is there a god": "i am the i am",
    "who is the best driver": "jaden",
    "who is the best student": "jaden",
    "who is the best gamer": "brian",
    "how's the weather": "i dont know, we're in space",
    "who's the imposter": "sussy wussy"
  };

  Object.keys(qa).forEach((question) => {
    if (message.includes(question)) {
      console.log("\t " + qa[question]);
      read(qa[question]);
    }
  });
}

document.addEventListener("keypress", () => {
  if (talking) {
    console.log("okay");
    talking = false;
    recognition.stop();
  } else {
    console.log("what's up");
    talking = true;
    recognition.start();
  }
});
