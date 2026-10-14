import React, { useState } from 'react';
import { getSupabaseClient } from '../../lib/supabase';

interface Props { isOpen: boolean; onAuthenticated: () => void; onCancel: () => void; }

export const AdminAuthModal: React.FC<Props> = ({ isOpen, onAuthenticated, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function signIn(event: React.FormEvent) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');
    const client = getSupabaseClient();
    if (!client) {
      setError('Supabase no está configurado.');
      setLoading(false);
      return;
    }
    try {
      const { data, error: loginError } = await client.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });
      setPassword('');
      if (loginError || !data.user) {
        setError('Correo o contraseña incorrectos. Verificá que la cuenta tenga contraseña configurada.');
        return;
      }
      const { data: admin, error: roleError } = await client
        .from('handheld_admins')
        .select('user_id')
        .eq('user_id', data.user.id)
        .maybeSingle();
      if (roleError || !admin) {
        await client.auth.signOut();
        setError('Esta cuenta no está autorizada como administrador.');
        return;
      }
      onAuthenticated();
    } catch {
      setError('No fue posible verificar el acceso. Intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-5">
    <form onSubmit={signIn} className="w-full max-w-md rounded-2xl border border-white/15 bg-[#101725] text-white p-7 space-y-5">
      <h2 className="text-xl font-semibold">Administración HANDHELD</h2>
      <p className="text-sm text-gray-300">Ingresá con tu correo y contraseña personal de Supabase.</p>
      <label className="block text-sm">Correo electrónico
        <input required type="email" autoComplete="username" value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full bg-black/30 border border-white/20 rounded-lg p-3 mt-2" />
      </label>
      <label className="block text-sm">Contraseña
        <input required type="password" autoComplete="current-password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="block w-full bg-black/30 border border-white/20 rounded-lg p-3 mt-2" />
      </label>
      {error && <p role="alert" className="text-red-300 text-sm">{error}</p>}
      <button disabled={loading} type="submit" className="bg-blue-600 rounded-lg px-5 py-3 w-full disabled:opacity-50">
        {loading ? 'Verificando…' : 'Ingresar'}
      </button>
      <button type="button" onClick={onCancel} className="w-full text-sm text-gray-300">Volver a la tienda</button>
    </form>
  </div>;
};
