<template>
  <div class="min-h-screen bg-gray-50 py-3 px-2">
    <n-card
      class="bg-white rounded-lg shadow mb-3"
      :bordered="false"
      title="账号编辑"
      content-style="padding: 24px 30px 0 30px;"
    >
      <n-form
        ref="formRef"
        :model="formValue"
        :rules="rules"
        label-placement="left"
        :label-width="130"
        class="w-xl"
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
            clearable
            :options="tagOptions"
          />
        </n-form-item>

        <n-form-item label="分组" path="group">
          <n-select
            v-model:value="formValue.group"
            placeholder="请选择分组"
            clearable
            :options="groupOptions"
          />
        </n-form-item>

        <n-form-item label="代理IP" path="proxyIp">
          <n-select
            v-model:value="formValue.proxyIp"
            placeholder="请选择代理IP"
            :options="proxyIpOptions"
            clearable
          />
        </n-form-item>
        <n-form-item label="是否保持在线" path="keepOnline">
          <n-radio-group v-model:value="formValue.keepOnline" name="keepOnline">
            <n-radio :value="true">是</n-radio>
            <n-radio :value="false">否</n-radio>
          </n-radio-group>
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
            class="w-full"
          >
            <n-upload-dragger
              class="w-full h-52 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div class="mb-3 text-gray-400">
                <n-icon size="48" :depth="3">
                  <UploadOutlined />
                </n-icon>
              </div>
              <n-text class="text-base"> 点击或者拖动文件到该区域来上传 </n-text>
              <n-p depth="3" class="mt-2 text-gray-400"> 文件格式XXXXXXXXX </n-p>
            </n-upload-dragger>
          </n-upload>
        </n-form-item>
      </n-form>
      <n-divider class="mb-3 mt-0" />
      <div class="mb-5">
        <n-space justify="end" class="w-full">
          <n-button type="primary" @click="handleViewHistory" class="mr-2"
            >点击查看历史导入</n-button
          >
          <n-button type="primary" @click="handleSubmit" class="mr-2">保存</n-button>
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
  import { requiredRule, tagsRule, keepOnlineRule, filesRule } from '@/utils/formRules';
  import { tagOptions, groupOptions, proxyIpOptions } from '@/utils/selectOptions';

  const formRef = ref<FormInst | null>(null);
  const message = useMessage();
  const router = useRouter();
  const showHistoryModal = ref(false); // 控制弹框显示隐藏

  const formValue = reactive({
    remarks: '',
    tags: [],
    group: null,
    proxyIp: null,
    accountVersion: 'android',
    keepOnline: true,
    files: [], // 添加文件列表
  });

  // 表单校验规则
  const rules = {
    remarks: requiredRule('备注不能为空', ['blur', 'input']),
    tags: tagsRule,
    group: requiredRule('请选择分组'),
    proxyIp: requiredRule('请选择代理IP'),
    accountVersion: requiredRule('请选择账号版本'),
    keepOnline: keepOnlineRule,
    files: filesRule,
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
      } else {
        console.log(errors);
        message.error('表单验证失败，请检查输入！');
      }
    });
  };

  const handleCancel = () => {
    router.back();
  };
</script>
