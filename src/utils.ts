import { useToastStore } from "./state/toastState"

export function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getLocationHashName() {
  const hash = window.location.hash
  return hash.substring(2)
}

export function text2clip(text: string) {
  return navigator.clipboard.writeText(text)
}

export function showToast(inputMsg: string, durationTime: number = 1500) {
  const toast = useToastStore()
  toast.showToast(inputMsg, durationTime)
}