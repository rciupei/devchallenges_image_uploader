import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.scss";

function MyDropzone({ setPreview }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      acceptedFiles.forEach((file) => {
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
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.container}>
      <input {...getInputProps()} />
      <img src="assets/image.svg" alt="" />
      <span>Drag & Drop your image here</span>
    </div>
  );
}

export default MyDropzone;
