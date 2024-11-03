export const toCamelCase = (snake: string | undefined | null): string | undefined | null => {
  if (!snake) return snake

  return snake
    .toLowerCase()
    .split('_')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join('')
}

export const toPascalCase = (snake: string | undefined | null): string | undefined | null => {
  if (!snake) return snake

  return snake
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
