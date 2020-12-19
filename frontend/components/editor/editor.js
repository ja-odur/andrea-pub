import React, { useState, useEffect, useRef } from "react";
import { ControlledEditor } from '@monaco-editor/react';
import ReactSelect from "../selects/reactSelect";
import { Resizable } from "re-resizable";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import config from "./editorConfigs";
import examples from "./examples";
import FullScreenIcon from "../icons/fullscreen";

import "styles/editor";

const BAD_WORD = "eval";
const WARNING_MESSAGE = " <- hey man, what's this?";

const iconSize = '60%';

export const HorizontalMultiResizable = ({leftComponent, rightComponent}) => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                overflow: 'hidden',
            }}
        >
            <Resizable
                // style={style}
                defaultSize={{
                  width: '50%',
                  // height: 200,
                }}
                maxWidth="75%"
                minWidth="50%"
            >
                {leftComponent}
            </Resizable>
            <div style={{ width: '100%', minWidth: '25%' }}>
                {rightComponent}
            </div>

        </div>
    )
}

export const OutputOrShell = () => {
    const fullScreenHandle = useFullScreenHandle();
    const [isFullScreen, setIsFullScreen] = useState(false)
    return (
        <FullScreen
            handle={fullScreenHandle}
            onChange={(state) => setIsFullScreen(state)}
        >
            <div className={"output-or-shell"}>
                <div className={"editor-header no-border-left"}>
                    <span className={"text-editor-output-name"}>output</span>
                    <div className={"text-editor-command-wrapper"}>
                        <FullScreenIcon
                            enterHandler={fullScreenHandle.enter}
                            exitHandler={fullScreenHandle.exit}
                            active={isFullScreen}
                            height={iconSize}
                        />
                        <button className={"editor-btn text-editor-btn-clear"}>clear</button>
                    </div>
                </div>
                <div className={"text-output-content"}>
                    output text area
                </div>
            </div>
        </FullScreen>
    )
}

export const TextEditor = () => {
    const fullScreenHandle = useFullScreenHandle();
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [language, setLanguage] = useState(config.availableLanguages[1]);
    const [theme, setTheme] = useState(config.defaultTheme);

    const handleEditorChange = (ev, value) => {
        return value.includes(BAD_WORD) && !value.includes(WARNING_MESSAGE)
          ? value.replace(BAD_WORD, BAD_WORD + WARNING_MESSAGE)
          : value.includes(WARNING_MESSAGE) && !value.includes(BAD_WORD)
            ? value.replace(WARNING_MESSAGE, "")
            : value;
      };

    const handleLanguageChange = (value) => {
        setLanguage(value);
    };

    return (
        <FullScreen
            handle={fullScreenHandle}
            onChange={(state) => setIsFullScreen(state)}
        >
            <div className={"text-editor"}>
                <div className={"editor-header"}>
                    <span className={"text-editor-name"}>editor</span>
                    <div className={"text-editor-command-wrapper"}>
                        <FullScreenIcon
                            enterHandler={fullScreenHandle.enter}
                            exitHandler={fullScreenHandle.exit}
                            active={isFullScreen}
                            height={iconSize}
                        />
                        <ReactSelect
                            wrapperClassName={"text-editor-language-select"}
                            defaultValue={language}
                            options={config.availableLanguages}
                            onChange={handleLanguageChange}
                        />
                        <button className={"editor-btn text-editor-btn-blue"}>run</button>
                    </div>
                </div>
                <div className={"text-editor-content"} id={"text-editor"}>
                    <ControlledEditor
                        height="100%"
                        language={config.supportedLanguages[language.key].name}
                        value={examples[config.supportedLanguages[language.key].exampleId]}
                        onChange={handleEditorChange}
                        theme={theme}
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
        </FullScreen>
    )
}

export default function Editor () {
    return (
        <div className={"editor-container"}>
            <HorizontalMultiResizable
                leftComponent={<TextEditor />}
                rightComponent={<OutputOrShell />}
            />
        </div>
    )
}