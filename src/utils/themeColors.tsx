export function getWaveColors(): string[] {
  const styles = getComputedStyle(document.documentElement);
  return [
    styles.getPropertyValue('--wave-color-1').trim(),
    styles.getPropertyValue('--wave-color-2').trim(),
    styles.getPropertyValue('--wave-color-3').trim(),
  ];
}