const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.post('/calculate-load', (req, res) => {
    try {
        const {
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
        } = req.body;

        if (
            !climateRegion ||
            !squareFootage ||
            !ceilingHeight ||
            !insulationGrade ||
            !sunExposure ||
            !windows ||
            !sealTightness ||
            !occupants ||
            extraHeat === undefined
        ) {
            return res.status(400).json({ error: 'All input values must be provided' });
        }

        // Simplified calculation
        let loadBTU = squareFootage * ceilingHeight * climateRegion * insulationGrade * sunExposure;
        loadBTU += windows * sealTightness * 100;
        if (closedRoom === 'yes') loadBTU += 500;
        if (kitchen === 'yes') loadBTU += 1000;
        loadBTU += occupants * 100;
        loadBTU += extraHeat;

        const loadTons = loadBTU / 12000;

        // Calculate recommended capacity based on the load
        const recommendedLowerBTU = loadBTU - 2000;
        const recommendedUpperBTU = loadBTU + 2000;
        const recommendedLowerTons = (recommendedLowerBTU / 12000).toFixed(2);
        const recommendedUpperTons = (recommendedUpperBTU / 12000).toFixed(2);

        res.json({
            coolingLoadBTU: loadBTU,
            coolingLoadTons: loadTons.toFixed(2),
            recommendedCapacityBTU: `${recommendedLowerBTU} - ${recommendedUpperBTU} BTU`,
            recommendedCapacityTons: `${recommendedLowerTons} - ${recommendedUpperTons} Tons`
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
