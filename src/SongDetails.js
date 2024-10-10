import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For getting the song id from URL
import Skeleton from 'react-loading-skeleton'; // Skeleton loading
import 'react-loading-skeleton/dist/skeleton.css';
import Plyr from 'plyr'; // Import Plyr
import 'plyr/dist/plyr.css'; // Import Plyr styles

const SongDetails = () => {
  const { id } = useParams(); // Song ID from URL
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongDetails = async () => {
      try {
        const response = await fetch(`https://saavn.dev/api/songs/${id}`);
        const data = await response.json();
        setSong(data.data[0]); // Save song details (from the response structure)
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching song details:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };
    fetchSongDetails();
  }, [id]);

  // Format the release date
  const formatReleaseDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Initialize Plyr
  useEffect(() => {
    if (song) {
      const player = new Plyr('#player', {
        // Add any Plyr options here
      });

      return () => {
        player.destroy(); // Cleanup player on unmount
      };
    }
  }, [song]);

  return (
    <div className="container mt-5 flex-grow-1">
      {loading ? (
        <div>
          <Skeleton height={500} width={500} />
          <Skeleton height={40} />
          <Skeleton count={5} />
        </div>
      ) : (
        song && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <img
                src={song.image[2].url} // 500x500 image
                alt={song.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '10px' }} // Adjust styling here
              />
            </div>
            <div className="col-12 col-md-6">
              <h1 className="mt-4">{song.name}</h1>
              <p><strong>Description:</strong> {song.description || "No description available"}</p>
              <p><strong>Label:</strong> {song.label || "No label available"}</p>
              <p><strong>Singers:</strong> {song.artists.primary.map(artist => artist.name).join(", ") || "Unknown"}</p>
              <p><strong>Release Date:</strong>  {song.releaseDate ? formatReleaseDate(song.releaseDate) : "Unknown"}</p>
              <p><strong>Copyright:</strong> {song.copyright || "No copyright information available"}</p>
              
              {/* Plyr Audio Player */}
              <audio id="player" controls>
                <source src={song.downloadUrl.find(url => url.quality === "320kbps").url} type="audio/mp4" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SongDetails;
