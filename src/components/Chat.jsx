import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Send, 
  Search, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  User,
  Circle,
  MessageCircle,
  Users,
  Settings
} from 'lucide-react';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const contacts = [
    {
      id: 1,
      name: "Dr. Sarah Connor",
      role: "Instrutor - Cybersecurity",
      avatar: "SC",
      status: "online",
      lastMessage: "Ótima pergunta! Vou explicar melhor na próxima aula.",
      lastMessageTime: "14:30",
      unreadCount: 0,
      type: "instructor"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Instrutor - Game Development",
      avatar: "MJ",
      status: "away",
      lastMessage: "O projeto está ficando excelente! Continue assim.",
      lastMessageTime: "12:15",
      unreadCount: 2,
      type: "instructor"
    },
    {
      id: 3,
      name: "Grupo - Cybersecurity",
      role: "15 participantes",
      avatar: "CS",
      status: "online",
      lastMessage: "João: Alguém pode me ajudar com o exercício 3?",
      lastMessageTime: "11:45",
      unreadCount: 5,
      type: "group"
    },
    {
      id: 4,
      name: "Dr. Emily Chen",
      role: "Instrutor - AI & ML",
      avatar: "EC",
      status: "offline",
      lastMessage: "Vou enviar o material complementar ainda hoje.",
      lastMessageTime: "Ontem",
      unreadCount: 0,
      type: "instructor"
    },
    {
      id: 5,
      name: "Suporte JHAMS",
      role: "Equipe de Suporte",
      avatar: "SJ",
      status: "online",
      lastMessage: "Problema resolvido! Obrigado pelo contato.",
      lastMessageTime: "Ontem",
      unreadCount: 0,
      type: "support"
    }
  ];

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        sender: "Dr. Sarah Connor",
        content: "Olá! Como está indo com o módulo de criptografia?",
        timestamp: "14:25",
        isOwn: false,
        avatar: "SC"
      },
      {
        id: 2,
        sender: "Você",
        content: "Está indo bem! Tenho uma dúvida sobre algoritmos de hash.",
        timestamp: "14:27",
        isOwn: true
      },
      {
        id: 3,
        sender: "Dr. Sarah Connor",
        content: "Ótima pergunta! Vou explicar melhor na próxima aula.",
        timestamp: "14:30",
        isOwn: false,
        avatar: "SC"
      }
    ],
    2: [
      {
        id: 1,
        sender: "Marcus Johnson",
        content: "Vi seu progresso no projeto Unity. Está ficando muito bom!",
        timestamp: "12:10",
        isOwn: false,
        avatar: "MJ"
      },
      {
        id: 2,
        sender: "Você",
        content: "Obrigado! Estou empolgado com o resultado.",
        timestamp: "12:12",
        isOwn: true
      },
      {
        id: 3,
        sender: "Marcus Johnson",
        content: "O projeto está ficando excelente! Continue assim.",
        timestamp: "12:15",
        isOwn: false,
        avatar: "MJ"
      }
    ]
  });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentChat = contacts.find(contact => contact.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: currentMessages.length + 1,
        sender: "Você",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg]
      }));

      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case 'group': return <Users className="w-4 h-4" />;
      case 'support': return <Settings className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 mb-8"
        >
          <h1 className="text-4xl font-bold neon-text">Mensagens</h1>
          <p className="text-muted-foreground">Converse com instrutores e colegas</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Contacts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="cyber-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Conversas
                </CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 cyber-border"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <div className="space-y-1 p-4">
                    {filteredContacts.map((contact) => (
                      <motion.div
                        key={contact.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all
                          ${selectedChat === contact.id ? 'bg-primary/20 border border-primary/50' : 'hover:bg-muted/50'}
                        `}
                        onClick={() => setSelectedChat(contact.id)}
                      >
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            {contact.type === 'group' ? (
                              <Users className="w-5 h-5 text-primary" />
                            ) : (
                              <span className="text-sm font-semibold">{contact.avatar}</span>
                            )}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(contact.status)}`}></div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm truncate">{contact.name}</p>
                            {contact.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {contact.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {contact.lastMessage}
                          </p>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {contact.lastMessageTime}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="cyber-border h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                        {currentChat?.type === 'group' ? (
                          <Users className="w-5 h-5 text-primary" />
                        ) : (
                          <span className="text-sm font-semibold">{currentChat?.avatar}</span>
                        )}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(currentChat?.status)}`}></div>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{currentChat?.name}</CardTitle>
                      <CardDescription>{currentChat?.role}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="cyber-border">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="cyber-border">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="cyber-border">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-400px)] p-4">
                  <div className="space-y-4">
                    {currentMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {!message.isOwn && (
                            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-semibold">{message.avatar}</span>
                            </div>
                          )}
                          
                          <div className={`
                            px-4 py-2 rounded-lg
                            ${message.isOwn 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                            }
                          `}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="cyber-border">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="cyber-border pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    >
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="cyber-button cyber-gradient"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

