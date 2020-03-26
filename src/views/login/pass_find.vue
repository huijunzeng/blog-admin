<template>
    <div class="edit-pass-container">
        <div class="header">
            <div class="title">
                <div class="login-logo" @click="backLogin">
                    <img src="../../assets/logo.png">
                </div>
                <h1 class="logo-title">后台 - 密码找回</h1>
            </div>
        </div>
        <div class="edit-pass-content">
            <div class="content-layout">
                <div class="login-back">
                    <div
                        class="inline-back"
                        @click="backLogin"
                    >
                        <span class="el-icon-arrow-left"></span>返回登录
                    </div>
                </div>
                <div class="layout-list">
                    <div class="layout-right">
                        <el-steps
                            :active="active"
                            align-center
                            finish-status="success"
                        >
                            <el-step title="验证手机号"></el-step>
                            <el-step title="重置密码"></el-step>
                        </el-steps>
                        <div class="form-list">
                            <el-form
                                hide-required-asterisk
                                :model="backForm"
                                :rules="rules2"
                                ref="backForm"
                                label-width="90px"
                                v-show="loginFormShow == 1"
                                @submit.native.prevent
                            >
                                <el-form-item
                                    label="手机号："
                                    prop="phoneNumber"
                                    :error="phoneNumberError"
                                >
                                    <el-input
                                        v-model="backForm.phoneNumber"
                                        maxlength="11"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="验证码："
                                    prop="identifyingCode"
                                    :error="codeError"
                                >
                                    <el-row>
                                        <el-col :span="13">
                                            <el-input
                                                v-model="backForm.identifyingCode"
                                                class="identifyingcode"
                                                maxlength="6"
                                            ></el-input>
                                        </el-col>
                                        <el-col
                                            :span="10"
                                            :offset="1"
                                        >
                                            <el-button
                                                type="primary"
                                                @click="sendCode"
                                                v-if="countDown <= 0"
                                            >获取验证码</el-button>
                                            <el-button
                                                disabled
                                                v-if="countDown > 0"
                                            >{{countDown}}秒后重新获取</el-button>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        class="login-button"
                                        type="primary"
                                        @click="getbackForm('backForm')"
                                    >下一步</el-button>
                                </el-form-item>
                            </el-form>
                            <el-form
                                :model="setpasswordForm"
                                :rules="rules3"
                                ref="setpasswordForm"
                                label-width="90px"
                                v-show="loginFormShow == 2"
                                @submit.native.prevent
                            >
                                <el-form-item
                                    label="新密码："
                                    prop="password"
                                >
                                    <el-input
                                        type="password"
                                        v-model="setpasswordForm.password"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item
                                    label="重复密码："
                                    prop="password2"
                                >
                                    <el-input
                                        type="password"
                                        v-model="setpasswordForm.password2"
                                        class="identifyingcode"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button
                                        class="login-button"
                                        type="primary"
                                        @click="resetPass"
                                    >重设密码</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="edit-done-content" v-if="loginFormShow == 3">
                                <i class="el-icon-circle-check edit-done-icon"></i>
                                <div class="done-content">
                                    您已成功重置密码，请牢记您的新密码！
                                </div>
                                <el-button class="edit-done-btn" type="primary" @click="handleReturn">返回登录</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="重置密码成功"
            :visible.sync="dialogVisible"
            width="700px"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            center
        >
            <div class="dialog-container">
                <i class="el-icon-circle-check edit-done-icon"></i>
                <div class="done-content">
                    您已成功重置密码，请牢记您的新密码！
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="return-btn" type="primary" @click="handleReturn">返回登录</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    sendIdentifyingCode,
    verifyIdentifyingCode,
    resetPassword
} from '@/api/util'
import { isValidPhone } from '@/utils/validate'

export default {
    data() {
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'))
            } else if (!isValidPhone(value)) {
                callback(new Error('请输入正确的手机号'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if(this.setpasswordForm.password2 !== '') {
                    this.$refs.setpasswordForm.validateField('password2')
                }
                callback()
            }
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请重复输入密码'))
            } else if (value !== this.setpasswordForm.password) {
                callback(new Error('两次输入密码不一致'))
            } else {
                callback()
            }
        }
        return {
            loginFormShow: 1,
            dialogVisible: false,
            // 步骤条状态1，2
            active: 0,
            countDown: 0,
            backForm: {
                phoneNumber: '',
                identifyingCode: ''
            },
            setpasswordForm: {
                password: '',
                password2: ''
            },
            rules2: {
                phoneNumber: [
                    { validator: validatePhone, trigger: 'blur' }
                ],
                identifyingCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            rules3: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                password2: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            },
            authTimer: null,
            phoneNumberError: '',
            codeError: '',
        }
    },
    methods: {
        //   返回登录
        backLogin() {
            this.$router.replace('/login')
        },
        sendCode() {
            if (!isValidPhone(this.backForm.phoneNumber)) {
                this.phoneNumberError = '请输入手机号码'
                this.$message.error('请输入手机号码')
                return
            }
            sendIdentifyingCode(this.backForm.phoneNumber).then(res => {
                const resData = res.data
                if (resData.flag == 'success') {
                    this.$message.success('验证码已发送')
                    this.setCountDown()
                } else {
                    this.$message.error('验证码发送失败')
                }
            })
        },
        setCountDown() {
            const TIME_COUNT = 60
            if (!this.authTimer) {
                this.countDown = TIME_COUNT
                this.authTimer = setInterval(() => {
                    if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
                        this.countDown --
                    } else {
                        clearInterval(this.authTimer)
                        this.authTimer = null
                    }
                }, 1000)
            }
        },
        //下一步
        getbackForm(backForm) {
            this.$refs[backForm].validate(valid => {
                if (valid) {
                    let { phoneNumber, identifyingCode } = this.backForm
                    this.codeError = ''
                    verifyIdentifyingCode(phoneNumber, identifyingCode).then(res => {
                        const resData = res.data
                        if (resData.flag == 'success') {
                            this.loginFormShow = 2
                            this.active = 1
                        } else {
                            this.codeError = resData.msg
                        }
                    })
                }
            })
        },
        resetPass() {
            this.$refs['setpasswordForm'].validate(valid => {
                if (valid) {
                    resetPassword(this.backForm.phoneNumber, this.setpasswordForm.password).then(res => {
                        const resData = res.data
                        if (resData.flag == 'success') {
                            this.$message.success('重置密码成功')
                            this.dialogVisible = true
                            this.loginFormShow = 3
                            this.active = 2
                        } else {
                            this.$message.error('重置密码失败')
                        }
                    })
                }
            })
        },
        handleReturn() {
            this.$router.replace('/login')
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-pass-container /deep/ {
    .el-input .el-input__inner {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
    .el-form-item {
        margin-bottom: 30px;
    }
    .el-form-item .el-form-item__content,
    .el-form-item .el-form-item__label {
        line-height: 40px;
    }
    .el-button {
        height: 40px;
        padding: 0;
        width: 100%;
    }
}

.edit-pass-container {
    .header {
        padding: 40px 0;
        & .title {
            max-width: 1200px;
            margin: 0 auto;
        }
        .login-logo {
            width: 60px;
            height: 50px;
            float: left;
            cursor: pointer;
        }
        .logo-title {
            margin-left: 60px;
            font-size: 32px;
            letter-spacing: 5px;
        }
        border-bottom: 1px solid #ccc;
    }
}

.edit-pass-content {
    width: 100%;
    position: relative;
    & .content-layout {
        padding: 20px 0;
        height: 600px;
        width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .layout-list {
        padding-top: 40px;
        width: 850px;
        margin: 0 auto;
        .layout-right {
            width: 750px;
        }
    }
}

.login-back {
    height: 40px;
    line-height: 40px;
    flex: 1;
    color: #FC9224;
    .inline-back {
        cursor: pointer;
        display: inline-block;
    }
    .el-icon-arrow-left {
        font-size: 30px;
        vertical-align: middle;
    }
}

.login-forget {
    width: 1200px;
    margin: 0 auto;

    .el-icon-arrow-left {
        font-size: 30px;
        vertical-align: middle;
        cursor: pointer;
    }
    .login-steps {
        margin-left: 100px;
        margin-bottom: 20px;
    }
    .identifyingcode {
        position: relative;
    }
    .identifyingcode2 {
        position: absolute;
        top: 7px;
        right: 14px;
    }
}

.form-list {
    // padding: 50px 140px 50px 100px;
    padding: 50px 200px 50px 150px;
}

.edit-done-content {
    padding-left: 30px;
}

.dialog-container,
.edit-done-content {
    text-align: center;
    .edit-done-icon {
        font-size: 100px;
        color: #67c23a;
    }
    .done-content {
        margin-top: 20px;
        font-size: 16px;
    }
    .edit-done-btn {
        margin-top: 50px;
        width: 250px;
    }
}

.dialog-footer{
    .return-btn {
        width: 250px;
    }
}
</style>
