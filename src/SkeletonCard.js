import React from 'react';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const SkeletonCard = () => {
  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center">
      <MDBCard style={{ height: '400px', width: '100%', maxWidth: '300px' }}>
        <MDBCardBody className="d-flex flex-column justify-content-between">
          <div className="skeleton" style={{ height: '200px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
          <div className="mt-2">
            <div className="skeleton" style={{ height: '20px', backgroundColor: '#e0e0e0', marginBottom: '10px', borderRadius: '4px' }}></div>
            <div className="skeleton" style={{ height: '15px', backgroundColor: '#e0e0e0', borderRadius: '4px' }}></div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default SkeletonCard;
