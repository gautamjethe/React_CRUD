import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBRow, MDBCol, MDBRipple, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

import SkeletonCard from './SkeletonCard'; // Ensure you have this component for skeleton loading
import './Skeleton.css'; // Add this import for the custom skeleton CSS

const SongsAndAlbums = ({ songs = [], albums = [], loading }) => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5">
      {/* Songs Section */}
      <h2 className="mb-4"> Songs</h2>
      <div className="row justify-content-center">
        {loading ? (
          // Show skeleton loaders while fetching (only 3 placeholders, matching expected number of songs)
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center" key={song.id}>
              <MDBCard style={{ height: '400px', width: '100%', maxWidth: '300px' }}>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                  <MDBCardImage
                    src={song.imageUrl} // Use the appropriate image URL
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
        )}
      </div>

      {/* Albums Section */}
      <h2 className="mb-4"> Albums</h2>
      <div className="row justify-content-center">
        {loading ? (
          // Show skeleton loaders while fetching (only 3 placeholders, matching expected number of albums)
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : albums.length > 0 ? (
          albums.map((album) => (
            <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center" key={album.id}>
              <MDBCard style={{ height: '400px', width: '100%', maxWidth: '300px' }}>
                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                  <MDBCardImage
                    src={album.imageUrl} // Use the appropriate image URL
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
        )}
      </div>
    </div>
  );
};

export default SongsAndAlbums;
