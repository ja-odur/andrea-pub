import React from "react";

// css styles
import "styles/footer.sass";


const Footer = () => {
    return (
        <footer className={'footer'}>&copy;2020-{new Date().getFullYear()} andrea</footer>
    )
}

export default Footer;
