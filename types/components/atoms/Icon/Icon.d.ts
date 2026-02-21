export const iconMap: {
    telegram: import("react-icons/lib").IconType;
    facebook: import("react-icons/lib").IconType;
    instagram: import("react-icons/lib").IconType;
    youtube: import("react-icons/lib").IconType;
    viber: import("react-icons/lib").IconType;
    whatsapp: import("react-icons/lib").IconType;
    search: import("react-icons/lib").IconType;
    phone: import("react-icons/lib").IconType;
    mail: import("react-icons/lib").IconType;
    language: import("react-icons/lib").IconType;
    pin: import("react-icons/lib").IconType;
    mobile: import("react-icons/lib").IconType;
    bank: import("react-icons/lib").IconType;
    'credit-card': import("react-icons/lib").IconType;
    'shield-check': import("react-icons/lib").IconType;
    'info-circle': import("react-icons/lib").IconType;
    right: import("react-icons/lib").IconType;
    down: import("react-icons/lib").IconType;
    headset: import("react-icons/lib").IconType;
    calendar: import("react-icons/lib").IconType;
    clock: import("react-icons/lib").IconType;
    person: import("react-icons/lib").IconType;
    link: import("react-icons/lib").IconType;
    download: import("react-icons/lib").IconType;
    pdf: import("react-icons/lib").IconType;
    'caret-down': import("react-icons/lib").IconType;
    arrow: import("react-icons/lib").IconType;
};
export default Icon;
/**
 * Icon component - renders Font Awesome icons from react-icons.
 * @param {Object} props
 * @param {string} props.name - Icon name from the iconMap
 * @param {number} [props.size=20] - Icon size in pixels
 * @param {string} [props.className] - Optional CSS class
 */
declare function Icon({ name, size, className }: {
    name: string;
    size?: number;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
