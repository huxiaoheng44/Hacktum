const fs = require('fs');
const pool = require('./database'); // 引入数据库配置

// 读取 JSON 文件
const jsonData = JSON.parse(fs.readFileSync('postcode.json', 'utf8'));

// 将数据插入数据库的函数
const insertData = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // 开始事务

        for (const item of jsonData) {
            await client.query(
                'INSERT INTO postcodes (postcode, lon, lat, postcode_extension_distance_group, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
                [item.postcode, item.lon, item.lat, item.postcode_extension_distance_group, item.created_at, item.updated_at]
            );
        }

        await client.query('COMMIT'); // 提交事务
    } catch (error) {
        await client.query('ROLLBACK'); // 如果出现错误，则回滚事务
        console.error('Error inserting data:', error);
    } finally {
        client.release(); // 释放客户端连接
    }
};

insertData().then(() => console.log('Data insertion complete.'));
