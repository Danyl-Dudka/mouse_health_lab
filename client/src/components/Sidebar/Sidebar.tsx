import styles from './sidebar.module.css'
import type { SidebarProps } from '../types'

export default function Sidebar({ isSubmitDisabled }: SidebarProps) {
    return (
        <>
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
                <button disabled={isSubmitDisabled} className={styles.submitBtn}>
                    Submit Report to Database
                </button>
            </div>
        </>
    )
}
