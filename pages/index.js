import Link from "next/link";
export default function Home(){ return (
  <div style={{padding:20}}>
    <h1>MonApp - Fil d'actualité</h1>
    <nav><Link href="/login">Connexion</Link> | <Link href="/profile">Profil</Link> | <Link href="/messages">Messages</Link></nav>
    <p>Publier photos, vidéos, voir notifications, amis, messages.</p>
  </div>
)}
