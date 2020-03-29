import Mock from 'mockjs'

Mock.mock('http://localhost:8066/UserMock', {
    'name': '@name', // 随机生成姓名
    'sex|1-2': Mock.Random.integer(1,2), // 随机生成性别
    'age|1-100': Mock.Random.integer(1,100), // 随机1-100内的年龄数字
})