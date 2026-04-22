/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CHARACTERS } from './data/characters';
import { Character, Element } from './types';
import { 
  Share2, 
  Star, 
  Shield, 
  Sword, 
  Sparkles, 
  Zap, 
  Flame, 
  Droplet, 
  Wind, 
  Snowflake, 
  Leaf, 
  Mountain,
  Users,
  Trophy,
  History,
  LayoutGrid,
  MapPin,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const ElementIcon = ({ element, className = "w-4 h-4" }: { element: Element; className?: string }) => {
  switch (element) {
    case 'Pyro': return <Flame className={`${className} text-[#FF4C41]`} />;
    case 'Hydro': return <Droplet className={`${className} text-[#4CC2F1]`} />;
    case 'Anemo': return <Wind className={`${className} text-[#72E2C2]`} />;
    case 'Electro': return <Zap className={`${className} text-[#AF8FE6]`} />;
    case 'Dendro': return (
      <img 
        src="https://static.wikia.nocookie.net/gensin-impact/images/f/f4/Element_Dendro.png/revision/latest/thumbnail/width/360/height/360?cb=20201116063058" 
        alt="Dendro" 
        className={className} 
        referrerPolicy="no-referrer"
      />
    );
    case 'Cryo': return <Snowflake className={`${className} text-[#98D1F7]`} />;
    case 'Geo': return <Mountain className={`${className} text-[#E3B342]`} />;
    default: return null;
  }
};

const AnimatedDendroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a1a0f]">
      {/* Deep gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050c07] via-transparent to-[#102517] opacity-60" />
      
      {/* Radial glow in center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full bg-[radial-gradient(circle,rgba(60,180,100,0.15)_0%,transparent_70%)]" />

      {/* Floating particles (Stars/Sparks) */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#A5C83B]/60 blur-[1px]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: [null, "-20%", "20%"],
            x: [null, "10%", "-10%"],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            filter: "drop-shadow(0 0 4px rgba(165, 200, 59, 0.8))"
          }}
        />
      ))}
      
      {/* Larger soft orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full bg-[#1b4332]/40 blur-[40px]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
          }}
          animate={{
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "10%", "-10%"],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(CHARACTERS[0].id);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedCharacter = CHARACTERS.find(c => c.id === selectedId) || CHARACTERS[0];
  const portraitUrl = customImages[selectedId] || selectedCharacter.portraitUrl;

  const handleUpdateImage = () => {
    const newUrl = prompt("Enter new Image URL for " + selectedCharacter.name + ":", portraitUrl);
    if (newUrl) {
      setCustomImages(prev => ({ ...prev, [selectedId]: newUrl }));
    }
  };

  const navigateCharacter = (direction: 'prev' | 'next') => {
    const currentIndex = CHARACTERS.findIndex(c => c.id === selectedId);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % CHARACTERS.length;
    } else {
      nextIndex = (currentIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
    }
    const nextId = CHARACTERS[nextIndex].id;
    setSelectedId(nextId);

    // Sync scroll position
    if (scrollRef.current) {
      const container = scrollRef.current;
      const buttons = container.querySelectorAll('button');
      const targetButton = buttons[nextIndex] as HTMLElement;
      if (targetButton) {
        container.scrollTo({
          left: targetButton.offsetLeft - container.offsetWidth / 2 + targetButton.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050608] text-[#e1e1e1] flex flex-col font-sans">
      {/* HoYoLAB Top Header */}
      <header className="bg-[#111318] border-b border-white/5 px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4D80F0] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#4D80F0]">HoYoLAB</span>
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#" className="text-[#4D80F0] font-bold">Battle Chronicle</a>
            <a href="#" className="hover:text-[#4D80F0] transition-colors">Tools</a>
            <a href="#" className="hover:text-[#4D80F0] transition-colors">Guides</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
           <p className="text-xs font-bold text-white/60">Traveler_9527</p>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col max-w-[1100px] mx-auto w-full p-4 lg:p-8">
        
        {/* TOP Character Selector - Horizontal Row of Small Circles */}
        <div className="relative mb-6 flex items-center group">
           <button 
             onClick={() => navigateCharacter('prev')}
             className="absolute left-0 z-10 p-1.5 bg-[#1b1e23] shadow-lg rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
           >
             <ChevronLeft className="w-4 h-4 text-white" />
           </button>

           <div 
             ref={scrollRef}
             className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth items-center px-10 py-2 w-full"
           >
              {CHARACTERS.map((char) => (
                <button
                  key={char.id}
                  onClick={() => setSelectedId(char.id)}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 group/item transition-all"
                >
                  <div className={`
                    w-12 h-12 rounded-full transition-all duration-300 p-[2px]
                    ${selectedId === char.id ? 'bg-[#4D80F0] shadow-[0_4px_12px_rgba(77,128,240,0.4)] scale-110' : 'bg-transparent hover:scale-105'}
                  `}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#161a21] bg-[#1b1e23]">
                       <img src={char.iconUrl} alt="" className={`w-full h-full object-cover ${selectedId !== char.id ? 'opacity-40 grayscale-[0.5]' : ''}`} referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold tracking-tight transition-colors ${selectedId === char.id ? 'text-[#4D80F0]' : 'text-white/40'}`}>
                    {char.name}
                  </span>
                </button>
              ))}
           </div>

           <button 
             onClick={() => navigateCharacter('next')}
             className="absolute right-0 z-10 p-1.5 bg-[#1b1e23] shadow-lg rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
           >
             <ChevronRight className="w-4 h-4 text-white" />
           </button>
        </div>

        {/* Showcase Dashboard */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCharacter.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Primary Profile Card */}
              <div className="bg-[#111318] rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-white/5 relative overflow-hidden">
                {/* Background Character Art (Faded) */}
                <div className="absolute right-0 top-0 h-full w-2/3 pointer-events-none opacity-[0.07] select-none scale-125 translate-x-12 translate-y-12 transition-all">
                   <img 
                    src={portraitUrl} 
                    alt="" 
                    className={`w-full h-full ${selectedCharacter.id === 'collei' ? 'object-cover object-center' : 'object-contain object-right'}`} 
                    referrerPolicy="no-referrer" 
                   />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-6">
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                          <ElementIcon element={selectedCharacter.element} className="w-8 h-8" />
                       </div>
                        <div>
                          <h1 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                            {selectedCharacter.name}
                            <button 
                              onClick={handleUpdateImage}
                              className="p-1.5 bg-white/5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                              title="Replace Character Image"
                            >
                              <Camera className="w-3.5 h-3.5" />
                            </button>
                          </h1>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="flex">
                                {[...Array(selectedCharacter.rarity)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                ))}
                             </div>
                             <span className="text-xs font-medium text-white/40">• {selectedCharacter.title}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <div className="bg-white/5 px-6 py-3 rounded-2xl flex items-center gap-3 border border-white/5">
                          <MapPin className="w-4 h-4 text-[#4D80F0]" />
                          <div>
                             <p className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Affiliation</p>
                             <p className="text-sm font-bold text-white leading-none">{selectedCharacter.affiliation}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Character Visual Side */}
                    <div className="relative aspect-[1/1] lg:aspect-[4/5] max-h-[500px] rounded-3xl overflow-hidden shadow-inner flex items-center justify-center group border border-white/5">
                       {/* Custom animated background for Dendro characters */}
                       <AnimatedDendroBackground />
                       
                       <img 
                          src={portraitUrl} 
                          alt="" 
                          className={`w-full h-full ${
                            selectedCharacter.id === 'collei' ? 'object-cover object-center scale-[1]' : 
                            selectedCharacter.id === 'yaoyao' ? 'object-contain scale-[0.9]' :
                            'object-contain scale-[1.15]'
                          } filter transition-transform duration-700 group-hover:scale-[1.25] relative z-10`}
                          referrerPolicy="no-referrer"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-20" />
                    </div>

                    {/* Story & Lore Details Side */}
                    <div className="space-y-8 flex flex-col justify-center">
                       <div className="space-y-6">
                          <div className="flex items-center gap-2 text-[#4D80F0]">
                             <History className="w-5 h-5" />
                             <h3 className="text-lg font-bold tracking-tight">Character Story</h3>
                          </div>
                          
                          <div className="relative">
                             <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#4D80F0]/50 to-transparent" />
                             <p className="text-lg text-white/80 leading-relaxed font-light italic">
                               "{selectedCharacter.description}"
                             </p>
                          </div>

                          <div className="space-y-4 pt-4">
                             <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                                <h4 className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em] mb-3">Lore Snippet</h4>
                                <p className="text-sm text-white/60 leading-relaxed">
                                   As a prominent figure in {selectedCharacter.affiliation}, {selectedCharacter.name} has played a pivotal role in the region's recent history. Known as the "{selectedCharacter.title}", their presence is both respected and feared by those who understand the true weight of their power.
                                </p>
                             </div>
                          </div>
                       </div>

                       <div className="flex gap-4 pt-6">
                          <button className="flex-1 bg-[#4D80F0] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#4D80F0]/30 hover:bg-[#3E6CD9] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                             Full Archive Entry
                          </button>
                          <button className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                             <Share2 className="w-5 h-5 text-white/60" />
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white/5 px-5 py-4 rounded-2xl border border-white/5 transition-all hover:bg-white/[0.08] hover:border-[#4D80F0]/30 hover:shadow-lg">
       <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-1">{label}</p>
       <p className="text-base font-black text-white/90">{value}</p>
    </div>
  );
}

function TalentRow({ name, level, icon }: { name: string, level: number, icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5 hover:border-[#4D80F0]/30 transition-all">
       <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/10 shadow-sm flex items-center justify-center text-[#4D80F0]">
             {icon}
          </div>
          <p className="text-xs font-bold text-white/70">{name}</p>
       </div>
       <div className="bg-[#4D80F0] text-white text-[10px] font-black px-3 py-1 rounded-full">
          Lv. {level}
       </div>
    </div>
  );
}
