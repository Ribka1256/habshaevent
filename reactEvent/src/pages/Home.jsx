import '../style/home.css';

function Home() {

    const handleBrowse = () =>{
        
    }
  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar__brand">HABESHA CEREMONIES</div>
        <nav className="navbar__links">
          <a href="/">🏠 Home</a>
          <a href="/ceremonies">📅 Ceremonies</a>
          <a href="/bookings">📖 My Bookings</a>
          <a href="/vendors">🛍 Vendors</a>
          <a href="/traditions">🎭 Traditions</a>
          <a href="/request">✉ Request Event</a>
          <a href="/profile">👤 Profile</a>
        </nav>
        <div className="navbar__user">
          <span>♥ Hanna Tadesse</span>
          <button className="btn btn--logout">Logout</button>
        </div>
      </header>

      <section className="hero">
        <h1>Wellcome, Hanna!</h1>
        <p>Discover and book authentic Ethiopian cultural ceremonies</p>
        <button className="btn btn--browse">🔍</button>
      </section>

      <section className="section">
        <h2>Featured Ceremonies</h2>
        <div className="card-grid">
          <div className="card card--timkat">
            <h3>Timkat Festival</h3>
            <p>📅 2025-01-19</p>
            <p>💰 Free</p>
            <button className="btn btn--request">Request</button>
          </div>
          <div className="card card--wedding">
            <h3>Wedding Ceremony</h3>
            <p>📅 2025-XX-XX</p>
            <p>💰 15,000 ETB</p>
            <button className="btn btn--request">Request</button>
          </div>
          <div className="card card--mezena">
            <h3>Mezena Ceremony</h3>
            <p>📅 2025-06-20</p>
            <p>💰 3,500 ETB</p>
            <button className="btn btn--request">Request</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Traditional Services</h2>
        <div className="service-grid">
          <div className="service">🍽 Catering</div>
          <div className="service">🎵 Attire</div>
          <div className="service">☕ Coffee</div>
          <div className="service">📷 Photography</div>
        </div>
      </section>
    </div>
  );
}

export default Home;