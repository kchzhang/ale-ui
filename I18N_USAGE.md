# Ale UI 国际化使用示例

## 全局配置使用

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import AleUI from 'ale-ui';
// 导入需要的语言包
import zhCN from 'ale-ui/locale/zh-CN';
import zhHK from 'ale-ui/locale/zh-HK';
import enUS from 'ale-ui/locale/en-US';

const app = createApp(App);

// 安装组件库并配置默认语言
app.use(AleUI, {
  locale: zhCN // 默认使用简体中文
});

app.mount('#app');
```

## 动态切换语言

```vue
<template>
  <div>
    <h1>语言切换示例</h1>
    <div class="lang-buttons">
      <button @click="switchLang('zh-CN')">简体中文</button>
      <button @click="switchLang('zh-TW')">繁體中文（台灣）</button>
      <button @click="switchLang('zh-HK')">繁體中文（香港）</button>
      <button @click="switchLang('en-US')">English</button>
    </div>

    <!-- 组件会自动根据当前语言显示对应的文本 -->
    <ale-button type="primary">{{ t('ale.button.confirm') }}</ale-button>
    <ale-button>{{ t('ale.button.cancel') }}</ale-button>

    <ale-date-picker />
    <ale-upload :limit="5" />
  </div>
</template>

<script setup lang="ts">
import { useLocale, zhCN, zhTW, zhHK, enUS } from 'ale-ui';

const { t, locale } = useLocale();

const switchLang = (lang: 'zh-CN' | 'zh-TW' | 'zh-HK' | 'en-US') => {
  switch (lang) {
    case 'zh-CN':
      locale.value = zhCN;
      break;
    case 'zh-TW':
      locale.value = zhTW;
      break;
    case 'zh-HK':
      locale.value = zhHK;
      break;
    case 'en-US':
      locale.value = enUS;
      break;
  }
};
</script>
```

## 在组件中使用国际化

以 DatePicker 组件为例：

```vue
<template>
  <div class="ale-date-picker">
    <input
      :placeholder="t('datePicker.placeholder')"
      v-model="inputValue"
    />

    <div class="shortcuts">
      <button @click="selectToday">
        {{ t('datePicker.today') }}
      </button>
      <button @click="selectThisWeek">
        {{ t('datePicker.thisWeek') }}
      </button>
      <button @click="selectThisMonth">
        {{ t('datePicker.thisMonth') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from 'ale-ui';

const { t } = useLocale();

// 组件逻辑...
</script>
```

## 参数插值使用

```typescript
const { t } = useLocale();

// 单个参数
const totalText = t('pagination.total', { total: 100 });
// 输出：共 100 条（zh-CN）/ Total 100 items（en-US）

// 上传组件限制提示
const limitTip = t('upload.exceedLimit', { limit: 5 });
// 输出：超出文件数量限制，最多可上传 5 个文件（zh-CN）
```

## 自定义语言包

```typescript
// 自定义语言包
import type { AleUILocale } from 'ale-ui';
import { merge } from 'lodash-es';
import zhCN from 'ale-ui/locale/zh-CN';

// 合并自定义翻译到默认语言包
const customLocale: AleUILocale = merge({}, zhCN, {
  ale: {
    button: {
      confirm: '确定', // 覆盖默认的"确认"
      save: '储存' // 覆盖默认的"保存"
    }
  }
});

// 使用自定义语言包
app.use(AleUI, {
  locale: customLocale
});
```
