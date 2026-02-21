export default Address;
/**
 * Address component - renders semantic address markup.
 * @param {Object} props
 * @param {string} props.address - Address string to display
 * @param {string} [props.className] - Optional CSS class
 */
declare function Address({ address, className }: {
    address: string;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
