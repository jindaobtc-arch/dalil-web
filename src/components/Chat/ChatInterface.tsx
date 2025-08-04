import React, { useState, useRef, useEffect } from 'react';
import { Send, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { getDalilResponse } from '../../lib/dalil-responses';
import { supabase } from '../../lib/supabase';
import type { ChatMessage, User } from '../../types';

interface ChatInterfaceProps {
  user?: User;
  onAuthModalOpen?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, onAuthModalOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion.trim() || isLoading) return;

    if (!user) {
      if (onAuthModalOpen) {
        onAuthModalOpen();
      }
      return;
    }

    const questionLimit = user.questionsLimit || 15;
    if ((user.questionsUsed || 0) >= questionLimit) {
      alert('Vous avez atteint votre limite de questions pour ce mois. Veuillez upgrader votre plan.');
      return;
    }

    const question = currentQuestion.trim();
    setCurrentQuestion('');
    setIsLoading(true);

    // Add user question
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      question,
      response: '',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await getDalilResponse(question);
      
      // Sauvegarder le message dans la base de données
      const { error: saveError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          question: question,
          response: response
        });

      if (saveError) {
        console.error('Erreur lors de la sauvegarde du message:', saveError);
      }

      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: user.id,
        question: '',
        response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, responseMessage]);
      
      // Mettre à jour le compteur de questions de l'utilisateur localement
      // Le trigger de la base de données s'occupera de l'incrémenter côté serveur
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, bookmarked: !msg.bookmarked }
        : msg
    ));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Welcome message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookmarkCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Assalamu alaykum wa rahmatullahi wa barakatuh
            </h2>
            <p className="text-gray-600 mb-4">
              Je suis Dalil, votre assistant islamique éducatif. Posez-moi vos questions sur l'Islam et je vous fournirai des réponses basées sur le Coran et la Sunnah authentique selon la compréhension des Salaf as-Salih.
            </p>
            <p className="text-sm text-green-600 mb-2">
              {import.meta.env.VITE_OPENAI_API_KEY ? 
                "✨ IA avancée activée - Réponses personnalisées et détaillées" : 
                "Mode de base - Configurez l'API OpenAI pour des réponses plus avancées"
              }
            </p>
            <p className="text-xs text-gray-500">
              {import.meta.env.VITE_OPENAI_API_KEY ? 
                "✨ IA avancée activée - Réponses personnalisées et détaillées" : 
                "Mode de base - Configurez l'API OpenAI pour des réponses plus avancées"
              }
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.question && (
              <div className="flex justify-end mb-4">
                <div className="max-w-3xl bg-green-600 text-white rounded-lg px-4 py-2">
                  <p>{message.question}</p>
                </div>
              </div>
            )}
            
            {message.response && (
              <div className="flex justify-start">
                <div className="max-w-4xl bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">د</span>
                      </div>
                      <span className="text-sm font-medium text-green-700">Dalil</span>
                    </div>
                    <button
                      onClick={() => toggleBookmark(message.id)}
                      className="text-gray-400 hover:text-amber-500 transition-colors"
                    >
                      {message.bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    {message.response.split('\n').map((line, index) => (
                      <p key={index} className="mb-2 text-gray-800 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString('fr-FR')}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                <span className="text-sm text-gray-600">Dalil réfléchit...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            placeholder="Posez votre question sur l'Islam..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !currentQuestion.trim()}
            className="flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Envoyer</span>
          </Button>
        </form>
        
        {!user && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            <button 
              onClick={onAuthModalOpen}
              className="text-green-600 hover:text-green-700 underline"
            >
              Connectez-vous
            </button>
            {' '}pour poser des questions à Dalil
          </p>
        )}
      </div>
    </div>
  );
};