import type {FormEvent} from 'react'
import './Login.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {login} from '../api/auth'
import cesaeLogo from "../assets/cesae-digital-logo.svg";
import loginRight from "../assets/login-right.jpeg";

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError(null)
        setIsSubmitting(true)
        try {
            await login(username, password)
            navigate('/admin')
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (

        <div className="container-fluid auth">
            <div className="row">
                <div className="col-12 col-md-6 position-relative vh-100 overflow-hidden">
                    <div className="container px-0 my-0">
                        <a className="navbar-brand text-center d-block pb-5" href="#">
                            <img src={cesaeLogo} alt="Cesae Digital"/>
                        </a>
                        <h2 className="pb-5 m-0">Bem-vindo ao CESAE - Cursos, a área administrativa!</h2>


                        <form onSubmit={handleSubmit}>
                            <div className="form-group pb-5">
                                <label htmlFor="username" className="pb-1">Utilizador*</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={username}
                                    placeholder="Utilizador"
                                    max-length="15"
                                    onChange={(e) => setUsername(e.target.value)}

                                />
                            </div>

                            <div className="form-group pb-32">
                                <label htmlFor="password" className="pb-1">Palavra-passe*</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Palavra-passe"
                                    value={password}

                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit"
                                    className="btn btn-primary w-100 rounded-pill auth-form-btn"
                                    disabled={isSubmitting}>
                                {isSubmitting ? 'Entrando...' : 'Entrar'}
                            </button>

                            {error && (
                                <p className="response">
                                    <code>{error}</code>
                                </p>
                            )}

                        </form>
                    </div>
                </div>
                <div className="d-none d-md-block col-6 vh-100 login-right overflow-hidden">
                    <img src={loginRight} alt=""/>
                </div>
            </div>
        </div>

    )
}

export default Login
