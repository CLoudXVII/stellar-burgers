import { ChangeEvent, useState } from 'react';

export function useForm<T extends Record<string, string>>(
  initialValues: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [form, setForm] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return [form, handleChange];
}
