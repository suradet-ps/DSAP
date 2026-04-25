import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { useAssessmentStore } from '@/stores/assessment';

describe('assessment store', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('applies waterfall scoring across levels', () => {
    const store = useAssessmentStore();

    expect(store.getStandardLevel(1)).toBe(0);

    store.toggleCriterion(1, '1-1-1');
    expect(store.getStandardLevel(1)).toBe(0);

    store.toggleCriterion(1, '1-1-2');
    expect(store.getStandardLevel(1)).toBe(1);

    store.toggleCriterion(1, '1-2-1');
    expect(store.getStandardLevel(1)).toBe(1);

    store.toggleCriterion(1, '1-2-2');
    store.toggleCriterion(1, '1-2-3');
    store.toggleCriterion(1, '1-2-4');
    expect(store.getStandardLevel(1)).toBe(2);
  });

  it('resets assessment state safely', () => {
    const store = useAssessmentStore();

    store.updateHospitalInfo({ name: 'โรงพยาบาลตัวอย่าง', province: 'กรุงเทพมหานคร' });
    store.toggleCriterion(1, '1-1-1');
    store.toggleCriterion(1, '1-1-2');

    expect(store.getStandardLevel(1)).toBe(1);
    expect(store.assessmentState.hospitalInfo.name).toBe('โรงพยาบาลตัวอย่าง');

    store.resetAssessment();

    expect(store.getStandardLevel(1)).toBe(0);
    expect(store.assessmentState.hospitalInfo.name).toBe('');
    expect(store.assessmentState.progress[1]).toBeDefined();
    expect(store.assessmentState.progress[1]?.checkedCriteria).toEqual([]);
  });
});
