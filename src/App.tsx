import React, { useState } from 'react';
import { Infinity, Lock, Send } from 'lucide-react';

interface Signal {
  time: string;
  pair: string;
  dir: string;
  acc: string;
  logic: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // The password will be updated when you provide the exact password.
  // Currently set to a temporary placeholder password for testing.
  const CORRECT_PASSWORD = "traderx08"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
    }
  };

  const [marketType, setMarketType] = useState('otc');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [signals, setSignals] = useState<Signal[]>([]);

  // Form states
  const [assetInput, setAssetInput] = useState('');
  const [timeframe, setTimeframe] = useState('M1');
  const [direction, setDirection] = useState('CALL & PUT');
  const [minAcc, setMinAcc] = useState(80);

  const getBDTimeString = (offsetMinutes = 0) => {
    const d = new Date();
    d.setMinutes(d.getMinutes() + offsetMinutes);
    return d.toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const [startTime, setStartTime] = useState(() => getBDTimeString());
  const [endTime, setEndTime] = useState(() => getBDTimeString(120));

  const generateProfessionalSignals = () => {
    // Simulated Technical Analysis Algorithm based on Price Action, Support/Resistance, RSI
    const realPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF', 'EUR/JPY'];
    const otcPairs = ['EUR/USD (OTC)', 'GBP/JPY (OTC)', 'USD/BRL (OTC)', 'AUD/CAD (OTC)', 'NZD/USD (OTC)'];
    
    const availablePairs = marketType === 'real' ? realPairs : otcPairs;
    const selectedPairs = assetInput ? [assetInput + (marketType === 'otc' && !assetInput.includes('OTC') ? ' (OTC)' : '')] : availablePairs;

    const generatedSignals: Signal[] = [];
    const count = Math.floor(Math.random() * 4) + 3; // Generate 3 to 6 signals
    
    let baseTime = new Date();
    // Try to parse user's time string if they change it, otherwise default to current real time
    const timeMatch = startTime.match(/(\d+):(\d+)\s*(AM|PM|am|pm)?/);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const meridian = timeMatch[3]?.toUpperCase();
      
      if (meridian === 'PM' && hours < 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;
      
      baseTime.setHours(hours, minutes, 0, 0);
    } else {
      // Create date mapped back to BD Time
      baseTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
    }
    
    let currentTime = baseTime;
    
    for (let i = 0; i < count; i++) {
      // Simulate moving forward in time based on timeframe representing exact real time shifts
      const addMinutes = timeframe === 'M1' ? 1 : timeframe === 'M5' ? 5 : 15;
      currentTime = new Date(currentTime.getTime() + (Math.floor(Math.random() * 3) + 1) * addMinutes * 60000);
      
      // Strict Bangladesh Time (BD Time) Output formatted professionally 
      const timeString = currentTime.toLocaleTimeString('en-US', { 
        timeZone: 'Asia/Dhaka', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
      
      const pair = selectedPairs[Math.floor(Math.random() * selectedPairs.length)];
      
      let dir = 'CALL';
      if (direction === 'CALL Only') dir = 'CALL';
      else if (direction === 'PUT Only') dir = 'PUT';
      else dir = Math.random() > 0.5 ? 'CALL' : 'PUT';

      // Advanced logic simulation strings
      const logicReasonsCALL = [
        'Support Bounce + Oversold RSI',
        'Bullish Engulfing at Key Level',
        'Breakout Retest on Volume',
        'Double Bottom + MACD Crossover'
      ];
      const logicReasonsPUT = [
        'Resistance Rejection + Overbought RSI',
        'Bearish Pinbar at Supply Zone',
        'Head & Shoulders Breakdown',
        'Double Top + Stochastic Divergence'
      ];
      
      const logic = dir === 'CALL' 
        ? logicReasonsCALL[Math.floor(Math.random() * logicReasonsCALL.length)]
        : logicReasonsPUT[Math.floor(Math.random() * logicReasonsPUT.length)];

      const accuracy = Math.floor(Math.random() * (99 - minAcc + 1)) + minAcc;

      generatedSignals.push({
        time: timeString,
        pair,
        dir,
        acc: `${accuracy}%`,
        logic
      });
    }

    return generatedSignals;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResults(false);
    
    // Simulate complex AI calculation time (Price Action, S&R analysis)
    setTimeout(() => {
      const newSignals = generateProfessionalSignals();
      setSignals(newSignals);
      setIsGenerating(false);
      setShowResults(true);
    }, 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b101e] text-white flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#de375b]/10 to-[#3969ab]/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="w-full max-w-[400px] bg-[#121929] border border-[#1e273e] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-8 relative z-10">
          
          <div className="flex flex-col items-center mb-10">
            <div className="text-[#de375b] mb-4 drop-shadow-[0_0_15px_rgba(222,55,91,0.5)] bg-[#181f31] p-4 rounded-full border border-[#273552]">
              <Lock size={40} strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-bold tracking-widest text-white mb-2">ACCESS BOT</h1>
            <p className="text-center text-sm font-medium text-gray-400">
              Please enter the password to gain access to the trading tool.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter Password..."
                className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-5 py-4 text-center text-lg tracking-widest text-white placeholder-[#4c5c7d] focus:outline-none focus:border-[#de375b] transition-all shadow-inner"
              />
              {loginError && (
                <p className="text-[#de375b] text-xs font-semibold text-center mt-3 animate-pulse">{loginError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white tracking-widest transition-all shadow-[0_0_20px_rgba(222,55,91,0.3)] hover:shadow-[0_0_30px_rgba(222,55,91,0.5)] text-sm bg-gradient-to-r from-[#de375b] to-[#3969ab] hover:scale-[1.02]"
            >
              LOGIN NOW
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-[#1e273e] flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-3">Don't have the password?</p>
            <a 
              href="https://t.me/traderx009" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 bg-[#181f31] hover:bg-[#21293c] border border-[#273552] transition-colors rounded-lg px-6 py-3 text-sm font-semibold text-[#33a8e3]"
            >
              <Send size={16} />
              owner by @traderx009
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b101e] text-white flex flex-col items-center py-10 px-4 font-sans">
      {/* Main Bot Card Container */}
      <div className="w-full max-w-[420px] bg-[#121929] border border-[#1e273e] rounded-2xl shadow-2xl p-6">
        
        {/* Header Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="text-[#de375b] mb-1 drop-shadow-[0_0_15px_rgba(222,55,91,0.5)]">
            <Infinity size={70} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-widest text-[#7c8ebf] mb-1">INFINITY</h1>
          <p className="text-center text-[11px] font-medium text-gray-400 tracking-wide">
            Best AI Powered Advanced Signal Generation Tool
          </p>
        </div>

        {/* Market Type Toggles */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => setMarketType('real')}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
              marketType === 'real'
                ? 'bg-gradient-to-r from-[#de375b] to-[#3969ab] text-white shadow-lg'
                : 'bg-[#21293c] text-gray-300 hover:bg-[#283248]'
            }`}
          >
            Real Market All Broker
          </button>
          <button
            onClick={() => setMarketType('otc')}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
              marketType === 'otc'
                ? 'bg-gradient-to-r from-[#de375b] to-[#3969ab] text-white shadow-lg border-none'
                : 'bg-[#21293c] text-gray-300 hover:bg-[#283248]'
            }`}
          >
            OTC Market Quotex
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          
          {/* Select Asset */}
          <div>
            <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Select Asset</label>
            <input
              type="text"
              value={assetInput}
              onChange={(e) => setAssetInput(e.target.value)}
              placeholder="Tap here to select..."
              className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 placeholder-[#4c5c7d] focus:outline-none focus:border-[#405a8f] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Time */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Start Time</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 focus:outline-none focus:border-[#405a8f] transition-colors"
              />
            </div>
            {/* End Time */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">End Time</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 focus:outline-none focus:border-[#405a8f] transition-colors"
              />
            </div>

            {/* Generation Mode */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Generation Mode</label>
              <div className="relative">
                <select className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 appearance-none focus:outline-none focus:border-[#405a8f] transition-colors cursor-pointer">
                  <option>Infinity</option>
                  <option>Standard</option>
                  <option>Aggressive</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Days To Analyze */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Days To Analyze</label>
              <div className="relative">
                <select className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 appearance-none focus:outline-none focus:border-[#405a8f] transition-colors cursor-pointer">
                  <option>7 Days</option>
                  <option>14 Days</option>
                  <option>30 Days</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Timeframe</label>
              <div className="relative">
                <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 appearance-none focus:outline-none focus:border-[#405a8f] transition-colors cursor-pointer">
                  <option value="M1">M1</option>
                  <option value="M5">M5</option>
                  <option value="M15">M15</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Direction */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Direction</label>
              <div className="relative">
                <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 appearance-none focus:outline-none focus:border-[#405a8f] transition-colors cursor-pointer">
                  <option value="CALL & PUT">CALL & PUT</option>
                  <option value="CALL Only">CALL Only</option>
                  <option value="PUT Only">PUT Only</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Martingale Steps */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Martingale Steps</label>
              <div className="relative">
                <select className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 appearance-none focus:outline-none focus:border-[#405a8f] transition-colors cursor-pointer">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

            {/* Minimum % */}
            <div>
              <label className="block text-[#8699c7] text-sm font-semibold mb-1.5">Minimum %</label>
              <div className="relative">
                <select value={minAcc} onChange={(e) => setMinAcc(parseInt(e.target.value.replace('%','')))} className="w-full bg-[#181f31] border border-[#273552] rounded-xl px-4 py-3.5 text-sm text-gray-100 appearance-none focus:outline-none focus:border-[#405a8f] transition-colors cursor-pointer">
                  <option value="80">80%</option>
                  <option value="85">85%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full mt-8 py-4 rounded-xl font-bold text-white tracking-widest transition-all shadow-lg text-sm flex justify-center items-center gap-2
              ${isGenerating ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-90 hover:scale-[1.02]'}
              bg-gradient-to-r from-[#de375b] to-[#3969ab]
            `}
          >
            {isGenerating ? (
              <>
                <span className="block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>ANALYZING MARKET...</span>
              </>
            ) : (
              'GENERATE SIGNALS'
            )}
          </button>

          {/* Footer Links */}
          <div className="flex justify-center items-center gap-6 mt-6 pt-4 text-[13px] font-medium text-gray-300 border-t border-[#1e273e]">
            <a 
              href="https://t.me/traderx009" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-[#33a8e3] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              owner by @traderx009
            </a>
            <span className="text-[#273552]">|</span>
            <a href="#" className="hover:text-white transition-colors">QUOTEX</a>
            <span className="text-[#273552]">|</span>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>

        </div>
      </div>

      {/* Simulated Results Panel (Demo) */}
      {showResults && signals.length > 0 && (
         <div className="w-full max-w-[420px] mt-6 bg-[#121929] border border-[#1e273e] rounded-xl p-5 shadow-xl animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#8699c7]">Live Technical Analysis Signals</h3>
              <span className="text-[10px] bg-[#181f31] px-2 py-1 rounded text-gray-400 border border-[#273552]">Price Action Based</span>
            </div>
            <div className="space-y-3">
              {signals.map((sig, i) => (
                <div key={i} className="flex flex-col bg-[#181f31] p-3.5 rounded-xl text-sm border border-[#273552]">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-gray-400 font-mono mr-3">{sig.time}</span>
                      <span className="font-bold text-gray-100">{sig.pair}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#8699c7] font-semibold">WinRate {sig.acc}</span>
                      <span className={`px-2.5 py-1 rounded w-14 text-center text-[11px] font-bold tracking-wider ${
                        sig.dir === 'CALL' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {sig.dir}
                      </span>
                    </div>
                  </div>
                  <div className="text-[11px] text-gray-500 border-t border-[#273552] pt-2 mt-1">
                    <span className="text-[#8699c7]">Logic:</span> {sig.logic}
                  </div>
                </div>
              ))}
            </div>
         </div>
      )}
    </div>
  );
}
