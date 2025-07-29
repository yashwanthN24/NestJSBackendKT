import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Train, 
  User, 
  Shield, 
  Eye, 
  EyeOff, 
  Users, 
  Lock, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const RLSPage = () => {
  const [selectedUser, setSelectedUser] = useState('rajesh');
  const [showAllData, setShowAllData] = useState(false);

  const users = [
    { id: 'rajesh', name: 'Rajesh Kumar', phone: '9876543210', color: 'bg-blue-500' },
    { id: 'priya', name: 'Priya Sharma', phone: '9876543211', color: 'bg-green-500' },
    { id: 'amit', name: 'Amit Patel', phone: '9876543212', color: 'bg-purple-500' }
  ];

  const bookingsData = [
    { id: 1, userId: 'rajesh', from: 'Delhi', to: 'Mumbai', date: '2024-01-15', pnr: 'ABC123', seat: '2A' },
    { id: 2, userId: 'rajesh', from: 'Mumbai', to: 'Pune', date: '2024-01-20', pnr: 'DEF456', seat: '1B' },
    { id: 3, userId: 'priya', from: 'Bangalore', to: 'Chennai', date: '2024-01-18', pnr: 'GHI789', seat: '3C' },
    { id: 4, userId: 'priya', from: 'Chennai', to: 'Kochi', date: '2024-01-25', pnr: 'JKL012', seat: '2D' },
    { id: 5, userId: 'amit', from: 'Kolkata', to: 'Guwahati', date: '2024-01-22', pnr: 'MNO345', seat: '1A' },
    { id: 6, userId: 'amit', from: 'Guwahati', to: 'Dibrugarh', date: '2024-01-28', pnr: 'PQR678', seat: '3B' }
  ];

  const getVisibleBookings = () => {
    if (showAllData) {
      return bookingsData;
    }
    return bookingsData.filter(booking => booking.userId === selectedUser);
  };

  const currentUser = users.find(u => u.id === selectedUser);

  const rlsExample = `-- Row Level Security Setup for IRCTC-like system

-- Enable RLS on bookings table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own bookings
CREATE POLICY "users_own_bookings" 
ON bookings 
FOR ALL 
TO authenticated 
USING (user_id = auth.uid());

-- Policy: Users can only insert their own bookings
CREATE POLICY "users_insert_own_bookings" 
ON bookings 
FOR INSERT 
TO authenticated 
WITH CHECK (user_id = auth.uid());

-- Example query - automatically filtered by RLS
SELECT * FROM bookings; 
-- This will only return current user's bookings!`;

  const nestjsExample = `// NestJS Service with RLS
@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepo: Repository<Booking>
  ) {}

  // RLS automatically filters results
  async getMyBookings(userId: string): Promise<Booking[]> {
    // Even if we try to get all bookings,
    // RLS ensures only user's bookings are returned
    return this.bookingsRepo.find({
      where: { userId } // Additional safety, but RLS is the real protection
    });
  }

  async createBooking(userId: string, bookingData: CreateBookingDto) {
    const booking = this.bookingsRepo.create({
      ...bookingData,
      userId // RLS ensures this matches authenticated user
    });
    
    return this.bookingsRepo.save(booking);
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
            Row-Level Security
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            IRCTC - see only your bookings 🎫
          </p>
          <p className="text-gray-500">
            Just like IRCTC shows only your train tickets, RLS shows only your data
          </p>
        </motion.div>

        {/* Interactive IRCTC Demo */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              IRCTC Booking System Demo
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Show all data (Admin view):</span>
              <button
                onClick={() => setShowAllData(!showAllData)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showAllData ? 'bg-red-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 bg-white rounded-full transition-transform ${
                    showAllData ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              {showAllData ? <EyeOff className="w-5 h-5 text-red-500" /> : <Eye className="w-5 h-5 text-green-500" />}
            </div>
          </div>

          {/* User Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Login as User:</h3>
            <div className="flex space-x-4">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedUser === user.id
                      ? `${user.color} text-white`
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current User Info */}
          <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-blue-500">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${currentUser.color} rounded-full flex items-center justify-center`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Logged in as: {currentUser.name}</h3>
                <p className="text-gray-600 text-sm">Phone: {currentUser.phone}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {showAllData ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-red-600 text-sm font-medium">Admin Mode: Seeing ALL data</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="text-green-600 text-sm font-medium">RLS Active: Seeing only your data</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="font-bold text-gray-800 flex items-center">
                <Train className="w-5 h-5 mr-2" />
                My Train Bookings
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {getVisibleBookings().length} bookings
                </span>
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PNR</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat</th>
                    {showAllData && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {getVisibleBookings().map((booking, index) => {
                      const bookingUser = users.find(u => u.id === booking.userId);
                      const isCurrentUser = booking.userId === selectedUser;
                      
                      return (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                          className={`${isCurrentUser ? 'bg-blue-50' : showAllData ? 'bg-gray-50' : ''}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {booking.pnr}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.from} → {booking.to}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.seat}
                          </td>
                          {showAllData && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center space-x-2">
                                <div className={`w-4 h-4 ${bookingUser.color} rounded-full`}></div>
                                <span>{bookingUser.name}</span>
                              </div>
                            </td>
                          )}
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-6 bg-orange-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-orange-600 mt-1" />
              <div>
                <h4 className="font-semibold text-orange-800 mb-2">How RLS Works:</h4>
                <p className="text-orange-700 text-sm mb-2">
                  Even though all booking data exists in the same table, each user can only see their own bookings.
                </p>
                <p className="text-orange-700 text-sm">
                  The database automatically filters results based on the logged-in user's ID - no application code needed!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Database RLS Setup</h3>
            <CodeBlock code={rlsExample} language="sql" />
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">NestJS Service</h3>
            <CodeBlock code={nestjsExample} language="typescript" />
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Database-Level Security</h3>
            <p className="text-gray-600 text-sm">
              Security is enforced at the database level, not just in application code
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-Tenant Safe</h3>
            <p className="text-gray-600 text-sm">
              Perfect for applications serving multiple users or organizations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Automatic</h3>
            <p className="text-gray-600 text-sm">
              No need to remember to add WHERE clauses - the database handles it
            </p>
          </div>
        </div>

        {/* Real-world Applications */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Where RLS is Used</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🏦</div>
              <h3 className="font-bold mb-2">Banking</h3>
              <p className="text-sm opacity-90">
                Each customer sees only their accounts and transactions
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🏥</div>
              <h3 className="font-bold mb-2">Healthcare</h3>
              <p className="text-sm opacity-90">
                Patients see only their medical records
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-bold mb-2">SaaS Apps</h3>
              <p className="text-sm opacity-90">
                Each company sees only their data in multi-tenant apps
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="font-bold mb-2">Education</h3>
              <p className="text-sm opacity-90">
                Students see only their grades and assignments
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-orange-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🔒 Database-Level Protection</h3>
              <p className="text-gray-600 text-sm">RLS works at the database level, providing stronger security than application-level filtering</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Automatic Filtering</h3>
              <p className="text-gray-600 text-sm">No need to remember WHERE clauses - the database automatically filters data</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">👥 Multi-User Apps</h3>
              <p className="text-gray-600 text-sm">Essential for applications where users should only see their own data</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🛡️ Defense in Depth</h3>
              <p className="text-gray-600 text-sm">Even if application code has bugs, RLS provides an additional security layer</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RLSPage;