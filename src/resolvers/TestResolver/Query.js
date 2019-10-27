const {
    createTest,
    updateTest,
    deleteTest
} = require('../../services/TestService');
const storage = require('../../utils/storage');
//const { getOneTest } = require('../../services/TestService'); 


const createNewTest = async (_, {
    data
}, {
    user,
    pubsub
}) => {
    data.test = user._id;
    // Temporal solution
    //const test = await getOneTest(params.data.test);
    if (data.cover) {
        const {
            createReadStream
        } = await data.cover;
        const stream = createReadStream();
        const image = await storage({
            stream
        });
        data = {
            ...data,
            cover: image.url
        };
    }
    const test = await createTest(data);
    user.tests.push(test._id);
    user.save();
    pubsub.publish('test', {
        test: {
            mutation: 'CREATED',
            data: test
        }
    });
    return test;
};

const updateOneTest = async (_, {
    id,
    data
}, {
    user
}) => {
    if (data.cover) {
        const {
            createReadStream
        } = await data.cover;
        const stream = createReadStream();
        const image = await storage({
            stream
        });
        console.log(image);
        data = {
            ...data,
            cover: image.url
        };
    }
    const test = await updateTest(id, data, user);
    if (!test) throw new Error('Test not exist');
    return test;
};

const deleteOneTest = async (_, {
    id
}, {
    user,
    pubsub
}) => {
    const test = await deleteTest(id, user);
    if (!test) throw new Error('Test not exist');
    pubsub.publish('test', {
        test: {
            mutation: 'DELETED',
            data: test
        }
    });
    return 'Test deleted';
};

module.exports = {
    createNewTest,
    updateOneTest,
    deleteOneTest
};