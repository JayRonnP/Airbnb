export default function Properties() {
  const mockProperties = [
    { id: 1, name: 'Azure Pool Villa', location: 'Tagaytay, Cavite', status: 'Active', earnings: '₱45,500' },
    { id: 2, name: 'Forest Retreat Cabin', location: 'Baguio, Benguet', status: 'Maintenance', earnings: '₱12,800' },
    { id: 3, name: 'City Loft Studio', location: 'BGC, Taguig', status: 'Active', earnings: '₱28,400' },
  ]

  return (
    <>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Properties</h1>
          <p className="text-gray-500 dark:text-slate-400 mt-1">Manage your listings and view their individual performance.</p>
        </div>
        <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-rose-500/20 active:scale-95 transition-all text-sm">
          + Add Property
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProperties.map(prop => (
          <div key={prop.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col group hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${
                prop.status === 'Active' ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'
              }`}>
                {prop.status}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-rose-500 transition-colors">{prop.name}</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-6">{prop.location}</p>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MTD Earnings</p>
                <p className="font-bold text-gray-900 dark:text-white">{prop.earnings}</p>
              </div>
              <button className="text-rose-500 hover:text-rose-600 text-sm font-semibold">Edit →</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}