import React from "react";

import { Editor } from "./components/editor";
import Header from "./components/header";
import Footer from "./components/footer";

import "styles/main";

export default function App () {
    return (
        <>
            <Header />
            <Editor />
            <Footer />
        </>
    )
};
