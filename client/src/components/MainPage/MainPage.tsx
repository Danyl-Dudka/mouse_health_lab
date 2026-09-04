import { useEffect, useRef, useState } from 'react';
import styles from './mainPage.module.css';
import Header from '../Header/Header';
import DoubleClickTest from '../Tests/DoubleClickTest/DoubleClickTest';
import ScrollTest from '../Tests/ScrollTest/ScrollTest';
import Sidebar from '../Sidebar/Sidebar';
import Buttons from '../Buttons/Buttons';
import { Modal } from 'antd';

export default function MainPage() {
    const [clickCount, setClickCount] = useState(0);
    const [doubleClicks, setDoubleClicks] = useState(0);

    const [selectedDevice, setSelectedDevice] = useState('Logitech G Pro');
    const [minInterval, setMinInterval] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'doubleClick' | 'scroll'>('doubleClick');

    const lastClickTimeRef = useRef<number | null>(null);
    const lastScrollTimeRef = useRef<number | null>(null);
    const lastScrollDirectionRef = useRef<'Up' | 'Down' | null>(null);

    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const [scrollPixels, setScrollPixels] = useState(0);
    const [scrollGlitches, setScrollGlitches] = useState(0);
    const [lastDirection, setLastDirection] = useState<'Up' | 'Down' | 'Idle'>('Idle');


    const resetAll = () => {
        setClickCount(0);
        setDoubleClicks(0);
        setMinInterval(null);
        lastClickTimeRef.current = null;

        setScrollPixels(0);
        setScrollGlitches(0);
        setLastDirection('Idle');
        lastScrollTimeRef.current = null;
        lastScrollDirectionRef.current = null;
    }

    useEffect(() => {
        resetAll();
    }, [selectedDevice]);

    useEffect(() => {
        if (activeTab !== 'scroll') {
            return;
        }
        const element = scrollAreaRef.current;
        if (!element) {
            return;
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const currentTime = performance.now();
            const currentDirection: 'Up' | 'Down' = e.deltaY < 0 ? 'Up' : 'Down';
            setScrollPixels((prev) => prev + Math.abs(Math.round(e.deltaY)));
            setLastDirection(currentDirection);
            if (lastScrollDirectionRef.current !== null && lastScrollTimeRef.current !== null) {
                const timeDiff = currentTime - lastScrollTimeRef.current;
                const isDirectionReversible = currentDirection !== lastScrollDirectionRef.current
                if (isDirectionReversible && timeDiff < 100) {
                    setScrollGlitches((prev) => prev + 1)
                }
            }
            lastScrollTimeRef.current = currentTime;
            lastScrollDirectionRef.current = currentDirection;
        };
        element.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            element.removeEventListener('wheel', handleWheel)
        }
    }, [activeTab])

    const handleTestAreaClick = () => {
        const currentTime = performance.now();
        setClickCount((prev) => prev + 1);
        if (lastClickTimeRef.current !== null) {
            const interval = Math.round(currentTime - lastClickTimeRef.current);
            if (interval < 80) {
                setDoubleClicks((prev) => prev + 1);
            }
            setMinInterval((prevMin) => (prevMin === null ? interval : Math.min(prevMin, interval)))
        }
        lastClickTimeRef.current = currentTime;
    }

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        resetAll();
    }

    const handleSubmitReport = async () => {
        try {
            const response = await fetch('http://localhost:3000/submit_report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ deviceName: selectedDevice, doubleClicks: doubleClicks, scrollGlitches: scrollGlitches })
            });

            if (response.ok) {
                Modal.success({
                    title: 'Report Submitted',
                    content: (
                        <span>
                            Report for
                            <strong style={{ color: '#1677ff' }}> {selectedDevice} </strong>
                            has been successfully saved.
                        </span>
                    ),
                    centered: true,
                })
                resetAll();
            } else {
                Modal.error({
                    title: 'Submission Failed',
                    content: 'Failed to submit report. Please try again.',
                    centered: true,
                })
            }
        } catch (error) {
            console.error('Error submiting report: ', error);
            Modal.error({
                title: 'Network Error',
                content: 'Could not connect to the server',
                centered: true,
            })
        }
    }
    return (
        <div className={styles.container}>
            <Header selectedDevice={selectedDevice} onChangeDevice={setSelectedDevice} />
            <div className={styles.tabs}>
                <Buttons activeTab={activeTab} changeActiveTab={setActiveTab} />
            </div>
            <div className={styles.grid}>
                <div>
                    {activeTab === 'doubleClick' && (
                        <>
                            <DoubleClickTest clickCount={clickCount} doubleClicks={doubleClicks} minInterval={minInterval} onClickArea={handleTestAreaClick} onReset={handleReset} />
                        </>
                    )}
                    {activeTab === 'scroll' && (
                        <>
                            <ScrollTest scrollAreaRef={scrollAreaRef} scrollPixels={scrollPixels} scrollGlitches={scrollGlitches} lastDirection={lastDirection} onReset={handleReset} />
                        </>
                    )}
                </div>
                <div className={styles.sidebar}>
                    <Sidebar isSubmitDisabled={clickCount === 0 && scrollPixels === 0} onSubmit={handleSubmitReport} />
                </div>
            </div>
        </div >
    )
}
