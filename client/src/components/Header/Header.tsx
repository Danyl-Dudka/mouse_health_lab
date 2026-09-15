import type { HeaderProps } from '../types'
import styles from './header.module.css'

const POPULAR_MOUSE_MODELS = {
    LOGITECH_GPX2: "Logitech G Pro X Superlight 2",
    RAZER_DAV3_PRO: "Razer DeathAdder V3 Pro",
    RAZER_VIPER_V3_PRO: "Razer Viper V3 Pro",
    LOGITECH_G502X: "Logitech G502 X",
    ZOWIE_EC2_CW: "Zowie EC2-CW",
    PULSAR_X2_V2: "Pulsar X2 V2",
    LOGITECH_G_PRO: "Logitech G Pro",
    NINJUTSO_SORA_V2: "Ninjutso Sora V2",
    STEELSERIES_RIVAL_3: "SteelSeries Rival 3",
    VAXEE_OUTSET_AX: "Vaxee Outset AX Wireless",
}
export default function Header({ selectedDevice, onChangeDevice }: HeaderProps) {
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
                    <option value="" disabled>Select a mouse model</option>
                    {Object.entries(POPULAR_MOUSE_MODELS).map(([key, name]) => (
                        <option key={key} value={name}>{name}</option>
                    ))}
                </select>
            </div>
        </header>)
}
