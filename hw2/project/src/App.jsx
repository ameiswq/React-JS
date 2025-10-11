import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
     <div className="app">
      <header className="nav">
        <h1 className="logo">About Me</h1>
      </header>

      <main className="container">
        <section className="card">
          <h2>Hi!</h2>
          <p>
            My name is Sofya Roganskaya. 
          </p>
        </section>

        <section className="card" id="contacts">
          <h2>Contacts</h2>
          <ul className="list">
            <li>
              Email: <a href="mailto:s_roganskaya@kbtu.kz">s_roganskaya@kbtu.kz</a>
            </li>
            <li>
              Telegram: <a href="https://t.me/ameiswq" target="_blank" rel="noreferrer">@ameiswq</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/ameiswq" target="_blank" rel="noreferrer">github.com/ameiswq</a>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">© {2025} Sofya Roganskaya</footer>
    </div>
  )
}

export default App
