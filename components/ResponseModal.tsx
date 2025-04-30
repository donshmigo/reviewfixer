'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiRefreshCw, FiCopy, FiCheck, FiInfo } from 'react-icons/fi';
import Button from './ui/Button';

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: any;
  isDemo?: boolean;
}

export default function ResponseModal({ isOpen, onClose, review, isDemo = false }: ResponseModalProps) {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [businessContext, setBusinessContext] = useState('');
  const [copied, setCopied] = useState(false);

  const generateResponse = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review,
          businessContext,
          isDemo,
        }),
      });
      
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="flex justify-between items-center border-b p-4 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Respond to Review</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="p-4">
              {isDemo && (
                <div className="mb-4 p-3 bg-secondary/10 rounded border border-secondary/20 flex items-start gap-2">
                  <FiInfo className="text-secondary mt-1" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    In demo mode, AI responses are pre-generated. In a real environment, 
                    responses would be generated using OpenAI or other AI services.
                  </p>
                </div>
              )}
              
              <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <div className="font-medium mb-1 text-gray-700 dark:text-gray-300">
                  {review.reviewer} - {review.rating}/5 stars
                </div>
                <p className="text-gray-600 dark:text-gray-400">{review.content}</p>
              </div>
              
              <div className="mb-4">
                <label 
                  htmlFor="context" 
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Business Context (optional)
                </label>
                <textarea
                  id="context"
                  rows={2}
                  value={businessContext}
                  onChange={(e) => setBusinessContext(e.target.value)}
                  placeholder="Add any specific information about your business that would help generate a better response..."
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                />
              </div>
              
              <div className="flex justify-end mb-4">
                <Button
                  onClick={generateResponse}
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <FiRefreshCw className="animate-spin" /> Generating...
                    </>
                  ) : (
                    'Generate AI Response'
                  )}
                </Button>
              </div>
              
              {aiResponse && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      AI Generated Response
                    </label>
                    <button
                      onClick={copyToClipboard}
                      className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white p-1 rounded flex items-center gap-1 text-sm"
                    >
                      {copied ? (
                        <>
                          <FiCheck className="text-green-500" /> Copied!
                        </>
                      ) : (
                        <>
                          <FiCopy /> Copy
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    value={aiResponse}
                    onChange={(e) => setAiResponse(e.target.value)}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
                  />
                </div>
              )}
            </div>
            
            <div className="border-t p-4 flex justify-end gap-2 dark:border-gray-700">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {aiResponse && (
                <Button onClick={generateResponse} variant="secondary">
                  Regenerate
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 