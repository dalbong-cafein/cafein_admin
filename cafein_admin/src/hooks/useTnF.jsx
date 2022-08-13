import { useCallback, useState } from "react";

function useTnF(initialForm) {
  const [alert, setAlert] = useState(initialForm);

  const onOn = useCallback(() => setAlert(() => true), []);
  const onOff = useCallback(() => setAlert(() => false), []);

  return [alert, onOn, onOff];
}

export default useTnF;
