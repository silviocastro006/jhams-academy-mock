import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  Bell, 
  Award, 
  Calendar, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Settings,
  Filter,
  MoreVertical,
  BookOpen,
  Users,
  Trophy,
  Zap
} from 'lucide-react';

const Alerts = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'certificate',
      title: 'Certificado Disponível!',
      message: 'Seu certificado do curso "Game Development with Unity" está pronto para download.',
      timestamp: '2 horas atrás',
      read: false,
      priority: 'high',
      icon: Award,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Prazo se Aproximando',
      message: 'Você tem 2 dias para entregar o projeto final de AI & Machine Learning.',
      timestamp: '4 horas atrás',
      read: false,
      priority: 'high',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      id: 3,
      type: 'class',
      title: 'Aula Presencial Amanhã',
      message: 'Lembrete: Aula presencial de Cybersecurity amanhã às 14:00 no Lab 3.',
      timestamp: '6 horas atrás',
      read: true,
      priority: 'medium',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Nova Conquista Desbloqueada!',
      message: 'Parabéns! Você desbloqueou a conquista "Estudante Dedicado".',
      timestamp: '1 dia atrás',
      read: true,
      priority: 'low',
      icon: Trophy,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      id: 5,
      type: 'course',
      title: 'Novo Módulo Disponível',
      message: 'O Módulo 4 de "Ethical Hacking Bootcamp" já está disponível.',
      timestamp: '1 dia atrás',
      read: true,
      priority: 'medium',
      icon: BookOpen,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 6,
      type: 'system',
      title: 'Manutenção Programada',
      message: 'A plataforma ficará indisponível das 02:00 às 04:00 para manutenção.',
      timestamp: '2 dias atrás',
      read: true,
      priority: 'low',
      icon: Info,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10'
    },
    {
      id: 7,
      type: 'community',
      title: 'Nova Mensagem no Grupo',
      message: 'Você tem 3 novas mensagens no grupo "Cybersecurity Fundamentals".',
      timestamp: '3 dias atrás',
      read: true,
      priority: 'low',
      icon: Users,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    }
  ]);

  const [settings, setSettings] = useState({
    certificates: true,
    deadlines: true,
    classes: true,
    achievements: true,
    courses: true,
    system: false,
    community: true,
    email: true,
    push: true
  });

  const filterTypes = [
    { value: 'all', label: 'Todos', count: notifications.length },
    { value: 'unread', label: 'Não lidos', count: notifications.filter(n => !n.read).length },
    { value: 'certificate', label: 'Certificados', count: notifications.filter(n => n.type === 'certificate').length },
    { value: 'deadline', label: 'Prazos', count: notifications.filter(n => n.type === 'deadline').length },
    { value: 'class', label: 'Aulas', count: notifications.filter(n => n.type === 'class').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>;
      case 'medium':
        return <Badge variant="secondary">Média</Badge>;
      case 'low':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold neon-text">Alertas e Notificações</h1>
          <p className="text-muted-foreground">
            Mantenha-se atualizado com suas atividades e prazos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Filter */}
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {filterTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={filter === type.value ? "default" : "ghost"}
                    className={`w-full justify-between ${filter === type.value ? 'cyber-gradient' : ''}`}
                    onClick={() => setFilter(type.value)}
                  >
                    <span>{type.label}</span>
                    <Badge variant="outline">{type.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start cyber-border"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marcar Todas como Lidas
                </Button>
                <Button variant="outline" className="w-full justify-start cyber-border">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Preferências
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(settings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize">
                      {key === 'certificates' && 'Certificados'}
                      {key === 'deadlines' && 'Prazos'}
                      {key === 'classes' && 'Aulas'}
                      {key === 'achievements' && 'Conquistas'}
                      {key === 'courses' && 'Cursos'}
                      {key === 'system' && 'Sistema'}
                      {key === 'community' && 'Comunidade'}
                      {key === 'email' && 'Email'}
                      {key === 'push' && 'Push'}
                    </label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, [key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="cyber-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Bell className="w-5 h-5 mr-2" />
                      Notificações
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="ml-2">
                          {unreadCount}
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {filteredNotifications.length} notificação(ões) encontrada(s)
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhuma notificação encontrada</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification, index) => {
                    const Icon = notification.icon;
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          relative p-4 rounded-lg border transition-all cursor-pointer
                          ${notification.read 
                            ? 'border-border bg-muted/20' 
                            : 'border-primary/50 bg-primary/5 shadow-lg'
                          }
                          hover:shadow-md
                        `}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${notification.bgColor}
                          `}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {notification.message}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {getPriorityBadge(notification.priority)}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {notification.timestamp}
                              </span>
                              
                              {!notification.read && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                >
                                  Marcar como lida
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;

