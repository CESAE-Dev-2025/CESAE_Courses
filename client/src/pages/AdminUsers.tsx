import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {withAuth, refreshToken, clearToken} from '../api/auth';
import {MDBIcon, MDBTooltip} from "mdb-react-ui-kit";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface User {
    id: number;
    username: string;
    role: string;
}

export default function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
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
            const res = await apiFetch(`${SERVER_URL}/admin/users`);
            if (res.ok) {
                const data = await res.json();
                setUsers(data);
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
                                        className="list-group-item d-flex justify-content-between align-items-center">
                                        {user.username}
                                        <div className="">
                                            <span className="badge bg-info rounded-pill me-3">{user.role}</span>

                                            <MDBTooltip tag='a' wrapperProps={{href: '#'}}
                                                        title={`Remover utilizador '${user.username}'`}>
                                                <a href="#" className="text-decoration-none text-danger p-2"
                                                   data-bs-toggle="tooltip" data-bs-title="Default tooltip"
                                                   onClick={() => {
                                                       console.log(user.id);
                                                   }}>
                                                    <MDBIcon fas icon="times"/>
                                                </a>
                                            </MDBTooltip>

                                        </div>
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
