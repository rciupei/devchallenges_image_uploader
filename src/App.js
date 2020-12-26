import React from "react";
import styles from "./App.module.scss";
import UploadContainer from "./components/UploadContainer/UploadContainer";

function App() {
  return (
    <div className={styles.App}>
      <UploadContainer />
    </div>
  );
}

export default App;
