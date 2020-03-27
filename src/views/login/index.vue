<template>
    <div class="login-container">
        <div class="header">
            <div class="logo clearfix">
                <div class="login-logo">
                    <img src="../../assets/logo.png">
                </div>
                <h1 class="logo-title">后台管理系统</h1>
            </div>
        </div>
        <div class="login-content">
            <div class="content-layout">
                <div class="login-newbg">
                </div>
                <div class="login-box-warp">
                    <div class="login-box">
                        <div class="login-title">
                            账号登录
                        </div>
                        <el-form
                            :model="loginForm"
                            :rules="rules"
                            ref="loginForm"
                            label-position="right"
                            label-width="70px"
                            class="login-form"
                            :hide-required-asterisk="true"
                            @submit.native.prevent
                        >
                            <el-form-item
                                label="账号："
                                prop="userLoginid"
                            >
                                <el-input v-model="loginForm.userLoginid"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="密码："
                                prop="userLoginpassword"
                                :error="passError"
                            >
                                <el-input
                                    type="password"
                                    v-model="loginForm.userLoginpassword"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="验证码：" prop="code" :error="codeError">
                                <el-row>
                                    <el-col :span="15">
                                        <el-input v-model="loginForm.code" @input="updateCode"></el-input>
                                    </el-col>
                                    <el-col :span="8" :offset="1" style="height: 40px;">
                                        <!-- <canvas id="verifyCanvas"></canvas> -->
                                        <verification-code ref="resetcode" @click="changeCode"></verification-code>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    :loading="loading"
                                    class="login-box-button"
                                    type="primary"
                                    native-type="submit"
                                    @click="getLoginForm"
                                >登录</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="login-links">
                            <a @click="forget">忘记密码？</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            Copy© 2018 e-Nutrition 广东医膳通智能信息技术有限公司
        </div>
    </div>
</template>

<script>
//import verificationCode from './components/verificationCode'
/*export default {
    //components: { verificationCode },
    data() {
        return {
            active: 2,
            loginForm: {
                userLoginid: '',
                userLoginpassword: '',
                code: ''
            },
            rules: {
                userLoginid: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                userLoginpassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            codeError: '',
            passError: '',
            securityCode: '',
            loading: false,
            redirect: undefined
        }
    },
    methods: {
        // 登录
        getLoginForm() {
            this.$refs.loginForm.validate(valid => {
                if (this.loginForm.code.toLowerCase() != this.securityCode.toLowerCase()) {
                    this.$refs.resetcode.resetCode()
                    this.codeError = '请输入正确的验证码！'
                }
                if (valid) {
                    if (this.loginForm.code.toLowerCase() != this.securityCode.toLowerCase()) {
                        return false
                    }
                    this.loading = true
                    this.passError = ''
                    this.$store.dispatch('user/loginUser', this.loginForm).then(res => {
                        console.log(res)
                         localStorage.setItem('supplierId',res.data.supplierId ||'')
                        this.loading = false
                        if (res.success == 'true') {
                            this.$router.push({ path: this.redirect || '/' })
                        } else {
                            this.$refs.resetcode.resetCode()
                            this.passError = res.msg
                        }
                    }).catch(() => {
                        this.loading = false
                        this.$refs.resetcode.resetCode()
                    })
                }
            })
        },
        updateCode() {
            if (this.loginForm.code != '') {
                this.codeError = ''
            }
        },
        //忘记密码
        forget() {
            this.$router.push('/pass-find')
        },
        changeCode(val) {
            this.securityCode = val
        }
    }
}*/
</script>

<style lang="scss" scoped>
.login-container /deep/ {
    .el-input .el-input__inner {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
    }
    .el-form-item .el-form-item__content, .el-form-item .el-form-item__label {
        line-height: 40px;
    }
    .el-input {
        .el-input__inner {
            border-color: #dcdfe6;
        }
        .el-input__inner:focus {
            border-color: #409EFF;
        }
    }
}
.login-container {
    .header {
        padding: 20px 0;
        & .logo {
            width: 1200px;
            margin: 0 auto;
            height: 50px;
            line-height: 50px;
        }
        .login-logo {
            width: 60px;
            height: 50px;
            float: left;
        }
        .logo-title {
            margin-left: 60px;
            font-size: 40px;
            letter-spacing: 5px;
        }
    }
    .login-content {
        background: #D7ECFD;
        width: 100%;
        position: relative;
        & .content-layout {
            height: 800px;
            width: 1200px;
            margin: 0 auto;
            position: relative;
            .login-newbg {
                //background-image: url(../../assets/back.png);
                position: absolute;
                width: 831px;
                height: 654px;
                top: 73px;
            }
        }
    }
    .el-form {
        text-align: center;
        p {
            font-size: 28px;
            font-weight: 600;
        }
        .login-button {
            width: 100%;
        }
        .el-form-item {
            margin-bottom: 30px;
        }
    }
    .footer {
        text-align: center;
        padding: 40px 0;
        width: 1200px;
        margin: 0 auto;
    }
}

.login-links {
    text-align: right;
    a {
        margin-right: 20px;
        color: red;
    }
}

.login-box-warp {
    width: 400px;
    position: absolute;
    top: 220px;
    right: 60px;
    .login-box {
        background: #fff;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 1px 1px 1px;
    }
}

.login-title {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
}
.login-box-button {
    width: 100%;
    height: 40px;
}

#verifyCanvas {
    border: 1px solid #ccc;
    height: 40px;
    width: 100%;
}
</style>
