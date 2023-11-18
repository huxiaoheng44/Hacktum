const fs = require('fs');
const pool = require('./database');

const data1 = JSON.parse(fs.readFileSync('service_provider_profile.json', 'utf8'));
const data2 = JSON.parse(fs.readFileSync('quality_factor_score.json', 'utf8'));

const insertAndUpdateData = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const item of data1) {
            await client.query(
                'INSERT INTO craftman (id, first_name, last_name, city, street, house_number, lon, lat, max_driving_distance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [item.id, item.first_name, item.last_name, item.city, item.street, item.house_number, item.lon, item.lat, item.max_driving_distance]
            );
        }

        for (const item of data2) {
            await client.query(
                'UPDATE craftman SET profile_picture_score = $1, profile_description_score = $2 WHERE id = $3',
                [item.profile_picture_score, item.profile_description_score, item.profile_id]
            );
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error processing data:', error);
    } finally {
        client.release();
    }
};

insertAndUpdateData().then(() => console.log('Data processing complete.'));
