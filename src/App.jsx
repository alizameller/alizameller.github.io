import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

const photos = [
  { id: '01', src: '/images/nyc.jpg', desc: 'New York, NY' },
  { id: '02', src: '/images/backpack.jpg', desc: 'Woman in Cherry Blossoms, Central Park' },
  { id: '03', src: '/images/apples.jpg', desc: 'Union Square Farmers Market' },
  { id: '04', src: '/images/bigben.jpg', desc: 'Big Ben, London' },
  { id: '05', src: '/images/man.jpg', desc: 'Union Square, NYC' },
  { id: '06', src: '/images/guinness.jpg', desc: 'Soho, London' },
  { id: '07', src: '/images/icecream.jpg', desc: 'Ice Cream Truck, London' },
  { id: '08', src: '/images/volkswagen.jpg', desc: 'Volkswagen Van, London' },
  { id: '09', src: '/images/sicily.jpg', desc: 'Sicily' },
  { id: '10', src: '/images/farm_kitchen.jpg', desc: 'Avola, Sicily' },
  { id: '11', src: '/images/sax.jpg', desc: 'Sax Player, Central Park' },
  { id: '12', src: '/images/caramoor.jpg', desc: 'Caramoor, Katonah' }
];

export default function App() {
// --- ALL HOOKS MUST LIVE HERE ---
  const [tab, setTab] = useState('home');
  const [songs, setSongs] = useState([]);
  const [isChipScanExpanded, setIsChipScanExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Function to get a fresh Access Token using your Refresh Token
  const getAccessToken = async () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET; // Ensure this is in your .env!
    const refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Some versions of the API prefer the Auth header instead of body params
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        }),
    });

    const data = await response.json();

    if (data.error) {
        console.error("SPOTIFY SAYS:", data.error_description || data.error);
        return null;
    }

    return data.access_token;
  };

  // 2. Function to fetch 110 songs
  const fetchSpotifyHistory = async () => {
    try {
      const token = await getAccessToken();
      const res1 = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data1 = await res1.json();

      setSongs(data1.items);
      setLoading(false);
    } catch (error) {
      console.error("Spotify Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyHistory();
  }, []);

  const styles = {
    wrapper: {
      maxWidth: '720px',
      margin: '0 auto',
      padding: '160px 24px 100px 24px',
    },
    nav: {
      display: 'flex',
      gap: '12px', // Slightly tighter gap because buttons are bigger
      marginBottom: '80px',
    },
    navButton: (isActive) => ({
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '10px 20px', // More padding = bigger "hit" area
      borderRadius: '8px',
      fontSize: '1.4rem', // Significantly bigger
      color: isActive ? '#ff7800' : '#71717a',
      fontWeight: isActive ? '600' : '400',
      transition: 'all 0.2s ease',
      backgroundColor: isActive ? 'rgba(255, 120, 0, 0.1)' : 'transparent',
    }),
    title: {
      fontSize: '3.5rem', // Bumping this even more to match the big nav
      fontWeight: '800',
      color: '#ffffff',
      letterSpacing: '-0.05em',
      marginBottom: '32px'
    },
    paragraph: {
      fontSize: '1.5rem', // Increased for better readability
      lineHeight: '1.6',
      color: '#a1a1aa',
      marginBottom: '40px'
    },
    accent: {
      color: '#ff7800',
      fontWeight: '600',
      textDecoration: 'none'
    },
    sectionLabel: {
      display: 'block',
      fontSize: '1rem', // Bigger label
      fontWeight: '700',
      color: '#52525b',
      textTransform: 'uppercase',
      letterSpacing: '0.15em',
      marginBottom: '28px',
      marginTop: '80px'
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 0', // More breathing room
      borderBottom: '1px solid #18181b'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginTop: '32px'
    },
    filmContainer: { 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', // Creates two columns
      gap: '24px', // Space between images
      marginTop: '32px' 
    },
    filmImageContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    filmImage: { 
      width: '100%', 
      height: 'auto', // Keep aspect ratio
      maxHeight: '400px', // Safety constraint: Images never get too tall
      objectFit: 'cover', // Ensures the image fills nicely within the constraint
      borderRadius: '8px', 
      border: '1px solid #18181b', 
      filter: 'grayscale(15%)', // Subtle humanizing effect
      transition: 'filter 0.3s ease' 
    },
    filmCaption: { 
      marginTop: '12px', 
      fontSize: '0.9rem', // Slightly smaller font for monospace captions
      color: '#52525b', 
      fontFamily: 'monospace' 
    },
    trackRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: '1px solid #1a1a1a',
        transition: 'background-color 0.2s ease',
        cursor: 'pointer',
    },
    albumArt: {
        width: '48px',
        height: '48px',
        borderRadius: '4px'
    },
    timestamp: {
        fontFamily: 'monospace',
        color: '#52525b',
        fontSize: '.9rem',
        textAlign: 'right'
    },
    cleanList: {
        color: '#a1a1aa',
        fontSize: '1.3rem',
        lineHeight: '1.6',
        paddingLeft: '1.5rem',
        margin: '8px 0',
        listStyleType: 'circle', // Thinner than a square, cleaner than a disc
    },
    inlineTag: {
        fontFamily: 'monospace',
        fontSize: '1.1rem',
        color: '#52525b',
        textTransform: 'lowercase' // Matches the minimal vibe
    }
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.nav}>
        <button onClick={() => setTab('home')} style={styles.navButton(tab === 'home')}>Home</button>
        <button onClick={() => setTab('projects')} style={styles.navButton(tab === 'projects')}>Projects</button>
        <button onClick={() => setTab('film')} style={styles.navButton(tab === 'film')}>Photography</button>
        <button onClick={() => setTab('music')} style={styles.navButton(tab === 'music')}>Currently Listening To</button>
      </nav>

      {tab === 'home' && (
        <main className="photo-fade-in">
          <h1 style={styles.title}>Aliza Meller</h1>
          <p style={styles.paragraph}>
            Electrical Engineer & Cybersecurity Software Engineer. Currently 
            completing an M.Eng at <a href="https://cooper.edu" style={styles.accent}>The Cooper Union</a> and 
            working at <br/> <a href="https://chipscan.us" style={styles.accent}>Chip Scan</a>.
          </p>
          <div style={styles.row}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: '#ececec', fontSize: '1.3rem', fontWeight: '500' }}>Chip Scan</span>
                    <span style={{ color: '#ff7800', fontSize: '1.1rem' }}>Cybersecurity Software Engineer</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="status-dot"></div>
                    <span style={{ color: '#52525b', fontFamily: 'monospace', fontSize: '1.1rem' }}>2024 — Present</span>
                </div>
                </div>

                {/* Technical Details (Always Visible) */}
                <ul style={styles.cleanList}>
                    <li>Expanded RTL dataset coverage for <a 
                        href="https://www.chipscan.us/products/deeplift" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{
                        textDecoration: 'none', 
                        color: '#a1a1aa', 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '4px',
                        borderBottom: '1px solid transparent',
                        transition: 'border-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.borderColor = '#ff7800'}
                        onMouseLeave={(e) => e.target.style.borderColor = 'transparent'}
                    > Deep Lift <ArrowUpRight size={14} strokeWidth={2.5} />
                    </a> to ~1 million designs.</li>
                <li>Configured microservices and Docker containers for asynchronous parallel processing.</li>
                <li>Led front-end UI and data visualization team, improving ML model performance.</li>
                <li>Presented technical demonstrations of research at the GOMAC 2025 conference.</li>
                </ul>

                {/* Inline Tags */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <span style={styles.inlineTag}>Python</span>
                <span style={styles.inlineTag}>C++</span>
                <span style={styles.inlineTag}>Verilog</span>
                <span style={styles.inlineTag}>Docker</span>
                <span style={styles.inlineTag}>Bash</span>
                <span style={styles.inlineTag}>FastAPI</span>
                </div>
            </div>
          </div>

          <div style={styles.row}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#ececec', fontSize: '1.3rem', fontWeight: '500' }}>Ford Motor Company</span>
                <span style={{ color: '#71717a', fontSize: '1.1rem' }}>Project Management Intern</span>
            </div>
            <span style={{ color: '#52525b', fontFamily: 'monospace', fontSize: '1.1rem' }}>Summer 2023</span>
          </div>

          <div style={styles.row}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ color: '#ececec', fontSize: '1.3rem', fontWeight: '500' }}>PepsiCo</span>
                <span style={{ color: '#71717a', fontSize: '1.1rem' }}>R&D Engineering Intern</span>
            </div>
            <span style={{ color: '#52525b', fontFamily: 'monospace', fontSize: '1.1rem' }}>Summer 2022</span>
          </div>

          <div style={{display: 'flex', gap: '32px', marginTop: '80px'}}>
            <a href="mailto:alizameller@gmail.com" className="social-link accent-link"><Mail size={28}/></a>
            <a href="https://github.com/alizameller" className="social-link accent-link"><Github size={28}/></a>
            <a href="https://www.linkedin.com/in/aliza-meller-b57905214/" className="social-link accent-link"><Linkedin size={28}/></a>
          </div>
        </main>
      )}

      {tab === 'projects' && (
        <main className="photo-fade-in">
          <h1 style={styles.title}>Projects</h1>
          <p style={styles.paragraph}>Academic works from Cooper Union.</p>
          <div className="project-card" style={{padding: '32px 0'}}>
            <h3 style={{color: '#fff', fontSize: '1.3rem', margin: '0 0 12px 0'}}>Oscilloscope TV</h3>
            <p style={{...styles.paragraph, fontSize: '1.1rem', margin: 0}}>Converting analog hardware into a visual display using NTSC signaling.</p>
          </div>
          
          <a 
            href="https://github.com/alizameller/Compilers" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', display: 'block' }}
            >
            <div className="project-card" style={styles.clickableProject}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{color: '#fff', fontSize: '1.3rem', margin: '0 0 12px 0'}}>C99 Compiler</h3>
                <ArrowUpRight size={20} color="#52525b" />
                </div>
                <p style={{...styles.paragraph, fontSize: '1.1rem', margin: 0}}>
                A compiler targeting x86_64, built with Flex and Bison.
                </p>
            </div>
          </a>

          <a 
            href="https://github.com/alizameller/GraphTheory" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ textDecoration: 'none', display: 'block' }}
            >
            <div className="project-card" style={styles.clickableProject}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{color: '#fff', fontSize: '1.3rem', margin: '0 0 12px 0'}}>Hadwiger-Nelson Unit-Distance Solver</h3>
                <ArrowUpRight size={20} color="#52525b" />
                </div>
                <p style={{...styles.paragraph, fontSize: '1.1rem', margin: 0}}>
                A solver for the Hadwiger-Nelson problem, using DFS to test the four-colorability of large-scale unit-distance graphs.
                Based on the research by Geoffrey Exoo and Dan Ismailescu entitled "The Chromatic Number of the Plane is at Least 5: A New Proof". 
                </p>
            </div>
          </a>
        </main>
      )}

      {tab === 'film' && (
        <main className="photo-fade-in">
            <h1 style={styles.title}>Photography</h1>
            <p style={styles.paragraph}>Shot on Canon AE-1.</p>
            
            <div style={styles.filmContainer}>
            {photos.map((photo) => (
                <div key={photo.id} style={styles.filmImageContainer}>
                <div className="image-loader-bg">
                    <img 
                    src={photo.src} 
                    style={styles.filmImage} 
                    alt={photo.desc} 
                    className="photo-fade"
                    /* This is the magic part: it reveals the image only when fully loaded */
                    onLoad={(e) => e.target.classList.add('photo-visible')}
                    />
                </div>
                <div style={styles.filmCaption}>{photo.id} — {photo.desc}</div>
                </div>
            ))}
            </div>
        </main>
      )}

      {tab === 'music' && (
        <main className="photo-fade-in">
            <h1 style={styles.title}>Recently Played</h1>

            {loading ? (
            <p style={{ color: '#52525b' }}>Loading history...</p>
            ) : (
            <div style={{ marginTop: '40px' }}>
                {songs.map((item, index) => (
                    <a 
                        key={index} 
                        href={item.track.external_urls.spotify} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ textDecoration: 'none' }} // Keeps the row from looking like a blue link
                    >
                        <div style={styles.trackRow}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            {/* Album Art */}
                            <img 
                            src={item.track.album.images[2]?.url} 
                            alt={item.track.album.name}
                            style={styles.albumArt}
                            />
                            
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: '#fff', fontSize: '1.3rem' }}>{item.track.name}</span>
                            <span style={{ color: '#71717a', fontSize: '1.1rem' }}>{item.track.artists[0].name}</span>
                            </div>
                        </div>

                        <div style={styles.timestamp}>
                            {new Date(item.played_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                        </div>
                        </div>
                    </a>
                ))}

            </div>
            )}
        </main>
      )}
    </div>
  );
}
