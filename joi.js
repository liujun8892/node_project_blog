const joi = require('joi');

//定义约束规则
const schema = {
    username: joi.string().min(2).max(20).required().error(new Error('username属性没有通过')),
    birth: joi.number().min(1995).max(2000)
}

async function invalid() {
    try {
        await joi.validate({ username: 'abc', birth: 111 }, schema);
    } catch (e) {
        console.log(e.message);
        return;
    }
    console.log('验证通过');
}

invalid();