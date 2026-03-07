<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Checkbox 复选框</h1>
      <p class="component-demo-view__description">
        复选框用于在一组选项中进行多选
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleCheckbox v-model="checked1">选项一</AleCheckbox>
        <AleCheckbox v-model="checked2">选项二</AleCheckbox>
        <AleCheckbox v-model="checked3" label="选项三" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleCheckbox v-model="sizeChecked" size="small">小型</AleCheckbox>
        <AleCheckbox v-model="sizeChecked" size="medium">中型</AleCheckbox>
        <AleCheckbox v-model="sizeChecked" size="large">大型</AleCheckbox>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同主题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同主题</h2>
      <div class="component-demo-view__demo">
        <AleCheckbox v-model="themeChecked" theme="primary">主要</AleCheckbox>
        <AleCheckbox v-model="themeChecked" theme="success">成功</AleCheckbox>
        <AleCheckbox v-model="themeChecked" theme="warning">警告</AleCheckbox>
        <AleCheckbox v-model="themeChecked" theme="danger">危险</AleCheckbox>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="themeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleCheckbox v-model="disabledChecked" disabled>禁用选中</AleCheckbox>
        <AleCheckbox :model-value="false" disabled>禁用未选中</AleCheckbox>
        <AleCheckbox v-model="disabledChecked" readonly>只读选中</AleCheckbox>
        <AleCheckbox :model-value="false" readonly>只读未选中</AleCheckbox>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 半选状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">半选状态</h2>
      <div class="component-demo-view__demo">
        <AleCheckbox v-model="indeterminateChecked" :indeterminate="isIndeterminate" @change="handleIndeterminateChange">
          全选
        </AleCheckbox>
        <div style="margin-left: 24px; margin-top: 8px;">
          <AleCheckbox v-for="option in cityOptions" :key="option.value" v-model="option.checked" @change="handleCityChange">
            {{ option.label }}
          </AleCheckbox>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="indeterminateCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 复选框组 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">复选框组</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">选中的值: {{ groupValue }}</p>
        <AleCheckboxGroup v-model="groupValue" :options="groupOptions" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="groupCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 全选/反选功能 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">全选/反选功能</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <div style="display: flex; gap: 8px; margin-bottom: 12px;">
          <AleButton type="primary" size="small" @click="handleSelectAll">全选</AleButton>
          <AleButton size="small" @click="handleUnselectAll">取消全选</AleButton>
          <AleButton size="small" @click="handleToggleAll">反选</AleButton>
        </div>
        <AleCheckboxGroup ref="groupRef" v-model="allValue" :options="allOptions" />
        <p style="margin: 12px 0 0 0; color: var(--color-text-secondary);">已选中: {{ allValue.length }} / {{ allOptions.length }}</p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="selectAllCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 垂直排列 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">垂直排列</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <AleCheckboxGroup v-model="verticalValue" direction="vertical" :options="groupOptions" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="verticalCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 限制选中数量 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">限制选中数量</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <p style="margin: 0 0 12px 0; color: var(--color-text-secondary);">最少选1个，最多选3个</p>
        <AleCheckboxGroup v-model="limitedValue" :options="groupOptions" :min="1" :max="3" />
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="limitedCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 交互示例 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">交互示例</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start;">
        <AleCheckbox v-model="agreement" @change="handleAgreementChange">
          我已阅读并同意《用户协议》
        </AleCheckbox>
        <p v-if="agreement" style="color: var(--color-success); margin: 8px 0 0 0;">
          感谢你的同意！
        </p>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="interactiveCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { AleCheckbox, AleCheckboxGroup, AleButton } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础用法
const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(true);

// 尺寸示例
const sizeChecked = ref(true);

// 主题示例
const themeChecked = ref(true);

// 禁用示例
const disabledChecked = ref(true);

// 半选状态示例
const isIndeterminate = ref(false);
const indeterminateChecked = ref(false);
const cityOptions = ref([
  { label: '北京', value: 'beijing', checked: false },
  { label: '上海', value: 'shanghai', checked: false },
  { label: '广州', value: 'guangzhou', checked: false },
  { label: '深圳', value: 'shenzhen', checked: false }
]);

const handleCityChange = () => {
  const checkedCount = cityOptions.value.filter(item => item.checked).length;
  indeterminateChecked.value = checkedCount > 0 && checkedCount < cityOptions.value.length;
  isIndeterminate.value = indeterminateChecked.value || (checkedCount === 0 && indeterminateChecked.value);
};

const handleIndeterminateChange = (value: boolean) => {
  cityOptions.value.forEach(item => {
    item.checked = value;
  });
  isIndeterminate.value = false;
};

// 复选框组示例
const groupValue = ref(['apple', 'banana']);
const groupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];

// 全选/反选示例
const groupRef = ref<InstanceType<typeof AleCheckboxGroup>>();
const allValue = ref<string[]>(['beijing']);
const allOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const handleSelectAll = () => {
  groupRef.value?.selectAll();
};

const handleUnselectAll = () => {
  groupRef.value?.unselectAll();
};

const handleToggleAll = () => {
  groupRef.value?.toggleAll();
};

// 垂直排列示例
const verticalValue = ref(['option1']);

// 限制数量示例
const limitedValue = ref(['apple']);

// 交互示例
const agreement = ref(false);
const handleAgreementChange = (value: boolean) => {
  console.log('协议状态:', value);
};

// 代码示例
const basicCode = `<template>
  <AleCheckbox v-model="checked1">选项一</AleCheckbox>
  <AleCheckbox v-model="checked2">选项二</AleCheckbox>
  <AleCheckbox v-model="checked3" label="选项三" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked1 = ref(true);
const checked2 = ref(false);
const checked3 = ref(true);
<\/script>`;

const sizeCode = `<template>
  <AleCheckbox v-model="checked" size="small">小型</AleCheckbox>
  <AleCheckbox v-model="checked" size="medium">中型</AleCheckbox>
  <AleCheckbox v-model="checked" size="large">大型</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
<\/script>`;

const themeCode = `<template>
  <AleCheckbox v-model="checked" theme="primary">主要</AleCheckbox>
  <AleCheckbox v-model="checked" theme="success">成功</AleCheckbox>
  <AleCheckbox v-model="checked" theme="warning">警告</AleCheckbox>
  <AleCheckbox v-model="checked" theme="danger">危险</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
<\/script>`;

const disabledCode = `<template>
  <AleCheckbox v-model="checked" disabled>禁用选中</AleCheckbox>
  <AleCheckbox :model-value="false" disabled>禁用未选中</AleCheckbox>
  <AleCheckbox v-model="checked" readonly>只读选中</AleCheckbox>
  <AleCheckbox :model-value="false" readonly>只读未选中</AleCheckbox>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checked = ref(true);
<\/script>`;

const indeterminateCode = `<template>
  <AleCheckbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
    全选
  </AleCheckbox>
  <div style="margin-left: 24px;">
    <AleCheckbox v-for="city in cities" :key="city.value" v-model="city.checked" @change="handleCityChange">
      {{ city.label }}
    </AleCheckbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const checkAll = ref(false);
const isIndeterminate = ref(false);
const cities = ref([
  { label: '北京', value: 'beijing', checked: false },
  { label: '上海', value: 'shanghai', checked: false },
  { label: '广州', value: 'guangzhou', checked: false },
  { label: '深圳', value: 'shenzhen', checked: false }
]);

const handleCityChange = () => {
  const checkedCount = cities.value.filter(item => item.checked).length;
  checkAll.value = checkedCount === cities.value.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length;
};

const handleCheckAllChange = (value: boolean) => {
  cities.value.forEach(item => item.checked = value);
  isIndeterminate.value = false;
};
<\/script>`;

const groupCode = `<template>
  <p>选中的值: {{ groupValue }}</p>
  <AleCheckboxGroup v-model="groupValue" :options="groupOptions" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const groupValue = ref(['apple', 'banana']);
const groupOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
<\/script>`;

const selectAllCode = `<template>
  <div>
    <AleButton type="primary" size="small" @click="handleSelectAll">
      全选
    </AleButton>
    <AleButton size="small" @click="handleUnselectAll">
      取消全选
    </AleButton>
    <AleButton size="small" @click="handleToggleAll">
      反选
    </AleButton>
  </div>
  <AleCheckboxGroup ref="groupRef" v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup, AleButton } from 'ale-ui';

const groupRef = ref<InstanceType<typeof AleCheckboxGroup>>();
const value = ref<string[]>(['beijing']);
const options = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '广州', value: 'guangzhou' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' }
];

const handleSelectAll = () => groupRef.value?.selectAll();
const handleUnselectAll = () => groupRef.value?.unselectAll();
const handleToggleAll = () => groupRef.value?.toggleAll();
<\/script>`;

const verticalCode = `<template>
  <AleCheckboxGroup v-model="value" direction="vertical" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const value = ref(['option1']);
const options = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' },
  { label: '选项三', value: 'option3' }
];
<\/script>`;

const limitedCode = `<template>
  <p>最少选1个，最多选3个</p>
  <AleCheckboxGroup v-model="value" :options="options" :min="1" :max="3" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckboxGroup } from 'ale-ui';

const value = ref(['apple']);
const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' }
];
<\/script>`;

const interactiveCode = `<template>
  <AleCheckbox v-model="agreement" @change="handleChange">
    我已阅读并同意《用户协议》
  </AleCheckbox>
  <p v-if="agreement" style="color: var(--color-success);">
    感谢你的同意！
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleCheckbox } from 'ale-ui';

const agreement = ref(false);

const handleChange = (value: boolean) => {
  console.log('协议状态:', value);
};
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

.component-demo-view__code {
  margin-top: 24px;
}
</style>
