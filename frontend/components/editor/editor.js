import React, { useRef, useEffect } from "react";
import { ControlledEditor } from '@monaco-editor/react';

import "styles/editor";

const BAD_WORD = "eval";
const WARNING_MESSAGE = " <- hey man, what's this?";

export const OutputOrShell = () => {
    return (
        <div className={"output-or-shell"}>
            <div className={"editor-header no-border-left"}>
                <span className={"text-editor-output-name"}>output</span>
                <div className={"text-editor-command-wrapper"}>
                    <button className={"editor-btn text-editor-btn-clear"}>clear</button>
                </div>
            </div>
            <div className={"text-output-content"}>
                output text area
            </div>
        </div>
    )
}

export const TextEditor = () => {

    const handleEditorChange = (ev, value) => {
        return value.includes(BAD_WORD) && !value.includes(WARNING_MESSAGE)
          ? value.replace(BAD_WORD, BAD_WORD + WARNING_MESSAGE)
          : value.includes(WARNING_MESSAGE) && !value.includes(BAD_WORD)
            ? value.replace(WARNING_MESSAGE, "")
            : value;
      };

    return (
        <div className={"text-editor"}>
            <div className={"editor-header"}>
                <span className={"text-editor-filename"}>main.py</span>
                <div className={"text-editor-command-wrapper"}>
                    <button className={"editor-btn text-editor-btn-blue"}>run</button>
                </div>
            </div>
            <div className={"text-editor-content"} id={"text-editor"}>
                <ControlledEditor
                    height="100%"
                    language="javascript"
                    value={"// write your code here"}
                    onChange={handleEditorChange}
                    theme={'dark'}
                    options={{
                        fontFamily: "Monaco, Menlo, 'Courier New', monospace",
                        fontSize: "20px",
                        codeLens: false,
                        showUnused: true,
                        showDeprecated: true,
                    }}
                  />
            </div>
        </div>
    )
}

export default function Editor () {
    return (
        <div className={"editor-container"}>
            <TextEditor />
            <OutputOrShell />
        </div>
    )
}