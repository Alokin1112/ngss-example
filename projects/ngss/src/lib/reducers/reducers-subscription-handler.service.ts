import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ReducersSubscriptionHandlerService {

  private subscriptions: Record<string, Subscription[]> = {};

  addSubscription(type: string, subscription: Subscription): void {
    this.subscriptions[type] = [...(this.subscriptions?.[type] || []), subscription];
  }

  completeAllSubscriptions(): void {
    Object.keys(this.subscriptions).forEach((key) => {
      this.completeSubscriptions(key);
    });
  }

  completeSubscriptions(type: string): void {
    this.subscriptions?.[type]?.forEach((subscription) => !subscription.closed && subscription.unsubscribe());
    this.subscriptions[type] = [];
  }

}
