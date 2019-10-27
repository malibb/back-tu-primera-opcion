const {
    getAllTests,
    getSingleTest
} = require('../../services/TestService');


const getTests = async () => {
    const tests = await getAllTests();
    return tests;
};

const getOneTest = async (_, params) => {
    const test = await getSingleTest(params.id);
    if (!test) throw new Error('Test not exist');
    return test;
};


module.exports = {
    getTests,
    getOneTest
};