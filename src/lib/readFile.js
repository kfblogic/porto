const MAX_IMAGE_BYTES = 20 * 1024 * 1024
const MAX_CV_BYTES = 10 * 1024 * 1024

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error('Gagal membaca file'))
    reader.readAsDataURL(file)
  })
}

export function assertImageFile(file, maxBytes = MAX_IMAGE_BYTES) {
  if (!file?.type?.startsWith('image/')) {
    throw new Error('File harus berupa gambar (JPG, PNG, WebP, dll.)')
  }
  if (file.size > maxBytes) {
    throw new Error(`Gambar maksimal ${maxBytes / 1024 / 1024}MB`)
  }
}

export async function readImageFile(file) {
  assertImageFile(file)
  return readFileAsDataUrl(file)
}

export function assertCvFile(file) {
  const ok =
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  if (!ok) {
    throw new Error('CV harus berformat PDF')
  }
  if (file.size > MAX_CV_BYTES) {
    throw new Error(`CV maksimal ${MAX_CV_BYTES / 1024 / 1024}MB`)
  }
}

export async function readCvFile(file) {
  assertCvFile(file)
  return readFileAsDataUrl(file)
}

const MAX_CERT_BYTES = 10 * 1024 * 1024

export function assertCertFile(file) {
  const isPdf =
    file.type === 'application/pdf' ||
    file.name.toLowerCase().endsWith('.pdf')
  const isImage = file.type?.startsWith('image/')

  if (!isPdf && !isImage) {
    throw new Error('File harus berupa gambar (JPG, PNG, WebP) atau PDF')
  }
  if (file.size > MAX_CERT_BYTES) {
    throw new Error(`File maksimal ${MAX_CERT_BYTES / 1024 / 1024}MB`)
  }
}

export async function readImageFiles(fileList) {
  const files = Array.from(fileList || [])
  return Promise.all(files.map(readImageFile))
}
