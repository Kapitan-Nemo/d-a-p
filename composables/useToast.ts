export default function useToast(message: string, type: string, duration: number) {
  const toast = document.createElement('div')
  toast.classList.add('toast')
  toast.classList.add(`toast--${type}`)
  toast.textContent = message

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.remove()
  }, duration)

  return {
    toast,
  }
}
