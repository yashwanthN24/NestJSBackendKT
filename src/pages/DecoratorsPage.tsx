import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Crown, Briefcase, Calculator, MousePointer } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const DecoratorsPage = () => {
  const [selectedDesk, setSelectedDesk] = useState(null);

  const officeDesks = [
    {
      id: 'manager',
      name: 'Rajesh Kumar',
      role: '@Manager',
      decorator: '@Controller',
      description: 'Makes important decisions and delegates work',
      responsibilities: ['Route requests', 'Handle HTTP methods', 'Coordinate responses'],
      icon: Crown,
      color: 'bg-purple-500',
      x: 20,
      y: 20
    },
    {
      id: 'accountant',
      name: 'Priya Sharma',
      role: '@Accountant',
      decorator: '@Injectable',
      description: 'Handles all financial calculations and records',
      responsibilities: ['Business logic', 'Data processing', 'Calculations'],
      icon: Calculator,
      color: 'bg-blue-500',
      x: 60,
      y: 20
    },
    {
      id: 'peon',
      name: 'Ramesh',
      role: '@Peon',
      decorator: '@Repository',
      description: 'Fetches files and documents from storage',
      responsibilities: ['Data access', 'File retrieval', 'Storage management'],
      icon: Briefcase,
      color: 'bg-green-500',
      x: 40,
      y: 60
    }
  ];

  const decoratorExamples = [
    {
      name: '@Controller',
      purpose: 'Defines a class as a request handler',
      analogy: 'Like a @Manager desk label',
      code: `@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'All users';
  }
}`
    },
    {
      name: '@Injectable',
      purpose: 'Marks a class as a service that can be injected',
      analogy: 'Like an @Accountant desk label',
      code: `@Injectable()
export class UsersService {
  findAll() {
    return ['user1', 'user2'];
  }
}`
    },
    {
      name: '@Get/@Post',
      purpose: 'Defines HTTP method for a route',
      analogy: 'Like specifying "Morning Shift" or "Evening Shift"',
      code: `@Get('profile')
getProfile() {
  return 'User profile';
}

@Post('create')
createUser() {
  return 'User created';
}`
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-8 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Decorators
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Office desk labels that define roles 🏷️
          </p>
          <p className="text-gray-500">
            Just like name plates tell you someone's job, decorators tell NestJS what a class does
          </p>
        </motion.div>

        {/* Interactive Office Layout */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Interactive Office Floor
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Click on any desk to see what that role does!
          </p>

          <div className="relative bg-white rounded-lg shadow-inner p-8 min-h-96">
            {/* Office Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B7280" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Office Desks */}
            {officeDesks.map((desk) => {
              const Icon = desk.icon;
              const isSelected = selectedDesk === desk.id;
              
              return (
                <motion.div
                  key={desk.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDesk(isSelected ? null : desk.id)}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    isSelected ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    left: `${desk.x}%`,
                    top: `${desk.y}%`
                  }}
                >
                  {/* Desk */}
                  <div className={`relative ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {/* Desk Surface */}
                    <div className="w-32 h-20 bg-yellow-100 rounded-lg shadow-lg border-4 border-yellow-200">
                      <div className="absolute inset-2 bg-white rounded border border-gray-200 flex flex-col items-center justify-center">
                        <Icon className={`w-6 h-6 ${desk.color.replace('bg-', 'text-')}`} />
                        <div className="text-xs font-semibold text-gray-700 mt-1">{desk.name}</div>
                      </div>
                    </div>
                    
                    {/* Name Plate */}
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${desk.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}>
                      {desk.role}
                    </div>
                    
                    {/* Chair */}
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full shadow-md"></div>
                  </div>
                  
                  {/* Click Indicator */}
                  {!isSelected && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                    >
                      <MousePointer className="w-4 h-4 text-orange-600" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Selected Desk Details */}
            {selectedDesk && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border-l-4 border-orange-500"
              >
                {(() => {
                  const desk = officeDesks.find(d => d.id === selectedDesk);
                  return (
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <desk.icon className={`w-6 h-6 ${desk.color.replace('bg-', 'text-')}`} />
                        <div>
                          <h3 className="font-bold text-gray-800">{desk.name}</h3>
                          <p className="text-sm text-gray-600">{desk.role} → {desk.decorator}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{desk.description}</p>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Responsibilities:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {desk.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </div>

        {/* Decorator Examples */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Common NestJS Decorators
          </h2>
          
          {decoratorExamples.map((decorator, index) => (
            <motion.div
              key={decorator.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {decorator.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {decorator.purpose}
                  </p>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Indian Office Analogy:</h4>
                    <p className="text-orange-700 text-sm">
                      {decorator.analogy}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Code Example:</h4>
                  <CodeBlock code={decorator.code} language="typescript" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Quiz */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 mt-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">
            Quick Understanding Check
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
                <Crown className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold">@Controller</h3>
              </div>
              <p className="text-sm opacity-90">Handles incoming requests and routes them</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
                <Calculator className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold">@Injectable</h3>
              </div>
              <p className="text-sm opacity-90">Provides business logic and can be injected</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-3">
                <Briefcase className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold">@Repository</h3>
              </div>
              <p className="text-sm opacity-90">Handles data access and storage operations</p>
            </div>
          </div>
        </motion.div>

        {/* Key Takeaways */}
        <div className="bg-orange-50 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Remember This!</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🏷️ Decorators are Labels</h3>
              <p className="text-gray-600 text-sm">Just like office name plates, they tell NestJS what role each class plays</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎯 They Define Behavior</h3>
              <p className="text-gray-600 text-sm">Different decorators give classes different superpowers and responsibilities</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔧 Easy to Change</h3>
              <p className="text-gray-600 text-sm">Change the decorator, change the role - like updating someone's job title</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📋 Clear Organization</h3>
              <p className="text-gray-600 text-sm">Everyone knows their role, making the codebase organized and predictable</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DecoratorsPage;