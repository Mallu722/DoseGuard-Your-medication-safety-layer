import api from './axios';

export interface Prescription {
  _id?: string;
  userId: string;
  originalFileName: string;
  fileUrl: string;
  fileType: 'image' | 'pdf';
  uploadDate?: string;
  prescriptionDate?: string;
  provider?: string;
  medicineCount?: number;
  status: 'Processing' | 'Completed' | 'Failed' | 'Archived';
  medications?: string[];
  notes?: string;
}

export const prescriptionService = {
  async getAll() {
    const response = await api.get('/prescriptions');
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get(`/prescriptions/${id}`);
    return response.data;
  },

  async create(prescription: Omit<Prescription, '_id' | 'uploadDate' | 'medications'>) {
    const response = await api.post('/prescriptions', prescription);
    return response.data;
  },

  async update(id: string, prescription: Partial<Prescription>) {
    const response = await api.put(`/prescriptions/${id}`, prescription);
    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/prescriptions/${id}`);
    return response.data;
  }
};