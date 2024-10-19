import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the style
import Quill from "quill";
// import {ImageUploader } from 'quill-image-uploader'
// Register the image uploader module with Quill
// Quill.register('modules/imageUploader', ImageUploader);

const Editor = () => {
  const [value, setValue] = useState("");
  console.log(value);
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <ReactQuill
      value={value}
      onChange={setValue}
      modules={modules}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
      ]}
    />
  );
};

export default Editor;
