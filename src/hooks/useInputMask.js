import { useEffect } from 'react';

export default function useInputMask(ref, pattern){
  useEffect(()=>{
    if(!ref.current) return;
    const el = ref.current;

    function format(v){
      return v.replace(/\D/g,'')
              .slice(0,16)
              .replace(/(.{4})/g,'$1-')
              .replace(/-$/,'');
    }

    function onInput(e){
      const { value } = e.target;
      e.target.value = pattern === 'pin' ? format(value) : value;
    }

    el.addEventListener('input', onInput);
    return ()=> el.removeEventListener('input', onInput);
  },[ref,pattern]);
}
