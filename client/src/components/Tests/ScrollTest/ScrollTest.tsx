import type { ScrollTestProps } from "../../types";
import styles from '../testsArea.module.css';
export default function ScrollTest({ scrollAreaRef, scrollPixels, scrollGlitches, lastDirection, onReset }: ScrollTestProps) {
    return (
        <>
            <div
                ref={scrollAreaRef}
                className={styles.testArea}
                style={{ cursor: 'ns-resize' }}
            >
                <div className={styles.testIcon}>🔄</div>
                <h3 className={styles.testTitle}>Scroll your mouse wheel inside this area</h3>
                <p className={styles.testHint}>Tests encoder stability and rapid reverse glitches</p>

                <button onClick={onReset} className={styles.resetBtn}>
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
    )
}
