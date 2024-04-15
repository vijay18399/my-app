import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css"; 
const SearchBar = ({ fetchDefinitions }) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchDefinitions(event.target.value)
        }
      }
    
    return (
        <>
         <h2 className={styles.title}>Search for word meanings</h2>
         <div className={styles.searchBar}> 
            <input
                type="text"
                placeholder="Search word here"
                onKeyDown={handleKeyDown} 
                className={styles.input} 
            />
           <CiSearch  className={styles.icon}  />
        </div>
        </>
       
    );
};

export default SearchBar;
