import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  Play, 
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Settings,
  Maximize,
  Download,
  BookOpen,
  FileText,
  CheckCircle,
  Circle,
  Clock,
  Star,
  MessageCircle,
  ThumbsUp,
  Share,
  ArrowLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

const WatchCourse = ({ course, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(1800); // 30 minutes
  const [volume, setVolume] = useState(80);
  const [selectedLesson, setSelectedLesson] = useState(1);
  const [expandedModule, setExpandedModule] = useState(1);

  const courseModules = [
    {
      id: 1,
      title: "Introdução aos Conceitos Fundamentais",
      duration: "2h 30min",
      lessons: [
        { id: 1, title: "O que é Cybersecurity?", duration: "15:30", completed: true, type: "video" },
        { id: 2, title: "Tipos de Ameaças Digitais", duration: "22:45", completed: true, type: "video" },
        { id: 3, title: "Princípios da Segurança", duration: "18:20", completed: false, type: "video" },
        { id: 4, title: "Exercício Prático 1", duration: "30:00", completed: false, type: "exercise" },
        { id: 5, title: "Material de Leitura", duration: "45:00", completed: false, type: "reading" }
      ]
    },
    {
      id: 2,
      title: "Ferramentas e Tecnologias Essenciais",
      duration: "3h 15min",
      lessons: [
        { id: 6, title: "Ferramentas de Análise", duration: "25:30", completed: false, type: "video" },
        { id: 7, title: "Configuração do Ambiente", duration: "35:15", completed: false, type: "video" },
        { id: 8, title: "Hands-on Lab", duration: "60:00", completed: false, type: "lab" }
      ]
    },
    {
      id: 3,
      title: "Projeto Prático - Parte 1",
      duration: "4h 00min",
      lessons: [
        { id: 9, title: "Planejamento do Projeto", duration: "20:00", completed: false, type: "video" },
        { id: 10, title: "Implementação", duration: "120:00", completed: false, type: "project" }
      ]
    }
  ];

  const currentLesson = courseModules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.id === selectedLesson);

  const materials = [
    {
      id: 1,
      title: "Slides da Aula - Introdução",
      type: "pdf",
      size: "2.5 MB",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Checklist de Segurança",
      type: "pdf",
      size: "1.2 MB",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Código de Exemplo",
      type: "zip",
      size: "856 KB",
      downloadUrl: "#"
    }
  ];

  const exercises = [
    {
      id: 1,
      title: "Quiz - Conceitos Básicos",
      description: "Teste seus conhecimentos sobre os fundamentos de cybersecurity",
      questions: 10,
      timeLimit: "15 min",
      attempts: 3,
      completed: true,
      score: 85
    },
    {
      id: 2,
      title: "Laboratório Virtual",
      description: "Pratique técnicas de análise de vulnerabilidades",
      timeLimit: "60 min",
      attempts: 1,
      completed: false
    },
    {
      id: 3,
      title: "Projeto Final",
      description: "Desenvolva um plano de segurança completo",
      timeLimit: "Sem limite",
      attempts: 1,
      completed: false
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return (currentTime / duration) * 100;
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'exercise': return <CheckCircle className="w-4 h-4" />;
      case 'reading': return <BookOpen className="w-4 h-4" />;
      case 'lab': return <Settings className="w-4 h-4" />;
      case 'project': return <FileText className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getLessonTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-blue-500';
      case 'exercise': return 'text-green-500';
      case 'reading': return 'text-purple-500';
      case 'lab': return 'text-orange-500';
      case 'project': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Button variant="ghost" onClick={onBack} className="cyber-border">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Curso
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold neon-text">Cybersecurity Fundamentals</h1>
            <p className="text-muted-foreground">{currentLesson?.title}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="cyber-border">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="cyber-border">
              <ThumbsUp className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="cyber-border">
              {/* Video Area */}
              <div className="relative bg-black rounded-t-lg aspect-video flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg"></div>
                <Button
                  size="lg"
                  onClick={togglePlay}
                  className="relative z-10 cyber-button cyber-gradient"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                
                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-2">
                    <Progress value={getProgressPercentage()} className="h-1" />
                    <div className="flex items-center justify-between text-white text-sm">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={togglePlay}>
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Volume2 className="w-4 h-4" />
                          <div className="w-20 bg-white/20 rounded-full h-1">
                            <div 
                              className="bg-white h-1 rounded-full" 
                              style={{ width: `${volume}%` }}
                            />
                          </div>
                        </div>
                        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{currentLesson?.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {currentLesson?.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        4.8
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        12 comentários
                      </span>
                    </div>
                  </div>
                  <Button className="cyber-button cyber-gradient">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="materials" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 cyber-border">
                    <TabsTrigger value="materials">Material</TabsTrigger>
                    <TabsTrigger value="exercises">Exercícios</TabsTrigger>
                    <TabsTrigger value="notes">Anotações</TabsTrigger>
                  </TabsList>

                  <TabsContent value="materials" className="space-y-4">
                    {materials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-muted-foreground">{material.type.toUpperCase()} • {material.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="cyber-border">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="exercises" className="space-y-4">
                    {exercises.map((exercise) => (
                      <Card key={exercise.id} className="cyber-border">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{exercise.title}</CardTitle>
                            {exercise.completed && (
                              <Badge className="bg-green-500">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Concluído
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{exercise.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              {exercise.questions && (
                                <span>{exercise.questions} questões</span>
                              )}
                              <span>{exercise.timeLimit}</span>
                              <span>{exercise.attempts} tentativa(s)</span>
                              {exercise.score && (
                                <span className="text-green-500 font-medium">Nota: {exercise.score}%</span>
                              )}
                            </div>
                            <Button 
                              className="cyber-button cyber-gradient"
                              disabled={exercise.completed}
                            >
                              {exercise.completed ? 'Concluído' : 'Iniciar'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="notes" className="space-y-4">
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Suas anotações aparecerão aqui</p>
                      <Button className="mt-4 cyber-button cyber-gradient">
                        Adicionar Anotação
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="cyber-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Conteúdo do Curso
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-2 p-4">
                    {courseModules.map((module) => (
                      <div key={module.id} className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-3 h-auto"
                          onClick={() => setExpandedModule(
                            expandedModule === module.id ? null : module.id
                          )}
                        >
                          <div className="text-left">
                            <p className="font-medium">{module.title}</p>
                            <p className="text-sm text-muted-foreground">{module.duration}</p>
                          </div>
                          {expandedModule === module.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>

                        {expandedModule === module.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1 ml-4"
                          >
                            {module.lessons.map((lesson) => (
                              <Button
                                key={lesson.id}
                                variant={selectedLesson === lesson.id ? "default" : "ghost"}
                                className={`w-full justify-start p-3 h-auto ${
                                  selectedLesson === lesson.id ? 'cyber-gradient' : ''
                                }`}
                                onClick={() => setSelectedLesson(lesson.id)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={getLessonTypeColor(lesson.type)}>
                                    {lesson.completed ? (
                                      <CheckCircle className="w-4 h-4" />
                                    ) : (
                                      getLessonIcon(lesson.type)
                                    )}
                                  </div>
                                  <div className="text-left flex-1">
                                    <p className="font-medium text-sm">{lesson.title}</p>
                                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                  </div>
                                </div>
                              </Button>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WatchCourse;

