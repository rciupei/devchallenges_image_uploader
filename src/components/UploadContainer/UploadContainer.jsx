import React from "react";
import { useCallback } from "react";
import MyDropzone from "../Dropzone/Dropzone";
import styles from "./UploadContainer.module.scss";

function UploadContainer() {
  const [preview, setPreview] = React.useState(null);

  const onDrop = useCallback(
    (e) => {
      console.log(e.target.files[0]);
      [...e.target.files].forEach((file) => {
        //   const reader = new FileReader();

        //   reader.onabort = () => console.log("file reading was aborted");
        //   reader.onerror = () => console.log("file reading has failed");
        //   reader.onload = () => {
        //     // Do whatever you want with the file contents
        //     const binaryStr = reader.result;
        //     console.log(binaryStr);
        let img = URL.createObjectURL(file);
        console.log(img);
        setPreview(img);
        //   };
        //   reader.readAsArrayBuffer(file);
      });
    },
    [setPreview]
  );

  return (
    <div className={styles.container}>
      <h2>Upload your image</h2>
      <h4>File should be Jpeg, Png,...</h4>
      {preview ? (
        <img src={preview} alt="" className={styles.img} />
      ) : (
        <MyDropzone setPreview={setPreview} />
      )}
      <h4>Or</h4>
      <input
        type="file"
        placeholder="Choose a file"
        multiple={false}
        onChange={onDrop}
      />
    </div>
  );
}

export default UploadContainer;
