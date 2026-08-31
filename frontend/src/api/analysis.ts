import api from './axios';

export interface SafetySignal {
  _id?: string;
  userId: string;
  type: 'Duplicate Therapy' | 'Interaction Signal' | 'Schedule Inconsistency' | 'Missing Information' | 'Allergy Alert';
  severity: 'low' | 'medium' | 'high';
  medications: string[];
  description: string;
  explanation: string;
  recommendedAction: string;
  confidence: 'High' | 'Medium' | 'Low';
  isReviewed?: boolean;
  discussionItemId?: string;
  detectedAt?: string;
  resolvedAt?: string;
}

export interface DiscussionItem {
  _id?: string;
  userId: string;
  question: string;
  relatedSafetySignalId?: string;
  relatedMedicationIds?: string[];
  status: 'pending' | 'discussed' | 'resolved';
  notes?: string;
  addedAt?: string;
  discussedAt?: string;
}

export interface AnalysisSummary {
  totalMedications: number;
  duplicateTherapies: number;
  interactionSignals: number;
  totalSignals: number;
}

export interface AnalysisResponse {
  summary: AnalysisSummary;
  safetySignals: SafetySignal[];
  discussionItems: DiscussionItem[];
}

export const analysisService = {
  async analyze(medications: any[], userId: string) {
    const response = await api.post('/analysis/analyze', { medications, userId });
    return response.data;
  },

  async getSignals() {
    const response = await api.get('/analysis/signals');
    return response.data;
  },

  async getSignalById(id: string) {
    const response = await api.get(`/analysis/signals/${id}`);
    return response.data;
  },

  async reviewSignal(id: string) {
    const response = await api.put(`/analysis/signals/${id}/review`);
    return response.data;
  },

  async getDiscussionItems() {
    const response = await api.get('/analysis/discussion');
    return response.data;
  },

  async createDiscussionItem(data: Omit<DiscussionItem, '_id' | 'addedAt'>) {
    const response = await api.post('/analysis/discussion', data);
    return response.data;
  },

  async updateDiscussionItem(id: string, data: Partial<DiscussionItem>) {
    const response = await api.put(`/analysis/discussion/${id}`, data);
    return response.data;
  },

  async deleteDiscussionItem(id: string) {
    const response = await api.delete(`/analysis/discussion/${id}`);
    return response.data;
  }
};