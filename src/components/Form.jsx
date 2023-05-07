import { useState } from 'react';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [];

        if (!name) {
            errors.push('Username is required');
        }
        if (!email) {
            errors.push('Email is required');
        }

        if (errors.length > 0) {
            setFormErrors(errors);
        } else {
            const newUser = { id: users.length + 1, name, email };
            setUsers((users) => {
                return [...users, newUser];
            });
            setName('');
            setEmail('');
            setFormErrors([]);
        }
    };

    const deleteHandel = (id) => {
        const newUsers = users.filter((user) => user.id !== id);
        setUsers(newUsers);
    };

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form">
                    <label htmlFor="firstName">Name : </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form">
                    <label htmlFor="email">Email : </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {formErrors.length > 0 && (
                    <div style={{ color: 'red' }}>
                        {formErrors.map((error) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                )}
                <button type="submit">Add User</button>
            </form>
            {users.map((user) => {
                const { id, name, email } = user;
                return (
                    <div key={id}>
                        <h4>{name}</h4>
                        <p>{email}</p>
                        <button
                            onClick={() => {
                                deleteHandel(id);
                            }}
                        >
                            x
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default Form;
