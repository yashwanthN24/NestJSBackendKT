import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Home, Users, CheckCircle, XCircle, Zap } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const DIPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [gasConnected, setGasConnected] = useState(true);

  const rooms = [
    { id: 'room1', name: 'Rajesh', position: { x: 20, y: 30 }, cooking: 'Aloo Paratha' },
    { id: 'room2', name: 'Priya', position: { x: 70, y: 30 }, cooking: 'Maggi' },
    { id: 'room3', name: 'Amit', position: { x: 20, y: 70 }, cooking: 'Chai' },
    { id: 'room4', name: 'Neha', position: { x: 70, y: 70 }, cooking: 'Dal Rice' }
  ];

  const codeExamples = {
    without: `// Without Dependency Injection (Everyone brings their own gas)
class ChaiService {
  constructor() {
    this.database = new Database(); // Creates new instance every time
    this.logger = new Logger();     // Creates new instance every time
  }
}

class UserService {
  constructor() {
    this.database = new Database(); // Another new instance!
    this.logger = new Logger();     // Another new instance!
  }
}`,
    with: `// With Dependency Injection (Shared gas cylinder)
@Injectable()
class DatabaseService {
  // Single instance shared across the app
}

@Injectable()
class ChaiService {
  constructor(
    private database: DatabaseService, // Injected, not created
    private logger: LoggerService      // Injected, not created
  ) {}
}

@Injectable()
class UserService {
  constructor(
    private database: DatabaseService, // Same instance as ChaiService
    private logger: LoggerService      // Same instance as ChaiService
  ) {}
}`
  };

  const benefits = [
    {
      title: 'Reusability',
      description: 'One gas cylinder serves multiple rooms',
      technical: 'Single service instance used across multiple classes',
      icon: '♻️'
    },
    {
      title: 'Cost Effective',
      description: 'No need to buy separate cylinders',
      technical: 'Reduced memory usage and initialization overhead',
      icon: '💰'
    },
    {
      title: 'Easy Maintenance',
      description: 'Fix one cylinder, everyone benefits',
      technical: 'Update service logic in one place, affects all consumers',
      icon: '🔧'
    },
    {
      title: 'Testing',
      description: 'Easy to replace with test cylinder',
      technical: 'Simple to mock dependencies for unit testing',
      icon: '🧪'
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
            Dependency Injection
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Shared gas cylinder in PG hostel 🔥
          </p>
          <p className="text-gray-500">
            One resource, multiple users - that's the magic of dependency injection
          </p>
        </motion.div>

        {/* Interactive PG Hostel */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              PG Hostel Kitchen Setup
            </h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setGasConnected(!gasConnected)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  gasConnected 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}
              >
                {gasConnected ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>Gas {gasConnected ? 'Connected' : 'Disconnected'}</span>
              </button>
            </div>
          </div>

          <div className="relative bg-white rounded-lg shadow-inner p-8 min-h-96">
            {/* Central Gas Cylinder */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <div className={`w-16 h-20 rounded-lg flex flex-col items-center justify-center shadow-lg ${
                gasConnected ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                <Zap className="w-8 h-8 text-white mb-1" />
                <span className="text-white text-xs font-bold">GAS</span>
              </div>
              
              {gasConnected && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full"
                />
              )}
            </motion.div>

            {/* Gas Pipes */}
            <svg className="absolute inset-0 w-full h-full">
              {rooms.map((room, index) => {
                const centerX = 50;
                const centerY = 50;
                
                return (
                  <motion.line
                    key={room.id}
                    x1={`${centerX}%`}
                    y1={`${centerY}%`}
                    x2={`${room.position.x}%`}
                    y2={`${room.position.y}%`}
                    stroke={gasConnected ? "#3B82F6" : "#9CA3AF"}
                    strokeWidth="3"
                    strokeDasharray="10,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  />
                );
              })}
            </svg>

            {/* Rooms */}
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${room.position.x}%`,
                  top: `${room.position.y}%`
                }}
              >
                <div className={`relative ${selectedRoom === room.id ? 'scale-110' : ''} transition-transform`}>
                  {/* Room */}
                  <div className="w-20 h-16 bg-orange-200 rounded-lg shadow-lg border-2 border-orange-300 flex flex-col items-center justify-center">
                    <Home className="w-6 h-6 text-orange-700 mb-1" />
                    <span className="text-xs font-semibold text-orange-800">{room.name}</span>
                  </div>
                  
                  {/* Cooking Stove */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      animate={gasConnected ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className={`w-8 h-6 rounded-full flex items-center justify-center ${
                        gasConnected ? 'bg-red-500' : 'bg-gray-400'
                      }`}
                    >
                      <Flame className={`w-4 h-4 ${gasConnected ? 'text-yellow-300' : 'text-gray-600'}`} />
                    </motion.div>
                  </div>
                </div>
                
                {/* Room Details */}
                <AnimatePresence>
                  {selectedRoom === room.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-3 text-center min-w-24"
                    >
                      <p className="text-sm font-semibold text-gray-800">{room.name}</p>
                      <p className="text-xs text-gray-600">Cooking: {room.cooking}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {gasConnected ? '🔥 Gas Available' : '❌ No Gas'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-700">
              <span className="font-semibold">The Magic:</span> One gas cylinder powers all rooms. 
              When it runs out, everyone is affected. When it's refilled, everyone benefits!
            </p>
          </div>
        </div>

        {/* Code Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
              <XCircle className="w-5 h-5 mr-2" />
              Without DI (Everyone brings own gas)
            </h3>
            <CodeBlock code={codeExamples.without} language="typescript" />
            <div className="mt-4 space-y-2">
              <p className="text-red-700 text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Multiple instances created
              </p>
              <p className="text-red-700 text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Wasteful memory usage
              </p>
              <p className="text-red-700 text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-2" />
                Hard to test and modify
              </p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              With DI (Shared gas cylinder)
            </h3>
            <CodeBlock code={codeExamples.with} language="typescript" />
            <div className="mt-4 space-y-2">
              <p className="text-green-700 text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Single instance shared
              </p>
              <p className="text-green-700 text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Efficient resource usage
              </p>
              <p className="text-green-700 text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Easy to test and mock
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Dependency Injection is Amazing
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 mb-3 text-sm">{benefit.description}</p>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-800">{benefit.technical}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-world Analogy Extension */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">More Real-World Examples</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🚰</div>
              <h3 className="font-bold mb-2">Water Supply</h3>
              <p className="text-sm opacity-90">
                One water connection serves entire building. Each flat doesn't need its own bore well.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">📶</div>
              <h3 className="font-bold mb-2">WiFi Router</h3>
              <p className="text-sm opacity-90">
                One router provides internet to all devices. You don't buy separate internet for each phone.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🏦</div>
              <h3 className="font-bold mb-2">Bank Branch</h3>
              <p className="text-sm opacity-90">
                Multiple customers use the same bank services. Bank doesn't create new infrastructure per customer.
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔄 One Instance, Many Users</h3>
              <p className="text-gray-600 text-sm">Like shared gas cylinder, one service instance serves multiple classes</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">💡 Automatic Management</h3>
              <p className="text-gray-600 text-sm">NestJS automatically handles creating and sharing instances</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🧪 Better Testing</h3>
              <p className="text-gray-600 text-sm">Easy to replace real services with mock ones during testing</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Cleaner Code</h3>
              <p className="text-gray-600 text-sm">Classes focus on their job, not on creating their dependencies</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DIPage;