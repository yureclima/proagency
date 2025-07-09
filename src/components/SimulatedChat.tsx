import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import './SimulatedChat.css';
import { useInView } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const N8N_WEBHOOK_URL = 'https://webhook.barbearialopes.shop/webhook/e9bdd2a4-5daf-428c-a8c0-ac70cdf501a6';
const BOT_TYPING_DELAY = 1800; // ms

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

let typingTimeout: NodeJS.Timeout | null = null;

const SimulatedChat: React.FC = memo(() => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Olá! Como posso ajudar você hoje?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(chatRef, { once: true, margin: '-100px' });
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Detecta se é desktop
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  const handleInputFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    if (isDesktop) {
      e.preventDefault();
      setIsChatModalOpen(true);
    }
  }, [isDesktop]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDesktop) {
      e.preventDefault();
      setIsChatModalOpen(true);
    } else if (e.key === 'Enter') {
      handleSend();
    }
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, []);

  function splitBotReply(reply: string): string[] {
    // Divide por ponto final, interrogação ou exclamação, mantendo o delimitador
    return reply.match(/[^.!?]+[.!?]?/g)?.map(s => s.trim()).filter(Boolean) || [reply];
  }

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;
    if (typingTimeout) clearTimeout(typingTimeout); // Interrompe digitação do bot se usuário enviar nova msg
    setBotTyping(false);
    const userMsg = { text: input, sender: 'user' } as Message;
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();
      let reply = 'Recebi sua mensagem! Em breve responderei.';
      if (Array.isArray(data) && data[0]?.output) {
        reply = data[0].output;
      } else if (data.reply) {
        reply = data.reply;
      } else if (data.message) {
        reply = data.message;
      }
      const sentences = splitBotReply(reply);
      let i = 0;
      const showNext = () => {
        setMessages((msgs) => [...msgs, { text: sentences[i], sender: 'bot' }]);
        i++;
        if (i < sentences.length) {
          setBotTyping(true);
          typingTimeout = setTimeout(showNext, BOT_TYPING_DELAY);
        } else {
          setBotTyping(false); // Indicador some imediatamente
        }
      };
      if (sentences.length > 0) {
        if (sentences.length > 1) setBotTyping(true);
        typingTimeout = setTimeout(showNext, BOT_TYPING_DELAY);
      }
    } catch (e) {
      setMessages((msgs) => [...msgs, { text: 'Desculpe, houve um erro ao enviar sua mensagem. Tente novamente.', sender: 'bot' }]);
      setBotTyping(false);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  }, [handleSend]);

  return (
    <>
      {/* Modal de chat para desktop */}
      <Dialog open={isChatModalOpen} onOpenChange={setIsChatModalOpen}>
        <DialogContent className="max-w-lg w-full p-0 bg-transparent border-none shadow-none flex flex-col items-center">
          {/* Chat completo dentro do modal */}
          <div className="simulated-chat-box" style={{position: 'relative', overflow: 'hidden', width: '100%'}}>
            <div className={`chat-title${isInView ? ' chat-animate-in' : ''}`} style={{width: '100%', textAlign: 'center', marginBottom: '0.3rem', color: '#38bdf8', fontWeight: 600, fontSize: '1.08rem', letterSpacing: 0.1}}>
              Experimente o Futuro do Atendimento!
            </div>
            <div className={`chat-desc${isInView ? ' chat-animate-in' : ''}`} style={{width: '100%', textAlign: 'center', marginBottom: '0.7rem', color: '#b6eaff', fontWeight: 400, fontSize: '0.98rem', letterSpacing: 0.01, opacity: 0.85}}>
              Agente IA que age 24/7. Faça um test-drive e veja como ele pode transformar seu negócio!
            </div>
            <div className={`chat-screen${isInView ? ' chat-animate-in' : ''}`}>
              <div className="messages-list">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message-bubble ${msg.sender}${isInView ? ' chat-animate-in' : ''}`}
                  >
                    {msg.text}
                  </div>
                ))}
                {botTyping && (
                  <div className="message-bubble bot typing-indicator">
                    <span className="typing-dot">•</span>
                    <span className="typing-dot">•</span>
                    <span className="typing-dot">•</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-input-row">
                <input
                  type="text"
                  placeholder={loading ? "Aguarde..." : "Digite sua mensagem..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="chat-input"
                  disabled={loading || botTyping}
                  autoFocus
                />
                <button onClick={handleSend} className="send-btn" aria-label="Enviar mensagem" disabled={loading || botTyping}>
                  <span style={{fontSize: '1.7rem', color: '#fff', fontWeight: 700, lineHeight: 1, display: 'block', marginTop: '-2px'}}> &gt; </span>
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Chat inline (mobile ou desktop sem modal) */}
      <div className="simulated-chat-box" ref={chatRef} style={{position: 'relative', overflow: 'hidden'}}>
        <div className={`chat-title${isInView ? ' chat-animate-in' : ''}`} style={{width: '100%', textAlign: 'center', marginBottom: '0.3rem', color: '#38bdf8', fontWeight: 600, fontSize: '1.08rem', letterSpacing: 0.1}}>
          Experimente o Futuro do Atendimento!
        </div>
        <div className={`chat-desc${isInView ? ' chat-animate-in' : ''}`} style={{width: '100%', textAlign: 'center', marginBottom: '0.7rem', color: '#b6eaff', fontWeight: 400, fontSize: '0.98rem', letterSpacing: 0.01, opacity: 0.85}}>
          Agente IA que age 24/7. Faça um test-drive e veja como ele pode transformar seu negócio!
        </div>
        <div className={`chat-screen${isInView ? ' chat-animate-in' : ''}`}>
          <div className="messages-list">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-bubble ${msg.sender}${isInView ? ' chat-animate-in' : ''}`}
              >
                {msg.text}
              </div>
            ))}
            {botTyping && (
              <div className="message-bubble bot typing-indicator">
                <span className="typing-dot">•</span>
                <span className="typing-dot">•</span>
                <span className="typing-dot">•</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input-row">
            <input
              type="text"
              placeholder={loading ? "Aguarde..." : "Digite sua mensagem..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyDown}
              className="chat-input"
              disabled={loading || botTyping}
            />
            <button onClick={handleSend} className="send-btn" aria-label="Enviar mensagem" disabled={loading || botTyping}>
              <span style={{fontSize: '1.7rem', color: '#fff', fontWeight: 700, lineHeight: 1, display: 'block', marginTop: '-2px'}}> &gt; </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

SimulatedChat.displayName = 'SimulatedChat';

export default SimulatedChat; 