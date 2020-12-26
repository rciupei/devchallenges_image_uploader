import React from "react";
import styles from "./SuccessPage.module.scss";

function SuccessPage({ preview, value }) {
  const [copySuccess, setCopySuccess] = React.useState("");
  function copyToClipboard() {
    const el = document.createElement("textarea");
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopySuccess("Copied!");
  }
  return (
    <div className={styles.container}>
      <span role="img" aria-label="success">
        ✅
      </span>
      <h2>Uploaded successfully!</h2>

      <img src={preview} alt="" className={styles.img} />
      <div className={styles.inputBox}>
        <div className={styles.divInput}>{value}</div>
        <button className={styles.button} onClick={copyToClipboard}>
          Copy Link
        </button>
      </div>
      {copySuccess}
    </div>
  );
}

export default SuccessPage;
