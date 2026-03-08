<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Radio 单选框</h1>
      <p class="component-demo-view__description">
        单选框用于在一组互斥的选项中选择一项
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleRadio v-model="basicValue" value="option1">选项一</AleRadio>
        <AleRadio v-model="basicValue" value="option2">选项二</AleRadio>
        <AleRadio v-model="basicValue" value="option3" label="选项三" />
      </div>
      <p class="component-demo-view__result">当前选中: {{ basicValue }}</p>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleRadio v-model="sizeValue" value="small" size="small">小型</AleRadio>
        <AleRadio v-model="sizeValue" value="medium" size="medium">中型</AleRadio>
        <AleRadio v-model="sizeValue" value="large" size="large">大型</AleRadio>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo">
        <AleRadio v-model="themeValue" value="primary" theme="primary">主要</AleRadio>
        <AleRadio v-model="themeValue" value="success" theme="success">成功</AleRadio>
        <AleRadio v-model="themeValue" value="warning" theme="warning">警告</AleRadio>
        <AleRadio v-model="themeValue" value="danger" theme="danger">危险</AleRadio>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleRadio v-model="disabledValue" value="option1" disabled>禁用选中</AleRadio>
        <AleRadio v-model="disabledValue" value="option2" disabled>禁用未选中</AleRadio>
        <AleRadio v-model="disabledValue" value="option3" readonly>只读选中</AleRadio>
        <AleRadio v-model="disabledValue" value="option4" readonly>只读未选中</AleRadio>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 单选框组 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">单选框组</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">选中的值: {{ groupValue }}</p>
        <AleRadioGroup v-model="groupValue" :options="groupOptions" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="groupCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 垂直排列 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">垂直排列</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <AleRadioGroup v-model="verticalValue" direction="vertical" :options="groupOptions" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="verticalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 按钮控制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">按钮控制</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <AleButton type="primary" size="small" @click="handleSelectFirst">选择第一个</AleButton>
          <AleButton size="small" @click="handleSelectLast">选择最后一个</AleButton>
          <AleButton size="small" @click="handleClear">清空选择</AleButton>
        </div>
        <AleRadioGroup ref="groupRef" v-model="controlValue" :options="controlOptions" />
        <p style="margin: 12px 0 0 0; color: var(--color-text-secondary);">当前选中: {{ controlValue || '无' }}</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="controlCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 组合使用 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">组合使用</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">使用 slot 自定义单选框组内容</p>
        <AleRadioGroup v-model="slotValue" theme="success" size="large">
          <AleRadio value="beijing">北京</AleRadio>
          <AleRadio value="shanghai">上海</AleRadio>
          <AleRadio value="guangzhou" disabled>广州（禁用）</AleRadio>
          <AleRadio value="shenzhen">深圳</AleRadio>
        </AleRadioGroup>
        <p style="margin: 12px 0 0 0; color: var(--color-text-secondary);">当前选中: {{ slotValue }}</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="slotCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 交互示例 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">交互示例</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">请选择支付方式：</p>
        <AleRadioGroup v-model="paymentValue" :options="paymentOptions" @change="handlePaymentChange" />
        <p v-if="paymentValue" style="color: var(--color-success); margin: 12px 0 0 0;">
          您选择了: {{ paymentLabel }}
        </p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="interactiveCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 表单应用 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">表单应用</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <div class="form-demo">
          <div class="form-item">
            <label class="form-label">性别：</label>
            <AleRadioGroup v-model="formData.gender" :options="genderOptions" />
          </div>
          <div class="form-item">
            <label class="form-label">学历：</label>
            <AleRadioGroup v-model="formData.education" :options="educationOptions" size="small" />
          </div>
          <div class="form-result">
            <p>表单数据：</p>
            <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
          </div>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="formCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleRadio, AleRadioGroup, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础用法
const basicValue = ref('option1');

// 尺寸示例
const sizeValue = ref('medium');

// 主题示例
const themeValue = ref('primary');

// 禁用示例
const disabledValue = ref('option1');

// 单选框组示例
const groupValue = ref('apple');
const groupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];

// 垂直排列示例
const verticalValue = ref('option1');

// 按钮控制示例
const groupRef = ref<InstanceType<typeof AleRadioGroup>>();
const controlValue = ref<string>('');
const controlOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const handleSelectFirst = () => {
  groupRef.value?.selectFirst();
};

const handleSelectLast = () => {
  groupRef.value?.selectLast();
};

const handleClear = () => {
  groupRef.value?.clear();
};

// 组合使用示例
const slotValue = ref('beijing');

// 交互示例
const paymentValue = ref('');
const paymentOptions = [
  { label: '支付宝', value: 'alipay' },
  { label: '微信支付', value: 'wechat' },
  { label: '银行卡', value: 'card' },
  { label: '货到付款', value: 'cod' }
];

const paymentLabel = computed(() => {
  const option = paymentOptions.find(opt => opt.value === paymentValue.value);
  return option?.label || '';
});

const handlePaymentChange = (value: string | number | boolean) => {
  console.log('支付方式:', value);
};

// 表单示例
const formData = ref({
  gender: 'male',
  education: 'bachelor'
});

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
];

const educationOptions = [
  { label: '高中及以下', value: 'high-school' },
  { label: '大专', value: 'college' },
  { label: '本科', value: 'bachelor' },
  { label: '硕士及以上', value: 'master' }
];

// 代码示例
const basicCode = `<template>
  <AleRadio v-model="value" value="option1">选项一</AleRadio>
  <AleRadio v-model="value" value="option2">选项二</AleRadio>
  <AleRadio v-model="value" value="option3" label="选项三" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('option1');
<\/script>`;

const sizeCode = `<template>
  <AleRadio v-model="value" value="small" size="small">小型</AleRadio>
  <AleRadio v-model="value" value="medium" size="medium">中型</AleRadio>
  <AleRadio v-model="value" value="large" size="large">大型</AleRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('medium');
<\/script>`;

const themeCode = `<template>
  <AleRadio v-model="value" value="primary" theme="primary">主要</AleRadio>
  <AleRadio v-model="value" value="success" theme="success">成功</AleRadio>
  <AleRadio v-model="value" value="warning" theme="warning">警告</AleRadio>
  <AleRadio v-model="value" value="danger" theme="danger">危险</AleRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('primary');
<\/script>`;

const disabledCode = `<template>
  <AleRadio v-model="value" value="option1" disabled>禁用选中</AleRadio>
  <AleRadio v-model="value" value="option2" disabled>禁用未选中</AleRadio>
  <AleRadio v-model="value" value="option3" readonly>只读选中</AleRadio>
  <AleRadio v-model="value" value="option4" readonly>只读未选中</AleRadio>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio } from 'ale-ui';

const value = ref('option1');
<\/script>`;

const groupCode = `<template>
  <p>选中的值: {{ groupValue }}</p>
  <AleRadioGroup v-model="groupValue" :options="groupOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const groupValue = ref('apple');
const groupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
<\/script>`;

const verticalCode = `<template>
  <AleRadioGroup v-model="value" direction="vertical" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const value = ref('option1');
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
<\/script>`;

const controlCode = `<template>
  <div>
    <AleButton type="primary" size="small" @click="handleSelectFirst">
      选择第一个
    </AleButton>
    <AleButton size="small" @click="handleSelectLast">
      选择最后一个
    </AleButton>
    <AleButton size="small" @click="handleClear">
      清空选择
    </AleButton>
  </div>
  <AleRadioGroup ref="groupRef" v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup, AleButton } from 'ale-ui';

const groupRef = ref<InstanceType<typeof AleRadioGroup>>();
const value = ref<string>('');
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const handleSelectFirst = () => groupRef.value?.selectFirst();
const handleSelectLast = () => groupRef.value?.selectLast();
const handleClear = () => groupRef.value?.clear();
<\/script>`;

const slotCode = `<template>
  <AleRadioGroup v-model="value" theme="success" size="large">
    <AleRadio value="beijing">北京</AleRadio>
    <AleRadio value="shanghai">上海</AleRadio>
    <AleRadio value="guangzhou" disabled>广州（禁用）</AleRadio>
    <AleRadio value="shenzhen">深圳</AleRadio>
  </AleRadioGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadio, AleRadioGroup } from 'ale-ui';

const value = ref('beijing');
<\/script>`;

const interactiveCode = `<template>
  <p>请选择支付方式：</p>
  <AleRadioGroup v-model="payment" :options="options" @change="handleChange" />
  <p v-if="payment">您选择了: {{ paymentLabel }}</p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const payment = ref('');
const options = [
  { label: '支付宝', value: 'alipay' },
  { label: '微信支付', value: 'wechat' },
  { label: '银行卡', value: 'card' },
  { label: '货到付款', value: 'cod' }
];

const paymentLabel = computed(() => {
  const option = options.find(opt => opt.value === payment.value);
  return option?.label || '';
});

const handleChange = (value: string) => {
  console.log('支付方式:', value);
};
<\/script>`;

const formCode = `<template>
  <div class="form-demo">
    <div class="form-item">
      <label>性别：</label>
      <AleRadioGroup v-model="formData.gender" :options="genderOptions" />
    </div>
    <div class="form-item">
      <label>学历：</label>
      <AleRadioGroup v-model="formData.education" :options="educationOptions" size="small" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleRadioGroup } from 'ale-ui';

const formData = ref({
  gender: 'male',
  education: 'bachelor'
});

const genderOptions = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' }
];

const educationOptions = [
  { label: '高中及以下', value: 'high-school' },
  { label: '大专', value: 'college' },
  { label: '本科', value: 'bachelor' },
  { label: '硕士及以上', value: 'master' }
];
<\/script>`;
</script>

<style scoped>
.component-demo-view {
  max-width: 1000px;
  margin: 0 auto;
}

.component-demo-view__header {
  margin-bottom: 48px;
}

.component-demo-view__title {
  font-size: 36px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.component-demo-view__description {
  font-size: 16px;
  color: var(--color-text-secondary);
  margin: 0;
}

.component-demo-view__section {
  background: var(--color-bg-base);
  border-radius: var(--radius-lg);
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: var(--shadow-sm);
}

.component-demo-view__section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border-light);
}

.component-demo-view__demo {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.component-demo-view__result {
  margin: 16px 0 0 0;
  padding: 12px 16px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  font-size: 14px;
}

.component-demo-view__code {
  margin-top: 24px;
}

.form-demo {
  width: 100%;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.form-label {
  min-width: 60px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-result {
  margin-top: 24px;
  padding: 16px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
}

.form-result p {
  margin: 0 0 8px 0;
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-result pre {
  margin: 0;
  padding: 12px;
  background: var(--color-gray-100);
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-text-secondary);
  overflow-x: auto;
}
</style>
