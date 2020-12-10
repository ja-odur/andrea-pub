import React from "react"
import Select from "react-select";

const ReactSelect = ({ wrapperClassName, multiSelect, ...props }) => {
    return (
        <div className={wrapperClassName}>
            <Select
              className={multiSelect ? "basic-multi-select" : "basic-single"}
              { ...props }
            />
        </div>
    )
};

export default ReactSelect;
