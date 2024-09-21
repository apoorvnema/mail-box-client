import React, { useState } from 'react';
import Card from '../components/UI/Card';
import { PiMailbox } from "react-icons/pi";
import color from '../constants/Color';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import ApiManager from '../services/apiManager';
import Loader from '../components/UI/Loader';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigation = useNavigate();

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const checkValidation = () => {
        if(form.password !== form.confirmPassword) {
            alert("Passwords do not match")
            return true;
        }
        return false;
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if(checkValidation()) return;
        try {
            setLoading(true)
            const body = {
                email: form.email,
                password: form.password,
                returnSecureToken: true
            }
            const response = await ApiManager.signup(body);
            alert("Successfully Signed Up")
            navigation('/login')
        }
        catch (error) {
            alert(error.message)
        }
        finally {
            setLoading(false)
            setForm({
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
    }

    return (
        <div style={styles.container}>
            {loading && <Loader />}
            <Card customStyle={styles.cardStyle}>
                <div style={styles.col1}>
                    <PiMailbox size={48} style={styles.icon} />
                    <h2 style={styles.heading}>Create a React Mail Account</h2>
                    <p style={styles.subheading}>Enter your details</p>
                </div>
                <div style={styles.col2}>
                    <form style={styles.form} onSubmit={handleSignup}>
                        <Input type="text" placeholder='Name' name="name" style={styles.input} onChange={handleFormChange} value={form.name} required/>
                        <Input type="email" placeholder='Email' name="email" style={styles.input} onChange={handleFormChange} value={form.email} required/>
                        <Input type="password" placeholder='Password' name="password" style={styles.input} onChange={handleFormChange} value={form.password} required/>
                        <Input type="password" placeholder='Confirm Password' name="confirmPassword" style={styles.input} onChange={handleFormChange} value={form.confirmPassword} required/>
                        <Button type='submit' text={"Sign Up"} />
                    </form>
                </div>
            </Card>
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
        borderRight: '1px solid #e0e0e0',
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
};
