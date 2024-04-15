import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import  styles from "./AppHeader.module.css"; 
function AppHeader({ name,bgColor,color }) {
  const headerStyle = {
    backgroundColor: bgColor,
    color: color
  };
  return (
    <div className={styles.appHeader} style={headerStyle} >
      <div className={styles.headerContent}>
        <Link to="/" className={styles.backLink}>
          <IoArrowBackCircle className={styles.backIcon} />
        </Link>
        <h1 className={styles.headerTitle}>{name}</h1>
      </div>
    </div>
  );
}
export default AppHeader;
