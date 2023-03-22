import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavLink(props) {
    const navigate = useNavigate();

    return (
        <Nav.Link {...props} onClick={(e) => {
            e.preventDefault();
            navigate(props.href)
        }} />
    );
}

export default NavLink;