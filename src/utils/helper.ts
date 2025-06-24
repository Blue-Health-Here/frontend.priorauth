import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { reqStatusOptions } from "./constants";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getStatusStyle = (status: string) => {
    let statusClass = 'px-3 py-1 rounded-full text-xs sm:text-sm lg:text-base font-seccondary';
    switch (status?.toLowerCase()) {
        case 'pending':
            statusClass += ' !bg-warning-chip-bg-color !text-warning-chip';
            break;
        case 'approved':
            statusClass += ' !bg-success-chip-bg-color !text-success-chip';
            break;
        case 'rejected':
            statusClass += ' !bg-error-chip-bg-color !text-error-chip';
            break;
        case 'in progress':
            statusClass += ' !bg-information-chip-bg-color !text-information-chip';
            break;
        case 'completed':
            statusClass += ' !bg-success-chip-bg-color !text-success-chip';
            break;
        case 'cancelled':
            statusClass += ' !bg-secondary-background !text-tertiary-black';
            break;
        default:
            statusClass += ' !bg-gray-100 !text-gray-800';
    }
    return statusClass;
};

export const getStatusTextColor = (status: string) => {
    let statusClass = '';
    switch (status?.toLowerCase()) {
        case 'pending':
            statusClass += ' !text-warning-chip';
            break;
        case 'approved':
            statusClass += ' !text-success-chip';
            break;
        case 'rejected':
            statusClass += ' !text-error-chip';
            break;
        case 'in progress':
            statusClass += ' !text-information-chip';
            break;
        case 'completed':
            statusClass += ' !text-success-chip';
            break;
        case 'cancelled':
            statusClass += ' !text-tertiary-black';
            break;
        default:
            statusClass += ' !text-gray-800';
    }
    return statusClass;
};

export const getReqBgStatusStyle = (status: string) => {
    let statusClass = 'px-3 py-1 rounded-full text-xs sm:text-sm lg:text-base font-seccondary';
    switch (status?.toLowerCase()) {
        case reqStatusOptions[0].value:
            statusClass += ' !bg-warning-chip-bg-color !text-warning-chip';
            break;
        case reqStatusOptions[1].value:
            statusClass += ' !bg-success-chip-bg-color !text-success-chip';
            break;
        case reqStatusOptions[2].value:
            statusClass += ' !bg-error-chip-bg-color !text-error-chip';
            break;
        case reqStatusOptions[3].value:
            statusClass += ' !bg-information-chip-bg-color !text-information-chip';
            break;
        default:
            statusClass += ' !bg-gray-100 !text-gray-800';
    }
    return statusClass;
};

export const getReqStatusTextColor = (status: string) => {
    let statusClass = '';
    switch (status?.toLowerCase()) {
        case reqStatusOptions[0].value:
            statusClass += ' !text-warning-chip';
            break;
        case reqStatusOptions[1].value:
            statusClass += ' !text-success-chip';
            break;
        case reqStatusOptions[2].value:
            statusClass += ' !text-error-chip';
            break;
        case reqStatusOptions[3].value:
            statusClass += ' !text-information-chip';
            break;
        default:
            statusClass += ' !text-gray-800';
    }
    return statusClass;
};

export const getCurrentBadgeColors = (status?: string) => {
    let activeBadge = '';
    switch (status) {
        case 'error':
            activeBadge = 'text-status-error-text-color bg-status-error-bg-color'
            break;
        case 'warning':
            activeBadge = 'text-status-warning-text-color bg-status-warning-bg-color'
            break;
        default:
            activeBadge = 'text-status-success-text-color bg-status-success-bg-color'
            break;
    }
    return activeBadge;
};

/**
 * Format number to shorthand (e.g., 1.5k, 2M)
 * @param {number} value - The number to format.
 * @param {number} decimalPlaces - Decimal places to show (default: 1).
 * @returns {string} Formatted number string.
 */
export function formatNumberWithUnits(value: any, decimalPlaces = 1) {
    if (value < 1000) return value.toString();

    const units = ['k', 'M', 'B', 'T'];
    let unitIndex = -1;

    while (value >= 1000 && unitIndex < units.length - 1) {
        value /= 1000;
        unitIndex++;
    }

    return `${parseFloat(value.toFixed(decimalPlaces))}${units[unitIndex]}`;
}
