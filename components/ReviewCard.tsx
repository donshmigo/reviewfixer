'use client';

import { useState } from 'react';
import { FiStar, FiEdit, FiCopy, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Button from './ui/Button';

interface ReviewProps {
  id: string;
  reviewer: string;
  rating: number;
  date: string;
  content: string;
  onRespond: (review: any) => void;
}

export default function ReviewCard({ id, reviewer, rating, date, content, onRespond }: ReviewProps) {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-4 border-l-4 border-primary"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{reviewer}</h3>
        <div className="flex items-center text-yellow-500">
          {Array(5).fill(0).map((_, i) => (
            <FiStar 
              key={i} 
              className={`${i < rating ? 'fill-current' : ''}`} 
            />
          ))}
          <span className="text-gray-600 dark:text-gray-300 ml-1 text-sm">{rating}/5</span>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
        {formatDate(date)}
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">{content}</p>
      
      <div className="flex justify-between items-center">
        <Button
          onClick={() => onRespond({ id, reviewer, rating, date, content })}
          variant="primary"
          size="sm"
          className="flex items-center gap-1"
        >
          <FiEdit className="mr-1" /> Respond
        </Button>
        
        <button
          onClick={() => copyToClipboard(content)}
          className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white p-1 rounded"
        >
          {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
        </button>
      </div>
    </motion.div>
  );
} 