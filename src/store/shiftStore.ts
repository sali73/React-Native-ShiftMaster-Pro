import { create } from 'zustand';

// TypeScript Interface لتعريف شكل بيانات الوردية
export interface Shift {
  id: string;
  role: string;
  company: string;
  payRate: number;
  duration: string;
  location: string;
  status: 'available' | 'accepted';
}

interface ShiftState {
  shifts: Shift[];
  acceptShift: (id: string) => void;
}

// Mock Data كأنها جاية من السيرفر لايف
const initialShifts: Shift[] = [
  { id: '1', role: 'Frontend Engineer (React)', company: 'TechCorp', payRate: 75, duration: '8 hrs (9 AM - 5 PM)', location: 'New York, NY', status: 'available' },
  { id: '2', role: 'Full-Stack Developer', company: 'LogiSoft', payRate: 85, duration: '6 hrs (12 PM - 6 PM)', location: 'Staten Island, NY', status: 'available' },
  { id: '3', role: 'UI/UX Mobile Designer', company: 'CreativeCo', payRate: 65, duration: '5 hrs (1 PM - 6 PM)', location: 'Remote', status: 'available' },
  { id: '4', role: 'DevOps Specialist', company: 'CloudNet', payRate: 95, duration: '8 hrs (10 AM - 6 PM)', location: 'Jersey City, NJ', status: 'available' },
];

export const useShiftStore = create<ShiftState>((set) => ({
  shifts: initialShifts,
  acceptShift: (id) => set((state) => ({
    shifts: state.shifts.map((shift) => 
      shift.id === id ? { ...shift, status: 'accepted' } : shift
    )
  })),
}));