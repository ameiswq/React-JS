import "./About.css";

export default function About() {
  return (
    <div className="container">
      <section className="card">
        <h1>About Me</h1>
        <p>My name is Sofya Roganskaya.</p>
      </section>

      <section className="card" id="contacts">
        <h2>Contacts</h2>
        <ul className="list">
          <li>
            Email:{" "}
            <a href="mailto:s_roganskaya@kbtu.kz">
              s_roganskaya@kbtu.kz
            </a>
          </li>
          <li>
            Telegram:{" "}
            <a
              href="https://t.me/ameiswq"
              target="_blank"
              rel="noreferrer"
            >
              @ameiswq
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/ameiswq"
              target="_blank"
              rel="noreferrer"
            >
              github.com/ameiswq
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
