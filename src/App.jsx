import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Info, 
  Flag, 
  Tent, 
  Upload,
  Phone,
  BookOpen,
  Calculator,
  Laptop,
  Globe,
  Palette,
  Home,
  Waves,
  Sparkles,
  Trash2,
  Copy,
  Check
} from 'lucide-react';

// DATA 100% SESUAI RKP PEKAN XI (5-9 APRIL 2026)
const DEFAULT_DATA = {
  pekan: "XI (5 - 9 April 2026)",
  hari: {
    "Senin": [
      { jam: "07:00 - 07:10", mapel: "Ikrar & Shalat Dhuha", type: "faith" },
      { jam: "07:10 - 07:40", mapel: "Literasi Kelas", type: "book" },
      { jam: "07:40 - 09:10", mapel: "PAI (Pembahasan Sumatif) & English Zone", highlight: true },
      { jam: "09:30 - 10:30", mapel: "Tahsin & Tahfidz Al-Qur'an", type: "book" },
      { jam: "10:30 - 11:30", mapel: "Matematika (Diagram Gambar)", type: "math" },
      { jam: "11:30 - 12:00", mapel: "PBP (Masalah Sosial & Solusi)", type: "faith" },
      { jam: "13:00 - 14:00", mapel: "TIK (Etika Komunikasi Digital)", type: "laptop" }
    ],
    "Selasa": [
      { jam: "07:00 - 07:40", mapel: "Ikrar, Shalat Dhuha & Literasi", type: "faith" },
      { jam: "07:40 - 09:10", mapel: "B. Indonesia (Watak Tokoh) & B. Inggris", type: "book" },
      { jam: "09:30 - 10:30", mapel: "Tahsin & Tahfidz Al-Qur'an", type: "book" },
      { jam: "10:30 - 11:30", mapel: "Library: Games Fakta & Opini", type: "palette" },
      { jam: "11:30 - 12:00", mapel: "IPAS (Tradisi & Budaya Indonesia)", type: "globe" },
      { jam: "13:00 - 14:00", mapel: "Pend. Pancasila (Pertemuan 7)", type: "faith" }
    ],
    "Rabu": [
      { jam: "07:00 - 07:40", mapel: "Ikrar, Shalat Dhuha & Literasi", type: "faith" },
      { jam: "07:40 - 09:10", mapel: "Pramuka (Games) & B. Inggris", special: "pramuka" },
      { jam: "09:30 - 10:30", mapel: "Tahsin & Tahfidz Al-Qur'an", type: "book" },
      { jam: "10:30 - 11:30", mapel: "Matematika (Review Materi)", type: "math" },
      { jam: "11:30 - 12:00", mapel: "B. Indonesia (Membandingkan Tokoh)", type: "book" },
      { jam: "13:00 - 14:00", mapel: "Seni Rupa (Membuat Jadwal Harian)", type: "palette" }
    ],
    "Kamis": [
      { jam: "07:00 - 07:40", mapel: "Ikrar, Shalat Dhuha & Literasi", type: "faith" },
      { jam: "07:40 - 09:10", mapel: "PJOK: Renang (Putra) / Olahraga (Putri)", special: "renang" },
      { jam: "09:30 - 10:30", mapel: "Tahsin & Tahfidz Al-Qur'an", type: "book" },
      { jam: "10:30 - 11:30", mapel: "B. Indonesia (Fakta & Opini)", type: "book" },
      { jam: "11:30 - 12:00", mapel: "Science (Natural Resources)", type: "globe" },
      { jam: "13:00 - 14:00", mapel: "PLBJ (Rumah Sehat)", type: "home" }
    ],
    "Jumat": [
      { jam: "07:00 - 07:20", mapel: "Shalat Dhuha", type: "faith" },
      { jam: "07:20 - 07:40", mapel: "Kajian Islam", type: "faith" },
      { jam: "07:40 - 09:00", mapel: "Seni & Budaya (Teori Karya Seni)", type: "palette" },
      { jam: "09:30 - 10:30", mapel: "Tahsin & Tahfidz Al-Qur'an", type: "book" },
      { jam: "10:30 - 11:00", mapel: "Matematika (Diagram Batang)", type: "math" },
      { jam: "11:00 - 11:30", mapel: "Bahasa Arab (Pelajaran 12)", type: "book" },
      { jam: "11:30 - 12:00", mapel: "Lunch Time / Beres-beres", type: "home" },
      { jam: "12.00 - 13.00", mapel: "Keputrian / Shalat Jumat / Pulang", highlight: true }
    ]
  }
};

const IconWrapper = ({ type, special }) => {
  if (special === 'renang') return <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl"><Waves size={22} /></div>;
  if (special === 'pramuka') return <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl"><Tent size={22} /></div>;
  
  switch(type) {
    case 'faith': return <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl"><Sparkles size={22} /></div>;
    case 'book': return <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl"><BookOpen size={22} /></div>;
    case 'math': return <div className="p-3 bg-sky-100 text-sky-700 rounded-2xl"><Calculator size={22} /></div>;
    case 'laptop': return <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl"><Laptop size={22} /></div>;
    case 'globe': return <div className="p-3 bg-sky-50 text-sky-700 rounded-2xl"><Globe size={22} /></div>;
    case 'palette': return <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl"><Palette size={22} /></div>;
    case 'home': return <div className="p-3 bg-slate-100 text-slate-700 rounded-2xl"><Home size={22} /></div>;
    default: return <div className="p-3 bg-slate-100 text-slate-500 rounded-2xl"><Clock size={22} /></div>;
  }
};

export default function App() {
  const STORAGE_KEY = 'al_bayan_schedule_v3';
  const [schedule, setSchedule] = useState(DEFAULT_DATA);
  const [currentDay, setCurrentDay] = useState("Senin");
  const [showImport, setShowImport] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setSchedule(JSON.parse(savedData));
      } catch (e) {
        console.error("Gagal restore data!");
      }
    }
  }, []);

  const handleImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.pekan && parsed.hari) {
        setSchedule(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        setShowImport(false);
        setJsonInput("");
      } else {
        alert("Format JSON ngaco!");
      }
    } catch (e) {
      alert("Error JSON!");
    }
  };

  const copyCurrentData = () => {
    const dataString = JSON.stringify(schedule);
    navigator.clipboard.writeText(dataString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetData = () => {
    if(confirm("Yakin mau balikin ke data awal Pekan XI?")) {
      setSchedule(DEFAULT_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    }
  };

  const days = Object.keys(schedule.hari);

  return (
    <div className="relative min-h-screen bg-[#F7F9FB] text-slate-900 font-sans pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-100/60 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-28 w-72 h-72 bg-sky-100/70 rounded-full blur-3xl" />
      </div>
      <header className="bg-emerald-600 pt-10 pb-20 px-6 rounded-b-[40px] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Al-Bayan</h1>
            <p className="text-emerald-100 font-semibold mt-1 uppercase text-xs tracking-wider">Pekan {schedule.pekan}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={copyCurrentData} 
              title="Salin JSON Jadwal"
              className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all shadow-inner text-white"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
            <button 
              onClick={resetData} 
              title="Reset ke Default"
              className="bg-white/10 hover:bg-red-500 p-3 rounded-2xl transition-all shadow-inner text-white"
            >
              <Trash2 size={20} />
            </button>
            <button 
              onClick={() => setShowImport(true)} 
              title="Import Jadwal Baru"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-2xl backdrop-blur-md transition-all shadow-inner text-white"
            >
              <Upload size={20} />
            </button>
          </div>
        </div>

        <nav className="mt-8 flex gap-3 overflow-x-auto no-scrollbar pb-2 relative z-10">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={`px-6 py-3 rounded-2xl font-extrabold transition-all whitespace-nowrap text-sm ${
                currentDay === day 
                ? "bg-white text-emerald-700 shadow-lg scale-[1.03]" 
                : "bg-emerald-500/35 text-emerald-50"
              }`}
            >
              {day}
            </button>
          ))}
        </nav>
      </header>

      <div className="px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[28px] p-6 shadow-md border border-slate-100 flex justify-around items-center">
          <div className="text-center">
            <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-2xl mb-1.5 transition-colors ${currentDay === 'Senin' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-300'}`}>
              <Flag size={22} />
            </div>
            <p className="text-xs font-extrabold text-slate-400 tracking-tight uppercase">Upacara</p>
          </div>
          <div className="text-center">
            <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-2xl mb-1.5 transition-colors ${currentDay === 'Kamis' ? 'bg-blue-50 text-blue-500' : 'bg-slate-50 text-slate-300'}`}>
              <Waves size={22} />
            </div>
            <p className="text-xs font-extrabold text-slate-400 tracking-tight uppercase">Renang</p>
          </div>
          <div className="text-center">
            <div className={`mx-auto w-12 h-12 flex items-center justify-center rounded-2xl mb-1.5 transition-colors ${currentDay === 'Rabu' ? 'bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-300'}`}>
              <Tent size={22} />
            </div>
            <p className="text-xs font-extrabold text-slate-400 tracking-tight uppercase">Pramuka</p>
          </div>
        </div>
      </div>

      <main className="p-6 pt-7">
        <div className="flex items-center gap-2 mb-7 ml-1">
          <div className="h-6 w-1 bg-emerald-500 rounded-full" />
          <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">Jadwal {currentDay}</h2>
        </div>

        <div className="space-y-5">
          {schedule.hari[currentDay]?.map((item, index) => (
            <div 
              key={index}
              className={`p-5 rounded-[24px] border flex items-center gap-4 transition-all active:scale-[0.99] ${
                item.highlight ? "bg-emerald-50 border-emerald-200 ring-1 ring-emerald-200 shadow-sm" : "bg-white border-slate-200"
              }`}
            >
              <IconWrapper type={item.type} special={item.special} />
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-tight">{item.jam}</span>
                </div>
                <h3 className={`font-semibold text-[15px] leading-snug ${item.highlight ? 'text-emerald-950' : 'text-slate-700'}`}>
                  {item.mapel}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      <a 
        href="https://wa.me/628123456789"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-7 right-7 bg-green-500/95 text-white w-14 h-14 rounded-[20px] shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50"
      >
        <Phone size={24} />
      </a>

      {showImport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            <h2 className="text-2xl font-black mb-2 tracking-tight text-slate-800">Update Jadwal</h2>
            <p className="text-slate-500 text-sm mb-4">Paste JSON mingguan dari Gemini di bawah ini untuk memperbarui jadwal.</p>
            <textarea 
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste JSON dari Gemini di sini...'
              className="w-full h-48 bg-slate-50 border-2 border-slate-100 rounded-[24px] p-5 focus:border-emerald-500 outline-none text-xs font-mono mb-6 transition-all"
            />
            <div className="flex gap-4">
              <button onClick={() => setShowImport(false)} className="flex-1 py-4 font-black text-slate-400 uppercase tracking-widest text-xs">Batal</button>
              <button onClick={handleImport} className="flex-[2] py-4 bg-emerald-600 text-white font-black rounded-[20px] shadow-lg uppercase tracking-widest text-xs">Update Sekarang</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
