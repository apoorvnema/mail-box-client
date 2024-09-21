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

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validated, setValidated] = useState(false);
    const navigation = useNavigate();
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null);
            setMessage(null);
        }, 1000);
        
        return () => clearTimeout(timer);
    }, [error, message]);

    const handleSignup = async (e) => {
        e.preventDefault();
        const formElement = e.currentTarget;
        if (formElement.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                setLoading(true);
                const body = {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                };
                const response = await ApiManager.signup(body);
                setMessage("Successfully Signed Up");
                setTimeout(() => {
                    navigation('/login');
                }, 1000);
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
                    <PiMailbox size={48} style={styles.icon} />
                    <h2 style={styles.heading}>Create your React Mail Account</h2>
                    <p style={styles.subheading}>Enter your details</p>
                </div>
                <div style={styles.col2}>
                    <Form noValidate validated={validated} onSubmit={handleSignup} style={styles.form}>
                        <Input 
                            type="text" 
                            placeholder="Name" 
                            name="name" 
                            style={styles.input} 
                            onChange={handleFormChange} 
                            value={form.name} 
                            required 
                        />
                        <Input 
                            type="email" 
                            placeholder="Email" 
                            name="email" 
                            style={styles.input} 
                            onChange={handleFormChange} 
                            value={form.email} 
                            required 
                        />
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            name="password" 
                            style={styles.input} 
                            onChange={handleFormChange} 
                            value={form.password} 
                            required 
                        />
                        <Input 
                            type="password" 
                            placeholder="Confirm Password" 
                            name="confirmPassword" 
                            style={styles.input} 
                            onChange={handleFormChange} 
                            value={form.confirmPassword} 
                            required 
                        />
                        <Button type='submit' text="Signup" />
                    </Form>
                </div>
                <p style={styles.text}>
                    Already have a account? <Link to='/login'>Login</Link>
                </p>
            </Card>
            {error && <Alert variant='danger' style={styles.alert}>{error}</Alert>}
            {message && <Alert variant='success' style={styles.alert}>{message}</Alert>}
        </div>
    );
};

export default Signup;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f1f1f1',
        position: 'relative'
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
    }
};
