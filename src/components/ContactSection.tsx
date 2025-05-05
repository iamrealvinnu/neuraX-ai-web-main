
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-neuraxDark">
      <div className="neura-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Have a project in mind? Contact us to discuss how our AI solutions can help your business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-xl hover:shadow-lg hover:shadow-neuraxGreen/10 transition-all duration-300">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-white/5 border-white/10 focus:border-neuraxGreen text-white w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 focus:border-neuraxGreen text-white w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-1">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="bg-white/5 border-white/10 focus:border-neuraxGreen text-white w-full"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">Your Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    className="bg-white/5 border-white/10 focus:border-neuraxGreen text-white w-full min-h-[120px]"
                    required
                  />
                </div>
                
                <Button type="submit" className="bg-neuraxGreen hover:bg-neuraxGreen-dark text-neuraxDark font-medium w-full flex items-center justify-center gap-2 py-6">
                  Send Message <Send size={18} />
                </Button>
              </div>
            </form>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-white">Connect With Us</h3>
                <p className="text-gray-300">
                  Interested in our AI solutions? Reach out to learn more about how NeuraX AI can help your business innovate and grow.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-neuraxBlue-light/50 p-3 rounded-full">
                    <Mail className="text-neuraxGreen" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:gupta.vinayC@gmail.com" className="text-white hover:text-neuraxGreen transition-colors">
                      gupta.vinayC@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-neuraxBlue-light/50 p-3 rounded-full">
                    <Phone className="text-neuraxGreen" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a href="tel:+917738927663" className="text-white hover:text-neuraxGreen transition-colors">
                      +91 7738927663
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-neuraxBlue-light/50 p-3 rounded-full">
                    <MapPin className="text-neuraxGreen" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Remote-First Company</p>
                    <p className="text-white">Operating globally from India</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/106669474/admin/dashboard/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neuraxBlue-light/30 hover:bg-neuraxBlue-light/50 p-3 rounded-lg text-neuraxGreen flex items-center space-x-2 transition-colors"
                >
                  <Linkedin size={18} />
                  <span>Company LinkedIn</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/guptavinayc/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neuraxBlue-light/30 hover:bg-neuraxBlue-light/50 p-3 rounded-lg text-neuraxGreen flex items-center space-x-2 transition-colors"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
