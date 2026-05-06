import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (email === 'admin@admin.com' && password === '123456') {
      navigate('/home');
    } else {
      alert('Email ou senha inválidos');
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}