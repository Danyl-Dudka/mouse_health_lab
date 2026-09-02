import { useEffect, useRef, useState } from 'react';
import styles from './mainPage.module.css';

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
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>🖱️</div>
                    <div>
                        <h1 className={styles.title}>Mouse Health Lab</h1>
                        <p className={styles.subtitle}>Hardware Defect & Performance Tester</p>
                    </div>
                </div>
                <div className={styles.deviceSelect}>
                    <select
                        value={selectedDevice}
                        onChange={(e) => setSelectedDevice(e.target.value)}
                    >
                        <option>Logitech G Pro</option>
                        <option>Razer DeathAdder V3 Pro</option>
                        <option>SteelSeries Rival 3</option>
                        <option>Other Model</option>
                    </select>
                </div>
            </header>

            <div className={styles.tabs}>
                <button
                    onClick={() => setActiveTab('doubleClick')}
                    className={`${styles.tabBtn} ${activeTab === 'doubleClick' ? styles.active : ''}`}
                >
                    ⚡ Double Click Test
                </button>
                <button
                    onClick={() => setActiveTab('scroll')}
                    className={`${styles.tabBtn} ${activeTab === 'scroll' ? styles.active : ''}`}
                >
                    🔄 Scroll Encoder Test
                </button>
            </div>

            <div className={styles.grid}>
                <div>
                    {activeTab === 'doubleClick' && (
                        <>
                            <div
                                onClick={handleTestAreaClick}
                                onContextMenu={(e) => e.preventDefault()}
                                className={styles.testArea}
                            >
                                <div className={styles.testIcon}>🖱️</div>
                                <h3 className={styles.testTitle}>Click inside this area with any button</h3>
                                <p className={styles.testHint}>LMB, RMB, MMB or Side Buttons (Threshold &lt; 80ms)</p>

                                <button onClick={handleReset} className={styles.resetBtn}>
                                    🔄 Reset
                                </button>
                            </div>
                            <div className={styles.metricsGrid}>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Total Clicks</span>
                                    <div className={styles.metricValue}>{clickCount}</div>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Double Clicks</span>
                                    <div className={`${styles.metricValue} ${doubleClicks > 0 ? styles.textWarning : styles.textOk}`}>{doubleClicks}
                                    </div>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Min Interval</span>
                                    <div className={styles.metricValue}>{minInterval !== null ? `${minInterval} ms` : '-'}</div>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Status</span>
                                    <div className={`${styles.metricValue} ${doubleClicks > 0 ? styles.textWarning : styles.textOk}`} style={{ fontSize: '16px' }}>
                                        {`${doubleClicks > 0 ? 'Defective' : 'Healthy'}`}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === 'scroll' && (
                        <>
                            <div
                                ref={scrollAreaRef}
                                className={styles.testArea}
                                style={{ cursor: 'ns-resize' }}
                            >
                                <div className={styles.testIcon}>🔄</div>
                                <h3 className={styles.testTitle}>Scroll your mouse wheel inside this area</h3>
                                <p className={styles.testHint}>Tests encoder stability and rapid reverse glitches</p>

                                <button onClick={handleReset} className={styles.resetBtn}>
                                    🔄 Reset
                                </button>
                            </div>
                            <div className={styles.metricsGrid}>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Total Scroll</span>
                                    <div className={styles.metricValue}>{scrollPixels} px</div>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Last Direction</span>
                                    <div className={styles.metricValue}>{lastDirection}</div>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Encoder Glitches</span>
                                    <div className={`${styles.metricValue} ${scrollGlitches > 0 ? styles.textWarning : styles.textOk}`}>
                                        {scrollGlitches}
                                    </div>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricLabel}>Encoder Status</span>
                                    <div className={`${styles.metricValue} ${scrollGlitches > 0 ? styles.textWarning : styles.textOk}`} style={{ fontSize: '16px' }}>
                                        {scrollGlitches > 0 ? 'Glitches Detected' : 'Healthy'}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.sidebar}>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>📈 Model Analytics</h3>
                        <p className={styles.cardText}>
                            Aggregated defect records from MongoDB for the selected device:
                        </p>
                        <div>
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>Total Tested:</span>
                                <span className={styles.statValue}>1,240</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>Defect Rate:</span>
                                <span className={styles.statValue} style={{ color: '#fbbf24' }}>4.2%</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statLabel}>Avg Lifespan:</span>
                                <span className={styles.statValue}>~ 14 months</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>💾 Save Test Report</h3>
                        <p className={styles.cardText}>
                            Submit these results to the Node.js backend to contribute to global hardware metrics.
                        </p>
                        <button disabled={clickCount === 0 && scrollPixels === 0} className={styles.submitBtn}>
                            Submit Report to Database
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}
