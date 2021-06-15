const fs = require('fs');
const https = require('https');
const maxLat = 54.9;
const minLat = 47.270108;
const maxLong = 15.033333;
const minLong = 5.866667;

setInterval(() => {
    const lat = Math.random() * (maxLat - minLat) + minLat;
    const long = Math.random() * (maxLong - minLong) + minLong;
    https.get('https://geocode.xyz/?locate=' + lat + ',' + long + '&json=1'  , res => {
        let data = [];
        res.on('data', chunk => {
            data.push(chunk);
        });
        res.on('end',() => {
            if (res.statusCode == 200) {
                let endData;
                try {
                    endData = JSON.parse(Buffer.concat(data).toString());
                } catch (e) {
                    return;
                }
                if (endData.country !== undefined) {
                    const randomPoint = `(${lat},${long},${endData.country});`;
                    fs.appendFile('points.txt', randomPoint, err => {
                        if (err) {
                            console.error('Error here:' + err);
                            return
                        }
                    })
                }
            }
        })
    }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}, 1200);
