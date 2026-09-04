import type { RefObject } from "react";

export interface HeaderProps {
    selectedDevice: string;
    onChangeDevice: (device: string) => void;
}

export interface DoubleClickTestProps {
    clickCount: number;
    doubleClicks: number;
    minInterval: number | null;
    onClickArea: () => void;
    onReset: (e: React.MouseEvent) => void;
}

export interface ScrollTestProps {
    scrollAreaRef: RefObject<HTMLDivElement | null>;
    scrollPixels: number;
    scrollGlitches: number;
    lastDirection: 'Up' | 'Down' | 'Idle';
    onReset: (e: React.MouseEvent) => void;
}
export interface ButtonsProps {
    activeTab: 'doubleClick' | 'scroll';
    changeActiveTab: (tab: 'doubleClick' | 'scroll') => void;
}
export interface SidebarProps {
    isSubmitDisabled: boolean;
    onSubmit: () => void;
}