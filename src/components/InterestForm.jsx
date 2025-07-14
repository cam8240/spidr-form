import { useRef, useState } from 'react';
import useInputMask from '../hooks/useInputMask';

export default function InterestForm() {
  // refs for masked inputs
  const phoneRef = useRef(null);
  const guessRef = useRef(null);
  const pinRef   = useRef(null);

  // attach masks
  useInputMask(phoneRef, 'tel');  // (###) ###‑####
  useInputMask(guessRef, 'usd');  // 1,234.56
  useInputMask(pinRef,   'pin');  // ####‑####‑####‑####

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', guess: '', pin: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table(formData);

    // brief toast
    const toast = Object.assign(document.createElement('div'), {
      textContent: 'Thanks! Check the console for your data.'
    });
    Object.assign(toast.style, {
      position:'fixed', bottom:'1rem', right:'1rem',
      background:'var(--spidr-teal)', color:'#000',
      padding:'0.75rem 1rem', borderRadius:'6px',
      boxShadow:'0 2px 8px rgba(0,0,0,.3)', fontWeight:600, zIndex:9999
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom:'1rem', color:'var(--spidr-teal)' }}>
        Reserve your Air Fryer
      </h2>

      {['firstName','lastName','phone','email','guess'].map(f => (
        <div key={f}>
          <label htmlFor={f}>
            {{
              firstName:'First name', lastName:'Last name',
              phone:'Phone number',  email:'Email address', guess:'Your $ guess'
            }[f]}
          </label>

          <input
            id={f}
            name={f}
            ref={ f==='phone' ? phoneRef : f==='guess' ? guessRef : null }
            autoComplete={{
              firstName:'given-name', lastName:'family-name',
              phone:'tel', email:'email', guess:'off'
            }[f]}
            type={
              f==='guess' ? 'text' :
              f==='email' ? 'email' :
              f==='phone' ? 'tel'   : 'text'
            }
            required
            onChange={handleChange}
          />
        </div>
      ))}

      <label htmlFor="pin">16‑digit Spidr&nbsp;PIN</label>
      <input
        id="pin" name="pin" ref={pinRef}
        placeholder="####-####-####-####"
        autoComplete="off"
        required
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
