import React from "react";

import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Body from "../components/Body";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <Body />
            <Footer />
        </div>
    );
}
