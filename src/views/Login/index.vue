<template>
  <div class="login-container">
    <van-nav-bar title="标题" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        ><template #left-icon>
          <ToutiaoIcon icon="shouji"></ToutiaoIcon> </template
      ></van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
        ><template #left-icon>
          <ToutiaoIcon icon="yanzhengma"></ToutiaoIcon>
        </template>
        <template #button
          ><van-count-down
            @finish="isShowCodeDown = false"
            time="5000"
            format="ss s"
            v-if="isShowCodeDown"
          />
          <van-button
            v-else
            :loading="isDisable"
            type="primary"
            native-type="button"
            size="samll"
            class="send-sms-btn"
            @click="sendSmsCode"
            >获取验证码</van-button
          ></template
        ></van-field
      >
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      isDisable: false,
      isShowCodeDown: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不对" },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        console.log(e);
        Toast.fail(e?.response?.data?.message || "服务器端错误");
      }

      //   console.log(values);
    },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisable = true;
        await getSmsCode(this.user.mobile);
        this.isShowCodeDown = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        this.$toast.fail(e.response.data.message || "出错了");
        this.isShowCodeDown = false;
      } finally {
        this.isDisable = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
