import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Loader from '../components/UI/Loader';
import Alert from 'react-bootstrap/Alert';
import Card from '../components/UI/Card';
import ApiManager from '../services/apiManager';

const EmailDetail = () => {
    const { emailId } = useParams();
    const location = useLocation();
    const mode = location?.state?.mode;
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmailDetail = async () => {
            try {
                let response;
                if (mode === '/inbox')
                    response = await ApiManager.getMailDetail(emailId);
                if (mode === '/sent')
                    response = await ApiManager.getSentMailDetail(emailId);
                setEmail(response);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmailDetail();
    }, [emailId]);

    if (loading) return <Loader />;

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div style={styles.container}>
            {email && (
                <Card style={styles.cardStyle}>
                    <h2>{email.subject}</h2>
                    <p><strong>From:</strong> {email.sender || email.recipient}</p>
                    <p><strong>Body:</strong></p>
                    <div dangerouslySetInnerHTML={{ __html: email.body }} />
                </Card>
            )}
        </div>
    );
};

export default EmailDetail;

const styles = {
    container: {
        padding: '20px',
        paddingTop: '60px',
    },
    cardStyle: {
        padding: '20px',
    },
};
