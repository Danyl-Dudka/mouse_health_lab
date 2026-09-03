import styles from './buttons.module.css';
import type { ButtonsProps } from '../types';
export default function Buttons({ activeTab, changeActiveTab }: ButtonsProps) {
    return (
        <>
            <button
                onClick={() => changeActiveTab('doubleClick')}
                className={`${styles.tabBtn} ${activeTab === 'doubleClick' ? styles.active : ''}`}
            >
                ⚡ Double Click Test
            </button>
            <button
                onClick={() => changeActiveTab('scroll')}
                className={`${styles.tabBtn} ${activeTab === 'scroll' ? styles.active : ''}`}
            >
                🔄 Scroll Encoder Test
            </button>
        </>
    )
}
