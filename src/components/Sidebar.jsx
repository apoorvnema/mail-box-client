import React, { useState } from 'react';
import { Offcanvas, Nav, Button } from 'react-bootstrap';
import { AiOutlineMenu, AiOutlineInbox, AiOutlineSend, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/auth';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => setShow(!show);

  const handleClick = (page) => {
    switch (page) {
      case 'inbox':
        navigate('/inbox');
        break;
      case 'compose':
        navigate('/');
        break;
      case 'sent':
        navigate('/sent');
        break;
      default:
        break;
    }
  }

  const handleLogout = () => {
    dispatch(authAction.logout());
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  }

  return (
    <>
      {!show && <div style={styles.menuIcon}>
        <AiOutlineMenu size={30} onClick={toggleSidebar} />
      </div>}

      <Offcanvas 
        show={show}
        onHide={toggleSidebar} 
        placement="start" 
        responsive="" 
        className={window.innerWidth="d-block"}
        style={styles.sidebar}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Mail Client</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={styles.sidebarBody}>
          <Nav className="flex-column">
            <Nav.Link onClick={() => { toggleSidebar(); handleClick("inbox"); }}>
              <AiOutlineInbox style={styles.icon} /> Inbox
            </Nav.Link>
            <Nav.Link onClick={() => { toggleSidebar(); handleClick("compose"); }}>
              <AiOutlineEdit style={styles.icon} /> Compose Mail
            </Nav.Link>
            <Nav.Link onClick={() => { toggleSidebar(); handleClick("sent"); }}>
              <AiOutlineSend style={styles.icon} /> Sent Mails
            </Nav.Link>
          </Nav>

          <div style={styles.logoutContainer}>
            <Button variant="danger" onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;

const styles = {
  menuIcon: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    cursor: 'pointer',
    zIndex: '1050',
  },
  sidebar: {
    width: '250px',
    zIndex: '1049',
  },
  sidebarBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  icon: {
    marginRight: '10px',
    verticalAlign: 'middle',
  },
  logoutContainer: {
    marginTop: 'auto',
    padding: '10px 0',
    textAlign: 'center',
    marginBottom: '50px',
  },
  logoutButton: {
    width: '100%',
  },
};
