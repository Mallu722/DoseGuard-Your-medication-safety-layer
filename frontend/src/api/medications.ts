import api from './axios';

export interface Medication {
  _id?: string;
  userId: string;
  name: string;
  strength: string;
  frequency: string;
  timing?: string;
  source?: string;
  confidence: 'High' | 'Medium' | 'Low' | 'Needs confirmation';
  instructions?: string;
  notes?: string;
  isActive: boolean;
  addedDate?: string;
  lastUpdated?: string;
  prescriptionId?: string;
}

export const medicationService = {
  async getAll() {
    const response = await api.get('/medications');
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/medications/${id}`);
    return response.data;
  },

  async create(medication: Omit<Medication, '_id' | 'addedDate' | 'lastUpdated'>) {
    const response = await api.post('/medications', medication);
    return response.data;
  },

  async update(id: string, medication: Partial<Medication>) {
    const response = await api.put(`/medications/${id}`, medication);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/medications/${id}`);
    return response.data;
  }
};