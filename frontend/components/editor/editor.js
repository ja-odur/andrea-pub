import React, { useState } from "react";
import { ControlledEditor } from '@monaco-editor/react';
import ReactSelect from "../selects/reactSelect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import config from "./editorConfigs";
import examples from "./examples";
import FullScreenIcon from "../icons/fullscreen";
import { runCodeApi } from "apis/compiler";
import DotLoader from "components/loaders/dotLoader";
import { HorizontalMultiResizable, VerticalMultiResizable } from "components/resizable/multipleResizable";

import "styles/editor";


const iconSize = '60%';


export const OutputOrShell = ({ loading, codeOutput, fullscreen }) => {
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
                        { fullscreen &&
                              <FullScreenIcon
                                  enterHandler={fullScreenHandle.enter}
                                  exitHandler={fullScreenHandle.exit}
                                  active={isFullScreen}
                                  height={iconSize}
                              />
                        }

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
    const extractCodeExample = (language) => {
        return examples[config.supportedLanguages[language.key].exampleId]
    }
    const fullScreenHandle = useFullScreenHandle();
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [language, setLanguage] = useState(config.availableLanguages[0]);
    const [theme, setTheme] = useState(config.defaultTheme);
    const [code, setCode] = useState(extractCodeExample(language));
    const [isEditorClean, setIsEditorClean] = useState(true);
    const [internalCodeOutput, setInternalCodeOutput] = useState({ output: [], error: [] })

    const handleEditorChange = (ev, code) => {
        setCode(code)
        setIsEditorClean(false)
    };

    const handleLanguageChange = (language) => {
        setLanguage(language);
        if(isEditorClean) {
            setCode(extractCodeExample(language))
        }
    };

    const setCodeOutput = (data) => {
        setInternalCodeOutput(data)
        updateCodeOutput(data)
    }

    const handleRunCLick = async () => {
        setCodeRunning(true);
        await runCodeApi({ language: language.key, code })
            .then(data => {
                setCodeOutput(data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
        setCodeRunning(false);
    }

    const editorComponent = (
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
                    value={code}
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
    )

    return (
        <FullScreen
            handle={fullScreenHandle}
            onChange={(state) => setIsFullScreen(state)}
        >
            {isFullScreen ?
                <VerticalMultiResizable
                    topComponent={editorComponent}
                    bottomComponent={
                        <OutputOrShell
                            loading={codeRunning}
                            codeOutput={internalCodeOutput}
                        />
                    }
                />
                :
                editorComponent

            }
        </FullScreen>
    )
}

export default function Editor () {
    const [codeOutput, setCodeOutput] = useState({ output: [], error: [] })
    const [codeRunning, setCodeRunning] = useState(false);
    return (
        <div className={"editor-container"}>
            <HorizontalMultiResizable
                leftComponent={
                    <TextEditor
                        codeRunning={codeRunning}
                        setCodeRunning={setCodeRunning}
                        updateCodeOutput={setCodeOutput}
                    />}
                rightComponent={
                    <OutputOrShell
                        loading={codeRunning}
                        codeOutput={codeOutput}
                        fullscreen
                    />}
                options={{
                    defaultSize: "70%",
                    maxWidth: "90%",
                    minWidth: "50%",
                }}
            />
        </div>
    )
}