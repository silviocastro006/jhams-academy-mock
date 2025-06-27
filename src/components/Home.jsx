import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Monitor
} from 'lucide-react';

const Home = ({ onCourseSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredCourses = [
    {
      id: 1,
      title: "Cybersecurity Fundamentals",
      description: "Aprenda os fundamentos de segurança cibernética",
      image: "/api/placeholder/400/250",
      instructor: "Dr. Sarah Connor",
      duration: "8 semanas",
      students: 1250,
      rating: 4.8,
      type: "online",
      category: "security"
    },
    {
      id: 2,
      title: "Game Development with Unity",
      description: "Crie jogos incríveis usando Unity e C#",
      image: "/api/placeholder/400/250",
      instructor: "Marcus Johnson",
      duration: "12 semanas",
      students: 890,
      rating: 4.9,
      type: "presencial",
      category: "gamedev"
    },
    {
      id: 3,
      title: "Ethical Hacking Bootcamp",
      description: "Torne-se um hacker ético certificado",
      image: "/api/placeholder/400/250",
      instructor: "Alex Rodriguez",
      duration: "16 semanas",
      students: 2100,
      rating: 4.7,
      type: "online",
      category: "security"
    }
  ];

  const courses = [
    ...featuredCourses,
    {
      id: 4,
      title: "AI & Machine Learning",
      description: "Inteligência artificial aplicada a games",
      image: "/api/placeholder/400/250",
      instructor: "Dr. Emily Chen",
      duration: "10 semanas",
      students: 756,
      rating: 4.6,
      type: "online",
      category: "ai"
    },
    {
      id: 5,
      title: "Blockchain Development",
      description: "Desenvolva aplicações descentralizadas",
      image: "/api/placeholder/400/250",
      instructor: "David Kim",
      duration: "14 semanas",
      students: 432,
      rating: 4.5,
      type: "presencial",
      category: "blockchain"
    },
    {
      id: 6,
      title: "3D Modeling & Animation",
      description: "Crie modelos 3D para jogos e animações",
      image: "/api/placeholder/400/250",
      instructor: "Maria Santos",
      duration: "6 semanas",
      students: 1100,
      rating: 4.8,
      type: "online",
      category: "design"
    }
  ];

  const learningPaths = [
    { name: "Cybersecurity Expert", courses: 8, color: "bg-red-500" },
    { name: "Game Developer", courses: 12, color: "bg-blue-500" },
    { name: "AI Specialist", courses: 6, color: "bg-purple-500" },
    { name: "Blockchain Developer", courses: 5, color: "bg-green-500" }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
              JHAMS Academy
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Domine as tecnologias do futuro com nossos cursos de gaming, cybersecurity e desenvolvimento
            </p>
            <Button size="lg" className="cyber-button cyber-gradient text-primary-foreground">
              Explorar Cursos
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Carousel */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Cursos em Destaque
          </motion.h2>
          
          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredCourses.map((course, index) => (
                  <div key={course.id} className="w-full flex-shrink-0">
                    <Card className="mx-4 cyber-border card-hover cursor-pointer" onClick={() => onCourseSelect(course)}>
                      <div className="relative">
                        <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                          <Play className="w-16 h-16 text-primary" />
                        </div>
                        <Badge className={`absolute top-4 right-4 ${course.type === 'online' ? 'bg-green-500' : 'bg-blue-500'}`}>
                          {course.type === 'online' ? (
                            <><Monitor className="w-3 h-3 mr-1" /> Online</>
                          ) : (
                            <><MapPin className="w-3 h-3 mr-1" /> Presencial</>
                          )}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {course.duration}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {course.students}
                            </span>
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 cyber-border"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cyber-border"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
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
            
            <div className="flex items-center space-x-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 cyber-border">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="security">Cybersecurity</SelectItem>
                  <SelectItem value="gamedev">Game Development</SelectItem>
                  <SelectItem value="ai">Inteligência Artificial</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="design">Design & 3D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-8"
          >
            Todos os Cursos
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="cyber-border card-hover cursor-pointer h-full" onClick={() => onCourseSelect(course)}>
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary" />
                    </div>
                    <Badge className={`absolute top-4 right-4 ${course.type === 'online' ? 'bg-green-500' : 'bg-blue-500'}`}>
                      {course.type === 'online' ? (
                        <><Monitor className="w-3 h-3 mr-1" /> Online</>
                      ) : (
                        <><MapPin className="w-3 h-3 mr-1" /> Presencial</>
                      )}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Instrutor: {course.instructor}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            Trilhas de Aprendizado
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="cyber-border card-hover cursor-pointer text-center">
                  <CardHeader>
                    <div className={`w-16 h-16 ${path.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">{path.courses}</span>
                    </div>
                    <CardTitle className="text-lg">{path.name}</CardTitle>
                    <CardDescription>{path.courses} cursos</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 neon-text">JHAMS Academy</h3>
            <p className="text-muted-foreground mb-6">
              Conecte-se conosco nas redes sociais
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon" className="cyber-border">
                <span className="sr-only">LinkedIn</span>
                💼
              </Button>
              <Button variant="outline" size="icon" className="cyber-border">
                <span className="sr-only">Twitter</span>
                🐦
              </Button>
              <Button variant="outline" size="icon" className="cyber-border">
                <span className="sr-only">Discord</span>
                🎮
              </Button>
              <Button variant="outline" size="icon" className="cyber-border">
                <span className="sr-only">YouTube</span>
                📺
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground">
              © 2024 JHAMS Academy. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

