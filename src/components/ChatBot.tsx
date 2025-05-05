
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, X, Mic, MicOff, 
  Bot, PaperclipIcon, History, User,
  Search, Brain, BrainCircuit, Network, Microchip, MessageSquare, Star
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Drawer,
  DrawerContent, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import DynamicAgentAvatar from './DynamicAgentAvatar';
import { useToast } from "@/hooks/use-toast";

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative' | 'mixed';
  entities?: Array<{type: string, value: string, confidence?: number}>;
  intentDetected?: string;
  isThinking?: boolean;
  confidenceScore?: number;
  contextualMemory?: string[];
  neuralActivation?: number;
  neuralPathways?: Array<{source: string, target: string, strength: number}>;
  documentContext?: Array<{document: string, relevance: number}>;
  crossLingualUnderstanding?: boolean;
  multilayerIntentHierarchy?: Array<{level: number, intent: string, confidence: number}>;
  inContextLearning?: {
    learningRate: number,
    adaptationLevel: number,
    personalizationVector: number[]
  };
};

type SuggestionType = {
  id: string;
  text: string;
  category?: string;
  priority?: number;
  contextRelevance?: number;
};

type AgentType = {
  id: string;
  name: string;
  role: string;
  visualization: string;
  capabilities: string[];
  activeState?: 'idle' | 'thinking' | 'speaking';
  knowledgeDomains?: string[];
  cognitiveArchitecture?: string;
  specializationVector?: number[];
  adaptiveParameters?: {
    learningRate: number;
    creativityFactor: number;
    responseLatency: number;
  };
};

// Advanced NLP detection patterns (for frontend simulation)
const intentPatterns = {
  greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
  inquiry: ['what is', 'how do', 'can you', 'tell me', 'explain'],
  technical: ['neural', 'engine', 'algorithm', 'model', 'architecture', 'code'],
  business: ['pricing', 'cost', 'roi', 'benefits', 'implementation', 'strategy'],
  creative: ['design', 'create', 'generate', 'imagine', 'visualize'],
  philosophical: ['meaning', 'purpose', 'ethics', 'philosophy', 'consciousness', 'sentient'],
  educational: ['learn', 'teach', 'education', 'training', 'course', 'curriculum'],
  emotional: ['feel', 'emotion', 'sentiment', 'mood', 'empathy', 'understand'],
  analytical: ['analyze', 'evaluate', 'assess', 'compare', 'research', 'investigate'],
  procedural: ['steps', 'process', 'procedure', 'method', 'approach', 'workflow'],
};

// Enhanced entity patterns
const entityPatterns = {
  product: ['neural intelligence', 'ai personalization', 'devai platform'],
  industry: ['healthcare', 'education', 'finance', 'retail', 'manufacturing'],
  technology: ['machine learning', 'deep learning', 'nlp', 'computer vision', 'neural networks', 'transformers', 'attention mechanisms', 'multimodal learning'],
  concept: ['ethics', 'bias', 'fairness', 'transparency', 'explainability', 'privacy', 'security'],
  research: ['paper', 'study', 'experiment', 'finding', 'discovery', 'innovation'],
  location: ['global', 'regional', 'local', 'remote', 'distributed', 'centralized'],
  timeframe: ['short-term', 'mid-term', 'long-term', 'immediate', 'future', 'current'],
  metric: ['accuracy', 'precision', 'recall', 'f1-score', 'performance', 'efficiency'],
};

// Enhanced sentiment patterns
const sentimentPatterns = {
  positive: ['good', 'great', 'excellent', 'amazing', 'love', 'like', 'helpful', 'impressive', 'innovative'],
  negative: ['bad', 'poor', 'terrible', 'hate', 'dislike', 'useless', 'confusing', 'complicated', 'difficult'],
  mixed: ['mixed', 'partial', 'somewhat', 'mostly', 'slightly', 'relatively', 'comparatively'],
  neutral: ['okay', 'fine', 'alright', 'neutral', 'balanced', 'fair', 'reasonable'],
};

// Neural Attention Mechanisms inspired by transformer architecture
const attentionMechanisms = {
  selfAttention: (tokens: string[], query: string) => {
    // Simulates self-attention mechanism by computing relevance scores between query and tokens
    return tokens.map(token => {
      const commonChars = [...new Set([...query].filter(char => token.includes(char)))].length;
      const relevance = commonChars / Math.max(query.length, token.length);
      return { token, attention: relevance };
    }).sort((a, b) => b.attention - a.attention);
  },
  
  crossAttention: (sourceTokens: string[], targetTokens: string[]) => {
    // Simulates cross-attention between two token sequences
    return sourceTokens.map(srcToken => {
      const attentions = targetTokens.map(tgtToken => {
        const commonChars = [...new Set([...srcToken].filter(char => tgtToken.includes(char)))].length;
        return { token: tgtToken, attention: commonChars / Math.max(srcToken.length, tgtToken.length) };
      }).sort((a, b) => b.attention - a.attention);
      
      return { sourceToken: srcToken, targetAttentions: attentions };
    });
  }
};

// Contextual memory simulation (inspired by Notebook LLM)
const contextualMemory = {
  shortTermMemory: [] as string[],
  longTermMemory: [] as {concept: string, examples: string[], associations: string[]}[],
  
  addToShortTerm: (item: string) => {
    contextualMemory.shortTermMemory.push(item);
    if (contextualMemory.shortTermMemory.length > 10) {
      contextualMemory.shortTermMemory.shift();
    }
  },
  
  retrieveRelevant: (query: string) => {
    // Simple relevance scoring using word overlap
    return contextualMemory.shortTermMemory
      .map(item => {
        const queryWords = query.toLowerCase().split(/\s+/);
        const itemWords = item.toLowerCase().split(/\s+/);
        const commonWords = queryWords.filter(word => itemWords.includes(word)).length;
        const relevance = commonWords / Math.max(queryWords.length, itemWords.length);
        return { item, relevance };
      })
      .filter(item => item.relevance > 0.1)
      .sort((a, b) => b.relevance - a.relevance)
      .map(item => item.item);
  },
  
  mergeConcepts: (concept1: string, concept2: string) => {
    // Simulate concept merging (inspired by NotebookLLM's ability to combine concepts)
    return `Combined understanding of ${concept1} and ${concept2}`;
  }
};

// Multilingual understanding simulation
const crossLingualMapping = {
  hello: { es: 'hola', fr: 'bonjour', de: 'hallo', zh: '你好', ja: 'こんにちは' },
  ai: { es: 'IA', fr: 'IA', de: 'KI', zh: '人工智能', ja: '人工知能' },
  technology: { es: 'tecnología', fr: 'technologie', de: 'Technologie', zh: '技术', ja: 'テクノロジー' },
  neural: { es: 'neuronal', fr: 'neuronal', de: 'neuronal', zh: '神经', ja: 'ニューラル' },
  
  detectLanguage: (text: string) => {
    // Very simplistic language detection
    if (/[你好中国人工智能]/.test(text)) return 'zh';
    if (/[こんにちはありがとう]/.test(text)) return 'ja';
    if (/[éèêëàâçñ]/.test(text)) return 'fr';
    if (/[äöüß]/.test(text)) return 'de';
    if (/[áéíóúñ]/.test(text)) return 'es';
    return 'en';
  },
  
  translateConcept: (concept: string, sourceLang: string, targetLang: string) => {
    // Simulate translation (just for demonstration)
    return `Translated: ${concept} (${sourceLang} → ${targetLang})`;
  }
};

// In-context learning simulation
const inContextLearning = {
  adaptationState: {
    learningRate: 0.05,
    personalityAdaptation: 0.3,
    styleAdaptation: 0.4,
    domainKnowledge: {} as Record<string, number>
  },
  
  updateFromInteraction: (userMessage: string, userSentiment: string) => {
    // Update adaptation state based on user interaction
    
    // Detect domains from message
    Object.entries(entityPatterns).forEach(([domain, patterns]) => {
      patterns.forEach(pattern => {
        if (userMessage.toLowerCase().includes(pattern)) {
          inContextLearning.adaptationState.domainKnowledge[domain] = 
            (inContextLearning.adaptationState.domainKnowledge[domain] || 0) + 0.1;
        }
      });
    });
    
    // Adjust based on sentiment
    if (userSentiment === 'positive') {
      inContextLearning.adaptationState.personalityAdaptation += 0.02;
    } else if (userSentiment === 'negative') {
      inContextLearning.adaptationState.personalityAdaptation -= 0.01;
    }
    
    return inContextLearning.adaptationState;
  },
  
  getPersonalizationVector: () => {
    // Generate a vector representing current adaptation
    return [
      inContextLearning.adaptationState.personalityAdaptation,
      inContextLearning.adaptationState.styleAdaptation,
      Object.values(inContextLearning.adaptationState.domainKnowledge).reduce((sum, val) => sum + val, 0) / 
      Math.max(1, Object.values(inContextLearning.adaptationState.domainKnowledge).length)
    ];
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string>('assistant');
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Hi there! I\'m NeuraX AI Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      confidenceScore: 0.98,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [activeContext, setActiveContext] = useState<string[]>([]);
  const [aiPersonality, setAiPersonality] = useState<string>('helpful');
  const [aiResponsiveness, setAiResponsiveness] = useState<number>(70);
  const [aiCreativity, setAiCreativity] = useState<number>(60);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [conversationContext, setConversationContext] = useState<string>('casual');
  const [showNeuralPathways, setShowNeuralPathways] = useState<boolean>(false);
  const [documentContext, setDocumentContext] = useState<string[]>([]);
  const [multilingualMode, setMultilingualMode] = useState<boolean>(false);
  const [adaptiveLearningEnabled, setAdaptiveLearningEnabled] = useState<boolean>(true);
  const [neuralActivation, setNeuralActivation] = useState<number>(0);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Array of available AI agents with different specializations
  const agents: AgentType[] = [
    {
      id: 'assistant',
      name: 'NeuraX Assistant',
      role: 'General Assistant',
      visualization: 'neural-pulse',
      capabilities: ['General Q&A', 'Business Information', 'Product Info'],
      activeState: 'idle',
      knowledgeDomains: ['general', 'company', 'products', 'services'],
      cognitiveArchitecture: 'transformer-general',
      specializationVector: [0.8, 0.7, 0.6, 0.9],
      adaptiveParameters: {
        learningRate: 0.05,
        creativityFactor: 0.7,
        responseLatency: 0.3
      }
    },
    {
      id: 'technical',
      name: 'TechMind',
      role: 'Technical Specialist',
      visualization: 'circuit-matrix',
      capabilities: ['AI Architecture', 'Code Explanation', 'Technical Documentation'],
      activeState: 'idle',
      knowledgeDomains: ['ai', 'machine learning', 'programming', 'architecture'],
      cognitiveArchitecture: 'transformer-technical',
      specializationVector: [0.95, 0.6, 0.4, 0.7],
      adaptiveParameters: {
        learningRate: 0.04,
        creativityFactor: 0.5,
        responseLatency: 0.2
      }
    },
    {
      id: 'research',
      name: 'DataVoyager',
      role: 'Research Analyst',
      visualization: 'data-constellation',
      capabilities: ['Deep Analysis', 'Data Interpretation', 'Research Insights'],
      activeState: 'idle',
      knowledgeDomains: ['research', 'analysis', 'statistics', 'trends'],
      cognitiveArchitecture: 'transformer-analytical',
      specializationVector: [0.7, 0.9, 0.8, 0.5],
      adaptiveParameters: {
        learningRate: 0.06,
        creativityFactor: 0.6,
        responseLatency: 0.4
      }
    },
    {
      id: 'creative',
      name: 'CreativeNeuron',
      role: 'Creative Designer',
      visualization: 'idea-nebula',
      capabilities: ['Idea Generation', 'Artistic Concepts', 'Creative Solutions'],
      activeState: 'idle',
      knowledgeDomains: ['design', 'creativity', 'arts', 'innovation'],
      cognitiveArchitecture: 'transformer-creative',
      specializationVector: [0.6, 0.8, 0.95, 0.8],
      adaptiveParameters: {
        learningRate: 0.07,
        creativityFactor: 0.9,
        responseLatency: 0.5
      }
    },
    {
      id: 'philosophical',
      name: 'EthosAI',
      role: 'Philosophical Guide',
      visualization: 'wisdom-fractal',
      capabilities: ['Ethical Reasoning', 'Philosophical Discourse', 'Value Alignment'],
      activeState: 'idle',
      knowledgeDomains: ['philosophy', 'ethics', 'principles', 'consciousness'],
      cognitiveArchitecture: 'transformer-conceptual',
      specializationVector: [0.75, 0.85, 0.7, 0.9],
      adaptiveParameters: {
        learningRate: 0.04,
        creativityFactor: 0.8,
        responseLatency: 0.6
      }
    },
    {
      id: 'multimodal',
      name: 'SynthAI',
      role: 'Multimodal Specialist',
      visualization: 'sensory-web',
      capabilities: ['Cross-Modal Understanding', 'Multimedia Analysis', 'Sensory Integration'],
      activeState: 'idle',
      knowledgeDomains: ['vision', 'audio', 'text', 'integration'],
      cognitiveArchitecture: 'transformer-multimodal',
      specializationVector: [0.85, 0.85, 0.85, 0.85],
      adaptiveParameters: {
        learningRate: 0.06,
        creativityFactor: 0.75,
        responseLatency: 0.35
      }
    }
  ];
  
  const initialSuggestions: SuggestionType[] = [
    { id: '1', text: 'Tell me about NeuraX AI', category: 'company', priority: 0.9, contextRelevance: 0.8 },
    { id: '2', text: 'What services do you offer?', category: 'services', priority: 0.85, contextRelevance: 0.7 },
    { id: '3', text: 'How can AI help my business?', category: 'business', priority: 0.8, contextRelevance: 0.6 },
    { id: '4', text: 'Tell me about your Neural Intelligence Engine', category: 'technical', priority: 0.75, contextRelevance: 0.5 },
  ];
  
  const [suggestions, setSuggestions] = useState<SuggestionType[]>(initialSuggestions);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate context-aware suggestions based on conversation
  useEffect(() => {
    if (messages.length > 1) {
      // Get the last few messages to understand context
      const recentMessages = messages.slice(-3);
      const combinedText = recentMessages.map(m => m.content.toLowerCase()).join(' ');
      
      // Detect what context areas are currently active in the conversation
      const newContext: string[] = [];
      
      if (recentMessages.some(m => m.intentDetected === 'technical' || 
          combinedText.includes('neural') || 
          combinedText.includes('engine') || 
          combinedText.includes('algorithm'))) {
        newContext.push('technical');
      }
      
      if (recentMessages.some(m => m.intentDetected === 'business' || 
          combinedText.includes('pricing') || 
          combinedText.includes('implementation'))) {
        newContext.push('business');
      }
      
      if (recentMessages.some(m => m.intentDetected === 'creative' || 
          combinedText.includes('design') || 
          combinedText.includes('create'))) {
        newContext.push('creative');
      }
      
      if (recentMessages.some(m => m.intentDetected === 'philosophical' || 
          combinedText.includes('ethics') || 
          combinedText.includes('consciousness'))) {
        newContext.push('philosophical');
      }
      
      if (recentMessages.some(m => m.intentDetected === 'educational' || 
          combinedText.includes('learn') || 
          combinedText.includes('teach'))) {
        newContext.push('educational');
      }
      
      // Set new active context
      setActiveContext(newContext.length > 0 ? newContext : ['general']);
      
      // Generate contextual suggestions using advanced NLP techniques
      let newSuggestions: SuggestionType[] = [];
      
      // Use attention mechanisms to find relevant topics
      const tokens = combinedText.split(/\s+/);
      const attentions = attentionMechanisms.selfAttention(tokens, combinedText);
      const topAttentionTokens = attentions.slice(0, 5).map(a => a.token);
      
      // Generate suggestions based on context and attention
      if (newContext.includes('technical')) {
        newSuggestions = [
          ...newSuggestions,
          { 
            id: `t1_${Date.now()}`, 
            text: 'How does your Neural Intelligence Engine handle contextual understanding?', 
            category: 'technical',
            priority: 0.9,
            contextRelevance: 0.85
          },
          { 
            id: `t2_${Date.now()}`, 
            text: 'What transformer architectures do your models use?', 
            category: 'technical',
            priority: 0.85,
            contextRelevance: 0.8
          },
          {
            id: `t3_${Date.now()}`,
            text: 'How does your system handle multimodal inputs?',
            category: 'technical',
            priority: 0.8,
            contextRelevance: 0.75
          }
        ];
      }
      
      if (newContext.includes('business')) {
        newSuggestions = [
          ...newSuggestions,
          { 
            id: `b1_${Date.now()}`, 
            text: 'What industries benefit most from your neural intelligence solutions?', 
            category: 'business',
            priority: 0.9,
            contextRelevance: 0.8
          },
          { 
            id: `b2_${Date.now()}`, 
            text: 'How do you implement personalized AI for enterprise clients?', 
            category: 'business',
            priority: 0.85,
            contextRelevance: 0.75
          },
          {
            id: `b3_${Date.now()}`,
            text: 'What measurable ROI do clients typically see?',
            category: 'business',
            priority: 0.8,
            contextRelevance: 0.7
          }
        ];
      }
      
      if (newContext.includes('creative')) {
        newSuggestions = [
          ...newSuggestions,
          { 
            id: `c1_${Date.now()}`, 
            text: 'How does your AI enhance creative decision-making processes?', 
            category: 'creative',
            priority: 0.9,
            contextRelevance: 0.85
          },
          { 
            id: `c2_${Date.now()}`, 
            text: 'Can your AI generate novel concepts based on partial descriptions?', 
            category: 'creative',
            priority: 0.85,
            contextRelevance: 0.8
          },
          {
            id: `c3_${Date.now()}`,
            text: 'How do you balance creativity and practicality in AI-generated solutions?',
            category: 'creative',
            priority: 0.8,
            contextRelevance: 0.75
          }
        ];
      }
      
      if (newContext.includes('philosophical')) {
        newSuggestions = [
          ...newSuggestions,
          { 
            id: `p1_${Date.now()}`, 
            text: 'How do you approach ethical considerations in AI development?', 
            category: 'philosophical',
            priority: 0.9,
            contextRelevance: 0.85
          },
          { 
            id: `p2_${Date.now()}`, 
            text: 'What frameworks do you use for value alignment in AI?', 
            category: 'philosophical',
            priority: 0.85,
            contextRelevance: 0.8
          },
          {
            id: `p3_${Date.now()}`,
            text: 'Do you think AI systems can develop consciousness?',
            category: 'philosophical',
            priority: 0.8,
            contextRelevance: 0.75
          }
        ];
      }
      
      if (newContext.includes('educational')) {
        newSuggestions = [
          ...newSuggestions,
          { 
            id: `e1_${Date.now()}`, 
            text: 'How can your AI be used in educational contexts?', 
            category: 'educational',
            priority: 0.9,
            contextRelevance: 0.85
          },
          { 
            id: `e2_${Date.now()}`, 
            text: 'What learning models does your AI use to adapt to users?', 
            category: 'educational',
            priority: 0.85,
            contextRelevance: 0.8
          },
          {
            id: `e3_${Date.now()}`,
            text: 'How does your AI personalize learning experiences?',
            category: 'educational',
            priority: 0.8,
            contextRelevance: 0.75
          }
        ];
      }
      
      if (newContext.includes('general') || newContext.length === 0) {
        newSuggestions = [
          ...newSuggestions,
          { 
            id: `g1_${Date.now()}`, 
            text: 'What makes NeuraX AI different from other AI solutions?', 
            category: 'general',
            priority: 0.9,
            contextRelevance: 0.85
          },
          { 
            id: `g2_${Date.now()}`, 
            text: 'How can I get started with your neural intelligence services?', 
            category: 'general',
            priority: 0.85,
            contextRelevance: 0.8
          },
          {
            id: `g3_${Date.now()}`,
            text: 'What recent breakthroughs have you made in AI technology?',
            category: 'general',
            priority: 0.8,
            contextRelevance: 0.75
          }
        ];
      }
      
      // Filter suggestions to the top 5 most relevant
      const sortedSuggestions = newSuggestions
        .sort((a, b) => (b.priority || 0) * (b.contextRelevance || 0) - (a.priority || 0) * (a.contextRelevance || 0))
        .slice(0, 5);
      
      setSuggestions(sortedSuggestions);

      // Update the agent based on detected context
      if (newContext.includes('technical')) {
        setActiveAgent('technical');
      } else if (newContext.includes('creative')) {
        setActiveAgent('creative');
      } else if (newContext.includes('business')) {
        setActiveAgent('research');
      } else if (newContext.includes('philosophical')) {
        setActiveAgent('philosophical');
      } else if (newContext.includes('educational')) {
        setActiveAgent('multimodal');
      } else {
        setActiveAgent('assistant');
      }
      
      // Simulate neural activation
      setNeuralActivation(0.3 + Math.random() * 0.5);
      
      // Update contextual memory
      contextualMemory.addToShortTerm(combinedText);
      
      // Update in-context learning state
      if (adaptiveLearningEnabled && recentMessages.length > 0 && recentMessages[0].sentiment) {
        inContextLearning.updateFromInteraction(
          combinedText, 
          recentMessages[0].sentiment
        );
      }
    }
  }, [messages.length, adaptiveLearningEnabled]);

  // Simulate NLP analysis on user input with advanced features
  const analyzeUserInput = (text: string): {
    intent: string, 
    entities: Array<{type: string, value: string, confidence: number}>, 
    sentiment: 'positive' | 'neutral' | 'negative' | 'mixed',
    confidenceScore: number,
    neuralPathways: Array<{source: string, target: string, strength: number}>,
    multilayerIntents: Array<{level: number, intent: string, confidence: number}>,
    crossLingualDetected: boolean,
    contextualMemory: string[],
    inContextLearning: {
      learningRate: number,
      adaptationLevel: number,
      personalizationVector: number[]
    }
  } => {
    // Intent detection (enhanced)
    let detectedIntent = 'general';
    let highestScore = 0;
    
    // Primary intent detection
    Object.entries(intentPatterns).forEach(([intent, patterns]) => {
      let score = 0;
      patterns.forEach(pattern => {
        if (text.toLowerCase().includes(pattern)) {
          score += 0.2;  // Each matching pattern increases score
        }
      });
      
      // Additional weighting based on context
      if (activeContext.includes(intent)) {
        score *= 1.5;  // Boost score if intent matches active context
      }
      
      if (score > highestScore) {
        highestScore = score;
        detectedIntent = intent;
      }
    });
    
    // Entity recognition (enhanced)
    const entities: Array<{type: string, value: string, confidence: number}> = [];
    Object.entries(entityPatterns).forEach(([type, patterns]) => {
      patterns.forEach(pattern => {
        if (text.toLowerCase().includes(pattern)) {
          // Calculate confidence based on match quality
          const confidence = 0.7 + (Math.random() * 0.3);
          entities.push({ type, value: pattern, confidence });
        }
      });
    });
    
    // Sentiment analysis (enhanced with mixed sentiment detection)
    let sentiment: 'positive' | 'neutral' | 'negative' | 'mixed' = 'neutral';
    let posScore = 0;
    let negScore = 0;
    
    sentimentPatterns.positive.forEach(term => {
      if (text.toLowerCase().includes(term)) posScore += 1;
    });
    
    sentimentPatterns.negative.forEach(term => {
      if (text.toLowerCase().includes(term)) negScore += 1;
    });
    
    // Determine sentiment based on scores
    if (posScore > 0 && negScore > 0) {
      sentiment = 'mixed';
    } else if (posScore > negScore) {
      sentiment = 'positive';
    } else if (negScore > posScore) {
      sentiment = 'negative';
    } else {
      sentiment = 'neutral';
    }
    
    // Multi-level intent hierarchy (inspired by hierarchical transformer models)
    const multilayerIntents = [
      { level: 1, intent: detectedIntent, confidence: highestScore },
    ];
    
    // Add secondary intent if available
    const secondaryIntents = Object.entries(intentPatterns)
      .filter(([intent]) => intent !== detectedIntent)
      .map(([intent, patterns]) => {
        let score = 0;
        patterns.forEach(pattern => {
          if (text.toLowerCase().includes(pattern)) {
            score += 0.15;
          }
        });
        return { intent, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    
    if (secondaryIntents.length > 0) {
      multilayerIntents.push({ 
        level: 2, 
        intent: secondaryIntents[0].intent, 
        confidence: secondaryIntents[0].score 
      });
    }
    
    // Neural pathways simulation (for visualization)
    const neuralPathways = [];
    const tokens = text.toLowerCase().split(/\s+/).filter(t => t.length > 3);
    
    // Create connections between tokens based on co-occurrence
    for (let i = 0; i < tokens.length; i++) {
      for (let j = i+1; j < Math.min(i+4, tokens.length); j++) {
        const strength = 0.5 + Math.random() * 0.5; // Random strength between 0.5 and 1.0
        neuralPathways.push({
          source: tokens[i],
          target: tokens[j],
          strength
        });
      }
    }
    
    // Add connections to detected entities
    entities.forEach(entity => {
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
      neuralPathways.push({
        source: randomToken || 'input',
        target: entity.value,
        strength: entity.confidence
      });
    });
    
    // Cross-lingual detection
    const detectedLanguage = crossLingualMapping.detectLanguage(text);
    const crossLingualDetected = detectedLanguage !== 'en';
    
    // Retrieve contextual memory
    const relevantMemory = contextualMemory.retrieveRelevant(text);
    
    // Generate simulated confidence score
    const confidenceScore = 0.7 + (0.1 * entities.length) + (highestScore * 0.2);
    
    // Get in-context learning state
    const learningState = {
      learningRate: inContextLearning.adaptationState.learningRate,
      adaptationLevel: inContextLearning.adaptationState.personalityAdaptation,
      personalizationVector: inContextLearning.getPersonalizationVector()
    };
    
    return { 
      intent: detectedIntent, 
      entities, 
      sentiment, 
      confidenceScore,
      neuralPathways,
      multilayerIntents: multilayerIntents,
      crossLingualDetected,
      contextualMemory: relevantMemory,
      inContextLearning: learningState
    };
  };

  // Generate an advanced human-like response with contextual awareness
  const generateHumanLikeResponse = (query: string, nlpResults: any): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate response generation time based on complexity and agent parameters
      const currentAgent = agents.find(a => a.id === activeAgent);
      const responseLatency = currentAgent?.adaptiveParameters?.responseLatency || 0.3;
      const baseResponseTime = 1000 + (query.length * 10);
      const responseTime = baseResponseTime * responseLatency;
      
      // Predefined response templates based on detected intent
      const responseTemplates: {[key: string]: string[]} = {
        greeting: [
          "Hi there! Great to meet you. How can I assist you today with NeuraX AI solutions?",
          "Hello! I'm here to help with all your AI needs. What can I do for you?",
          "Hey! Thanks for reaching out. What aspects of AI are you interested in exploring?"
        ],
        technical: [
          "From a technical perspective, our Neural Intelligence Engine uses advanced deep learning techniques that can process and understand complex data patterns. Would you like me to elaborate on any specific aspect?",
          "Our architecture combines transformer models with proprietary neural network designs, allowing for contextual understanding across diverse data types. I'd be happy to dive deeper into any area you're curious about.",
          "The technical foundation of our solution incorporates multi-modal learning systems with adaptive feedback loops. Is there a particular technical challenge you're looking to solve?"
        ],
        business: [
          "From a business standpoint, our AI solutions typically deliver 30-40% efficiency improvements within the first quarter of implementation. I can share more specific ROI details based on your industry.",
          "Our business approach focuses on measurable outcomes and tailored implementation strategies. Would you like to know how we've helped similar companies in your sector?",
          "We've developed flexible pricing models designed to scale with your business needs. What specific business outcomes are you hoping to achieve with AI?"
        ],
        creative: [
          "Our creative AI capabilities extend to design assistance, content generation, and innovative problem-solving approaches. I'd love to hear more about your creative projects.",
          "The creative applications of our technology include pattern recognition for design inspiration and contextual understanding for content creation. How might this enhance your creative workflow?",
          "We've developed AI that acts as a creative partner rather than just a tool, offering suggestions that spark new ideas while preserving your unique vision. What type of creative work are you involved in?"
        ],
        philosophical: [
          "That's a profound question. At NeuraX, we believe AI ethics should be built into the foundation of every system, not added as an afterthought. Our approach prioritizes transparency and human values alignment.",
          "The philosophical dimensions of AI are fascinating to explore. We've developed frameworks that help navigate the complex interplay between technological capability and ethical responsibility.",
          "I appreciate your interest in the deeper implications of AI. Our work is guided by principles that recognize both the transformative potential of AI and the importance of developing it responsibly."
        ],
        educational: [
          "In educational contexts, our AI adapts to individual learning styles through continuous interaction analysis. This creates personalized learning experiences that evolve with the learner.",
          "We've developed specialized educational modules that can identify knowledge gaps and create tailored curricula. The system learns from each interaction to better support learning objectives.",
          "Our approach to educational AI focuses on augmentation rather than replacement - enhancing human teaching capabilities while providing insights that help educators better understand student needs."
        ],
        inquiry: [
          "That's a great question. Based on your interest, I think you'll find that our approach to AI is focused on explainability and practical outcomes rather than black-box solutions.",
          "I'm glad you asked about that. The answer depends somewhat on your specific context, but I can share how we typically address this challenge.",
          "That's something we've thought deeply about. The short answer is that it depends on several factors specific to your situation, but I can explain our general approach."
        ],
        general: [
          "NeuraX AI specializes in culturally intelligent, explainable AI solutions for education and healthcare sectors. Our technology bridges the gap between AI capabilities and human understanding.",
          "We offer Neural Intelligence Engine, AI Personalization Framework, DevAI Platform, and Custom AI Solutions tailored to your specific business needs.",
          "AI can help your business automate routine tasks, derive insights from data, personalize customer experiences, and make data-driven decisions faster and more accurately."
        ]
      };
      
      let responseBase = "";
      
      // Select appropriate response template based on detected intent
      if (nlpResults.intent in responseTemplates) {
        const templates = responseTemplates[nlpResults.intent];
        responseBase = templates[Math.floor(Math.random() * templates.length)];
      } else {
        responseBase = responseTemplates.general[Math.floor(Math.random() * responseTemplates.general.length)];
      }
      
      // Personalize based on detected entities
      if (nlpResults.entities.length > 0) {
        const entity = nlpResults.entities[0];
        if (entity.type === 'product' && entity.value.includes('neural intelligence')) {
          responseBase += " Our Neural Intelligence Engine specifically uses advanced deep learning techniques to understand context, sentiment, and cultural nuances in data.";
        } else if (entity.type === 'industry') {
          responseBase += ` We have significant experience in the ${entity.value} sector, where our AI solutions have helped organizations improve efficiency and outcomes.`;
        } else if (entity.type === 'technology' && entity.value.includes('transformer')) {
          responseBase += " Our models utilize the latest advancements in transformer architecture with significant enhancements to attention mechanisms that allow for better contextual understanding.";
        } else if (entity.type === 'concept' && entity.value.includes('ethics')) {
          responseBase += " We've developed a comprehensive ethics framework that guides all our AI development, ensuring alignment with human values and responsible innovation.";
        }
      }
      
      // Incorporate contextual memory if available
      if (nlpResults.contextualMemory && nlpResults.contextualMemory.length > 0) {
        const relevantMemory = nlpResults.contextualMemory[0];
        responseBase += ` As we discussed earlier regarding ${relevantMemory.substring(0, 30)}..., this relates to your current question because both involve aspects of intelligent systems.`;
      }
      
      // Add human-like filler words and natural pauses based on personality setting
      const fillerPhrases = [
        ", if that makes sense",
        " - in my experience",
        ", I believe",
        " (and this is important)",
        ", interestingly enough",
        ", based on recent research",
        ", which is quite fascinating",
        " - you might find this surprising"
      ];
      
      // Add filler phrases based on personality setting
      if (aiPersonality === 'conversational') {
        const numFillers = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numFillers; i++) {
          const randomPosition = Math.floor(Math.random() * responseBase.length);
          const randomFiller = fillerPhrases[Math.floor(Math.random() * fillerPhrases.length)];
          responseBase = responseBase.slice(0, randomPosition) + randomFiller + responseBase.slice(randomPosition);
        }
      }
      
      // Adjust response based on detected sentiment
      if (nlpResults.sentiment === 'negative') {
        responseBase += " I understand this might be frustrating. How can I better address your concerns?";
      } else if (nlpResults.sentiment === 'mixed') {
        responseBase += " I notice you have mixed feelings about this. Perhaps I can clarify some aspects that seem concerning while building on the positive elements.";
      }
      
      // Add agent-specific response modifications
      if (activeAgent === 'technical') {
        responseBase += " From a technical standpoint, I'd be happy to explain the underlying architecture in more detail if you're interested.";
      } else if (activeAgent === 'research') {
        responseBase += " Our research indicates that organizations implementing these solutions see a 27% average increase in decision quality.";
      } else if (activeAgent === 'creative') {
        responseBase += " This opens up creative possibilities that might not be immediately obvious but can lead to breakthrough innovations.";
      } else if (activeAgent === 'philosophical') {
        responseBase += " This raises fascinating questions about the nature of intelligence and human-AI collaboration that we're actively exploring.";
      } else if (activeAgent === 'multimodal') {
        responseBase += " By integrating multiple information streams, we create a more comprehensive understanding than any single modality could provide.";
      }
      
      // Handle cross-lingual detection if enabled
      if (multilingualMode && nlpResults.crossLingualDetected) {
        responseBase += " I noticed you might be using terms from another language. I'm designed to understand concepts across multiple languages.";
      }
      
      // Simulate adaptation from in-context learning
      if (adaptiveLearningEnabled && nlpResults.inContextLearning) {
        const adaptationLevel = nlpResults.inContextLearning.adaptationLevel;
        if (adaptationLevel > 0.5) {
          responseBase += " I've noticed patterns in our conversation that suggest this topic is important to you, so I'm tailoring my responses accordingly.";
        }
      }
      
      // Simulate "thinking" before responding
      setTimeout(() => {
        resolve(responseBase);
      }, responseTime);
    });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage('');
    setIsThinking(true);
    
    // Perform advanced NLP analysis on user input
    const nlpResults = analyzeUserInput(newUserMessage.content);
    
    // Update user message with NLP analysis results
    setMessages(prev => prev.map(msg => 
      msg.id === newUserMessage.id 
        ? { 
            ...msg, 
            intentDetected: nlpResults.intent, 
            entities: nlpResults.entities,
            sentiment: nlpResults.sentiment,
            confidenceScore: nlpResults.confidenceScore,
            neuralPathways: nlpResults.neuralPathways,
            multilayerIntentHierarchy: nlpResults.multilayerIntents,
            contextualMemory: nlpResults.contextualMemory,
            crossLingualUnderstanding: nlpResults.crossLingualDetected,
            inContextLearning: nlpResults.inContextLearning
          } 
        : msg
    ));
    
    // Generate human-like response
    const botResponse = await generateHumanLikeResponse(
      newUserMessage.content, 
      nlpResults
    );
    
    // Add bot response
    const newBotMessage: MessageType = {
      id: Date.now().toString(),
      content: botResponse,
      sender: 'bot',
      timestamp: new Date(),
      intentDetected: nlpResults.intent,
      entities: nlpResults.entities,
      sentiment: nlpResults.sentiment,
      confidenceScore: nlpResults.confidenceScore,
      neuralPathways: nlpResults.neuralPathways,
      contextualMemory: nlpResults.contextualMemory,
      neuralActivation: neuralActivation
    };
    
    // If voice is enabled, speak the response
    if (voiceEnabled) {
      try {
        // This is where you would integrate with a text-to-speech API
        // For now, just show a toast notification
        toast({
          title: "Voice synthesis",
          description: "Speaking response (TTS would play here)",
        });
      } catch (error) {
        console.error("Voice synthesis error:", error);
      }
    }
    
    setMessages((prev) => [...prev, newBotMessage]);
    setIsThinking(false);
  };

  // Handle pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Toggle voice recording
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recognition complete",
        description: "Processing your query..."
      });
      
      // Simulate advanced voice recognition with a timeout
      setTimeout(() => {
        setInputMessage("How does your neural network handle contextual understanding across different domains?");
        toast({
          title: "Voice processed",
          description: "Speech converted using neural-acoustic model"
        });
      }, 1500);
    } else {
      setIsRecording(true);
      toast({
        title: "Neural voice recognition active",
        description: "Using adaptive acoustic modeling to process speech."
      });
    }
  };

  // Use a suggestion
  const handleUseSuggestion = (suggestion: string) => {
    setInputMessage(suggestion);
    // Send the suggestion after a short delay
    setTimeout(() => {
      const newUserMessage: MessageType = {
        id: Date.now().toString(),
        content: suggestion,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newUserMessage]);
      setIsThinking(true);
      
      // Analyze with NLP
      const nlpResults = analyzeUserInput(suggestion);
      
      // Generate response based on the suggestion
      setTimeout(async () => {
        const botResponse = await generateHumanLikeResponse(suggestion, nlpResults);
        
        const newBotMessage: MessageType = {
          id: Date.now().toString(),
          content: botResponse,
          sender: 'bot',
          timestamp: new Date(),
          intentDetected: nlpResults.intent,
          entities: nlpResults.entities,
          sentiment: nlpResults.sentiment,
          confidenceScore: nlpResults.confidenceScore,
          neuralPathways: nlpResults.neuralPathways,
          contextualMemory: nlpResults.contextualMemory,
          neuralActivation: neuralActivation
        };
        
        setMessages((prev) => [...prev, newBotMessage]);
        setIsThinking(false);
      }, 2000);
    }, 300);
  };

  // Get the current agent details
  const getCurrentAgent = () => {
    return agents.find(agent => agent.id === activeAgent) || agents[0];
  };

  // Render entities badges
  const renderEntityBadges = (entities?: Array<{type: string, value: string, confidence?: number}>) => {
    if (!entities || entities.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {entities.map((entity, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="text-[10px] bg-neuraxBlue-light/20 text-neuraxGreen border-neuraxGreen/30 flex items-center gap-1"
          >
            {entity.type}: {entity.value}
            {entity.confidence && (
              <span className="opacity-70 text-[8px]">
                {Math.round(entity.confidence * 100)}%
              </span>
            )}
          </Badge>
        ))}
      </div>
    );
  };

  // Format confidence score
  const formatConfidence = (score?: number) => {
    if (!score) return '';
    return `${Math.round(score * 100)}%`;
  };

  // Render neural pathways visualization
  const renderNeuralPathways = (message: MessageType) => {
    if (!showNeuralPathways || !message.neuralPathways || message.neuralPathways.length === 0) return null;
    
    return (
      <div className="mt-2 p-2 bg-neuraxDark/50 rounded-md border border-neuraxGreen/20">
        <p className="text-[10px] text-neuraxGreen mb-1">Neural Activation Patterns:</p>
        <div className="flex flex-wrap gap-1">
          {message.neuralPathways.slice(0, 3).map((pathway, idx) => (
            <div key={idx} className="text-[9px] text-white/70 flex items-center">
              <span>{pathway.source}</span>
              <span className="mx-1 text-neuraxGreen">→</span>
              <span>{pathway.target}</span>
              <span className="ml-1 opacity-50">{Math.round(pathway.strength * 100)}%</span>
            </div>
          ))}
          {message.neuralPathways.length > 3 && (
            <span className="text-[9px] text-white/50">+{message.neuralPathways.length - 3} more</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[350px] md:w-[420px] h-[550px] rounded-2xl overflow-hidden bg-neuraxBlue border border-neuraxGreen shadow-lg shadow-neuraxGreen/30 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-neuraxBlue to-neuraxBlue-dark p-4 flex items-center justify-between border-b border-neuraxGreen/30">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10">
                  <DynamicAgentAvatar 
                    agentId={getCurrentAgent().id}
                    size="md"
                  />
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{getCurrentAgent().name}</h3>
                  <div className="flex items-center text-xs text-neuraxGreen">
                    <span className="h-2 w-2 rounded-full bg-neuraxGreen mr-1 animate-pulse"></span>
                    {getCurrentAgent().role}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <button className="text-white/70 hover:text-neuraxGreen transition-colors p-1 rounded-full">
                      <Brain size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-neuraxBlue border border-neuraxGreen/30 text-white">
                    <DropdownMenuLabel>Switch AI Agent</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neuraxGreen/20" />
                    {agents.map(agent => (
                      <DropdownMenuItem 
                        key={agent.id}
                        onClick={() => setActiveAgent(agent.id)}
                        className={`flex items-center gap-2 cursor-pointer ${activeAgent === agent.id ? 'bg-neuraxGreen/20' : ''}`}
                      >
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-neuraxBlue-dark border border-neuraxGreen/30">
                          <DynamicAgentAvatar 
                            agentId={agent.id}
                            size="sm"
                          />
                        </div>
                        <div>
                          <div className="text-sm">{agent.name}</div>
                          <div className="text-xs text-gray-400">{agent.role}</div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="text-white/70 hover:text-neuraxGreen transition-colors p-1 rounded-full"
                >
                  <Network size={16} />
                </button>
                <button 
                  onClick={() => setIsHistoryOpen(true)}
                  className="text-white/70 hover:text-neuraxGreen transition-colors p-1 rounded-full"
                >
                  <History size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-neuraxGreen transition-colors p-1 rounded-full"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 bg-neuraxDark/50 backdrop-blur-sm space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <DynamicAgentAvatar 
                        agentId={getCurrentAgent().id}
                        size="sm"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-neuraxGreen/80 text-neuraxDark ml-4'
                        : 'bg-neuraxBlue text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Display sentiment, entities, and neural visualization for advanced understanding */}
                    {message.sender === 'bot' && message.entities && message.entities.length > 0 && (
                      renderEntityBadges(message.entities)
                    )}
                    
                    {/* Render neural pathways if enabled */}
                    {message.sender === 'bot' && renderNeuralPathways(message)}
                    
                    {/* Multilayered intent display */}
                    {message.sender === 'user' && message.multilayerIntentHierarchy && message.multilayerIntentHierarchy.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {message.multilayerIntentHierarchy.map((intent, idx) => (
                          <Badge 
                            key={idx}
                            variant="outline" 
                            className="text-[9px] bg-neuraxDark/40 text-neuraxGreen/90 border-neuraxGreen/20"
                          >
                            L{intent.level}: {intent.intent} ({Math.round(intent.confidence * 100)}%)
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[10px] opacity-70">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                      
                      {message.confidenceScore && (
                        <div className="flex items-center gap-1">
                          {message.neuralActivation && message.sender === 'bot' && (
                            <div className="flex items-center">
                              <span className="text-[9px] opacity-50 mr-1">NA:</span>
                              <div className="w-10 h-1 bg-neuraxGreen/20 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-neuraxGreen" 
                                  style={{width: `${message.neuralActivation * 100}%`}}
                                ></div>
                              </div>
                            </div>
                          )}
                          <p className="text-[9px] opacity-60">
                            {formatConfidence(message.confidenceScore)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                      <AvatarFallback className="bg-neuraxBlue-light text-white">
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
              
              {isThinking && (
                <div className="flex justify-start">
                  <div className="h-8 w-8 mr-2 flex-shrink-0">
                    <DynamicAgentAvatar 
                      agentId={getCurrentAgent().id}
                      size="sm"
                      animationSpeed="fast"
                    />
                  </div>
                  <div className="bg-neuraxBlue max-w-[80%] rounded-2xl px-4 py-2 text-white">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Active context display */}
              {activeContext.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center my-2">
                  {activeContext.map(context => (
                    <Badge 
                      key={context} 
                      variant="outline" 
                      className="text-[10px] bg-neuraxBlue/30 text-neuraxGreen border-neuraxGreen/30"
                    >
                      {context} context
                    </Badge>
                  ))}
                </div>
              )}
              
              <div ref={messageEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-4 py-2 bg-neuraxBlue-dark/70 border-t border-neuraxBlue-light/20">
                <p className="text-xs text-neuraxGreen mb-2">Neural-suggested queries:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleUseSuggestion(suggestion.text)}
                      className="text-xs bg-neuraxBlue-light/30 hover:bg-neuraxGreen/20 text-white hover:text-neuraxGreen rounded-full px-3 py-1 transition-colors duration-200 flex items-center gap-1"
                    >
                      {suggestion.category === 'technical' && <BrainCircuit size={12} />}
                      {suggestion.category === 'business' && <Microchip size={12} />}
                      {suggestion.category === 'creative' && <Brain size={12} />}
                      {suggestion.category === 'philosophical' && <MessageSquare size={12} />}
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="p-3 bg-neuraxBlue-dark border-t border-neuraxGreen/30 flex items-center space-x-2">
              <button
                onClick={() => setIsAttachmentDialogOpen(true)}
                className="p-2 text-white/70 hover:text-neuraxGreen transition-colors rounded-full"
              >
                <PaperclipIcon size={18} />
              </button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask ${getCurrentAgent().name} something...`}
                className="flex-1 bg-neuraxBlue-light/30 border-neuraxGreen/20 focus-visible:ring-neuraxGreen text-white placeholder:text-white/50"
              />
              <button
                onClick={handleToggleRecording}
                className={`p-2 ${
                  isRecording ? 'text-neuraxGreen animate-pulse' : 'text-white/70 hover:text-neuraxGreen'
                } transition-colors rounded-full`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className={`p-2 ${
                  inputMessage.trim() === ''
                    ? 'text-white/30 cursor-not-allowed'
                    : 'text-neuraxGreen hover:text-white'
                } transition-colors rounded-full`}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-neuraxGreen opacity-20 group-hover:opacity-40 transition-opacity"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        />
        <motion.div
          className="h-14 w-14 bg-neuraxDark border-2 border-neuraxGreen rounded-full flex items-center justify-center shadow-lg shadow-neuraxGreen/30 relative z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle 
            className="text-neuraxGreen" 
            size={24}
          />
          {!isOpen && messages.length > 1 && (
            <motion.div 
              className="absolute -top-2 -right-2 h-5 w-5 bg-neuraxGreen rounded-full flex items-center justify-center text-xs font-bold text-neuraxDark"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {messages.length - 1}
            </motion.div>
          )}
        </motion.div>
      </button>

      {/* History Drawer */}
      <Drawer open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DrawerContent className="bg-neuraxBlue border-t border-neuraxGreen/30 max-h-[60vh]">
          <div className="p-4">
            <h3 className="text-lg font-medium text-white mb-4">Conversation Memory</h3>
            <Command className="bg-neuraxBlue-dark border border-neuraxGreen/20 rounded-lg overflow-hidden">
              <CommandInput placeholder="Search messages..." className="text-white" />
              <CommandList className="max-h-[300px]">
                <CommandEmpty>No messages found.</CommandEmpty>
                <CommandGroup heading="Recent Interactions">
                  {messages.filter(m => m.sender === 'user').map((message) => (
                    <CommandItem 
                      key={message.id}
                      className="flex items-start py-2 cursor-pointer hover:bg-neuraxBlue-light/20"
                    >
                      <div className="w-full">
                        <p className="text-sm text-white">{message.content}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-gray-400">
                            {message.timestamp.toLocaleDateString()} at {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          
                          <div className="flex items-center gap-1">
                            {message.intentDetected && (
                              <Badge variant="outline" className="text-[9px] ml-2">
                                {message.intentDetected}
                              </Badge>
                            )}
                            
                            {message.sentiment && (
                              <Badge 
                                variant="outline" 
                                className={`text-[9px] ml-1 ${
                                  message.sentiment === 'positive' ? 'border-green-500 text-green-500' :
                                  message.sentiment === 'negative' ? 'border-red-400 text-red-400' :
                                  message.sentiment === 'mixed' ? 'border-yellow-400 text-yellow-400' :
                                  'border-gray-400 text-gray-400'
                                }`}
                              >
                                {message.sentiment}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="bg-neuraxBlue border border-neuraxGreen/50 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Neural System Settings</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="personality" className="w-full">
            <TabsList className="grid grid-cols-4 bg-neuraxBlue-dark">
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="personality" className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white">AI Personality</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['helpful', 'conversational', 'concise'].map(personality => (
                      <button
                        key={personality}
                        onClick={() => setAiPersonality(personality)}
                        className={`px-3 py-2 text-xs rounded-md ${
                          aiPersonality === personality 
                            ? 'bg-neuraxGreen text-neuraxDark' 
                            : 'bg-neuraxBlue-light/30 text-white'
                        }`}
                      >
                        {personality.charAt(0).toUpperCase() + personality.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white">Conversation Context</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['casual', 'technical', 'business'].map(context => (
                      <button
                        key={context}
                        onClick={() => setConversationContext(context)}
                        className={`px-3 py-2 text-xs rounded-md ${
                          conversationContext === context 
                            ? 'bg-neuraxGreen text-neuraxDark' 
                            : 'bg-neuraxBlue-light/30 text-white'
                        }`}
                      >
                        {context.charAt(0).toUpperCase() + context.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="p-4">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-white">Responsiveness</label>
                    <span className="text-xs text-neuraxGreen">{aiResponsiveness}%</span>
                  </div>
                  <Slider
                    value={[aiResponsiveness]}
                    onValueChange={(values) => setAiResponsiveness(values[0])}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Controls how quickly the neural system responds to prompts
                  </p>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <label className="text-sm text-white">Creativity</label>
                    <span className="text-xs text-neuraxGreen">{aiCreativity}%</span>
                  </div>
                  <Slider
                    value={[aiCreativity]}
                    onValueChange={(values) => setAiCreativity(values[0])}
                    max={100}
                    step={10}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Higher values create more varied and creative responses
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Show Neural Pathways</label>
                  <button
                    onClick={() => setShowNeuralPathways(!showNeuralPathways)}
                    className={`w-10 h-5 rounded-full relative ${
                      showNeuralPathways ? 'bg-neuraxGreen' : 'bg-neuraxBlue-light/50'
                    }`}
                  >
                    <div
                      className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${
                        showNeuralPathways ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="voice" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Enable Voice</label>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`w-10 h-5 rounded-full relative ${
                      voiceEnabled ? 'bg-neuraxGreen' : 'bg-neuraxBlue-light/50'
                    }`}
                  >
                    <div
                      className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${
                        voiceEnabled ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div>
                  <label className="text-sm text-white">Voice Options</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Natural', 'Professional', 'Friendly', 'Technical'].map(voice => (
                      <button
                        key={voice}
                        disabled={!voiceEnabled}
                        className={`px-3 py-2 text-xs rounded-md ${
                          !voiceEnabled 
                            ? 'bg-neuraxBlue-light/10 text-white/50 cursor-not-allowed' 
                            : 'bg-neuraxBlue-light/30 text-white hover:bg-neuraxGreen/20'
                        }`}
                      >
                        {voice}
                      </button>
                    ))}
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mt-4">
                  Neural voice synthesis allows the AI to speak responses with human-like intonation. 
                  Note: This feature uses your device's audio capabilities.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Multilingual Mode</label>
                  <button
                    onClick={() => setMultilingualMode(!multilingualMode)}
                    className={`w-10 h-5 rounded-full relative ${
                      multilingualMode ? 'bg-neuraxGreen' : 'bg-neuraxBlue-light/50'
                    }`}
                  >
                    <div
                      className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${
                        multilingualMode ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-white">Adaptive Learning</label>
                  <button
                    onClick={() => setAdaptiveLearningEnabled(!adaptiveLearningEnabled)}
                    className={`w-10 h-5 rounded-full relative ${
                      adaptiveLearningEnabled ? 'bg-neuraxGreen' : 'bg-neuraxBlue-light/50'
                    }`}
                  >
                    <div
                      className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-all ${
                        adaptiveLearningEnabled ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div>
                  <label className="text-sm text-white">Document Context</label>
                  <div className="mt-2 p-2 bg-neuraxBlue-dark/80 rounded-md border border-neuraxGreen/20 text-sm">
                    <p className="text-xs text-gray-300 italic">
                      No documents available in context. Upload documents to enable document-grounded responses.
                    </p>
                  </div>
                </div>
                
                <p className="text-xs text-neuraxGreen mt-2">
                  Advanced settings modify the neural system's adaptive capabilities. 
                  Changes may take effect gradually as the system learns from your interactions.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Attachment Dialog */}
      <Dialog open={isAttachmentDialogOpen} onOpenChange={setIsAttachmentDialogOpen}>
        <DialogContent className="bg-neuraxBlue border border-neuraxGreen/50 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Add to Neural Context</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed border-neuraxGreen/30 rounded-lg p-10 text-center cursor-pointer hover:bg-neuraxBlue-light/10 transition-colors">
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <PaperclipIcon className="h-10 w-10 mx-auto text-neuraxGreen/60 mb-2" />
                <p className="text-white text-sm">Click to upload or drag and drop</p>
                <p className="text-white/50 text-xs mt-1">PDF, Images, Audio, Data (max 20MB)</p>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsAttachmentDialogOpen(false)}
                className="px-4 py-2 bg-neuraxBlue-light text-white rounded-md hover:bg-neuraxBlue transition-colors"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-neuraxGreen text-neuraxDark rounded-md hover:bg-neuraxGreen/80 transition-colors"
              >
                Process & Add
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatBot;
