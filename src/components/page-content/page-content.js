import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './page-content.module.css';

function PageContent({ children, title }) {
    return (
        <Container>
            <div className={styles.pageContent}>
                {title ? <h3>{title}</h3> : null}
                {children}
            </div>
        </Container>
    );
}

PageContent.propTypes = {
    title: PropTypes.string
}

export default PageContent;