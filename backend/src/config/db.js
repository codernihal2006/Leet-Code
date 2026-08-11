const mongoose = require('mongoose');
const User = require('../models/user');

async function removeLegacyProblemSolvedUniqueIndex() {
    const existingIndexes = await User.collection.indexes();

    const staleIndex = existingIndexes.find((index) => {
        const keys = Object.keys(index.key || {});
        return index.unique === true && keys.length === 1 && keys[0] === 'problemSolved';
    });

    if (!staleIndex) {
        return;
    }

    await User.collection.dropIndex(staleIndex.name);
    console.log(`Dropped stale user index: ${staleIndex.name}`);
}

async function main() {
    const rawConnectionString = process.env.DB_CONNECT_STRING?.trim();

    if (!rawConnectionString) {
        throw new Error("DB_CONNECT_STRING is missing");
    }

    await mongoose.connect(rawConnectionString);
    await removeLegacyProblemSolvedUniqueIndex();
}

module.exports = main;
