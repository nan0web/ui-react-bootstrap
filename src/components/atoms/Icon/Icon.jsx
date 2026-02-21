import React from 'react';
import {
    BsTelegram, BsFacebook, BsInstagram, BsYoutube,
    BsSearch, BsTelephoneFill, BsEnvelopeFill, BsGlobe,
    BsGeoAltFill, BsPhoneFill, BsBank, BsCreditCardFill,
    BsShieldCheck, BsInfoCircleFill, BsChevronRight, BsChevronDown,
    BsHeadset, BsCalendar3, BsClockFill, BsPersonFill,
    BsLink45Deg, BsDownload, BsFileEarmarkPdfFill, BsCaretDownFill, BsArrowRight
} from 'react-icons/bs';
import { FaViber, FaWhatsapp } from 'react-icons/fa';

export const iconMap = {
    telegram: BsTelegram,
    facebook: BsFacebook,
    instagram: BsInstagram,
    youtube: BsYoutube,
    viber: FaViber,
    whatsapp: FaWhatsapp,
    search: BsSearch,
    phone: BsTelephoneFill,
    mail: BsEnvelopeFill,
    language: BsGlobe,
    pin: BsGeoAltFill,
    mobile: BsPhoneFill,
    bank: BsBank,
    'credit-card': BsCreditCardFill,
    'shield-check': BsShieldCheck,
    'info-circle': BsInfoCircleFill,
    right: BsChevronRight,
    down: BsChevronDown,
    headset: BsHeadset,
    calendar: BsCalendar3,
    clock: BsClockFill,
    person: BsPersonFill,
    link: BsLink45Deg,
    download: BsDownload,
    pdf: BsFileEarmarkPdfFill,
    'caret-down': BsCaretDownFill,
    arrow: BsArrowRight
};

/**
 * Icon component - renders Font Awesome icons from react-icons.
 * @param {Object} props
 * @param {string} props.name - Icon name from the iconMap
 * @param {number} [props.size=20] - Icon size in pixels
 * @param {string} [props.className] - Optional CSS class
 */
const Icon = ({ name, size = 20, className = '' }) => {
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in iconMap`);
        return null;
    }

    return <IconComponent size={size} className={className} />;
};

export default Icon;
