import React, { Component } from 'react';
import { RiSpeakFill } from "react-icons/ri";
import styles from "./Sentence.module.css";
import { IoMdMic } from "react-icons/io";
import { FaRegStopCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { HiCheckBadge } from "react-icons/hi2";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Sentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentence:  props.sentence,
      recognition: null,
      currentWordIndex: -1,
      currentTranscript: null,
      wordsList: props.sentence.split(" ").map((word) => ({
        text: word,
        isInSpeech: false,
      })),
      toolState: "idle",
    };
  }

  speakText = (text, index) => {
    console.log(text)
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => this.setState({ currentWordIndex: index });
      utterance.onend = () => this.setState({ currentWordIndex: -1 });
      speechSynthesis.speak(utterance);
    } else {
      toast.error("Unable to Play, Your Browser donot support this feature");
    }
  }

  getClassForWord = (word, index) => {
    const { currentWordIndex, toolState } = this.state;
    if (word.isInSpeech) {
      return styles.correct;
    } else if (!word.isInSpeech && toolState === 'fail') {
      return styles.wrong;
    } else {
      return index === currentWordIndex ? styles.highlighted : "";
    }
  }

  updateWordState = (transcript) => {
    this.setState((prevState)=>({
        currentTranscript : transcript
    }));
    this.setState((prevState) => ({
      wordsList: prevState.wordsList.map((word) => {
        if (!word.isInSpeech) {
          return {
            ...word,
            isInSpeech: transcript.toLowerCase().split(" ").includes(word.text.toLowerCase()),
          };
        } else {
          return word;
        }
      }),
    }));
    if(this.checkAllWordsSpoken()){
        this.endSpeech()
    }
  }

  checkAllWordsSpoken = () => {
    return this.state.wordsList.every((word) => word.isInSpeech);
  }

  tryAgain = () => {
    const updatedWords = this.state.wordsList.map((word) => ({
      ...word,
      isInSpeech: false,
    }));
    this.setState({
      wordsList: updatedWords,
      toolState: "idle",
    });
  }

  recogniseText = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      toast.error("Your browser doesn't support SpeechRecognition API");
    } else {
      this.setState({ toolState: "recording" });
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;
      recognitionInstance.continuous = true;
      recognitionInstance.onresult = (event) => {
        const currentTranscript = event.results[event.results.length - 1][0].transcript;
        console.group("Speech Recognition Result");
        console.log("Transcript:", currentTranscript);
        console.groupEnd();
        this.updateWordState(currentTranscript);
      };

      recognitionInstance.onend = () => {
        console.group("Speech Recognition End");
        console.log("Speech recognition ended");
        console.groupEnd();
        const isAllWordsSpoken = this.checkAllWordsSpoken()
        this.setState((prevState) => ({
          toolState:  isAllWordsSpoken? "success" : "fail",
          recognition: null,
          currentTranscript:null
        }));
        isAllWordsSpoken ?  toast.success("You got it right") : toast.error("Sorry, Try Again");
      };

      recognitionInstance.onerror = (event) => {
        console.group("Speech Recognition Error", this.state.toolState);
        console.error("Recognition error:", event.error);
        console.groupEnd();
        if (this.state.toolState !== 'success' || this.state.toolState !== 'fail') {
          this.setState({ toolState: "idle" });
        }
      };
      recognitionInstance.start();
      this.setState({ recognition: recognitionInstance });
    }
  }

  endSpeech = () => {
    const { recognition } = this.state;
    if (recognition) {
      console.log(recognition);
      recognition.abort();
      this.setState({ recognition: null });
    }
  }

  render() {
    const { sentence, wordsList, toolState, currentTranscript } = this.state;
    return (
      <div className={styles.sentenceCard}>
        <div className={styles.wordList}>
          {wordsList.map((word, index) => (
            <span
              key={index}
              className={`${styles.wordCard} ${this.getClassForWord(word, index)}`}
              onClick={() => this.speakText(word.text, index)}
            >
              {word.text}
            </span>
          ))}
        </div>
        {toolState === "idle" && (
          <button onClick={() => this.speakText(sentence, -1)} className={styles.readMeBtn}>
            read it to me
            <span>
              <RiSpeakFill />
            </span>
          </button>
        )}
        <ToastContainer />
        <div className={styles.Btns}>
          {toolState === "idle" && (
            <button onClick={this.recogniseText} className={styles.micBtn}>
              <IoMdMic />
            </button>
          )}
          {toolState === "recording" && (
            <button onClick={this.endSpeech} className={styles.recordBtn}>
              <FaRegStopCircle />
            </button>
          )}
          {toolState === "fail" && (
            <button onClick={this.tryAgain} className={styles.recordBtn}>
              <GrPowerReset />
            </button>
          )}
          {toolState === "success" && (
            <button className={styles.successBtn}>
              <HiCheckBadge />
            </button>
          )}
        </div>
        <div className={styles.transcript}>
          {currentTranscript}
        </div>
      </div>
    );
  }
}

export default Sentence;