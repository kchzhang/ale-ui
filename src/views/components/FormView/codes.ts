/**
 * FormView 代码示例
 * 将代码字符串提取到独立文件，减少主组件行数
 */

// 基础表单示例代码
export const basicCode = `<template>
  <AleForm :model="form" @submit="handleSubmit">
    <AleFormItem name="username" label="用户名" :rules="[{ required: true }]">
      <AleInput v-model="form.username" placeholder="请输入用户名" />
    </AleFormItem>
    <AleFormItem name="email" label="邮箱" :rules="emailRules">
      <AleInput v-model="form.email" placeholder="请输入邮箱" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
      <AleButton @click="resetForm">重置</AleButton>
      <AleButton type="success" @click="fillExample">填充示例</AleButton>
      <AleButton type="warning" @click="validateForm">校验</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  username: '',
  email: ''
});

const emailRules = [
  { required: true, message: '请输入邮箱' },
  { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }
];

const resetForm = () => {
  form.username = '';
  form.email = '';
};

const fillExample = () => {
  form.username = 'zhangsan';
  form.email = 'zhangsan@example.com';
};

const validateForm = () => {
  // 手动校验逻辑
};

const handleSubmit = (data) => {
  console.log('提交数据:', data);
};
<\/script>`;

// 布局示例代码
export const layoutCode = `<template>
  <AleForm :model="form" layout="horizontal" @submit="handleSubmit">
    <AleFormItem name="name" label="姓名" :rules="[{ required: true }]">
      <AleInput v-model="form.name" />
    </AleFormItem>
    <AleFormItem name="phone" label="手机号" :rules="[{ required: true }]">
      <AleInput v-model="form.phone" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`;

// 标签位置示例代码
export const positionCode = `<template>
  <AleForm
    :model="form"
    layout="horizontal"
    label-position="right"
    label-width="100px"
  >
    <AleFormItem name="nickname" label="昵称">
      <AleInput v-model="form.nickname" />
    </AleFormItem>
    <AleFormItem name="bio" label="个人简介">
      <AleInput v-model="form.bio" type="textarea" :rows="3" />
    </AleFormItem>
  </AleForm>
</template>`;

// 尺寸示例代码
export const sizeCode = `<template>
  <AleForm :model="form" size="large">
    <AleFormItem name="title" label="标题">
      <AleInput v-model="form.title" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" size="large">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`;

// 验证示例代码
export const validateCode = `<template>
  <AleForm ref="formRef" :model="form" @submit="handleSubmit" @validate-fail="handleFail">
    <AleFormItem name="username" label="用户名" :rules="usernameRules">
      <AleInput v-model="form.username" />
    </AleFormItem>
    <AleFormItem name="email" label="邮箱" :rules="emailRules">
      <AleInput v-model="form.email" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
      <AleButton @click="formRef?.resetFields()">重置</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formRef = ref();
const form = reactive({
  username: '',
  email: ''
});

const usernameRules = [
  { required: true, message: '用户名不能为空' },
  { minLength: 3, message: '至少3个字符' },
  { maxLength: 20, message: '最多20个字符' }
];

const emailRules = [
  { required: true, message: '邮箱不能为空' },
  { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }
];
<\/script>`;

// 自定义验证示例代码
export const customCode = `<template>
  <AleForm :model="form" @submit="handleSubmit">
    <AleFormItem name="username" label="用户名" :rules="usernameRules">
      <AleInput v-model="form.username" autocomplete="username" />
    </AleFormItem>
    <AleFormItem name="password" label="密码" :rules="passwordRules">
      <AleInput v-model="form.password" type="password" autocomplete="new-password" />
    </AleFormItem>
    <AleFormItem name="confirmPassword" label="确认密码" :rules="confirmRules">
      <AleInput v-model="form.confirmPassword" type="password" autocomplete="new-password" />
    </AleFormItem>
  </AleForm>
</template>

<script setup>
const usernameRules = [
  { required: true, message: '请输入用户名' },
  { minLength: 3, message: '用户名至少3位' }
];

const passwordRules = [
  { required: true, message: '请输入密码' },
  { 
    validator: (value) => /[a-zA-Z]/.test(value) && /\\d/.test(value),
    message: '密码必须包含字母和数字'
  }
];

const confirmRules = [
  { required: true, message: '请确认密码' },
  { 
    validator: (value) => value === form.password,
    message: '两次输入的密码不一致'
  }
];
<\/script>`;

// 禁用状态示例代码
export const disabledCode = `<template>
  <AleForm :model="form" disabled>
    <AleFormItem name="name" label="姓名">
      <AleInput v-model="form.name" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" disabled>提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`;

// 提示信息示例代码
export const extraCode = `<template>
  <AleForm :model="form">
    <AleFormItem name="username" label="用户名" extra="用户名用于登录系统">
      <AleInput v-model="form.username" />
    </AleFormItem>
  </AleForm>
</template>`;

// 全部字段示例代码
export const allFieldsCode = `<template>
  <AleForm :model="form" @submit="handleSubmit">
    <!-- 文本输入 -->
    <AleFormItem name="username" label="用户名" :rules="usernameRules">
      <AleInput v-model="form.username" placeholder="3-20个字符" />
    </AleFormItem>

    <!-- 文本域 -->
    <AleFormItem name="description" label="个人简介" :rules="descriptionRules">
      <AleInput v-model="form.description" type="textarea" :rows="4" />
    </AleFormItem>

    <!-- 单选框 -->
    <AleFormItem name="gender" label="性别" :rules="[{ required: true }]">
      <AleRadioGroup v-model="form.gender">
        <AleRadio value="male">男</AleRadio>
        <AleRadio value="female">女</AleRadio>
      </AleRadioGroup>
    </AleFormItem>

    <!-- 多选框 -->
    <AleFormItem name="hobbies" label="兴趣爱好" :rules="[{ validator: validateHobbies }]">
      <AleCheckboxGroup v-model="form.hobbies">
        <AleCheckbox value="reading">阅读</AleCheckbox>
        <AleCheckbox value="sports">运动</AleCheckbox>
        <AleCheckbox value="music">音乐</AleCheckbox>
      </AleCheckboxGroup>
    </AleFormItem>

    <!-- 下拉选择 -->
    <AleFormItem name="city" label="城市" :rules="[{ required: true }]">
      <AleSelect v-model="form.city" placeholder="请选择城市">
        <AleOption value="beijing">北京</AleOption>
        <AleOption value="shanghai">上海</AleOption>
        <AleOption value="guangzhou">广州</AleOption>
        <AleOption value="shenzhen">深圳</AleOption>
      </AleSelect>
    </AleFormItem>

    <!-- 下拉多选 -->
    <AleFormItem name="skills" label="技能标签" :rules="[{ validator: validateSkills }]">
      <AleSelect v-model="form.skills" multiple placeholder="请选择技能（可多选）">
        <AleOption value="javascript">JavaScript</AleOption>
        <AleOption value="typescript">TypeScript</AleOption>
        <AleOption value="vue">Vue.js</AleOption>
        <AleOption value="react">React</AleOption>
        <AleOption value="node">Node.js</AleOption>
        <AleOption value="python">Python</AleOption>
        <AleOption value="go">Go</AleOption>
        <AleOption value="rust">Rust</AleOption>
      </AleSelect>
    </AleFormItem>

    <!-- 级联选择 -->
    <AleFormItem name="region" label="所在地区" :rules="[{ required: true }, { validator: validateRegion }]">
      <AleCascader
        v-model="form.region"
        :options="regionOptions"
        placeholder="请选择省/市/区"
        clearable
      />
    </AleFormItem>

    <!-- Switch 开关 -->
    <AleFormItem name="newsletter" label="订阅通知">
      <AleSwitch v-model="form.newsletter" active-text="接收" inactive-text="不接收" />
    </AleFormItem>

    <!-- 文件上传 -->
    <AleFormItem
      name="attachments"
      label="附件上传"
      :rules="[
        { required: true, message: '请上传附件' },
        { validator: validateAttachments, message: '请至少上传一个文件' }
      ]"
    >
      <AleUpload
        v-model="form.attachments"
        list-type="text"
        :limit="3"
      >
        <AleButton type="primary" size="small">点击上传</AleButton>
      </AleUpload>
    </AleFormItem>

    <!-- 单个 Checkbox -->
    <AleFormItem name="agreement" :rules="[{ validator: validateAgreement }]">
      <AleCheckbox v-model="form.agreement">
        我已阅读并同意《用户服务协议》
      </AleCheckbox>
    </AleFormItem>

    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  username: '',
  description: '',
  gender: '',
  hobbies: [],
  city: '',
  region: [],
  skills: [],
  newsletter: true,
  attachments: [],
  agreement: false
});

// 级联选择器选项
const regionOptions = [
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
      }
    ]
  }
];

const usernameRules = [
  { required: true, message: '请输入用户名' },
  { minLength: 3, message: '至少3个字符' },
  { maxLength: 20, message: '最多20个字符' }
];

const descriptionRules = [
  { required: true, message: '请输入个人简介' },
  { minLength: 10, message: '至少10个字符' },
  { maxLength: 200, message: '最多200个字符' }
];

const validateHobbies = (value) => value && value.length > 0;
const validateSkills = (value) => value && value.length > 0;
const validateRegion = (value) => value && value.length > 0;
const validateAttachments = (value) => value && value.length > 0;
const validateAgreement = (value) => value === true;
<\/script>`;

// 动态循环表单示例代码
export const dynamicLoopCode = `<template>
  <AleForm :model="form" @submit="handleSubmit">
    <!-- 动态表单项循环 -->
    <div v-for="(item, index) in form.items" :key="item.id">
      <h4>成员 {{ index + 1 }}</h4>
      <AleButton
        v-if="form.items.length > 1"
        type="danger"
        size="small"
        @click="removeItem(index)"
      >
        删除
      </AleButton>

      <AleFormItem
        :name="\`items.\${index}.name\`"
        label="姓名"
        :rules="[{ required: true }]"
      >
        <AleInput v-model="item.name" />
      </AleFormItem>

      <AleFormItem
        :name="\`items.\${index}.email\`"
        label="邮箱"
        :rules="emailRules"
      >
        <AleInput v-model="item.email" />
      </AleFormItem>

      <AleFormItem
        :name="\`items.\${index}.role\`"
        label="角色"
        :rules="[{ required: true }]"
      >
        <AleRadioGroup v-model="item.role">
          <AleRadio value="admin">管理员</AleRadio>
          <AleRadio value="editor">编辑</AleRadio>
        </AleRadioGroup>
      </AleFormItem>
    </div>

    <AleButton type="primary" @click="addItem">+ 添加成员</AleButton>
    <AleButton type="primary" native-type="submit">提交</AleButton>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

let idCounter = 1;

const form = reactive({
  items: [{ id: idCounter++, name: '', email: '', role: '' }]
});

const addItem = () => {
  form.items.push({
    id: idCounter++,
    name: '',
    email: '',
    role: ''
  });
};

const removeItem = (index) => {
  if (form.items.length > 1) {
    form.items.splice(index, 1);
  }
};

const emailRules = [
  { required: true, message: '请输入邮箱' },
  { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }
];
<\/script>`;

// 验证触发事件示例代码
export const triggerCode = `<template>
  <AleForm :model="form" @submit="handleSubmit">
    <!-- change 触发 -->
    <AleFormItem
      name="username"
      label="用户名"
      :rules="[
        { required: true, message: '请输入用户名', trigger: 'change' },
        { minLength: 3, message: '至少3个字符', trigger: 'change' }
      ]"
    >
      <AleInput v-model="form.username" placeholder="输入时实时验证" autocomplete="username" />
    </AleFormItem>

    <!-- blur 触发 -->
    <AleFormItem
      name="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确', trigger: 'blur' }
      ]"
    >
      <AleInput v-model="form.email" placeholder="失去焦点时验证" />
    </AleFormItem>

    <!-- 多种触发方式 -->
    <AleFormItem
      name="phone"
      label="手机号"
      :rules="[
        { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
        { pattern: /^1[3-9]\\d{9}$/, message: '手机号格式不正确', trigger: ['change', 'blur'] }
      ]"
    >
      <AleInput v-model="form.phone" placeholder="输入和失去焦点都验证" />
    </AleFormItem>

    <!-- password -->
    <AleFormItem
      name="password"
      label="密码"
      :rules="[
        { required: true, message: '请输入密码', trigger: 'blur' },
        { minLength: 6, message: '至少6位', trigger: 'blur' }
      ]"
    >
      <AleInput v-model="form.password" type="password" placeholder="请输入密码" autocomplete="current-password" />
    </AleFormItem>

    <AleFormItem>
      <AleButton type="primary" native-type="submit">提交</AleButton>
      <AleButton @click="resetForm">重置</AleButton>
    </AleFormItem>
  </AleForm>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  username: '',
  email: '',
  phone: ''
});

const handleSubmit = (data) => {
  console.log('提交数据:', data);
};

const resetForm = () => {
  form.username = '';
  form.email = '';
  form.phone = '';
};
<\/script>`;
