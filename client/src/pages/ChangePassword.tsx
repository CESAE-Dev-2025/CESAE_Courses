import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { withAuth, refreshToken, clearToken } from '../api/auth';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const res = await apiFetch(`${SERVER_URL}/admin/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Senha alterada com sucesso!');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error || 'Erro ao alterar senha');
      }
    } catch (err) {
      setError('Erro de conexão');
    }
  }

  return (
    <>
      <div className="container position-relative">
        <h1 className="mt-5 text-center">Alterar Senha</h1>
        <button className="btn btn-outline-primary my-5" onClick={() => navigate('/admin')}>
          Voltar ao Dashboard
        </button>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleChangePassword} className="card p-4">
              <div className="mb-3">
                <label className="form-label">Nova Senha</label>
                <input
                  type="password"
                  className="form-label form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Nova Senha</label>
                <input
                  type="password"
                  className="form-label form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Alterar Senha
              </button>
              {message && <div className="alert alert-success mt-3">{message}</div>}
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
