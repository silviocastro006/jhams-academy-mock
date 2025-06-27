import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Award,
  CheckCircle,
  ArrowLeft,
  Monitor,
  MapPin,
  Calendar,
  User
} from 'lucide-react';

const CourseDetail = ({ course, onBack, onEnroll, onStartCourse, isEnrolled = false }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const courseModules = [
    {
      id: 1,
      title: "Introdução aos Conceitos Fundamentais",
      duration: "2h 30min",
      lessons: 8,
      completed: isEnrolled ? 8 : 0
    },
    {
      id: 2,
      title: "Ferramentas e Tecnologias Essenciais",
      duration: "3h 15min",
      lessons: 12,
      completed: isEnrolled ? 5 : 0
    },
    {
      id: 3,
      title: "Projeto Prático - Parte 1",
      duration: "4h 00min",
      lessons: 10,
      completed: isEnrolled ? 0 : 0
    },
    {
      id: 4,
      title: "Conceitos Avançados",
      duration: "3h 45min",
      lessons: 15,
      completed: 0
    },
    {
      id: 5,
      title: "Projeto Final e Certificação",
      duration: "2h 30min",
      lessons: 6,
      completed: 0
    }
  ];

  const totalLessons = courseModules.reduce((acc, module) => acc + module.lessons, 0);
  const completedLessons = courseModules.reduce((acc, module) => acc + module.completed, 0);
  const progressPercentage = isEnrolled ? (completedLessons / totalLessons) * 100 : 0;

  const courseFeatures = [
    "Acesso vitalício ao conteúdo",
    "Certificado de conclusão",
    "Suporte direto com instrutor",
    "Projetos práticos",
    "Comunidade exclusiva",
    "Material complementar"
  ];

  const prerequisites = [
    "Conhecimento básico de programação",
    "Familiaridade com conceitos de tecnologia",
    "Computador com acesso à internet",
    "Dedicação de 5-8 horas por semana"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <Badge className={course.type === 'online' ? 'bg-green-500' : 'bg-blue-500'}>
                    {course.type === 'online' ? (
                      <><Monitor className="w-3 h-3 mr-1" /> Online</>
                    ) : (
                      <><MapPin className="w-3 h-3 mr-1" /> Presencial</>
                    )}
                  </Badge>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                
                <h1 className="text-4xl font-bold neon-text">{course.title}</h1>
                <p className="text-xl text-muted-foreground">{course.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {course.instructor}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students} alunos
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </span>
                </div>

                {isEnrolled && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso do curso</span>
                      <span>{Math.round(progressPercentage)}% concluído</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {completedLessons} de {totalLessons} aulas concluídas
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Course Preview/Enrollment */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="cyber-border sticky top-24">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                      <Play className="w-16 h-16 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Button size="lg" className="cyber-button cyber-gradient">
                        <Play className="w-6 h-6 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    {!isEnrolled ? (
                      <Button 
                        size="lg" 
                        className="w-full cyber-button cyber-gradient text-primary-foreground"
                        onClick={onEnroll}
                      >
                        Inscrever-se no Curso
                      </Button>
                    ) : (
                      <Button 
                        size="lg" 
                        className="w-full cyber-button cyber-gradient text-primary-foreground"
                        onClick={onStartCourse}
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Continuar Curso
                      </Button>
                    )}
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duração:</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Aulas:</span>
                        <span>{totalLessons} aulas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nível:</span>
                        <span>Intermediário</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Idioma:</span>
                        <span>Português</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 cyber-border">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="curriculum">Currículo</TabsTrigger>
            <TabsTrigger value="instructor">Instrutor</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="cyber-border">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      O que você vai aprender
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {courseFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="cyber-border">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Pré-requisitos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {prerequisites.map((prerequisite, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span>{prerequisite}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <CardTitle>Descrição do Curso</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-invert max-w-none">
                  <p>
                    Este curso abrangente foi projetado para levar você do básico ao avançado em {course.title.toLowerCase()}. 
                    Com uma abordagem prática e hands-on, você desenvolverá projetos reais que podem ser adicionados ao seu portfólio.
                  </p>
                  <p>
                    Nosso instrutor experiente, {course.instructor}, guiará você através de cada conceito com explicações claras 
                    e exemplos práticos. O curso inclui exercícios interativos, projetos desafiadores e acesso a uma comunidade 
                    ativa de estudantes e profissionais.
                  </p>
                  <p>
                    Ao final do curso, você terá as habilidades necessárias para aplicar os conhecimentos adquiridos em 
                    projetos profissionais e estará preparado para avançar em sua carreira na área de tecnologia.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-6">
            {courseModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cyber-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Módulo {module.id}: {module.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {module.duration}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {module.lessons} aulas
                        </span>
                      </div>
                    </div>
                    {isEnrolled && (
                      <div className="space-y-2">
                        <Progress 
                          value={(module.completed / module.lessons) * 100} 
                          className="h-2" 
                        />
                        <p className="text-sm text-muted-foreground">
                          {module.completed} de {module.lessons} aulas concluídas
                        </p>
                      </div>
                    )}
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="instructor" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="cyber-border">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{course.instructor}</CardTitle>
                      <CardDescription>Instrutor Principal</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    {course.instructor} é um especialista reconhecido na área com mais de 10 anos de experiência 
                    em desenvolvimento e ensino. Possui certificações avançadas e já treinou mais de 5.000 
                    profissionais ao redor do mundo.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">10+</div>
                      <div className="text-sm text-muted-foreground">Anos de experiência</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">5K+</div>
                      <div className="text-sm text-muted-foreground">Alunos treinados</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4.9</div>
                      <div className="text-sm text-muted-foreground">Avaliação média</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">25</div>
                      <div className="text-sm text-muted-foreground">Cursos criados</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((review) => (
                <motion.div
                  key={review}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: review * 0.1 }}
                >
                  <Card className="cyber-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold">Aluno {review}</span>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Excelente curso! O instrutor explica de forma muito clara e os projetos práticos 
                        realmente ajudam a fixar o conteúdo. Recomendo para todos que querem aprender {course.title.toLowerCase()}.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;

