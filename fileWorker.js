const { parentPort, workerData } = require('worker_threads');
const xlsx = require('xlsx');
const mongoose = require('mongoose');
const db = require('./_helpers/db');

const workbook = xlsx.read(workerData.fileBuffer, { type: 'buffer' });
const sheetName = workbook.SheetNames[0];
const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

async function processFileData() {
    try {
        let insertedPolicies = [];

        for (const row of sheetData) {
            let user = await db.User.findOneAndUpdate(
                { firstName: row.firstname, dob: new Date(row.dob) },
                {
                    firstName: row.firstname,
                    dob: new Date(row.dob),
                    address: row.address,
                    phone: row.phone,
                    state: row.state,
                    zip: row.zip,
                    email: row.email,
                    gender: row.gender,
                    userType: row.userType
                },
                { upsert: true, new: true }
            ).lean();
            let policyCategory = await db.PolicyCategory.findOneAndUpdate(
                { categoryName: row.category_name },
                { categoryName: row.category_name },
                { upsert: true, new: true }
            ).lean();

            let policyCarrier = await db.PolicyCarrier.findOneAndUpdate(
                { companyName: row.company_name },
                { companyName: row.company_name },
                { upsert: true, new: true }
            ).lean();

            let policy = new db.PolicyInfo({
                policyNumber: row.policy_number,
                startDate: new Date(row.policy_start_date),
                endDate: new Date(row.policy_end_date),
                policyCategoryId: policyCategory._id,
                carrierId: policyCarrier._id,
                userId: user._id
            });

            await policy.save();
            insertedPolicies.push(policy.toObject()); 
        }

        // parentPort.postMessage({ status: 'success', insertedPolicies });
        parentPort.postMessage({ status: 'success' });

    } catch (error) {
        parentPort.postMessage({ status: 'error', error: error.message });
    }
}

processFileData();
