import React from "react";
import { Resizable } from "re-resizable";

// css styles
import "styles/resizable.sass";

const horizontalEnabler = {
    top: false,
    right: true,
    bottom: false,
    left: false,
    topRight: false,
    bottomRight: false,
    bottomLeft: false,
    topLeft: false
}

const verticalEnabler = {
    top:false,
    right:false,
    bottom:true,
    left:false,
    topRight:false,
    bottomRight:false,
    bottomLeft:false,
    topLeft:false
}

const allEnabler = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true,
}

export const HorizontalMultiResizable = ({leftComponent, rightComponent, options}) => {
    const opts = options || {}
    const defaultSize = opts.defaultSize || '50%';
    const maxWidth = opts.maxWidth || '75%';
    const minWidth = opts.minWidth || '25%';

    return (
        <div
            className="horizontal-multi-resizable"
        >
            <Resizable
                defaultSize={{
                  width: defaultSize,
                }}
                maxWidth={maxWidth}
                minWidth={minWidth}
                enable={horizontalEnabler}
            >
                {leftComponent}
            </Resizable>
            <div style={{ width: '100%', minWidth: '20%' }}>
                {rightComponent}
            </div>

        </div>
    )
}

export const VerticalMultiResizable = ({topComponent, bottomComponent, options}) => {
    const opts = options || {}
    const defaultSize = opts.defaultSize || '85vh';
    const maxHeight = opts.maxHeight || '85vh';
    const minHeight = opts.minHeight || '15vh';

    return (
        <div
            className="vertical-multi-resizable"
        >
            <Resizable
                defaultSize={{
                    height: defaultSize,
                    width: '100%',
                }}
                maxHeight={maxHeight}
                minHeight={minHeight}
                enable={verticalEnabler}
            >
                {topComponent}
            </Resizable>
            <div style={{ width: '100%', height: '100%', minHeight: '1px', zIndex: 2000  }}>
                {bottomComponent}
            </div>

        </div>
    )
}
