document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const customerName = document.getElementById('customerName').value;
    const movieTitle = document.getElementById('movieTitle').value;
    const numberOfSeats = parseInt(document.getElementById('numberOfSeats').value);
    const userId = parseInt(document.getElementById('userId').value);
    const screeningId = parseInt(document.getElementById('screeningId').value);
    const seatNumbers = document.getElementById('seatNumbers').value.split(',').map(Number);

    // Create JSON data
    const bookingData = {
        customerName: customerName,
        movieTitle: movieTitle,
        numberOfSeats: numberOfSeats,
        userId: userId,
        screeningId: screeningId,
        tickets: seatNumbers.map(seatNumber => ({ seatNumber: seatNumber }))
    };

    // Send POST request
    fetch('http://localhost:8080/bookings/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create booking');
            }
        })
        .then(data => {
            document.getElementById('responseMessage').innerText = 'Booking created successfully!';
            console.log('Booking created:', data);
        })
        .catch(error => {
            document.getElementById('responseMessage').innerText = 'Error: ' + error.message;
            console.error('Error:', error);
        });
});