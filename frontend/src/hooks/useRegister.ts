import { useState } from "react";

export const useRegister = () => {
  const[error, setError] = useState(null);
  const[loading, isLoading] = useState(false);
  
  const register = async(name: string, email: string, password: string) => {
    isLoading(true);
    setError(null);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if(!res.ok) {
      isLoading(false);
      setError(data.error);
    }
    if(res.ok) {
      isLoading(false);
      //localStorage.setItem('user', JSON.stringify(data));
      //console.log("User created successfully");
    }
  }
  return { register, loading, error };
}
