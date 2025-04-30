import HeroSection from '@/components/HeroSection';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiMonitor, FiClock, FiSmile, FiBarChart, FiShield, FiMessageSquare, FiRefreshCw, FiCheckCircle, FiStar } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <HeroSection />
        
        {/* Demo Section */}
        <section id="demo" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How ReviewFixer Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Our platform simplifies the process of managing and responding to Google reviews.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="aspect-video bg-white dark:bg-gray-800 rounded overflow-hidden relative">
                    <Image 
                      src="/dashboard-preview.svg" 
                      alt="Review Management Dashboard" 
                      width={800} 
                      height={500} 
                      className="object-contain rounded w-full h-auto"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-transparent hover:from-secondary/10 hover:to-primary/10 rounded transition-all duration-300"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Connect Your Gmail</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Sign in with your Google account and authorize ReviewFixer to access your review notifications.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Import Reviews</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        ReviewFixer automatically scans your inbox for Google review notifications and organizes them in your dashboard.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Generate AI Responses</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Generate contextually relevant responses with a single click, customized to the review content.
                      </p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/login" 
                    className="inline-flex items-center text-primary hover:text-primary/90 font-medium mt-4"
                  >
                    Get started now <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ReviewFixer?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Join hundreds of businesses saving time and improving their online reputation
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="text-primary mb-4">
                  <FiClock size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Save Time</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Reduce review response time by up to 90% with AI-powered suggestions tailored to each review.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="text-primary mb-4">
                  <FiSmile size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Improve Customer Satisfaction</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Respond to reviews promptly and professionally, showing customers you value their feedback.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="text-primary mb-4">
                  <FiBarChart size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Boost Your Reputation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Better review management leads to improved ratings and more positive reviews over time.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Everything you need to manage your Google reviews effectively
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-secondary mb-4">
                  <FiMessageSquare size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Response Generator</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  AI-generated responses that match your brand voice and address specific review points.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-secondary mb-4">
                  <FiRefreshCw size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Automated Imports</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Automatic detection and import of new Google reviews from your Gmail inbox.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-secondary mb-4">
                  <FiBarChart size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Review Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Track trends in your reviews over time to identify areas for business improvement.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-secondary mb-4">
                  <FiShield size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your data is encrypted and secure. We only access the review emails you authorize.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Businesses that have transformed their review management with ReviewFixer
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg relative">
                <div className="text-primary text-4xl absolute -top-3 -left-1">"</div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 mt-2 italic">
                  ReviewFixer has saved us hours each week. The AI responses are spot-on and we've seen an increase in our overall ratings.
                </p>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-semibold text-gray-700">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Restaurant Owner</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mt-4">
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg relative">
                <div className="text-primary text-4xl absolute -top-3 -left-1">"</div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 mt-2 italic">
                  The Gmail integration is seamless. We now respond to every review within 24 hours which has helped our local SEO tremendously.
                </p>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-semibold text-gray-700">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Marketing Director</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mt-4">
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg relative">
                <div className="text-primary text-4xl absolute -top-3 -left-1">"</div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 mt-2 italic">
                  As a small business owner, I don't have time to craft thoughtful responses. ReviewFixer handles this perfectly with minimal effort.
                </p>
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center mr-3">
                    <span className="font-semibold text-gray-700">RJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Robert Johnson</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Retail Shop Owner</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mt-4">
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                  <FiStar className="fill-current" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choose the plan that works best for your business
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-2">Starter</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for small businesses</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Up to 50 review responses/month</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Gmail integration</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>AI response generation</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Basic analytics</span>
                    </li>
                    <li className="flex items-start text-gray-500">
                      <FiCheckCircle className="text-gray-400 mt-1 mr-2" />
                      <span>1 user account</span>
                    </li>
                  </ul>
                  <Link
                    href="/login"
                    className="mt-6 w-full block text-center bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              
              {/* Pro Plan - Highlighted */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border-2 border-secondary dark:border-secondary relative transition-transform hover:scale-105">
                <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                  POPULAR
                </div>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">For growing businesses</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Unlimited review responses</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Gmail & Google Business Profile integration</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Advanced AI response customization</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Full analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>3 user accounts</span>
                    </li>
                  </ul>
                  <Link
                    href="/login"
                    className="mt-6 w-full block text-center bg-secondary hover:bg-secondary/90 text-white py-2 rounded-md font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              
              {/* Enterprise Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">For large organizations</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Everything in Professional</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Multi-location support</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Custom response templates</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-1 mr-2" />
                      <span>Unlimited user accounts</span>
                    </li>
                  </ul>
                  <Link
                    href="/login"
                    className="mt-6 w-full block text-center bg-primary hover:bg-primary/90 text-white py-2 rounded-md font-medium"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Not sure which plan is right for you? <Link href="#" className="text-primary font-medium">Contact us</Link> for a personalized demo.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Review Management?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join businesses that are saving time and improving customer satisfaction with ReviewFixer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/login" 
                className="inline-flex items-center bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-md font-medium"
              >
                Sign Up for Free <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                href="#demo"
                className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-medium"
              >
                Learn More <FiCheckCircle className="ml-2" />
              </Link>
            </div>
        </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="font-bold text-xl text-secondary">ReviewFixer</span>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                AI-powered Google review management
              </p>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                Home
              </Link>
              <Link href="/login" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                Login
              </Link>
              <Link href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                Pricing
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} ReviewFixer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
