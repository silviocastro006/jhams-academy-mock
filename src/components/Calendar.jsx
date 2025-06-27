import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Monitor,
  Plus,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Users
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [checklist, setChecklist] = useState([
    { id: 1, task: "Prova de Cybersecurity - Módulo 2", completed: true, dueDate: "2024-06-20", priority: "high" },
    { id: 2, task: "Entrega do projeto Unity", completed: false, dueDate: "2024-06-25", priority: "high" },
    { id: 3, task: "Revisão de AI & Machine Learning", completed: false, dueDate: "2024-06-28", priority: "medium" },
    { id: 4, task: "Participar do webinar de Blockchain", completed: true, dueDate: "2024-06-22", priority: "low" },
    { id: 5, task: "Exercícios práticos de Ethical Hacking", completed: false, dueDate: "2024-06-30", priority: "medium" }
  ]);

  const events = [
    {
      id: 1,
      title: "Aula Presencial - Game Development",
      date: "2024-06-26",
      time: "14:00",
      duration: "2h",
      type: "presencial",
      location: "Lab 3 - Campus Tech",
      instructor: "Marcus Johnson",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Webinar - Cybersecurity Trends",
      date: "2024-06-27",
      time: "19:00",
      duration: "1h 30min",
      type: "online",
      location: "Zoom",
      instructor: "Dr. Sarah Connor",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Prova Final - AI & Machine Learning",
      date: "2024-06-28",
      time: "10:00",
      duration: "2h",
      type: "online",
      location: "Plataforma JHAMS",
      instructor: "Dr. Emily Chen",
      color: "bg-red-500"
    },
    {
      id: 4,
      title: "Workshop - Blockchain Development",
      date: "2024-06-29",
      time: "15:00",
      duration: "3h",
      type: "presencial",
      location: "Auditório Principal",
      instructor: "David Kim",
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Mentoria Individual",
      date: "2024-06-30",
      time: "16:00",
      duration: "1h",
      type: "online",
      location: "Google Meet",
      instructor: "Alex Rodriguez",
      color: "bg-yellow-500"
    }
  ];

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasEvent = (date) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return events.some(event => event.date === dateStr);
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const toggleChecklistItem = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-muted-foreground';
    }
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold neon-text">Calendário</h1>
          <p className="text-muted-foreground">Organize sua agenda de estudos e atividades</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateMonth(-1)}
                        className="cyber-border"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigateMonth(1)}
                        className="cyber-border"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {daysOfWeek.map(day => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth(currentDate).map((date, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: date ? 1.05 : 1 }}
                        whileTap={{ scale: date ? 0.95 : 1 }}
                        className={`
                          relative h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all
                          ${date ? 'hover:bg-muted' : ''}
                          ${isToday(date) ? 'bg-primary text-primary-foreground' : ''}
                          ${isSelected(date) ? 'ring-2 ring-primary' : ''}
                          ${hasEvent(date) ? 'bg-accent/20' : ''}
                        `}
                        onClick={() => date && setSelectedDate(date)}
                      >
                        {date && (
                          <>
                            <span className="text-sm font-medium">{date.getDate()}</span>
                            {hasEvent(date) && (
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                <div className="w-1 h-1 bg-primary rounded-full"></div>
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Selected Date Events */}
            {selectedDateEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <Card className="cyber-border">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Eventos - {selectedDate.toLocaleDateString('pt-BR')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div key={event.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border">
                        <div className={`w-3 h-3 rounded-full ${event.color} mt-2`}></div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{event.title}</h4>
                            <Badge className={event.type === 'online' ? 'bg-green-500' : 'bg-blue-500'}>
                              {event.type === 'online' ? (
                                <><Monitor className="w-3 h-3 mr-1" /> Online</>
                              ) : (
                                <><MapPin className="w-3 h-3 mr-1" /> Presencial</>
                              )}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time} ({event.duration})
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.instructor}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Event Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button className="w-full cyber-button cyber-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Evento
              </Button>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/20">
                      <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('pt-BR')} às {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Checklist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Lista de Tarefas
                  </CardTitle>
                  <CardDescription>
                    Acompanhe suas atividades e prazos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {checklist.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleChecklistItem(item.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1">
                        <p className={`text-sm font-medium ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {item.task}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Prazo: {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                          </p>
                          <div className="flex items-center space-x-1">
                            {item.priority === 'high' && <AlertCircle className={`w-3 h-3 ${getPriorityColor(item.priority)}`} />}
                            {item.completed && <CheckCircle className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;

