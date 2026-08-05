import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Breadcrumb, PageTitle } from '../../components/Common';

export function Profile() {
  const { user, logout, pushToast } = useStore();
  const [name, setName] = useState(user?.name ?? 'Demo User');
  const [email, setEmail] = useState(user?.email ?? 'demo.user@example.com');
  const [phone, setPhone] = useState(user?.phone ?? '9876543210');

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Profile' }]} />
      <PageTitle title="Profile Details" />

      <form onSubmit={(e) => { e.preventDefault(); pushToast('Profile updated', 'success'); }} className="space-y-4 rounded-xl border border-line bg-graphite-800 p-6">
        <div>
          <label className="mb-1 block text-xs text-muted">Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="input w-full" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted">Phone Number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input w-full" />
        </div>
        <button type="submit" className="rounded-lg bg-copper-500 px-5 py-2.5 text-sm font-semibold text-graphite-950 hover:bg-copper-400">Save Changes</button>
      </form>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-line bg-graphite-800 p-5">
        <div>
          <div className="text-sm font-medium">Password</div>
          <div className="text-xs text-muted">Last changed 3 months ago</div>
        </div>
        <button className="rounded-lg border border-line px-4 py-2 text-xs hover:border-copper-500">Change Password</button>
      </div>

      {user && (
        <button onClick={logout} className="mt-6 flex items-center gap-2 text-sm text-danger hover:underline">
          <LogOut size={15} /> Log Out
        </button>
      )}
      {!user && <Link to="/auth/login" className="mt-6 inline-block text-sm text-copper-400 hover:underline">Sign in to sync your profile</Link>}
    </div>
  );
}
