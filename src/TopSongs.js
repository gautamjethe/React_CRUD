import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center">
    <MDBCard className="skeleton-card" style={{ height: '400px', width: '100%', maxWidth: '300px' }}>
      <MDBCardImage style={{ backgroundColor: '#e0e0e0', height: '200px' }} />
      <MDBCardBody>
        <div className="skeleton-text" style={{ backgroundColor: '#e0e0e0', height: '20px', marginBottom: '10px' }}></div>
        <div className="skeleton-text" style={{ backgroundColor: '#e0e0e0', height: '15px', width: '80%', marginBottom: '10px' }}></div>
        <div className="skeleton-btn" style={{ backgroundColor: '#e0e0e0', height: '40px', width: '60px' }}></div>
      </MDBCardBody>
    </MDBCard>
  </div>
);

export default function SongsAndAlbums() {
  const [songs, setSongs] = useState([]); // State for songs
  const [albums, setAlbums] = useState([]); // State for albums
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch data from the API
  useEffect(() => {
    const fetchSongsAndAlbums = async () => {
      try {
        const response = await fetch('https://saavn.dev/api/search?query=Top+Songs');
        const data = await response.json();

        // Check if the API response is successful and has results
        if (data.success) {
          setSongs(data.data.songs.results || []); // Extract songs from the response
          setAlbums(data.data.albums.results || []); // Extract albums from the response
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSongsAndAlbums();
  }, []);

  return (
    <div className="container mt-5">
      {/* Songs Section */}
      <h2 className="mb-4">Top Songs</h2>
      <div className="row justify-content-center">
        {loading ? (
          // Show skeleton loaders while fetching (only 3 placeholders, matching expected number of songs)
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          songs.length > 0 ? (
            songs.map((song) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center" key={song.id}>
                <MDBCard style={{ height: '400px', width: '100%', maxWidth: '300px' }}>
                  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage
                      src={song.image[2].url} // Use the 500x500 image
                      fluid
                      alt={song.title}
                      style={{ height: '200px', objectFit: 'contain', width: '100%' }} // Use 'contain' for no trimming
                    />
                    {/* Link to navigate to the Song Details page */}
                    <a onClick={() => navigate(`/song/${song.id}`)} style={{ cursor: 'pointer' }}>
                      <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                  </MDBRipple>
                  <MDBCardBody className="d-flex flex-column justify-content-between">
                    <div>
                      <MDBCardTitle style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{song.title}</MDBCardTitle>
                      <MDBCardText style={{ fontSize: '0.9rem' }}>{song.description}</MDBCardText>
                    </div>
                    {/* Listen button navigates to the Song Details page */}
                    <MDBBtn size="sm" onClick={() => navigate(`/song/${song.id}`)} className="mt-auto">
                      <i className="fas fa-play me-2"></i> Listen
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))
          ) : (
            <p>No songs available.</p>
          )
        )}
      </div>

      {/* Albums Section */}
      <h2 className="mb-4">Top Albums</h2>
      <div className="row justify-content-center">
        {loading ? (
          // Show skeleton loaders while fetching (only 3 placeholders, matching expected number of albums)
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          albums.length > 0 ? (
            albums.map((album) => (
              <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center" key={album.id}>
                <MDBCard style={{ height: '400px', width: '100%', maxWidth: '300px' }}>
                  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                    <MDBCardImage
                      src={album.image[2].url} // Use the 500x500 image
                      fluid
                      alt={album.title}
                      style={{ height: '200px', objectFit: 'contain', width: '100%' }} // Use 'contain' for no trimming
                    />
                    <a href={album.url} target="_blank" rel="noopener noreferrer">
                      <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </a>
                  </MDBRipple>
                  <MDBCardBody className="d-flex flex-column justify-content-between">
                    <div>
                      <MDBCardTitle style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{album.title}</MDBCardTitle>
                      <MDBCardText style={{ fontSize: '0.9rem' }}>{album.description}</MDBCardText>
                    </div>
                    <MDBBtn size="sm" href={album.url} target="_blank" rel="noopener noreferrer" className="mt-auto">
                      <i className="fas fa-play me-2"></i> View Album
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))
          ) : (
            <p>No albums available.</p>
          )
        )}
      </div>
    </div>
  );
}
