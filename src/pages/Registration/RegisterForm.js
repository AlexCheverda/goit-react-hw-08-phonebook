import { Form, Button, Container } from 'react-bootstrap';

import { useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import style from './RegisterForm.module.css';
import Loader from 'components/Loader';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.currentTarget;
        if (name === 'name') {
            setName(value);
        }
        if (name === 'email') {
            setEmail(value);
        }
        if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmitChange = async event => {
        setIsLoading(true);

        event.preventDefault();
        dispatch(register({ name, email, password }));
        reset();
    };

    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setIsLoading(false);
    };

    return (
        <Container className={style.registerContainer}>
            <Suspense fallback={<Loader />}>
                <Form onSubmit={handleSubmitChange} className={style.form}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            autoComplete="false"
                            required
                        />
                    </Form.Group>
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
                            placeholder="Enter password"
                            value={password}
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
                {isLoading && <Loader />}
            </Suspense>
        </Container>
    );
};
export default RegisterForm;