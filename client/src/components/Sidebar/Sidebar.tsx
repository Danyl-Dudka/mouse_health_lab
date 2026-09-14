import styles from './sidebar.module.css'
import type { SidebarProps, DeviceStat } from '../types'
import { useEffect, useState } from 'react'

export default function Sidebar({ isSubmitDisabled, onSubmit, selectedDevice }: SidebarProps) {
    const [deviceStats, setDeviceStats] = useState<DeviceStat | null>(null);
    useEffect(() => {
        if (!selectedDevice) {
            setDeviceStats(null);
            return;
        }
        setDeviceStats(null);
        fetch('http://localhost:3000/analytics')
            .then((res) => res.json())
            .then((data: DeviceStat[]) => {
                const current = data.find((item) => item.deviceName === selectedDevice);
                setDeviceStats(current || null)
            })
            .catch((error) => console.error('Error fetching analytics: ', error))
    }, [selectedDevice])
    const failureRate = deviceStats ? deviceStats.failureRate : 0;
    const rateColor = failureRate === 0 ? '#10b981' : failureRate < 20 ? '#fbbf24' : '#ef4444';
    return (
        <>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}>📈 Model Analytics</h3>
                <p className={styles.cardText}>
                    Aggregated defect records for <strong>{selectedDevice || 'Selected Device'}</strong>:
                </p>
                <div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Total Tested:</span>
                        <span className={styles.statValue}>
                            {deviceStats ? deviceStats.total : 0}
                        </span>
                    </div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Defect Rate:</span>
                        <span className={styles.statValue} style={{ color: rateColor }}>
                            {deviceStats ? deviceStats.failureRate : 0}%
                        </span>
                    </div>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Defect Count (N/G)</span>
                        <span className={styles.statValue}>
                            {deviceStats ? deviceStats.ngCount : 0}
                        </span>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <h3 className={styles.cardTitle}>💾 Save Test Report</h3>
                <p className={styles.cardText}>
                    Submit these results to the Node.js backend to contribute to global hardware metrics.
                </p>
                <button onClick={onSubmit} disabled={isSubmitDisabled} className={styles.submitBtn}>
                    Submit Report to Database
                </button>
            </div>
        </>
    )
}
