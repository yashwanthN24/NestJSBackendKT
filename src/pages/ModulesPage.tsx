import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Phone, 
  Package, 
  Home, 
  Users, 
  FileText, 
  Truck,
  ArrowRight,
  MousePointer
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const ModulesPage = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [matches, setMatches] = useState({});

  const swiggyComponents = [
    {
      id: 'kitchen',
      name: 'Kitchen',
      nestjs: 'Module',
      description: 'The complete restaurant unit that contains everything needed',
      icon: Home,
      color: 'bg-purple-500',
      position: { x: 50, y: 30 },
      contains: ['order-taker', 'chef', 'storage']
    },
    {
      id: 'order-taker',
      name: 'Order Taker',
      nestjs: 'Controller',
      description: 'Takes orders from customers and coordinates the process',
      icon: Phone,
      color: 'bg-blue-500',
      position: { x: 20, y: 60 }
    },
    {
      id: 'chef',
      name: 'Chef',
      nestjs: 'Service',
      description: 'Prepares the food according to recipes and business rules',
      icon: ChefHat,
      color: 'bg-green-500',
      position: { x: 50, y: 80 }
    },
    {
      id: 'storage',
      name: 'Storage/Inventory',
      nestjs: 'Repository',
      description: 'Manages ingredients and raw materials storage',
      icon: Package,
      color: 'bg-orange-500',
      position: { x: 80, y: 60 }
    }
  ];

  const nestjsRoles = [
    { id: 'module', name: 'Module', icon: Home, color: 'bg-purple-500' },
    { id: 'controller', name: 'Controller', icon: Phone, color: 'bg-blue-500' },
    { id: 'service', name: 'Service', icon: ChefHat, color: 'bg-green-500' },
    { id: 'repository', name: 'Repository', icon: Package, color: 'bg-orange-500' }
  ];

  const moduleExample = `// Restaurant Module (Kitchen)
@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],  // Order Taker
  providers: [
    OrderService,     // Chef
    OrderRepository   // Storage
  ],
  exports: [OrderService] // What this kitchen can provide to others
})
export class RestaurantModule {}

// Order Controller (Order Taker)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  
  @Post()
  createOrder(@Body() orderData: CreateOrderDto) {
    return this.orderService.processOrder(orderData);
  }
}

// Order Service (Chef)
@Injectable()
export class OrderService {
  constructor(private orderRepo: OrderRepository) {}
  
  async processOrder(orderData: CreateOrderDto) {
    // Chef processes the order
    const ingredients = await this.orderRepo.getIngredients();
    return this.cookFood(orderData, ingredients);
  }
}`;

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, target) => {
    e.preventDefault();
    if (draggedItem && draggedItem.nestjs.toLowerCase() === target.id) {
      setMatches(prev => ({
        ...prev,
        [target.id]: draggedItem
      }));
    }
    setDraggedItem(null);
  };

  const resetMatching = () => {
    setMatches({});
    setDraggedItem(null);
  };

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
            Modules & Architecture
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Swiggy delivery system organization 🏪
          </p>
          <p className="text-gray-500">
            How a restaurant kitchen is organized - everything has its place and purpose
          </p>
        </motion.div>

        {/* Interactive Swiggy Kitchen */}
        <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Swiggy Restaurant Kitchen
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Click on any component to see how it works!
          </p>

          <div className="relative bg-white rounded-lg shadow-inner p-8 min-h-96">
            {/* Kitchen Layout */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <pattern id="kitchen-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#6B7280" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#kitchen-grid)" />
            </svg>

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="7" 
                        refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#9CA3AF" />
                </marker>
              </defs>
              
              {/* Order flow lines */}
              <line x1="20%" y1="60%" x2="50%" y2="80%" 
                    stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="50%" y1="80%" x2="80%" y2="60%" 
                    stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrow)" />
            </svg>

            {/* Components */}
            {swiggyComponents.map((component, index) => {
              const Icon = component.icon;
              const isSelected = selectedComponent === component.id;
              
              return (
                <motion.div
                  key={component.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedComponent(isSelected ? null : component.id)}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    isSelected ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    left: `${component.position.x}%`,
                    top: `${component.position.y}%`
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative ${isSelected ? 'scale-110' : ''} transition-transform`}
                  >
                    {/* Component Box */}
                    <div className={`w-24 h-20 ${component.color} rounded-lg shadow-lg flex flex-col items-center justify-center text-white`}>
                      <Icon className="w-8 h-8 mb-1" />
                      <span className="text-xs font-bold text-center px-1">{component.name}</span>
                    </div>
                    
                    {/* NestJS Label */}
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-2 py-1 rounded-full text-xs font-bold shadow-md border">
                      {component.nestjs}
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
                </motion.div>
              );
            })}

            {/* Selected Component Details */}
            <AnimatePresence>
              {selectedComponent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border-l-4 border-orange-500"
                >
                  {(() => {
                    const component = swiggyComponents.find(c => c.id === selectedComponent);
                    const Icon = component.icon;
                    return (
                      <div>
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-6 h-6 ${component.color.replace('bg-', 'text-')}`} />
                          <div>
                            <h3 className="font-bold text-gray-800">{component.name}</h3>
                            <p className="text-sm text-gray-600">NestJS: {component.nestjs}</p>
                          </div>
                        </div>
                        <p className="text-gray-700">{component.description}</p>
                        {component.contains && (
                          <div className="mt-3">
                            <p className="text-sm font-semibold text-gray-800">Contains:</p>
                            <p className="text-sm text-gray-600">
                              {component.contains.map(item => 
                                swiggyComponents.find(c => c.id === item)?.name
                              ).join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Drag and Drop Matching Game */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Match the Roles!
            </h2>
            <button
              onClick={resetMatching}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reset
            </button>
          </div>
          <p className="text-gray-600 mb-8 text-center">
            Drag the Swiggy roles to their matching NestJS concepts
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Draggable Items */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Swiggy Components</h3>
              <div className="space-y-3">
                {swiggyComponents.map((component) => {
                  const Icon = component.icon;
                  const isMatched = Object.values(matches).some(match => match.id === component.id);
                  
                  return (
                    <motion.div
                      key={component.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, component)}
                      className={`flex items-center space-x-3 p-3 rounded-lg shadow cursor-move transition-all ${
                        isMatched ? 'bg-green-100 opacity-50' : 'bg-white hover:shadow-md'
                      }`}
                      whileHover={!isMatched ? { scale: 1.02 } : {}}
                    >
                      <Icon className={`w-6 h-6 ${component.color.replace('bg-', 'text-')}`} />
                      <div>
                        <h4 className="font-semibold text-gray-800">{component.name}</h4>
                        <p className="text-sm text-gray-600">{component.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Drop Zones */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">NestJS Concepts</h3>
              <div className="space-y-3">
                {nestjsRoles.map((role) => {
                  const Icon = role.icon;
                  const match = matches[role.id];
                  
                  return (
                    <motion.div
                      key={role.id}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, role)}
                      className={`p-3 rounded-lg border-2 border-dashed transition-all min-h-20 flex items-center ${
                        match 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mr-3 ${role.color.replace('bg-', 'text-')}`} />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{role.name}</h4>
                        {match ? (
                          <p className="text-sm text-green-700">✓ Matched with {match.name}</p>
                        ) : (
                          <p className="text-sm text-gray-500">Drop matching component here</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Success Message */}
          {Object.keys(matches).length === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 bg-green-500 text-white p-4 rounded-lg text-center"
            >
              <h3 className="font-bold text-lg mb-2">🎉 Perfect Match!</h3>
              <p>You've successfully mapped all Swiggy components to NestJS concepts!</p>
            </motion.div>
          )}
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Complete Module Example
          </h2>
          <CodeBlock code={moduleExample} language="typescript" />
        </div>

        {/* Architecture Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Clear Organization</h3>
            <p className="text-gray-600 text-sm">
              Just like a kitchen, everyone knows their role and where everything belongs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reusable Components</h3>
            <p className="text-gray-600 text-sm">
              One kitchen module can serve multiple restaurant branches
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Testing</h3>
            <p className="text-gray-600 text-sm">
              Test each component separately, just like training individual staff members
            </p>
          </motion.div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🏠 Modules are Containers</h3>
              <p className="text-gray-600 text-sm">Like a kitchen that contains all related components</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📞 Controllers Handle Requests</h3>
              <p className="text-gray-600 text-sm">Like order-takers who receive and route customer requests</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">👨‍🍳 Services Do the Work</h3>
              <p className="text-gray-600 text-sm">Like chefs who implement the actual business logic</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📦 Repositories Manage Data</h3>
              <p className="text-gray-600 text-sm">Like storage units that handle ingredients and inventory</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModulesPage;