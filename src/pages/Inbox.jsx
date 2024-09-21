import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import Alert from 'react-bootstrap/Alert';
import color from '../constants/Color';
import { GoDotFill } from "react-icons/go";

const Inbox = () => {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMails = async () => {
      try {
        setLoading(true);
        const response = await ApiManager.getInbox();
        setMails(response.mailsWithSenders);
        setUnreadCount(response.unreadCount);
      }
      catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchMails();
  }, []);

  const handleEmailClick = async (id) => {
    try {
      setLoading(true);
      await ApiManager.markAsRead(id);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
    setMails(prevMails =>
      prevMails.map(mail =>
        mail._id === id ? { ...mail, read: true } : mail
      )
    );
    navigate(`/inbox/${id}`);
  };

  return (
    <div style={styles.container}>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 style={{ marginLeft: 40 }}>Inbox ({unreadCount})</h2>
      <ListGroup>
        {mails.map(email => (
          <ListGroup.Item key={email._id} onClick={() => handleEmailClick(email._id)} style={styles.emailItem}>
            <Card style={styles.cardStyle}>
              <h5>{email.subject}</h5>
              <p>From: {email.sender}</p>
              <p dangerouslySetInnerHTML={{ __html: email.body.slice(0, 100) }} />
              {email?.read === false && <GoDotFill style={styles.read} size={24}/>}
            </Card>
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
    position: 'relative',
    padding: '10px',
  },
  read: {
    position: 'absolute',
    top: '50%',
    right: '2%',
    color: color.primary
  },
};
