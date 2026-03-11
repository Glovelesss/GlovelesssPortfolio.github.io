import React, { useRef, useState, useEffect } from "react";
import PageTransition from "../Components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";

// --- Whiteboard Component ---
const Whiteboard = ({ color, setColor, brushSize, setBrushSize }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let animationFrame;
    const animate = () => {
      setRotation(prev => (prev + 1.5) % 360); // Slower spin
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    
    ctx.beginPath();
    const shapeType = Math.floor((x + y) / 50) % 4;
    
    if (shapeType === 0) {
      ctx.moveTo(-brushSize * 2, 0); ctx.lineTo(brushSize * 2, 0);
    } else if (shapeType === 1) {
      ctx.moveTo(0, -brushSize); ctx.lineTo(brushSize, brushSize); ctx.lineTo(-brushSize, brushSize); ctx.closePath();
    } else if (shapeType === 2) {
      ctx.rect(-brushSize/2, -brushSize/2, brushSize, brushSize);
    } else {
      ctx.moveTo(-brushSize, -brushSize); ctx.lineTo(brushSize, brushSize); ctx.moveTo(brushSize, -brushSize); ctx.lineTo(-brushSize, brushSize);
    }
    
    ctx.stroke();
    ctx.restore();

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap gap-4 mb-6 items-center border-b border-(--bordercolor) pb-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Kleur:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Dikte:</label>
          <input type="range" min="1" max="50" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} className="accent-(--accent)" />
        </div>
        <button onClick={clearCanvas} className="ml-auto px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-lg transition-colors text-sm font-bold">
          Wis Bord
        </button>
      </div>
      <div className="flex-1 min-h-[400px] bg-(--bg) rounded-xl cursor-crosshair overflow-hidden touch-none border border-(--bordercolor) relative">
        <canvas
          ref={canvasRef}
          onMouseDown={(e) => { setIsDrawing(true); draw(e); }}
          onMouseUp={() => { setIsDrawing(false); canvasRef.current.getContext("2d").beginPath(); }}
          onMouseMove={draw}
          onMouseOut={() => { setIsDrawing(false); canvasRef.current.getContext("2d").beginPath(); }}
          className="w-full h-full"
        />
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-30 text-xs italic">
          Klik en sleep om te tekenen met de spinny brush (vertraagd!)
        </div>
      </div>
    </div>
  );
};

// --- Tic Tac Toe Component ---
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
    }
    return squares.includes(null) ? null : "Gelijkspel";
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = "X";
    setBoard(newBoard);
    
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
    } else {
      setIsXNext(false);
      // Simple AI move
      setTimeout(() => {
        const availableMoves = newBoard.map((v, idx) => v === null ? idx : null).filter(v => v !== null);
        if (availableMoves.length > 0) {
          const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
          newBoard[move] = "O";
          setBoard([...newBoard]);
          const finalWin = calculateWinner(newBoard);
          if (finalWin) setWinner(finalWin);
          setIsXNext(true);
        }
      }, 500);
    }
  };

  const reset = () => { setBoard(Array(9).fill(null)); setWinner(null); setIsXNext(true); };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h3 className="text-2xl font-bold mb-6">{winner ? (winner === "Gelijkspel" ? "Gelijkspel!" : `Winnaar: ${winner}`) : (isXNext ? "Jij bent aan de beurt (X)" : "Computer denkt na (O)...")}</h3>
      <div className="grid grid-cols-3 gap-2 bg-(--bordercolor) p-2 rounded-xl">
        {board.map((cell, i) => (
          <button key={i} onClick={() => handleClick(i)} className="w-24 h-24 bg-(--bg) rounded-lg text-4xl font-bold flex items-center justify-center hover:bg-(--surface) transition-colors border border-(--bordercolor)">
            <span className={cell === "X" ? "text-(--accent)" : "text-(--accent-secondary)"}>{cell}</span>
          </button>
        ))}
      </div>
      <button onClick={reset} className="mt-8 px-6 py-2 bg-(--accent) text-white font-bold rounded-lg hover:bg-(--accent-secondary) transition-colors">Opnieuw</button>
    </div>
  );
};

// --- Rock Paper Scissors Component ---
const RockPaperScissors = () => {
  const choices = ["Steen", "Papier", "Schaar"];
  const icons = { "Steen": "🪨", "Papier": "📄", "Schaar": "✂️" };
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const play = (choice) => {
    setPlayerChoice(choice);
    const cpu = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(cpu);
    
    if (choice === cpu) setResult("Gelijkspel!");
    else if ((choice === "Steen" && cpu === "Schaar") || (choice === "Papier" && cpu === "Steen") || (choice === "Schaar" && cpu === "Papier")) setResult("Je wint!");
    else setResult("Je verliest!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex gap-4 mb-12">
        {choices.map(c => (
          <button key={c} onClick={() => play(c)} className="w-24 h-24 bg-(--surface) rounded-2xl flex flex-col items-center justify-center border-2 border-transparent hover:border-(--accent) hover:scale-105 transition-all shadow-lg text-3xl">
            {icons[c]}
            <span className="text-xs font-bold mt-2 uppercase">{c}</span>
          </button>
        ))}
      </div>
      
      {playerChoice && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="flex items-center gap-12 font-bold mb-8">
            <div><div className="text-4xl mb-2">{icons[playerChoice]}</div>Jij</div>
            <div className="text-4xl">VS</div>
            <div><div className="text-4xl mb-2">{icons[computerChoice]}</div>CPU</div>
          </div>
          <motion.h2 key={result} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`text-4xl font-black ${result === "Je wint!" ? "text-green-500" : result === "Je verliest!" ? "text-rose-500" : "text-indigo-400"}`}>
            {result}
          </motion.h2>
        </motion.div>
      )}
    </div>
  );
};

export default function Lab() {
  const [activeTab, setActiveTab] = useState("whiteboard");
  const [color, setColor] = useState("#6366f1");
  const [brushSize, setBrushSize] = useState(5);

  const tabs = [
    { id: "whiteboard", label: "Spinny Whiteboard", icon: "🎨" },
    { id: "tictactoe", label: "Boter-Kaas-en-Eieren", icon: "❌" },
    { id: "rps", label: "Steen Papier Schaar", icon: "✊" }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto py-12 px-4 max-w-5xl">
        <header className="mb-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-black mb-4 bg-gradient-to-r from-(--accent) to-(--accent-secondary) bg-clip-text text-transparent italic">
            HET LAB
          </motion.h1>
          <p className="text-(--muted) text-lg">Experimenten, mini-games en interactieve speeltjes.</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-(--surface) p-1.5 rounded-2xl border border-(--bordercolor) shadow-xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id ? "bg-(--accent) text-white shadow-lg" : "hover:bg-(--bg) text-(--muted)"}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Experiment Container */}
        <div className="bg-(--surface) rounded-[2.5rem] border border-(--bordercolor) p-2 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
          <div className="flex-1 bg-(--bg) m-2 rounded-[2rem] border border-(--bordercolor) p-6 relative overflow-hidden">
             {/* Animated blobs for flavor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-(--accent)/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-(--accent-secondary)/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

             <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, scale: 0.98, y: 10 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.98, y: -10 }}
                 transition={{ duration: 0.2 }}
                 className="h-full"
               >
                 {activeTab === "whiteboard" && <Whiteboard color={color} setColor={setColor} brushSize={brushSize} setBrushSize={setBrushSize} />}
                 {activeTab === "tictactoe" && <TicTacToe />}
                 {activeTab === "rps" && <RockPaperScissors />}
               </motion.div>
             </AnimatePresence>
          </div>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tabs.map(tab => (
            <motion.div 
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab(tab.id)}
              className={`p-6 bg-(--surface) rounded-2xl border cursor-pointer transition-all ${activeTab === tab.id ? "border-(--accent) ring-1 ring-(--accent)/50 shadow-lg shadow-(--accent)/10" : "border-(--bordercolor) hover:border-(--muted)"}`}
            >
              <div className="text-2xl mb-2">{tab.icon}</div>
              <h3 className="font-bold text-(--accent)">{tab.label}</h3>
              <p className="text-xs text-(--muted) mt-2 leading-relaxed">
                {tab.id === "whiteboard" && "Tekenen met een roterende brush voor geometrische patronen."}
                {tab.id === "tictactoe" && "Daag de computer uit voor een legendarisch potje boter-kaas-en-eieren."}
                {tab.id === "rps" && "De ultieme test van geluk en ratio tegen de machine."}
              </p>
            </motion.div>
          ))}
        </section>
      </div>
    </PageTransition>
  );
}
