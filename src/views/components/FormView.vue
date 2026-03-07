<template>
  <div class="component-demo-view">
    <div class="component-demo-view__header">
      <h1 class="component-demo-view__title">Form 表单</h1>
      <p class="component-demo-view__description">
        具有数据收集、校验和提交功能的表单组件，包含表单域、表单布局、表单验证等功能。
      </p>
    </div>

    <!-- 基础表单 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">基础表单</h2>
      <div class="component-demo-view__demo">
        <AleForm :model="basicForm" @submit="handleBasicSubmit">
          <AleFormItem name="username" label="用户名" :rules="[{ required: true, message: '请输入用户名' }]">
            <AleInput v-model="basicForm.username" placeholder="请输入用户名" autocomplete="username" />
          </AleFormItem>
          <AleFormItem name="email" label="邮箱" :rules="emailRules">
            <AleInput v-model="basicForm.email" placeholder="请输入邮箱" autocomplete="email" />
          </AleFormItem>
          <AleFormItem name="password" label="密码" :rules="passwordRules">
            <AleInput v-model="basicForm.password" type="password" placeholder="请输入密码" autocomplete="current-password" />
          </AleFormItem>
          <AleFormItem>
            <div class="form-actions">
              <AleButton type="primary" native-type="submit">提交</AleButton>
              <AleButton @click="resetBasicForm">重置</AleButton>
              <AleButton type="success" @click="fillExampleData">填充示例数据</AleButton>
              <AleButton type="warning" @click="validateBasicForm">单独校验</AleButton>
            </div>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="basicCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 表单布局 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">表单布局</h2>
      <div class="form-layout-tabs">
        <button
          v-for="layout in layouts"
          :key="layout.value"
          :class="['layout-tab', { active: currentLayout === layout.value }]"
          @click="currentLayout = layout.value"
        >
          {{ layout.label }}
        </button>
      </div>
      <div class="component-demo-view__demo">
        <AleForm :model="layoutForm" :layout="currentLayout" @submit="handleLayoutSubmit">
          <AleFormItem name="name" label="姓名" :rules="[{ required: true }]">
            <AleInput v-model="layoutForm.name" placeholder="请输入姓名" />
          </AleFormItem>
          <AleFormItem name="phone" label="手机号" :rules="[{ required: true }]">
            <AleInput v-model="layoutForm.phone" placeholder="请输入手机号" />
          </AleFormItem>
          <AleFormItem name="address" label="地址">
            <AleInput v-model="layoutForm.address" placeholder="请输入地址" />
          </AleFormItem>
          <AleFormItem>
            <AleButton type="primary" native-type="submit">提交</AleButton>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="layoutCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 标签位置 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">标签位置</h2>
      <div class="form-layout-tabs">
        <button
          v-for="pos in labelPositions"
          :key="pos.value"
          :class="['layout-tab', { active: currentLabelPosition === pos.value }]"
          @click="currentLabelPosition = pos.value"
        >
          {{ pos.label }}
        </button>
      </div>
      <div class="component-demo-view__demo">
        <AleForm
          :model="positionForm"
          layout="horizontal"
          :label-position="currentLabelPosition"
          label-width="100px"
          @submit="handlePositionSubmit"
        >
          <AleFormItem name="nickname" label="昵称" :rules="[{ required: true }]">
            <AleInput v-model="positionForm.nickname" placeholder="请输入昵称" />
          </AleFormItem>
          <AleFormItem name="bio" label="个人简介">
            <AleInput v-model="positionForm.bio" type="textarea" :rows="3" placeholder="请输入个人简介" />
          </AleFormItem>
          <AleFormItem>
            <AleButton type="primary" native-type="submit">提交</AleButton>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="positionCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 表单尺寸 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">表单尺寸</h2>
      <div class="form-layout-tabs">
        <button
          v-for="size in sizes"
          :key="size.value"
          :class="['layout-tab', { active: currentSize === size.value }]"
          @click="currentSize = size.value"
        >
          {{ size.label }}
        </button>
      </div>
      <div class="component-demo-view__demo">
        <AleForm :model="sizeForm" :size="currentSize" @submit="handleSizeSubmit">
          <AleFormItem name="title" label="标题" :rules="[{ required: true }]">
            <AleInput v-model="sizeForm.title" placeholder="请输入标题" />
          </AleFormItem>
          <AleFormItem name="description" label="描述">
            <AleInput v-model="sizeForm.description" placeholder="请输入描述" />
          </AleFormItem>
          <AleFormItem>
            <AleButton type="primary" native-type="submit" :size="currentSize">提交</AleButton>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="sizeCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 验证规则 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">表单验证</h2>
      <div class="component-demo-view__demo">
        <AleForm ref="validateFormRef" :model="validateForm" @submit="handleValidateSubmit" @validate-fail="handleValidateFail">
          <AleFormItem
            name="username"
            label="用户名"
            :rules="[
              { required: true, message: '用户名不能为空' },
              { minLength: 3, message: '用户名至少3个字符' },
              { maxLength: 20, message: '用户名最多20个字符' }
            ]"
          >
            <AleInput v-model="validateForm.username" placeholder="3-20个字符" />
          </AleFormItem>
          <AleFormItem
            name="email"
            label="邮箱"
            :rules="[
              { required: true, message: '邮箱不能为空' },
              { pattern: /^[^\s@]+@[^\s@]+$/, message: '请输入正确的邮箱格式' }
            ]"
          >
            <AleInput v-model="validateForm.email" placeholder="example@email.com" />
          </AleFormItem>
          <AleFormItem
            name="age"
            label="年龄"
            :rules="[
              { required: true, message: '年龄不能为空' },
              { min: 18, message: '年龄不能小于18岁' },
              { max: 120, message: '年龄不能大于120岁' }
            ]"
          >
            <AleInput v-model="validateForm.age" type="number" placeholder="18-120" />
          </AleFormItem>
          <AleFormItem
            name="phone"
            label="手机号"
            :rules="[
              { required: true, message: '手机号不能为空' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
            ]"
          >
            <AleInput v-model="validateForm.phone" placeholder="11位手机号" />
          </AleFormItem>
          <AleFormItem>
            <div class="form-actions">
              <AleButton type="primary" native-type="submit">提交</AleButton>
              <AleButton @click="validateFormRef?.validate()">单独验证</AleButton>
              <AleButton @click="validateFormRef?.resetFields()">重置</AleButton>
              <AleButton @click="validateFormRef?.clearValidate()">清除验证</AleButton>
            </div>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="validateCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 自定义验证 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">自定义验证</h2>
      <div class="component-demo-view__demo">
        <AleForm :model="customForm" @submit="handleCustomSubmit">
          <AleFormItem
            name="username"
            label="用户名"
            :rules="[
              { required: true, message: '请输入用户名' },
              { minLength: 3, message: '用户名至少3位' }
            ]"
          >
            <AleInput v-model="customForm.username" placeholder="请输入用户名" autocomplete="username" />
          </AleFormItem>
          <AleFormItem
            name="password"
            label="密码"
            :rules="[
              { required: true, message: '请输入密码' },
              { minLength: 6, message: '密码至少6位' },
              {
                validator: validatePasswordStrength,
                message: '密码必须包含字母和数字'
              }
            ]"
          >
            <AleInput v-model="customForm.password" type="password" placeholder="请输入密码" autocomplete="new-password" />
          </AleFormItem>
          <AleFormItem
            name="confirmPassword"
            label="确认密码"
            :rules="[
              { required: true, message: '请确认密码' },
              { validator: validateConfirmPassword, message: '两次输入的密码不一致' }
            ]"
          >
            <AleInput v-model="customForm.confirmPassword" type="password" placeholder="请再次输入密码" autocomplete="new-password" />
          </AleFormItem>
          <AleFormItem>
            <AleButton type="primary" native-type="submit">提交</AleButton>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="customCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 禁用状态 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">禁用状态</h2>
      <div class="component-demo-view__demo">
        <AleForm :model="disabledForm" disabled>
          <AleFormItem name="name" label="姓名">
            <AleInput v-model="disabledForm.name" />
          </AleFormItem>
          <AleFormItem name="email" label="邮箱">
            <AleInput v-model="disabledForm.email" />
          </AleFormItem>
          <AleFormItem>
            <AleButton type="primary" disabled>提交</AleButton>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="disabledCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 提示信息 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">提示信息</h2>
      <div class="component-demo-view__demo">
        <AleForm :model="extraForm">
          <AleFormItem name="username" label="用户名" extra="用户名用于登录系统，不能修改">
            <AleInput v-model="extraForm.username" />
          </AleFormItem>
          <AleFormItem name="email" label="邮箱" extra="我们会向此邮箱发送验证邮件">
            <AleInput v-model="extraForm.email" />
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="extraCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 全部表单字段校验 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">全部表单字段校验</h2>
      <div class="component-demo-view__demo">
        <AleForm :model="allFieldsForm" @submit="handleAllFieldsSubmit">
          <!-- 文本输入 -->
          <AleFormItem
            name="username"
            label="用户名"
            :rules="[
              { required: true, message: '请输入用户名' },
              { minLength: 3, message: '至少3个字符' },
              { maxLength: 20, message: '最多20个字符' }
            ]"
          >
            <AleInput v-model="allFieldsForm.username" placeholder="3-20个字符" autocomplete="username" />
          </AleFormItem>

          <!-- 文本域 -->
          <AleFormItem
            name="description"
            label="个人简介"
            :rules="[
              { required: true, message: '请输入个人简介' },
              { minLength: 10, message: '至少10个字符' },
              { maxLength: 200, message: '最多200个字符' }
            ]"
          >
            <AleInput
              v-model="allFieldsForm.description"
              type="textarea"
              :rows="4"
              placeholder="请输入10-200字的个人简介"
            />
          </AleFormItem>

          <!-- 单选框 -->
          <AleFormItem
            name="gender"
            label="性别"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <AleRadioGroup v-model="allFieldsForm.gender">
              <AleRadio value="male">男</AleRadio>
              <AleRadio value="female">女</AleRadio>
              <AleRadio value="other">其他</AleRadio>
            </AleRadioGroup>
          </AleFormItem>

          <!-- 多选框 -->
          <AleFormItem
            name="hobbies"
            label="兴趣爱好"
            :rules="[
              { required: true, message: '请选择至少一项兴趣爱好' },
              { validator: validateHobbies, message: '至少选择一项' }
            ]"
          >
            <AleCheckboxGroup v-model="allFieldsForm.hobbies">
              <AleCheckbox value="reading">阅读</AleCheckbox>
              <AleCheckbox value="sports">运动</AleCheckbox>
              <AleCheckbox value="music">音乐</AleCheckbox>
              <AleCheckbox value="travel">旅行</AleCheckbox>
              <AleCheckbox value="gaming">游戏</AleCheckbox>
            </AleCheckboxGroup>
          </AleFormItem>

          <!-- 下拉选择 -->
          <AleFormItem
            name="city"
            label="城市"
            :rules="[{ required: true, message: '请选择城市' }]"
          >
            <AleSelect v-model="allFieldsForm.city" placeholder="请选择城市">
              <AleOption value="beijing">北京</AleOption>
              <AleOption value="shanghai">上海</AleOption>
              <AleOption value="guangzhou">广州</AleOption>
              <AleOption value="shenzhen">深圳</AleOption>
              <AleOption value="hangzhou">杭州</AleOption>
            </AleSelect>
          </AleFormItem>

          <!-- 下拉多选 -->
          <AleFormItem
            name="skills"
            label="技能标签"
            :rules="[
              { required: true, message: '请选择至少一项技能' },
              { validator: validateSkills, message: '至少选择一项技能' }
            ]"
          >
            <AleSelect v-model="allFieldsForm.skills" multiple placeholder="请选择技能（可多选）">
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
          <AleFormItem
            name="region"
            label="所在地区"
            :rules="[
              { required: true, message: '请选择所在地区' },
              { validator: validateRegion, message: '请选择完整的地区信息' }
            ]"
          >
            <AleCascader
              v-model="allFieldsForm.region"
              :options="regionOptions"
              placeholder="请选择省/市/区"
              clearable
            />
          </AleFormItem>

          <!-- Switch 开关 -->
          <AleFormItem
            name="newsletter"
            label="订阅通知"
          >
            <AleSwitch v-model="allFieldsForm.newsletter" active-text="接收邮件通知" inactive-text="不接收" />
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
              v-model="allFieldsForm.attachments"
              list-type="text"
              :limit="3"
            >
              <AleButton type="primary" size="small">点击上传</AleButton>
            </AleUpload>
          </AleFormItem>

          <!-- 单个 Checkbox -->
          <AleFormItem
            name="agreement"
            :rules="[
              { required: true, message: '请同意用户协议' },
              { validator: validateAgreement, message: '必须同意用户协议' }
            ]"
          >
            <AleCheckbox v-model="allFieldsForm.agreement">
              我已阅读并同意《用户服务协议》和《隐私政策》
            </AleCheckbox>
          </AleFormItem>

          <AleFormItem>
            <div class="form-actions">
              <AleButton type="primary" native-type="submit">提交</AleButton>
              <AleButton @click="resetAllFieldsForm">重置</AleButton>
            </div>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="allFieldsCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 动态循环表单 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">动态循环表单</h2>
      <p class="tag-view__desc">可以动态添加、删除表单项的循环表单</p>
      <div class="component-demo-view__demo">
        <AleForm :model="dynamicLoopForm" @submit="handleDynamicLoopSubmit">
          <!-- 动态表单项循环 -->
          <div
            v-for="(item, index) in dynamicLoopForm.items"
            :key="item.id"
            class="dynamic-form-item"
          >
            <div class="dynamic-form-item__header">
              <span class="dynamic-form-item__title">成员 {{ index + 1 }}</span>
              <AleButton
                v-if="dynamicLoopForm.items.length > 1"
                type="danger"
                size="small"
                @click="removeDynamicItem(index)"
              >
                删除
              </AleButton>
            </div>

            <AleFormItem
              :name="`items.${index}.name`"
              label="姓名"
              :rules="[{ required: true, message: '请输入姓名' }]"
            >
              <AleInput v-model="item.name" placeholder="请输入姓名" />
            </AleFormItem>

            <AleFormItem
              :name="`items.${index}.email`"
              label="邮箱"
              :rules="[
                { required: true, message: '请输入邮箱' },
                { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }
              ]"
            >
              <AleInput v-model="item.email" placeholder="请输入邮箱" />
            </AleFormItem>

            <AleFormItem
              :name="`items.${index}.role`"
              label="角色"
              :rules="[{ required: true, message: '请选择角色' }]"
            >
              <AleRadioGroup v-model="item.role">
                <AleRadio value="admin">管理员</AleRadio>
                <AleRadio value="editor">编辑</AleRadio>
                <AleRadio value="viewer">访客</AleRadio>
              </AleRadioGroup>
            </AleFormItem>

            <AleFormItem
              :name="`items.${index}.permissions`"
              label="权限"
            >
              <AleCheckboxGroup v-model="item.permissions">
                <AleCheckbox value="read">读取</AleCheckbox>
                <AleCheckbox value="write">写入</AleCheckbox>
                <AleCheckbox value="delete">删除</AleCheckbox>
              </AleCheckboxGroup>
            </AleFormItem>
          </div>

          <AleFormItem>
            <div class="form-actions">
              <AleButton type="primary" @click="addDynamicItem">
                + 添加成员
              </AleButton>
              <AleButton type="primary" native-type="submit">提交</AleButton>
              <AleButton @click="resetDynamicLoopForm">重置</AleButton>
            </div>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="dynamicLoopCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- 验证触发事件 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">验证触发事件</h2>
      <p class="tag-view__desc">支持 change、blur、focus 和 submit 四种触发时机</p>
      <div class="component-demo-view__demo">
        <AleForm :model="triggerForm" @submit="handleTriggerSubmit">
          <!-- change 触发 -->
          <AleFormItem
            name="username"
            label="用户名(change)"
            :rules="[
              { required: true, message: '请输入用户名', trigger: 'change' },
              { minLength: 3, message: '至少3个字符', trigger: 'change' }
            ]"
          >
            <AleInput v-model="triggerForm.username" placeholder="输入时实时验证" autocomplete="username" />
          </AleFormItem>

          <!-- blur 触发 -->
          <AleFormItem
            name="email"
            label="邮箱(blur)"
            :rules="[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
              { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确', trigger: 'blur' }
            ]"
          >
            <AleInput v-model="triggerForm.email" placeholder="失去焦点时验证" />
          </AleFormItem>

          <!-- 多种触发方式 -->
          <AleFormItem
            name="phone"
            label="手机号(change+blur)"
            :rules="[
              { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
              { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['change', 'blur'] }
            ]"
          >
            <AleInput v-model="triggerForm.phone" placeholder="输入和失去焦点都验证" />
          </AleFormItem>

          <!-- focus 触发（清除错误） -->
          <AleFormItem
            name="password"
            label="密码(focus+blur)"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' },
              { minLength: 6, message: '至少6位', trigger: 'blur' }
            ]"
          >
            <AleInput v-model="triggerForm.password" type="password" placeholder="获得焦点时验证" autocomplete="current-password" />
          </AleFormItem>

          <AleFormItem>
            <div class="form-actions">
              <AleButton type="primary" native-type="submit">提交</AleButton>
              <AleButton @click="resetTriggerForm">重置</AleButton>
            </div>
          </AleFormItem>
        </AleForm>
      </div>
      <div class="component-demo-view__code">
        <CodeBlock :code="triggerCode" language="vue" title="示例代码" />
      </div>
    </section>

    <!-- API 说明 -->
    <section class="component-demo-view__section">
      <h2 class="component-demo-view__section-title">API 说明</h2>
      <div class="api-section">
        <h3>Form Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>model</td>
              <td>表单数据对象（必填）</td>
              <td>object</td>
              <td>-</td>
            </tr>
            <tr>
              <td>layout</td>
              <td>表单布局</td>
              <td>'horizontal' | 'vertical' | 'inline'</td>
              <td>'vertical'</td>
            </tr>
            <tr>
              <td>labelPosition</td>
              <td>标签位置</td>
              <td>'left' | 'right' | 'top'</td>
              <td>'right'</td>
            </tr>
            <tr>
              <td>labelWidth</td>
              <td>标签宽度</td>
              <td>string | number</td>
              <td>120</td>
            </tr>
            <tr>
              <td>size</td>
              <td>表单尺寸</td>
              <td>'large' | 'medium' | 'small'</td>
              <td>'medium'</td>
            </tr>
            <tr>
              <td>disabled</td>
              <td>是否禁用整个表单</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>showRequiredMark</td>
              <td>是否显示必填标记</td>
              <td>boolean</td>
              <td>true</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>Form 方法</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>方法名</th>
              <th>说明</th>
              <th>参数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>validate</td>
              <td>验证整个表单</td>
              <td>-</td>
            </tr>
            <tr>
              <td>validateField</td>
              <td>验证指定字段</td>
              <td>field: string | string[]</td>
            </tr>
            <tr>
              <td>resetFields</td>
              <td>重置表单字段</td>
              <td>-</td>
            </tr>
            <tr>
              <td>clearValidate</td>
              <td>清除验证状态</td>
              <td>field?: string | string[]</td>
            </tr>
            <tr>
              <td>getFormData</td>
              <td>获取表单数据</td>
              <td>-</td>
            </tr>
            <tr>
              <td>setFormData</td>
              <td>设置表单数据</td>
              <td>data: object</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>FormItem Props</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>name</td>
              <td>字段名称</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>label</td>
              <td>标签文本</td>
              <td>string</td>
              <td>-</td>
            </tr>
            <tr>
              <td>rules</td>
              <td>验证规则</td>
              <td>FormRule[]</td>
              <td>-</td>
            </tr>
            <tr>
              <td>required</td>
              <td>是否必填</td>
              <td>boolean</td>
              <td>false</td>
            </tr>
            <tr>
              <td>extra</td>
              <td>额外提示信息</td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="api-section">
        <h3>验证规则</h3>
        <table class="api-table">
          <thead>
            <tr>
              <th>规则</th>
              <th>说明</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>required</td>
              <td>是否必填</td>
              <td>{ required: true, message: '不能为空' }</td>
            </tr>
            <tr>
              <td>minLength</td>
              <td>最小长度</td>
              <td>{ minLength: 3, message: '至少3个字符' }</td>
            </tr>
            <tr>
              <td>maxLength</td>
              <td>最大长度</td>
              <td>{ maxLength: 20, message: '最多20个字符' }</td>
            </tr>
            <tr>
              <td>min</td>
              <td>最小值</td>
              <td>{ min: 18, message: '不能小于18' }</td>
            </tr>
            <tr>
              <td>max</td>
              <td>最大值</td>
              <td>{ max: 100, message: '不能大于100' }</td>
            </tr>
            <tr>
              <td>pattern</td>
              <td>正则表达式</td>
              <td>{ pattern: /^\d+$/, message: '只能是数字' }</td>
            </tr>
            <tr>
              <td>validator</td>
              <td>自定义验证函数</td>
              <td>{ validator: (value) => value > 0 }</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { AleForm, AleFormItem, AleInput, AleButton, AleRadio, AleRadioGroup, AleCheckbox, AleCheckboxGroup, AleSelect, AleOption, AleSwitch, AleCascader, AleUpload } from 'ale-ui';
import type { FormInstance, FormLayout, LabelPosition, FormSize } from 'ale-ui';
import CodeBlock from '@/components/CodeBlock.vue';
import { AleMessage } from 'ale-ui';

// 布局选项
const layouts: { value: FormLayout; label: string }[] = [
  { value: 'vertical', label: '垂直布局' },
  { value: 'horizontal', label: '水平布局' },
  { value: 'inline', label: '行内布局' }
];
const currentLayout = ref<FormLayout>('vertical');

// 标签位置选项
const labelPositions: { value: LabelPosition; label: string }[] = [
  { value: 'left', label: '左对齐' },
  { value: 'right', label: '右对齐' },
  { value: 'top', label: '顶部对齐' }
];
const currentLabelPosition = ref<LabelPosition>('right');

// 尺寸选项
const sizes: { value: FormSize; label: string }[] = [
  { value: 'large', label: '大号' },
  { value: 'medium', label: '中号' },
  { value: 'small', label: '小号' }
];
const currentSize = ref<FormSize>('medium');

// 基础表单
const basicForm = reactive({
  username: '',
  email: '',
  password: ''
});

const emailRules = [
  { required: true, message: '请输入邮箱' },
  { pattern: /^[^\s@]+@[^\s@]+$/, message: '邮箱格式不正确' }
];

const passwordRules = [
  { required: true, message: '请输入密码' },
  { minLength: 6, message: '密码至少6位' }
];

const handleBasicSubmit = (data: Record<string, any>) => {
  AleMessage.success(`提交成功: ${JSON.stringify(data)}`);
};

const resetBasicForm = () => {
  basicForm.username = '';
  basicForm.email = '';
  basicForm.password = '';
};

const fillExampleData = () => {
  basicForm.username = 'zhangsan';
  basicForm.email = 'zhangsan@example.com';
  basicForm.password = 'Password123';
};

const validateBasicForm = () => {
  if (!basicForm.username) {
    AleMessage.warning('用户名不能为空');
    return;
  }
  if (!basicForm.email) {
    AleMessage.warning('邮箱不能为空');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+$/.test(basicForm.email)) {
    AleMessage.warning('邮箱格式不正确');
    return;
  }
  if (!basicForm.password) {
    AleMessage.warning('密码不能为空');
    return;
  }
  AleMessage.success('校验通过！');
};

// 布局表单
const layoutForm = reactive({
  name: '',
  phone: '',
  address: ''
});

const handleLayoutSubmit = (_data: Record<string, any>) => {
  AleMessage.success('布局表单提交成功！');
};

// 标签位置表单
const positionForm = reactive({
  nickname: '',
  bio: ''
});

const handlePositionSubmit = (data: Record<string, any>) => {
  AleMessage.success(`标签位置表单提交: ${JSON.stringify(data)}`);
};

// 尺寸表单
const sizeForm = reactive({
  title: '',
  description: ''
});

const handleSizeSubmit = (data: Record<string, any>) => {
  AleMessage.success(`尺寸表单提交: ${JSON.stringify(data)}`);
};

// 验证表单
const validateFormRef = ref<FormInstance>();
const validateForm = reactive({
  username: '',
  email: '',
  age: '',
  phone: ''
});

const handleValidateSubmit = (_data: Record<string, any>) => {
  AleMessage.success('验证通过，提交成功！');
};

const handleValidateFail = (_errors: Record<string, string[]>) => {
  AleMessage.error('表单验证失败，请检查输入');
};

// 自定义验证表单
const customForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const validatePasswordStrength = (value: string) => {
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  return hasLetter && hasNumber ? true : false;
};

const validateConfirmPassword = (value: string) => {
  return value === customForm.password ? true : '两次输入的密码不一致';
};

const handleCustomSubmit = (_data: Record<string, any>) => {
  AleMessage.success('自定义验证通过！');
};

// 禁用表单
const disabledForm = reactive({
  name: '张三',
  email: 'zhangsan@example.com'
});

// 提示信息表单
const extraForm = reactive({
  username: '',
  email: ''
});

// ========== 全部表单字段校验 ==========
const allFieldsForm = reactive({
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

const validateHobbies = (value: string[]) => {
  return value && value.length > 0;
};

const validateSkills = (value: string[]) => {
  return value && value.length > 0;
};

const validateRegion = (value: (string | number)[]) => {
  return value && value.length > 0;
};

const validateAttachments = (value: any[]) => {
  return value && value.length > 0;
};

const validateAgreement = (value: boolean) => {
  return value === true;
};

const handleAllFieldsSubmit = () => {
  AleMessage.success('全部字段验证通过！');
};

const resetAllFieldsForm = () => {
  allFieldsForm.username = '';
  allFieldsForm.description = '';
  allFieldsForm.gender = '';
  allFieldsForm.hobbies = [];
  allFieldsForm.city = '';
  allFieldsForm.region = [];
  allFieldsForm.skills = [];
  allFieldsForm.newsletter = true;
  allFieldsForm.attachments = [];
  allFieldsForm.agreement = false;
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

const dynamicLoopForm = reactive({
  items: [{ id: dynamicIdCounter++, name: '', email: '', role: '', permissions: [] }] as DynamicFormItem[]
});

const addDynamicItem = () => {
  dynamicLoopForm.items.push({
    id: dynamicIdCounter++,
    name: '',
    email: '',
    role: '',
    permissions: []
  });
};

const removeDynamicItem = (index: number) => {
  if (dynamicLoopForm.items.length > 1) {
    dynamicLoopForm.items.splice(index, 1);
  }
};

const handleDynamicLoopSubmit = () => {
  const validItems = dynamicLoopForm.items.filter(item => item.name && item.email && item.role);
  AleMessage.success(`提交成功！共 ${validItems.length} 个成员`);
};

const resetDynamicLoopForm = () => {
  dynamicLoopForm.items = [{ id: dynamicIdCounter++, name: '', email: '', role: '', permissions: [] }];
};

// ========== 验证触发事件 ==========
const triggerForm = reactive({
  username: '',
  email: '',
  phone: '',
  password: ''
});

const handleTriggerSubmit = (_data: Record<string, any>) => {
  AleMessage.success('验证通过，提交成功！');
};

const resetTriggerForm = () => {
  triggerForm.username = '';
  triggerForm.email = '';
  triggerForm.phone = '';
  triggerForm.password = '';
};

// 代码示例
const basicCode = `<template>
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

const layoutCode = `<template>
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

const positionCode = `<template>
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

const sizeCode = `<template>
  <AleForm :model="form" size="large">
    <AleFormItem name="title" label="标题">
      <AleInput v-model="form.title" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" size="large">提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`;

const validateCode = `<template>
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

const customCode = `<template>
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

const disabledCode = `<template>
  <AleForm :model="form" disabled>
    <AleFormItem name="name" label="姓名">
      <AleInput v-model="form.name" />
    </AleFormItem>
    <AleFormItem>
      <AleButton type="primary" disabled>提交</AleButton>
    </AleFormItem>
  </AleForm>
</template>`;

const extraCode = `<template>
  <AleForm :model="form">
    <AleFormItem name="username" label="用户名" extra="用户名用于登录系统">
      <AleInput v-model="form.username" />
    </AleFormItem>
  </AleForm>
</template>`;

const allFieldsCode = `<template>
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

const dynamicLoopCode = `<template>
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

const triggerCode = `<template>
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
  margin-bottom: 24px;
}

.form-layout-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 4px;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  width: fit-content;
}

.layout-tab {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}

.layout-tab:hover {
  color: var(--color-text-primary);
}

.layout-tab.active {
  background: var(--color-bg-base);
  color: var(--color-primary);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
}

.form-actions {
  display: flex;
  gap: 12px;
}

.api-section {
  margin-bottom: 32px;
}

.api-section:last-child {
  margin-bottom: 0;
}

.api-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 16px 0;
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.api-table th,
.api-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.api-table th {
  background: var(--color-bg-secondary);
  font-weight: 600;
  color: var(--color-text-primary);
}

.api-table td {
  color: var(--color-text-secondary);
}

.api-table code {
  padding: 2px 6px;
  background: var(--color-bg-secondary);
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
  color: var(--color-primary);
}

/* 适配表单样式 */
:deep(.ale-form) {
  max-width: 600px;
}

:deep(.ale-form--inline) {
  max-width: 100%;
}

/* 动态循环表单样式 */
.dynamic-form-item {
  padding: 20px;
  margin-bottom: 20px;
  background: var(--color-gray-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-light);
}

.dynamic-form-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border-light);
}

.dynamic-form-item__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* 复选框组样式 */
:deep(.ale-checkbox-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

:deep(.ale-radio-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
