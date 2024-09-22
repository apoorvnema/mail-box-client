import React, { useEffect, useState } from 'react';
import Card from '../components/UI/Card';
import { PiMailbox } from "react-icons/pi";
import color from '../constants/Color';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Sidebar from '../components/Sidebar';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const email = useSelector(state => state?.auth?.email);
    const [form, setForm] = useState({
        from: email,
        to: '',
        subject: '',
        body: EditorState.createEmpty()
    });
    const [validated, setValidated] = useState(false);
    const navigation = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const name = useSelector(state => state.auth.name);

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const onEditorStateChange = (editorState) => {
        setForm({
            ...form,
            body: editorState
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
            setMessage(null);
        }, 1000);

        return () => clearTimeout(timer);
    }, [error, message]);

    const handleSend = async (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        if (formElement.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                setLoading(true);
                const body = {
                    to: form.to,
                    subject: form.subject,
                    body: draftToHtml(convertToRaw(form.body.getCurrentContent()))
                };
                const response = await ApiManager.sendMail(body);
                setMessage("Successfully Send Mail");
                setTimeout(() => navigation('/sent'), 1000);
            }
            catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        setValidated(true);
    };

    return (
        <div style={styles.container}>
            {loading && <Loader />}
            <Card style={styles.cardStyle}>
                <div style={styles.col1}>
                    <h2 style={styles.heading}>Welcome, {name}</h2>
                    <p style={styles.subheading}>Enter details to send mail</p>
                </div>
                <div style={styles.col2}>
                    <Form noValidate validated={validated} onSubmit={handleSend} style={styles.form}>
                        <Input
                            type="email"
                            placeholder="From"
                            name="from"
                            style={styles.input}
                            onChange={handleFormChange}
                            value={form.from}
                            required
                            disabled
                        />
                        <Input
                            type="email"
                            placeholder="To"
                            name="to"
                            style={styles.input}
                            onChange={handleFormChange}
                            value={form.to}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Subject"
                            name="subject"
                            style={styles.input}
                            onChange={handleFormChange}
                            value={form.subject}
                            required
                        />
                        <div style={styles.editorContainer}>
                            <Editor
                                editorState={form.body}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={onEditorStateChange}
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                                    inline: { options: ['bold', 'italic', 'underline'] },
                                }}
                            />
                        </div>
                        <Button type='submit' text="Send" />
                    </Form>
                </div>
            </Card>
            {error && <Alert variant='danger' style={styles.alert}>{error}</Alert>}
            {message && <Alert variant='success' style={styles.alert}>{message}</Alert>}
        </div>
    );
};

export default Home;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexFlow: 'wrap',
        backgroundColor: '#f1f1f1',
        height: '100vh',
    },
    cardStyle: {
        display: 'flex',
        flexDirection: 'row',
        padding: '20px 40px',
        maxWidth: '800px',
        width: '100%',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        backgroundColor: color.white,
    },
    col1: {
        flex: 1,
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    col2: {
        flex: 2,
        paddingLeft: '20px',
    },
    icon: {
        marginBottom: '20px',
        color: color.primary,
    },
    heading: {
        fontSize: '28px',
        fontWeight: '500',
        color: color.text,
        textAlign: 'center',
    },
    subheading: {
        fontSize: '16px',
        color: '#757575',
        textAlign: 'center',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    text: {
        textAlign: 'center',
        marginTop: '10px'
    },
    alert: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: '1000'
    },
    editorContainer: {
        border: '1px solid #F1F1F1',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: '10px'
    }
};
