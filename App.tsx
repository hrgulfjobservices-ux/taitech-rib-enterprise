
import React, { useState, useEffect } from 'react';
import { AppView, Candidate, UserRole, SystemLog, Client, Agent, JobOrder, SystemUser, RestorePoint, PaymentOut, SystemConfig, Transaction, UserPreferences, MasterKnowledge, DynamicComponent, WindowInstance } from './types';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import NeuralAdvisor from './components/NeuralAdvisor';
import Dashboard from './components/Dashboard';
import CandidateRegistration from './components/CandidateRegistration';
import CandidateDataBank from './components/CandidateDataBank';
import FinanceModule from './components/FinanceModule';
import SecurityCenter from './components/SecurityCenter';
import AIBrain from './components/AIBrain';
import ClientModule from './components/ClientModule';
import AgentModule from './components/AgentModule';
import JobModule from './components/JobModule';
import UserManagement from './components/UserManagement';
import SystemBlueprint from './components/SystemBlueprint';
import MasterKnowledgeModule from './components/MasterKnowledge';
import SystemSettings from './components/SystemSettings';
import WelcomeScreen from './components/WelcomeScreen';
import SessionRecap from './components/SessionRecap';
import PersonalizationPanel from './components/PersonalizationPanel';
import AccountEngine from './components/AccountEngine';
import IManager from './components/iManager';
import GmailClient from './components/GmailClient';
import OfficeSuite from './components/OfficeSuite';
import SystemUpdate from './components/SystemUpdate';
import AboutSystem from './components/AboutSystem';
import AppLauncher from './components/AppLauncher';
import KanbanBoard from './components/KanbanBoard';
import WorkflowBuilder from './components/WorkflowBuilder';
import ReportStudio from './components/ReportStudio';
import WindowFrame from './components/WindowFrame';
import LinkManager from './components/LinkManager';
import InterviewAnalyzer from './components/InterviewAnalyzer';
import CommLink from './components/CommLink';
import NeuralLegacyEngine from './components/NeuralLegacyEngine';
import DevPrompt from './components/DevPrompt';

import { Layers } from 'lucide-react';

const App: React.FC = () => {
  // 1. Users
  const [users, setUsers] = useState<SystemUser[]>(() => {
    const saved = localStorage.getItem('taitech_users');
    return saved ? JSON.parse(saved) : [{
        id: 'MD-01', username: 'Mehdi Bhai', role: UserRole.MANAGING_DIRECTOR, designation: 'Managing Director',
        joiningDate: '2024-01-01', salary: 'NA', disciplineScore: 100, violationCount: 0,
        trainingCompleted: true, status: 'Active', permissions: { canEdit: true, canDelete: true, allowedViews: Object.values(AppView) }, lastLogin: 'Never',
        preferences: {
            wallpaper: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
            themeColor: 'cyan',
            cultureType: 'Muslim',
            fontSize: 'md',
            language: 'English',
            reduceMotion: false,
            iconSize: 'md',
            showIconLabels: true,
            widgetOpacity: 0.95
        }
    }];
  });

  // 2. Current User Session
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(() => {
    const saved = localStorage.getItem('taitech_session');
    return saved ? JSON.parse(saved) : null;
  });

  // 3. System State
  const [booting, setBooting] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [selectedLoginUser, setSelectedLoginUser] = useState<SystemUser | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 4. TITAN WINDOW ENGINE STATE
  const [windows, setWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(100);

  // 5. Data Modules
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('taitech_config');
    return saved ? JSON.parse(saved) : {
      autoIdGeneration: true,
      hardLockCompliance: true,
      whatsappIntegration: true,
      aiOcrPower: true,
      neuralMatching: true,
      disciplineWarnings: true,
      manualPositionOverride: true,
      autoMobilization: true,
      autonomousSelfRepair: true,
      developerMode: false,
      dynamicComponents: [],
      programPermissions: {},
      networkConfig: { serverIp: '', isHost: false, lastSync: '' }
    };
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => JSON.parse(localStorage.getItem('taitech_candidates') || '[]'));
  const [clients, setClients] = useState<Client[]>(() => JSON.parse(localStorage.getItem('taitech_clients') || '[]'));
  const [agents, setAgents] = useState<Agent[]>(() => JSON.parse(localStorage.getItem('taitech_agents') || '[]'));
  const [jobs, setJobs] = useState<JobOrder[]>(() => JSON.parse(localStorage.getItem('taitech_jobs') || '[]'));
  const [transactions, setTransactions] = useState<Transaction[]>(() => JSON.parse(localStorage.getItem('taitech_transactions') || '[]'));
  const [logs, setLogs] = useState<SystemLog[]>([]);
  
  // Master Knowledge
  const [knowledge, setKnowledge] = useState<MasterKnowledge>(() => {
    const saved = localStorage.getItem('taitech_knowledge');
    return saved ? JSON.parse(saved) : { 
      trades: ['Mason', 'Plumber', 'Electrician', 'Welder', 'Driver', 'Carpenter', 'Steel Fixer', 'Helper', 'Store Keeper', 'Foreman'], 
      industries: ['Construction', 'Oil & Gas', 'Hospitality', 'Logistics', 'Manufacturing', 'Facility Management'],
      countries: ['Saudi Arabia', 'UAE', 'Qatar', 'Oman', 'Kuwait', 'Bahrain'] 
    };
  });

  // --- BOOT SEQUENCE & RESIZE ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    if (booting) {
        setBootLogs([]);
        const sequence = [
          "ORIAN OS 8 TITAN KERNEL...",
          "INITIALIZING WINDOW MANAGER...",
          "ALLOCATING GPU ACCELERATION...",
          "MOUNTING VIRTUAL DESKTOP...",
          "SYSTEM STATE: HEAVY_DUTY_READY"
        ];
        let i = 0;
        const interval = setInterval(() => {
          setBootLogs(prev => [...prev, sequence[i]]);
          i++;
          if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => setBooting(false), 500); 
          }
        }, 150); 
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }
    return () => window.removeEventListener('resize', handleResize);
  }, [booting]);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('taitech_candidates', JSON.stringify(candidates));
    localStorage.setItem('taitech_clients', JSON.stringify(clients));
    localStorage.setItem('taitech_agents', JSON.stringify(agents));
    localStorage.setItem('taitech_jobs', JSON.stringify(jobs));
    localStorage.setItem('taitech_transactions', JSON.stringify(transactions));
    localStorage.setItem('taitech_config', JSON.stringify(config));
    localStorage.setItem('taitech_users', JSON.stringify(users));
    localStorage.setItem('taitech_knowledge', JSON.stringify(knowledge));
  }, [candidates, clients, agents, jobs, transactions, config, users, knowledge]);

  // Wrappers
  const updateCandidates = (newData: Candidate[]) => { setCandidates(newData); };
  const updateClients = (newData: Client[]) => { setClients(newData); };
  const updateAgents = (newData: Agent[]) => { setAgents(newData); };
  const updateJobs = (newData: JobOrder[]) => { setJobs(newData); };
  const updateTransactions = (newData: Transaction[]) => { setTransactions(newData); };

  // --- WINDOW MANAGER LOGIC ---
  const openWindow = (view: AppView, title: string) => {
    if (isMobile) setSidebarOpen(false); // Close sidebar on mobile when opening app

    // Check if already open
    const existing = windows.find(w => w.view === view);
    if (existing) {
        if(existing.isMinimized) {
            updateWindow(existing.id, { isMinimized: false, zIndex: nextZIndex });
        } else {
            updateWindow(existing.id, { zIndex: nextZIndex });
        }
        setNextZIndex(prev => prev + 1);
        setActiveWindowId(existing.id);
        return;
    }

    const newWindow: WindowInstance = {
        id: `WIN-${Date.now()}`,
        view,
        title,
        x: isMobile ? 0 : 50 + (windows.length * 30),
        y: isMobile ? 0 : 50 + (windows.length * 30),
        width: isMobile ? window.innerWidth : 1000,
        height: isMobile ? window.innerHeight - 80 : 700,
        zIndex: nextZIndex,
        isMinimized: false,
        isMaximized: isMobile // Auto maximize on mobile
    };
    
    setWindows([...windows, newWindow]);
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex } : w));
    setNextZIndex(prev => prev + 1);
    setActiveWindowId(id);
  };

  const updateWindow = (id: string, updates: Partial<WindowInstance>) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const toggleMinimize = (id: string) => {
      const win = windows.find(w => w.id === id);
      if (win) {
          updateWindow(id, { isMinimized: !win.isMinimized });
          if (win.isMinimized) focusWindow(id); // If unminimizing, focus it
      }
  };

  const toggleMaximize = (id: string) => {
      if (isMobile) return; // Disable un-maximize on mobile
      const win = windows.find(w => w.id === id);
      if(win) updateWindow(id, { isMaximized: !win.isMaximized });
  };

  const handleLogin = (user: SystemUser) => {
    setCurrentUser(user);
    localStorage.setItem('taitech_session', JSON.stringify(user));
    if (!sessionStorage.getItem('taitech_welcome_shown')) {
        setShowWelcome(true);
        sessionStorage.setItem('taitech_welcome_shown', 'true');
    }
    setSelectedLoginUser(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('taitech_session');
    setBooting(false); 
    setSelectedLoginUser(null);
    setWindows([]);
  };

  const updatePreferences = (prefs: UserPreferences) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, preferences: prefs };
      setCurrentUser(updatedUser);
      setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  const triggerBootSequence = () => setBooting(true);

  const legacyPayments: PaymentOut[] = transactions
    .filter(t => t.type === 'DEBIT')
    .map(t => ({
      id: t.id,
      candidateId: t.relatedEntityId || '',
      amount: t.amount,
      purpose: t.category as any,
      date: t.date,
      status: 'Paid'
    }));

  const renderModule = (view: AppView) => {
    switch (view) {
      case AppView.DASHBOARD: 
        return <Dashboard candidates={candidates} logs={logs} users={users} jobs={jobs} payments={legacyPayments} onNavigate={(v) => openWindow(v, v.toString())} clients={clients} config={config} currentUser={currentUser!} onUpdateConfig={setConfig} />;
      case AppView.REGISTRATION: 
        return <CandidateRegistration candidates={candidates} jobs={jobs} agents={agents} onAdd={(c) => updateCandidates([...candidates, c])} onViolation={() => {}} config={config} knowledge={knowledge} onOpenCandidate={(id) => openWindow(AppView.DATA_BANK, 'Data Bank')} />;
      case AppView.DATA_BANK: 
        return <CandidateDataBank candidates={candidates} jobs={jobs} onUpdate={(c) => updateCandidates(candidates.map(x => x.passportNo === c.passportNo ? c : x))} onDelete={(id) => updateCandidates(candidates.filter(c => c.id !== id))} config={config} onUpdateConfig={setConfig} currentUser={currentUser!} knowledge={knowledge} />;
      case AppView.USER_MGMT: 
        return <UserManagement users={users} onAdd={(u) => setUsers([...users, u])} onUpdate={(u) => setUsers(users.map(x => x.id === u.id ? u : x))} onDelete={(id) => setUsers(users.filter(u => u.id !== id))} />;
      case AppView.CLIENTS: 
        return <ClientModule clients={clients} onAdd={(c) => updateClients([...clients, c])} onUpdate={(c) => updateClients(clients.map(x => x.id === c.id ? c : x))} onDelete={(id) => updateClients(clients.filter(c => c.id !== id))} config={config} currentUser={currentUser!} />;
      case AppView.JOBS: 
        return <JobModule jobs={jobs} clients={clients} onAdd={(j) => updateJobs([...jobs, j])} onDelete={(id) => updateJobs(jobs.filter(j => j.id !== id))} />;
      case AppView.AGENTS: 
        return <AgentModule agents={agents} onAdd={(a) => updateAgents([...agents, a])} onDelete={(id) => updateAgents(agents.filter(a => a.id !== id))} candidates={candidates} currentUser={currentUser!} onUpdate={(a) => updateAgents(agents.map(x => x.id === a.id ? a : x))} />;
      case AppView.SYSTEM_SETTINGS: 
        return <SystemSettings config={config} onUpdate={setConfig} clients={clients} onUpdateClients={updateClients} />;
      case AppView.BLUEPRINT: return <SystemBlueprint />;
      case AppView.KNOWLEDGE_BASE: 
        return <MasterKnowledgeModule knowledge={knowledge} onUpdate={setKnowledge} candidates={candidates} />;
      case AppView.FINANCE: 
        return <FinanceModule transactions={transactions} candidates={candidates} agents={agents} staff={users} clients={clients} onAddTransaction={(t) => updateTransactions([...transactions, t])} currentUser={currentUser!} />;
      case AppView.AI_BRAIN: return <AIBrain candidates={candidates} logs={logs} />;
      case AppView.SECURITY: return <SecurityCenter logs={logs} restorePoints={[]} onCreateRestore={()=>{}} />;
      case AppView.PERSONALIZATION: return <PersonalizationPanel user={currentUser!} onUpdatePreferences={updatePreferences} />;
      case AppView.CA_PORTAL: return <AccountEngine transactions={transactions} logs={logs} jobs={jobs} />;
      case AppView.IMANAGER: return <IManager />;
      case AppView.MAIL_CLIENT: return <GmailClient />;
      case AppView.OFFICE_SUITE: return <OfficeSuite />;
      case AppView.SYSTEM_UPDATE: return <SystemUpdate />;
      case AppView.ABOUT_SYSTEM: return <AboutSystem />;
      case AppView.KANBAN_COMMAND: return <KanbanBoard candidates={candidates} onUpdateStatus={(id, status) => updateCandidates(candidates.map(c => c.id === id ? { ...c, status } : c))} />;
      case AppView.WORKFLOW_BUILDER: return <WorkflowBuilder />;
      case AppView.REPORT_STUDIO: return <ReportStudio />;
      case AppView.INTERVIEW_ANALYZER: return <InterviewAnalyzer />;
      case AppView.COMMS_LINK: return <CommLink candidates={candidates} />;
      case AppView.LEGACY_ENGINE: return <NeuralLegacyEngine currentUser={currentUser!} />;
      default: return <div className="p-20 text-center text-slate-500 font-black">MODULE LOADING...</div>;
    }
  };

  if (booting) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center font-orian text-indigo-500 p-8">
        <div className="w-24 h-24 mb-8 relative">
           <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin-slow"></div>
           <div className="absolute inset-4 border-b-4 border-emerald-500 rounded-full animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
           <div className="absolute inset-0 flex items-center justify-center font-black text-4xl tracking-tighter text-white">8</div>
        </div>
        <div className="w-full max-w-md space-y-1">
           {bootLogs.map((log, i) => (
             <p key={i} className="text-xs uppercase tracking-widest font-bold animate-in slide-in-from-left-4 fade-in duration-150">
               <span className="text-slate-600 mr-2">root@titan:~#</span> <span className="text-emerald-400">{log}</span>
             </p>
           ))}
        </div>
      </div>
    );
  }

  if (currentUser && showWelcome) {
      return <WelcomeScreen user={currentUser} onComplete={() => setShowWelcome(false)} />;
  }

  if (!currentUser) {
    const bgImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop';
    return (
      <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out bg-black font-orian">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 grayscale" style={{ backgroundImage: `url(${bgImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

        <div className="relative z-10 w-full max-w-md">
           {!selectedLoginUser ? (
               <div className="bg-black border border-indigo-900/50 rounded-none p-10 shadow-[0_0_50px_rgba(79,70,229,0.1)] animate-in zoom-in-95 duration-300">
                  <div className="text-center mb-10">
                      <div className="w-16 h-16 bg-indigo-900/20 border border-indigo-500 flex items-center justify-center text-3xl font-black mx-auto mb-6 text-white clip-path-polygon">T</div>
                      <h1 className="text-4xl font-black text-white uppercase tracking-tighter">ORIAN OS 8</h1>
                      <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em] mt-2 border-t border-emerald-900/50 pt-2 inline-block">Titan Enterprise Edition</p>
                  </div>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                     {users.map(u => (
                       <button 
                         key={u.id}
                         onClick={() => setSelectedLoginUser(u)}
                         className="w-full p-4 bg-white/5 border border-white/5 hover:bg-indigo-900/30 hover:border-indigo-500/50 transition-all flex items-center gap-4 group text-left"
                       >
                          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
                             {u.username[0]}
                          </div>
                          <div>
                             <p className="font-bold text-white text-sm uppercase tracking-wide">{u.username}</p>
                             <p className="text-[9px] font-bold text-slate-500 uppercase">{u.role} :: {u.id}</p>
                          </div>
                       </button>
                     ))}
                  </div>
               </div>
           ) : (
               <div className="bg-black border border-indigo-500 rounded-none p-10 shadow-[0_0_100px_rgba(79,70,229,0.2)] animate-in slide-in-from-right-10 duration-200">
                  <div className="text-center mb-8">
                      <h2 className="text-xl font-bold text-white uppercase tracking-widest border-b-2 border-indigo-600 pb-2 inline-block">{selectedLoginUser.username}</h2>
                      <p className="text-[10px] text-emerald-500 font-mono mt-2">SECURE_CHANNEL_OPEN</p>
                  </div>
                  <div className="space-y-6">
                      <input 
                        type="password"
                        placeholder="ACCESS KEY" 
                        className="w-full bg-black border-2 border-slate-800 focus:border-indigo-500 px-6 py-4 text-white font-mono text-center tracking-[0.5em] outline-none transition-all"
                      />
                      <div className="flex gap-3">
                          <button onClick={() => setSelectedLoginUser(null)} className="flex-1 py-4 bg-slate-900 border border-slate-800 text-slate-400 font-bold uppercase text-xs hover:text-white">Abort</button>
                          <button onClick={() => handleLogin(selectedLoginUser)} className="flex-[2] py-4 bg-indigo-700 text-white font-black uppercase text-xs tracking-widest hover:bg-indigo-600 transition-all">
                              Initialize Session
                          </button>
                      </div>
                  </div>
               </div>
           )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden font-orian bg-[#050505] text-slate-200">
      <Sidebar 
        onOpenWindow={openWindow} 
        role={currentUser.role} 
        onLogout={handleLogout} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      <main className="flex-1 relative h-full overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        <div className="absolute inset-0 z-10 pb-20 md:pb-0">
           {windows.length === 0 && (
              <div className="h-full w-full flex items-center justify-center p-8 md:p-20 animate-in fade-in duration-1000">
                 <AppLauncher onOpen={openWindow} preferences={currentUser.preferences} />
              </div>
           )}
           {windows.map(win => (
              <WindowFrame 
                key={win.id}
                window={win}
                active={activeWindowId === win.id}
                onFocus={focusWindow}
                onClose={closeWindow}
                onMinimize={toggleMinimize}
                onMaximize={toggleMaximize}
                onUpdate={updateWindow}
                isMobile={isMobile}
              >
                 {renderModule(win.view)}
              </WindowFrame>
           ))}
        </div>

        {!isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all hover:scale-105">
            {windows.map(win => (
                <button 
                    key={win.id}
                    onClick={() => {
                        if (win.isMinimized) toggleMinimize(win.id);
                        else focusWindow(win.id);
                    }}
                    className={`
                    w-10 h-10 flex items-center justify-center rounded-xl transition-all relative group
                    ${activeWindowId === win.id && !win.isMinimized ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}
                    `}
                    title={win.title}
                >
                    <Layers size={18} />
                    {win.isMinimized && <span className="absolute -top-1 -right-1 w-2 h-2 bg-slate-500 rounded-full border border-black"></span>}
                    <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none uppercase tracking-widest">{win.title}</span>
                </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <div className="px-4 flex flex-col items-end justify-center">
                <span className="text-[10px] font-black text-white">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span className="text-[8px] font-bold text-emerald-400 uppercase">SYS: ONLINE</span>
            </div>
            </div>
        )}

        <NeuralAdvisor 
            currentUser={currentUser} 
            contextData={{ candidates, jobs, logs, transactions }} 
            onReboot={triggerBootSequence} 
            onNavigate={openWindow}
        />
        {!isMobile && <SessionRecap logs={logs} username={currentUser.username} />}
      </main>

      {isMobile && (
          <MobileNav 
            activeView={activeWindowId ? windows.find(w => w.id === activeWindowId)?.view || AppView.DASHBOARD : AppView.DASHBOARD}
            setView={(view) => openWindow(view, view.toString())}
            onMenuClick={() => setSidebarOpen(true)}
          />
      )}
    </div>
  );
};

export default App;
