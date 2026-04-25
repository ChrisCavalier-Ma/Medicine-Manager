export interface User {
  id: string;
  name: string;
  age: number;
  conditions: string[];
  doctor: string;
  hospital: string;
}

export type MedTime = 'morning' | 'noon' | 'evening';
export type MedFrequency = '每日一次' | '每日两次' | '每日三次' | '每周三次' | '必要时';

export interface Medication {
  id: string;
  name: string;
  spec: string;
  dosage: string;
  frequency: MedFrequency;
  times: MedTime[];
  amountPerDose: number;
  stockDays: number;
  totalDays: number;
  unit: string;
  color: string;
  isActive: boolean;
  indication?: string;
}

export interface CheckRecord {
  date: string; // YYYY-MM-DD
  medId: string;
  time: MedTime;
  checked: boolean;
}

export interface Prescription {
  id: string;
  date: string;
  doctor: string;
  hospital: string;
  medicationNames: string[];
  expireDate: string;
}

export interface RevisitInfo {
  nextDate: string;
  doctor: string;
  hospital: string;
  department: string;
}

export interface FamilyAccount {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export interface HealthRecord {
  date: string;       // YYYY-MM-DD
  systolic: number;   // 收缩压 mmHg
  diastolic: number;  // 舒张压 mmHg
  bloodSugar: number; // 空腹血糖 mmol/L
  heartRate?: number; // 心率 bpm
}

export interface AppData {
  user: User;
  medications: Medication[];
  checkRecords: CheckRecord[];
  prescriptions: Prescription[];
  revisit: RevisitInfo;
  familyAccounts: FamilyAccount[];
  healthRecords?: HealthRecord[];
}
