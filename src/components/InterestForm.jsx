import { useRef, useState } from 'react';
import useInputMask from '../hooks/useInputMask';

export default function InterestForm(){
  const pinRef = useRef(null);
  useInputMask(pinRef,'pin');
  const [formData,setFormData] = useState({
    firstName:'', lastName:'', phone:'', email:'',
    guess:'', pin:''
  });

  const handleChange = e =>
      setFormData({ ...formData,[e.target.name]:e.target.value });

  const handleSubmit = e =>{
    e.preventDefault();
    console.table(formData);
    alert('Thanks! Check dev-tools console.');
  };

  return(
    <form onSubmit={handleSubmit}>
      <h2 style={{marginBottom:'1rem',color:'var(--spidr-teal)'}}>
        Reserve your Air Fryer
      </h2>

      {['firstName','lastName','phone','email','guess'].map(f=>(
        <div key={f}>
          <label htmlFor={f}>{{
              firstName:'First name', lastName:'Last name',
              phone:'Phone number', email:'Email address',
              guess:"Your $ guess"
            }[f]}</label>
          <input id={f} name={f}
            type={f==='guess'?'number':f==='email'?'email':'text'}
            required onChange={handleChange}/>
        </div>
      ))}

      <label htmlFor="pin">16-digit Spidr&nbsp;PIN</label>
      <input id="pin" name="pin" ref={pinRef}
        placeholder="####-####-####-####"
        required onChange={handleChange}/>

      <button type="submit">Submit</button>
    </form>
  );
}
