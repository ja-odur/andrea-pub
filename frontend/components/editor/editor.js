import React, { useState, useEffect, useRef } from "react";
import { ControlledEditor } from '@monaco-editor/react';
import ReactSelect from "../selects/reactSelect";
import { Resizable } from "re-resizable";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import config from "./editorConfigs";
import examples from "./examples";
import FullScreenIcon from "../icons/fullscreen";
import { runCodeApi } from "apis/compiler";
import DotLoader from "components/loaders/dotLoader";

import "styles/editor";


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

export const OutputOrShell = ({ loading, codeOutput }) => {
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
                    {loading
                        ?
                        <DotLoader />
                        :
                        <>
                            <div className={"text-output-content-success"}>
                                {codeOutput.output.map((line, index) => (
                                    <div className="output-code-line" key={index}>{line}</div>
                                ))}
                            </div>
                            <div className={"text-output-content-error"}>
                            {codeOutput.error.map((line, index) => (
                                <div className="output-code-line" key={index}>{line}</div>
                            ))}
                            </div>
                        </>
                    }
                </div>
            </div>
        </FullScreen>
    )
}

export const TextEditor = ({ codeRunning, setCodeRunning, updateCodeOutput }) => {
    const fullScreenHandle = useFullScreenHandle();
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [language, setLanguage] = useState(config.availableLanguages[0]);
    const [theme, setTheme] = useState(config.defaultTheme);
    const [code, setCode] = useState(examples[config.supportedLanguages[language.key].exampleId]);

    const handleEditorChange = (ev, value) => {
        setCode(value)
    };

    const handleLanguageChange = (value) => {
        setLanguage(value);
    };

    const handleRunCLick = async () => {
        setCodeRunning(true);
        await runCodeApi({ language: language.key, code })
            .then(data => {
                updateCodeOutput(data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        setCodeRunning(false);
    }

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
                        <button
                            onClick={handleRunCLick}
                            disabled={codeRunning}
                            className={`editor-btn ${codeRunning ? 'btn-disabled' : 'text-editor-btn-blue'}`}
                        >
                            run
                        </button>
                    </div>
                </div>
                <div className={"text-editor-content"} id={"text-editor"}>
                    <ControlledEditor
                        height="100%"
                        language={config.supportedLanguages[language.key].name}
                        value={code || examples[config.supportedLanguages[language.key].exampleId]}
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
    const [codeOutput, setCodeOutput] = useState({ output: [], error: [] })
    const [loading, setLoading] = useState(false);
    const [codeRunning, setCodeRunning] = useState(false);
    return (
        <div className={"editor-container"}>
            <HorizontalMultiResizable
                leftComponent={<TextEditor  codeRunning={codeRunning} setCodeRunning={setCodeRunning} updateCodeOutput={setCodeOutput} />}
                rightComponent={<OutputOrShell loading={codeRunning} codeOutput={codeOutput} />}
            />
        </div>
    )
}