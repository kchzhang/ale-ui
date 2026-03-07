<template>
  <div :class="timePickerClass" @click="handleClick">
    <input
      ref="inputRef"
      type="text"
      :class="['ale-time-picker__input', { 'is-disabled': disabled, 'is-readonly': readonly }]"
      :value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="true"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="ale-time-picker__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </span>
    <span
      v-if="clearable && modelValue && !disabled"
      class="ale-time-picker__clear"
      @click.stop="handleClear"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6M9 9l6 6" />
      </svg>
    </span>
    <Teleport to="body">
      <Transition name="ale-time-picker-fade">
        <div
          v-if="visible"
          ref="dropdownRef"
          :class="['ale-time-picker__dropdown', dropdownClass]"
          :style="dropdownStyle"
        >
          <div class="ale-time-picker__panel">
            <!-- 头部时间预览 -->
            <div class="ale-time-picker__header">
              <div class="ale-time-picker__preview">
                <span class="ale-time-picker__preview-item" :class="{ 'is-active': activeColumn === 'hour' }">
                  {{ formatNumber(displayHour) }}
                </span>
                <span class="ale-time-picker__preview-separator">:</span>
                <span class="ale-time-picker__preview-item" :class="{ 'is-active': activeColumn === 'minute' }">
                  {{ formatNumber(selectedMinute) }}
                </span>
                <template v-if="showSeconds">
                  <span class="ale-time-picker__preview-separator">:</span>
                  <span class="ale-time-picker__preview-item" :class="{ 'is-active': activeColumn === 'second' }">
                    {{ formatNumber(selectedSecond) }}
                  </span>
                </template>
                <span v-if="use12Hours" class="ale-time-picker__preview-period">
                  {{ isAm ? 'AM' : 'PM' }}
                </span>
              </div>
            </div>
            
            <!-- 时间选择区域 -->
            <div class="ale-time-picker__body">
              <div class="ale-time-picker__columns">
                <!-- 小时列 -->
                <div 
                  class="ale-time-picker__column" 
                  @scroll.passive="handleScroll('hour')"
                  @mouseenter="activeColumn = 'hour'"
                >
                  <div class="ale-time-picker__column-padding"></div>
                  <div
                    v-for="hour in hours"
                    :key="hour"
                    :class="['ale-time-picker__item', { 'is-selected': selectedHour === hour }]"
                    @click.stop="selectHour(hour)"
                  >
                    {{ formatNumber(hour) }}
                  </div>
                  <div class="ale-time-picker__column-padding"></div>
                </div>
                
                <!-- 分钟列 -->
                <div 
                  class="ale-time-picker__column"
                  @scroll.passive="handleScroll('minute')"
                  @mouseenter="activeColumn = 'minute'"
                >
                  <div class="ale-time-picker__column-padding"></div>
                  <div
                    v-for="minute in minutes"
                    :key="minute"
                    :class="['ale-time-picker__item', { 'is-selected': selectedMinute === minute }]"
                    @click.stop="selectMinute(minute)"
                  >
                    {{ formatNumber(minute) }}
                  </div>
                  <div class="ale-time-picker__column-padding"></div>
                </div>
                
                <!-- 秒列 -->
                <template v-if="showSeconds">
                  <div 
                    class="ale-time-picker__column"
                    @scroll.passive="handleScroll('second')"
                    @mouseenter="activeColumn = 'second'"
                  >
                    <div class="ale-time-picker__column-padding"></div>
                    <div
                      v-for="second in seconds"
                      :key="second"
                      :class="['ale-time-picker__item', { 'is-selected': selectedSecond === second }]"
                      @click.stop="selectSecond(second)"
                    >
                      {{ formatNumber(second) }}
                    </div>
                    <div class="ale-time-picker__column-padding"></div>
                  </div>
                </template>
                
                <!-- AM/PM 列 -->
                <template v-if="use12Hours">
                  <div class="ale-time-picker__column ale-time-picker__period">
                    <div class="ale-time-picker__column-padding--small"></div>
                    <div
                      :class="['ale-time-picker__item', { 'is-selected': !isAm }]"
                      @click.stop="selectPeriod('pm')"
                    >
                      PM
                    </div>
                    <div
                      :class="['ale-time-picker__item', { 'is-selected': isAm }]"
                      @click.stop="selectPeriod('am')"
                    >
                      AM
                    </div>
                    <div class="ale-time-picker__column-padding--small"></div>
                  </div>
                </template>
                
                <!-- 选中行指示器 -->
                <div class="ale-time-picker__indicator"></div>
              </div>
            </div>
            
            <!-- 底部操作区 -->
            <div class="ale-time-picker__footer">
              <button class="ale-time-picker__btn ale-time-picker__btn--text" @click.stop="handleNow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ale-time-picker__btn-icon">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                此刻
              </button>
              <button class="ale-time-picker__btn ale-time-picker__btn--primary" @click.stop="handleConfirm">
                确定
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import type { TimePickerProps, TimePickerEmits, TimePickerExpose } from './types';
import './TimePicker.css';

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择时间',
  disabled: false,
  readonly: false,
  clearable: false,
  size: 'medium',
  theme: 'primary',
  showSeconds: false,
  use12Hours: false,
  minTime: '',
  maxTime: '',
  customClass: ''
});

const emit = defineEmits<TimePickerEmits>();

const inputRef = ref<HTMLInputElement>();
const dropdownRef = ref<HTMLDivElement>();
const visible = ref(false);
const isFocused = ref(false);
const activeColumn = ref<'hour' | 'minute' | 'second'>('hour');

const selectedHour = ref(0);
const selectedMinute = ref(0);
const selectedSecond = ref(0);
const isAm = ref(true);

const dropdownPosition = ref({ top: 0, left: 0 });

const timePickerClass = computed(() => [
  'ale-time-picker',
  `ale-time-picker--${props.size}`,
  `ale-time-picker--${props.theme}`,
  {
    'is-disabled': props.disabled,
    'is-focused': isFocused.value,
    'is-active': visible.value,
    [props.customClass]: props.customClass
  }
]);

const dropdownClass = computed(() => ({
  'is-visible': visible.value
}));

const dropdownStyle = computed(() => ({
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`
}));

const hours = computed(() => {
  if (props.use12Hours) {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }
  return Array.from({ length: 24 }, (_, i) => i);
});

const minutes = computed(() => Array.from({ length: 60 }, (_, i) => i));
const seconds = computed(() => Array.from({ length: 60 }, (_, i) => i));

const displayValue = computed(() => {
  if (!props.modelValue) return '';
  return props.modelValue;
});

const displayHour = computed(() => {
  if (props.use12Hours) {
    return selectedHour.value;
  }
  return selectedHour.value;
});

const formatNumber = (num: number): string => {
  return num.toString().padStart(2, '0');
};

const parseTime = (time: string) => {
  if (!time) return { hour: 0, minute: 0, second: 0 };
  const parts = time.split(':').map(Number);
  return {
    hour: parts[0] || 0,
    minute: parts[1] || 0,
    second: parts[2] || 0
  };
};

const formatTime = (): string => {
  let hour = selectedHour.value;
  if (props.use12Hours) {
    if (isAm.value && hour === 12) hour = 0;
    if (!isAm.value && hour !== 12) hour = hour + 12;
  }
  const parts = [formatNumber(hour), formatNumber(selectedMinute.value)];
  if (props.showSeconds) {
    parts.push(formatNumber(selectedSecond.value));
  }
  return parts.join(':');
};

const updateDropdownPosition = () => {
  if (!inputRef.value) return;
  const rect = inputRef.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const dropdownHeight = 320;
  
  let top = rect.bottom + 8;
  if (top + dropdownHeight > viewportHeight) {
    top = rect.top - dropdownHeight - 8;
  }
  
  dropdownPosition.value = {
    top,
    left: rect.left
  };
};

const handleClick = () => {
  if (props.disabled || props.readonly) return;
  visible.value = !visible.value;
  if (visible.value) {
    updateDropdownPosition();
    nextTick(() => {
      scrollToSelected();
    });
  }
};

const scrollToSelected = () => {
  nextTick(() => {
    const columns = dropdownRef.value?.querySelectorAll('.ale-time-picker__column');
    if (!columns || columns.length < 2) return;
    
    const itemHeight = 36;
    
    const hourColumn = columns[0];
    const minuteColumn = columns[1];
    
    if (hourColumn) {
      hourColumn.scrollTop = selectedHour.value * itemHeight;
    }
    if (minuteColumn) {
      minuteColumn.scrollTop = selectedMinute.value * itemHeight;
    }
    
    if (props.showSeconds && columns[2]) {
      columns[2].scrollTop = selectedSecond.value * itemHeight;
    }
  });
};

const selectHour = (hour: number) => {
  selectedHour.value = hour;
  emitChange();
};

const selectMinute = (minute: number) => {
  selectedMinute.value = minute;
  emitChange();
};

const selectSecond = (second: number) => {
  selectedSecond.value = second;
  emitChange();
};

const selectPeriod = (period: 'am' | 'pm') => {
  isAm.value = period === 'am';
  emitChange();
};

const emitChange = () => {
  const time = formatTime();
  emit('update:modelValue', time);
  emit('change', time);
};

const handleNow = () => {
  const now = new Date();
  let hour = now.getHours();
  
  if (props.use12Hours) {
    isAm.value = hour < 12;
    hour = hour % 12 || 12;
  }
  
  selectedHour.value = hour;
  selectedMinute.value = now.getMinutes();
  selectedSecond.value = now.getSeconds();
  
  scrollToSelected();
  emitChange();
};

const handleConfirm = () => {
  visible.value = false;
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false;
  emit('blur', event);
};

const handleScroll = (type: 'hour' | 'minute' | 'second') => {
  activeColumn.value = type;
  const columns = dropdownRef.value?.querySelectorAll('.ale-time-picker__column');
  if (!columns) return;
  
  const columnIndex = type === 'hour' ? 0 : type === 'minute' ? 1 : 2;
  const column = columns[columnIndex];
  if (!column) return;
  
  const itemHeight = 36;
  const scrollTop = column.scrollTop;
  const index = Math.round(scrollTop / itemHeight);
  
  if (type === 'hour') {
    selectedHour.value = props.use12Hours ? Math.max(1, Math.min(12, index + 1)) : index;
  } else if (type === 'minute') {
    selectedMinute.value = Math.max(0, Math.min(59, index));
  } else {
    selectedSecond.value = Math.max(0, Math.min(59, index));
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    !inputRef.value?.contains(target) &&
    !dropdownRef.value?.contains(target)
  ) {
    visible.value = false;
  }
};

watch(() => props.modelValue, (val) => {
  if (val) {
    const { hour, minute, second } = parseTime(val);
    if (props.use12Hours) {
      isAm.value = hour < 12;
      selectedHour.value = hour % 12 || 12;
    } else {
      selectedHour.value = hour;
    }
    selectedMinute.value = minute;
    selectedSecond.value = second;
  }
}, { immediate: true });

watch(visible, (val) => {
  if (val) {
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', updateDropdownPosition);
  } else {
    document.removeEventListener('click', handleClickOutside);
    window.removeEventListener('resize', updateDropdownPosition);
  }
});

onMounted(() => {
  if (props.modelValue) {
    const { hour, minute, second } = parseTime(props.modelValue);
    if (props.use12Hours) {
      isAm.value = hour < 12;
      selectedHour.value = hour % 12 || 12;
    } else {
      selectedHour.value = hour;
    }
    selectedMinute.value = minute;
    selectedSecond.value = second;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', updateDropdownPosition);
});

const focus = () => {
  inputRef.value?.focus();
};

const blur = () => {
  inputRef.value?.blur();
};

const clear = () => {
  handleClear();
};

defineExpose<TimePickerExpose>({
  focus,
  blur,
  clear
});
</script>
