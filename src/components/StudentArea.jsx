import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Award, 
  TrendingUp,
  Calendar,
  Filter,
  Search,
  Star,
  Users,
  CheckCircle,
  Target,
  Zap
} from 'lucide-react';

const StudentArea = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const enrolledCourses = [
    {
      id: 1,
      title: "Cybersecurity Fundamentals",
      instructor: "Dr. Sarah Connor",
      progress: 65,
      totalLessons: 51,
      completedLessons: 33,
      nextLesson: "Módulo 3: Análise de Vulnerabilidades",
      timeSpent: "24h 30min",
      status: "in_progress",
      category: "security",
      rating: 4.8,
      certificate: false
    },
    {
      id: 2,
      title: "Game Development with Unity",
      instructor: "Marcus Johnson",
      progress: 100,
      totalLessons: 68,
      completedLessons: 68,
      nextLesson: "Curso Concluído",
      timeSpent: "45h 15min",
      status: "completed",
      category: "gamedev",
      rating: 4.9,
      certificate: true
    },
    {
      id: 3,
      title: "AI & Machine Learning",
      instructor: "Dr. Emily Chen",
      progress: 25,
      totalLessons: 42,
      completedLessons: 11,
      nextLesson: "Módulo 2: Redes Neurais",
      timeSpent: "8h 45min",
      status: "in_progress",
      category: "ai",
      rating: 4.6,
      certificate: false
    }
  ];

  const achievements = [
    { id: 1, title: "Primeiro Curso", description: "Completou seu primeiro curso", icon: "🎯", unlocked: true },
    { id: 2, title: "Estudante Dedicado", description: "7 dias consecutivos estudando", icon: "🔥", unlocked: true },
    { id: 3, title: "Expert em Cyber", description: "Completou 3 cursos de cybersecurity", icon: "🛡️", unlocked: false },
    { id: 4, title: "Game Master", description: "Completou trilha de Game Development", icon: "🎮", unlocked: true }
  ];

  const weeklyStats = [
    { day: "Seg", hours: 2.5 },
    { day: "Ter", hours: 1.8 },
    { day: "Qua", hours: 3.2 },
    { day: "Qui", hours: 2.1 },
    { day: "Sex", hours: 4.0 },
    { day: "Sáb", hours: 1.5 },
    { day: "Dom", hours: 2.8 }
  ];

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalHours = enrolledCourses.reduce((acc, course) => {
    const hours = parseFloat(course.timeSpent.split('h')[0]);
    return acc + hours;
  }, 0);

  const completedCourses = enrolledCourses.filter(course => course.status === 'completed').length;
  const averageProgress = enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold neon-text">Área do Aluno</h1>
          <p className="text-muted-foreground">Acompanhe seu progresso e continue aprendendo</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="cyber-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Inscritos</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{enrolledCourses.length}</div>
            </CardContent>
          </Card>

          <Card className="cyber-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cursos Concluídos</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{completedCourses}</div>
            </CardContent>
          </Card>

          <Card className="cyber-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Horas Estudadas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{totalHours.toFixed(1)}h</div>
            </CardContent>
          </Card>

          <Card className="cyber-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{Math.round(averageProgress)}%</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar cursos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 cyber-border"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48 cyber-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os cursos</SelectItem>
                    <SelectItem value="in_progress">Em andamento</SelectItem>
                    <SelectItem value="completed">Concluídos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Enrolled Courses */}
            <div className="space-y-4">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card className="cyber-border card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            {course.certificate && (
                              <Badge className="bg-yellow-500 text-yellow-900">
                                <Award className="w-3 h-3 mr-1" />
                                Certificado
                              </Badge>
                            )}
                          </div>
                          <CardDescription>Instrutor: {course.instructor}</CardDescription>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.timeSpent}
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          variant={course.status === 'completed' ? 'default' : 'secondary'}
                          className={course.status === 'completed' ? 'bg-green-500' : ''}
                        >
                          {course.status === 'completed' ? 'Concluído' : 'Em andamento'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          {course.completedLessons} de {course.totalLessons} aulas concluídas
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Próxima aula:</p>
                          <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
                        </div>
                        <Button 
                          className="cyber-button cyber-gradient"
                          disabled={course.status === 'completed'}
                        >
                          {course.status === 'completed' ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Concluído
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Continuar
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Atividade Semanal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyStats.map((stat, index) => (
                      <div key={stat.day} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{stat.day}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(stat.hours / 4) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {stat.hours}h
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Conquistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((achievement) => (
                      <div 
                        key={achievement.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg border ${
                          achievement.unlocked 
                            ? 'border-primary/50 bg-primary/10' 
                            : 'border-muted bg-muted/20 opacity-50'
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start cyber-border">
                    <Calendar className="w-4 h-4 mr-2" />
                    Ver Agenda
                  </Button>
                  <Button variant="outline" className="w-full justify-start cyber-border">
                    <Target className="w-4 h-4 mr-2" />
                    Definir Metas
                  </Button>
                  <Button variant="outline" className="w-full justify-start cyber-border">
                    <Users className="w-4 h-4 mr-2" />
                    Comunidade
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentArea;

