import { useCallback, useState } from "react";

export default function useInput(initialForm) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const onReset = useCallback(() => {
    setForm(() => initialForm);
  }, []);

  return [form, onChange, setForm, onReset];
}
