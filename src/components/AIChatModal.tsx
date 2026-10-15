import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  Loader2, 
  HelpCircle,
  FlaskConical,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Halo! Saya "PASURA-BIO AI", Pakar Edukasi Bioteknologi & Etnosains Kota Pasuruan. Ada yang ingin kamu diskusikan terkait rekayasa bio-preservasi Jamu Kebonagung, proyek POPBL-CRT, atau senyawa bioaktif rempah hari ini?',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Mengapa Jamu Kebonagung tradisional cepat berbusa dan basi dalam 24 jam?',
    'Bagaimana cara pasteurisasi LTLT 65°C tanpa merusak aroma minyak atsiri?',
    'Apa hubungan kadar Brix gula aren dengan masa simpan minuman?',
    'Berikan contoh ide copywriting Smart QR yang disukai Gen Z Pasuruan!'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          message: text.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Gagal menghubungi PASURA-BIO AI');
      }

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'Maaf, belum ada jawaban.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Mohon maaf, terjadi kendala saat terhubung ke server AI. Silakan periksa koneksi atau coba sesaat lagi.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-stone-900 border border-amber-800/60 rounded-3xl shadow-2xl flex flex-col h-[640px] max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-emerald-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-white text-base font-serif">
                  PASURA-BIO AI
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Pakar Edukasi Bioteknologi & Etnosains Kota Pasuruan (Gemini 3.8 Flash)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setMessages([
                  {
                    id: '1',
                    sender: 'ai',
                    text: 'Halo! Obrolan telah direset. Ada yang ingin kamu diskusikan seputar Jamu Kebonagung Pasuruan atau bioteknologi bio-preservasi?',
                    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                  },
                ]);
              }}
              title="Reset Percakapan"
              className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-900/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-800 text-amber-400 border border-stone-700'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-amber-600 text-stone-950 font-medium rounded-tr-none'
                      : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-none whitespace-pre-wrap'
                  }`}
                >
                  {msg.text}
                  <div
                    className={`text-[9px] mt-1.5 font-mono ${
                      isUser ? 'text-amber-950/70 text-right' : 'text-stone-500'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-stone-800 flex items-center justify-center text-amber-400 border border-stone-700">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-stone-950 border border-stone-800 p-3.5 rounded-2xl text-xs text-stone-400 flex items-center space-x-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>PASURA-BIO AI sedang merumuskan jawaban...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-stone-950/90 border-t border-stone-800/80 overflow-x-auto no-scrollbar flex space-x-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-[11px] text-stone-300 whitespace-nowrap transition cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-950 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tanyakan konsep bioteknologi, etnosains, atau rekayasa jamu..."
              className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold transition cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
