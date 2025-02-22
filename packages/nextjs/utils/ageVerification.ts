export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const isOver18 = (): boolean => {
  const storedAge = getStoredAge();
  return storedAge ? storedAge >= 18 : false;
};

export const getStoredAge = (): number | null => {
  if (typeof window === 'undefined') return null;
  const age = localStorage.getItem('userAge');
  return age ? parseInt(age) : null;
};

export const setStoredAge = (age: number): void => {
  localStorage.setItem('userAge', age.toString());
};

export const isVerified = (): boolean => {
  return getStoredAge() !== null && isOver18();
};
