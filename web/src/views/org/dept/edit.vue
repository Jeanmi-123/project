<template>
  <div class="dept-form-container">
    <n-card
      class="dept-edit-card"
      :bordered="false"
      title="账号编辑"
      content-style="padding: 24px 30px 0 30px;"
    >
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        :label-width="100"
        style="max-width: 89%; margin: 0 auto"
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

        <n-form-item label="拖拽上传" path="files">
          <n-upload
            v-model:file-list="formValue.files"
            multiple
            :max="1"
            :default-upload="false"
            accept=".txt"
            class="custom-upload"
          >
            <n-upload-dragger>
              <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                  <UploadOutlined />
                </n-icon>
              </div>
              <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
              <n-p depth="3" style="margin: 8px 0 0 0"> 文件格式XXXXXXXXX </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
      </n-form>
      <n-divider style="margin-bottom: 12px; margin-top: 0px" />
      <div style="margin-bottom: 20px">
        <n-space justify="end">
          <n-button type="primary" @click="handleViewHistory" class="mr-2"
            >点击查看历史导入</n-button
          >
          <n-button type="primary" @click="handleSubmit">保存</n-button>
          <n-button @click="handleCancel">取消</n-button>
        </n-space>
      </div>
    </n-card>

    <n-modal
      v-model:show="showHistoryModal"
      :show-icon="false"
      preset="dialog"
      style="width: 920px"
      :mask-closable="false"
    >
      <historyList />
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import { UploadOutlined } from '@vicons/antd';
  import historyList from './components/historyList.vue';

  const formRef = ref<FormInst | null>(null);
  const message = useMessage();
  const router = useRouter();
  const showHistoryModal = ref(false); // 控制弹框显示隐藏

  const formValue = reactive({
    remarks: '',
    tags: [],
    group: null,
    accountVersion: 'android',
    files: [], // 添加文件列表
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
      required: true,
      validator: (rule, value) => {
        if (!value || value.length === 0) {
          return new Error('请选择至少一个标签');
        }
        return true;
      },
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
    files: {
      required: true,
      validator: (rule, value) => {
        if (!value || value.length === 0) {
          return new Error('请上传文件');
        }
        return true;
      },
      trigger: 'change',
    },
  };

  const handleViewHistory = () => {
    // message.info('查看历史导入功能待实现'); // Replace with modal logic
    showHistoryModal.value = true;
  };

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        // 处理文件上传
        const formData = new FormData();
        formValue.files.forEach((file: any) => {
          formData.append('files[]', file.file);
        });

        // 添加其他表单数据
        Object.keys(formValue).forEach((key) => {
          if (key !== 'files') {
            formData.append(key, JSON.stringify(formValue[key]));
          }
        });

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
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
  }

  .custom-upload {
    margin: 0 auto;

    :deep(.n-upload-dragger) {
      width: 100%;
      height: 200px;
      border: 2px dashed #cccccc;
      border-radius: 8px;
      transition: all 0.3s;
      background: #fafafa;

      &:hover {
        border-color: #409eff;
        background: #f4faff;
      }
    }

    // Hide the file list if only one file is allowed and no image-card type
    :deep(.n-upload-file-list) {
      display: none;
    }
  }

  .upload-trigger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 20px;
    text-align: center;
  }

  .upload-icon {
    color: #c0c0c0;
    margin-bottom: 8px;
  }

  .upload-text {
    font-size: 14px;
    color: #808080;
  }

  .upload-hint {
    display: none;
  }
</style>
