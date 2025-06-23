// 通用必填校验
export const requiredRule = (message: string, trigger: string | string[] = 'change') => ({
  required: true,
  message,
  trigger,
});

// 至少选一个标签
export const tagsRule = {
  required: true,
  validator: (rule: any, value: any) => {
    if (!value || value.length === 0) {
      return new Error('请选择至少一个标签');
    }
    return true;
  },
  trigger: 'change',
};

// 是否保持在线
export const keepOnlineRule = {
  required: true,
  validator: (rule: any, value: any) => {
    if (value === true || value === false) {
      return true;
    }
    return new Error('请选择是否保持在线');
  },
  trigger: 'change',
};

// 文件上传
export const filesRule = {
  required: true,
  validator: (rule: any, value: any) => {
    if (!value || value.length === 0) {
      return new Error('请上传文件');
    }
    return true;
  },
  trigger: 'change',
}; 