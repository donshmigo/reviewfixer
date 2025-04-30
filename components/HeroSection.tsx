'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiStar, FiCheckCircle, FiMail } from 'react-icons/fi';
import Button from './ui/Button';

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-secondary/10 dark:from-primary/20 dark:via-gray-900 dark:to-secondary/20 animate-gradient -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 dark:bg-primary/10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: Math.random() * 5 + 5,
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform Your Google Reviews Response Strategy
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              ReviewFixer helps businesses manage Google reviews with AI-powered response generation. 
              Import reviews directly from Gmail and craft personalized responses in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => router.push('/login')} 
                size="lg"
                className="w-full sm:w-auto"
              >
                Get Started Free
              </Button>
              <Button 
                onClick={() => {
                  const demoSection = document.getElementById('demo');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }} 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto"
              >
                See How It Works
              </Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <div className="text-secondary mb-4">
              <FiMail size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gmail Integration</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Import Google reviews directly from your Gmail inbox with one click.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <div className="text-primary mb-4">
              <FiStar size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Responses</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Generate contextually relevant responses to reviews in seconds.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <div className="text-secondary mb-4">
              <FiCheckCircle size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Review Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track and respond to all your reviews from a single dashboard.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 