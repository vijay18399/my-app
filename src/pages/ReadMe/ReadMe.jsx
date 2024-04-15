import React, { useState, useEffect } from 'react';
import Sentence from './components/Sentence';
import styles from './ReadMe.module.css';
import { useSearchParams } from 'react-router-dom';
const ReadMe = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const  querySentence = searchParams.get('sentence');
  const [sentence, setSentence] = useState(querySentence || "this is read me app");
  return (
    <div className={styles.container}>
        <Sentence  sentence={sentence}  />
    </div>
  );
};

export default ReadMe;
