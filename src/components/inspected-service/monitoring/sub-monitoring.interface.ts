import { TSubscriberDto } from '../../subscription/subscriber-declaration/all-subscribers-map';
import { SubscriberTypeEnum } from '../../subscription/subscriber-declaration/subscriber-type.enum';

export interface ISubMonitoring {
    subscribe: (serviceIds: [string], subscriberId: string, constructorPayload: TSubscriberDto<SubscriberTypeEnum>) => void,
    unsubscribe: (serviceIds: [string], subscriberId: string) => void,
    unsubscribeAll: (subscriberId: string) => void,
}
