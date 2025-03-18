import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const TripForm = () => {
  const [formData, setFormData] = useState({
    currentLocation: '',
    pickupLocation: '',
    dropoffLocation: '',
    currentCycleUsed: '',
    fuelNeeded: false, // Default to false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFuelNeededChange = (e) => {
    setFormData({
      ...formData,
      fuelNeeded: e.target.value === 'true', // Convert string to boolean
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        cycle_hours_used: parseFloat(formData.currentCycleUsed) || null,
        fuel_needed: formData.fuelNeeded,
        current_location: formData.currentLocation || null,
        pickup_location: formData.pickupLocation || null,
        dropoff_location: formData.dropoffLocation || null,
      };

      await axios.post('http://127.0.0.1:8000/transport/trips/', requestData);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Trip submitted successfully!',
        confirmButtonColor: '#007bff',
      });

      // Clear form after submission
      setFormData({
        currentLocation: '',
        pickupLocation: '',
        dropoffLocation: '',
        currentCycleUsed: '',
        fuelNeeded: false,
      });

    } catch (error) {
      console.error(error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Submission failed. Please try again.',
        confirmButtonColor: '#dc3545',
      });
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Trip Details</h2>
        <input
          type="text"
          name="currentLocation"
          placeholder="Current Location"
          value={formData.currentLocation}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Dropoff Location"
          value={formData.dropoffLocation}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="currentCycleUsed"
          placeholder="Current Cycle Used (Hrs)"
          value={formData.currentCycleUsed}
          onChange={handleChange}
          style={styles.input}
        />
        <div style={styles.selectContainer}>
          <label style={styles.label}>Fuel Needed:</label>
          <select
            name="fuelNeeded"
            value={formData.fuelNeeded}
            onChange={handleFuelNeededChange}
            style={styles.select}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default TripForm;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#03363D', // Dark teal background
    padding: '20px',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#ffffff', // White text
    fontSize: '24px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    fontSize: '16px',
    backgroundColor: '#E3E7E8', // Light gray input background
    color: '#03363D', // Dark teal text
  },
  selectContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#E3E7E8', // Light gray label text
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    fontSize: '16px',
    backgroundColor: '#E3E7E8', // Light gray dropdown background
    color: '#03363D', // Dark teal text
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#C1272D', // Red button (matches the red dot in your image)
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  successMessage: {
    textAlign: 'center',
    color: '#028174', // Teal success message
    marginTop: '15px',
  },
  errorMessage: {
    textAlign: 'center',
    color: '#C1272D', // Red error message
    marginTop: '15px',
  },
};


