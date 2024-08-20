document.getElementById('hvacForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const climateRegion = document.getElementById('climateRegion').value;
    const squareFootage = document.getElementById('squareFootage').value;
    const ceilingHeight = document.getElementById('ceilingHeight').value;
    const insulationGrade = document.getElementById('insulationGrade').value;
    const sunExposure = document.getElementById('sunExposure').value;
    const windows = document.getElementById('windows').value;
    const sealTightness = document.getElementById('sealTightness').value;
    const closedRoom = document.getElementById('closedRoom').value;
    const kitchen = document.getElementById('kitchen').value;
    const occupants = document.getElementById('occupants').value;
    const extraHeat = document.getElementById('extraHeat').value;

    fetch('https://hvacloadcalculator.onrender.com/calculate-load', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            climateRegion,
            squareFootage,
            ceilingHeight,
            insulationGrade,
            sunExposure,
            windows,
            sealTightness,
            closedRoom,
            kitchen,
            occupants,
            extraHeat
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `Estimated HVAC Load: ${data.load} BTU/h`;
    })
    .catch(error => {
        document.getElementById('result').textContent = 'Error calculating HVAC load. Please try again.';
        console.error('Error:', error);
    });
});
