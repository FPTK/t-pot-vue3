<template >
  <el-dialog
    :model-value="mailDialogVisible"
    :title="mailDialogTitle"
    width="40%"
    :before-close="handleClose"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="服务器地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入服务器地址" />
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <el-input v-model="form.port" placeholder="请输入端口号" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="收信人" prop="name">
        <el-input v-model="form.name" placeholder="请输入收信人" />
      </el-form-item>
      <el-form-item label="发送间隔" prop="internal">
        <el-input
          v-model="form.internal"
          placeholder="请输入发送间隔，单位：分钟"
        />
      </el-form-item>
      <el-form-item label="告警等级" prop="level">
        <el-checkbox-group v-model="form.level">
          <el-checkbox v-model="low" label="低危" />
          <el-checkbox v-model="mid" label="中危" />
          <el-checkbox v-model="high" label="高危" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits, ref, defineProps, watch } from "vue";

const props = defineProps({
  mailDialogTitle: {
    type: String,
    default: "",
    required: true,
  },
  mailDialogTableValue: {
    type: Object,
    default: () => {},
  },
});
const formRef = ref(null);

const form = ref({
  address: "",
  port: "",
  username: "",
  password: "",
  telnumber: "",
  internal: "",
  level: [],
});

watch(
  () => props.mailDialogTableValue,
  () => {
    console.log(props.mailDialogTableValue);
    form.value = props.mailDialogTableValue;
  },
  { deep: true, immediate: true }
);

const emits = defineEmits(["update:modelValue"]);
//弹窗取消
const handleClose = () => {
  emits("update:modelValue", false);
};
//弹窗确认
const handleConfirm = () => {
  handleClose();
};

//表单校验
const rules = ref({
  address: [{ required: true, message: "青输入服务器地址", trigger: "blur" }],
  port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  telnumber: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: "1[3-9]\\d{9}" },
  ],
  internal: [
    { required: true, message: "请输入报警间隔，单位为分钟", trigger: "blur" },
  ],
  level: [
    { required: true, message: "请选择至少一种告警等级", trigger: "change" },
  ],
});
</script>
<style></style>
