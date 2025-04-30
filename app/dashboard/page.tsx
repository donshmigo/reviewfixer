'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw, FiFilter, FiSearch, FiAlertCircle, FiInfo, FiMail } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Navbar from '@/components/Navbar';
import ReviewCard from '@/components/ReviewCard';
import ResponseModal from '@/components/ResponseModal';
import Button from '@/components/ui/Button';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [connectingGmail, setConnectingGmail] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterRating, setFilterRating] = useState(0);

  // If the user is not logged in, redirect to login page
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Fetch reviews when the component mounts
  useEffect(() => {
    if (session) {
      fetchReviews();
    }
  }, [session]);

  // Filter reviews based on search term and rating filter
  useEffect(() => {
    if (!reviews.length) {
      setFilteredReviews([]);
      return;
    }

    let filtered = [...reviews];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        review => 
          review.reviewer.toLowerCase().includes(term) || 
          review.content.toLowerCase().includes(term)
      );
    }
    
    if (filterRating > 0) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }
    
    setFilteredReviews(filtered);
  }, [reviews, searchTerm, filterRating]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews');
      
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectGmail = async () => {
    setConnectingGmail(true);
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Error connecting Gmail:', error);
    } finally {
      setConnectingGmail(false);
    }
  };

  const handleOpenModal = (review: any) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Check if Gmail is connected
  const isGmailConnected = !!session?.accessToken || !!session?.gmailConnected;

  // If loading session, show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-primary mx-auto text-4xl mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {session?.isDemo && (
          <div className="mb-8 bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start gap-3">
            <div className="text-secondary mt-1">
              <FiInfo size={20} />
            </div>
            <div>
              <h3 className="font-medium text-secondary mb-1">Demo Mode Active</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                You're currently using ReviewFixer in demo mode. All features are functional with simulated data.
                In a real environment, you would connect with your Google account to import actual reviews.
              </p>
            </div>
          </div>
        )}
        
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Review Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and respond to your Google reviews
            </p>
          </div>
          
          {/* Gmail Connection Button */}
          {!session?.isDemo && !isGmailConnected && (
            <Button
              onClick={handleConnectGmail}
              disabled={connectingGmail}
              className="flex items-center gap-2"
              variant="secondary"
            >
              {connectingGmail ? <FiRefreshCw className="animate-spin" /> : <FcGoogle size={20} />}
              {connectingGmail ? 'Connecting...' : 'Connect Gmail'}
            </Button>
          )}
          
          {!session?.isDemo && isGmailConnected && (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
              <FiMail />
              Gmail Connected
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-xs">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <div className="relative">
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <Button 
              onClick={fetchReviews}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </Button>
          </div>
        </div>
        
        {/* Reviews List */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredReviews.length > 0 ? (
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    id={review.id}
                    reviewer={review.reviewer}
                    rating={review.rating}
                    date={review.date}
                    content={review.content}
                    onRespond={handleOpenModal}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <FiAlertCircle className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">No reviews found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchTerm || filterRating > 0
                    ? 'No reviews match your search or filter criteria.'
                    : session?.isDemo 
                      ? 'Click the "Refresh" button to load demo reviews.'
                      : isGmailConnected
                        ? 'Click the "Import Reviews" button to load your reviews from Gmail.'
                        : 'Connect your Gmail account to import Google reviews.'}
                </p>
                {!session?.isDemo && !isGmailConnected ? (
                  <Button onClick={handleConnectGmail} disabled={connectingGmail}>
                    {connectingGmail ? 'Connecting...' : 'Connect Gmail'}
                  </Button>
                ) : (
                  <Button onClick={fetchReviews} disabled={loading}>
                    {loading ? 'Loading...' : 'Import Reviews'}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Review Response Modal */}
      <ResponseModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        review={selectedReview}
        isDemo={!!session?.isDemo}
      />
    </div>
  );
} 