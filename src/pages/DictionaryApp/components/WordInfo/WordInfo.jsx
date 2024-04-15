import React from "react";
import styles from "./WordInfo.module.css";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdVolumeHigh } from "react-icons/io";
import phoneticImage from '../../../../assets/speaking.png';

const WordInfo = ({ details, setDefinitions }) => {
  const [activeTab, setActiveTab] = useState("definitions");
  const [currentAudio, setCurrentAudio] = useState(null); 

  function playAudio(audioUrl) {
    console.log(audioUrl)
    if (currentAudio) {
        currentAudio.pause(); 
    }
    const audio = new Audio(audioUrl);
    audio.play(); 
    setCurrentAudio(audio); 

    audio.addEventListener('ended', () => {
        setCurrentAudio(null); 
    });
    audio.addEventListener('error', (err) => {
    console.log(err)
        setCurrentAudio(null); 
    });
}

  return (
    <div className={styles.WordInfoCard}>
      <div className={styles.WordInfoContainer}>
        <div className={styles.CardTitleContainer}>
          <h1 className={styles.Word}>{details.word}</h1>
          <button
            onClick={() => setDefinitions(null)}
            className={styles.SearchButton}
          >
            <CiSearch />
          </button>
        </div>
      </div>

      <div className={styles.TabContainer}>
        <div className={styles.TabsContainer}>
          <div
            onClick={() => setActiveTab("definitions")}
            className={`${styles.TabButton} ${
              activeTab === "definitions" ? styles.ActiveTab : ""
            }`}
          >
            Definitions
          </div>
          <div
            onClick={() => setActiveTab("phonetics")}
            className={`${styles.TabButton} ${
              activeTab === "phonetics" ? styles.ActiveTab : ""
            }`}
          >
            Phonetics
          </div>
        </div>
        <div className={styles.TabInfoContainer}>
          {activeTab === "phonetics" && (
            <div className={styles.WordPhonetics}>
              {details.phonetics.map((phonetic, index) => (
                <div className={styles.PhoneticChipContainer} key={index}>
                  <p>{phonetic.text}</p>
                  {phonetic.audio &&   <button 
                    onClick={() => playAudio(phonetic.audio)}
                    className={styles.AudioButton}
                  >
                    <IoMdVolumeHigh />
                  </button>  }
                
                </div>
              ))}
              { !details.phonetics.length  &&  
              <div className={styles.NoPhoneticsAvailable} >   
                  <img src={phoneticImage} alt="" className={styles.NoPhoneticsAvailableImage} />
                  <h2>Phonetics data not available</h2>
              </div>
               }
            </div>
          )}
          {activeTab === "definitions" && (
            <div className={styles.MeaningsContainer}>
              <h2 className={styles.TitleHeading}>Parts Of Speech</h2>
              {details.meanings.map((meaning, index) => (
                <div key={index} className={styles.meaning}>
                  <h3> {meaning.partOfSpeech.toUpperCase()} </h3>
                  <h4 className={styles.PhoneticsTitle}>Definitions</h4>
                  <div className={styles.DefinitionsContainer}>
                    {meaning.definitions.map((definition, index) => (
                      <span key={index} className={styles.DefinitionChipContainer}>
                        {definition.definition}
                         { definition.example && <>
                            <br/> 
                            <span><b>Example : </b> { definition.example  } </span>
                         </>  }
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordInfo;
