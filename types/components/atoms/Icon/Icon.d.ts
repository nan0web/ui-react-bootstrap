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
