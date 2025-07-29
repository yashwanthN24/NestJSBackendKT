import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Coffee, User, ChefHat, Package } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const RequestFlowPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 'customer',
      title: 'Customer Orders',
      description: 'You walk up to the chai tapri and ask for one cutting chai',
      icon: User,
      color: 'bg-blue-500',
      position: { x: 0, y: 0 },
      technical: 'Browser sends HTTP request'
    },
    {
      id: 'chaiwala',
      title: 'Chaiwala Receives',
      description: 'The chaiwala (controller) hears your order and understands what you need',
      icon: Coffee,
      color: 'bg-green-500',
      position: { x: 200, y: 0 },
      technical: 'Controller receives and routes request'
    },
    {
      id: 'assistant',
      title: 'Assistant Makes Chai',
      description: 'The assistant (service) starts preparing your chai with the right recipe',
      icon: ChefHat,
      color: 'bg-orange-500',
      position: { x: 400, y: 0 },
      technical: 'Service processes business logic'
    },
    {
      id: 'storage',
      title: 'Gets Ingredients',
      description: 'Assistant fetches milk, sugar, and tea from storage (database)',
      icon: Package,
      color: 'bg-purple-500',
      position: { x: 600, y: 0 },
      technical: 'Repository fetches data from database'
    },
    {
      id: 'delivery',
      title: 'Chai Delivered',
      description: 'Your hot cutting chai is served back to you!',
      icon: Coffee,
      color: 'bg-red-500',
      position: { x: 0, y: 0 },
      technical: 'Response sent back to browser'
    }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, index * 1000);
    });
    
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentStep(0);
    }, steps.length * 1000);
  };

  const codeExample = `// NestJS Request Flow Example

@Controller('chai')
export class ChaiController {
  constructor(private chaiService: ChaiService) {}

  @Get('cutting')
  async orderCuttingChai(): Promise<ChaiResponse> {
    // Chaiwala receives the order
    return await this.chaiService.makeChai('cutting');
  }
}

@Injectable()
export class ChaiService {
  constructor(private ingredientsRepo: IngredientsRepository) {}

  async makeChai(type: string): Promise<ChaiResponse> {
    // Assistant prepares chai
    const ingredients = await this.ingredientsRepo.getIngredients();
    
    return {
      type,
      temperature: 'hot',
      ingredients: ingredients,
      ready: true
    };
  }
}`;

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
            Request-Response Flow
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Like ordering chai at your favorite tapri ☕
          </p>
          <p className="text-gray-500">
            Watch how a simple chai order flows through different layers
          </p>
        </motion.div>

        {/* Animation Controls */}
        <div className="flex justify-center mb-8">
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className="flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnimating ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
            <span>{isAnimating ? 'Watch the Flow...' : 'Start Animation'}</span>
          </button>
        </div>

        {/* Flow Visualization */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="relative h-96 overflow-hidden">
            {/* Background Flow Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                        refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                </marker>
              </defs>
              
              {/* Flow lines */}
              <line x1="80" y1="200" x2="280" y2="200" 
                    stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="280" y1="200" x2="480" y2="200" 
                    stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="480" y1="200" x2="680" y2="200" 
                    stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <line x1="680" y1="220" x2="100" y2="280" 
                    stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
            </svg>

            {/* Flow Steps */}
            {steps.slice(0, -1).map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === index + 1;
              const hasVisited = currentStep > index;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ scale: 0.8, opacity: 0.3 }}
                  animate={{ 
                    scale: isActive ? 1.1 : hasVisited ? 1 : 0.8,
                    opacity: isActive ? 1 : hasVisited ? 0.8 : 0.3
                  }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    isActive ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    left: `${80 + index * 200}px`,
                    top: '200px'
                  }}
                >
                  <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center shadow-lg ${
                    isActive ? 'ring-4 ring-orange-300' : ''
                  }`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center">
                    <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 max-w-32">{step.description}</p>
                  </div>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 text-center">
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded max-w-40">
                      {step.technical}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Response Indicator */}
            <AnimatePresence>
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute left-1/2 top-72 transform -translate-x-1/2"
                >
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <Coffee className="w-5 h-5" />
                    <span className="font-medium">Chai Ready! ☕</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Current Step Detail */}
            <AnimatePresence mode="wait">
              {currentStep > 0 && currentStep <= steps.length && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-100 px-6 py-4 rounded-lg"
                >
                  <p className="text-center text-gray-800 font-medium">
                    Step {currentStep}: {steps[currentStep - 1]?.description || 'Complete!'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Technical Explanation */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">The Analogy</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <User className="w-6 h-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Customer (Client)</h3>
                  <p className="text-gray-600 text-sm">You want chai, so you make a request</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Coffee className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Chaiwala (Controller)</h3>
                  <p className="text-gray-600 text-sm">Takes your order and directs it appropriately</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <ChefHat className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Assistant (Service)</h3>
                  <p className="text-gray-600 text-sm">Does the actual work of making chai</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Package className="w-6 h-6 text-purple-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Storage (Repository)</h3>
                  <p className="text-gray-600 text-sm">Where ingredients (data) are stored</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Code Example</h2>
            <CodeBlock code={codeExample} language="typescript" />
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-orange-50 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔄 Separation of Concerns</h3>
              <p className="text-gray-600 text-sm">Each layer has a specific responsibility, just like each person at the chai stall</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📦 Modularity</h3>
              <p className="text-gray-600 text-sm">Components can be changed independently - swap the assistant, but the process remains the same</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Single Responsibility</h3>
              <p className="text-gray-600 text-sm">Controllers handle requests, Services handle business logic, Repositories handle data</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔒 Predictable Flow</h3>
              <p className="text-gray-600 text-sm">Request always follows the same path, making debugging and testing easier</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestFlowPage;