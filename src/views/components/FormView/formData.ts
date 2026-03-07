/**
 * FormView 表单数据和选项配置
 * 将数据提取到独立文件，减少主组件行数
 */

import { reactive } from 'vue';
import type { FormLayout, LabelPosition, FormSize } from 'ale-ui';

// ========== 布局选项 ==========

export const layouts: { value: FormLayout; label: string }[] = [
  { value: 'vertical', label: '垂直布局' },
  { value: 'horizontal', label: '水平布局' },
  { value: 'inline', label: '行内布局' }
];

export const labelPositions: { value: LabelPosition; label: string }[] = [
  { value: 'left', label: '左对齐' },
  { value: 'right', label: '右对齐' },
  { value: 'top', label: '顶部对齐' }
];

export const sizes: { value: FormSize; label: string }[] = [
  { value: 'large', label: '大号' },
  { value: 'medium', label: '中号' },
  { value: 'small', label: '小号' }
];

// ========== 基础表单 ==========

export const basicForm = reactive({
  username: '',
  email: '',
  password: ''
});

export const emailRules = [
  { required: true, message: '请输入邮箱' },
  { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }
];

export const passwordRules = [
  { required: true, message: '请输入密码' },
  { minLength: 6, message: '密码至少6位' }
];

// ========== 布局表单 ==========

export const layoutForm = reactive({
  name: '',
  phone: '',
  address: ''
});

// ========== 标签位置表单 ==========

export const positionForm = reactive({
  nickname: '',
  bio: ''
});

// ========== 尺寸表单 ==========

export const sizeForm = reactive({
  title: '',
  description: ''
});

// ========== 验证表单 ==========

export const validateForm = reactive({
  username: '',
  email: '',
  age: '',
  phone: ''
});

// ========== 自定义验证表单 ==========

export const customForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

export const validatePasswordStrength = (value: string) => {
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  return hasLetter && hasNumber ? true : false;
};

export const validateConfirmPassword = (value: string) => {
  return value === customForm.password ? true : '两次输入的密码不一致';
};

// ========== 禁用表单 ==========

export const disabledForm = reactive({
  name: '张三',
  email: 'zhangsan@example.com'
});

// ========== 提示信息表单 ==========

export const extraForm = reactive({
  username: '',
  email: ''
});

// ========== 全部表单字段校验 ==========

export const allFieldsForm = reactive({
  username: '',
  description: '',
  gender: '',
  hobbies: [] as string[],
  city: '',
  region: [] as (string | number)[],
  skills: [] as string[],
  newsletter: true,
  attachments: [] as any[],
  agreement: false
});

// 级联选择器选项
export const regionOptions = [
  {
    value: 'beijing',
    label: '北京市',
    children: [
      {
        value: 'haidian',
        label: '海淀区',
        children: [
          { value: 'zhongguancun', label: '中关村' },
          { value: 'wudaokou', label: '五道口' }
        ]
      },
      {
        value: 'chaoyang',
        label: '朝阳区',
        children: [
          { value: 'sanlitun', label: '三里屯' },
          { value: 'guomao', label: '国贸' }
        ]
      }
    ]
  },
  {
    value: 'shanghai',
    label: '上海市',
    children: [
      {
        value: 'pudong',
        label: '浦东新区',
        children: [
          { value: 'lujiazui', label: '陆家嘴' },
          { value: 'zhangjiang', label: '张江' }
        ]
      },
      {
        value: 'huangpu',
        label: '黄浦区',
        children: [
          { value: 'nanjinglu', label: '南京路' },
          { value: 'waitan', label: '外滩' }
        ]
      }
    ]
  },
  {
    value: 'guangdong',
    label: '广东省',
    children: [
      {
        value: 'guangzhou',
        label: '广州市',
        children: [
          { value: 'tianhe', label: '天河区' },
          { value: 'yuexiu', label: '越秀区' }
        ]
      },
      {
        value: 'shenzhen',
        label: '深圳市',
        children: [
          { value: 'nanshan', label: '南山区' },
          { value: 'futian', label: '福田区' }
        ]
      }
    ]
  }
];

export const validateHobbies = (value: string[]) => {
  return value && value.length > 0;
};

export const validateSkills = (value: string[]) => {
  return value && value.length > 0;
};

export const validateRegion = (value: (string | number)[]) => {
  return value && value.length > 0;
};

export const validateAttachments = (value: any[]) => {
  return value && value.length > 0;
};

export const validateAgreement = (value: boolean) => {
  return value === true;
};

// ========== 动态循环表单 ==========

interface DynamicFormItem {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

let dynamicIdCounter = 1;

export const dynamicLoopForm = reactive({
  items: [{ id: dynamicIdCounter++, name: '', email: '', role: '', permissions: [] }] as DynamicFormItem[]
});

export const addDynamicItem = () => {
  dynamicLoopForm.items.push({
    id: dynamicIdCounter++,
    name: '',
    email: '',
    role: '',
    permissions: []
  });
};

export const removeDynamicItem = (index: number) => {
  if (dynamicLoopForm.items.length > 1) {
    dynamicLoopForm.items.splice(index, 1);
  }
};

export const resetDynamicLoopForm = () => {
  dynamicLoopForm.items = [{ id: dynamicIdCounter++, name: '', email: '', role: '', permissions: [] }];
};

// ========== 验证触发事件 ==========

export const triggerForm = reactive({
  username: '',
  email: '',
  phone: '',
  password: ''
});

export const resetTriggerForm = () => {
  triggerForm.username = '';
  triggerForm.email = '';
  triggerForm.phone = '';
  triggerForm.password = '';
};
