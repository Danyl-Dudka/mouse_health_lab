import type { DoubleClickTestProps } from "../../types";
import styles from '../testsArea.module.css';
export default function DoubleClickTest({ clickCount, doubleClicks, minInterval, onClickArea, onReset }: DoubleClickTestProps) {
    return (
        <>
            <div
                onClick={onClickArea}
                onContextMenu={(e) => e.preventDefault()}
                className={styles.testArea}
            >
                <div className={styles.testIcon}>🖱️</div>
                <h3 className={styles.testTitle}>Click inside this area with any button</h3>
                <p className={styles.testHint}>LMB, RMB, MMB or Side Buttons (Threshold &lt; 80ms)</p>

                <button onClick={onReset} className={styles.resetBtn}>
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
    )
}
