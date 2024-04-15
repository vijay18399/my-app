import { useState } from "react";
import WordInfo from "./components/WordInfo/WordInfo";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DictionaryApp = () => {
  const [definitions, setDefinitions] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDefinitions = async (word) => {
    if (!word) return;
    setLoading(true);
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        var wordInfo = data[0]
       setDefinitions(wordInfo);
    } catch (error) {
      toast.error("we couldn't find definitions for the word");
      console.error("Error fetching definitions:", error);
    } finally {
      setLoading(false);
    }
  };
  const containerStyle = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(115deg, #97abff, #123593)", 
    flexDirection: "column",
  };
  return (
    <div       style={containerStyle}>
      {!definitions && !loading && (
        <>
          <SearchBar fetchDefinitions={fetchDefinitions} />
          <ToastContainer />
        </>
      )}
      {loading && <Loader color="white" />}
      {definitions && (
        <WordInfo details={definitions} setDefinitions={setDefinitions} />
      )}
    </div>
  );
};

export default DictionaryApp;
