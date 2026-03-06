import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, ChevronRight, History } from 'lucide-react';
import { matchReportConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const MatchReport = () => {
  if (!matchReportConfig.matchTitle) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // State to hold the dynamic standing, falling back to config if needed
  const [dynamicStanding, setDynamicStanding] = useState(matchReportConfig.standing);

  useEffect(() => {
    // Fetch standing from Google Sheets CSV
    const fetchStanding = async () => {
      try {
        // We add a timestamp to the URL and 'no-store' to force a fresh fetch every time
        const timestamp = new Date().getTime();
        const response = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTJgo8jlrBgu1Wk07PrRIjVs94EP9bFMObUXQU34aKK0NqL8bWyW_LrPcaBSf_69qN7bWCrV6oFX3zm/pub?output=csv&t=${timestamp}`, {
          cache: 'no-store'
        });
        
        const csvText = await response.text();
        
        // Split into rows and clean up empty lines
        const rows = csvText.split('\n').filter(row => row.trim() !== '');
        
        // Find the row for Imperial FC (case-insensitive)
        const imperialRow = rows.find(row => row.toLowerCase().includes('imperial'));
        
        if (imperialRow) {
          const cols = imperialRow.split(',');
          const positionNumber = parseInt(cols[0], 10);
          
          if (!isNaN(positionNumber)) {
            // Calculate the correct suffix (st, nd, rd, th)
            const j = positionNumber % 10;
            const k = positionNumber % 100;
            let suffix = "th";
            
            if (j === 1 && k !== 11) suffix = "st";
            if (j === 2 && k !== 12) suffix = "nd";
            if (j === 3 && k !== 13) suffix = "rd";
            
            setDynamicStanding(`${positionNumber}${suffix}`);
          }
        }
      } catch (error) {
        console.error("Error fetching live standings:", error);
      }
    };

    fetchStanding();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="match-report" className="w-full bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={cardRef} className="bg-imperial-void border-2 border-imperial-yellow/10 overflow-hidden bevel-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <img src={matchReportConfig.image} alt="Match" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-r from-imperial-void via-transparent to-transparent" />
            </div>
            
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-imperial-yellow mb-4">
                <Trophy className="w-5 h-5" />
                <span className="font-mono-custom tracking-[0.2em] text-sm">LATEST RESULT — {matchReportConfig.date}</span>
              </div>
              
              <h2 className="font-aggressive text-4xl md:text-5xl text-white mb-6 leading-tight">{matchReportConfig.matchTitle}</h2>
              
              <div className="flex items-center gap-8 mb-8">
                <div className="text-center">
                  <p className="text-white/40 font-mono-custom text-xs uppercase mb-1">Imperial</p>
                  <p className="text-5xl font-aggressive text-imperial-yellow">{matchReportConfig.score.split('-')[0]}</p>
                </div>
                <div className="text-white/20 text-3xl font-aggressive">VS</div>
                <div className="text-center">
                  <p className="text-white/40 font-mono-custom text-xs uppercase mb-1">{matchReportConfig.opponent}</p>
                  <p className="text-5xl font-aggressive text-white">{matchReportConfig.score.split('-')[1]}</p>
                </div>
              </div>

              {/* Updated Stats Section */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/5 p-4 bevel-sm border border-white/10">
                  <p className="text-white/40 font-mono-custom text-[10px] uppercase mb-1">League Standing</p>
                  <p className="text-2xl font-aggressive text-imperial-yellow">{dynamicStanding}</p>
                </div>
                <div className="bg-white/5 p-4 bevel-sm border border-white/10">
                  <p className="text-white/40 font-mono-custom text-[10px] uppercase mb-1">Player Spotlight</p>
                  <p className="text-sm font-aggressive text-white uppercase">{matchReportConfig.spotlightPlayer}</p>
                  <p className="text-[10px] text-imperial-yellow/70 font-mono-custom">{matchReportConfig.spotlightStat}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => document.getElementById('fixtures')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-imperial text-xs flex items-center gap-2"
                >
                  UPCOMING FIXTURES <ChevronRight className="w-4 h-4" />
                </button>
                <a href={matchReportConfig.allMatchesLink} className="btn-imperial-outline text-xs flex items-center gap-2">
                  PREVIOUS MATCHES <History className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchReport;
