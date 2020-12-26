import React from "react";
import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <>
      <p>Uploading...</p>
      <div className={styles["progress-line"]} />{" "}
    </>
  );
}

export default Spinner;
