import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import Alert from 'react-bootstrap/Alert';
import color from '../constants/Color';
import { GoDotFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";

const Inbox = () => {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setMessage(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [error, message]);

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

  const handleDeleteMail = async (e, id) => {
    e.stopPropagation();
    console.log(id);
    try {
      setLoading(true);
      const res = await ApiManager.deleteMail(id);
      setMessage(res.message);
      setMails(prevMails => prevMails.filter(mail => mail._id !== id));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {loading && <Loader />}
      {error && <Alert style={styles.alert} variant="danger">{error}</Alert>}
      {message && <Alert style={styles.alert} variant="success">{message}</Alert>}
      <h2 style={{ marginLeft: 40 }}>Inbox ({unreadCount})</h2>
      <ListGroup>
        {mails.map(email => (
          <ListGroup.Item key={email._id} onClick={() => handleEmailClick(email._id)} style={styles.emailItem}>
            <Card style={styles.cardStyle}>
              <h5>{email.subject}</h5>
              <p>From: {email.sender}</p>
              <p dangerouslySetInnerHTML={{ __html: email.body.slice(0, 100) }} />
              {email?.read === false && <GoDotFill style={styles.read} size={24} />}
              <MdDeleteForever style={styles.delete} size={24} onClick={(e) => handleDeleteMail(e, email._id)} />
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
    background: color.background,
    position: 'relative'
  },
  emailItem: {
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
  delete: {
    position: 'absolute',
    bottom: '10%',
    right: '2%',
    zIndex: 1,
    color: color.danger,
    cursor: 'pointer',
  },
  alert: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    zIndex: '1000'
  }
};
