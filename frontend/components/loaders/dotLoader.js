import React from "react";

// css styles
import "styles/loader";


const DotLoader = () => {
    return (
        <div className="dot-loader">
           <div className="loading-dots">
                <div className="loading-dots--dot" />
                <div className="loading-dots--dot" />
                <div className="loading-dots--dot" />
            </div>
        </div>
    )
}

export default DotLoader
