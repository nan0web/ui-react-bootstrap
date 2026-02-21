import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import { useUI } from '@nan0web/ui-react';
import { BsSearch } from 'react-icons/bs';
import './Header.v2.scss';

const NavItemRenderer = ({ item, level = 0, index, activePath, onToggle }) => {
    const children = item.items || item.children;
    const hasChildren = children && children.length > 0;
    const id = `${level}-${index}`;
    const isShow = activePath && activePath.includes(id);

    const handleClick = (e) => {
        if (hasChildren) {
            e.preventDefault();
            onToggle(id, level);
        }
    };

    const icon = (level === 0 || level > 1) && item.icon ? <span className={`icon-${item.icon} me-1`}></span> : null;

    if (level === 0) {
        return (
            <li className={`nav-item ${hasChildren ? 'dropdown' : ''}`} key={index}>
                <Nav.Link
                    href={item.href || '#'}
                    onClick={handleClick}
                    className={`nav-link ${hasChildren ? 'dropdown-toggle' : ''} ${isShow ? 'show' : ''} d-flex align-items-center`}
                >
                    {icon}
                    <span>{item.title}</span>
                </Nav.Link>
                {hasChildren && isShow && (
                    <ul className={`dropdown-menu show start`}>
                        {children.map((child, idx) => (
                            <NavItemRenderer
                                key={idx}
                                item={child}
                                level={level + 1}
                                index={`${index}-${idx}`}
                                onToggle={onToggle}
                                activePath={activePath}
                            />
                        ))}
                    </ul>
                )}
            </li>
        );
    }

    // Level 1: Horizontal Bar Item (No arrows/dividers requested by user)
    if (level === 1) {
        return (
            <li className="nav-item" key={index}>
                <a
                    href={item.href || '#'}
                    className={`nav-link ${isShow ? 'active' : ''}`}
                    onClick={handleClick}
                >
                    {item.title}
                </a>
                {hasChildren && isShow && (
                    <ul className={`dropdown-menu sub-menu show`}>
                        {children.map((child, idx) => (
                            <NavItemRenderer
                                key={idx}
                                item={child}
                                level={level + 1}
                                index={`${index}-${idx}`}
                                onToggle={onToggle}
                                activePath={activePath}
                            />
                        ))}
                    </ul>
                )}
            </li>
        );
    }

    // Level 2+ (Vertical Dropdown)
    if (hasChildren) {
        return (
            <li className="dropdown" key={index}>
                <a
                    href={item.href || '#'}
                    className="dropdown-item dropdown-toggle d-flex justify-content-between align-items-center"
                    onClick={handleClick}
                >
                    <div className="d-flex align-items-center">
                        {icon}
                        <span>{item.title}</span>
                    </div>
                    {hasChildren && <span className="ms-auto ps-2">›</span>}
                </a>
                <ul className={`dropdown-menu sub-menu ${isShow ? 'show' : ''}`}>
                    {children.map((child, idx) => (
                        <NavItemRenderer
                            key={idx}
                            item={child}
                            level={level + 1}
                            index={`${index}-${idx}`}
                            onToggle={onToggle}
                            activePath={activePath}
                        />
                    ))}
                </ul>
            </li>
        );
    }

    return (
        <li key={index}>
            <a className="dropdown-item" href={item.href || '#'}>
                {icon}
                <span>{item.title}</span>
            </a>
        </li>
    );
};

const Header = ({ nav, title: propTitle, $logo: propLogo, offices }) => {
    const { document, t, db } = useUI();
    const [activePath, setActivePath] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showDuty, setShowDuty] = useState(false);
    const [dutyData, setDutyData] = useState([]);

    const navItems = (nav && nav !== true ? (nav.items || nav.children) : (document?.nav?.items || document?.nav?.children)) || [];
    const logoUrl = (propLogo || document?.$logo || document?.logo)?.wide ||
                    (propLogo || document?.$logo || document?.logo)?.square ||
                    document?.logo ||
                    '/img/logo-uk.svg';
    const title = propTitle || document?.title || "Industrialbank";

    useEffect(() => {
        if (offices === 'duty' && db) {
            db.fetch('/uk/duty').then(setDutyData).catch(err => console.error("Duty fetch error:", err));
        }
    }, [offices, db]);

    const handleToggle = (id, level) => {
        setActivePath(prev => {
            if (prev.includes(id)) {
                return prev.filter(p => {
                    const pLevel = parseInt(p.split('-')[0]);
                    return pLevel < level;
                });
            } else {
                const newPath = prev.filter(p => {
                    const pLevel = parseInt(p.split('-')[0]);
                    return pLevel < level;
                });
                return [...newPath, id];
            }
        });
    };

    return (
        <header className="root sticky-top">
            <Navbar expand="xl" className="navbar px-0">
                <Container>
                    <Navbar.Brand href="/" className="me-4 logo-brand">
                        <img src={logoUrl} height="55" className="d-inline-block align-top" alt={title} />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <ul className="navbar-nav main-nav">
                            {navItems.map((item, index) => (
                                <NavItemRenderer
                                    key={index}
                                    item={item}
                                    index={index}
                                    activePath={activePath}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </ul>

                        <div className="d-flex align-items-center gap-3 ms-xl-auto right-nav">
                            <Dropdown align="end" className="lang">
                                <Dropdown.Toggle variant="link" className="p-0 border-0">
                                    <div className="lang-bubble shadow-sm">
                                        🇺🇦
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="shadow border-0">
                                    <Dropdown.Item active>Українська</Dropdown.Item>
                                    <Dropdown.Item>English</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown align="end" className="signin">
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-signin" className="px-3 rounded-pill fw-bold border-2">
                                    {t('Вхід')}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-menu-end shadow-lg border-0 mt-2">
                                    <Dropdown.Item href="https://ibank.ua/private" className="py-2">{t('Приватним особам')}</Dropdown.Item>
                                    <Dropdown.Item href="https://ibank.ua/business" className="py-2">{t('Бізнесу')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <Button variant="link" className="p-0 text-dark search-btn" onClick={() => setShowSearch(true)}>
                                <BsSearch size={24} />
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Modal search with centered UI */}
            <Modal show={showSearch} onHide={() => setShowSearch(false)} size="lg" centered className="search-modal">
                <Modal.Body className="p-4 bg-white rounded-3">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h4 className="mb-0 fw-bold">{t('Пошук')}</h4>
                        <Button variant="close" onClick={() => setShowSearch(false)} aria-label="Close"></Button>
                    </div>
                    <Form className="position-relative">
                        <Form.Control
                            type="search"
                            placeholder={t('Що ви шукаєте?')}
                            autoFocus
                            className="form-control-lg border-2 border-primary rounded-pill ps-4 pe-5"
                        />
                        <Button variant="primary" className="position-absolute end-0 top-0 bottom-0 px-4 rounded-pill m-1" style={{zIndex: 5}}>
                            {t('Шукати')}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDuty} onHide={() => setShowDuty(false)} size="xl">
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="fw-bold">{t('Duty Branches')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <div className="row g-3">
                            {dutyData.map((item, idx) => (
                                <div className="col-md-4" key={idx}>
                                    <div className="card h-100 p-3 shadow-sm border-0 bg-light">
                                        <h5 className="fw-bold text-primary">{item.title}</h5>
                                        <p className="small mb-1">{item.address}</p>
                                        <p className="small text-muted mb-2">{item.city}</p>
                                        <div className="mt-auto border-top pt-2">
                                            {item.phones?.map((p, i) => (
                                                <div key={i} className="small text-dark">📞 {p}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </header>
    );
};

export default Header;
