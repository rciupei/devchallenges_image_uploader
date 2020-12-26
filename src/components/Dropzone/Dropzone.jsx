import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { upload } from "../UploadContainer/UploadContainer";
import styles from "./Dropzone.module.scss";

function MyDropzone({ setPreview, setLoading, setSuccess, setUploadUrl }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setLoading(true);

      if (!acceptedFiles.length) {
        console.log("too many files");
        setLoading(false);
      }
      acceptedFiles.forEach((file) => {
        let img = URL.createObjectURL(file);
        setPreview(img);
        var formdata = new FormData();
        formdata.append("img", file, file.name);
        upload(formdata)
          .then((response) => response.json())
          .then((result) => {
            setLoading(false);
            setUploadUrl(result.secure_url);
            setSuccess(true);

            console.log(result);
          })
          .catch((error) => {
            setLoading(false);
            console.log("error", error);
          });
      });
    },
    [setPreview, setLoading, setUploadUrl, setSuccess]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
  });

  return (
    <div {...getRootProps()} className={styles.container}>
      <input {...getInputProps()} />
      <img src="assets/image.svg" alt="" />
      <span>Drag & Drop your image here</span>
    </div>
  );
}

export default MyDropzone;
