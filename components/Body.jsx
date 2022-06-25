import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Countdown from "react-countdown";

import styles from "../styles/Home.module.css";

const Body = () => {
    const { main } = useSelector((state) => state);
    const [paragraph, setParagraph] = useState("");
    const [time, setTime] = useState(1);
    const [totalTime, setTotalTime] = useState("");
    const [hasStarted, setHasStarted] = useState(false);
    const [userScore, setUserScore] = useState({});

    const countdownRef = useRef(null);
    const userInputRef = useRef(null);

    useEffect(() => {
        const shuffleArray = () => {
            let arr = main.paragraph.split(" ");
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };
        const length = 80 * (time / 2);
        const text = shuffleArray().slice(0, length).join(" ");
        setParagraph(text);
    }, [time, hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
        countdownRef.current.getApi().start();
    };

    const handleSubmit = (remaining) => {
        setHasStarted(false);
        const userInput = userInputRef.current.value.split(" ");
        userInputRef.current.value = "";
        const displayedParagraph = paragraph.split(" ");
        var score = 0;
        userInput.forEach((input, index) => {
            if (input == displayedParagraph[index]) {
                score++;
            }
        });
        const usedTime = (totalTime - remaining) / 1000;
        setUserScore({
            score,
            total: displayedParagraph.length,
            speed: (score / usedTime).toFixed(2),
            time: usedTime,
        });
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Typing Challenge</h1>

            <p className={styles.description}>
                Type the paragraph in the below text box as it is. For each
                correct word, you will get 1 point.
            </p>

            <div>
                <div className={styles.selectWrapper}>
                    <p>Set Duration: </p>
                    <div>
                        <select
                            disabled={hasStarted}
                            onChange={(e) => setTime(e.target.value)}
                        >
                            <option>in Minutes</option>
                            <option value={1}>1m</option>
                            <option value={2}>2m</option>
                            <option value={5}>5m</option>
                        </select>
                    </div>
                </div>
                <div className={styles.custommDuration}>
                    <p>Custom Duration(in minutes): </p>
                    <div>
                        <input
                            type="number"
                            readOnly={hasStarted}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.countdownWrapper}>
                    <Countdown
                        autoStart={false}
                        ref={countdownRef}
                        date={Date.now() + time * 60000}
                        onStart={(e) => setTotalTime(e.total)}
                        onPause={(e) => handleSubmit(e.total)}
                        onComplete={(e) => handleSubmit(e.total)}
                    />
                </div>
                <div>
                    <textarea
                        className={styles.paragraphDisplay}
                        readOnly
                        defaultValue={paragraph}
                    ></textarea>
                </div>
                <div>
                    <button onClick={handleStart}>Start</button>
                </div>
                <div className={styles.inputText}>
                    <p>Type your text here👇:</p>
                    <textarea
                        readOnly={!hasStarted}
                        ref={userInputRef}
                        className={styles.paragraphDisplay}
                    ></textarea>
                    <div>
                        <button
                            onClick={() =>
                                countdownRef.current.getApi().pause()
                            }
                        >
                            Submit
                        </button>
                    </div>
                    {userScore.score && (
                        <div className={styles.userScore}>
                            <p>
                                <strong>Score:</strong> {userScore.score} out of{" "}
                                {userScore.total}
                            </p>
                            <p>
                                <strong>Time used:</strong> {userScore.time}{" "}
                                seconds
                            </p>
                            <p>
                                <strong>Speed:</strong> {userScore.speed}{" "}
                                word(s) per second
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Body;
