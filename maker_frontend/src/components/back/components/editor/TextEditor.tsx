"use client";

// React
import React, { useMemo, useState, useRef } from "react";

// Next.js
import dynamic from "next/dynamic";

// Quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Mui
import { Box } from "@mui/material";

const CustomHeart = () => <span>♥</span>;

const customToolbar = () => {
  return (
    <div id="toolbar">
      <select className="ql-header" defaultValue="">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Minor heading</option>
        <option value="">Normal</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="small">Size 1</option>
        <option value="medium">Size 2</option>
        <option value="large">Size 3</option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-clean"></button>
      <button className="ql-insertHeart">
        <CustomHeart />
      </button>
    </div>
  );
};

const TextEditor = () => {
  // @ts-expect-error: ReactQuill does not support ref typing
  const quillRef = useRef<InstanceType<typeof ReactQuill> | null>(null);
  const [value, setValue] = useState("");

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          insertHeart: () => {
            const quill = quillRef.current?.getEditor();
            if (quill) {
              const range = quill.getSelection();
              if (range) {
                quill.insertText(range.index, "♥");
              }
            }
          },
        },
      },
    }),
    []
  );

  return (
    <Box height={500}>
      {customToolbar()}
      <ReactQuill
        // @ts-expect-error: ReactQuill does not support ref typing
        ref={quillRef}
        theme="snow"
        style={{ height: "450px" }}
        modules={modules}
        value={value}
        onChange={setValue}
      />
    </Box>
  );
};

export default TextEditor;
