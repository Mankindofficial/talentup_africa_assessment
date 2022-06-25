import React from "react";
import Image from "next/image";

import styles from "../styles/Home.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                Created by{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:mankindofficial1@gmail.com"
                    className={styles.logo}
                >
                    Musliudeen Makinde
                </a>
            </p>
        </footer>
    );
};

export default Footer;
