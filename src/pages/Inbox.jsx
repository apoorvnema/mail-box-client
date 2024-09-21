import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import Alert from 'react-bootstrap/Alert';
import color from '../constants/Color';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const response = await ApiManager.getInbox();
        setEmails(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleEmailClick = (emailId) => {
    navigate(`/inbox/${emailId}`);
  };

  return (
    <div style={styles.container}>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 style={{marginLeft:40}}>Inbox</h2>
      <ListGroup>
        {emails.map(email => (
          <ListGroup.Item key={email._id} onClick={() => handleEmailClick(email._id)} style={styles.emailItem}>
            <Card style={styles.cardStyle}>
              <h5>{email.subject}</h5>
              <p>From: {email.sender}</p>
              <p dangerouslySetInnerHTML={{ __html: email.body.slice(0, 100) }} />            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Inbox;

const styles = {
  container: {
    padding: '20px',
    background: color.background
  },
  emailItem: {
    cursor: 'pointer',
    marginBottom: '10px',
  },
  cardStyle: {
    padding: '10px',
  },
};
