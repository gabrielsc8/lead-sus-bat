// src/app/admin/add/AdminForm.tsx (componente CLIENT)
'use client';
import { useState, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import Navbar from '@/app/components/NavBar';

export default function AdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      await axios.post('/api/admins', { name, email, password, role: 'admin' });
      setMessage('✅ Admin criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ error?: string }>;
      console.error(axiosError);
      setMessage(axiosError.response?.data?.error || '❌ Erro ao criar admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-white p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold text-white mb-6 font-['Inter']">Adicionar Administrador</h1>
          {message && (
            <div className={`p-3 mb-4 rounded ${message.startsWith('✅') ? 'bg-green-700' : 'bg-red-700'} text-white`}>
              {message}
            </div>
          )}
          <label className="block mb-2 text-sm text-gray-300">Nome</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <label className="block mb-2 text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <label className="block mb-2 text-sm text-gray-300">Senha</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold rounded-lg transition disabled:opacity-50 bg-cyan-500 text-gray-900 hover:bg-cyan-400"
          >
            {loading ? 'Criando...' : 'Criar Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
