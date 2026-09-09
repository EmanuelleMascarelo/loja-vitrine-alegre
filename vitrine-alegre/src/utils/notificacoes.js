import { toast } from 'react-hot-toast';

export const notificar = {
  sucesso: (mensagem) => {
    toast.success(mensagem, {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: '#232A60',
        color: '#fff',
        fontWeight: '500',
        padding: '12px 16px',
        fontSize: '0.95rem',
      },
    });
  },

  erro: (mensagem) => {
    toast.error(mensagem, {
      icon: '❌',
      style: {
        borderRadius: '10px',
        background: '#C2410C',
        color: '#fff',
        fontWeight: '500',
        padding: '12px 16px',
        fontSize: '0.95rem',
      },
    });
  },

  info: (mensagem) => {
    toast(mensagem, {
      icon: 'ℹ️',
      style: {
        borderRadius: '10px',
        background: '#232A60',
        color: '#fff',
        fontWeight: '500',
        padding: '12px 16px',
        fontSize: '0.95rem',
      },
    });
  },
};