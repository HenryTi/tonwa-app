import { LocalMap } from './localDb';
export declare const env: {
    unit: number;
    testing: boolean;
    buildingUq: boolean;
    params: {
        [key: string]: string;
    };
    lang: string;
    district: string;
    timeZone: number;
    browser: string;
    isMobile: boolean;
    localDb: LocalMap;
    isDevelopment: any;
};
