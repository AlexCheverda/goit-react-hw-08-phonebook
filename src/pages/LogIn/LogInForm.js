import { Form, Button } from 'react-bootstrap';
import { useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/authOperations';
import style from './LogInForm.module.css';

import Loader from 'components/Loader';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.currentTarget;

        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmitChange = async event => {
        event.preventDefault();
        dispatch(logIn({ email, password }));
        reset();
    };

    const reset = () => {
        setEmail('');
        setPassword('');
    };

    return (
        <div className={style.loginContainer}>
            <Suspense fallback={<Loader />}>
                <Form onSubmit={handleSubmitChange} className={style.form}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            autoComplete="false"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={handleInputChange}
                            autoComplete="false"
                            required
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="outline-light" type="submit">
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </Suspense>
        </div>
    );
};
export default LoginForm;