import React, { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { AiOutlineMenu, AiOutlineInbox, AiOutlineSend, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

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
        <Offcanvas.Header closeButton className="">
          <Offcanvas.Title>Mail Client</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={()=>{toggleSidebar(); handleClick("inbox");}}>
              <AiOutlineInbox style={styles.icon} /> Inbox
            </Nav.Link>
            <Nav.Link onClick={()=>{toggleSidebar(); handleClick("compose");}}>
              <AiOutlineEdit style={styles.icon} /> Compose Mail
            </Nav.Link>
            <Nav.Link onClick={()=>{toggleSidebar(); handleClick("sent");}}>
              <AiOutlineSend style={styles.icon} /> Sent Mails
            </Nav.Link>
          </Nav>
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
  icon: {
    marginRight: '10px',
    verticalAlign: 'middle',
  },
};
