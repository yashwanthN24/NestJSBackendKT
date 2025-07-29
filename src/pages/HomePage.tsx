import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Workflow, Tag, Package, Database, Shield, Users } from 'lucide-react';

const HomePage = () => {
  const concepts = [
    {
      path: '/request-flow',
      title: 'Request-Response Flow',
      description: 'Like ordering chai at your favorite tapri',
      icon: Workflow,
      analogy: 'Customer → Chaiwala → Assistant → Storage',
      color: 'bg-blue-500',
      emoji: '☕'
    },
    {
      path: '/decorators',
      title: 'Decorators',
      description: 'Office desk labels that define roles',
      icon: Tag,
      analogy: '@Manager, @Peon, @Accountant',
      color: 'bg-green-500',
      emoji: '🏷️'
    },
    {
      path: '/di',
      title: 'Dependency Injection',
      description: 'Shared gas cylinder in PG hostel',
      icon: Package,
      analogy: 'One cylinder → Multiple burners',
      color: 'bg-purple-500',
      emoji: '🔥'
    },
    {
      path: '/modules',
      title: 'Modules & Architecture',
      description: 'Swiggy delivery system organization',
      icon: Database,
      analogy: 'Kitchen → Order-taker → Chef → Storage',
      color: 'bg-orange-500',
      emoji: '🏪'
    },
    {
      path: '/rls',
      title: 'Row-Level Security',
      description: 'IRCTC - see only your bookings',
      icon: Shield,
      analogy: 'Your login → Your tickets only',
      color: 'bg-red-500',
      emoji: '🎫'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4">
              <span className="text-orange-600">NestJS</span> Thali
            </h1>
            <div className="text-6xl mb-6">🍛</div>
            <p className="text-xl md:text-2xl text-gray-600 mb-2">
              Backend concepts served with Indian flavor
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Learn NestJS through familiar analogies and visual storytelling designed for Indian developers
            </p>
          </motion.div>

          {/* Audience Cards */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { icon: Users, title: 'College Students', desc: 'Starting backend development' },
              { icon: Users, title: 'New Hires', desc: 'Backend role beginners' },
              { icon: Users, title: 'Non-Technical', desc: 'Product & QA teams' }
            ].map((audience, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <audience.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">{audience.title}</h3>
                <p className="text-sm text-gray-600">{audience.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Thali Visualization */}
      <motion.section variants={itemVariants} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Your Complete NestJS Thali
          </h2>
          
          <div className="relative">
            {/* Thali Plate */}
            <div className="w-96 h-96 mx-auto relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full border-8 border-orange-200 shadow-2xl">
              {/* Center Logo */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🍛</span>
              </div>
              
              {/* Concept Bowls */}
              {concepts.map((concept, index) => {
                const angle = (index * 72) - 90; // 360/5 = 72 degrees
                const radius = 140;
                const x = Math.cos(angle * Math.PI / 180) * radius;
                const y = Math.sin(angle * Math.PI / 180) * radius;
                
                return (
                  <motion.div
                    key={concept.path}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                    className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  >
                    <Link to={concept.path}>
                      <div className="bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <span className="text-2xl">{concept.emoji}</span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {concept.title}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Concept Cards */}
      <motion.section variants={itemVariants} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What's on the Menu?
          </h2>
          
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {concepts.map((concept, index) => (
              <motion.div
                key={concept.path}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <Link to={concept.path} className="block">
                  <div className={`${concept.color} h-2`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-3">{concept.emoji}</div>
                      <concept.icon className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {concept.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3">
                      {concept.description}
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700 font-mono">
                        {concept.analogy}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-orange-600 font-medium">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section variants={itemVariants} className="py-16 px-4 bg-orange-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Master NestJS?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start your journey with familiar Indian analogies and interactive examples
          </p>
          <Link
            to="/request-flow"
            className="inline-flex items-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Begin Your Journey <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomePage;