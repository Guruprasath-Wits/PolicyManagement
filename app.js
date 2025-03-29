const express = require('express');
const multer = require('multer');
const { Worker } = require('worker_threads');
const os = require('os');
const { exec } = require('child_process');
const schedule = require('node-schedule');
const db = require('./_helpers/db'); 
const path = require('path');

const app = express();
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }


    const worker = new Worker(path.join(__dirname, 'fileWorker.js'), {
        workerData: { fileBuffer: req.file.buffer }
    });

    worker.on('message', (message) => {
        res.json({ message: 'Data uploaded successfully', details: message });
    });

    worker.on('error', (error) => {
        res.status(500).json({ error: error.message });
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker exited with code ${code}`);
        }
    });
});

app.get('/api/policy/search', async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        let condition = { firstName: username }
        let user = await db.User.findOne(condition);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let policies = await db.PolicyInfo.find({ userId: user._id })
        res.json({ user, policies });
    } catch (error) {
        res.status(500).json({ message: "Error fetching policy info", error: error.message });
    }
});


app.get('/api/policy/aggregate', async (req, res) => {
    try {
        const aggregation = await db.PolicyInfo.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $group: {
                    _id: "$user._id",
                    firstName: { $first: "$user.firstName" },
                    email: { $first: "$user.email" },
                    totalPolicies: { $sum: 1 }
                }
            }
        ]);

        res.json({ summary: aggregation }); 
    } catch (error) {
        res.status(500).json({ message: "Error generating policy summary", error: error.message });
    }
});


// Monitor CPU Usage & Restart Server if Above 70%**
setInterval(() => {
    const cpuLoad = os.loadavg()[0]; // 1-minute CPU load average
    console.log(`CPU Load: ${cpuLoad}`);

    if (cpuLoad > 0.7) {
        console.log("High CPU usage detected! Restarting server...");
        exec("pm2 restart all", (err, stdout, stderr) => {
            if (err) console.error(`Error restarting server: ${stderr}`);
            else console.log("Server restarted successfully.");
        });
    }
}, 10000); // Check CPU every 10 seconds


app.post('/api/test', async (req,res) =>{
    console.log("test okay")
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
