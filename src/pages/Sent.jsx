import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import { ListGroup } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import Alert from 'react-bootstrap/Alert';
import color from '../constants/Color';
import { MdDeleteForever } from "react-icons/md";

const SentBox = () => {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        const response = await ApiManager.getSent();
        setMails(response);
      }
      catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchMails();
  }, []);

  const handleEmailClick = async (id) => {
    navigate(`/sent/${id}`, { state: { mode: location.pathname } });
  };

  const handleDeleteMail = async (e, id) => {
    e.stopPropagation();
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
      <h2 style={{ marginLeft: 40 }}>Sent</h2>
      <ListGroup>
        {mails.map(email => (
          <ListGroup.Item key={email._id} onClick={() => handleEmailClick(email._id)} style={styles.emailItem}>
            <Card style={styles.cardStyle}>
              <h5>{email.subject}</h5>
              <p>To: {email.recipient}</p>
              <p dangerouslySetInnerHTML={{ __html: email.body.slice(0, 100) }} />
              <MdDeleteForever style={styles.delete} size={24} onClick={(e) => handleDeleteMail(e, email._id)} />
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SentBox;

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
