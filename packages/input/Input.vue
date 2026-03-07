<template>
  <div :class="inputClass">
    <input
      v-if="type !== 'textarea'"
      ref="inputRef"
      :class="['ale-input__inner', { 'is-disabled': disabled, 'is-readonly': readonly }]"
      :type="currentInputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :autocomplete="autocomplete"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup="handleKeyup"
      @keydown="handleKeydown"
    />
    <textarea
      v-else
      ref="textareaRef"
      :class="['ale-input__inner', 'ale-textarea', { 'is-disabled': disabled, 'is-readonly': readonly }]"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      :cols="cols"
      :style="textareaStyle"
      @input="handleTextareaInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup="handleKeyup"
      @keydown="handleKeydown"
    />
    <span
      v-if="clearable && !disabled && modelValue"
      class="ale-input__clear"
      @click="handleClear"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    </span>
    <span
      v-if="showPassword && type === 'password'"
      class="ale-input__password"
      @click="togglePasswordVisible"
    >
      <svg v-if="passwordVisible" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue';
import type { InputProps, InputEmits } from './types';
import { useAutoResize } from './composables/useAutoResize';
import type { FormContext } from '../form/types';
import { FORM_CONTEXT_KEY } from '../form/constants';

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  size: undefined,
  disabled: false,
  readonly: false,
  placeholder: '',
  clearable: false,
  showPassword: false,
  rows: 3,
  resize: 'vertical',
  autoResize: false,
  minHeight: undefined,
  maxHeight: undefined
});

const emit = defineEmits<InputEmits>();

const inputRef = ref<HTMLInputElement>();
const passwordVisible = ref(false);

/** 注入表单上下文获取 size */
const formContext = inject<FormContext | undefined>(FORM_CONTEXT_KEY, undefined);
const formSize = computed(() => {
  const ctxSize = formContext?.size;
  const size = typeof ctxSize === 'object' && 'value' in ctxSize ? ctxSize.value : ctxSize;
  return size || 'medium';
});

/** 最终使用的尺寸 */
const finalSize = computed(() => props.size || formSize.value);

const { textareaRef, currentHeight, updateHeight: autoUpdateHeight } = useAutoResize({
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
  autoResize: props.autoResize
});

const textareaStyle = computed(() => {
  const style: Record<string, string> = {
    resize: props.resize
  };

  if (props.autoResize && textareaRef.value) {
    style.height = `${currentHeight.value}px`;
  }

  return style;
});

watch([() => props.autoResize, () => props.minHeight, () => props.maxHeight], () => {
  if (props.type === 'textarea') {
    autoUpdateHeight();
  }
});

const inputClass = computed(() => {
  return [
    'ale-input',
    `ale-input--${finalSize.value}`,
    {
      'is-disabled': props.disabled,
      'is-focused': isFocused.value
    }
  ];
});

const currentInputType = computed(() => {
  if (props.showPassword && props.type === 'password') {
    return passwordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

const isFocused = ref(false);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleTextareaInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);

  if (props.autoResize) {
    autoUpdateHeight();
  }
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('change', target.value);
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');

  if (props.type === 'textarea' && textareaRef.value) {
    textareaRef.value.focus();
  } else {
    inputRef.value?.focus();
  }
};

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event);
};

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event);
};

const focus = () => {
  if (props.type === 'textarea' && textareaRef.value) {
    textareaRef.value.focus();
  } else {
    inputRef.value?.focus();
  }
};

const blur = () => {
  if (props.type === 'textarea' && textareaRef.value) {
    textareaRef.value.blur();
  } else {
    inputRef.value?.blur();
  }
};

defineExpose({
  focus,
  blur
});
</script>
