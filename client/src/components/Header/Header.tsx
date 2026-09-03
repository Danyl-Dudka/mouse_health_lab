import type { HeaderProps } from '../types'
import styles from './header.module.css'
export default function Header({selectedDevice, onChangeDevice}: HeaderProps) {
    return (
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
                    onChange={(e) => onChangeDevice(e.target.value)}
                >
                    <option>Logitech G Pro</option>
                    <option>Razer DeathAdder V3 Pro</option>
                    <option>SteelSeries Rival 3</option>
                    <option>Other Model</option>
                </select>
            </div>
        </header>)
}
