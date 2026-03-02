import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {withAuth, refreshToken, clearToken} from '../api/auth';
import {MDBIcon, MDBTooltip} from "mdb-react-ui-kit";
import './AdminUsers.css';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface User {
    id: number;
    username: string;
    role: string;
}

export default function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    async function apiFetch(url: string, options: RequestInit = {}) {
        let res = await fetch(url, {
            ...options,
            headers: withAuth(options.headers || {}),
        });

        if (res.status === 401) {
            try {
                await refreshToken();
                res = await fetch(url, {
                    ...options,
                    headers: withAuth(options.headers || {}),
                });
            } catch (e) {
                clearToken();
                navigate('/login');
                throw e;
            }
        }
        return res;
    }

    async function fetchUsers() {
        try {
            const [resUsers, resMe] = await Promise.all([
                apiFetch(`${SERVER_URL}/admin/users`),
                apiFetch(`${SERVER_URL}/auth/me`)
            ]);

            if (resUsers.ok) {
                const data = await resUsers.json();
                setUsers(data);
            }

            if (resMe.ok) {
                const data = await resMe.json();
                setCurrentUser(data.username);
            }
        } catch (err) {
            console.error('Falha ao recuperar dados de utilizadores', err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    async function handleAddUser(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const res = await apiFetch(`${SERVER_URL}/admin/users`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Usuário adicionado com sucesso!');
                setUsername('');
                setPassword('');
                fetchUsers();
            } else {
                setError(data.error || 'Erro ao adicionar usuário');
            }
        } catch (err) {
            setError(`Erro de conexão: ${err}`);
        }
    }

    async function handleRemoveUser(id: number) {
        if (!window.confirm('Tem certeza que deseja remover este utilizador?')) {
            return;
        }

        setMessage('');
        setError('');
        try {
            const res = await apiFetch(`${SERVER_URL}/admin/users`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id}),
            });
            const data = await res.json();
            if (res.ok) {
                setMessage('Usuário removido com sucesso!');
                fetchUsers();
            } else {
                setError(data.error || 'Erro ao remover usuário');
            }
        } catch (err) {
            setError(`Erro de conexão: ${err}`);
        }
    }

    return (
        <>
            <div className="container mt-5">
                <h1>Gerenciar Usuários Admin</h1>
                <button className="btn btn-outline-primary mb-4" onClick={() => navigate('/admin')}>
                    Voltar ao Dashboard
                </button>

                <div className="row">
                    <div className="col-12 col-md-9 row mx-auto mb-4">
                        <div className="col-md-8 my-4">
                            <h3>Adicionar novo administrador</h3>
                            <form onSubmit={handleAddUser} className="card p-4">
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-label form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-label form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Adicionar
                                </button>
                                {message && <div className="alert alert-success mt-3">{message}</div>}
                                {error && <div className="alert alert-danger mt-3">{error}</div>}
                            </form>
                        </div>

                        <div className="col-md-4 my-4">
                            <h3>Administradores</h3>
                            <ul className="list-group">
                                {users.map((user) => (
                                    <li key={user.id}
                                        className="list-group-item d-flex align-items-center justify-content-between">
                                        <span className="fw-bold px-2">{user.username}</span>


                                        {currentUser !== user.username && (
                                            <MDBTooltip tag='a' wrapperProps={{href: '#'}}
                                                        title={`Remover utilizador '${user.username}'`}>
                                                <button type="button"
                                                        className="btn btn-link text-danger px-4"
                                                        onClick={() => handleRemoveUser(user.id)}
                                                >
                                                    <MDBIcon fas icon="times"/>
                                                </button>
                                            </MDBTooltip>
                                        )}

                                        {currentUser === user.username && (
                                            <MDBTooltip tag='a' wrapperProps={{href: '#'}}
                                                        title="Proibido remover a si mesmo">
                                                <button type="button"
                                                        className="btn btn-link text-danger px-4" disabled
                                                >
                                                    <MDBIcon fas icon="minus-circle"/>
                                                </button>
                                            </MDBTooltip>
                                        )}

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
