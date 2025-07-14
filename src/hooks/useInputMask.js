import { useEffect } from 'react';

export default function useInputMask(ref, pattern) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const formatters = {
      pin: (v) =>
        v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1-').replace(/-$/, ''),
      tel: (v) =>
        v
          .replace(/\D/g, '')
          .slice(0, 10)
          .replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, (_, a, b, c) =>
            c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a
          ),
      usd: (v) =>
        v
          .replace(/[^\d.]/g, '')
          .replace(/^0+(?=\d)/, '')
          .replace(/^(\d*)(\.\d{0,2}).*$/, '$1$2')
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    };

    function onInput(e) {
      const { value } = e.target;
      e.target.value = formatters[pattern] ? formatters[pattern](value) : value;
    }

    el.addEventListener('input', onInput);
    return () => el.removeEventListener('input', onInput);
  }, [ref, pattern]);
}
