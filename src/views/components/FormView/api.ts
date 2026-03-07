/**
 * FormView API 文档
 */

export const formPropsTable = [
  { param: 'model', desc: '表单数据对象（必填）', type: 'object', default: '-' },
  { param: 'layout', desc: '表单布局', type: "'horizontal' | 'vertical' | 'inline'", default: "'vertical'" },
  { param: 'labelPosition', desc: '标签位置', type: "'left' | 'right' | 'top'", default: "'right'" },
  { param: 'labelWidth', desc: '标签宽度', type: 'string | number', default: '120' },
  { param: 'size', desc: '表单尺寸', type: "'large' | 'medium' | 'small'", default: "'medium'" },
  { param: 'disabled', desc: '是否禁用整个表单', type: 'boolean', default: 'false' },
  { param: 'showRequiredMark', desc: '是否显示必填标记', type: 'boolean', default: 'true' }
];

export const formMethodsTable = [
  { method: 'validate', desc: '验证整个表单', params: '-' },
  { method: 'validateField', desc: '验证指定字段', params: 'field: string | string[]' },
  { method: 'resetFields', desc: '重置表单字段', params: '-' },
  { method: 'clearValidate', desc: '清除验证状态', params: 'field?: string | string[]' },
  { method: 'getFormData', desc: '获取表单数据', params: '-' },
  { method: 'setFormData', desc: '设置表单数据', params: 'data: object' }
];

export const formItemPropsTable = [
  { param: 'name', desc: '字段名称', type: 'string', default: '-' },
  { param: 'label', desc: '标签文本', type: 'string', default: '-' },
  { param: 'rules', desc: '验证规则', type: 'FormRule[]', default: '-' },
  { param: 'required', desc: '是否必填', type: 'boolean', default: 'false' },
  { param: 'extra', desc: '额外提示信息', type: 'string', default: '-' }
];

export const validationRulesTable = [
  { rule: 'required', desc: '是否必填', example: "{ required: true, message: '不能为空' }" },
  { rule: 'minLength', desc: '最小长度', example: "{ minLength: 3, message: '至少3个字符' }" },
  { rule: 'maxLength', desc: '最大长度', example: "{ maxLength: 20, message: '最多20个字符' }" },
  { rule: 'min', desc: '最小值', example: "{ min: 18, message: '不能小于18' }" },
  { rule: 'max', desc: '最大值', example: "{ max: 100, message: '不能大于100' }" },
  { rule: 'pattern', desc: '正则表达式', example: "{ pattern: /^\\d+$/, message: '只能是数字' }" },
  { rule: 'validator', desc: '自定义验证函数', example: '{ validator: (value) => value > 0 }' }
];
