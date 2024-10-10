import './App.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBtn } from 'mdb-react-ui-kit';

import React, { useState, useEffect } from 'react';
import TopSongs from './TopSongs';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Songs from './Songs';
import SongDetails from './SongDetails';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <MDBContainer className="text-center">
        <p className="mb-0">© {currentYear} GAUTAM. All rights reserved.</p>
      </MDBContainer>
    </footer>
  );
};

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  
  
  const handleSearch = () => {
    const formattedQuery = query.trim().replace(/\s+/g, '+');
    if (!formattedQuery) {
      alert('Please enter a search term.'); // Alert the user
      return; // Exit the function if the input is empty
    }
    onSearch(formattedQuery);
    navigate(`/songs?query=${formattedQuery}`);
  };

  return (
    <div className="search-container mb-4">
      <input
        type="text"
        placeholder="Search for songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        className="search-input" // Add a class for styling
      />
      <MDBBtn onClick={handleSearch} color="primary">Search</MDBBtn> {/* Use MDB button */}
    </div>
  );
};

export default function App() {
  const [openNavColor, setOpenNavColor] = useState(false);
  const [songs, setSongs] = useState([]);
 
  const [albums, setAlbums] = useState([]);
  
  const [loading, setLoading] = useState(true);

  const closeNavbar = () => setOpenNavColor(false);

  const fetchSongsAndAlbums = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`https://saavn.dev/api/search?query=${query}`);
      const data = await response.json();
  
      if (data.success) {
        // Fetch Songs
        const fetchedSongs = data.data.songs?.results?.map(song => {
          const imageUrl = Array.isArray(song.image) && song.image.length > 0
            ? song.image[2].url // Pick the 500x500 image or adjust the index based on your need
            : 'default_image_url_here'; // Fallback if no image is available
  
          return {
            id: song.id,
            title: song.title,
            album: song.album,
            url: song.url,
            imageUrl: imageUrl,
            description: song.description,
            primaryArtists: song.primaryArtists,
            language: song.language,
          };
        }) || [];
  
        // Fetch Albums
        const fetchedAlbums = data.data.albums?.results?.map(album => {
          const imageUrl = Array.isArray(album.image) && album.image.length > 0
            ? album.image[2].url // Pick the 500x500 image or adjust the index based on your need
            : 'default_image_url_here'; // Fallback if no image is available
  
          return {
            id: album.id,
            title: album.title,
            artist: album.artist,
            url: album.url,
            imageUrl: imageUrl,
            description: album.description,
            year: album.year,
            language: album.language,
          };
        }) || [];
  
        // Update state with both songs and albums
        setSongs(fetchedSongs);
        setAlbums(fetchedAlbums);
      } else {
        setSongs([]);
        setAlbums([]);
      }
    } catch (error) {
      console.error('Error fetching songs and albums:', error);
      setSongs([]);
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchSongsAndAlbums(''); // Updated function call
  }, []);

  return (
    <Router>
      <MDBNavbar expand='lg' dark bgColor='primary' className="navbar sticky-top">
        <MDBContainer fluid>
          <MDBNavbarBrand>
            <Link to='/' className='navbar-brand' onClick={closeNavbar}>
              GAUTAM
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setOpenNavColor(!openNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse open={openNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <Link className='nav-link' to='/topsongs' onClick={closeNavbar}>
                  Top Songs
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="mt-5">
        <Search onSearch={fetchSongsAndAlbums} />
      </MDBContainer>

      <Routes>
        <Route path='/topsongs' element={<TopSongs songs={songs} loading={loading} />} />
        <Route path="/songs" element={<Songs songs={songs} loading={loading} />} />
        <Route path="/song/:id" element={<SongDetails />} />
      </Routes>

      
    </Router>
  );
}
