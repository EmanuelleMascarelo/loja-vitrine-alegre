import { Link } from 'react-router-dom';

export default function NaoEncontrado() {
  return (
    <main style={{ textAlign: 'center', padding: '64px 16px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--cor-primaria)', marginBottom: '8px' }}>404</h1>
      <h2 style={{ marginBottom: '16px', color: 'var(--cor-texto)' }}>Página não encontrada</h2>
      <p style={{ color: 'var(--cor-texto-secundario)', marginBottom: '24px', lineHeight: '1.5' }}>
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: 'var(--cor-acao)',
          color: 'var(--cor-primaria-escura)',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
        }}
      >
        Voltar para a página inicial
      </Link>
    </main>
  );
}