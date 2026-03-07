<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Dialog 对话框</h1>
      <p class="component-demo-view__description">
        对话框用于在保留当前页面状态的情况下，告知用户并承载相关操作
      </p>
    </div>

    <!-- 基础用法 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础用法</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="basicVisible = true">打开对话框</AleButton>
        <Dialog
          v-model="basicVisible"
          title="基础对话框"
          @confirm="basicVisible = false"
        >
          <p>这是一个基础的对话框示例，包含标题、内容和底部操作按钮。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 不同尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">不同尺寸</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton size="small" @click="sizeSmallVisible = true">小尺寸</AleButton>
        <AleButton @click="sizeMediumVisible = true">中尺寸</AleButton>
        <AleButton @click="sizeLargeVisible = true">大尺寸</AleButton>
        <AleButton theme="primary" @click="sizeFullscreenVisible = true">全屏</AleButton>

        <Dialog
          v-model="sizeSmallVisible"
          title="小尺寸对话框"
          size="small"
          @confirm="sizeSmallVisible = false"
        >
          <p>这是一个小尺寸的对话框，宽度为 400px。</p>
        </Dialog>

        <Dialog
          v-model="sizeMediumVisible"
          title="中尺寸对话框"
          size="medium"
          @confirm="sizeMediumVisible = false"
        >
          <p>这是一个中尺寸的对话框，宽度为 520px（默认）。</p>
        </Dialog>

        <Dialog
          v-model="sizeLargeVisible"
          title="大尺寸对话框"
          size="large"
          @confirm="sizeLargeVisible = false"
        >
          <p>这是一个大尺寸的对话框，宽度为 720px。</p>
        </Dialog>

        <Dialog
          v-model="sizeFullscreenVisible"
          title="全屏对话框"
          size="fullscreen"
          @confirm="sizeFullscreenVisible = false"
        >
          <p>这是一个全屏对话框，占据大部分屏幕空间。</p>
          <p>适合展示大量内容或复杂的表单。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义位置 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义位置</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="positionCenterVisible = true">居中（默认）</AleButton>
        <AleButton @click="positionTopVisible = true">顶部</AleButton>

        <Dialog
          v-model="positionCenterVisible"
          title="居中对话框"
          position="center"
          @confirm="positionCenterVisible = false"
        >
          <p>对话框在屏幕中央显示（默认位置）。</p>
        </Dialog>

        <Dialog
          v-model="positionTopVisible"
          title="顶部对话框"
          position="top"
          @confirm="positionTopVisible = false"
        >
          <p>对话框在屏幕顶部显示。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="positionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义宽度 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义宽度</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="customWidthVisible = true">600px 宽度</AleButton>
        <AleButton @click="customWidthLargeVisible = true">800px 宽度</AleButton>

        <Dialog
          v-model="customWidthVisible"
          title="自定义宽度 600px"
          width="600px"
          @confirm="customWidthVisible = false"
        >
          <p>通过 width 属性可以自定义对话框的宽度。</p>
        </Dialog>

        <Dialog
          v-model="customWidthLargeVisible"
          title="自定义宽度 800px"
          :width="800"
          @confirm="customWidthLargeVisible = false"
        >
          <p>width 属性可以是字符串（带单位）或数字（自动转为像素）。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customWidthCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 隐藏遮罩层 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">隐藏遮罩层</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="noMaskVisible = true">无遮罩层</AleButton>
        <Dialog
          v-model="noMaskVisible"
          title="无遮罩层"
          :show-mask="false"
          @confirm="noMaskVisible = false"
        >
          <p>设置 show-mask="false" 可以隐藏背景遮罩层。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="noMaskCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁止遮罩层关闭 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁止遮罩层关闭</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="maskNotClosableVisible = true">点击遮罩不关闭</AleButton>
        <Dialog
          v-model="maskNotClosableVisible"
          title="禁止遮罩层关闭"
          :mask-closable="false"
          @confirm="maskNotClosableVisible = false"
        >
          <p>设置 mask-closable="false" 后，点击遮罩层不会关闭对话框。</p>
          <p>只能通过点击关闭按钮或确认/取消按钮来关闭。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="maskNotClosableCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 隐藏关闭按钮 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">隐藏关闭按钮</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="noCloseVisible = true">无关闭按钮</AleButton>
        <Dialog
          v-model="noCloseVisible"
          title="无关闭按钮"
          :show-close="false"
          @confirm="noCloseVisible = false"
        >
          <p>设置 show-close="false" 可以隐藏右上角的关闭按钮。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="noCloseCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 隐藏底部按钮 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">隐藏底部按钮</h2>
      <div class="component-demo-view__demo" style="gap: 16px;">
        <AleButton @click="noFooterVisible = true">无底部栏</AleButton>
        <AleButton @click="noCancelVisible = true">无取消按钮</AleButton>
        <AleButton @click="noConfirmVisible = true">无确认按钮</AleButton>

        <Dialog
          v-model="noFooterVisible"
          title="无底部栏"
          :show-footer="false"
        >
          <p>设置 show-footer="false" 可以完全隐藏底部操作栏。</p>
          <p style="text-align: center; margin-top: 20px;">
            <AleButton size="small" @click="noFooterVisible = false">关闭</AleButton>
          </p>
        </Dialog>

        <Dialog
          v-model="noCancelVisible"
          title="无取消按钮"
          :show-cancel="false"
          @confirm="noCancelVisible = false"
        >
          <p>设置 show-cancel="false" 可以隐藏取消按钮。</p>
        </Dialog>

        <Dialog
          v-model="noConfirmVisible"
          title="无确认按钮"
          :show-confirm="false"
          @cancel="noConfirmVisible = false"
        >
          <p>设置 show-confirm="false" 可以隐藏确认按钮。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="footerCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义按钮文本 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义按钮文本</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="customTextVisible = true">自定义按钮文本</AleButton>
        <Dialog
          v-model="customTextVisible"
          title="保存更改"
          confirm-text="保存"
          cancel-text="不保存"
          @confirm="customTextVisible = false"
          @cancel="customTextVisible = false"
        >
          <p>是否要保存对当前文档的更改？</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customTextCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 加载状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">加载状态</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="loadingVisible = true">显示加载状态</AleButton>
        <Dialog
          v-model="loadingVisible"
          title="提交数据"
          confirm-text="提交"
          :confirm-loading="isSubmitting"
          @confirm="handleSubmit"
        >
          <p>点击提交按钮会模拟异步请求，确认按钮会显示加载状态。</p>
          <p v-if="submitMessage" style="color: var(--color-success); margin-top: 12px;">
            {{ submitMessage }}
          </p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="loadingCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义内容 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义内容</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="customContentVisible = true">表单对话框</AleButton>
        <Dialog
          v-model="customContentVisible"
          title="编辑用户信息"
          size="medium"
          confirm-text="保存"
          @confirm="handleSaveUser"
          @cancel="customContentVisible = false"
        >
          <div class="form-content">
            <div class="form-row">
              <label class="form-label">用户名</label>
              <input v-model="userForm.name" class="form-input" placeholder="请输入用户名">
            </div>
            <div class="form-row">
              <label class="form-label">邮箱</label>
              <input v-model="userForm.email" class="form-input" placeholder="请输入邮箱">
            </div>
            <div class="form-row">
              <label class="form-label">角色</label>
              <select v-model="userForm.role" class="form-select">
                <option value="admin">管理员</option>
                <option value="user">普通用户</option>
                <option value="guest">访客</option>
              </select>
            </div>
            <div class="form-row">
              <label class="form-label">
                <input v-model="userForm.enabled" type="checkbox">
                启用账户
              </label>
            </div>
          </div>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customContentCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义标题 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义标题</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="customTitleVisible = true">自定义标题</AleButton>
        <Dialog
          v-model="customTitleVisible"
          @confirm="customTitleVisible = false"
        >
          <template #title>
            <div class="custom-title">
              <span class="title-icon">⚠️</span>
              <span class="title-text">警告提示</span>
              <span class="title-badge">重要</span>
            </div>
          </template>
          <p>使用 title 插槽可以自定义标题区域的内容。</p>
          <p>您可以在标题中添加图标、徽章等元素。</p>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customTitleCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义底部 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义底部</h2>
      <div class="component-demo-view__demo">
        <AleButton @click="customFooterVisible = true">自定义底部</AleButton>
        <Dialog
          v-model="customFooterVisible"
          title="确认操作"
        >
          <p>使用 footer 插槽可以完全自定义底部操作栏。</p>
          <template #footer>
            <div class="custom-footer">
              <AleButton size="small" @click="customFooterVisible = false">稍后处理</AleButton>
              <div class="footer-right">
                <AleButton size="small" @click="customFooterVisible = false">拒绝</AleButton>
                <AleButton theme="primary" size="small" @click="customFooterVisible = false">同意</AleButton>
              </div>
            </div>
          </template>
        </Dialog>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customFooterCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 事件监听 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">事件监听</h2>
      <div class="component-demo-view__demo" style="flex-direction: column; align-items: flex-start; gap: 16px;">
        <AleButton @click="eventVisible = true">打开对话框</AleButton>
        <Dialog
          v-model="eventVisible"
          title="事件测试"
          @open="handleEvent('open')"
          @opened="handleEvent('opened')"
          @close="handleEvent('close')"
          @closed="handleEvent('closed')"
          @confirm="handleEvent('confirm'); eventVisible = false"
          @cancel="handleEvent('cancel'); eventVisible = false"
        >
          <p>打开控制台或查看下方事件日志，可以看到对话框触发的各种事件。</p>
        </Dialog>
        <div class="event-log">
          <p>事件记录：</p>
          <ul>
            <li v-for="(log, index) in eventLogs" :key="index" class="event-log-item">
              {{ log }}
            </li>
          </ul>
          <AleButton v-if="eventLogs.length > 0" size="small" @click="eventLogs = []">
            清空记录
          </AleButton>
        </div>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="eventCode" language="vue" title="示例代码" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AleButton, AleDialog as Dialog } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';

// 基础用法
const basicVisible = ref(false);

// 不同尺寸
const sizeSmallVisible = ref(false);
const sizeMediumVisible = ref(false);
const sizeLargeVisible = ref(false);
const sizeFullscreenVisible = ref(false);

// 不同位置
const positionCenterVisible = ref(false);
const positionTopVisible = ref(false);

// 自定义宽度
const customWidthVisible = ref(false);
const customWidthLargeVisible = ref(false);

// 遮罩层控制
const noMaskVisible = ref(false);
const maskNotClosableVisible = ref(false);

// 关闭按钮控制
const noCloseVisible = ref(false);

// 底部按钮控制
const noFooterVisible = ref(false);
const noCancelVisible = ref(false);
const noConfirmVisible = ref(false);

// 自定义按钮文本
const customTextVisible = ref(false);

// 加载状态
const loadingVisible = ref(false);
const isSubmitting = ref(false);
const submitMessage = ref('');

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = '';

  // 模拟异步请求
  await new Promise(resolve => setTimeout(resolve, 1500));

  isSubmitting.value = false;
  submitMessage.value = '提交成功！';

  setTimeout(() => {
    loadingVisible.value = false;
    submitMessage.value = '';
  }, 1500);
};

// 自定义内容
const customContentVisible = ref(false);
const userForm = reactive({
  name: '',
  email: '',
  role: 'user',
  enabled: true
});

const handleSaveUser = () => {
  console.log('保存用户:', userForm);
  customContentVisible.value = false;
};

// 自定义标题
const customTitleVisible = ref(false);

// 自定义底部
const customFooterVisible = ref(false);

// 事件监听
const eventVisible = ref(false);
const eventLogs = ref<string[]>([]);

const handleEvent = (eventName: string) => {
  const time = new Date().toLocaleTimeString();
  eventLogs.value.unshift(`[${time}] ${eventName} 事件触发`);
};

// 代码示例
const basicCode = `<template>
  <AleButton @click="visible = true">打开对话框</AleButton>
  <Dialog
    v-model="visible"
    title="基础对话框"
    @confirm="visible = false"
  >
    <p>这是一个基础的对话框示例</p>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AleButton } from 'ale-ui';

const visible = ref(false);
<\/script>`;

const sizeCode = `<template>
  <AleButton @click="smallVisible = true">小尺寸</AleButton>
  <AleButton @click="largeVisible = true">大尺寸</AleButton>

  <Dialog v-model="smallVisible" title="小尺寸" size="small">
    <p>小尺寸对话框，宽度 400px</p>
  </Dialog>

  <Dialog v-model="largeVisible" title="大尺寸" size="large">
    <p>大尺寸对话框，宽度 720px</p>
  </Dialog>
</template>`;

const positionCode = `<template>
  <Dialog v-model="visible" title="顶部位置" position="top">
    <p>对话框显示在屏幕顶部</p>
  </Dialog>
</template>`;

const customWidthCode = `<template>
  <Dialog v-model="visible" title="自定义宽度" width="600px">
    <p>自定义宽度 600px</p>
  </Dialog>

  <Dialog v-model="visible2" title="数字宽度" :width="800">
    <p>数字宽度 800px</p>
  </Dialog>
</template>`;

const noMaskCode = `<template>
  <Dialog v-model="visible" title="无遮罩层" :show-mask="false">
    <p>隐藏背景遮罩层</p>
  </Dialog>
</template>`;

const maskNotClosableCode = `<template>
  <Dialog v-model="visible" title="不可点击关闭" :mask-closable="false">
    <p>点击遮罩层不会关闭对话框</p>
  </Dialog>
</template>`;

const noCloseCode = `<template>
  <Dialog v-model="visible" title="无关闭按钮" :show-close="false">
    <p>隐藏右上角的关闭按钮</p>
  </Dialog>
</template>`;

const footerCode = `<template>
  <!-- 无底部栏 -->
  <Dialog v-model="visible1" title="无底部栏" :show-footer="false">
    <p>完全隐藏底部操作栏</p>
  </Dialog>

  <!-- 无取消按钮 -->
  <Dialog v-model="visible2" title="无取消按钮" :show-cancel="false">
    <p>只显示确认按钮</p>
  </Dialog>

  <!-- 无确认按钮 -->
  <Dialog v-model="visible3" title="无确认按钮" :show-confirm="false">
    <p>只显示取消按钮</p>
  </Dialog>
</template>`;

const customTextCode = `<template>
  <Dialog
    v-model="visible"
    title="保存更改"
    confirm-text="保存"
    cancel-text="不保存"
  >
    <p>是否要保存更改？</p>
  </Dialog>
</template>`;

const loadingCode = `<template>
  <Dialog
    v-model="visible"
    title="提交数据"
    confirm-text="提交"
    :confirm-loading="isLoading"
    @confirm="handleSubmit"
  >
    <p>点击提交按钮</p>
  </Dialog>
</template>

<script setup lang="ts">
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  await new Promise(resolve => setTimeout(resolve, 1500));
  isLoading.value = false;
  visible.value = false;
};
<\/script>`;

const customContentCode = `<template>
  <Dialog v-model="visible" title="编辑信息" confirm-text="保存">
    <div class="form-content">
      <div class="form-row">
        <label>用户名</label>
        <input v-model="form.name" placeholder="请输入用户名">
      </div>
      <div class="form-row">
        <label>邮箱</label>
        <input v-model="form.email" placeholder="请输入邮箱">
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: ''
});
<\/script>`;

const customTitleCode = `<template>
  <Dialog v-model="visible">
    <template #title>
      <div class="custom-title">
        <span>⚠️</span>
        <span>警告提示</span>
        <span class="badge">重要</span>
      </div>
    </template>
    <p>自定义标题内容</p>
  </Dialog>
</template>`;

const customFooterCode = `<template>
  <Dialog v-model="visible" title="确认操作">
    <p>自定义底部操作栏</p>
    <template #footer>
      <div class="custom-footer">
        <AleButton @click="visible = false">稍后处理</AleButton>
        <div>
          <AleButton @click="visible = false">拒绝</AleButton>
          <AleButton theme="primary" @click="visible = false">同意</AleButton>
        </div>
      </div>
    </template>
  </Dialog>
</template>`;

const eventCode = `<template>
  <Dialog
    v-model="visible"
    @open="handleEvent('open')"
    @opened="handleEvent('opened')"
    @close="handleEvent('close')"
    @closed="handleEvent('closed')"
    @confirm="handleEvent('confirm')"
    @cancel="handleEvent('cancel')"
  >
    <p>事件测试</p>
  </Dialog>
</template>

<script setup lang="ts">
const handleEvent = (name: string) => {
  console.log(name + ' 事件触发');
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

/* 表单样式 */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.form-input,
.form-select {
  padding: 8px 12px;
  border: 1px solid var(--color-border-base);
  border-radius: var(--radius-md);
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--color-primary);
}

/* 自定义标题 */
.custom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
}

.title-text {
  font-size: 18px;
  font-weight: 600;
}

.title-badge {
  padding: 2px 8px;
  background-color: var(--color-danger);
  color: white;
  font-size: 12px;
  border-radius: var(--radius-sm);
}

/* 自定义底部 */
.custom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.footer-right {
  display: flex;
  gap: 12px;
}

/* 事件日志 */
.event-log {
  width: 100%;
  max-width: 400px;
}

.event-log p {
  margin: 0 0 8px 0;
  font-weight: 500;
  color: var(--color-text-primary);
}

.event-log ul {
  margin: 0 0 12px 0;
  padding: 0;
  list-style: none;
  max-height: 150px;
  overflow-y: auto;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  padding: 12px;
}

.event-log-item {
  padding: 4px 0;
  font-size: 13px;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border-light);
}

.event-log-item:last-child {
  border-bottom: none;
}
</style>
