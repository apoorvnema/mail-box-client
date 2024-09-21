import React, { useState } from 'react';
import Card from '../components/UI/Card';
import { PiMailbox } from "react-icons/pi";
import color from '../constants/Color';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const navigation = useNavigate();

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const body = {
                email: form.email,
                password: form.password,
                returnSecureToken: true
            }
            const response = await ApiManager.login(body);
            alert("Successfully Logged In")
            navigation('/')
        }
        catch (error) {
            alert(error.message)
        }
        finally {
            setLoading(false)
            setForm({
                email: '',
                password: '',
            })
        }
    }

    return (
        <div style={styles.container}>
            {loading && <Loader />}
            <Card style={styles.cardStyle}>
                <div style={styles.col1}>
                    <PiMailbox size={48} style={styles.icon} />
                    <h2 style={styles.heading}>Sign in to React Mail Account</h2>
                    <p style={styles.subheading}>Enter your details</p>
                </div>
                <div style={styles.col2}>
                    <div style={styles.form}>
                    <Input type="email" placeholder='Email' name="email" style={styles.input} onChange={handleFormChange} value={form.email} required />
                    <Input type="password" placeholder='Password' name="password" style={styles.input} onChange={handleFormChange} value={form.password} required />
                    <Button type='submit' text={"Login"} onClick={handleLogin} />
                    </div>
                </div>
                <p style={styles.text}>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
            </Card>
        </div>
    );
};

export default Login;

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f1f1f1',
    },
    cardStyle: {
        display: 'flex',
        flexDirection: 'row',
        padding: '40px',
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
    }
};
