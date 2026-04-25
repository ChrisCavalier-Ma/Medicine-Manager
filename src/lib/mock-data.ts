import { AppData, CheckRecord, MedTime } from './types';

function generateCheckRecords(): CheckRecord[] {
  const records: CheckRecord[] = [];
  const today = new Date('2026-04-25');
  const medSchedules: { medId: string; times: MedTime[] }[] = [
    { medId: 'med-1', times: ['morning'] },
    { medId: 'med-2', times: ['morning', 'noon', 'evening'] },
    { medId: 'med-3', times: ['morning'] },
    { medId: 'med-4', times: ['evening'] },
  ];

  // Generate past 7 days with mostly checked records (simulating good compliance)
  for (let d = 6; d >= 1; d--) {
    const date = new Date(today);
    date.setDate(date.getDate() - d);
    const dateStr = date.toISOString().split('T')[0];
    const shouldMiss = d === 3 || d === 5; // miss a couple days for realism

    for (const schedule of medSchedules) {
      for (const time of schedule.times) {
        if (!shouldMiss || time !== 'noon') {
          records.push({ date: dateStr, medId: schedule.medId, time, checked: true });
        }
      }
    }
  }

  // Today: morning already taken
  const todayStr = '2026-04-25';
  records.push({ date: todayStr, medId: 'med-1', time: 'morning', checked: true });
  records.push({ date: todayStr, medId: 'med-2', time: 'morning', checked: true });
  records.push({ date: todayStr, medId: 'med-3', time: 'morning', checked: true });

  return records;
}

export const mockData: AppData = {
  user: {
    id: 'user-1',
    name: '王秀英',
    age: 65,
    conditions: ['高血压', '2型糖尿病'],
    doctor: '张建华',
    hospital: '北京协和医院',
  },
  medications: [
    {
      id: 'med-1',
      name: '厄贝沙坦片',
      spec: '0.15g × 14片/盒',
      dosage: '150mg',
      frequency: '每日一次',
      times: ['morning'],
      amountPerDose: 1,
      stockDays: 15,
      totalDays: 30,
      unit: '片',
      color: '#1677FF',
      isActive: true,
      indication: '高血压',
    },
    {
      id: 'med-2',
      name: '二甲双胍缓释片',
      spec: '0.5g × 60片/瓶',
      dosage: '0.5g',
      frequency: '每日三次',
      times: ['morning', 'noon', 'evening'],
      amountPerDose: 1,
      stockDays: 6,
      totalDays: 30,
      unit: '片',
      color: '#00B4B4',
      isActive: true,
      indication: '2型糖尿病',
    },
    {
      id: 'med-3',
      name: '阿司匹林肠溶片',
      spec: '100mg × 30片/盒',
      dosage: '100mg',
      frequency: '每日一次',
      times: ['morning'],
      amountPerDose: 1,
      stockDays: 22,
      totalDays: 30,
      unit: '片',
      color: '#FF7A45',
      isActive: true,
      indication: '抗血小板',
    },
    {
      id: 'med-4',
      name: '瑞舒伐他汀钙片',
      spec: '10mg × 7片/盒',
      dosage: '10mg',
      frequency: '每日一次',
      times: ['evening'],
      amountPerDose: 1,
      stockDays: 20,
      totalDays: 28,
      unit: '片',
      color: '#9254DE',
      isActive: true,
      indication: '调脂',
    },
  ],
  checkRecords: generateCheckRecords(),
  prescriptions: [
    {
      id: 'rx-1',
      date: '2026-03-20',
      doctor: '张建华',
      hospital: '北京协和医院',
      medicationNames: ['厄贝沙坦片', '二甲双胍缓释片', '阿司匹林肠溶片', '瑞舒伐他汀钙片'],
      expireDate: '2026-06-20',
    },
    {
      id: 'rx-2',
      date: '2025-12-15',
      doctor: '张建华',
      hospital: '北京协和医院',
      medicationNames: ['厄贝沙坦片', '二甲双胍缓释片'],
      expireDate: '2026-03-15',
    },
  ],
  revisit: {
    nextDate: '2026-05-15',
    doctor: '张建华',
    hospital: '北京协和医院',
    department: '内分泌科',
  },
  familyAccounts: [
    {
      id: 'family-1',
      name: '王建国',
      relation: '儿子',
      phone: '138****8888',
    },
    {
      id: 'family-2',
      name: '李梅',
      relation: '女儿',
      phone: '139****9999',
    },
  ],
};
