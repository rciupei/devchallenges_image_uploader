import React from "react";
import { useCallback } from "react";
import MyDropzone from "../Dropzone/Dropzone";
import Spinner from "../Spinner/Spinner";
import SuccessPage from "../SuccessPage/SuccessPage";
import styles from "./UploadContainer.module.scss";

export const upload = (formdata) => {
  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return fetch("http://localhost:5000/upload", requestOptions);
};

function UploadContainer() {
  const [preview, setPreview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [uploadUrl, setUploadUrl] = React.useState("false");

  const onDrop = useCallback(
    (e) => {
      setLoading(true);
      let img = URL.createObjectURL(e.target.files[0]);
      setPreview(img);

      var formdata = new FormData();
      formdata.append("img", e.target.files[0], e.target.files[0].name);
      upload(formdata)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          setSuccess(true);
          setUploadUrl(result.secure_url);
          console.log(result);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error", error);
        });
    },
    [setPreview]
  );

  if (success) return <SuccessPage preview={preview} value={uploadUrl} />;

  return (
    <div className={styles.container}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2>Upload your image</h2>
          <h3>File should be Jpeg, Png,...</h3>

          <MyDropzone
            setPreview={setPreview}
            loading={loading}
            setLoading={setLoading}
            setSuccess={setSuccess}
            setUploadUrl={setUploadUrl}
          />
          <h3>Or</h3>
          <label htmlFor="img" role="button">
            Choose a file
          </label>

          <input
            type="file"
            name="img"
            id="img"
            placeholder="Choose a file"
            multiple={false}
            onChange={onDrop}
          />
        </>
      )}
    </div>
  );
}

export default UploadContainer;
