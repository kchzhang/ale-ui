<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Input 输入框</h1>
      <p class="component-demo-view__description">
        通过鼠标或键盘输入字符
      </p>
    </div>

    <!-- 基础输入框 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础输入框</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="input1" placeholder="请输入内容" />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ input1 }}
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同类型 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同类型</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="inputText" type="text" placeholder="文本输入" />
        <AleInput v-model="inputPassword" type="password" placeholder="密码输入" show-password autocomplete="current-password" />
        <AleInput v-model="inputEmail" type="email" placeholder="邮箱输入" />
        <AleInput v-model="inputNumber" type="number" placeholder="数字输入" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="typeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="inputSmall" size="small" placeholder="小型输入框" />
        <AleInput v-model="inputMedium" size="medium" placeholder="中型输入框" />
        <AleInput v-model="inputLarge" size="large" placeholder="大型输入框" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">可清空</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="inputClearable" clearable placeholder="输入内容后可清空" />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ inputClearable }}
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="clearableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="inputDisabled" disabled placeholder="禁用状态" />
        <AleInput v-model="inputReadonly" readonly placeholder="只读状态" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 字数限制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">字数限制</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="inputLimit" :maxlength="10" show-word-limit placeholder="最多输入10个字符" />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ inputLimit }}（{{ inputLimit?.length || 0 }}/10）
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="limitCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 事件监听 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">事件监听</h2>
      <div class="component-demo-view__demo">
        <AleInput
          v-model="inputEvent"
          placeholder="输入内容触发事件"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <div class="component-demo-view__code">
        <div>输入内容：{{ inputEvent }}</div>
        <div>最后事件：{{ lastEvent }}</div>
        <div>事件次数：{{ eventCount }}</div>
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="eventCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 密码切换 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">密码切换</h2>
      <div class="component-demo-view__demo">
        <AleInput
          v-model="inputPasswordToggle"
          type="password"
          placeholder="点击图标切换显示密码"
          show-password
          autocomplete="current-password"
        />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="passwordCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textarea1" type="textarea" placeholder="请输入内容" />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ textarea1 }}
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域自定义行数 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义行数</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textarea2" type="textarea" :rows="3" placeholder="3行文本域" />
        <AleInput v-model="textarea3" type="textarea" :rows="5" placeholder="5行文本域" />
        <AleInput v-model="textarea4" type="textarea" :rows="8" placeholder="8行文本域" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaRowsCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域尺寸</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textareaSmall" type="textarea" size="small" placeholder="小型文本域" />
        <AleInput v-model="textareaMedium" type="textarea" size="medium" placeholder="中型文本域" />
        <AleInput v-model="textareaLarge" type="textarea" size="large" placeholder="大型文本域" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaSizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域调整大小 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">调整大小</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textareaResizeNone" type="textarea" :rows="4" resize="none" placeholder="禁止调整大小" />
        <AleInput v-model="textareaResizeVertical" type="textarea" :rows="4" resize="vertical" placeholder="垂直调整" />
        <AleInput v-model="textareaResizeHorizontal" type="textarea" :rows="4" resize="horizontal" placeholder="水平调整" />
        <AleInput v-model="textareaResizeBoth" type="textarea" :rows="4" resize="both" placeholder="双向调整" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaResizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域可清空 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域可清空</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textareaClearable" type="textarea" clearable placeholder="输入内容后可清空" />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ textareaClearable }}
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaClearableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textareaDisabled" type="textarea" disabled placeholder="禁用状态" />
        <AleInput v-model="textareaReadonly" type="textarea" readonly placeholder="只读状态" />
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaDisabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域字数限制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域字数限制</h2>
      <div class="component-demo-view__demo">
        <AleInput v-model="textareaLimit" type="textarea" :maxlength="100" placeholder="最多输入100个字符" />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ textareaLimit }}（{{ textareaLimit?.length || 0 }}/100）
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaLimitCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域高度自适应 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域高度自适应</h2>
      <div class="component-demo-view__demo">
        <AleInput
          v-model="textareaAutoResize"
          type="textarea"
          :autoResize="true"
          placeholder="请输入内容，高度会自动调整"
        />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ textareaAutoResize }}
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaAutoResizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 文本域高度限制 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">文本域高度限制</h2>
      <div class="component-demo-view__demo">
        <AleInput
          v-model="textareaHeightLimit"
          type="textarea"
          :autoResize="true"
          :minHeight="60"
          :maxHeight="200"
          placeholder="高度在 60px 到 200px 之间自适应"
        />
      </div>
      <div class="component-demo-view__code">
        输入内容：{{ textareaHeightLimit }}
      </div>
      <div class="component-demo-view__code-block">
        <CodeBlock :code="textareaHeightLimitCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

const input1 = ref('');
const inputText = ref('');
const inputPassword = ref('');
const inputEmail = ref('');
const inputNumber = ref('');
const inputSmall = ref('');
const inputMedium = ref('');
const inputLarge = ref('');
const inputClearable = ref('');
const inputDisabled = ref('禁用内容');
const inputReadonly = ref('只读内容');
const inputLimit = ref('');
const inputEvent = ref('');
const inputPasswordToggle = ref('');
const textarea1 = ref('');
const textarea2 = ref('');
const textarea3 = ref('');
const textarea4 = ref('');
const textareaSmall = ref('');
const textareaMedium = ref('');
const textareaLarge = ref('');
const textareaResizeNone = ref('');
const textareaResizeVertical = ref('');
const textareaResizeHorizontal = ref('');
const textareaResizeBoth = ref('');
const textareaClearable = ref('');
const textareaDisabled = ref('禁用的文本域内容');
const textareaReadonly = ref('只读的文本域内容');
const textareaLimit = ref('');
const textareaAutoResize = ref('');
const textareaHeightLimit = ref('');

const lastEvent = ref('');
const eventCount = ref(0);

const handleChange = (value: string) => {
  lastEvent.value = `change - ${value}`;
  eventCount.value++;
};

const handleFocus = (_event: FocusEvent) => {
  lastEvent.value = 'focus';
  eventCount.value++;
};

const handleBlur = (_event: FocusEvent) => {
  lastEvent.value = 'blur';
  eventCount.value++;
};

// 代码示例
const basicCode = `<template>
  <AleInput v-model="input1" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const input1 = ref('');
<\/script>`;

const typeCode = `<template>
  <AleInput v-model="inputText" type="text" placeholder="文本输入" />
  <AleInput v-model="inputPassword" type="password" placeholder="密码输入" show-password autocomplete="current-password" />
  <AleInput v-model="inputEmail" type="email" placeholder="邮箱输入" />
  <AleInput v-model="inputNumber" type="number" placeholder="数字输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputText = ref('');
const inputPassword = ref('');
const inputEmail = ref('');
const inputNumber = ref('');
<\/script>`;

const sizeCode = `<template>
  <AleInput v-model="inputSmall" size="small" placeholder="小型输入框" />
  <AleInput v-model="inputMedium" size="medium" placeholder="中型输入框" />
  <AleInput v-model="inputLarge" size="large" placeholder="大型输入框" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputSmall = ref('');
const inputMedium = ref('');
const inputLarge = ref('');
<\/script>`;

const clearableCode = `<template>
  <AleInput v-model="inputClearable" clearable placeholder="输入内容后可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputClearable = ref('');
<\/script>`;

const disabledCode = `<template>
  <AleInput v-model="inputDisabled" disabled placeholder="禁用状态" />
  <AleInput v-model="inputReadonly" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputDisabled = ref('禁用内容');
const inputReadonly = ref('只读内容');
<\/script>`;

const limitCode = `<template>
  <AleInput v-model="inputLimit" :maxlength="10" show-word-limit placeholder="最多输入10个字符" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputLimit = ref('');
<\/script>`;

const eventCode = `<template>
  <AleInput
    v-model="inputEvent"
    placeholder="输入内容触发事件"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputEvent = ref('');
const lastEvent = ref('');
const eventCount = ref(0);

const handleChange = (value: string) => {
  lastEvent.value = \`change - \${value}\`;
  eventCount.value++;
};

const handleFocus = (_event: FocusEvent) => {
  lastEvent.value = 'focus';
  eventCount.value++;
};

const handleBlur = (_event: FocusEvent) => {
  lastEvent.value = 'blur';
  eventCount.value++;
};
<\/script>`;

const passwordCode = `<template>
  <AleInput
    v-model="inputPasswordToggle"
    type="password"
    placeholder="点击图标切换显示密码"
    show-password
    autocomplete="current-password"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const inputPasswordToggle = ref('');
<\/script>`;

const textareaCode = `<template>
  <AleInput v-model="textarea1" type="textarea" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textarea1 = ref('');
<\/script>`;

const textareaRowsCode = `<template>
  <AleInput v-model="textarea2" type="textarea" :rows="3" placeholder="3行文本域" />
  <AleInput v-model="textarea3" type="textarea" :rows="5" placeholder="5行文本域" />
  <AleInput v-model="textarea4" type="textarea" :rows="8" placeholder="8行文本域" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textarea2 = ref('');
const textarea3 = ref('');
const textarea4 = ref('');
<\/script>`;

const textareaSizeCode = `<template>
  <AleInput v-model="textareaSmall" type="textarea" size="small" placeholder="小型文本域" />
  <AleInput v-model="textareaMedium" type="textarea" size="medium" placeholder="中型文本域" />
  <AleInput v-model="textareaLarge" type="textarea" size="large" placeholder="大型文本域" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaSmall = ref('');
const textareaMedium = ref('');
const textareaLarge = ref('');
<\/script>`;

const textareaResizeCode = `<template>
  <AleInput v-model="textareaResizeNone" type="textarea" :rows="4" resize="none" placeholder="禁止调整大小" />
  <AleInput v-model="textareaResizeVertical" type="textarea" :rows="4" resize="vertical" placeholder="垂直调整" />
  <AleInput v-model="textareaResizeHorizontal" type="textarea" :rows="4" resize="horizontal" placeholder="水平调整" />
  <AleInput v-model="textareaResizeBoth" type="textarea" :rows="4" resize="both" placeholder="双向调整" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaResizeNone = ref('');
const textareaResizeVertical = ref('');
const textareaResizeHorizontal = ref('');
const textareaResizeBoth = ref('');
<\/script>`;

const textareaClearableCode = `<template>
  <AleInput v-model="textareaClearable" type="textarea" clearable placeholder="输入内容后可清空" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaClearable = ref('');
<\/script>`;

const textareaDisabledCode = `<template>
  <AleInput v-model="textareaDisabled" type="textarea" disabled placeholder="禁用状态" />
  <AleInput v-model="textareaReadonly" type="textarea" readonly placeholder="只读状态" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaDisabled = ref('禁用的文本域内容');
const textareaReadonly = ref('只读的文本域内容');
<\/script>`;

const textareaLimitCode = `<template>
  <AleInput v-model="textareaLimit" type="textarea" :maxlength="100" placeholder="最多输入100个字符" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaLimit = ref('');
<\/script>`;

const textareaAutoResizeCode = `<template>
  <AleInput
    v-model="textareaAutoResize"
    type="textarea"
    :autoResize="true"
    placeholder="请输入内容，高度会自动调整"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaAutoResize = ref('');
<\/script>`;

const textareaHeightLimitCode = `<template>
  <AleInput
    v-model="textareaHeightLimit"
    type="textarea"
    :autoResize="true"
    :minHeight="60"
    :maxHeight="200"
    placeholder="高度在 60px 到 200px 之间自适应"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleInput } from 'ale-ui';

const textareaHeightLimit = ref('');
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

.component-demo-view__demo > * {
  flex: 1;
  min-width: 200px;
}

.component-demo-view__code {
  margin-top: 16px;
  padding: 16px;
  background: var(--color-gray-50);
  border-radius: var(--radius-base);
  font-family: var(--font-family-code);
  font-size: var(--font-size-sm);
  color: var(--color-text-regular);
  line-height: var(--line-height-base);
}

.component-demo-view__code div {
  margin: 4px 0;
}

.component-demo-view__code-block {
  margin-top: 24px;
}
</style>
