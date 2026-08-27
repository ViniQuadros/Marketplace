import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { API_BASE_URL } from '../server/api';
import '../css/login.css'

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords need to match')
            return
        }

        console.log(`${API_BASE_URL}/api/users/register`)
        try {
            const res = await fetch(`${API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
            })

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Error creating account');
                return;
            }

            navigate('/login');
        } catch (err) {
            console.error(err);
            setError('Error conecting to server');
        }
    }

    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <div id="borderForm">
                <div className="form-row">
                    <label htmlFor="email">Enter email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="password">Enter Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p className="error">{error}</p>}

                <input type="submit" value="Create Account" className="submitBtn" />

                <p>
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </form>
    )
}