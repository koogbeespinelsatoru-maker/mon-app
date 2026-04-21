import { useState } from "react";
export default function Login(){
  const [email,setEmail]=useState(""),[pw,setPw]=useState("");
  async function submit(e){ e.preventDefault();
    const r = await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password:pw})});
    const j = await r.json(); console.log(j);
    if (j.token) localStorage.setItem("token", j.token);
  }
  return (<form onSubmit={submit} style={{padding:20}}>
    <h2>Connexion</h2>
    <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
    <input placeholder="Mot de passe" type="password" value={pw} onChange={e=>setPw(e.target.value)} /><br/>
    <button type="submit">Se connecter</button>
  </form>)
}
