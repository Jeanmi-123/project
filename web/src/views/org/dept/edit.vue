<template>
  <div class="dept-form-container">
    <n-card
      class="dept-edit-card"
      :bordered="false"
      title="账号编辑"
      content-style="padding: 12px 12px 0 12px;"
    >
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        :label-width="80"
      >
        <n-form-item label="备注" path="remarks">
          <n-input
            v-model:value="formValue.remarks"
            placeholder="请输入备注"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </n-form-item>

        <n-form-item label="标签" path="tags">
          <n-select
            v-model:value="formValue.tags"
            multiple
            placeholder="请选择标签"
            :options="tagOptions"
          />
        </n-form-item>

        <n-form-item label="分组" path="group">
          <n-select
            v-model:value="formValue.group"
            placeholder="请选择分组"
            :options="groupOptions"
          />
        </n-form-item>
        <n-form-item label="账号版本" path="accountVersion">
          <n-radio-group v-model:value="formValue.accountVersion" name="accountVersion">
            <n-radio value="android">安卓</n-radio>
            <n-radio value="android_business">安卓商业</n-radio>
          </n-radio-group>
        </n-form-item>
        <n-divider style="margin-bottom: 12px; margin-top: 0px" />
        <div style="margin-bottom: 20px">
          <n-space justify="end">
            <n-button type="primary" @click="handleSubmit">保存</n-button>
            <n-button @click="handleCancel">取消</n-button>
          </n-space>
        </div>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import { useRouter } from 'vue-router';

  const formRef = ref<FormInst | null>(null);
  const message = useMessage();
  const router = useRouter();

  const formValue = reactive({
    remarks: '',
    tags: [],
    group: null,
    accountVersion: 'android', // 默认选中安卓
  });

  // 示例选项数据
  const tagOptions = [
    { label: '标签A', value: 'tag_a' },
    { label: '标签B', value: 'tag_b' },
    { label: '标签C', value: 'tag_c' },
  ];

  const groupOptions = [
    { label: '分组一', value: 'group_1' },
    { label: '分组二', value: 'group_2' },
    { label: '分组三', value: 'group_3' },
  ];

  // 表单校验规则
  const rules = {
    remarks: {
      required: true,
      message: '备注不能为空',
      trigger: ['blur', 'input'],
    },
    tags: {
      type: 'array',
      required: true,
      message: '请选择至少一个标签',
      trigger: 'change',
    },
    group: {
      required: true,
      message: '请选择分组',
      trigger: 'change',
    },
    accountVersion: {
      required: true,
      message: '请选择账号版本',
      trigger: 'change',
    },
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        message.success('表单验证通过，准备提交数据！');
        console.log('Form Data:', formValue);
        // 在这里执行表单提交逻辑，例如调用API
        // 提交成功后可以跳转回列表页或者关闭当前页面
        // router.push('/org/dept');
      } else {
        console.log(errors);
        message.error('表单验证失败，请检查输入！');
      }
    });
  };

  const handleCancel = () => {
    message.info('取消操作');
    router.back(); // 返回上一页
  };
</script>

<style lang="less">
  .dept-form-container {
    padding: 12px;
    background: #f6f8fa;
  }

  .dept-edit-card {
    border-radius: 6px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* 与 dept.vue 中的 box-shadow 统一 */
    margin-bottom: 10px; /* 添加与 main-card 类似的底部边距 */
  }
</style>
