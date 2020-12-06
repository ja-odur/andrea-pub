import React from "react";

import "styles/editor";

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
    return (
        <div className={"text-editor"}>
            <div className={"editor-header"}>
                <span className={"text-editor-filename"}>main.py</span>
                <div className={"text-editor-command-wrapper"}>
                    <button className={"editor-btn text-editor-btn-blue"}>run</button>
                </div>
            </div>
            <div className={"text-editor-content"}>
                editor text area
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