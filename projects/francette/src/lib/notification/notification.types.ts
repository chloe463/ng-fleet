/**
 * Types which needed to create notification compoents and services.
 * NOTE: I wanted to write these types in 'notification.service.ts'
 * but if I do so, it does not working with ngc.
 */
export type FrNotificationType = 'primary' | 'info' | 'warning' | 'danger' | 'default';
export interface FrNotificationParam {
  text: string;
  type?: FrNotificationType;
  timeout: number;
  extraParams?: any;
}
